var Myo = require('./myojs-0.8.6');

var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    SerialPort = require("serialport").SerialPort,
    serialPort = new SerialPort("/dev/cu.usbmodem14141", {
		baudrate: 57600
	}),
	led, frame, pitch, roll, hand_normal;

	var sensitivity_constant = -100;

	var out = [0, 0, 0];

  var euler = [0, 0, 0];

var initMyo = function(sensitivity_constant) {
        "use strict";

        window.hub = new Myo.Hub();

        window.hub.on('frame', function(frame) {

            euler[0] = frame.euler.y;
            euler[1] = frame.euler.z;
            euler[2] = frame.euler.x;

        });
    };
initMyo();

var socketWrite = function(sensitivity_constant) {
	mvg_avg = [0,0,0];    
    ws.on('message', function(data, flags) {
       //  frame = JSON.parse(data); 

       //  if(frame.hands && frame.hands.length > 0) {

       //  	hand_normal = frame.hands[0].palmNormal;

	     	// console.log('Hand Normal: ' + hand_normal); // [roll, thumb_thing, pitch]
	 		
	    	pitch = Math.round(euler[0]*sensitivity_constant + 500);	

	    	roll = Math.round(euler[2]*sensitivity_constant + 500);

	    	serialPort.write("1" + roll + "\r");

	    	serialPort.write("0" + pitch + "\r");

    	} else {
	    	serialPort.write("0500\r");
	    	serialPort.write("1500\r");

    	}
    });
};
    
setTimeout(socketWrite(sensitivity_constant),18);