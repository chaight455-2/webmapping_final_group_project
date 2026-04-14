// Entry point — bootstrap the application
(function() {
    var map = createMap();

    loadData(function(data) {
        var buildingLayer = addBuildings(map, data);
        initFilter(map, buildingLayer);
        initSearch(map, buildingLayer);
    });

    initGeolocation(map);
})();
