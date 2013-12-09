FSG.startLevel = function() {
	var lvl = FSG.level;

	var wave;
	switch(lvl) {
		case 0:
			wave = function(x){return 0.2*Math.sin(x*2*Math.PI);}
			break;
		case 1:
			wave = function(x){return x < 0.5 ? 0 : 1;}
			break;
		default:
			wave = function(x){return Math.sin(x*2*Math.PI);}
			break;
	}

	FSG.goalWave = wave;
};
