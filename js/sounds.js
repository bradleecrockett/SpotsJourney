//load sounds
var Sounds = function(){
    this.squish = loadSound('sounds/Squishing.wav');
    this.bark = loadSound('sounds/dogWoof.wav');
    this.cheering = loadSound('sounds/cheering.wav');
    this.splash = loadSound('sounds/splash.wav');
    this.next = loadSound('sounds/nextLevel.wav');
    this.lose = loadSound('sounds/lose.wav');
};

//set functions for each sound
Sounds.prototype.playHitCar = function(){
    this.squish.setVolume(1.0);
    this.squish.play();
};

Sounds.prototype.playMove = function(){
    this.bark.setVolume(1.5);
    this.bark.play();
};

Sounds.prototype.playHitWater = function(){
    this.splash.setVolume(1.0);
    this.splash.play();
};

Sounds.prototype.playNextLevel = function(){
    this.next.setVolume(0.3);
    this.next.play();
};

Sounds.prototype.playWin = function(){
    this.cheering.setVolume(1.0);
    this.cheering.play();
};

Sounds.prototype.playLose = function(){
    this.lose.setVolume(1.0);
    this.lose.play();
};