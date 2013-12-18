FSG.levelConfig = {
	'0': {
		goalWave: 'sin',
		thresholdScore: 95
	},

	'1': {
		goalWave: 'step',
		thresholdScore: 90
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

	FSG.goalWave = FSG.getGoalWave(lvl.goalWave);
	FSG.thresholdScore = lvl.thresholdScore;
};
