"use strict";

// STANDARD VARIABLES
var margin = {
    top: 150,
    right: 250,
    bottom: 60,
    left: 40
  },
  width = 2 * circleRadius + 300 - margin.left - margin.right,
  height = 900 - margin.top - margin.bottom;


// initialize state
var cState = new state('SAN FRANCISCO', 
                       "cloudCover", 
                       {normalTemperature: [-10,105], heatIndex: [-10,105], windChill: [-10,105], cloudCover: [0,100], aveWindSpeed: [0,25]},
                       {width: width, height: height}, 
                       0);

if(window.location.hash.split("&").length != 0){
  var windowState = window.location.hash.split("&");
  for(var i = 0; i < windowState.length; i++){
    var k = windowState[i].replace('#','').split('=');
    if(k[0] == "city"){
      cState.setCity(k[1]);
    } else if (k[0] == "metric"){
      cState.setMetric(k[1]);
    } else if (k[0] == "colored"){
      cState.setColor(k[1]);
    }
  }
}

var dataFile = 'dataMunging/' + cState.getCity() + '.csv';

// initialize data
var data = new dataObj();

// STANDARD SVG SETUP
var svg = d3.select('#weatherLines')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


//svg.append("circle").attr("r", 3).attr("cx", circleRadius).attr("cy", circleRadius).attr("fill", "#321C00");

//svg.append("circle").attr("r", circleRadius).attr("cx", circleRadius).attr("cy", circleRadius).attr("stroke", "#321C00").attr("fill", "none");

// initialize view
var viz = new view();

// when metric changes, update data and view
d3.select('#metric')
  .on("change", function() {
    cState.setMetric(this.value);
    updateDataAndView();
  })

d3.select('#colorSelector')
  .on("change", function() {
    cState.setColor(this.value);
    viz.updateColor(cState, data.getPathData(cState.getCity(), cState.getMetric()));
    svg.selectAll(".monthLegend").classed("hidden", this.value != "true")
  })

drawClock();

// -----------------------------
// READ IN DATA AND DRAW GRAPH
// -----------------------------
d3.csv(dataFile, function(error, inputData) {
  if (error) return console.error(error);

  data.updateData(inputData, cState);

  // draw lines 
  viz.setView(cState, data.getPathData(cState.getCity(), cState.getMetric()));
  drawMonthLegend(cState);
  setUpMap();

});

// ----- helper functions ----- // 
// update selected city
function updateCity(city) {
    cState.setCity(city);
    dataFile = 'dataMunging/' + city + '.csv';
    d3.csv(dataFile, function(error, inputData) {
      if (error) return console.error(error);
      // still can consolodate this
      updateCities(city);
      data.updateData(inputData, cState);
      updateDataAndView();
    }
    )
}

// update data and view
function updateDataAndView() {
  data.updateState(cState);
  viz.updateView(cState, data.getPathData(cState.getCity(), cState.getMetric()));
}
