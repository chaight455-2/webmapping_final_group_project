// Check if a building is currently open based on its hours
// hours: object with keys like "monday", "tuesday", etc.
// each value: { open: "07:00", close: "22:00" } or null if closed that day
function isBuildingOpen(hours) {
    if (!hours) return true; // assume open if no hours data

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var now = new Date();
    var day = days[now.getDay()];
    var dayHours = hours[day];

    if (!dayHours) return false;

    var currentMinutes = now.getHours() * 60 + now.getMinutes();
    var openParts = dayHours.open.split(':');
    var closeParts = dayHours.close.split(':');
    var openMinutes = parseInt(openParts[0]) * 60 + parseInt(openParts[1]);
    var closeMinutes = parseInt(closeParts[0]) * 60 + parseInt(closeParts[1]);

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

// Format hours object into readable string
function formatHours(hours) {
    if (!hours) return 'Hours not available';

    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    var labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var result = '';

    for (var i = 0; i < days.length; i++) {
        var dayHours = hours[days[i]];
        if (dayHours) {
            result += '<div>' + labels[i] + ': ' + dayHours.open + ' - ' + dayHours.close + '</div>';
        } else {
            result += '<div>' + labels[i] + ': Closed</div>';
        }
    }

    return result;
}

// Get amenity count from building properties
function getAmenityCount(properties, type) {
    return properties[type] || 0;
}
