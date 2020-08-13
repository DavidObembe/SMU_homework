// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
    boundaryURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";



// Perform a GET request to the query URL

d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features);
    createFeatures(data.features);



});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // create a function that gets circle colors
    function getCircleColor(mag) {
        let color = "";
        if (mag < 5) {
            color = "yellow";
        } else if (mag < 6.5) {
            color = "orange";
        } else if (mag < 10.0) {
            color = "red";
        }
        return color;
    }
    // function getCircleColor(mag) {
    //     return mag > 4 ? '#800026' :
    //         mag > 5 ? '#BD0026' :
    //         mag > 6 ? '#E31A1C' :
    //         mag > 7 ? '#FC4E2A' :
    //         mag > 8 ? '#FD8D3C' :
    //         mag > 9 ? '#FEB24C' :
    //         mag > 10 ? '#FED976' :
    //         '#FFEDA0';
    // }



    function getMarkerSize(points) {
        return points ** 1.8;
    }


    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, { radius: getMarkerSize(feature.properties.mag), fillColor: getCircleColor(feature.properties.mag), color: 'white', fillOpacity: 0.7 });
        },
        onEachFeature: onEachFeature
            // style: style
    });

    ///legend

    console.log(earthquakeData);

    createMap(earthquakes);
}


function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
    });




    //boundary layer for tectonic plates are added here
    var boundarylayer_style = {
        "color": "#C0392B",
        "weight": 1,
        "opacity": 0.9
    };

    let bLayer;

    d3.json(boundaryURL, function(d) {
        bLayer = L.geoJSON(d.features, { style: boundarylayer_style }).addTo(myMap);

    });



    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "satellite -v9": satellite
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes,
        // Tectonic_boundaries: bLayer

    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

    //////test to identigy what overlay maps is
    console.log(overlayMaps);
    console.log(earthquakes);


    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);



    //legend function= it is the same as the circlecolor function used at the top of the page.
    function getCircleColor(mag) {
        let color = "";
        if (mag < 5) {
            color = "yellow";
        } else if (mag < 6.5) {
            color = "orange";
        } else if (mag < 10.0) {
            color = "red";
        }
        return color;
    }

    //legend is added here
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'info legend'),
            // categories = ["less than 5", "less than 6.5", "less than 10"],
            categories = [0, 5, 6.5, 10],
            labels = ['<strong>Categories</strong>'];

        // loop through our earthquak intervals and generate a label with a colored square for each interval
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                // '<i style="background:' + getCircleColor(grades[i] + 1) + '"></i> ' +
                // grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                labels.push(
                    '<i class="circle" style="background:' + getCircleColor(categories[i]) + '"></i> ' +
                    // (categories[i] ? categories[i] : '+'));
                    categories[i] + (categories[i + 1] ? '&ndash;' + categories[i + 1] + '<br>' : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;

    };

    legend.addTo(myMap);



}