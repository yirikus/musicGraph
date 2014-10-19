(function(){
  var app = angular.module('musicGraph', []);
  app.controller('MusicGraphController', function($scope, $log){
	var apiKey = 'f16fb6e6b09897f10894fce4b76d21d0';
	var apiSecret = 'a0a497af9de2ff755c77f5e0422d2d56';
		
	// create lastFM cache
	var cache = new LastFMCache();
		
	// create a LastFM object
	var lastfm = new LastFM({
		apiKey    : apiKey,
		apiSecret : apiSecret,
		cache     : cache
	});
  
  
   $scope.artists = [{name:'test'}];
	
	$scope.addNode = function(artistName){
		lastfm.artist.getInfo({artist: artistName}, {success: function(data){
			$scope.artists.push(data.artist);
			$log.info("added " + data.artist.name);
			$scope.$apply();
		}});
	}
	
	 var json = {
        "id": "190_0",
        "name": "Pearl Jam",
        "children": [{
            "id": "306208_1",
            "name": "Pearl Jam &amp; Cypress Hill",
            "data": {
                "band": "Pearl Jam",
                "relation": "collaboration"
            },
            "children": [{
                "id": "84_2",
                "name": "Cypress Hill",
                "data": {
                    "band": "Pearl Jam &amp; Cypress Hill",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "107877_3",
            "name": "Neil Young &amp; Pearl Jam",
            "data": {
                "band": "Pearl Jam",
                "relation": "collaboration"
            },
            "children": [{
                "id": "964_4",
                "name": "Neil Young",
                "data": {
                    "band": "Neil Young &amp; Pearl Jam",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "236797_5",
            "name": "Jeff Ament",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_6",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "14581_7",
                "name": "Mother Love Bone",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "50188_8",
                "name": "Green River",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "65452_9",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "115632_10",
                "name": "Three Fish",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_11",
                "name": "Gossman Project",
                "data": {
                    "band": "Jeff Ament",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "41529_12",
            "name": "Stone Gossard",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_13",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "14581_14",
                "name": "Mother Love Bone",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "24119_15",
                "name": "Brad",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "50188_16",
                "name": "Green River",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_17",
                "name": "Gossman Project",
                "data": {
                    "band": "Stone Gossard",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "131161_18",
            "name": "Eddie Vedder",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1756_19",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "72007_20",
                "name": "Eddie Vedder &amp; Zeke",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "236657_21",
                "name": "Bad Radio",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "432176_22",
                "name": "Beck &amp; Eddie Vedder",
                "data": {
                    "band": "Eddie Vedder",
                    "relation": "collaboration"
                },
                "children": []
            }]
        }, {
            "id": "236583_23",
            "name": "Mike McCready",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1744_24",
                "name": "Mad Season",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1756_25",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "43661_26",
                "name": "$10,000 Gold Chain",
                "data": {
                    "band": "Mike McCready",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "65452_27",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Mike McCready",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "153766_28",
                "name": "The Rockfords",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "346850_29",
                "name": "Gossman Project",
                "data": {
                    "band": "Mike McCready",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236585_30",
            "name": "Matt Cameron",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "1111_31",
                "name": "Soundgarden",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "1756_32",
                "name": "Temple of the Dog",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "9570_33",
                "name": "Eleven",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "supporting musician"
                },
                "children": []
            }, {
                "id": "11783_34",
                "name": "Queens of the Stone Age",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "61972_35",
                "name": "Wellwater Conspiracy",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "65452_36",
                "name": "M.A.C.C.",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "collaboration"
                },
                "children": []
            }, {
                "id": "353097_37",
                "name": "Tone Dogs",
                "data": {
                    "band": "Matt Cameron",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236594_38",
            "name": "Dave Krusen",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "2092_39",
                "name": "Candlebox",
                "data": {
                    "band": "Dave Krusen",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236022_40",
            "name": "Matt Chamberlain",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "54761_41",
                "name": "Critters Buggin",
                "data": {
                    "band": "Matt Chamberlain",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "92043_42",
                "name": "Edie Brickell and New Bohemians",
                "data": {
                    "band": "Matt Chamberlain",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236611_43",
            "name": "Dave Abbruzzese",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "276933_44",
                "name": "Green Romance Orchestra",
                "data": {
                    "band": "Dave Abbruzzese",
                    "relation": "member of band"
                },
                "children": []
            }]
        }, {
            "id": "236612_45",
            "name": "Jack Irons",
            "data": {
                "band": "Pearl Jam",
                "relation": "member of band"
            },
            "children": [{
                "id": "4619_46",
                "name": "Redd Kross",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "9570_47",
                "name": "Eleven",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "12389_48",
                "name": "Red Hot Chili Peppers",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "114288_49",
                "name": "Anthym",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }, {
                "id": "240013_50",
                "name": "What Is This?",
                "data": {
                    "band": "Jack Irons",
                    "relation": "member of band"
                },
                "children": []
            }]
        }],
        "data": []
    };
    
   
	
	var fd = new $jit.ForceDirected({ 

		// create canvas in "infovis" DOM element
		injectInto: 'infovis',

		// many other options here
	});
	
	fd.loadJSON(json);
	fd.refresh();
	
  });
 })();