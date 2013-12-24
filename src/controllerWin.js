FSG.defaultButton = {
	"box": {x:0, y:0, w:1, h:1},
	"text": "",
	"fillStyle": "white",
	"strokeStyle": "black",
	"textStyle": "black",
	"action": "nothing"
};

FSG.winButton = {
	"box": {x: 0.2, y: 0.2, w: 0.6, h:0.6},
	"action": "nothing",

	"childButtons": {
		"nextLevel": {
			"action": "nextLevel",
			"box": {x: 0.1, y: 0.1, w: 0.8, h:0.3},
			"text": "Next Level"
		},
		"keepPlaying": {
			"action": "keepPlaying",
			"box": {x: 0.1, y: 0.6, w: 0.8, h:0.3},
			"text": "I can do better!"
		}
	}
};

FSG.sanitizeButton = function(button,defaultButton) {
	if(typeof button !== "object"){button = {};}

	if(typeof defaultButton !== "object") {
		defaultButton = FSG.defaultButton;
	}

	for(var key in defaultButton){
		if(defaultButton.hasOwnProperty(key) && button[key] == null && key !== "childButtons") {
			button[key] = defaultButton[key];
		}
	}

	return button;
};

FSG.getMouseDownAction = function(button, x, y, parentButton) {
	var action = "";

	parentButton = FSG.sanitizeButton(parentButton);
	FSG.sanitizeButton(button,parentButton);

	var box = FSG.getSubBox(parentButton.box,button.box);

	var x1 = box.x;
	var y1 = box.y;

	var x2 = x1+box.w;
	var y2 = y1+box.h;

	if(x >= x1 && x <= x2 && y >= y1 && y <= y2) {
		action = button.action;
		for(var childButtonKey in button.childButtons) {
			if(button.childButtons.hasOwnProperty(childButtonKey)) {
				childAction = FSG.getMouseDownAction(button.childButtons[childButtonKey],x,y,button);
				if(typeof childAction === "string" && childAction !== "") {
					action = childAction;
				}
			}
		}
	}

	return action;
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
	}
};

FSG.mousemoveWin = function(x,y) {

};
