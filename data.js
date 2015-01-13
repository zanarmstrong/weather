/////////////////////////////
//  Manage Data
/////////////////////////////
function dataObj() {
  this.inputData = {};
  this.pathData = [];
};

dataObj.prototype.updateData = function(data, state) {
  this.inputData = data;
  self = this;

  console.log(state)

  for (var i = 0; i < 365; i++) {
    this.pathData[i] = [];
  };

  this.inputData
      .filter(function(d,i) {
            if (d.city == state.getCity()) {
                self.pathData[moment(d.day).dayOfYear() - 1][+d.hour] = d[state.getMetric()];
                return d;
            }});
}

dataObj.prototype.updateState = function(state) {
  self = this;

  console.log(state.getCity(), state, this.inputData)
  for (var i = 0; i < 365; i++) {
    this.pathData[i] = [];
  };

  this.inputData
      .filter(function(d,i) {
            if (d.city == state.getCity()) {
                self.pathData[moment(d.day).dayOfYear() - 1][+d.hour] = d[state.getMetric()];
                return d;
            }});

  console.log(this.pathData)

}

dataObj.prototype.getInputData = function(){
  return this.inputData;
}

dataObj.prototype.getPathData = function(){
  return this.pathData;
}
