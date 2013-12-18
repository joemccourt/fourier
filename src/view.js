FSG.drawClear = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	ctx.clearRect(0,0,w,h);

	ctx.restore();
};

FSG.drawGrid = function() {
	var ctx = FSG.ctx;
	ctx.save();

	var box = FSG.functionBox;

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	ctx.strokeStyle = 'rgb(219,249,249)';

	ctx.lineWidth = 1;
	var n = 5;
	for(var i = 0; i < 2*n+1; i++) {
		var height = i / (2*n) * h;
		ctx.moveTo(box.x*w,box.y*h+box.h*height);
		ctx.lineTo(box.x*w+box.w*w,box.y*h+box.h*height);
	}
	ctx.stroke();

	ctx.beginPath();
	n *= 2*Math.PI;
	for(var i = 0; i < 2*n+1; i++) {
		var width = i / (2*n) * w;
		ctx.moveTo(box.x*w+box.w*width,box.y*h);
		ctx.lineTo(box.x*w+box.w*width,box.y*h+box.h*h);
	}
	ctx.stroke();

	ctx.beginPath();

	ctx.strokeStyle = 'black';
	// ctx.lineWidth = 3;
	ctx.moveTo(box.x*w,box.y*h+box.h*h/2);
	ctx.lineTo(box.x*w+box.w*w,box.y*h+box.h*h/2);
	ctx.stroke();

	ctx.restore();
};

FSG.drawFunctions = function() {
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

	var maxY = 2;
	var minY = -2;

	var n = boxWidth;

	for(var waveKey in FSG.userWaves){
		if(FSG.userWaves.hasOwnProperty(waveKey)){
			var wave = FSG.userWaves[waveKey];
			var waveFun = FSG.getWaveFun(waveKey);

			n = Math.round(boxWidth/4);
			var points = FSG.getWavePoints(0,1,n,waveFun);
			ctx.strokeStyle = wave.color;
			ctx.beginPath();
			for(var i = 0; i < n; i++) {

				var drawX = x1+(i/n*1 + 0)*boxWidth;
				var drawY = y1+((-0.5*points[i]/maxY+0.5)*1 + 0)*boxHeight;
				drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

				ctx.lineTo(drawX, drawY);
			}
			ctx.stroke();
		}
	}
	var n = boxWidth;

	ctx.strokeStyle = 'black';
	var points = FSG.getWavePoints(0,1,n,FSG.goalWave);
	ctx.beginPath();

	for(var i = 0; i < n; i++) {
		var drawX = x1+(i/n*1 + 0)*boxWidth;
		var drawY = y1+((-0.5*points[i]/maxY+0.5)*1 + 0)*boxHeight;
		drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();

	ctx.strokeStyle = 'gray';
	var points = FSG.getWavePoints(0,1,n,FSG.getTotalUserFun());
	ctx.beginPath();
	for(var i = 0; i < n; i++) {
		var drawX = x1+(i/n*1 + 0)*boxWidth;
		var drawY = y1+((-0.5*points[i]/maxY+0.5)*1 + 0)*boxHeight;
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

FSG.drawGame = function() {
	FSG.drawGrid();
	FSG.drawFunctions();
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

	var nCols = 5;
	var nRows = 3;

	for(var r = 0; r < nRows; r++) {
		for(var c = 0; c < nCols; c++) {
			var number = r*nCols+c+1;

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = 0.05*(w+h)/2 + "px Lucidia Regular";

			if(number <= FSG.maxUserWaveID) {
				var waveStr = "wave-"+number;
				var wave = FSG.userWaves[waveStr];
				ctx.fillStyle = wave.color;

				if(FSG.userWaveSelected == waveStr) {
					ctx.strokeText(""+number,x1+box.w*w*(c+0.5)/nCols,y1+box.h*h*(r+0.5)/nRows);
				}

				ctx.fillText(""+number,x1+box.w*w*(c+0.5)/nCols,y1+box.h*h*(r+0.5)/nRows);
			}else if(number-1 == FSG.maxUserWaveID) {
				ctx.fillText("+",x1+box.w*w*(c+0.5)/nCols,y1+box.h*h*(r+0.5)/nRows);
			}else if(number-2 == FSG.maxUserWaveID) {
				ctx.fillText(Math.round(FSG.score),x1+box.w*w*(c+0.5)/nCols,y1+box.h*h*(r+0.5)/nRows);
			}
		}
	}

	ctx.restore();
};