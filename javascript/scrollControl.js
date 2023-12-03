// Stepping Up Scroll Components
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// Initialize the scrollama
var scroller = scrollama();

var previousIndex = 0;
// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 2;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  let currentIndex = response.index;

  console.log("Previous index " + previousIndex);
  console.log("Current index " + currentIndex);
  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // update graphic based on step
  switch (currentIndex) {
    case 0:
      showBarGraph("Revenue");
      break;
    case 1:
      hideBarChart(previousIndex == 2 ? "chart2" : "chart1");
      break;
    case 2:
      showBarGraphNoColor("Revenue");
      break;
    case 3:
      hideBarChart(previousIndex == 4 ? "chart3" : "chart2");
      break;
    case 4:
      showBarGraphHighlightEras("Revenue");
      break;
    case 5:
      hideBarChart("chart3");
      break;
    default:
  }

  previousIndex = currentIndex;
  // update graphic based on step
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.6,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

init();
