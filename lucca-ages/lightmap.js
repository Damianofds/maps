$( document ).ready(loadMap);

function loadMap(){
    var mapConfig = jsonMap;
    mapConfig.layers;

    if(!validateMapObject(mapConfig.map)){
        alert("Something went badly wrong! Check the console for more info");
        throw new Error("Error in the Map configuration - check your mapConfig.json");
    }

    if(!validateLayersObject(mapConfig.layers)){
        alert("Something went badly wrong! Check the console for more info");
        throw new Error("Error in the Layers configuration - check your mapConfig.json");
    }

    /**
        Parse the map configuration:
        - Create WMS or TMS layers
        - identify baseMaps, overlayMaps, activelayers or var timeseries
    */
    var baseMaps = [];
    var overlayMaps = [];
    var activelayers = [];
    var timeseries = [];

    var layers = mapConfig.layers;
    for(var i=0; i<layers.length; i++){
        var lyr = layers[i];
        var tmpLayer;
        if(lyr.type == "TMS"){
            tmpLayer = L.tileLayer(lyr.url,{
                attribution: lyr.attribution
            })
        }
        if(lyr.type == "WMS"){
            if(lyr.timedimension){
                tmpLayer = L.tileLayer.wms(mapConfig.map[0].wmsSource, {
                    layers: lyr.layerName,
                    transparent: true,
                    format: 'image/png8',
                    time: '2001-01-01T00:00:00.000Z'
                });
            }else{
                tmpLayer = L.tileLayer.wms(mapConfig.map[0].wmsSource, {
                    layers: lyr.layerName,
                    format: lyr.format,
                    transparent: lyr.transparent,
                    attribution: lyr.attribution
                });
            }
        }
        if(lyr.basemap){
            baseMaps[lyr.label] = tmpLayer;
        }else{
            overlayMaps[lyr.label] = tmpLayer;
        }
        if(lyr.active){
            activelayers.push(tmpLayer);
        }
        if(lyr.timedimension){
            timeseries.push(tmpLayer);
        }
    }

    /**
        Build the map object as configured in the map configuration
    */
    var map;
    map = L.map('map', {
            center: mapConfig.map[0].center,
            zoom: mapConfig.map[0].zoom,
            layers: activelayers
        });
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    var sliderControl = L.control.sliderControlFds({
        position: 'topright', 
        layers: timeseries,
        startTime: '0001',
        endTime: '2015',
        timeStep: 60*60*24*368*500,
        range: true}).addTo(map);
    sliderControl.startSlider();
    
    $.event.trigger({
        type: "lightmap-loaded"
    });
}
/**
    Helper functions
*/
function validateMapObject(map){
    if(map && map[0].wmsSource && map[0].center && map[0].zoom){
        return true;
    }
    else{
        return false;
    }
}

function validateLayersObject(layers){
    return true;
}