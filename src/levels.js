FSG.levelConfig = {
	'0': {
		goalWave: 'sin',
		thresholdScore: 95
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

FSG.startLevel = function() {
	var lvl = FSG.levelConfig[FSG.level];

	if(!lvl) {
		//womp womp womp
		return;
	}

	FSG.maxUserWaveID = 0;
	FSG.goalWave = FSG.getGoalWave(lvl.goalWave);
	FSG.thresholdScore = lvl.thresholdScore;
};
