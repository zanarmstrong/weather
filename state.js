"use strict";

function state(city, metric, yDomain, dimensions, colored) {
	this.city = city;
	this.metric = metric;
	this.yDomain = yDomain;
	this.dimensions = dimensions;
	this.colored = colored;
	this.scales = {distance: d3.scale.linear().domain(yDomain[this.metric]).range([0,circleRadius]),
          angle: d3.scale.linear().domain([0,24]).range([0,2*Math.PI]),
      	  color: ["#6C7C99","#919EB6","#C0C9DA", "#E6CC9B","#FFEBC5","#FFF3DD","#FFE0DD",
      	  "#FFCBC5","#E6A29B", "#B9D6D3","#86ACA8","#608F8A"]}
};

state.prototype.setCity = function(city) {
	this.city = city;
};

state.prototype.getCity = function() {
	return this.city;
};

state.prototype.setColor = function(bool) {
	this.colored= bool;
};

state.prototype.getColor = function() {
	return this.colored;
};

state.prototype.setMetric = function(metric) {
	this.metric = metric;
	this.scales.distance.domain(this.yDomain[this.metric]);
};

state.prototype.getMetric = function() {
	return this.metric;
};

state.prototype.getScales = function(){
	return this.scales;
}
state.prototype.getTitle = function(){
	var metric = "";
	if(this.metric == "normalTemperature"){
		metric = "Normal Temperature";
	} else if (this.metric == "cloudCover"){
		metric = "Percent of Cloud Cover ";
	} else if (this.metric == "heatIndex"){
		metric = "Heat Index (what temperature it feels like due to humidity) ";
	} else if (this.metric == "windChill"){
		metric = "Wind Chill (what temperature it feels like due to wind) ";
	} else if (this.metric == "aveWindSpeed"){
		metric = "Average Wind Speed ";
	} 
	return metric + " in " + this.city + " by hour of day, based on last 30 years";;
}

state.prototype.getYText = function(){
	if(["normalTemperature", "heatIndex", "windChill"].indexOf(this.metric) != -1){
		return "°F";
	} else if (this.metric == "cloudCover"){
		return "%";
	} else if (this.metric == "aveWindSpeed"){
		return "mph";
	} else {
		return "";
	}
}
