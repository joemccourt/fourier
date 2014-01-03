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
	},
	'6': {
		goalWave: 'clarinet',
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
		case 'clarinet':
			// on eb 156Hz from http://hyperphysics.phy-astr.gsu.edu/hbase/music/clarw.html
			wave = function(x) {
				return 	(Math.sin(x*2*Math.PI) + 
						0.04*Math.sin(2*x*2*Math.PI) + 
						0.99*Math.sin(3*x*2*Math.PI) + 
						0.12*Math.sin(4*x*2*Math.PI) + 
						0.53*Math.sin(5*x*2*Math.PI) + 
						0.11*Math.sin(6*x*2*Math.PI) + 
						0.26*Math.sin(7*x*2*Math.PI) + 
						0.05*Math.sin(8*x*2*Math.PI) + 
						0.24*Math.sin(9*x*2*Math.PI) + 
						0.07*Math.sin(10*x*2*Math.PI) + 
						0.02*Math.sin(11*x*2*Math.PI) + 
						0.03*Math.sin(12*x*2*Math.PI) + 
						0.02*Math.sin(13*x*2*Math.PI) + 
						0.03*Math.sin(14*x*2*Math.PI));
			}
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
	FSG.userWaveKeysInOrder = [];
	FSG.addWave(0.5,3);
	FSG.setLevel();

	// A bit hacky, but this fixes move problems
	FSG.mouseState = "up";
};

FSG.levelCoords = [
[0.15,0.5],
[0.31666666666666665,0.28750000000000003],
[0.4833333333333333,0.13193920339161358],
[0.65,0.07500000000000001],
[0.8166666666666667,0.13193920339161358],
[0.9833333333333334,0.28750000000000003],
[1.15,0.49999999999999994],
[1.3166666666666667,0.7125],
[1.4833333333333332,0.8680607966083863],
[1.65,0.925],
[1.8166666666666667,0.8680607966083864],
[1.9833333333333332,0.7125000000000001],
[2.15,0.5000000000000001],
[2.3166666666666664,0.2875000000000003],
[2.4833333333333334,0.13193920339161352],
[2.65,0.07500000000000001]
];

// var str = "";
// for(var i = 0; i <= 15; i++) {
// 	var x = i/12;
// 	str += "["+(2*x+0.15)+","+(-0.5*0.85*Math.sin(2*Math.PI*x)+0.5)+"],\n";
// }
// console.log(str);