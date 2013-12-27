FSG.menuButton = {
	"box": {x: 0.2, y: 0.2, w: 0.6, h:0.6},
	"action": "nothing",

	"childButtons": {
		"exitGame": {
			"action": "exitGame",
			"box": {x: 0.1, y: 0.2, w: 0.8, h:0.2},
			"text": "Quit"
		},
		"restartLevel": {
			"action": "restartLevel",
			"box": {x: 0.1, y: 0.6, w: 0.8, h:0.2},
			"text": "Restart"
		}
	}
};

FSG.keydownMenu = function(key) {
	if(key == 27) {
		//TODO: go back to correct phase
		FSG.changeView("play");
	}
};

FSG.mousedownMenu = function(x,y) {
	var ctx = FSG.ctx;
	ctx.save();

	var bgBox = FSG.menuButtons;

	var action = FSG.getMouseDownAction(FSG.menuButton, x, y);

	if(action === "restartLevel") {
		FSG.startNewLevel();
		FSG.changeView("play");
	}else if(action === "exitGame") {
		FSG.exitGame();
	}
};

FSG.mousemoveMenu = function(x,y) {

};

FSG.drawMenu = function() {
	FSG.drawButtons(FSG.menuButton);
};