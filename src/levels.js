FSG.levelConfig = {
	'0': {
		goalWave: 'sin',
		thresholdScore: 90
	},
	'1': {
		goalWave: 'sinc',
		thresholdScore: 50
	},
	'2': {
		goalWave: 'sawtooth',
		thresholdScore: 50
	},
	'3': {
		goalWave: 'triangle',
		thresholdScore: 50
	},
	'4': {
		goalWave: 'step',
		thresholdScore: 50
	},
	'5': {
		goalWave: 'gaussian',
		thresholdScore: 50
	}
};

FSG.getGoalWave = function(goalWave) {
	var wave;
	switch(goalWave) {
		case 'sin':
			wave = function(x){return Math.sin(x*2*Math.PI);}
			break;
		case 'step':
			wave = function(x){return x < 0.5 ? 1 : -1;}
			break;
		case 'sawtooth':
			wave = function(x){return 2*(x-Math.floor(x+1/2));}
			break;
		case 'triangle':
			wave = function(x){return 2*Math.abs(2*(x+0.25-Math.floor(x+0.25+1/2)))-1;}
			break;
		case 'sinc':
			wave = function(x){return x==0? 0: (1-Math.sin(x*Math.PI)/x/Math.PI);}
			break;
		case 'gaussian':
			wave = function(x){return 1-Math.exp(-x*x/(2/36));}
			break;
		default:
			wave = function(x){return Math.sin(x*2*Math.PI);}
			break;
	}
	return wave;
}

FSG.setLevel = function() {
	var lvl = FSG.levelConfig[FSG.level];

	if(!lvl) {
		//womp womp womp
		return;
	}

	FSG.goalWave = FSG.getGoalWave(lvl.goalWave);
	FSG.thresholdScore = lvl.thresholdScore;
};

FSG.startNewLevel = function() {
	FSG.maxUserWaveID = 0;
	FSG.userWaves = {};
	FSG.addWave(0.5,3);
	FSG.setLevel();

	// A bit hacky, but this fixes move problems
	FSG.mouseState = "up";
};

FSG.levelCoords = [
					[0.9/4,1-0.3/4],
					[1.7/4,1-0.4/4],
					[2.5/4,1-0.8/4],
					[3.0/4,1-1.0/4],
					[3.2/4,1-1.5/4],
					[3.9/4,1-1.9/4],
					[3.5/4,1-2.5/4],
					[2.8/4,1-2.2/4],
					[2.1/4,1-1.8/4],
					[1.9/4,1-2.3/4],
					[2.7/4,1-2.8/4],
					[2.9/4,1-3.1/4],
					[2.2/4,1-3.4/4],
					[1.6/4,1-3.4/4],
					[1.1/4,1-3.0/4],
					[1.2/4,1-2.2/4],
					[0.6/4,1-2.0/4],
					[0.2/4,1-2.5/4],
					[0.3/4,1-3.3/4],
					[0.7/4,1-3.8/4],
					[1.2/4,1-4.0/4],
					[1.9/4,1-4.0/4],
					[2.6/4,1-3.9/4],
					[3.2/4,1-4.1/4],
					[2.7/4,1-4.6/4],
					[2.8/4,1-5.1/4],
					[3.5/4,1-5.0/4],
					[3.2/4,1-5.5/4],
					[2.3/4,1-5.4/4],
					[2.0/4,1-5.0/4],
					[1.1/4,1-4.8/4],
					[0.8/4,1-5.4/4],
					[1.4/4,1-5.7/4],
					[1.7/4,1-6.2/4],
					[0.33,-0.68],
					[1.9/4,1-7.0/4],
					[0.60,  -0.72],
					[0.66,  -0.59],
					[0.78,  -0.60],
					[0.80,  -0.76],
					[0.78,  -0.98],
					[0.58,  -0.99],
					[0.47,  -1.09],
					[0.34,  -0.95],
					[0.22,  -0.83],
					[0.13,  -0.68],
					[0.02,  -0.72],
					[-0.02, -0.86],
					[-0.05, -1.01],
					[0.06,  -1.14],
					[0.13,  -1.28] 
					];