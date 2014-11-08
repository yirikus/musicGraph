(function(){
  var app = angular.module('musicGraph', []);
  app.controller('MusicGraphController', function($scope, $log){

	var apiKey = 'f16fb6e6b09897f10894fce4b76d21d0';
	var apiSecret = 'a0a497af9de2ff755c77f5e0422d2d56';

    var force;
    var svg;

    var nodes = [];
    var links = [];
    var node;
    var link;

    //var WIDTH = 960;
    //var HEIGHT = 500;

    var WIDTH = window.outerWidth;
    var HEIGHT = window.outerHeight;

	// create lastFM cache
	var cache = new LastFMCache();
		
	// create a LastFM object
	var lastfm = new LastFM({
		apiKey    : apiKey,
		apiSecret : apiSecret,
		cache     : cache
	});

	$scope.addArtist = function(artistName){
		lastfm.artist.getInfo({artist: artistName}, {success: function(data){
            var addedNode = addNode({name:data.artist.name, similar: data.artist.similar.artist});
            addLinks(addedNode);
            restart();
            createSaveString();
		}});
	};

      /**
       * http://www.w3schools.com/js/js_cookies.asp
       * @param cname
       * @param cvalue
       * @param exdays
       */
      function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
      }

      /**
       * http://www.w3schools.com/js/js_cookies.asp
       * @param cname
       * @returns {string}
       */
      function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1);
              if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
          }
          return "";
      }

      function createSaveString() {
          var jsonToStore = {nodes:[]};
          for (var i = 0; i < nodes.length; i++) {
              jsonToStore.nodes.push({name:nodes[i].name, similar:[]});
              if (nodes[i].similar && nodes[i].similar.length > 0) {
                  for (var j = 0; j < nodes[i].similar.length; j++) {
                      jsonToStore.nodes[i].similar.push({name:nodes[i].similar[j].name});
                  }
              }
          }
          $scope.saveString = JSONC.pack( jsonToStore, true );
          if (!$scope.$$phase) {
            $scope.$apply();
          }
      }

      $scope.loadGraph = function() {
          nodes = [];
          links = [];
          var loadedNodes = JSONC.unpack($scope.saveString, true).nodes;
          for (var i = 0; i < loadedNodes.length; i++) {
            var addedNode = addNode(loadedNodes[i]);
            addLinks(addedNode);
          }
          initGraph();
      };

      function addNode(artist){
          var index = findByAttr(nodes, {name: artist.name});
          if (index < 0) {
              $log.info("added " + artist.name);
              index = nodes.push({name:artist.name, x:WIDTH/2, y: HEIGHT/2, similar: artist.similar}) - 1;
          } else if (artist.similar.length > nodes[index].similar.length){
              // update similar artists
              nodes[index].similar = artist.similar;
          }

          for (var i = 0; i < artist.similar.length; i++) {
              addNode({name: artist.similar[i].name, similar:[]});
          }

          return nodes[index];
      }

      function addLinks(artistNode) {
          // add links to similar artists
          for (var n = 0; n < nodes.length; n++) {
              for (var i = 0; i < artistNode.similar.length; i++) {
                  targetNode = findByAttr(nodes, {name: artistNode.similar[i].name});
                  var linkIndex = findByAttr(links,{source: {name: nodes[n].name}, target: {name: nodes[targetNode].name}});
                  var reverseLinkIndex = findByAttr(links,{target: {name: nodes[n].name}, target: {source: nodes[targetNode].name}});
                  if (linkIndex < 0 && reverseLinkIndex < 0) {
                    links.push({source: artistNode, target: nodes[targetNode]});
                  }
             }
          }
      }

      /**
       * Returns index of element if element has all specified attributes
       * @param list input list
       * @param attrs attribute map that must match search element
       * @returns {number} index of found element
       */
      function findByAttr(list, attrs) {
        for (var i = 0; i < list.length; i++) {
            if (attrMatch(list[i], attrs)) {
                return i;
            }
        }
        return -1;
      }


      function attrMatch(obj, attrs) {
          if (obj == null) {
              return false;
          }

          var match = true;
          for (var attr in attrs){
              if (typeof attrs[attr] === "object") {
                  match = attrMatch(obj[attr], attrs[attr]);
              } else if (obj[attr] != attrs[attr]) {
                  match = false;
              }

              if (!match) {
                  return false;
              }
          }
          return match;
      }

      function initGraph() {
          d3.select("svg").remove();

          force = d3.layout.force()
              .size([WIDTH, HEIGHT])
              .nodes(nodes) // initialize with a single node
              .links(links)
              .linkDistance(60)
              .charge(-600)
              .on("tick", tick);

        svg = d3.select("#graph").append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT);

        nodes = force.nodes();
        links = force.links();
        node = svg.selectAll(".node");
        link = svg.selectAll(".link");

        restart();
      }

      function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d, i) { return "translate(" + d.x + "," + d.y + ")"; });
          node.selectAll("circle").attr("r", function(d) {
              return 5 + 3 * d.similar.length});
      }

      function restart() {
          link = link.data(links);

          link.enter().insert("line", ".node")
              .attr("class", "link");

          node = node.data(nodes);

          var appended = node.enter().append("g").attr("class","node").call(force.drag);

          appended.append("circle")
              .attr("fill","pink");

          appended.append("text")
              .text(function(d, i) { return d.name})
              .attr("fill","black")
              .attr("y",5)
              .attr("x",-2);


          force.start();
      }

      initGraph();

  });
 })();