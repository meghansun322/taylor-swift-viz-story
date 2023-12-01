function showMap() {
  var projection = d3
    .geoMercator()
    .center([4, 47]) // GPS of location to zoom on
    .scale(110) // This is like the zoom
    .translate([width / 2, height / 2]);

  d3.select("svg")
    .append("g")
    .attr("class", "legendOrdinal")
    .selectAll("path")
    .data(worldMapData.features)
    .enter()
    .append("path")
    .attr("fill", "#b8b8b8")
    .attr("d", d3.geoPath().projection(projection))
    .style("stroke", "black")
    .style("opacity", 0.3)
    .transition()
    .duration(1000);

  var Tooltip = d3
    .select("#chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  var mouseover = function (e, d) {
    Tooltip.style("opacity", 1);
    Tooltip.html(
      "<strong>" + d.region + "</strong>" + "<br>" + "streams: " + d.streams
    )
      .style("left", e.layerX + 10 + "px")
      .style("top", e.layerY + "px");
  };

  var mouseleave = function (d) {
    Tooltip.style("opacity", 0);
  };
  var ordinal = d3
    .scaleOrdinal()
    .domain([
      "less than 1 million",
      "1 million - 10 million",
      "10 million - 100 million",
      "100 million -  1 billion",
      "over 1 billion",
    ])
    .range([
      COLOR._DEBUT_GREEN,
      COLOR._FEARLESS_YELLOW,
      COLOR._LOVER_PINK,
      COLOR._RED_MARRON,
      COLOR._SPEAKNOW_PURPLE,
    ]);

  var legendOrdinal = d3
    .legendColor()
    .shape("path", d3.symbol().type(d3.symbolCircle).size(100)())
    .shapePadding(10)
    .scale(ordinal);
  console.log("legend" + legendOrdinal);
  svg
    .select(".legendOrdinal")
    .attr("transform", "translate(20,20)")
    .call(legendOrdinal);
  //Add circles:
  svg
    .selectAll("myCircles")
    .data(markers)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return projection([d.long, d.lat])[0];
    })
    .attr("cy", function (d) {
      return projection([d.long, d.lat])[1];
    })
    .attr("r", 5)
    .attr("class", "circle")
    .style("fill", function (d) {
      var streams = d.streams;
      switch (true) {
        case streams < 1000000:
          return COLOR._DEBUT_GREEN;
        case streams < 10000000:
          return COLOR._FEARLESS_YELLOW;
        case streams < 100000000:
          return COLOR._LOVER_PINK;
        case streams < 1000000000:
          return COLOR._RED_MARRON;
        default:
          return COLOR._SPEAKNOW_PURPLE;
      }
    })
    .attr("stroke", function (d) {
      var streams = d.streams;
      switch (true) {
        case streams < 1000000:
          return COLOR._DEBUT_GREEN;
        case streams < 10000000:
          return COLOR._FEARLESS_YELLOW;
        case streams < 100000000:
          return COLOR._LOVER_PINK;
        case streams < 1000000000:
          return COLOR._RED_MARRON;
        default:
          return COLOR._SPEAKNOW_PURPLE;
      }
    })
    .attr("stroke-width", 3)
    .attr("fill-opacity", 0.4)
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave);
}

function hideMap() {
  d3.select("svg").transition().duration(1000).style("opacity", 0).remove();
  d3.select(".tooltip")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();
}
