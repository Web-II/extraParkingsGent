export class StreetMap {
  constructor() {
    this.map = null;
    this.createMap();
  }
  createMap() {
    //Create Tile layer
    let osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    // Create latitude and longitude and convert them to default projection
    const dest = ol.proj.fromLonLat([0, 0]);
    // Create a View, set it center and zoom level
    let view = new ol.View({
      center: dest,
      zoom: 15
    });
    // Instanciate a Map, set the object target to the map DOM id
    this.map = new ol.Map({
      target: "map"
    });
    // Add the created layers to the Map
    this.map.addLayer(osmLayer);
    // Set the view for the map
    this.map.setView(view);
  }

  setMarker(long,lat) {
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([
          long,
          lat
        ])
      )
    });
    marker.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon(
          /** @type {olx.style.IconOptions} */ ({
            color: "#FF71AE",
            src: "images/dot.png"
          })
        )
      })
    );
    //create vector layer
    let vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [marker]
      })
    });
    const pos = ol.proj.fromLonLat([
      long,
      lat
    ]);
    let view = new ol.View({
      center: pos,
      zoom: 18
    });
    this.map.addLayer(vectorLayer);
    // Set the view for the map
    this.map.setView(view);
  }
}