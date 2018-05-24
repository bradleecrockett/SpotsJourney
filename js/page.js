class Page {
	constructor(){
		this.running = false;
	}
    
    //draws  lanes background and player
	draw(canvas, player) {
		// override in derived class
	}
    
    //manually starts and stops movement
	keyPressed(keyCode) {
		// override in derived class
	}
	

	// ----- shouldn't change in derived classes
	//function that determines whether or not objects can move - is currently manually toggled
	isRunning(){
		return this.running;
	}
	
	//resets entire level
	reset(player){
		this.running = false;
	}
	
}



//--------------------------------------------------
//------------Creates all needed pages--------------
//--------------------------------------------------

class IntroPage extends Page {
	draw(canvas, player) {
		//draw background
		fill(safeColor);
		rectMode(CORNER);
		rect(0, 0, canvas.width, canvas.height);
        
        //add text
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        textSize(40);
        text("Welcome To Spot's Journey", width/2, height/6.5);
        
        textSize(24);
        text("Help Spot find his owner!", width/2, height/4.5);
        textSize(19);
        text("Use the arrow keys to move. Cross the road, while avoiding the cars. Get across the river by jumping on logs.", width/4, height/3.2,  width/2);
        
        imageMode(CENTER);
        image(playerSprite, width/2, height/1.6, objectSize*3, objectSize*3);
        
        textSize(24);
        text("Press the space bar to continue", width/2, height/1.2 );
        
        text("Press the 'R' key to reset", width/2, height/1.1 );
	}
	
    //goes to level1
	keyPressed(keyCode) {
		if (keyCode === 32) {
			theGame.advancePage();
		}
	}
}


class WinnerPage extends Page {
	draw(canvas, player) {
		//draw background
		fill(safeColor);
		rectMode(CORNER);
		rect(0, 0, canvas.width, canvas.height);
        
        //add text
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        textSize(40);
        text("You Win!", width/2, height/6.5);
        
        textSize(24);
        text("Spot has found his owner", width/2, height/4.5);
        
        imageMode(CENTER);
        image(playerSprite, width/2.5, height/1.7, objectSize*2, objectSize*2);
        
        imageMode(CENTER);
        image(owner, width/1.75, height/2, objectSize*3, objectSize*5);
        
        textSize(24);
        text("Press the space bar to play again", width/2, height/1.2 );
	}
	
	keyPressed(keyCode) {
		if (keyCode === 32) {
			// restart game from level1
			theGame.reset();
			theGame.switchPage(1);
		}
	}
}

class LoserPage extends Page {
	draw(canvas, player) {
		//draw background
		fill(safeColor);
		rectMode(CORNER);
		rect(0, 0, canvas.width, canvas.height);
        
        //add text
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        textSize(40);
        text("You Lose", width/2, height/6.5);
        
        textSize(24);
        text("Spot got lost trying to find his owner", width/2, height/4.5);
        textSize(19);
        text("Use the arrow keys to move. Cross the road, while avoiding the cars. Get across the river by jumping on logs.", width/4, height/3.2,  width/2);
        
        imageMode(CENTER);
        image(playerSprite, width/2, height/1.6, objectSize*3, objectSize*3);
        
        textSize(24);
        text("Press the space bar to try again", width/2, height/1.2 );
	}
	
	keyPressed(keyCode) {
		if (keyCode === 32) {
			// restart game from level1
			theGame.reset();
			theGame.switchPage(1);
		}
	}
}
