import { Robot } from './robot';

var Piecewise = require('piecewise-function');
const angle_mapping_left = Piecewise([0, 90, 135, 180, 225, 270, 315, 360], [1, 1, 0, -1, 1, -1, 0, 1])
const angle_mapping_right = Piecewise([0, 90, 135, 180, 225, 270, 315, 360], [-1, 1, 1, 1, 0, -1, 1, -1])
    
let robot = new Robot();
// no whitespace allowed between () an {
// no whitespace allowed between functions
// get device code doesn't work
let code = `
function turn(l_speed, r_speed){
  analogWrite("D9", r_speed);
  analogWrite("D10", l_speed);
}
function stop(){
  digitalWrite("D9", 0);
  digitalWrite("D10", 0);
}
`;

export function connect() {
  robot.connect(function () {
    console.log("connected");
  });
};

export function upload() {
  console.log("Uploading code");
  robot.loadCode(code);
}

export function getDeviceCode() {
  robot.dump().then((deviceData) => {
    console.log(deviceData);
  });
}

export function getDeviceFunctions() {
  robot.getDeviceFunctions().then((functions) => {
    console.log(functions);
  });
}

export function reset() {
  console.log("resetting code on device");
  robot.reset();
}

export function move(direction, angle, force) {
  const a = Math.round(angle.degree);
  const l_speed = angle_mapping_left(a);
  const r_speed = angle_mapping_right(a);
  console.log(l_speed, r_speed);
  //const l_speed = angle_mapping_left(a);
  //const r_speed = angle_mapping_right(a);
  //console.log(`At angle ${a}, turning with\n\tleft motor: ${l_speed}\n\tright motor: ${r_speed}`)
  //robot.Call.turn(l_speed, r_speed);
};


export function getBattery() {
  robot.getBattery().then((percentage) => {
    console.log(percentage);
  });
}

export function disconnect() {
  robot.disconnect(function () {
    console.log("disconnected");
  });
};

export function changeSpeed(speed) {
  robot.setSpeed(speed / 100);
};

export function forward() {
  robot.forward();
};

export function stop() {
  robot.Call.stop();
}

export function backward() {
  robot.backward();
};