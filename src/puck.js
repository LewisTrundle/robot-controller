import { Puck } from "@espruino-tools/core";

export class P extends Puck {
  constructor() {
    super();
  }

  ledOn() {
    this.LED.on("red");
    this.LED.on("blue");
    this.LED.on("green");
  }

  ledOff() {
    this.LED.off("red");
    this.LED.off("blue");
    this.LED.off("green");
  }

  ledToggle() {
    this.LED.toggle("red");
  }

  ledFlash() {
    this.LED.flash("red", 10000);
  }

  ledIsOn() {
    this.LED.val("red").then((state) => {
      console.log(state);
    });
  }

  setNFCUrl() {
    this.NFC.setUrl("https://bigbangtheory.fandom.com/wiki/Bazinga")
  }

  enableAccelMovement() {
    this.accel.enableAccelMovement();
  }

  disableAccelMovement() {
    this.accel.disableAccelMovement();
  }

  getAccelValues() {
    this.accel.val().then((data) => {
      console.log(data);
    });
  }

  getDeviceType() {
    this.getDeviceType().then((type) => {
      alert(type);
    })
  }
}