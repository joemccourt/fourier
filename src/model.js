FSG.userWaveKeysInOrder = []; // Should have just used array, but oh well.
FSG.maxWaveZIndex = 0;

FSG.goalWave = function(x){return Math.sin(x*2*Math.PI);}

FSG.getSubBox = function(boxParent,boxChild) {
	var box = {};

	box.x = boxParent.x + boxParent.w * boxChild.x;
	box.y = boxParent.y + boxParent.h * boxChild.y;

	box.w = boxParent.w * boxChild.w;
	box.h = boxParent.h * boxChild.h;

	return box;
};

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

FSG.getNewWaveColor = function() {
	var set = FSG.colorSets['waves'];
	return FSG.colorToStr(set[FSG.maxUserWaveID%set.length],0.4);
};

FSG.addWave = function(amp,freq,color) {
	if(typeof amp !== "number"){amp = 0.4;}
	if(typeof freq !== "number"){freq = 2;}
	if(typeof color !== "object"){
		color = FSG.getNewWaveColor();
		//color = 'rgba('+(256*Math.random()|0)+','+(256*Math.random()|0)+','+(256*Math.random()|0)+',0.25)';
	}

	var waveStr = 'wave-'+(FSG.maxUserWaveID+1);
	FSG.userWaves[waveStr] = {
		'color': color,
		'amp': amp,
		'freq': freq,
		'z-index': FSG.maxWaveZIndex
	};

	FSG.maxWaveZIndex++;
	FSG.userWaveKeysInOrder.push(waveStr);

	FSG.userWaveSelected = waveStr;
	FSG.maxUserWaveID++;
	FSG.dirtyCanvas = true;

	FSG.saveGameState();
};

FSG.reorderUserWaves = function() {
	FSG.userWaveKeysInOrder.sort(function(a, b) {
		return FSG.userWaves[a]['z-index'] - FSG.userWaves[b]['z-index'];
	});
};

FSG.selectWave = function(number) {
	FSG.userWaveSelected = 'wave-' + number;
	FSG.userWaves[FSG.userWaveSelected]['z-index'] = FSG.maxWaveZIndex;
	FSG.reorderUserWaves();
	FSG.maxWaveZIndex++;
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