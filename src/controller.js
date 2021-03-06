"use strict";
var FSG = {};

FSG.unlockAllLevels = true;

FSG.defaultButton = {
	"box": {x:0, y:0, w:1, h:1},
	"text": "",
	"fillStyle": "white",
	"strokeStyle": "black",
	"textStyle": "black",
	"action": "nothing"
};

FSG.canvasID = "#canvas";
FSG.dirtyCanvas = true;
FSG.lastFrameTime = 0;
FSG.mousePos = {'x':0.5,'y':0.5};
FSG.mouseState = "up";

FSG.level = 0;
FSG.maxLevel = 0;
FSG.levelWon = false;

FSG.renderBox = [0,0,0,0];

FSG.bestScores = {};
FSG.userWaves = {};

FSG.Timbre = {
	'T': T("+",{mul:0.1})
};

FSG.Timbre.T.play(); //TODO: better way of doing this :/

FSG.maxUserWaveID = 0;

FSG.gameBox = {x:0,y:0,w:1,h:1};
FSG.functionBox = {x:0,y:0,w:1,h:0.75};//{x:0.2,y:0.1,w:0.5,h:0.75};
FSG.menuBox = {x:0,y:0.75,w:1,h:0.25};

FSG.mouseDownArea = "function"; //"menu"

// "play" - level play phase
// "win" - prompt on win to keep playing or go to next level
// "menu" - buttons to quit, restart
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

// var sine1 = T("sin", {freq:440, mul:0.5});
// var sine2 = T("sin", {freq:660, mul:0.5});

// T("perc", {r:500}, sine1, sine2).on("ended", function() {
//   this.pause();
// }).bang().play();

// T("+", T("sin", {freq:261.6256, mul:0.5}),
//        T("sin", {freq:659.25, mul:0}),
//        T("sin", {freq:783.99, mul:0})).play();

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
		if(FSG.gamePhase == "board") {
			FSG.drawBoardGame();
		}else{
			FSG.drawGame();
			FSG.drawControls();


			//TODO: find way of doing this realtime without clicks
			// FSG.Timbre.removeAll();
			FSG.setTimbre();

			if(FSG.gamePhase == "win") {
				FSG.drawWin();
			}else if(FSG.gamePhase == "menu") {
				FSG.drawMenu();
			}
		}
	}

	requestAnimationFrame(FSG.gameLoop);

	FSG.frameRenderTime = time - FSG.lastFrameTime;
	FSG.lastFrameTime = time;
};

FSG.nextLevel = function() {
	FSG.level++;
	FSG.gamePhase = "play";

	FSG.score = 0;
	FSG.startNewLevel();
};

FSG.selectLevel = function(lvl) {
	FSG.level = lvl;
	FSG.gamePhase = "play";

	FSG.score = 0;
	FSG.startNewLevel();
};

FSG.keepPlaying = function() {
	FSG.gamePhase = "won";
	FSG.dirtyCanvas = true;
};

FSG.exitGame = function() {
	FSG.changeView("board");
};

FSG.winLevel = function() {
	if(!FSG.levelWon && FSG.gamePhase == "play") {
		FSG.gamePhase = "win";
		if(FSG.maxLevel == FSG.level) {
			FSG.maxLevel++;
		}
	}
};

FSG.checkScore = function() {
	FSG.score = FSG.getMatchScore();
	if(typeof FSG.bestScores[FSG.level] !== "number") {
		FSG.bestScores[FSG.level] = 0;
	}else if(FSG.score > FSG.bestScores[FSG.level]) {
		FSG.bestScores[FSG.level] = FSG.score;
	}

	if(FSG.score > FSG.thresholdScore && FSG.gamePhase == "play") {
		FSG.winLevel();
	}

	FSG.saveGameState();
};

FSG.canPlayLevel = function(i) {
	if(FSG.unlockAllLevels){return true;s}
	if(i <= FSG.maxLevel) {
		return true;
	}
	return false;
}

FSG.changeView = function(phase) {
	FSG.gamePhase = phase;
	FSG.dirtyCanvas = true;

	if(phase == "board") {
		FSG.setBoardRenderBox();
	}else{

	}
};

FSG.keydownPlay = function(key) {
	if(key == 27) {
		FSG.changeView("menu");
	}
};

FSG.sanitizeButton = function(button,defaultButton) {
	if(typeof button !== "object"){button = {};}

	if(typeof defaultButton !== "object") {
		defaultButton = FSG.defaultButton;
	}

	for(var key in defaultButton){
		if(defaultButton.hasOwnProperty(key) && button[key] == null && key !== "childButtons") {
			button[key] = defaultButton[key];
		}
	}

	return button;
};

FSG.getMouseDownAction = function(button, x, y, parentButton) {
	var action = "";

	parentButton = FSG.sanitizeButton(parentButton);
	FSG.sanitizeButton(button,parentButton);

	var box = FSG.getSubBox(parentButton.box,button.box);

	var x1 = box.x;
	var y1 = box.y;

	var x2 = x1+box.w;
	var y2 = y1+box.h;
	var childAction = "";

	if(x >= x1 && x <= x2 && y >= y1 && y <= y2) {
		action = button.action;
		for(var childButtonKey in button.childButtons) {
			if(button.childButtons.hasOwnProperty(childButtonKey)) {
				childAction = FSG.getMouseDownAction(button.childButtons[childButtonKey],x,y,button);
				if(typeof childAction === "string" && childAction !== "") {
					action = childAction;
				}
			}
		}
	}

	return action;
};

FSG.mousemove = function(x,y) {
	if(FSG.gamePhase == "play" || FSG.gamePhase == "won") {
		FSG.mousemovePlay(x,y);
	}else if(FSG.gamePhase == "win") {
		FSG.mousemoveWin(x,y);
	}else if(FSG.gamePhase == "board") {
		FSG.mousemoveBoard(x,y);
	}
};

FSG.mousedown = function(x,y){
	FSG.mousePos = {'x':x,'y':y};
	FSG.mouseDownPos = {'x':x,'y':y};
	FSG.mouseState = "down";

	if(FSG.gamePhase == "play" || FSG.gamePhase == "won") {
		FSG.mousedownPlay(x,y);
	}else if(FSG.gamePhase == "win") {
		FSG.mousedownWin(x,y);
	}else if(FSG.gamePhase == "menu") {
		FSG.mousedownMenu(x,y);
	}else if(FSG.gamePhase == "board") {
		FSG.mousedownBoard(x,y);
	}
};

FSG.mouseup = function(x,y) {
	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	FSG.mousePos = {'x':x,'y':y};
	FSG.mouseState = "up";

	if(FSG.gamePhase == "board") {
		FSG.mouseupBoard(x,y);
	}
};


FSG.keydown = function(e) {
	if(FSG.gamePhase == "play" || FSG.gamePhase == "won") {
		FSG.keydownPlay(e.which);
	}else if(FSG.gamePhase == "win") {
		FSG.keydownWin(e.which);
	}else if(FSG.gamePhase == "menu") {
		FSG.keydownMenu(e.which);
	}else if(FSG.gamePhase == "board") {
		FSG.keydownBoard(e.which)
	}
};

FSG.resizeToFit = function() {
	var w = $(window).width();
	var h = $(window).height();

	FSG.canvas.width  = w;
	FSG.canvas.height = h;

	if(FSG.gamePhase == "board"){
		FSG.setBoardRenderBox();
		FSG.dirtyBoardGameBackground = true;
	}

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
		FSG.maxLevel = gameState.maxLevel;
		FSG.userWaveSelected = gameState.userWaveSelected;
		FSG.bestScores = gameState.bestScores;
		FSG.maxUserWaveID = gameState.maxUserWaveID;
		FSG.userWaveKeysInOrder = gameState.userWaveKeysInOrder;
		FSG.gamePhase = gameState.gamePhase;
	}
};

FSG.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }

	var gameState = {
		'userWaves': FSG.userWaves,
		'level': FSG.level,
		'maxLevel': FSG.maxLevel,
		'userWaveSelected': FSG.userWaveSelected,
		'bestScores': FSG.bestScores,
		'maxUserWaveID': FSG.maxUserWaveID,
		'userWaveKeysInOrder': FSG.userWaveKeysInOrder,
		'gamePhase': FSG.gamePhase
	};

	localStorage["FSG.gameState"] = JSON.stringify(gameState);
};

FSG.getRenderBoxWidth  = function(){return FSG.renderBox[2] - FSG.renderBox[0];};
FSG.getRenderBoxHeight = function(){return FSG.renderBox[3] - FSG.renderBox[1];};

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

	$(document).keydown(function (e) {
		FSG.keydown(e);
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