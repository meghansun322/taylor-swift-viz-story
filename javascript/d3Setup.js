//variables for the font family, and some colors

const COLOR = {
  _1989_BLUE: "#b2dcf4",
  _SPEAKNOW_PURPLE: "#BEA7C4",
  _DEBUT_GREEN: "#BDCFB7",
  _FEARLESS_YELLOW: "#E8C490",
  _RED_MARRON: "#6D3D46",
  _REPUTATION_BLACK: "#000003",
  _LOVER_PINK: "#EAB4CC",
  _FOLKLORE_WHITE: "#f5f1f1;",
  _EVERMORE_BROWN: "#CC9D83",
  _MIDNIGHTS_NAVY: "#464D60",
  _LIGHT_BLUE: "#46bff2",
  _BLUE: "#465af2",
  _PURPLE: "#7066ff",
  _RED: "#ff6666",
  _ORANGE: "#ffa166",
  _PINK: "#f266ff",
  _YELLOW: "#e5ff66",
};

const margin = { top: 60, right: 30, bottom: 70, left: 60 },
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

//10 rows and 10 columns
var numRows = 10;
var numCols = 20;

//x and y axis scales
var y = d3.scaleBand().range([0, 300]).domain(d3.range(numRows));
var x = d3.scaleBand().range([0, 700]).domain(d3.range(numCols));
// Main Component for
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g");
var xAxis = svg
  .append("g")
  .attr("class", "myXaxis")
  .attr(
    "transform",
    "translate(200," + (400 - margin.top - margin.bottom) + ")"
  );

var yAxis = svg
  .append("g")
  .attr("class", "myYaxis")
  .attr("transform", "translate(200,0)");
