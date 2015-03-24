"use strict";

var circleRadius = 300;

function xClockFunction(d, i, scales) {
                        return Math.cos(scales.angle((i - 6) % 24)) * scales.distance(+d) + circleRadius;
                      }
function yClockFunction(d,i, scales) {
                        return Math.sin(scales.angle((i - 6) % 24)) * scales.distance(+d) + circleRadius;
                      }

function xyDist(coord) {
  return Math.pow(Math.pow(coord[0] - clockPosition.x, 2) + Math.pow(coord[1] - clockPosition.y, 2), .5)
}

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
///////////////////////////
// view objects
///////////////////////////
function view() {
};

view.prototype.setView = function(state, data) {
  var lineFunction = d3.svg.line()
      .x(function(d,i){return xClockFunction(d,i, state.getScales())})
      .y(function(d,i){return yClockFunction(d,i, state.getScales())})
      .interpolate('linear');

   // line graph
  svg.selectAll('path')
    // need to improve this
    .data(data)
    .enter()
    .append('path')
    .attr("d", function(d) {
      return lineFunction(d) + "Z"
    })
    .attr("stroke", function(d, i) {
      if(state.getColor() == 1){
        return state.getScales().color[dayToMonth(i)];
      } else {return "white"};
    })
    .attr("class", function(d,i){return "dailyLines " + dayToMonthName(i)});

  // mouseover circle legend
  svg.append("circle")
    .attr("cx", clockPosition.x)
    .attr("cy", clockPosition.y)
    .attr("r", 0)
    .attr("class", "circleLegend hidden")

  svg.append("circle")
    .attr("fill", "grey")
    .attr("opacity", 0)
    .attr("r", circleRadius)
    .attr("cx", clockPosition.x)
    .attr("cy", clockPosition.y)
    .on("mousemove", function(){
      var coord = d3.mouse(this);
      var dist = xyDist(coord);
      d3.select(".circleLegend").attr("r", dist).classed("hidden", false);
      var metricValue = state.getScales().distance.invert(dist)

      d3.select('#tooltip')
        .style('left', (coord[0] + margin.left + 20) + 'px')
        .style('top', (coord[1] + margin.top - 20) + 'px')
        .select('#values')
        .text(d3.format(".0f")(metricValue) + state.getMetricLegendText());
      d3.select('#tooltip').classed('hidden', false);
    })
    .on("mouseout", function(){
      d3.select(".circleLegend").classed("hidden", true);
      d3.select('#tooltip').classed('hidden', true);
    })
}

view.prototype.updateView = function(state, data) {
    var lineFunction = d3.svg.line()
      .x(function(d,i){return xClockFunction(d,i, state.getScales())})
      .y(function(d,i){return yClockFunction(d,i, state.getScales())})
      .interpolate('linear');

   // line graph
  svg.selectAll('path')
    .data(data)
    .attr("d", function(d) {
      return lineFunction(d) + "Z"
    });

};

view.prototype.updateColor = function(state, data) {

   // line graph
  svg.selectAll('path')
    .data(data)
    .attr("stroke", function(d, i) {
      if(state.getColor() == 1){
        return state.getScales().color[dayToMonth(i)];
      } else {return "white"};
    });

};

function drawMonthLegend(state) {
  var monthLegend = svg.append('g').selectAll(".monthLegend")
     .data([0,1,2,3,4,5,6,7,8,9,10,11])
     .enter();

  monthLegend.append('text')
    .attr('x', 2 * circleRadius + margin.left + 40 + 5 + 40)
    .attr('y', function(d){return d * 19 + 200 + 14})
    .on('click', function(d, i) {
      onClickOnLegend(this, this.textContent, state);
    })
    .attr("fill", function(d){return state.getScales().color[d]})
    .text(function(d){return months[d]})
    .attr("class", "monthLegend")
    .classed("hidden", 1 != state.colored);
}

function dayToMonth(day){
  var monthStart = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274,305,335];
  var i = 0;
  while(i < 12){
    if(day < monthStart[i]){
      break
    } else {  
      i = i + 1;
    }
  }
  return i - 1
}

function dayToMonthName(day){
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return months[dayToMonth(day)];
}

function onClickOnLegend(obj, month, state){
      var monthsList = state.getSelectedMonths();
      if(monthsList.length == 0){
        d3.selectAll(".dailyLines").classed("unselectedMonth", true);
      }
      if(monthsList.indexOf(month) != -1){
        d3.selectAll("." + month).classed("unselectedMonth", true).classed("selectedMonth", false);
        d3.select(obj).attr("text-decoration", "none").attr("font-weight", "normal")
      } else {
        d3.selectAll("." + month).classed("unselectedMonth", false).classed("selectedMonth", true);
        d3.select(obj).attr("text-decoration", "underline").attr("font-weight", "bold")
      }
      state.updateSelectedMonthsList(month)
      if(state.getSelectedMonths().length == 0){
        d3.selectAll(".dailyLines").classed("unselectedMonth", false).classed("selectedMonth", false)
      }

}

