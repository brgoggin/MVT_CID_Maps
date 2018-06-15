//initiate variables
var layerOptions = null;
var placeSelect = document.getElementById("placeSelect1").value;
//var prop_type = document.getElementById("placeSelect1").value;
//alert(placeSelect.options[placeSelect.selectedIndex].value)

// Create variable to hold map element, give initial settings to map
var map = L.map('map', { center: [38.902530, -77.016877], zoom: 16});

var geojsonLayer;

// Add Tile Layer
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ZwbGFubmluZzEiLCJhIjoiY2o3M3VxYWZoMGp0ODJ3bnU2cng2Z21ldiJ9.XuWMZzFbn_fjFWamKYzv0w', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

function createFeatures() {
    /**********************************************
    **ADD HOVER AND CLICK FUNCTIONALITY************
    ************************************************/

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    //on click, pan/zoom to feature and show popup
    function clickFeature(e) {
        var target = e.target;
        var latlng = target._latlng;
        var props = target.feature.properties;
        var popupContent ='<span class="popup-label"><b>' + props.name + '</b></span>'+
        '<br /><span class="popup-label"><b>Owner: ' + props.Owner + '</b></span>'+
        '<br /><span class="popup-label"><b>Address: ' + props.addr_stree + '</b></span>'+
        '<br /><span class="popup-label"><a href=' + props.alt_name + '.html target="_blank"><b> More Info</b></a></span>';

    
        var popup = L.popup({closeOnClick: false}).setContent(popupContent).setLatLng(latlng);
        target.bindPopup(popup).openPopup(); 
    
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickFeature
        });
    }

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }

    function filter(feature, layer) {
    
        if (placeSelect == "all") {
            return true
        }
        else if (placeSelect == "office") {
            return feature.properties.Office == "Yes"
        }
        else if (placeSelect == "retail") {
            return feature.properties.Retail == "Yes"
        }
        else if (placeSelect == "residential") {
            return feature.properties.Residential == "Yes"
        }
        else if (placeSelect == "hotel") {
            return feature.properties.Hotel == "Yes"
        }
    }

    layerOptions = {
    	filter: filter,
        onEachFeature: onEachFeature
    };
    
}

createFeatures();



//Create Function to remove and re-add layer based on user input
function myFunction() {
    //prop_type = document.getElementById("placeSelect1").value;
    //placeSelect = prop_type;
    //createFeatures();
    //alert(placeSelect);
    //map.removeLayer(geojsonLayer);
    //geojsonLayer = L.geoJson(mvt_buildings, layerOptions); 
    //map.addLayer(geojsonLayer);
    //location.reload();
}

// create the layer and add to map
geojsonLayer = L.geoJson(mvt_buildings, layerOptions); 
map.addLayer(geojsonLayer);




