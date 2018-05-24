//Global Variables
var canvas;
var theGame;
var sounds; 
var safeColor;
var roadColor;
var waterColor;
var yellowCar;
var playerSprite;
var owner;
var basicLog;
var objectSize;


//Preload runs before the setup can start
function preload(){
    soundFormats('wav');
	
};


//Setup Loop runs once at the beginning of the sketch
function setup() {
	//create the canvas of a particular size
	canvas = createCanvas(600, 600);
	//Give the canvas an id to position it in the HTML
	canvas.parent('sketch-holder');
    
    ellipseMode(CENTER);
	rectMode(CENTER);
	
    //Define the global variables
	safeColor = color(0,230,0);
	roadColor = color(90, 100, 100);
	waterColor = color(0, 50, 255);
	objectSize = 50;
    yellowCar = loadImage("images/car.png");
	basicLog  = loadImage("images/log.png");
    playerSprite = loadImage("images/dog.png");
    owner = loadImage("images/owner.png");
    
    //call sounds and game functions
	sounds = new Sounds();
	theGame = new Game();
	theGame.reset();
}

//Draw loop runs over and over
function draw() {
    theGame.draw(canvas);
};


//test for keyCodes, used for debugging
keyPressed = function(){
	theGame.keyPressed(keyCode)
    
    //changes based on need
    if(keyCode === 87){
        theGame.switchPage(theGame.pages.length-2);
        sounds.playWin();
    }
    
    //resets to IntroPage
    if(keyCode === 82){
        theGame.switchPage(0);
    }

if(keyCode === 76){
        theGame.switchPage(theGame.pages.length-1);
    sounds.playLose();
    }
};