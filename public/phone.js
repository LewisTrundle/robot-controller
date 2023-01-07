var s = function(sel) {
  return document.querySelector(sel);
};

var joysticks = {
  static: {
    zone: s('.zone.static'),
    mode: 'static',
    size: 250,
    position: {
      left: '50%',
      top: '50%'
    },
    color: '#FF0000',
    restOpacity: 0.8,
  }
};

function bindNipple() {
  joystick.on('start', function(evt, data) {
    console.log("moving robot");
    robot.start();
  }).on('end', function(evt, data) {
    console.log("stopping robot");
    robot.stop();
  }
  ).on('move', function(evt, data) {
    robot.getSpeeds(data.angle);
  });
}

function createNipple(evt) {
  if (joystick) {
    joystick.destroy();
  }
  joystick = nipplejs.create(joysticks[evt]);
  bindNipple();
}

var joystick;
createNipple('static');