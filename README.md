# Lab 3: Covid-19 Web Maps

## In this lab, I learned how to design web map applications using Mapbox GL JS. I applied this knowledge to the development of two thematic web maps visualizing covid data in the U.S. Both maps are hosted within this Github repository. 

### [Map 1](https://nyadav18.github.io/covidmaps/map1.html) is a choropleth map of covid-19 rates on a county scale for the year 2020. The "rates" property was calculated as cases by county per thousand residents. The map's zoom allows you to view the entire country at once and examine the color differences displayed through the sequential color scheme. For closer examination and a more detailed analysis, map users can hover over a county and see the specific county's case rate. The map can be viewed at the link above or in the screenshot below.

![map1](img/map1img.png)

### [Map 2](https://nyadav18.github.io/covidmaps/map2.html) is a proportional symbols map of covid-19 cases in the U.S. Map users can get a good picture of the number of cases across the country and how they compare in various regions. The interactive clicking function shows the exact number of cases when a county or symbolized dot is clicked on. I had trouble with my legend for this map and adjusting the selector properties in the style sheet didn't do anything to help with the misaligned labels and the overlapping source and final label. 

![map2](img/map2img.png)

Libraries in use: The only additional library in use in this project is the Google Fonts Library, which ensures that the display remains the same no matter what computer is being used to view the maps. 

Data Source: Data for this project was acquired from the [New York Times](https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv) and the [U.S. Census](https://data.census.gov/table?g=0100000US$050000&d=ACS+5-Year+Estimates+Data+Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true)