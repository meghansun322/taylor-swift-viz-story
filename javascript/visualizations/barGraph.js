// BAR CHART VISUALIZATION

/// Removes or hides all barChart related classes/tags
function hideBarChart(chart) {
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
  }

  d3.selectAll("rect").transition().duration(1000).style("opacity", 0).remove();
  d3.select(".myXaxis").transition().duration(1000).style("opacity", 0);
  d3.select(".myYaxis").transition().duration(1000).style("opacity", 0);
}

function showBarGraphNoColor(selectedVar) {
  showBarGraph(selectedVar, false);
}

function showBarGraphHighlightEras(selectedVar) {
  showBarGraph(selectedVar, false, true);
}

function sideBySideGraph() {
  // Set Bar Margins
  let bar_width = 400 - margin.left - margin.right;
  let bar_height = 400 - margin.top - margin.bottom;

  // Initialize the X axis
  x = d3.scaleBand().range([0, bar_width]).padding(0.2);

  // Initialize the Y axis
  y1 = d3.scaleLinear().range([bar_height, 0]);

  // X axis for Chart 1
  x.domain(
    tourData.map(function (d) {
      return d.tour;
    })
  );

  d3.select(".myXaxis")
    .call(d3.axisBottom(x))
    .transition()
    .duration(1000)
    .attr(
      "transform",
      "translate(80," + (400 - margin.top - margin.bottom) + ")"
    )
    .style("opacity", 1)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  svg
    .append("g")
    .attr("class", "myXaxis-2")
    .attr(
      "transform",
      "translate(480," + (400 - margin.top - margin.bottom) + ")"
    );

  d3.select(".myXaxis-2")
    .call(d3.axisBottom(x))
    .transition()
    .duration(1000)
    .style("opacity", 1)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  y1.domain([
    0,
    d3.max(tourData, function (d) {
      return d.revenue * 1.2;
    }),
  ]);

  d3.select(".myYaxis")

    .call(d3.axisLeft(y))
    .transition()
    .duration(1000)
    .attr("transform", "translate(80, 0)")
    .style("opacity", 1);

  d3.selectAll("#chart-title-1")
    .style("display", "inline-block")
    .style("opacity", 1)

    .html(`<strong> Revenue </strong>`)
    .attr("transform", "translate(150, 0)");

  d3.selectAll("#chart-title-2")
    .style("display", "inline-block")
    .style("opacity", 1)

    .html(`<strong> Attendance </strong>`)
    .attr("transform", "translate(550, 0)");

  // Maps data to existing bars; if not enough, generates more
  var u = svg.selectAll("rect").data(tourData);

  // Update bars
  u.enter()
    .append("rect")
    .merge(u)
    .attr("x", function (d) {
      console.log(d);
      return x(d.tour);
    })
    .attr("width", x.bandwidth())
    .attr("y", (d) => y1(0))
    .attr("height", (d) => bar_height - y1(0)) // always equal to 0
    .attr("transform", "translate(80, 0)")
    .style("opacity", 1)
    .attr("fill", function (d) {
      switch (d.tour) {
        case "Fearless Tour":
          return COLOR._FEARLESS_YELLOW;
        case "Speak Now Tour":
          return COLOR._SPEAKNOW_PURPLE;
        case "Red Tour":
          return COLOR._RED_MARRON;
        case "1989 Tour":
          return COLOR._1989_BLUE;
        case "Reputation Tour":
          return COLOR._REPUTATION_BLACK;
        case "*Eras Tour":
          return COLOR._MIDNIGHTS_NAVY;
        default:
          return "blue";
      }
    })
    .transition()
    .duration(800)
    .attr("y", function (d) {
      console.log(y1(d.revenue));
      return y(d.revenue);
    })
    .attr("height", function (d) {
      console.log(bar_height);
      console.log(y(d.revenue));
      return bar_height - y1(d.revenue);
    })
    .delay((d, i) => {
      return i * 100;
    });

  svg
    .append("g")
    .attr("class", "myYaxis-2")
    .attr(
      "transform",
      "translate(480," + (400 - margin.top - margin.bottom) + ")"
    );

  // Graph 2 Y Axis
  var y2 = d3.scaleLinear().range([bar_height, 0]);
  y2.domain([
    0,
    d3.max(tourData, function (d) {
      return d.attendance * 1.2;
    }),
  ]);

  d3.select(".myYaxis-2")
    .call(d3.axisLeft(y2))
    .transition()
    .duration(1000)
    .style("opacity", 1)
    .attr("transform", "translate(480, 0)");

  // Update bars
  u.enter()
    .append("rect")
    .merge(u)
    .attr("x", function (d) {
      return x(d.tour);
    })
    .attr("width", x.bandwidth())
    .attr("y", (d) => y2(0))
    .attr("height", (d) => bar_height - y2(0)) // always equal to 0
    .attr("transform", "translate(480, 0)")
    .style("opacity", 1)
    .attr("fill", function (d) {
      switch (d.tour) {
        case "Fearless Tour":
          return COLOR._FEARLESS_YELLOW;
        case "Speak Now Tour":
          return COLOR._SPEAKNOW_PURPLE;
        case "Red Tour":
          return COLOR._RED_MARRON;
        case "1989 Tour":
          return COLOR._1989_BLUE;
        case "Reputation Tour":
          return COLOR._REPUTATION_BLACK;
        case "*Eras Tour":
          return COLOR._MIDNIGHTS_NAVY;
        default:
          return "blue";
      }
    })
    .transition()
    .duration(800)
    .attr("y", function (d) {
      console.log(y(d.attendance));
      return y2(d.attendance);
    })
    .attr("height", function (d) {
      return bar_height - y2(d.attendance);
    })
    .delay((d, i) => {
      return i * 100;
    });
}

// function show
function showBarGraph(
  selectedVar,
  distinctColors = true,
  highlightEras = false,
  showTitle = false
) {
  // Set Bar Margins
  let bar_width = 460 - margin.left - margin.right;
  let bar_height = 400 - margin.top - margin.bottom;

  // Initialize the X axis
  x = d3.scaleBand().range([0, bar_width]).padding(0.2);

  // Initialize the Y axis
  y = d3.scaleLinear().range([bar_height, 0]);

  // X axis
  x.domain(
    tourData.map(function (d) {
      return d.tour;
    })
  );
  d3.select(".myXaxis")
    .call(d3.axisBottom(x))
    .transition()
    .duration(1000)
    .style("opacity", 1)
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  y.domain([
    0,
    d3.max(tourData, function (d) {
      return selectedVar == "Revenue" ? d.revenue * 1.2 : d.attendance * 1.2;
    }),
  ]);
  d3.select(".myYaxis")
    .call(d3.axisLeft(y))
    .transition()
    .duration(1000)
    .style("opacity", 1);

  if (distinctColors == true) {
    d3.selectAll("#bar-button")
      .style("display", "inline-block")
      .style("opacity", 1);
  } else if (highlightEras == true) {
    d3.selectAll("#bar-button-Eras")
      .style("display", "inline-block")
      .style("opacity", 1);
  } else if ((showTitle = true)) {
    d3.selectAll("#chart-title")
      .style("display", "inline-block")
      .style("opacity", 1)
      .html(`<strong> ${selectedVar} </strong>`);
  } else {
    d3.selectAll("#bar-button-noColor")
      .style("display", "inline-block")
      .style("opacity", 1);
  }

  // Maps data to existing bars; if not enough, generates more
  var u = svg.selectAll("rect").data(tourData);

  // Update bars
  u.enter()
    .append("rect")
    .merge(u)
    .attr("x", function (d) {
      return x(d.tour);
    })
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(0))
    .attr("height", (d) => bar_height - y(0)) // always equal to 0
    .attr("fill", function (d) {
      if (distinctColors === true) {
        switch (d.tour) {
          case "Fearless Tour":
            return COLOR._FEARLESS_YELLOW;
          case "Speak Now Tour":
            return COLOR._SPEAKNOW_PURPLE;
          case "Red Tour":
            return COLOR._RED_MARRON;
          case "1989 Tour":
            return COLOR._1989_BLUE;
          case "Reputation Tour":
            return COLOR._REPUTATION_BLACK;
          case "*Eras Tour":
            return COLOR._MIDNIGHTS_NAVY;
          default:
            return "blue";
        }
      } else if (highlightEras == true) {
        switch (d.tour) {
          case "*Eras Tour":
            return COLOR._MIDNIGHTS_NAVY;
          default:
            return "gray";
        }
      } else {
        switch (d.tour) {
          case "Fearless Tour":
            return COLOR._LIGHT_BLUE;
          case "Speak Now Tour":
            return COLOR._BLUE;
          case "Red Tour":
            return COLOR._PURPLE;
          case "1989 Tour":
            return COLOR._RED;
          case "Reputation Tour":
            return COLOR._PINK;
          case "*Eras Tour":
            return COLOR._ORANGE;
          default:
            return COLOR._YELLOW;
        }
      }
    })
    .attr("transform", "translate(200, 0)")
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y(selectedVar == "Revenue" ? d.revenue : d.attendance);
    })
    .attr("height", function (d) {
      console.log(bar_height);
      console.log(y(d.revenue));
      return (
        bar_height - y(selectedVar == "Revenue" ? d.revenue : d.attendance)
      );
    })
    .style("opacity", 1)
    .delay((d, i) => {
      return i * 100;
    });
}
