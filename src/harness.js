//JFSG vars
var JFSG = {}; //Joe's Fourier Series Game

var kongregate = parent.kongregate;

JFSG.startTime = (new Date()).getTime();
JFSG.clockTime = 0;
JFSG.lastFrameTime = 0;
JFSG.fps = 0;

JFSG.mouse = "up";

JFSG.renderBox = [0,0,0,0];

JFSG.maxLevel = 1;
JFSG.level = JFSG.maxLevel;

JFSG.font = 'Verdana'; //Default font before new one loaded

//State bools
JFSG.dirtyCanvas = true;  //Keep track of when state has changed and need to update canvas

JFSG.gameInProgress = false;
JFSG.wonGame = false;

JFSG.toSaveGame = true;

window.onload = function(){
	// JFSG.startSession();
	requestNextAnimationFrame(JFSG.animate);
	JFSG.initEvents();

};

JFSG.waves = [{freq:1,amp:1}];


JFSG.freq = 1;
JFSG.amp = 1;
JFSG.initd3test = true;
JFSG.d3test = function(time){

	//Test d3 stuff
  	var data = [];
  	var length = 1024;
  	var i,j;

  	for(i = 0; i < length; i++){
  		data[i] = 0;
  		for(j = 0; j < JFSG.waves.length; j++){
  			var wave = JFSG.waves[j];
	  		data[i] += wave.amp*Math.sin(wave.freq*(i/length)*2*Math.PI);
	  		// data[i] += wave.amp*Math.sin(wave.freq*(i/length+time/5000)*2*Math.PI);
  		}
  	}

	var paddingV = 10;
	var width = 800;
	var height = 400;

	JFSG.renderBox = [0,0,width,height];

	var x = d3.scale.linear().domain([0, data.length - 1]).range([0, width]);
    var y = d3.scale.linear().domain([-1, 1]).range([height-paddingV, 0+paddingV]);

	// add the canvas to the DOM
	var line = d3.svg.line().x(function(d, i) { return x(i); }).y(y)

	if(JFSG.initd3test){
		JFSG.initd3test = false;

		var barDemo = d3.select("#canvas").
		append("svg:svg").
		attr("width", width).
		attr("height", height);

		barDemo.selectAll('path.line')
	    .data([data])
	    .enter()
	    .append("svg:path")
	    .attr("d", line)
		.attr("stroke", "#2d578b")
		.attr("stroke-width", "5px")
		.attr("fill", "none");

		// barDemo.selectAll("text").
		//   data(data).
		//   enter().
		//   append("svg:text").
		//   attr("x", function(datum, index) { return x(index) + barWidth; }).
		//   attr("y", function(datum) { return height - y(datum.books); }).
		//   attr("dx", -barWidth/2).
		//   attr("dy", "1.2em").
		//   attr("text-anchor", "middle").
		//   text(function(datum) { return datum.books;}).
		//   attr("fill", "white");
	}else{
		d3.select("#canvas")
		.selectAll("path")
		.data([data]) // set the new data
		.attr("d", line);

		// var barDemo = d3.select("#canvas");
		// barDemo.selectAll("rect").
		//   data(data).
		//   attr("x", function(datum, index) { return x(index); }).
		//   attr("y", function(datum) { return height - y(datum.books); }).
		//   attr("height", function(datum) { return y(datum.books); }).
		//   attr("width", barWidth).
		//   attr("fill", "#2d578b");
	}


};

JFSG.animate = function(time){

	var ctx = JFSG.ctx;
	
	if(JFSG.dirtyCanvas){

		JFSG.dirtyCanvas = false;


		JFSG.d3test(time);
		JFSG.dirtyCanvas = true;

		if(JFSG.checkWon && !JFSG.wonGame){
			JFSG.checkWon = false;
			//check if won game
		}

		//console.log("animate! fps: " + (JFSG.fps+0.5|0));
		
		//Save game
		if(JFSG.toSaveGame){
			JFSG.saveGameState();
			JFSG.toSaveGame = false;
		}
	}

	requestNextAnimationFrame(JFSG.animate);

	JFSG.fps = 1000 / (time - JFSG.lastFrameTime);
	JFSG.lastFrameTime = time;
};

JFSG.startGame = function(){
	JFSG.dirtyCanvas = true;
	JFSG.wonGame = false;
};

JFSG.loadGameState = function() {
	if (!supports_html5_storage()) { return false; }
	JFSG.gameInProgress = (localStorage["JFSG.gameInProgress"] == "true");

	if(JFSG.gameInProgress){
		JFSG.maxLevel = parseInt(localStorage["JFSG.maxLevel"]);
		JFSG.wonGame = (localStorage["JFSG.wonGame"] == "true");
		JFSG.level = parseInt(localStorage["JFSG.level"]);
		JFSG.map = JSON.parse(localStorage["JFSG.map"]);
	}
}

JFSG.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }
	// localStorage["JFSG.gameInProgress"] = true; //temp disable for testing

	localStorage["JFSG.maxLevel"] = JFSG.maxLevel;
	localStorage["JFSG.wonGame"] = JFSG.wonGame;
	localStorage["JFSG.level"] = JFSG.level;

	localStorage["JFSG.map"] = JSON.stringify(JFSG.map);
}

JFSG.startSession = function(){
	JFSG.canvas = document.getElementById("canvas");
	JFSG.ctx = JFSG.canvas.getContext("2d");
	
	var w = JFSG.canvas.width;
	var h = JFSG.canvas.height;

	JFSG.renderBox = [20,20,w-20,h-20];

	JFSG.loadGameState();

	//Start new game
	if(!JFSG.gameInProgress){
		JFSG.startGame();
	}

	JFSG.dirtyCanvas = true;

	JFSG.initEvents();
}

JFSG.getRenderBoxWidth  = function(){return JFSG.renderBox[2] - JFSG.renderBox[0];};
JFSG.getRenderBoxHeight = function(){return JFSG.renderBox[3] - JFSG.renderBox[1];};
JFSG.mouseDown = function(){return JFSG.mouse === "down";};
JFSG.mouseUp = function(){return JFSG.mouse === "up";};

JFSG.internalToRenderSpace = function(x,y){
	var xRender = x * JFSG.getRenderBoxWidth()  + JFSG.renderBox[0];
	var yRender = y * JFSG.getRenderBoxHeight() + JFSG.renderBox[1];
	return [xRender,yRender];
};

JFSG.renderToInternalSpace = function(x,y){
	var xInternal = (x - JFSG.renderBox[0]) / JFSG.getRenderBoxWidth();
	var yInternal = (y - JFSG.renderBox[1]) / JFSG.getRenderBoxHeight();
	return [xInternal,yInternal];
};

JFSG.arrayColorToString = function(color){
	return "rgb("+Math.round(color[0])+","+Math.round(color[1])+","+Math.round(color[2])+")";
};

JFSG.drawGame = function(){

};

JFSG.mousemove = function(x,y){
	var wave = JFSG.waves[JFSG.waves.length-1];

	if(JFSG.mouse == "down"){
		wave.freq = 1/(x+0.1);
		wave.amp = Math.min(1,Math.max(-1,(y-0.5)*2));
	}
};

JFSG.mousedown = function(x,y){
	JFSG.mouse = "down";

};

JFSG.mouseup = function(x,y){
	JFSG.mouse = "up";	
	JFSG.waves[JFSG.waves.length] = {freq:1,amp:0};	
};

JFSG.winGame = function(){
	if(JFSG.level == JFSG.maxLevel){
		JFSG.maxLevel++;

		if(typeof kongregate !== "undefined"){
			kongregate.stats.submit("Max Level",JFSG.maxLevel);
		}

	}

	JFSG.wonGame = true;
};


// *** Events ***
JFSG.initEvents = function(){
	$(document).mouseup(function (e) {
		var offset = $("#canvas").offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		//Convert to internal coord system
		var internalPoint = JFSG.renderToInternalSpace(x,y);
		x = internalPoint[0];
		y = internalPoint[1];

		JFSG.mouseup(x,y);
	});

	$(document).mousedown(function (e) {
		var offset = $("#canvas").offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		//Convert to internal coord system
		var internalPoint = JFSG.renderToInternalSpace(x,y);
		x = internalPoint[0];
		y = internalPoint[1];
		
		JFSG.mousedown(x,y);
	});

	$(document).mousemove(function (e) {
		var offset = $("#canvas").offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		//Convert to intenal coord system
		var internalPoint = JFSG.renderToInternalSpace(x,y);
		x = internalPoint[0];
		y = internalPoint[1];

		JFSG.mousemove(x,y);
	});

	$(document).keypress(function (e) {
		console.log("keypress: ", e.charCode);

		//112 = 'p'
		//114 = 'r'
		//115 = 's'
	});
};

// *** Fonts ***
// WebFontConfig = {
// 	google: { families: [ 'Libre+Baskerville::latin' ] },
// 	active: function() {
// 		JFSG.font = "Libre Baskerville";
// 		JFSG.dirtyCanvas = true;
// 	}
//   };
//   (function() {
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
//   })();

// *** LocalStorage Check ***
function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}



// Reprinted from Core HTML5 Canvas
// By David Geary
window.requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;


            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();