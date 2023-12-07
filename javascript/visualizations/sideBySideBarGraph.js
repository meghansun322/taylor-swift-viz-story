function sideBySideGraph(eras = false, highlightEras = false) {
  // Set Bar Margins
  console.log("called");
  let bar_width = 400 - margin.left - margin.right;
  let bar_height = 400 - margin.top - margin.bottom;
  let offset = 50;

  svg
    .append("g")
    .attr("class", "myXaxis")
    .attr(
      "transform",
      "translate(200," + (400 - margin.top - margin.bottom) + ")"
    );

  svg
    .append("g")
    .attr("class", "myYaxis")
    .attr("transform", "translate(200,0)");

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
      "translate(80," + (400 - margin.top - margin.bottom + offset) + ")"
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
      "translate(480," + (400 - margin.top - margin.bottom + offset) + ")"
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
    .call(d3.axisLeft(y1))
    .transition()
    .duration(1000)
    .attr("transform", "translate(80," + offset + ")")
    .style("opacity", 1);

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
    .attr("y", (d) => y1(0))
    .attr("height", (d) => bar_height - y1(0)) // always equal to 0
    .attr("transform", "translate(80, " + offset + ")")
    .style("opacity", 1)
    .attr("fill", function (d) {
      if (eras === true) {
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
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y1(d.revenue);
    })
    .attr("height", function (d) {
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
      "translate(480," + (400 - margin.top - margin.bottom + offset) + " )"
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
    .attr("transform", "translate(480," + offset + ")");

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
    .attr("transform", "translate(480," + offset + ")")
    .style("opacity", 1)
    .attr("fill", function (d) {
      if (eras === true) {
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
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y2(d.attendance);
    })
    .attr("height", function (d) {
      return bar_height - y2(d.attendance);
    })
    .delay((d, i) => {
      return i * 100;
    });

  // Attendance Bar Graph Title
  svg
    .append("text")
    .attr("class", "attendance-title")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .attr("transform", "translate(650," + offset + ")")
    .style("font-weight", "bold")
    .text("Attendance");

  // Revenue Bar Graph Title
  svg
    .append("text")
    .attr("class", "revenue-title")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("transform", "translate(240," + offset + ")")
    .text("Revenue");
}

// function sideBySideGraph() {
//   // Set Bar Margins
//   let bar_width = 400 - margin.left - margin.right;
//   let bar_height = 400 - margin.top - margin.bottom;
//   let offset = 50;

//   svg
//     .append("g")
//     .attr("class", "myXaxis")
//     .attr(
//       "transform",
//       "translate(200," + (400 - margin.top - margin.bottom) + ")"
//     );

//   svg
//     .append("g")
//     .attr("class", "myYaxis")
//     .attr("transform", "translate(200,0)");

//   // Initialize the X axis
//   x = d3.scaleBand().range([0, bar_width]).padding(0.2);

//   // Initialize the Y axis
//   y1 = d3.scaleLinear().range([bar_height, 0]);

//   // X axis for Chart 1
//   x.domain(
//     tourData.map(function (d) {
//       return d.tour;
//     })
//   );

//   d3.select(".myXaxis")
//     .call(d3.axisBottom(x))
//     .transition()
//     .duration(1000)
//     .attr(
//       "transform",
//       "translate(80," + (400 - margin.top - margin.bottom + offset) + ")"
//     )
//     .style("opacity", 1)
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

//   svg
//     .append("g")
//     .attr("class", "myXaxis-2")
//     .attr(
//       "transform",
//       "translate(480," + (400 - margin.top - margin.bottom + offset) + ")"
//     );

//   d3.select(".myXaxis-2")
//     .call(d3.axisBottom(x))
//     .transition()
//     .duration(1000)
//     .style("opacity", 1)
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

//   // Add Y axis
//   y1.domain([
//     0,
//     d3.max(tourData, function (d) {
//       return d.revenue * 1.2;
//     }),
//   ]);

//   d3.select(".myYaxis")

//     .call(d3.axisLeft(y))
//     .transition()
//     .duration(1000)
//     .attr("transform", "translate(80," + offset + ")")
//     .style("opacity", 1);

//   // Maps data to existing bars; if not enough, generates more
//   var u = svg.selectAll("rect").data(tourData);

//   // Update bars
//   u.enter()
//     .append("rect")
//     .merge(u)
//     .attr("x", function (d) {
//       return x(d.tour);
//     })
//     .attr("width", x.bandwidth())
//     .attr("y", (d) => y1(0))
//     .attr("height", (d) => bar_height - y1(0)) // always equal to 0
//     .attr("transform", "translate(80, " + offset + ")")
//     .style("opacity", 1)
//     .attr("fill", function (d) {
//       switch (d.tour) {
//         case "Fearless Tour":
//           return COLOR._FEARLESS_YELLOW;
//         case "Speak Now Tour":
//           return COLOR._SPEAKNOW_PURPLE;
//         case "Red Tour":
//           return COLOR._RED_MARRON;
//         case "1989 Tour":
//           return COLOR._1989_BLUE;
//         case "Reputation Tour":
//           return COLOR._REPUTATION_BLACK;
//         case "*Eras Tour":
//           return COLOR._MIDNIGHTS_NAVY;
//         default:
//           return "blue";
//       }
//     })
//     .transition()
//     .duration(800)
//     .attr("y", function (d) {
//       return y(d.revenue);
//     })
//     .attr("height", function (d) {
//       return bar_height - y1(d.revenue);
//     })
//     .delay((d, i) => {
//       return i * 100;
//     });

//   svg
//     .append("g")
//     .attr("class", "myYaxis-2")
//     .attr(
//       "transform",
//       "translate(480," + (400 - margin.top - margin.bottom + offset) + " )"
//     );

//   // Graph 2 Y Axis
//   var y2 = d3.scaleLinear().range([bar_height, 0]);
//   y2.domain([
//     0,
//     d3.max(tourData, function (d) {
//       return d.attendance * 1.2;
//     }),
//   ]);

//   d3.select(".myYaxis-2")
//     .call(d3.axisLeft(y2))
//     .transition()
//     .duration(1000)
//     .style("opacity", 1)
//     .attr("transform", "translate(480," + offset + ")");

//   // Update bars
//   u.enter()
//     .append("rect")
//     .merge(u)
//     .attr("x", function (d) {
//       return x(d.tour);
//     })
//     .attr("width", x.bandwidth())
//     .attr("y", (d) => y2(0))
//     .attr("height", (d) => bar_height - y2(0)) // always equal to 0
//     .attr("transform", "translate(480," + offset + ")")
//     .style("opacity", 1)
//     .attr("fill", function (d) {
//       if (distinctColors === true) {
//         switch (d.tour) {
//           case "Fearless Tour":
//             return COLOR._FEARLESS_YELLOW;
//           case "Speak Now Tour":
//             return COLOR._SPEAKNOW_PURPLE;
//           case "Red Tour":
//             return COLOR._RED_MARRON;
//           case "1989 Tour":
//             return COLOR._1989_BLUE;
//           case "Reputation Tour":
//             return COLOR._REPUTATION_BLACK;
//           case "*Eras Tour":
//             return COLOR._MIDNIGHTS_NAVY;
//           default:
//             return "blue";
//         }
//       } else if (highlightEras == true) {
//         switch (d.tour) {
//           case "*Eras Tour":
//             return COLOR._MIDNIGHTS_NAVY;
//           default:
//             return "gray";
//         }
//       } else {
//         switch (d.tour) {
//           case "Fearless Tour":
//             return COLOR._LIGHT_BLUE;
//           case "Speak Now Tour":
//             return COLOR._BLUE;
//           case "Red Tour":
//             return COLOR._PURPLE;
//           case "1989 Tour":
//             return COLOR._RED;
//           case "Reputation Tour":
//             return COLOR._PINK;
//           case "*Eras Tour":
//             return COLOR._ORANGE;
//           default:
//             return COLOR._YELLOW;
//         }
//       }
//     })
//     .transition()
//     .duration(800)
//     .attr("y", function (d) {
//       return y2(d.attendance);
//     })
//     .attr("height", function (d) {
//       return bar_height - y2(d.attendance);
//     })
//     .delay((d, i) => {
//       return i * 100;
//     });

//   // Attendance Bar Graph Title
//   svg
//     .append("text")
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .attr("transform", "translate(650," + offset + ")")
//     .style("font-weight", "bold")
//     .text("Attendance");

//   // Revenue Bar Graph Title
//   svg
//     .append("text")
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .style("font-weight", "bold")
//     .attr("transform", "translate(240," + offset + ")")
//     .text("Revenue");
// }
