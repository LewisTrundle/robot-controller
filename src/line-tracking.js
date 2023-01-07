import { Host, Connector } from "@espruino-tools/peer";

let p = new Host();

// initiliasing for receiving data 
p.getData(function (data) {
  console.log(data);
  switch (data) {
    case "forward":
      // call forward function
      break;
    case "something else":
      // call something else function
      break;
    default:
      // log data or create a default function
      break;
  }
});

// init for video transfer
p.getVideo(function (data) {
  let body = document.getElementsByTagName("body")[0];
  let video = document.createElement("video");
  video.srcObject = data;
  video.play();
  body.appendChild(video);
});