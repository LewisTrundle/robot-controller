import { Robot } from './robot';

var Piecewise = require('piecewise-function');
const angle_mapping_left = Piecewise([0, 45, 90, 135, 180, 225, 270, 315, 360], [1, 1, 1, 0, 0, 0, -1, 1, 1])
const angle_mapping_right = Piecewise([0, 45, 90, 135, 180, 225, 270, 315, 360], [0, 0, 1, 1, 1, 1, -1, 0, 0])
  
let robot = new Robot();
// no whitespace allowed between () an {
// no whitespace allowed between functions
// get device code doesn't work
let code = `
function turn(args){
  speeds = args.split(',');
  l_speed = speeds[0];
  r_speed = speeds[1];
  analogWrite("D10", l_speed);
  analogWrite("D9", r_speed);
}
function switchMotor(args){
  args = args.split(',');
  pin = args[0];
  d = args[1];
  digitalWrite(pin, d);
}
function getPinValue(pin){
  return eval(pin +".getInfo()");
}
function stop(){
  digitalWrite("D9", 0);
  digitalWrite("D10", 0);
}
`;

var left_dir = 0;
var right_dir = 0;
var speeds = [];
var sendCode = null;
var connected = false;


// ----- BUTTONS -----
export function connect() {
  robot.connect(function () {
    connected = true;
    console.log("connected");
  });
};

export function upload() {
  console.log("Uploading code");
  robot.loadCode(code);
  console.log("Code Uploaded");
}

export function getDeviceCode() {
  robot.dump().then((deviceData) => {
    console.log(deviceData);
  });
}

export function reset() {
  console.log("Resetting code on device");
  robot.reset();
  console.log("Code reset");
}

export function getBattery() {
  robot.getBattery().then((percentage) => {
    console.log(`Battery percentage is: ${percentage}`);
  });
}

export function disconnect() {
  robot.disconnect(function () {
    connected = false;
    console.log("disconnected");
  });
};


// ----- MOVEMENT -----
export function start() {
  if (!connected) {
    connect();
    return;
  }
  robot.Call.switchMotor("D8", 0);
  robot.Call.switchMotor("D7", 0);
  sendCode = window.setInterval(moveRobot, 1000);
}

export function stop() {
  if (!connected) return;
  window.clearInterval(sendCode);
  robot.Call.stop();
};

export function getSpeeds(angle) {
  if (!connected) return;
  const a = Math.round(angle.degree);
  var l_speed = angle_mapping_left(a);
  var r_speed = angle_mapping_right(a);

  switchDirections(l_speed, r_speed);
  l_speed = Math.abs(l_speed);
  r_speed = Math.abs(r_speed);

  if (l_speed < 0.3 && l_speed > 0) l_speed = 0.3;
  if (r_speed < 0.3 && r_speed > 0) r_speed = 0.3;

  speeds.push([l_speed, r_speed]);
};

function moveRobot() {
  const speed = speeds[speeds.length-1];
  if (speed) {
    console.log(`Left: ${speed[0]}\t Right: ${speed[1]}`);
    robot.Call.turn(speed[0], speed[1]);
  }
}

function switchDirections(l_speed, r_speed) {
  if (l_speed > 0 && left_dir == 1) {
    robot.Call.switchMotor("D8", 0);
    left_dir = 0;
  }
  else if (l_speed < 0 && left_dir == 0) {
    robot.Call.switchMotor("D8", 1);
    left_dir = 1;
  }
  if (r_speed > 0 && right_dir == 1) {
    robot.Call.switchMotor("D7", 0);
    right_dir = 0;
  }
  else if (r_speed < 0 && right_dir == 0) {
    robot.Call.switchMotor("D7", 1);
    right_dir = 1;
  }
}