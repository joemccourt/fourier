FSG.maxY = 2;
FSG.minY = -2;

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
	var n = 5;// * (FSG.maxY - FSG.minY);
	for(var i = 0; i < 2*n+1; i++) {
		var height = i / (2*n) * h;
		ctx.moveTo(box.x*w,box.y*h+box.h*height);
		ctx.lineTo(box.x*w+box.w*w,box.y*h+box.h*height);
	}
	ctx.stroke();

	ctx.beginPath();
	n = 5;
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

	var maxY = FSG.maxY;
	var minY = FSG.minY;

	var n = boxWidth;

	ctx.strokeStyle = 'steelblue'
	ctx.lineWidth = 3;
	var points = FSG.getWavePoints(0,1,n,FSG.goalWave);
	ctx.beginPath();

	for(var i = 0; i < n; i++) {
		var drawX = x1+(i/n*1 + 0)*boxWidth;
		var drawY = y1+((-0.5*points[i]/maxY+0.5)*1 + 0)*boxHeight;
		drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();


	ctx.strokeStyle = 'black';
	var points = FSG.getWavePoints(0,1,n,FSG.getTotalUserFun());
	ctx.lineWidth = 3;
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

	ctx.lineWidth = 1;
	var keys = FSG.userWaveKeysInOrder;
	var nKeys = keys.length;
	for(var k = 0; k < nKeys; k++){
		var waveKey = keys[k];
		// console.log(waveKey);
		var wave = FSG.userWaves[waveKey];
		var waveFun = FSG.getWaveFun(waveKey);

		n = Math.round(boxWidth/4);
		var points = FSG.getWavePoints(0,1,n,waveFun);
		ctx.strokeStyle = wave.color;
		ctx.fillStyle = wave.color;
		ctx.beginPath();
		for(var i = 0; i < n; i++) {

			var drawX = x1+(i/(n-1)*1 + 0)*boxWidth;
			var drawY = y1+((-0.5*points[i]/maxY+0.5)*1 + 0)*boxHeight;
			drawY = drawY < y1 ? y1 : drawY > y2 ? y2 : drawY;

			ctx.lineTo(drawX, drawY);
		}

		if(waveKey == FSG.userWaveSelected) {
			ctx.strokeStyle = 'black';
			ctx.stroke();
		}

		ctx.lineTo(x1+boxWidth,y1+0.5*boxHeight);
		ctx.lineTo(x1,y1+0.5*boxHeight);
		ctx.closePath();
		ctx.fill();
	}

	ctx.restore();
};

FSG.drawGame = function() {
	FSG.drawGrid();
	FSG.drawFunctions();
};

FSG.drawControls = function() {
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
			ctx.font = 0.35*Math.min(w,0.2*h) + "px Lucidia Regular";
			var bx1 = x1+box.w*w*(c+0)/nCols;
			var bx2 = x1+box.w*w*(c+1)/nCols;

			var by1 = y1+box.h*h*(r+0)/nRows;
			var by2 = y1+box.h*h*(r+1)/nRows;
			
			var bxM = x1+box.w*w*(c+0.5)/nCols;
			var byM = y1+box.h*h*(r+0.5)/nRows;

			var delta = Math.max(bx2-bx1,by2-by1) * 0.03;
			ctx.beginPath();
			ctx.moveTo(bx1+delta,by1+delta);
			ctx.lineTo(bx2-delta,by1+delta);
			ctx.lineTo(bx2-delta,by2-delta);
			ctx.lineTo(bx1+delta,by2-delta);
			ctx.lineTo(bx1+delta,by1+delta);

			if(number <= FSG.maxUserWaveID) {
				var waveStr = "wave-"+number;
				var wave = FSG.userWaves[waveStr];
				ctx.lineWidth = 2;

				var grd = ctx.createLinearGradient(bx1+delta,by1+delta,bx1+delta,by2-delta);
				if(FSG.userWaveSelected == waveStr) {
					grd.addColorStop(1-0, 'rgb(88,113,150)');
					grd.addColorStop(1-0.5, 'rgb(100,165,255)');
					grd.addColorStop(1-0.9, 'rgb(100,165,255)');
					grd.addColorStop(1-1, 'rgb(88,113,150)');
				}else{
					grd.addColorStop(0, 'rgb(220,235,255)');
					grd.addColorStop(0.5, 'rgb(100,165,255)');
					grd.addColorStop(0.9, 'rgb(100,165,255)');
					grd.addColorStop(1, 'rgb(68,93,130)');
				}

				ctx.fillStyle = grd;
				ctx.strokeStyle = wave.color;

				ctx.fill();
				ctx.stroke();

				ctx.fillStyle = 'black';
				ctx.fillText(""+number,bxM,byM);
			}else if(number-1 == FSG.maxUserWaveID) {
				ctx.strokeStyle = 'black';
				ctx.fillText("+",bxM,byM);
				ctx.stroke();
			}else if(number-2 == FSG.maxUserWaveID) {
				ctx.fillText(Math.round(FSG.score),bxM,byM);
			}
		}
	}

	ctx.restore();
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