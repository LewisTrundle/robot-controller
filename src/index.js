import { Robot } from './robot';
import { P } from './puck';

let robot = new Robot();
let puck = new P();


export function connect() {
  robot.connect(function () {
    console.log("connected");
  });
};

export function move(direction, angle, force) {
  robot.move(direction, angle, force);
};

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
  robot.stop();
}

export function backward() {
  robot.backward();
};

export function ledOn() {
  puck.ledOn();
}

export function ledOff() {
  puck.ledOff();
}

export function ledToggle() {
  puck.ledToggle();
}

export function ledFlash() {
  puck.ledFlash();
}

export function ledIsOn() {
  puck.ledIsOn();
}

export function setNFCUrl() {
  puck.setNFCUrl();
}

export function enableAccelMovement() {
  puck.enableAccelMovement();
}

export function disableAccelMovement() {
  puck.disableAccelMovement();
}

export function getAccelValues() {
  puck.getAccelValues();
}

export function getDeviceType() {
  puck.getDeviceType();
}

export function evaluate() {
  robot.evaluate();
}