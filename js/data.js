// Fetch building GeoJSON data and pass to callback
function loadData(callback) {
    fetch(CONFIG.DATA_PATH)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
