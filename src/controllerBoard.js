"use strict";

FSG.drawBoardGameBox = [-0.1,-1.5,1.1,1.1];
FSG.drawBoardGameTransform = [1,0,0,0,
							  0,1,0,0,
							  0,0,1,0];
FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform.slice(0);
FSG.boardLevelRadius = 0.036;
FSG.dirtyBoardGameBackground = true;

FSG.gameInternalToRenderSpace = function(x,y){
	var xRender = x / 2 * FSG.getRenderBoxWidth()  + FSG.renderBox[0];
	var yRender = FSG.renderBox[1] + y*FSG.getRenderBoxWidth()/2;
	return [xRender,yRender];
};

FSG.gameRenderToInternalSpace = function(x,y){
	var xInternal = 2*(x - FSG.renderBox[0]) / FSG.getRenderBoxWidth();
	var yInternal = (y - FSG.renderBox[1]) / FSG.getRenderBoxWidth()*2;
	return [xInternal,yInternal];
};

FSG.internalToRenderSpace = function(x,y){
	var xRender = x * FSG.getRenderBoxWidth()  + FSG.renderBox[0];
	var yRender = y * FSG.getRenderBoxHeight() + FSG.renderBox[1];
	return [xRender,yRender];
};

FSG.renderToInternalSpace = function(x,y){
	var xInternal = (x - FSG.renderBox[0]) / FSG.getRenderBoxWidth();
	var yInternal = (y - FSG.renderBox[1]) / FSG.getRenderBoxHeight();
	return [xInternal,yInternal];
};

FSG.gameToBoardInternalSpace = function(x,y){
	var newX = x/2;
	var newY = y/2*FSG.getRenderBoxWidth()/FSG.getRenderBoxHeight();

	return [newX,newY];
};

FSG.setBoardRenderBox = function(){
	var w = FSG.canvas.width;
	var h = FSG.canvas.height;
	FSG.renderBox = [w*0.02+0.5|0,h*0.02+0.5|0,w*0.98+0.5|0,h*0.98+0.5|0];

	if(FSG.noBorder){
		FSG.renderBox = [0,0,w,h];
	}
};

// *** Events ***
FSG.mouseupBoard = function(x,y){
	FSG.mouse = "up";
	FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
	FSG.saveGameState();
};

FSG.mousedownBoard = function(x,y){
	FSG.mouseDownLast = {x:x,y:y};
	FSG.drawBoardGameTransform = FSG.drawBoardGameTransformTmp;

	var w  = FSG.getRenderBoxWidth();
	var h  = FSG.getRenderBoxHeight();
	var x1 = FSG.renderBox[0];
	var y1 = FSG.renderBox[1];

	var posC = FSG.getTransformedCoordsInv(FSG.drawBoardGameTransform,x,y);
	//console.log("["+posC[0].toFixed(2)+","+posC[1].toFixed(2)+"]");
	var pC = FSG.internalToRenderSpace(posC[0],posC[1]);

	var coords = FSG.levelCoords;
	var r = FSG.boardLevelRadius * (w+h)/2;
	for(var i = 0; i < coords.length; i++){
		var posL = FSG.internalToRenderSpace(coords[i][0],coords[i][1]);
		var pL = posL;
		// var pL   = FSG.getTransformedCoords(FSG.drawBoardGameTransform,posL[0],posL[1]);

		if(!FSG.canPlayLevel(i)){
			continue;
		}else if(Math.pow(pC[0]-pL[0],2)+Math.pow(pC[1]-pL[1],2) < r*r){
			FSG.selectLevel(i);
			break;
		}
	}
};

FSG.mousemoveBoard = function(x,y){
	if(FSG.mouseState == "down"){
		FSG.drawBoardGameTransform = FSG.transfromTranslate(FSG.drawBoardGameTransform, x - FSG.mouseDownLast.x, y - FSG.mouseDownLast.y);
		FSG.dirtyCanvas = true;	
		FSG.mouseDownLast = {x:x,y:y};
	}
};

FSG.keydownBoard = function(k){

	// 37 - left 65 - a
	// 38 - up  87 - w
	// 39 - right 68 - d
	// 40 - down 83 - s
	if(k == 37 || k == 65){
		FSG.drawBoardGameTransform = FSG.transfromTranslate(FSG.drawBoardGameTransform, 0.05, 0);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}else if(k == 39 || k == 68){
		FSG.drawBoardGameTransform = FSG.transfromTranslate(FSG.drawBoardGameTransform, -0.05, 0);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}else if(k == 38 || k == 87){
		FSG.drawBoardGameTransform = FSG.transfromTranslate(FSG.drawBoardGameTransform, 0, 0.05);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}else if(k == 40 || k == 83){
		FSG.drawBoardGameTransform = FSG.transfromTranslate(FSG.drawBoardGameTransform, 0,-0.05);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}else if(k == 189){

		//zoom out
		FSG.drawBoardGameTransform = FSG.transfromScale(FSG.drawBoardGameTransform, 0.8);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}else if(k == 187){

		//zoom in
		FSG.drawBoardGameTransform = FSG.transfromScale(FSG.drawBoardGameTransform, 1.25);
		FSG.drawBoardGameTransformTmp = FSG.drawBoardGameTransform;
		FSG.saveGameState();
		FSG.dirtyCanvas = true;
	}
};

// *** Transforms ***
FSG.getTransformedCoords = function(t,x,y){
	var xNew = t[0]*x+t[1]*y+t[3];
	var yNew = t[4]*x+t[5]*y+t[7];

	return [xNew,yNew];
};

//TODO: make this actually inv
FSG.getTransformedCoordsInv = function(t,x,y){
	var xNew = x-t[3];
	var yNew = y-t[7];

	return [xNew,yNew];
};

FSG.transfromTranslate = function(t,x,y){
	var newT = t.slice(0);
	newT[3] += x;
	newT[7] += y;

	var gameBox = FSG.drawBoardGameBox;

	var offX = -newT[3];
	var offY = -newT[7];

	offX = offX < gameBox[0]   ? gameBox[0]   : offX;
	offX = offX > gameBox[2]-1 ? gameBox[2]-1 : offX;

	offY = offY < gameBox[1]   ? gameBox[1]   : offY;
	offY = offY > gameBox[3]-1 ? gameBox[3]-1 : offY;

	newT[3] = -offX;
	newT[7] = -offY;

	return newT;
};


FSG.transfromScale = function(t,s){
	var newT = t.slice(0);
	newT[0] *= s;
	newT[5] *= s;

	var gameBox = FSG.drawBoardGameBox;
	return newT;
};
