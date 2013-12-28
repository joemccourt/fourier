
FSG.drawBackgroundBasedOnLevel = function(canvas){

	if(FSG.level == 0){
		FSG.bgTriGrid(canvas,FSG.colorSets['xanthe'].slice(1,4),20,0.6,10,"hex");
	}else if(FSG.level == 1){
		FSG.bgTriGrid(canvas,FSG.colorSets['popIsEverything'],7,0.4,90,"halfstripes");
	}else if(FSG.level == 2){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],30,0.3,40);
	}else if(FSG.level == 3){
		FSG.bgTriGrid(canvas,FSG.colorSets['melonBallSurprise'],50,1,40);
	}else if(FSG.level == 4){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],10,0.5,10,"diamonds");
	}else if(FSG.level == 5){
		FSG.bgCircles(canvas,FSG.colorSets['petit'],50,1,14133);
	}else if(FSG.level == 6){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'].slice(1,4),30,0.45,10,"hex");
	}else if(FSG.level == 7){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],15,0.6,10,"stripes");
	}else if(FSG.level == 8){
		FSG.bgTriGrid(canvas,FSG.colorSets['voyage'],10,0.5,10,"halfstripes");
	}else if(FSG.level == 9){
		FSG.bgSquareGrid(canvas,FSG.colorSets['pastels'],30,0.5,10);
	}else if(FSG.level == 10){
		FSG.bgSquareGrid(canvas,FSG.colorSets['primaries'],60,0.3,10);
	}else if(FSG.level == 11){
		FSG.bgSquareGrid(canvas,FSG.colorSets['pastels'],5,0.2,10);
	}else if(FSG.level == 12){
		FSG.bgCircles(canvas,FSG.colorSets['aKissToAwake'],5,0.3,10);
		FSG.bgCircles(canvas,FSG.colorSets['oceanFive'],5,0.3,10);
	}else if(FSG.level == 13){
		FSG.bgTriGrid(canvas,FSG.colorSets['melonBallSurprise'].slice(0,3),30,0.6,10,"hex");
	}else if(FSG.level == 14){
		FSG.bgTriGrid(canvas,FSG.colorSets['loveFlowers'],30,0.35,10,"diamonds");
	}else if(FSG.level == 15){
		FSG.bgSquareGrid(canvas,FSG.colorSets['popIsEverything'],75,0.2,10);
	}else if(FSG.level == 16){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],50,0.3,10,"halfstripes");
	}else if(FSG.level == 17){		
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],20,0.7,0);
	}else if(FSG.level == 18){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],15,0.6,10,"hex");
	}else if(FSG.level == 19){
		FSG.bgTriGrid(canvas,FSG.colorSets['iridescentSunset'],3,1,401,"halfstripes");
	}else if(FSG.level == 20){
		FSG.bgTriGrid(canvas,FSG.colorSets['aKissToAwake'],80,1,41);
	}else if(FSG.level == 21){
		FSG.bgTriGrid(canvas,FSG.colorSets['melonBallSurprise'],5,1,41,"stripes");
	}else if(FSG.level == 22){
		FSG.bgTriGrid(canvas,FSG.colorSets['popIsEverything'],5,0.4,41,"hex");
	}else if(FSG.level == 23){
		FSG.bgCircles(canvas,FSG.colorSets['loveFlowers'],5,0.3,141);
	}else if(FSG.level == 24){
		FSG.bgSquareGrid(canvas,FSG.colorSets['loveFlowers'],75,0.2,10);
	}else if(FSG.level == 25){
		FSG.bgSquareGrid(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.2,13);
	}else if(FSG.level == 26){
		FSG.bgTriGrid(canvas,FSG.colorSets['snowyOwl'],7,1,90);
	}else if(FSG.level == 27){
		FSG.bgTriGrid(canvas,[FSG.colors['black'],FSG.colors['white']],31,0.5,10,"split");
	}else if(FSG.level == 28){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],15,0.6,10,"3d");
	}else if(FSG.level == 29){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],5,0.6,41,"stripes");
		FSG.bgCircles(canvas,FSG.colorSets['snowyOwl'],50,1,71413);
	}else if(FSG.level == 30){
		FSG.bgTriGrid(canvas,FSG.colorSets['popIsEverything'],25,0.4,41,"hex");
	}else if(FSG.level == 31){
		FSG.bgSquareGrid(canvas,FSG.colorSets['voyage'],75,0.6,10);
	}else if(FSG.level == 32){
		FSG.bgTriGrid(canvas,FSG.colorSets['giantGoldfish'],65,0.6,51,"hex");
	}else if(FSG.level == 33){
		FSG.bgTriGrid(canvas,FSG.colorSets['snowyOwl'],70,0.6,41);
		FSG.bgCircles(canvas,FSG.colorSets['pastels'],50,0.3,71413);
	}else if(FSG.level == 34){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],50,0.5,10,"diamonds");
	}else if(FSG.level == 35){
		FSG.bgTriGrid(canvas,FSG.colorSets['iridescentSunset'],30,0.3,41);
	}else if(FSG.level == 36){
		FSG.bgSquareGrid(canvas,FSG.colorSets['voyage'],70,1,41);
		FSG.bgCircles(canvas,FSG.colorSets['voyage'],50,1,71413);
	}else if(FSG.level == 37){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],5,1,4191,"stripes");
	}else if(FSG.level == 38){
		FSG.bgCircles(canvas,FSG.colorSets['pastels'],50,0.3,741413);
		FSG.bgTriGrid(canvas,FSG.colorSets['popIsEverything'],5,0.15,4191,"stripes");
		FSG.bgCircles(canvas,FSG.colorSets['pastels'],50,0.3,71413);
	}else if(FSG.level == 39){
		FSG.bgTriGrid(canvas,FSG.colorSets['loveFlowers'],75,0.4,10);
	}else if(FSG.level == 40){
		FSG.bgTriGrid(canvas,FSG.colorSets['giantGoldfish'],19,0.4,51);
	}else if(FSG.level == 41){
		FSG.bgTriGrid(canvas,FSG.colorSets['popIsEverything'],25,0.2,411);
	}else if(FSG.level == 42){
		FSG.bgCircles(canvas,[FSG.colors['particleBlue'],FSG.negateColor(FSG.colors['particleBlue'])],50,0.4,1413);
		FSG.bgSquareGrid(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.2,43);
		FSG.bgCircles(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.4,113);
	}else if(FSG.level == 43){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],15,0.4,10,"3d");
		FSG.bgSquareGrid(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.2,43);
	}else if(FSG.level == 44){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],15,0.6,106);
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],50,0.2,1230);
	}else if(FSG.level == 45){
		FSG.bgTriGrid(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.1,1230);
		FSG.bgCircles(canvas,[FSG.colors['black'],FSG.colors['white']],50,0.2,113);
	}else if(FSG.level == 46){
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],9,0.4,710,"diamonds");
		FSG.bgTriGrid(canvas,FSG.colorSets['pastels'],80,0.2,10,"diamonds");
	}else if(FSG.level == 47){
		FSG.bgTriGrid(canvas,FSG.colorSets['petit'],5,1,41,"stripes");
	}else if(FSG.level == 48){
		FSG.bgTriGrid(canvas,FSG.colorSets['oceanFive'],55,0.4,4191,"stripes");
	}else if(FSG.level == 49){
		FSG.bgSquareGrid(canvas,FSG.colorSets['xanthe'],50,0.3,433);
	}else if(FSG.level == 50){
		FSG.bgCircles(canvas,FSG.colorSets['snowyOwl'],80,0.5,7134);
		FSG.bgSquareGrid(canvas,FSG.colorSets['snowyOwl'],80,0.5,433);
		FSG.bgCircles(canvas,FSG.colorSets['snowyOwl'],80,0.5,4334);
	}
};

FSG.drawTriAtCoord = function(ctx, x, y, scale){
	var r3_2 = Math.sqrt(3)/2;
	var offsetX = 0;
	var offsetY = -1;
	var gridColor = [0,0,0];

	var startX = (x+offsetX) * scale * r3_2;
	var startY = 0.5 * scale * (y+offsetY);

	var v1x = startX;
	var v1y = startY;

	var v2x = startX+scale*r3_2;
	var v2y = startY+scale*0.5;

	var v3x = startX;
	var v3y = startY+scale;

	//If triangle pointing left flip x coords
	if((x+y)%2==1){
		v2x -= scale * r3_2;
		v1x += scale * r3_2;
		v3x += scale * r3_2;
	}

	ctx.moveTo(v1x,v1y);
	ctx.lineTo(v2x,v2y);
	ctx.lineTo(v3x,v3y);
	ctx.lineTo(v1x,v1y);
};
	
FSG.rng = {
	state: 0,
	setSeed:  function(seed){this.state = seed;},
	nextInt:  function(){this.state = (22695477*this.state+1) % 4294967296;},
	getFloat: function(){this.nextInt();return this.state / 4294967296;}
};

FSG.bgTriGrid = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var r3_2 = Math.sqrt(3)/2;
	var scale = canvas.width/nWidth/2/r3_2;
	var w = nWidth*2;
	var h = Math.ceil(Math.sqrt(3)*w*canvas.height/canvas.width)+1;

	var rng = FSG.rng;
	rng.setSeed(seed);

	var map = [];
	// var colors = FSG.colorSets['pastels'];//[[205,255,149],[255,171,97],[157,237,243],[223,253,255],[34,133,187]];
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++){
			map[w*y+x] = rng.getFloat()*colors.length|0;
			if(type == "diamonds"){
				if((x+y)%2==0&&x!=0){
					map[w*y+x] = map[w*y+x-1]
				}
			
			}else if(type == "split"){
				if(x >= w/2){
					map[w*y+x] = Math.floor(x/2+y/2+1)%2;
				}else{
					map[w*y+x] = (Math.floor(x/2+h-y/2)+h%2)%2;
				}
			}else if(type == "halfstripes"){
				map[w*y+x] = (x+y)%colors.length;
			}else if(type == "stripes"){
				map[w*y+x] = Math.floor((x+y+1)/2)%colors.length;
			}else if(type == "spiky"){
				map[w*y+x] = Math.floor((x+y)/4)%colors.length;
			}else if(type == "3d"){
				map[w*y+x] = Math.floor((x+y)/4+y)%2;
			}else if(type == "hex"){
				var yOff = Math.floor(y/3);
				map[w*y+x] = Math.floor((x+yOff+1)/2+yOff)%colors.length;
			}
		}
	}
    
    for(var k = 0; k < colors.length; k++){
		ctx.beginPath();
		ctx.fillStyle = FSG.colorToStr(colors[k],alpha);
		for(var y = 0; y < h; y++){
				for(var x = 0; x < w; x++){
				if(map[w*y+x] == k){
					FSG.drawTriAtCoord(ctx,x,y,scale);
				}
			}
		}
		ctx.fill();
    }

	ctx.restore();
};


//TODO: use space filling tree
FSG.bgCircles = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var w = canvas.width;
	var h = canvas.height;

	var rng = FSG.rng;
	rng.setSeed(seed);

	var circles = [];

	var r0 = w/20;
	for(var i = 0; i < 1000; i++){
		var k = rng.getFloat()*colors.length|0;
		var r = 0;//rng.getFloat()*w/5;\

		var x,y;

		var p = 0;
		while(r <= 0){
			x = w*rng.getFloat();
			y = h*rng.getFloat();
			
			var minR = r0;

			//Box boundries
			if(x < minR){minR = x;}
			if(w-x < minR){minR = w-x;}
			if(x < w/2 && w/2-x < minR){minR = w/2-x;}
			if(x > w/2 && x-w/2 < minR){minR = x-w/2;}
			if(y < minR){minR = y;}
			if(h-y < minR){minR = h-y;}

			//Other circle boundries
			for(var j = 0; j < circles.length && minR > 0; j++){
				var circle = circles[j];
				var dist = Math.pow(x-circle.x,2)+Math.pow(y-circle.y,2) - Math.pow(circle.r+minR,2);
				if(dist < 0){
					dist = Math.sqrt(Math.pow(x-circle.x,2)+Math.pow(y-circle.y,2)) - circle.r;
					minR = dist;
				}
			}
			r = minR;
			p++;
		}

		circles.push({x:x,y:y,r:r});

		ctx.fillStyle = FSG.colorToStr(colors[k],alpha);
		ctx.beginPath();
		ctx.arc(x,y,r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
    }

	ctx.restore();
};

FSG.bgSquareGrid = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var scale = canvas.width/nWidth/2;
	var w = nWidth*2;
	var h = Math.ceil(w*canvas.height/canvas.width);

	var rng = FSG.rng;
	rng.setSeed(seed);

	var map = [];

	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++){
			map[w*y+x] = rng.getFloat()*colors.length|0;
		}
	}
    
    for(var k = 0; k < colors.length; k++){
		ctx.beginPath();
		ctx.fillStyle = FSG.colorToStr(colors[k],alpha);
		for(var y = 0; y < h; y++){
			for(var x = 0; x < w; x++){
				if(map[w*y+x] == k){
					ctx.moveTo(scale*x,scale*y);
					ctx.lineTo(scale*(x+1),scale*y);
					ctx.lineTo(scale*(x+1),scale*(y+1));
					ctx.lineTo(scale*x,scale*(y+1));
					ctx.lineTo(scale*x,scale*y);
				}
			}
		}
		ctx.fill();
    }

	ctx.restore();
};