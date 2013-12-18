FSG.goalWave = function(x){return Math.sin(x*2*Math.PI);}

FSG.getWavePoints = function(min,max,n,evalFunction) {

	var output = [];

	for(var i = 0; i < n; i++) {
		output[i] = evalFunction(i/n*(max-min)+min);
	}

	return output;
};

FSG.getWaveFun = function(waveID) {
	var wave = FSG.userWaves[waveID];
	return function(x){	
		return wave.amp*Math.sin(2*Math.PI*wave.freq*x);
	}
};

FSG.getTotalUserFun = function() {
	var funs = [];
	for(var waveKey in FSG.userWaves) {
		if(FSG.userWaves.hasOwnProperty(waveKey)) {
			funs.push(FSG.getWaveFun(waveKey));
		}
	}

	return function(x) {
		var sum = 0;
		for(var i = 0; i < funs.length; i++) {
			sum += funs[i](x);
		}
		return sum;
	}
};

FSG.getRMSFromGoal = function() {
	var userFun = FSG.getTotalUserFun();
	var goal = FSG.goalWave;

	var squares = 0;
	var dx = 0.01;
	for(var x = 0; x < 1; x += dx) {
		squares += Math.pow(goal(x)-userFun(x),2);
	}

	return Math.sqrt(squares*dx);
};

FSG.getMeanFromGoal = function() {
	var userFun = FSG.getTotalUserFun();
	var goal = FSG.goalWave;

	var squares = 0;
	var dx = 0.01;
	for(var x = 0; x < 1; x += dx) {
		squares += Math.abs(goal(x)-userFun(x),2);
	}

	return squares*dx;
};

FSG.getMatchScore = function() {
	var RMS = FSG.getMeanFromGoal();

	//TODO: this will require more tuning
	var score = 100-4*100*RMS;
	if(score < 0){score = 0;}

	return score;
};