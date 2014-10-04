var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    SerialPort = require("serialport").SerialPort,
    serialPort = new SerialPort("/dev/cu.usbmodem1411", {
		baudrate: 57600
	}),
	led, frame, pitch, roll, hand_normal;

	var sensitivity_constant = -100;

	var out = [0, 0, 0];

var socketWrite = function(sensitivity_constant) {
	mvg_avg = [0,0,0];    
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 

        if(frame.hands && frame.hands.length > 0) {

        	hand_normal = frame.hands[0].palmNormal;

	     	console.log('Hand Normal: ' + hand_normal); // [roll, thumb_thing, pitch]

	 //    	// Leap Roll: Left is positive 
	 //    	// Leap Pitch: Forward is positive
	 //    	// Leap Thumb on Left => -1
	 		
	    	pitch = Math.round(hand_normal[0]*sensitivity_constant + 500);	

	    	roll = Math.round(hand_normal[2]*sensitivity_constant + 500);

	    	serialPort.write("1" + roll + "\r");

	    	serialPort.write("0" + pitch + "\r");

    	} else {
	    	serialPort.write("0500\r");
	    	serialPort.write("1500\r");

    	}
    });
};
    
setTimeout(socketWrite(sensitivity_constant),18);