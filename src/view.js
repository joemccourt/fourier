FSG.drawClear = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	ctx.clearRect(0,0,w,h);

	ctx.restore();
};

FSG.drawGame = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var box = FSG.functionBox;

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var x1 = box.x*w;
	var y1 = box.y*h;

	var x2 = x1+box.w*w;
	var y2 = y1+box.h*h;
	
	var boxWidth = x2-x1;
	var boxHeight = y2-y1;

	var n = boxWidth;

	for(var waveKey in FSG.userWaves){
		if(FSG.userWaves.hasOwnProperty(waveKey)){
			var wave = FSG.userWaves[waveKey];
			var waveFun = FSG.getWaveFun(waveKey);

			var points = FSG.getWavePoints(0,1,n,waveFun);
			ctx.strokeStyle = wave.color;
			ctx.beginPath();
			for(var i = 0; i < n; i++) {

				var drawX = x1+(i/n*1 + 0)*boxWidth;
				var drawY = y1+((-0.5*points[i]+0.5)*1 + 0)*boxHeight;
				drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

				ctx.lineTo(drawX, drawY);
			}
			ctx.stroke();
		}
	}

	ctx.strokeStyle = 'black';
	var points = FSG.getWavePoints(0,1,n,FSG.goalWave);
	ctx.beginPath();

	for(var i = 0; i < n; i++) {
		var drawX = x1+(i/n*1 + 0)*boxWidth;
		var drawY = y1+((-0.5*points[i]+0.5)*1 + 0)*boxHeight;
		drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();

	ctx.strokeStyle = 'gray';
	var points = FSG.getWavePoints(0,1,n,FSG.getTotalUserFun());
	ctx.beginPath();
	for(var i = 0; i < n; i++) {
		var drawX = x1+(i/n*1 + 0)*boxWidth;
		var drawY = y1+((-0.5*points[i]+0.5)*1 + 0)*boxHeight;
		drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();

	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x1,y2);
	ctx.lineTo(x1,y1);
	ctx.stroke();

	ctx.restore();
};

FSG.drawMenu = function() {

	var ctx = FSG.ctx;
	ctx.save();

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var box = FSG.menuBox;

	var x1 = box.x*w;
	var y1 = box.y*h;

	var x2 = x1+box.w*w;
	var y2 = y1+box.h*h;

	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x1,y2);
	ctx.lineTo(x1,y1);

	ctx.stroke();
	ctx.restore();
};