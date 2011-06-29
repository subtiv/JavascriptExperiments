var map_canvas, 
    stage,
    geocoder,
    currentCity = 0,
    i = 0,
    infoPanels = [],
    markers = [],
    cities = [],
    map;

function init()
{
	stage = new CACILDS.Stage();

    left = new CACILDS.Sprite();
    left.style({
        float     : "left",
        height    : "100%",
        width     : "20%",
        overflowY : "auto",
        overflowX : "hidden"
    })

    logo = new CACILDS.Sprite();
    logo.style({
        width       : "100%",
        fontFamily  : "Verdana, Helvetica, sans-serif",
        fontSize    : '10.5pt',
        marginLeft  : ".7em",
        marginTop   : "1em",
        color       : "#efefef"
    })
    logo.html("Budget Airlines Airports");

    left.addChild(logo)

    stage.addChild(left);

    // creating map

    containerMaps = new CACILDS.Sprite();
    containerMaps.name = "container";
    containerMaps.style({
        position : "relative",
        float    : 'left',
        width    : "80%",
        right    : "auto",
        height   : "100%"
    });
    stage.addChild(containerMaps);

	map_canvas = new CACILDS.Sprite();
	map_canvas.name = "mapCanvas";
	map_canvas.style({
        position : "fixed",
        width    : "100%",
		height   : "100%"
	});
	
	containerMaps.addChild(map_canvas);
	    
    var myOptions = {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };

    map = new google.maps.Map(map_canvas.dom, myOptions);
    for(i = 0; i<citiesLatLong.length; i++)
    {
        var latLng = new google.maps.LatLng(citiesLatLong[i][1], citiesLatLong[i][2]);
        var marker = new google.maps.Marker(
            {
                map: map, 
                position: latLng,
                clickable: true,
                raiseOnDrag: false,
                title: citiesLatLong[i][0]
            }
        );

        markers.push(marker);

        (function(map, marker, i)
        {
            var info = new google.maps.InfoWindow()
            info.maxWidth = 100;

            infoPanels.push(info);

            google.maps.event.addListener(marker, 'click', function() {
                closeAllInfoPanels();
                showInfoPanel(marker.position.Ia, marker.position.Ja, info, marker, i)
            })
        })(map, marker, i);
    }

    // adding cities

    for(i = 0; i<citiesLatLong.length; i++)
    {
        var city = new City();
        city.index = i;
        city.marker = markers[i];
        city.infoPanel = infoPanels[i];
        city.lat = citiesLatLong[i][1];
        city.lng = citiesLatLong[i][2];
        city.id = citiesLatLong[i][0];

        city.html(city.id);

        city.addEventListener('mouseover', cityItemMouseHandler);
        city.addEventListener('mouseout', cityItemMouseHandler);
        city.addEventListener('click', cityItemMouseHandler);

        cities.push(city);

        city.style({
            width       : "auto",
            display     : 'block',
            float       : 'left',
            clear       : 'both',
            fontFamily  : "Helvetica, Arial, Verdana",
            fontSize    : "8pt",
            marginLeft  : "1em",
            marginTop   : "1em",
            color       : "#999999",
            cursor      : "pointer"
        })

        left.addChild(city);
    }

    map.setCenter(new google.maps.LatLng(45,15));
}

function cityItemMouseHandler(event)
{
    event.preventDefault();

    var city = event.currentTarget.parent

    switch(event.type)
    {
        case "click":
            activeCity(city.index);
            showInfoPanel(city.lat, city.lng, city.infoPanel, city.marker);
            break;
       
       case "mouseover":
            cityMouseOver(city.lat, city.lng);
            if(!city.active) city.style({backgroundColor : "#efefef", color: "#222222"});
            break;

        case "mouseout":
            if(!city.active) city.style({backgroundColor : "transparent", color: "#999999"});
            break;
    }
}

function activeCity(index)
{
    if(!index) return;

    for(var i = 0; i<cities.length; i++)
    {
        cities[i].active = false;
        cities[i].style({backgroundColor : "transparent", color: "#999999"});
    }

    cities[index].active = true;
    cities[index].style({backgroundColor : "#efefef", color: "#222222"});
}

function showInfoPanel(lat, lng, info, marker, i)
{
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({"location" : latlng}, function(results, status)
    {
        if (status == google.maps.GeocoderStatus.OK) {
            var r = results[results.length - 2];
            if (r) {
                info.setContent("<div class='contentBubble'>" + r.formatted_address + "</div>");
                info.open(map, marker);
            }
        }
    });

    map.setCenter(latlng);
    map.setZoom(12);
    activeCity(i);
}

function closeAllInfoPanels()
{
    for(var i = 0; i<infoPanels.length; i++)
    {
        infoPanels[i].close();
    }
}

function cityMouseOver(lat, lng)
{
    closeAllInfoPanels();
    map.setCenter(new google.maps.LatLng(lat,lng));
    map.setZoom(7);
}

function cityMouseOut()
{
    map.setCenter(new google.maps.LatLng(45,15));
    map.setZoom(4);
    closeAllInfoPanels();
}

window.onload = init;