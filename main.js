objectDetector = "";
objects = [];
status1= "";
video = "";

function preload(){
video = createVideo("video.mp4");
video.hide();
}

function setup(){
canvas = createCanvas(480, 320);
canvas.center();
}

function draw(){
image(video, 0, 0, 480, 320);
if(status1 != ""){
objectDetector.detect(video, gotResults);
for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML = "Status: Objects Detected";
document.getElementById("objects").innerHTML = "Number of objects:" + objects.length;

fill("#FF0000");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].y + 15, objects[i].x + 15);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
r = random(255);
g = random(255);
b = random(255);
document.getElementById("footer").style.backgroundColor= "rgb(" + r + "," + g + "," + b + ")";
}

function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded());
document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
if(error){
    console.error(error);
}else{
console.log(results);
objects = results;
}
}
