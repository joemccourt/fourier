FSG.mousedownMenu = function(x,y) {
	var n = FSG.maxUserWaveID;
	var nCols = 5;
	var nRows = 3;
	var row = Math.floor(y*nRows);
	var col = Math.floor(x*nCols);
	var number = nCols*row+col+1;
	if(number <= n) {
		FSG.userWaveSelected = 'wave-' + number;
	}else if(number-1 == n) {
		FSG.addWave(Math.random(),3);
	}

	FSG.dirtyCanvas = true;
};

FSG.mousemovePlay = function(x,y) {
	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	FSG.mousePos = {'x':x,'y':y};

	if(FSG.mouseState === "down"){
		if(FSG.mouseDownArea == "function") {
			var box = FSG.functionBox;
			var xPrime = (x - box.x) / box.w;
			var yPrime = (y - box.y) / box.h;

			FSG.mousemoveFunction(xPrime,yPrime);
			FSG.checkScore();
		}
	}
};

FSG.mousedownPlay = function(x,y) {
	var box = FSG.functionBox;
	FSG.mouseDownArea = "";
	if(x >= box.x && x <= box.x+box.w && y >= box.y && y <= box.y+box.h) {
		FSG.mouseDownArea = "function";
		var xPrime = (x - box.x) / box.w;
		var yPrime = (y - box.y) / box.h;

		FSG.mouseDownPosPrime = {x:xPrime,y:yPrime};

		var wave = FSG.userWaves[FSG.userWaveSelected];
		wave.amp0 = wave.amp;
		wave.freq0 = wave.freq;
	}

	box = FSG.menuBox;
	if(x >= box.x && x <= box.x+box.w && y >= box.y && y <= box.y+box.h) {
		FSG.mouseDownArea = "menu";
		var xPrime = (x - box.x) / box.w;
		var yPrime = (y - box.y) / box.h;
		FSG.mousedownMenu(xPrime,yPrime);		
	}
};

FSG.mousemoveFunction = function(x,y){
	var wave = FSG.userWaves[FSG.userWaveSelected];
	
	var mouseAmp0 = -(FSG.mouseDownPosPrime.y-0.5)*2;
	var offset = 0;
	var ampLimit = 0.15;
	if(mouseAmp0 < ampLimit && mouseAmp0 >= 0) {
		offset = ampLimit-mouseAmp0;
		mouseAmp0 = ampLimit;
	}else if(mouseAmp0 > -ampLimit && mouseAmp0 < 0) {
		offset = -ampLimit-mouseAmp0;
		mouseAmp0 = -ampLimit;
	}

	var mouseAmp = -(y-0.5)*2+offset;
	wave.amp = wave.amp0 * mouseAmp / mouseAmp0;

	var mouseFreq0 = 1/FSG.mouseDownPosPrime.x;
	var offset = 0;

	var mouseFreq = 1/(x+offset);

	var limit = 100;
	if(mouseFreq > limit) {
		mouseFreq = limit;
	}else if(mouseFreq < -limit) {
		mouseFreq = -limit;
	}
	
	if(mouseFreq0 > limit) {
		mouseFreq0 = limit;	
	}else if(mouseFreq0 < -limit) {
		mouseFreq0 = -limit;
	}

	wave.freq = wave.freq0 * mouseFreq / mouseFreq0;
	FSG.dirtyCanvas = true;
};