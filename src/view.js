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

	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	var n = w;

	for(var waveKey in FSG.userWaves){
		if(FSG.userWaves.hasOwnProperty(waveKey)){
			var wave = FSG.userWaves[waveKey];
			var waveFun = FSG.getWaveFun(waveKey);

			var points = FSG.getWavePoints(0,1,w,waveFun);
			ctx.strokeStyle = wave.color;
			ctx.beginPath();
			for(var i = 0; i < n; i++) {

				var drawX = (i/n*1 + 0)*w;
				var drawY = ((-0.5*points[i]+0.5)*1 + 0)*h;

				ctx.lineTo(drawX, drawY);
			}
			ctx.stroke();
		}
	}

	ctx.strokeStyle = 'black';
	var points = FSG.getWavePoints(0,1,n,FSG.goalWave);
	ctx.beginPath();

	for(var i = 0; i < n; i++) {
		var drawX = (i/n*1 + 0)*w;
		var drawY = ((-0.5*points[i]+0.5)*1 + 0)*h;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();

	ctx.strokeStyle = 'gray';
	var points = FSG.getWavePoints(0,1,n,FSG.getTotalUserFun());
	ctx.beginPath();
	for(var i = 0; i < n; i++) {
		var drawX = (i/n*1 + 0)*w;
		var drawY = ((-0.5*points[i]+0.5)*1 + 0)*h;

		ctx.lineTo(drawX, drawY);
	}
	ctx.stroke();

	ctx.restore();
};

