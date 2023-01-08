let map = new ol.Map({
    target: 'map',  // The ID of the HTML element where the map will be displayed
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()  // Use the OpenStreetMap tiles
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-79.3832, 43.6532]),  // Toronto, Canada
      zoom: 8
    })
  });