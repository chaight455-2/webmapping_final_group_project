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
    var openMinutes = toMinutes(dayHours.open);
    var closeMinutes = toMinutes(dayHours.close);

    // Handle post-midnight close (e.g. "7am-12am" where close is "24:00")
    if (closeMinutes <= openMinutes) closeMinutes += 24 * 60;

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function toMinutes(hhmm) {
    var parts = hhmm.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
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
            result += '<div>' + labels[i] + ': ' + displayTime(dayHours.open) + ' - ' + displayTime(dayHours.close) + '</div>';
        } else {
            result += '<div>' + labels[i] + ': Closed</div>';
        }
    }

    return result;
}

function displayTime(hhmm) {
    var parts = hhmm.split(':');
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    if (h === 24) return '12:00 am';
    var suffix = h >= 12 ? 'pm' : 'am';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return m === '00' ? (h12 + suffix) : (h12 + ':' + m + suffix);
}

// Get amenity count from building properties
function getAmenityCount(properties, type) {
    return properties[type] || 0;
}

// Turn CSV hour strings like "9am-5pm", "7am-10pm", "24 hours", "Closed", ""
// into the app's { open: "HH:MM", close: "HH:MM" } shape (or null when closed).
function parseCsvHours(str) {
    if (str == null) return null;
    var s = String(str).trim().toLowerCase();
    if (!s || s === 'null' || s === 'closed') return null;
    if (s === '24 hours' || s === '24/7' || s === 'open 24 hours') {
        return { open: '00:00', close: '24:00' };
    }
    if (s === 'event-dependent' || s === 'event-based') {
        return null;
    }
    var m = s.match(/^([0-9]{1,2})(?::([0-9]{2}))?\s*(am|pm)\s*[-\u2013]\s*([0-9]{1,2})(?::([0-9]{2}))?\s*(am|pm)$/);
    if (!m) return null;
    return {
        open: to24(m[1], m[2], m[3]),
        close: to24(m[4], m[5], m[6])
    };
}

function to24(h, mm, ap) {
    var hour = parseInt(h, 10);
    var min = mm ? parseInt(mm, 10) : 0;
    if (ap === 'am') {
        if (hour === 12) hour = 0;
    } else {
        if (hour !== 12) hour += 12;
    }
    var hStr = (hour < 10 ? '0' : '') + hour;
    var mStr = (min < 10 ? '0' : '') + min;
    return hStr + ':' + mStr;
}

// Adapt a parsed CSV row into the property shape popup.js / buildings.js expect.
function csvRowToBuildingProps(row) {
    var dayCols = {
        monday: 'monday_hours', tuesday: 'tuesday_hours', wednesday: 'wednesday_hours',
        thursday: 'thursday_hours', friday: 'friday_hours', saturday: 'saturday_hours',
        sunday: 'sunday_hours'
    };
    var hours = {};
    for (var day in dayCols) hours[day] = parseCsvHours(row[dayCols[day]]);

    var access = cleanStr(row.access_notes);
    var notes = cleanStr(row.notes);

    function amenity(count, floor, defaultLocation) {
        var n = parseInt(count, 10) || 0;
        if (n <= 0) return { count: 0, details: [] };
        var details = [];
        details.push({
            floor: cleanStr(floor) || 'N/A',
            location: defaultLocation,
            access: access || 'Public'
        });
        return { count: n, details: details };
    }

    var mw = amenity(row.num_microwaves, row.floor_microwave, 'See building directory');
    var fr = amenity(row.num_refrigerators, row.floor_refrigerator, 'See building directory');
    var vd = amenity(row.num_vending_machines, row.floor_vending_machine, 'See building directory');
    var cp = amenity(row.num_public_computer_labs, row.floor_public_computers, 'See building directory');
    var pr = amenity(row.num_printers_copiers, row.floor_printers_copiers, 'See building directory');

    return {
        hours: hours,
        microwaves: mw.count,
        microwaves_details: mw.details,
        refrigerators: fr.count,
        refrigerators_details: fr.details,
        vending: vd.count,
        vending_details: vd.details,
        computers: cp.count,
        computers_details: cp.details,
        printers: pr.count,
        printers_details: pr.details,
        access_notes: access,
        notes: notes
    };
}

function cleanStr(v) {
    if (v == null) return null;
    var s = String(v).trim();
    if (!s || s.toLowerCase() === 'null') return null;
    return s;
}
