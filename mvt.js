//initiate variables
var layerOptions = null;
var placeSelect = document.getElementById("placeSelect1").value;
var statusSelect = document.getElementById("placeSelect2").value;
var profileSelect = document.getElementById("placeSelect3").value;

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
        
        if (statusSelect == "all" && placeSelect=="all") {
            return true
        }
        if (statusSelect == "all" && placeSelect=="office") {
            return feature.properties.Office == "Yes"
        }
        if (statusSelect == "all" && placeSelect=="retail") {
            return feature.properties.Retail == "Yes"
        }
        if (statusSelect == "all" && placeSelect=="residential") {
            return feature.properties.Residential == "Yes"
        }
        if (statusSelect == "all" && placeSelect=="hotel") {
            return feature.properties.Hotel == "Yes"
        }
        if (statusSelect == "existing" && placeSelect=="all") {
            return feature.properties.status == "Existing"
        }
        if (statusSelect == "existing" && placeSelect=="office") {
            return feature.properties.status == "Existing" && feature.properties.Office == "Yes"
        }
        if (statusSelect == "existing" && placeSelect=="retail") {
            return feature.properties.status == "Existing" && feature.properties.Retail == "Yes"
        }
        if (statusSelect == "existing" && placeSelect=="residential") {
            return feature.properties.status == "Existing" && feature.properties.Residential == "Yes"
        }
        if (statusSelect == "existing" && placeSelect=="hotel") {
            return feature.properties.status == "Existing" && feature.properties.Hotel == "Yes"
        }
        if (statusSelect == "under_construction" && placeSelect=="all") {
            return feature.properties.status == "Under Construction" 
        }
        if (statusSelect == "under_construction" && placeSelect=="office") {
            return feature.properties.status == "Under Construction" && feature.properties.Office == "Yes"
        }
        if (statusSelect == "under_construction" && placeSelect=="retail") {
            return feature.properties.status == "Under Construction" && feature.properties.Retail == "Yes"
        }
        if (statusSelect == "under_construction" && placeSelect=="residential") {
            return feature.properties.status == "Under Construction" && feature.properties.Residential == "Yes"
        }
        if (statusSelect == "under_construction" && placeSelect=="hotel") {
            return feature.properties.status == "Under Construction" && feature.properties.Hotel == "Yes"
        }
        if (statusSelect == "in_the_pipeline" && placeSelect=="all") {
            return feature.properties.status == "In the Pipeline" 
        }
        if (statusSelect == "in_the_pipeline" && placeSelect=="office") {
            return feature.properties.status == "In the Pipeline" && feature.properties.Office == "Yes"
        }
        if (statusSelect == "in_the_pipeline" && placeSelect=="retail") {
            return feature.properties.status == "In the Pipeline" && feature.properties.Retail == "Yes"
        }
        if (statusSelect == "in_the_pipeline" && placeSelect=="residential") {
            return feature.properties.status == "In the Pipeline" && feature.properties.Residential == "Yes"
        }
        if (statusSelect == "in_the_pipeline" && placeSelect=="hotel") {
            return feature.properties.status == "In the Pipeline" && feature.properties.Hotel == "Yes"
        }
    }

    layerOptions = {
    	filter: filter,
        onEachFeature: onEachFeature
    };
    
}

createFeatures();

// create the layer and add to map
geojsonLayer = L.geoJson(mvt_buildings, layerOptions); 
map.addLayer(geojsonLayer);

//Create Function to remove and re-add layer based on user input
function updateMap() {
    placeSelect = document.getElementById("placeSelect1").value;
    statusSelect = document.getElementById("placeSelect2").value;
    map.removeLayer(geojsonLayer);
    geojsonLayer = L.geoJson(mvt_buildings, layerOptions); 
    map.addLayer(geojsonLayer); 
}

function showProfile() {
    profileSelect = document.getElementById("placeSelect3").value;
    window.open(profileSelect+'.html', '_blank');
    
}




