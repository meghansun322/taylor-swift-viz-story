let julyDataset;
var taylorJulyDataset;
let octoberDataset;
let tourData;
let markers;
let worldMapData;

// Billboard Top 200 July 22, 2023
d3.csv("data/billboard-200-2023-07-22.csv", function (d) {
  return {
    rank: +d["current_week"],
    title: d["title"],
    artist: d["performer"], // + cast numeric colums into numbers
    last_week_rank: +d["last_week"],
    weeks_on_chart: +d["wks_on_chart"],
  };
}).then(function (data) {
  julyDataset = data;

  var i = 0;
  taylorJulyDataset = data.filter((d) => {
    return d.artist == "Taylor Swift";
  });

  taylorJulyDataset.forEach(function (e) {
    e.index = i;
    i++;
  });
});

// Billboard Top 200 October 21, 2023
d3.csv("data/billboard-200-2023-10-21.csv", function (d) {
  return {
    rank: +d["current_week"],
    title: d["title"],
    artist: d["performer"], // + cast numeric colums into numbers
    last_week_rank: +d["last_week"],
    weeks_on_chart: +d["wks_on_chart"],
  };
}).then(function (data) {
  octoberDataset = data;
});

// Taylor Swift Tour Revenue and Attendance
d3.csv("data/taylor-swift-tour-data-cleanup.csv", function (d) {
  return {
    tour: d["Tour"],
    attendance: +d["Attendance"],
    revenue: +d["Revenue"],
  };
}).then(function (data) {
  var i = 0;
  tourData = data;
  tourData.forEach(function (e) {
    e.index = i;
    i++;
  });
});

// Taylor Swift Streams by Country
d3.csv("data/ts-streams-by-country.csv", function (d) {
  return {
    long: +d["Long"],
    lat: +d["Lat"],
    region: d["Region"],
    streams: +d["Streams"],
  };
}).then(function (data) {
  markers = data;
});

// World Map GeoJSON data
d3.json(
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
).then(function (data) {
  worldMapData = data;
});
