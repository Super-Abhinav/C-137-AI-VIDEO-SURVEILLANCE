video = "";
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(680,400);
    canvas.center();
    canvas.position(500,290);
}

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Objects Detecting";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw() {
    image(video, 0, 0, 680, 400);

    if (Status != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status : Objects Detected";
            document.getElementById("Number_of_objects").innerHTML = "No. of objects detected are " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}