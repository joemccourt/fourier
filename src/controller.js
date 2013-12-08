"use strict";
var FSG = {};
FSG.canvasID = "#canvas";
FSG.dirtyCanvas = true;
FSG.lastFrameTime = 0;
FSG.mousePos = {'x':0.5,'y':0.5};
FSG.mouseState = "up";

FSG.time = 0;

FSG.main = function() {
	FSG.startSession();

	requestNextAnimationFrame(FSG.gameLoop);
};

window.onload = FSG.main;

FSG.startSession = function() {
	FSG.canvas = $(FSG.canvasID)[0];
	FSG.ctx = FSG.canvas.getContext("2d");

	//FSG.setLevelRenderBox();
	// FSG.loadGameState();
	FSG.resizeToFit();

	FSG.dirtyCanvas = true;
	FSG.initEvents();
};

FSG.gameLoop = function(time) {
	var ctx = FSG.ctx;
	FSG.time = time;

	if(FSG.dirtyCanvas){
		FSG.dirtyCanvas = false;

		FSG.drawGame();
		// FSG.drawClear();
		// FSG.drawModules();
	}

	requestNextAnimationFrame(FSG.gameLoop);

	FSG.frameRenderTime = time - FSG.lastFrameTime;
	FSG.lastFrameTime = time;
};

FSG.mousemove = function(x,y){
	var w = FSG.canvas.width;
	var h = FSG.canvas.height;

	FSG.mousePos = {'x':x,'y':y};

	if(FSG.mouseState === "down"){

	}
};

FSG.mousedown = function(x,y){
	FSG.mousePos = {'x':x,'y':y};
	FSG.mouseDownPos = {'x':x,'y':y};
	FSG.mouseState = "down";
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