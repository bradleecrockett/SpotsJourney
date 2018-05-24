class Player {
	constructor(){
		this.x=canvas.width/2;
		this.y=canvas.height/2;
		this.sprite = loadImage('images/dog.png');
		this.colliding = false;
	}

	draw() {
		if (this.colliding) {
			fill(255, 0, 0);
			rectMode(CORNER);
			rect(this.x,this.y,this.size,this.size);   
		}
		imageMode(CORNER);
		image(this.sprite, this.x,this.y,this.size,this.size);   
	}

	keyPressed(keyCode, level){
        if (level.running === true || theGame.debug === true){
            switch (keyCode) {
                    //moves character based off of which key is pressed
                case UP_ARROW:
                    sounds.playMove();
                    if (this.lane != level.numTotalLanes-1) {
                        this.y -= level.laneHeight;
                        this.lane += 1;
                        // check if at top
                    }else{
                        level.complete(this);
                    }
                    break;
                case DOWN_ARROW:
                    sounds.playMove();
                    if (this.lane != 0) {
                        this.y += level.laneHeight;
                        this.lane -= 1;
                    }
                    break;
                case LEFT_ARROW:
                    sounds.playMove();
                    this.boundedMoveX(-(int)(this.size/1.5));
                    break;
                case RIGHT_ARROW:
                    sounds.playMove();
                    this.boundedMoveX((int)(this.size/1.5));
                    break;
            }
            if (level.checkCarCollision(this)) {
                this.handleCarCollision(level);
            }
            if (level.checkWaterCollision(this)) {
                this.handleWaterCollision(level);
            }
        }
	}
	
    //keeps player from moving off screen
	boundedMoveX (delta) {
		this.x += delta;
		if (this.x < 0){
			this.x = 0;
		}
		if (this.x > canvas.width - this.size){
			this.x = canvas.width - this.size;
		}
	}
	
    //determines what to do for each collision
	handleCarCollision(level) {
		this.colliding = true;
		sounds.playHitCar();
		this.lives -= 1;
		var gameOver = this.lives === 0;
		level.playerDied(this, gameOver);
	}
	
	handleWaterCollision(level) {
		this.colliding = true;
		sounds.playHitWater();
		this.lives -= 1;
		var gameOver = this.lives === 0;
		level.playerDied(this, gameOver);
	}
	
	
	//info to reset player at begining of levels
	resetForLevel(centX,centY,startLane){
		this.colliding = false;
		this.size= objectSize;
		this.x= centX - (int)(this.size/2);
		this.y= centY - (int)(this.size/2);
		this.lane= startLane;

		// this.orientation = up
	}

	resetLives(numLives){
		this.lives=numLives;
	}
}