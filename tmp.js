const lst = [{lat: 40.091382619054095, lng: -88.20355570065745},
    {lat: 40.119465429980075, lng: -88.25631429231643},
    {lat: 40.0843671435526, lng: -88.17966413209922},
    {lat: 40.12074849817585, lng: -88.25780941212209},
    {lat: 40.06034974698892, lng: -88.26023937839072},
    {lat: 40.08929359365313, lng: -88.2293212571064},
    {lat: 40.10695518042118, lng: -88.20294633023903},
    {lat: 40.12205323776675, lng: -88.20281939120444},
    {lat: 40.07345054618992, lng: -88.20340377296542},
    {lat: 40.10195486689165, lng: -88.22314440118363},
    {lat: 40.08627578966312, lng: -88.24814482668927},
    {lat: 40.095659382411704, lng: -88.26933356741124},
    {lat: 40.14780641457074, lng: -88.18783449356478},
    {lat: 40.13708721330871, lng: -88.22599153082079},
    {lat: 40.14808287435217, lng: -88.23210089628816},
    {lat: 40.134018355628534, lng: -88.23616233564462},
    {lat: 40.10934560686244, lng: -88.18844015930223},
    {lat: 40.05700839339326, lng: -88.26322922204145},
    {lat: 40.08855865725717, lng: -88.2480154176881},
    {lat: 40.137259184864476, lng: -88.20867283496352}]

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function get_dist(p1, p2, testing=false) {
    let R = 6371;
    let lat1 = Math.asin(p1.z / R)* 180 / Math.PI;
    let lat2 = Math.asin(p2.z / R)* 180 / Math.PI;
    let lng1 = Math.atan2(p1.y, p1.x)* 180 / Math.PI;
    let lng2 = Math.atan2(p2.y, p2.x)* 180 / Math.PI;
    if (testing) {
        console.log("lat1", lat1, "lng1", lng1, "lat2", lat2, "lng2", lng2);
    }

    return getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
}

function toCartesian(lat, lng) {
    lat = lat * Math.PI / 180;
    lng = lng * Math.PI / 180;
    let R = 6371
    let x = R * Math.cos(lat) * Math.cos(lng);
    let y = R * Math.cos(lat) * Math.sin(lng);
    let z = R * Math.sin(lat);
    temp_z = z;
    return { x, y, z };
}

let pt = {lat: 40.091382619054095, lng: -88.20355570065745};
let pt2 = {lat: 40.119465429980075, lng: -88.25631429231643};
let cart1 = toCartesian(pt.lat, pt.lng);
let cart2 = toCartesian(pt2.lat, pt2.lng);
let dist = get_dist(cart1, cart2, true);
console.log(dist);
