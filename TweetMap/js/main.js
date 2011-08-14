var map_canvas, 
    stage,
    topSearch,
    geocoder,
    infoPanels = [],
    markers = [],
    results = [],
    l = 0,
    map;

var query = {
    rpp : 100,
    page : 1,
    count : 100,
    result_type : "mixed",
    show_user : true
}

$(document).ready(function() {

	stage = new CACILDS.Stage();

    topSearch = new TopLayer();
    topSearch.name = "topLayer";
    topSearch.style({
        position : "relative",
        width    : "100%",
        height   : "70px"
    });

    topSearch.addEventListener("submitTag", submitTagHandler);
    topSearch.addEventListener("clear", clear);

    stage.addChild(topSearch);

	 // creating map

    containerMaps = new CACILDS.Sprite();
    containerMaps.name = "container";
    containerMaps.style({
    	position : "relative",
        width    : "100%",
        height   : "100%"
    });
    stage.addChild(containerMaps);

	map_canvas = new CACILDS.Sprite();
	map_canvas.name = "mapCanvas";
	map_canvas.style({
        position : "absolute",
        width    : "100%",
		height   : "100%"
	});
	
	containerMaps.addChild(map_canvas);
	    
    var myOptions = {
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };

    map = new google.maps.Map(map_canvas.dom, myOptions);
   
    map.setCenter(new google.maps.LatLng(0, 0));

    // Get Hash

    if(window.location.hash) {
        var hash = window.location.hash.split("#").join("");
        searchQuery(hash);
        topSearch.updateInput(hash);
    }
});

function clear(e)
{
    for (i in markers) markers[i].setMap(null);
    markers = [];
    results = [];
    infoPanels = [];
    l = 0;
}

function submitTagHandler(e) 
{
    e.preventDefault();
    searchQuery(e.customData);
}

function searchQuery(q)
{
    topSearch.clear();

    var tweetQuery = "http://search.twitter.com/search.json?";
    for(var n in query) tweetQuery += n + "=" + query[n] + "&";
    tweetQuery += "q=" + q;

    $.ajax({
        url: tweetQuery,
        dataType: "jsonp",
        jsonpCallback: "onLoad"
    });
}

function onLoad (data) { 
	var items = [],
        prev = l,
        totalTweets = 0;

	$.each(data.results,function(i,tweet){

       var geo = getGeo(tweet.geo);
       totalTweets++;

       if(geo != "")
       {
           var latLng = new google.maps.LatLng(getGeo(tweet.geo)[0], getGeo(tweet.geo)[1]);
           var marker = new google.maps.Marker(
                {
                    map: map, 
                    position: latLng,
                    clickable: true,
                    raiseOnDrag: false,
                }
            );

            results.push({
                profile: tweet.profile_image_url, 
                text: tweet.text
            });

            markers.push(marker);

            (function(map, marker, i)
            {
                var info = new google.maps.InfoWindow()
                info.maxWidth = 250;

                infoPanels.push(info);

                google.maps.event.addListener(marker, 'click', function() {
                    closeAllInfoPanels();
                    showInfoPanel(marker.position.Ia, marker.position.Ja, info, marker, i)
                })
            })(map, marker, l);

            l++;
       }
	});

    topSearch.updateResults(totalTweets, l - prev);
}

function showInfoPanel(lat, lng, info, marker, i)
{
    info.setContent(returnFormatedTweet(results[i]));
    info.open(map, marker);
    
    //map.setCenter(latlng);
}

function addAnchors(text)
{
    var re = new RegExp(/(https?:\/\/.*?)(<|\s|$)/gm);
    text = text.replace(re, "<a href=\"$1\" target=\"_blank\">$1</a>$2");
    re = new RegExp(/(^|\s|>)?@(\w*?)(<|\s|$)/gm);
    text = text.replace(re, "$1<a href=\"https:\/\/twitter.com/#!/$2\" target=\"_blank\">@$2</a>$3");
    return text;
}

function returnFormatedTweet(tweet) 
{
    var result = new CACILDS.Sprite();

    var user = tweet.text.substring(0, tweet.text.indexOf(":"));
    var tweetFormatted = tweet.text.split(user + ":").join("") + "<br>";

    tweetFormatted = addAnchors(tweetFormatted);

    user = "<a href='http://twitter.com/" + user + "' target='_blank'>@" + user + "</a>";
   
    var profile = new CACILDS.Sprite();
    profile.html("<img style='margin-right:5px;' align='left' src='" + tweet.profile +"' width='55' height='55'>" + user + "<br>" + tweetFormatted);
    profile.style({
        height : "100%"
    })

    result.addChild(profile);

    return result.dom;
}

function closeAllInfoPanels()
{
    for(var i = 0; i<infoPanels.length; i++)
    {
        infoPanels[i].close();
    }
}

function getGeo(geo) {
	return geo!= null ? geo.type == "Point" ? [geo.coordinates[0], geo.coordinates[1]] : "" : "";
}