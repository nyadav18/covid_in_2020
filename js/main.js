mapboxgl.accessToken = 'pk.eyJ1IjoibnlhZGF2OCIsImEiOiJjbGRtOWJoNXQwMWxmM29vNGtjYm82bWg0In0.YJeqlAttyH5UPgOCIsnGxQ';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-96.9, 37.8], // starting position: Seattle [lng, lat]
    zoom: 4 // starting zoom
});

async function geojsonFetch() {
    let response = await fetch('assets/us-covid-2020-rates.json');
    let case_rates = await response.json();


    map.on('load', function loadingData() {

        map.addSource('case_rates', {
            type: 'geojson',
            data: case_rates
        });

        map.addLayer({
            'id': 'rate-layer',
            'type': 'fill',
            'source': 'case_rates',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#FFEDA0',   // stop_output_0
                    10,          // stop_input_0
                    '#FED976',   // stop_output_1
                    20,          // stop_input_1
                    '#FEB24C',   // stop_output_2
                    50,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    100,         // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    200,         // stop_input_4
                    '#E31A1C'   // stop_output_5

                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
            }
        });

    });

    const layers = [
        '0-9',
        '10-19',
        '20-49',
        '50-99',
        '100-199',
        '200 and more'
    ];

    const colors = [
        '#FFEDA070',
        '#FED97670',
        '#FEB24C70',
        '#FD8D3C70',
        '#FC4E2A70',
        '#E31A1C70'
    ];

    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Case Rates<br>(cases/thousand residents)</b><br><br>";

        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = layer;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });

        const source = 
            '<p style ="text-align: left; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a></p>';
            
        legend.innerHTML += source;

        map.on('mousemove', ({point}) => {
            const county = map.queryRenderedFeatures(point, {
                layers: ['rate-layer']
            });
            document.getElementById('text-description').innerHTML = county.length ?
                `<h3>${county[0].properties.county}, ${county[0].properties.state}</h3><p><strong><em>${county[0].properties.rates}</strong> rates per thousand residents</em></p>` :
                `<p>Hover over a county!</p>`;   
        });
}

geojsonFetch();