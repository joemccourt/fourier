FSG.drawWin = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var bgBox = FSG.winButtons.bg;

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var x1 = bgBox.x*w;
	var y1 = bgBox.y*h;

	var x2 = x1+bgBox.w*w;
	var y2 = y1+bgBox.h*h;

	ctx.fillStyle = 'gray';
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x1,y2);
	ctx.lineTo(x1,y1);
	ctx.fill();
};

FSG.drawViewBox = function(box,text,fillStyle,strokeStyle) {
	var ctx = FSG.ctx;
	ctx.save();

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var x1 = box.x*w;
	var y1 = box.y*h;

	var x2 = x1+box.w*w;
	var y2 = y1+box.h*h;

	ctx.fillStyle = 'gray';
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x1,y2);
	ctx.lineTo(x1,y1);
	ctx.fill();
};