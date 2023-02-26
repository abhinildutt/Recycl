let map;

// 1. Initialize an empty set of circles.
// 2. While the number of circles in the set is less than k:
// 3. a. For each point that is not already covered by a circle, calculate the number of points that would be covered by a circle centered at that point with radius r.
// 4. b. Select the point that would be covered by the largest number of uncovered points.
// 5. c. Add a circle centered at the selected point with radius r to the set of circles.
// 6. Output the set of k circles.
function do_circles(k, points, r) { // k = 5, r = 0.1
    // generate all subsets of points
    


    // for (let point of points) {
    //     console.log(point)
    // }

    let circles = [];
    let global_covered = new Set();
    let idx = [];
    while (circles.length < k) {
        let max = 0;
        let max_point = null;
        let max_i = 0;
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            let covered = new Set(global_covered);
            if (covered.has(point)) {
                continue;
            }
            let count = 0;
            for (let j = 0; j < points.length; j++) {
                let other = points[j];
                if (covered.has(other)) {
                    continue;
                }
                let dist = Math.sqrt((point.x - other.x) ** 2 + (point.y - other.y) ** 2);
                // console.log(i,j,': ', dist)
                if (dist <= r) {
                    if (i == 11 || i == 9)
                        console.log(i, 'covers', j, '\n')
                    count++;
                }
            }
            // console.log(i, 'covered: ', count)
            if (count > max) {
                max = count;
                max_point = point;
                max_i = i;
            }
        }
        circles.push(max_point);
        idx.push(max_i)
        for (let point of points) {
            let dist = Math.sqrt((point.x - max_point.x) ** 2 + (point.y - max_point.y) ** 2);
            if (dist <= r) {
                global_covered.add(point);
            }
        }
    }
    console.log(circles);
    return idx
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.1020, lng: -88.2272 },
        zoom: 10,
    });

    uiuc_lat_lng = { lat: 40.1020, lng: -88.2272 };

    // create 10 random markers that are within 50 miles of UIUC
    let toy_lat_lng = [];
    for (let i = 0; i < 20; i++) {
        let lat = uiuc_lat_lng.lat + (Math.random() - 0.5) * 0.25;
        let lng = uiuc_lat_lng.lng + (Math.random() - 0.5) * 0.25;
        toy_lat_lng.push({ lat: lat, lng: lng });
    }

    // convert latitude and longitude to cartesian coordinates
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    function toCartesian(lat, lng) {
        lat = lat * Math.PI / 180;
        lng = lng * Math.PI / 180;
        let R = 6371
        let x = R * Math.cos(lat) * Math.cos(lng);
        let y = R * Math.cos(lat) * Math.sin(lng);
        let z = R * Math.sin(lat);
        return { x, y };
    }

    let points = []
    for (let point of toy_lat_lng) {
        points.push(toCartesian(point.lat, point.lng));
    }
    const r = 3;
    let idx = do_circles(2, points, r);
    for (let id of idx) {
        let circle = toy_lat_lng[id];
        new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: circle,
            radius: r * 1000, // todo: fix this
        });
    }

    for (let i = 0; i < toy_lat_lng.length; i++) {
        new google.maps.Marker({
            position: toy_lat_lng[i],
            map,
            label: i.toString(),
        });
    }
}

window.initMap = initMap;
