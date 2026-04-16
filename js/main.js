// Entry point — bootstrap the application
(function() {
    var map = createMap();

    loadAll(function(data) {
        var boundaryLayer = addBoundary(map, data.boundary);
        var buildingLayer = addBuildings(map, data.buildings);

        map.fitBounds(boundaryLayer.getBounds(), { padding: [10, 10] });

        initFilter(map, buildingLayer);
        initSearch(map, buildingLayer);
    });

    initGeolocation(map);
})();
