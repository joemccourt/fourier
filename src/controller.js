"use strict";
var FSG = {};
FSG.canvasID = "#canvas";
FSG.dirtyCanvas = true;
FSG.lastFrameTime = 0;
FSG.mousePos = {'x':0.5,'y':0.5};
FSG.mouseState = "up";

FSG.level = 0;
FSG.levelWon = false;

FSG.bestScores = {};
FSG.userWaves = {};

FSG.maxUserWaveID = 0;

FSG.gameBox = {x:0,y:0,w:1,h:1};
FSG.functionBox = {x:0,y:0,w:1,h:0.75};//{x:0.2,y:0.1,w:0.5,h:0.75};
FSG.menuBox = {x:0,y:0.75,w:1,h:0.25};

FSG.mouseDownArea = "function"; //"menu"

// "play" - level play phase
// "win" - prompt on win to keep playing or go to next level
// "board" - level board view
FSG.gamePhase = "play";

FSG.userWaveSelected = 'wave-1';

FSG.time = 0;

FSG.main = function() {
	FSG.startSession();

	requestAnimationFrame(FSG.gameLoop);
};

window.onload = FSG.main;

FSG.startSession = function() {
	FSG.canvas = $(FSG.canvasID)[0];
	FSG.ctx = FSG.canvas.getContext("2d");

	//FSG.setLevelRenderBox();
	FSG.newUser = true;
	FSG.loadGameState();

	FSG.score = 0;

	FSG.resizeToFit();
	FSG.setLevel();

	FSG.dirtyCanvas = true;
	FSG.initEvents();

	if(FSG.newUser){
		FSG.addWave(0.5,3);
	}
};

FSG.gameLoop = function(time) {
	var ctx = FSG.ctx;
	FSG.time = time;

	if(FSG.dirtyCanvas){
		FSG.dirtyCanvas = false;

		FSG.drawClear();
		FSG.drawGame();
		FSG.drawMenu();
	}

	requestAnimationFrame(FSG.gameLoop);

	FSG.frameRenderTime = time - FSG.lastFrameTime;
	FSG.lastFrameTime = time;
};

FSG.winLevel = function() {
	if(!FSG.levelWon && FSG.gamePhase == "play") {
		console.log('win');
		//FSG.gamePhase = "win";
		FSG.level++;
		FSG.score = 0;
		FSG.startNewLevel();
	}
};

FSG.checkScore = function() {
	FSG.score = FSG.getMatchScore();
	if(typeof FSG.bestScores[FSG.level] !== "number") {
		FSG.bestScores[FSG.level] = 0;
	}else if(FSG.score > FSG.bestScores[FSG.level]) {
		FSG.bestScores[FSG.level] = FSG.score;
	}

	if(FSG.score > FSG.thresholdScore) {
		FSG.winLevel();
	}

	FSG.saveGameState();
};

FSG.mousemove = function(x,y) {
	if(FSG.gamePhase == "play") {
		FSG.mousemovePlay(x,y);
	}else if(FSG.gamePhase == "win") {
		// FSG.mousemoveWin(x,y);
	}else if(FSG.gamePhase == "board") {
		// FSG.mousemoveBoard(x,y);
	}
};

FSG.mousedown = function(x,y){
	FSG.mousePos = {'x':x,'y':y};
	FSG.mouseDownPos = {'x':x,'y':y};
	FSG.mouseState = "down";

	if(FSG.gamePhase == "play") {
		FSG.mousedownPlay(x,y);
	}else if(FSG.gamePhase == "win") {
		// FSG.mousedownWin(x,y);
	}else if(FSG.gamePhase == "board") {
		// FSG.mousedownBoard(x,y);
	}
};

FSG.mouseup = function(x,y) {
	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	FSG.mousePos = {'x':x,'y':y};
	FSG.mouseState = "up";
};

FSG.resizeToFit = function() {
	var w = $(window).width();
	var h = $(window).height();

	FSG.canvas.width  = w;
	FSG.canvas.height = h;

	FSG.dirtyCanvas = true;
};

FSG.loadGameState = function(){
	if (!supports_html5_storage()) { return false; }

	var localGameState = localStorage["FSG.gameState"];
	if(typeof localGameState === "string") {
		var gameState = JSON.parse(localGameState);

		FSG.newUser = false;
		FSG.userWaves = gameState.userWaves;
		FSG.level = gameState.level;
		FSG.userWaveSelected = gameState.userWaveSelected;
		FSG.bestScores = gameState.bestScores;
		FSG.maxUserWaveID = gameState.maxUserWaveID;
	}
};

FSG.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }

	var gameState = {
		'userWaves': FSG.userWaves,
		'level': FSG.level,
		'userWaveSelected': FSG.userWaveSelected,
		'bestScores': FSG.bestScores,
		'maxUserWaveID': FSG.maxUserWaveID
	};

	localStorage["FSG.gameState"] = JSON.stringify(gameState);
};

// *** Event binding *** //
FSG.initEvents = function(){
	$(window).resize(function(){
		FSG.resizeToFit();
	});

	$(window).mousemove(function (e) {
		var offset = $(FSG.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = FSG.canvas.width;
		var h = FSG.canvas.height;

		FSG.mousemove(x/w,y/h);
	});

	$(window).mousedown(function (e) {
		var offset = $(FSG.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = FSG.canvas.width;
		var h = FSG.canvas.height;

		FSG.mousedown(x/w,y/h);
	});

	$(window).mouseup(function (e) {
		var offset = $(FSG.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = FSG.canvas.width;
		var h = FSG.canvas.height;

		FSG.mouseup(x/w,y/h);
	});
};

// *** LocalStorage Check ***
function supports_html5_storage() {
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	}catch (e){
		return false;
	}
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());