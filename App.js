import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/90383397a2266c189a7fe6dc323191532ef1542a/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        //Global Variables
function start(){
    start2();    
}
var background = new Rectangle(getWidth(),getHeight());
background.setColor(Color.GREEN);
add(background);
var hole = new Circle(10);
var level = 1;
if(level == 1){
    hole.setPosition(30,30);
    var wall = new Rectangle(50,100);
    wall.setPosition(55,0);
    wall.setColor("#4d94ff");
    add(wall);
    var wall2 = new Rectangle(400,50);
    wall2.setColor("#4d94ff");
    wall2.setPosition(0,300);
    add(wall2);
}
add(hole);
var width = getWidth();
var height = getHeight();
var centerLine = new Line(width/2,height/2,width/2,height/2);
var center = new Rectangle(10,10);
center.setColor(Color.red);
center.setPosition(getWidth()/2-5,getHeight()/2-5);
add(center);
var centerY = height/2;
var centerX = width/2;
var number = 0;
var first = true;
//Graphics Outlining the Perimeter
var redLine = new Line(0,0,width,0);
redLine.setLineWidth(10);
add(redLine);
var orangeLine = new Line(width,0,width,height);
orangeLine.setLineWidth(10);
add(orangeLine);
var blueLine = new Line(0,0,0,height);
blueLine.setLineWidth(10);
add(blueLine);
var greenLine = new Line(0,height,width,height);
greenLine.setLineWidth(10);
add(greenLine);
if(level == 1){
    var rules = new Text("Drag from the square!");
    rules.setPosition(120,40);
    add(rules);
}
if(level == 2){
    println("next lvl");
}
function start2(){
    mouseDownMethod(aim); //Initial Start (Mouse on black box in the center)
    function aim(e){
        if ((width/2 - 10 < e.getX()) &&
        (width/2 + 10 > e.getX()) &&
        (height/2 - 10 < e.getY()) &&
        (height/2 + 10 > e.getY())){
            mouseDragMethod(updateLine);
        }
    }
    function updateLine(e) {
	    centerLine.setEndpoint(e.getX(), e.getY());
	    add(centerLine);
	    mouseUpMethod(removeEnd);
    }
    function removeEnd(e){
        centerLine.setEndpoint(width/2,height/2);
        var xSpeed = (centerX - e.getX())/20;
        var randomXSpeed = xSpeed;
        var ySpeed = (centerY - e.getY())/20;
        var randomYSpeed = ySpeed;
        go();
        function go(){
            var circle = new Circle(5);
            circle.setPosition(centerX,centerY);
            circle.setColor(Color.white);
            add(circle);
            setTimer(move,1);
            function move(){
                circle.move(randomXSpeed,randomYSpeed);
                randomXSpeed/=1.01;
                randomYSpeed/=1.01;
                if((-0.015 < randomYSpeed) && (randomYSpeed < 0.015)){
                    randomYSpeed = 0;
                    //randomXSpeed = 0;
                }
                if((-0.015 < randomXSpeed) && (randomXSpeed < 0.015)){
                    randomXSpeed = 0;
                    //randomYSpeed = 0;
                }
                //If it gets into the hole
                var yPos = circle.getY();
                var xPos = circle.getX();
                if((hole.getX()-7 <= xPos) && (xPos <= hole.getX() + 7) && (hole.getY()-7 <= yPos) && (yPos <= hole.getY() + 7) && (Math.abs(randomXSpeed * randomXSpeed) + Math.abs(randomYSpeed * randomYSpeed) <= 2)){
                    circle.setPosition(1000,1000);
                    start();
                }
                //Walls and Obstacles
                if(level == 1){
                    if(circle.getX() >= wall.getX() && circle.getX() <= wall.getX() + 50 && circle.getY() <= 100 && circle.getY() >= 0){
                        circle.setPosition(1000,1000);
                    }
                    if(circle.getY() >= 300){
                        circle.setPosition(1000,1000);
                    }
                }else
                if(level == 1){
                    if(circle.getX() >= wall.getX() && circle.getX() <= wall.getX() + 50 && circle.getY() <= 150 && circle.getY() >= 0){
                        circle.setPosition(1000,1000);
                    }
                    if(circle.getY() >= 300){
                        circle.setPosition(1000,1000);
                    }
                }
                if(xPos>=width-10){
                    randomXSpeed *= -1;
                }
                if(xPos<=10){
                    randomXSpeed *= -1;
                }
                if(yPos>=height-10){
                    randomYSpeed *= -1;
                }
                if(yPos<=10){
                    randomYSpeed *= -1;
                }
            }
        }
    }
}


        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
