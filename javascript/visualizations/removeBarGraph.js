/// Removes or hides all barChart related classes/tags
function hideBarChart(chart) {
  d3.selectAll("rect").transition().duration(500).style("opacity", 0).remove();
  d3.select(".myXaxis").transition().duration(500).style("opacity", 0).remove();
  d3.select(".myYaxis").transition().duration(500).style("opacity", 0).remove();
  d3.select(".myXaxis-2")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .remove();
  d3.select(".myYaxis-2")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .remove();
  d3.select(".attendance-title")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .remove();
  d3.select(".revenue-title")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .remove();
}
