var clockPosition = {x: circleRadius, y: circleRadius},
    clockHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,17,18,19,20,21,22,23];

function drawClock() {

  var hour = 0;
  var rotate = 360 / 24 * hour;
  var clock = svg.append("g").attr("class", "clock");

  clock.append("circle")
    .attr("stroke", "grey")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("r", circleRadius)
    .attr("cx", clockPosition.x)
    .attr("cy", clockPosition.y)

  clock.append("circle")
    .attr("stroke", "none")
    .attr("fill", "grey")
    .attr("r", 3)
    .attr("cx", clockPosition.x)
    .attr("cy", clockPosition.y)

  d3.select(".clock").selectAll(".clockHour").data(clockHours).enter().append('text')
    .attr("class", "clockHour")
    //   .attr("fill", function(d){if(hour == d){return "white"} else {return "grey"}})
    .attr("fill", "grey")
    .attr("font-size", 14)
    .attr("x", function(d) {
      if (d == 0){
        return clockPosition.x - 3.5 - 4 - 12
      } else {
        return clockPosition.x - 3.5 - 4
      }
    })
    .attr("y", clockPosition.y + 5)
    .attr("transform", function(d) {
      var rotateN = 360 / 24 * d;
      return "translate(" + ((circleRadius * 1.08) * Math.cos((rotateN - 90) * Math.PI / 180)) + "," + (circleRadius * 1.08 * Math.sin((rotateN - 90) * Math.PI / 180)) + ")"
    })
    .text(function(d) {
      return formatHours(d);
    });

}

function formatHours(num) {
  if (num == 0) {
    return "midnight";
  } else if (num < 12) {
    return num + "am";
  } else if (num == 12) {
    return "noon";
  } else {
    return (num - 12) + "pm";
  }
}