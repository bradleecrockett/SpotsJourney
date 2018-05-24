var Game = function() {
    //calls levels
	this.pages = [
		new IntroPage(),
		new Level1(),
		new Level2(),
        new Level3(),
        new Level4(),
        new Level5(),
        new Level6(),
		new WinnerPage(),
		new LoserPage()
	];
    
    //variable to set whether debug mode is on or off
	this.debug = false;
    
    //creates/calls the player object
	this.player = new Player();
	
};

//determine what the current page is
Game.prototype.currentPage = function() {
	return this.pages[this.currentPageIndex];
}


//switches to a different page or level
Game.prototype.switchPage = function(pageIndex){
	this.currentPageIndex=pageIndex;
	this.currentPage().reset(this.player);
};

//updates next level and calls switchLevel function
Game.prototype.advancePage = function(){
	sounds.playNextLevel();
	nextLevelIndex = this.currentPageIndex+1;
	if (nextLevelIndex >= this.pages.length){
		nextLevelIndex = 0;
	}
	this.switchPage(nextLevelIndex);
};

//Draws stuff!
Game.prototype.draw = function(canvas) {
	this.currentPage().draw(canvas, this.player);
    
    //debug mode stops movement of obstacles but allows player to still move
	fill(0,0,0);
	textSize(20);
	if (this.debug) {
		text("DEBUG-MODE", 240, 20);
	}
};

//manually stops and starts movement
Game.prototype.keyPressed = function(keyCode) {
	//toggles debug mode
	if (keyCode === 68) {
		this.debug = !this.debug;
	}
    //allows player to move
	if (this.currentPage().isRunning() || this.debug) {
        this.player.keyPressed(keyCode,this.currentPage());
	}
	this.currentPage().keyPressed(keyCode);
};



//resets entire game to level one
Game.prototype.reset = function(){
	this.player.resetLives(3);
	this.switchPage(0);
};

//activates lose page
Game.prototype.gameLost = function(){
	// load the game over page
	this.switchPage(this.pages.length - 1);
};
