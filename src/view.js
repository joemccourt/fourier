FSG.drawGame = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var n = w;
	var points = FSG.getWavePoints(0,1,w);

	for(var i = 0; i < n; i++) {
		var drawX = (i/n*1 + 0)*w;
		var drawY = ((-0.5*points[i]+0.5)*1 + 0)*h;

		ctx.lineTo(drawX, drawY);
	}

	ctx.stroke();

	ctx.restore();
};