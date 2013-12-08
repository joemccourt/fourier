FSG.getWavePoints = function(min,max,n) {

	var evalFunction = function(x){return Math.sin(x*2*Math.PI);}
	var output = [];

	for(var i = 0; i < n; i++) {
		output[i] = evalFunction(i/n*(max-min)+min);
	}

	return output;
};