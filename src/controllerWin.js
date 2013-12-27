FSG.winButton = {
	"box": {x: 0.2, y: 0.2, w: 0.6, h:0.6},
	"action": "nothing",

	"childButtons": {
		"nextLevel": {
			"action": "nextLevel",
			"box": {x: 0.1, y: 0.1, w: 0.8, h:0.2},
			"text": "Next Level"
		},
		"keepPlaying": {
			"action": "keepPlaying",
			"box": {x: 0.1, y: 0.4, w: 0.8, h:0.2},
			"text": "I can do better!"
		},
		"exitGame": {
			"action": "exitGame",
			"box": {x: 0.1, y: 0.7, w: 0.8, h:0.2},
			"text": "Select Level"
		}
	}
};

FSG.keydownWin = function(key) {
	if(key == 27) {
		FSG.changeView("play");
	}	
};

FSG.mousedownWin = function(x,y) {
	var ctx = FSG.ctx;
	ctx.save();

	var bgBox = FSG.winButtons;

	var action = FSG.getMouseDownAction(FSG.winButton, x, y);

	if(action === "nextLevel") {
		FSG.nextLevel();
	}else if(action === "keepPlaying") {
		FSG.keepPlaying();
	}else if(action === "exitGame") {
		FSG.exitGame();
	}
};

FSG.mousemoveWin = function(x,y) {

};
