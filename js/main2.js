mapboxgl.accessToken = 'pk.eyJ1IjoibnlhZGF2OCIsImEiOiJjbGRtOWJoNXQwMWxmM29vNGtjYm82bWg0In0.YJeqlAttyH5UPgOCIsnGxQ';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-96.9, 37.8], // starting position [lng, lat]
    zoom: 4, // starting zoom
    minZoom: 4
});
const cases = [1, 1181, 2314, 5454, 756412],
    colors = ['rgb(242,240,247)','rgb(203,201,226)','rgb(158,154,200)','rgb(117,107,177)','rgb(84,39,143)'],
    radii = [5, 10, 15, 18, 20];

map.on('load', function loadingdata() {
    map.addSource('counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });

    map.addLayer({
        'id': 'case-point',
        'type': 'circle',
        'source': 'counts',

        'paint': {
            // increase the radii of the circle as the zoom level and dbh value increases
            'circle-radius': {
                'property': 'cases',
                'type': 'exponential',
                'stops': [
                    [cases[0], radii[0]],
                    [cases[1], radii[1]],
                    [cases[2], radii[2]],
                    [cases[3], radii[3]],
                    [cases[4], radii[4]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [cases[0], colors[0]],
                    [cases[1], colors[1]],
                    [cases[2], colors[2]],
                    [cases[3], colors[3]],
                    [cases[4], colors[4]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });

// click on tree to view magnitude in a popup
    map.on('click', 'case-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
            .addTo(map);
    });
});

const legend = document.getElementById('legend');

var labels = ['<strong>Number of Cases</strong>'], vbreak;

for (var i = 0; i < cases.length; i++) {
    vbreak = "at least " + cases[i];

    dot_radius = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p');
}

const source = 
    '<p style ="text-align: center; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a></p>';

legend.innerHTML = labels.join('') + source;