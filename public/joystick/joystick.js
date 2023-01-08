var s = function(sel) {
  return document.querySelector(sel);
};

var joysticks = {
  static: {
    zone: s('.zone.static'),
    mode: 'static',
    size: 230,
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



var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

console.log(btn);
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}