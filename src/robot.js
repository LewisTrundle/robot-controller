import DeviceController from "@espruino-tools/core";
var Piecewise = require('piecewise-function');

// speed should not be set less that 0.3
export class Robot extends DeviceController {
  constructor() {
    super();
    this.angle_mapping_left = Piecewise([0, 90, 135, 180, 225, 270, 315, 360], [1, 1, 0, -1, 1, -1, 0, 1])
    this.angle_mapping_right = Piecewise([0, 90, 135, 180, 225, 270, 315, 360], [-1, 1, 1, 1, 0, -1, 1, -1])
    this.speed = 50 / 100;
    this.MAX_FORCE = 2.5;
    this.MAX_SPEED = 50 / 100;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  switch_forward() {
    this.Pin.digitalOn("D7", 0);
    this.Pin.digitalOn("D8", 0);
  }

  move(direction, angle, force) {
    this.turn(angle);
    //this.forward();
  }
  
  turn(angle) {
    const a = Math.round(angle.degree);
    var l_speed = this.angle_mapping_left(a);
    var r_speed = this.angle_mapping_right(a);
    this.switch_forward();
    console.log(l_speed, r_speed);
    this.Pin.analogOn("D9", r_speed);
    this.Pin.analogOn("D10", l_speed);
  }

  forward() {
    this.switch_forward();
    this.Pin.analogOn("D9", this.speed);
    this.Pin.analogOn("D10", this.speed);
  }

  stop() {
    this.Pin.analogOn("D9", 0);
    this.Pin.analogOn("D10", 0);
  }

  backward() {
    this.Pin.digitalOn("D7", 1)
    this.Pin.digitalOn("D8", 1)
    this.Pin.analogOn("D9", this.speed);
    this.Pin.analogOn("D10", this.speed);
  }

  getInfo(pin) {
    this.Pin.getInfo(pin).then((pinInfo) => {
      console.log(pinInfo);
    })
  }
}