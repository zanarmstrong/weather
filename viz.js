"use strict";

var circleRadius = 300;

function xClockFunction(d, i, scales) {
                        return Math.cos(scales.angle((i - 6) % 24)) * scales.distance(+d) + circleRadius;
                      }
function yClockFunction(d,i, scales) {
                        return Math.sin(scales.angle((i - 6) % 24)) * scales.distance(+d) + circleRadius;
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
        return state.getScales().color[Math.floor(i / 31)];
      } else {return "white"};
    })
    .attr("class", "dailyLines");
}

view.prototype.updateView = function(state, data) {
    var lineFunction = d3.svg.line()
      .x(function(d,i){return xClockFunction(d,i, state.getScales())})
      .y(function(d,i){return yClockFunction(d,i, state.getScales())})
      .interpolate('linear');

   // line graph
  svg.selectAll('path')
    // need to improve this
    .data(data)
    .attr("d", function(d) {
      return lineFunction(d) + "Z"
    });

};

view.prototype.updateColor = function(state, data) {

   // line graph
  svg.selectAll('path')
    // need to improve this
    .data(data)
    .attr("stroke", function(d, i) {
      if(state.getColor() == 1){
        return state.getScales().color[Math.floor(i / 31)];
      } else {return "white"};
    });

};

function drawMonthLegend(state) {
  var monthLegend = svg.append('g').selectAll(".monthLegend")
     .data([0,1,2,3,4,5,6,7,8,9,10,11])
     .enter();

  monthLegend.append("rect")
     .attr("x", 2 * circleRadius + margin.left + 40)
     .attr("y", function(d){return d * 19 + 200})
     .attr("height", 18)
     .attr("width", 70)
     .attr("fill", function(d){return state.getScales().color[d]})
     .attr("stroke", "none")
     .attr("class", "monthLegend hidden");

  monthLegend.append('text')
    .attr('x', 2 * circleRadius + margin.left + 40 + 5 + 70)
    .attr('y', function(d){return d * 19 + 200 + 14})
    .on('click', function(d, i) {
      state.updateSelectedHourList(i);
      sView.updateSelectedHoursView(state);
    })
    .attr("fill", function(d){return state.getScales().color[d]})
    .text(function(d){return months[d]})
    .attr("class", "monthLegend hidden");
}

    

