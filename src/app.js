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

  var euler = {};

var initMyo = function(sensitivity_constant) {
    "use strict";

    var Hub = require("./Hub");
    var hub = new Hub();

    hub.on('frame', function(frame) {

        euler = frame.euler;
        console.log(euler);
        
        // console.log(euler.pitch);
        // console.log(euler.roll);

        pitch = Math.round(euler.pitch * -170 + 500);

        roll = Math.round(euler.roll *  100 + 500);

        console.log(pitch);
        console.log(roll);


        serialPort.write("1" + pitch + "\r");

        serialPort.write("0" + roll + "\r");
    });
};
initMyo(sensitivity_constant);

var socketWrite = function(sensitivity_constant) {
  mvg_avg = [0,0,0];
    ws.on('message', function(data, flags) {
       //  frame = JSON.parse(data); 

       //  if(frame.hands && frame.hands.length > 0) {

       // hand_normal = frame.hands[0].palmNormal;

        // console.log('Hand Normal: ' + hand_normal); // [roll, thumb_thing, pitch]

        // console.log(euler);
      
        // pitch = Math.round(euler.pitch*sensitivity_constant + 500);

        // roll = Math.round(euler.roll*sensitivity_constant + 500);

        // console.log(pitch);
        // console.log(roll);

        // serialPort.write("1" + roll + "\r");

        // serialPort.write("0" + pitch + "\r");

      // } else {
      //  serialPort.write("0500\r");
      //  serialPort.write("1500\r");

      // }
    });
};
    
// setTimeout(socketWrite(sensitivity_constant),18);