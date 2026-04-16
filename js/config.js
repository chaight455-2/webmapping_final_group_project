var CONFIG = {
    CENTER: [43.0766, -89.4125],
    ZOOM: 15,
    TILE_URL: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    CSV_PATH: 'data/building-data.csv',
    FOOTPRINTS_PATH: 'data/Building Footprints.geojson',
    BOUNDARY_PATH: 'data/Campus Boundary.json',
    AMENITIES: [
        { type: 'microwaves', label: 'Microwaves', color: '#e74c3c', icon: '🔴' },
        { type: 'refrigerators', label: 'Refrigerators', color: '#3498db', icon: '🔵' },
        { type: 'vending', label: 'Vending Machines', color: '#2ecc71', icon: '🟢' },
        { type: 'computers', label: 'Public Computers', color: '#9b59b6', icon: '🟣' },
        { type: 'printers', label: 'Printers/Copy Machines', color: '#f39c12', icon: '🟠' }
    ],
    CLOSED_COLOR: '#c0392b',
    OPEN_COLOR: '#2ecc71',
    DEFAULT_COLOR: '#3388ff',
    BOUNDARY_STYLE: {
        color: '#c5050c',
        weight: 2,
        dashArray: '6 4',
        fill: false,
        interactive: false
    }
};
