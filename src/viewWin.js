FSG.drawWin = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var bgBox = FSG.winButtons;

	FSG.drawButtons(FSG.winButton);
	// FSG.drawButtons(FSG.winButton.childButtons.next);
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

FSG.drawButtons = function(button,parent) {
	var ctx = FSG.ctx;
	ctx.save();

	parent = FSG.sanitizeButton(parent);
	FSG.sanitizeButton(button,parent);

	var box = FSG.getSubBox(parent.box,button.box);

	var text = button.text;
	var fillStyle = button.fillStyle;
	var strokeStyle = button.strokeStyle;
	var textStyle = button.textStyle;

	ctx.fillStyle = fillStyle;
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = 1;

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var x1 = box.x*w;
	var y1 = box.y*h;

	var x2 = x1+box.w*w;
	var y2 = y1+box.h*h;

	var xCenter = (x1+x2)/2;
	var yCenter = (y1+y2)/2;

	ctx.fillStyle = fillStyle;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x1,y2);
	ctx.lineTo(x1,y1);
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = textStyle;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	var boxWidth = x2-x1;
	var height = 0.35*Math.min(x2-x1,y2-y1);
	
	ctx.font = height + "px Lucida Console";
	var textWidth = ctx.measureText(text).width;

	if(textWidth > 0.7*boxWidth){
		height *= 0.7*boxWidth / textWidth;
		ctx.font = height + "px Lucida Console";
	}

	ctx.fillText(text,xCenter,yCenter);

	for(var childButtonKey in button.childButtons) {
		if(button.childButtons.hasOwnProperty(childButtonKey)) {
			FSG.drawButtons(button.childButtons[childButtonKey],button);
		}
	}
};