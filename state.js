"use strict";

var metrics = ["cloudCover", "normalTemperature", "heatIndex", "windChill", "aveWindSpeed"]

function state(city, metric, yDomain, dimensions, colored) {
	this.city = city;
	this.metric = metric;
	this.yDomain = yDomain;
	this.dimensions = dimensions;
	this.colored = colored;
	this.selectedMonths = [];
	this.scales = {distance: d3.scale.linear().domain(yDomain[this.metric]).range([0,circleRadius]),
          angle: d3.scale.linear().domain([0,24]).range([0,2*Math.PI]),
      	  color: ["#6C7C99","#919EB6","#C0C9DA", "#E6CC9B","#FFEBC5","#FFF3DD","#FFE0DD",
      	  "#FFCBC5","#E6A29B", "#B9D6D3","#86ACA8","#608F8A"]}
};

state.prototype.updateSelectedMonthsList = function(month) {
	var index = this.selectedMonths.indexOf(month);
	if(index == -1){
		this.selectedMonths.push(month);
	} else {
		this.selectedMonths.splice(index, index + 1)
	}
}

state.prototype.getSelectedMonths = function(){
	return this.selectedMonths;
}

state.prototype.updateHash = function() {
	window.location.hash = "city=" + this.city + "&metric=" + this.metric + "&colored=" + this.colored;
	this.updateTitle();
}

state.prototype.setCity = function(city) {
	this.city = city;
	this.updateHash();
};

state.prototype.getCity = function() {
	return this.city;
};

state.prototype.setColor = function(bool) {
	this.colored= bool;
	this.updateHash();
	document.getElementById("colorSelector").selectedIndex = bool;
};

state.prototype.getColor = function() {
	return this.colored;
};

state.prototype.setMetric = function(metric) {
	this.metric = metric;
	this.scales.distance.domain(this.yDomain[this.metric]);
	this.updateHash();
	document.getElementById("metric").selectedIndex = metrics.indexOf(metric);
};

state.prototype.updateTitle = function() {
	document.getElementById("infoHeader").innerHTML = "Typical " + this.getTitle();
}

state.prototype.getMetric = function() {
	return this.metric;
};

state.prototype.getScales = function(){
	return this.scales;
}

state.prototype.getTitle = function(){
	var metric = "";
	if(this.metric == "normalTemperature"){
		metric = "Temperature";
	} else if (this.metric == "cloudCover"){
		metric = "Percent Cloudy";
	} else if (this.metric == "heatIndex"){
		metric = "Heat Index";
	} else if (this.metric == "windChill"){
		metric = "Wind Chill";
	} else if (this.metric == "aveWindSpeed"){
		metric = "Average Wind Speed";
	} 
	return metric + " in " + toNormalCase(this.getCity());
}

state.prototype.getMetricLegendText = function(){
	var metricText = "";
	if(this.metric == "normalTemperature"){
		metricText = "°F";
	} else if (this.metric == "cloudCover"){
		metricText = "% Cloudy";
	} else if (this.metric == "heatIndex"){
		metricText = "°F";
	} else if (this.metric == "windChill"){
		metricText = "°F";
	} else if (this.metric == "aveWindSpeed"){
		metricText = "mph";
	} 
	return metricText;
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

function toNormalCase(string) {
	var re = /\S+\s*/g;
	var words = string.match(re);
	var output = ""
	words.forEach(function(d){output = output + d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()})
    return output
}
