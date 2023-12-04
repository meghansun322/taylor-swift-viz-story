/// Removes or hides all barChart related classes/tags
function hideBarChart(chart) {
  d3.selectAll("rect").transition().duration(1000).style("opacity", 0).remove();
  d3.select(".myXaxis")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();

  d3.select(".myYaxis")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();

  if (chart == "chart1") {
    d3.selectAll("#bar-button")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .transition()
      .duration(100)
      .style("display", "none");
  } else if (chart == "chart2") {
    d3.selectAll("#bar-button-noColor")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .transition()
      .duration(100)
      .style("display", "none");
  } else if (chart == "chart3") {
    d3.selectAll("#bar-button-Eras")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .transition()
      .duration(100)
      .style("display", "none");
  } else if (chart == "chart4") {
    d3.select(".myXaxis-2")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();
    d3.select(".myYaxis-2")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();
    d3.selectAll("text")
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();
  }
}
