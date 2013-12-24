FSG.winButtons = {
	'bg': {x: 0.2, y: 0.2, w: 0.6, h:0.6},
	'next': {x: 0.1, y: 0.1, w: 0.8, h:0.3},
	'continue': {x: 0.1, y: 0.4, w: 0.8, h:0.3}
};

FSG.mousedownWin = function(x,y) {
	var ctx = FSG.ctx;
	ctx.save();

	var bgBox = FSG.winButtons.bg;

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var x1 = bgBox.x;
	var y1 = bgBox.y;

	var x2 = x1+bgBox.w;
	var y2 = y1+bgBox.h;

	if(x >= x1 && x <= x2 && y >= y1 && y <= y2) {
		FSG.nextLevel();
	}

};

FSG.mousemoveWin = function(x,y) {

};
