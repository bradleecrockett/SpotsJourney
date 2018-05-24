class Level extends Page {
	constructor(carLaneInfos, logLaneInfos){
		super();
        //set variables
		this.numCarLanes=carLaneInfos.length;
		this.numLogLanes=logLaneInfos.length;
		this.numTotalLanes=this.numCarLanes+this.numLogLanes+3;
		this.laneHeight = (int)(canvas.height/this.numTotalLanes);
		this.bottomLaneY = canvas.height-this.laneHeight;
		this.topLaneY = this.bottomLaneY + (this.laneHeight*(this.numTotalLanes-1));
		
        //--------------------------------------------------
        //-------------Create array of Lanes----------------
        //--------------------------------------------------
        
        // add bottom safe lane
		var curY = this.bottomLaneY;
		var curLane = 0;
		this.lanes = [
			new SafeLane(curLane, this.laneHeight, curY)
		];
		
		// add car lanes
		for (var i = 0; i < this.numCarLanes; i++) {
			curY -= this.laneHeight;
			curLane += 1;
			this.lanes.push(new CarLane(curLane, this.laneHeight, curY, carLaneInfos[i]))
		}
		
        // add middle safe lane
		curY-= this.laneHeight;
		curLane += 1;
		this.lanes.push(new SafeLane(curLane, this.laneHeight, curY))

		// add log lanes
		for (var i = 0; i < this.numLogLanes; i++) {
			curY -= this.laneHeight;
			curLane += 1;
			this.lanes.push(new LogLane(curLane, this.laneHeight, curY, logLaneInfos[i]))
		}
		
        // add top safe lane
		curY -= this.laneHeight;
		curLane += 1;
		this.lanes.push(new SafeLane(curLane, this.laneHeight, curY))
	} //array is now created
    
    
    //draws lanes background and player
	draw(canvas, player) {
		if (this.running === true) {
			for(var i=0; i < this.lanes.length; i++){
				var lane = this.lanes[i];
				if (i === player.lane && this.isLogLane(i) && lane.checkCollision(player)) {
					//player is currently riding a log in this lane
					//function to move player with log
					player.boundedMoveX(lane.speed);
				}
				lane.move();
			}
			if (this.checkCarCollision(player)) {
				player.handleCarCollision(this);
			}
			if (this.checkWaterCollision(player)) {
				player.handleWaterCollision(this);
			}
		}
        
		canvas.background(safeColor);
        
        //lanes draw here!
		for(var i=0; i < this.lanes.length; i++){
			this.lanes[i].draw();
		}
        
        
        // show player lives
        fill(0,0,0);
        textSize(20);
        textAlign(LEFT, TOP);
        text("Lives: " + player.lives, 20, 20);
		player.draw();
	}
    
    //function that determines whether or not objects can move, can be manually toggled by pressing space bar
	isRunning(){
		return this.running;
	}
    
    //resets entire level
	reset(player){
		player.resetForLevel(canvas.width/2,this.bottomLaneY+(int)(this.laneHeight/2), 0);
		
		// reset all lanes
		for(var i=0; i < this.lanes.length; i++){
			this.lanes[i].reset();
		}
		
		this.running = true;
	}
	
	playerDied(player, gameOver) {
		this.running = false;
		if (gameOver) { //when lives = 0
            // set a timeout to perform the rest
            setTimeout(function() {
      			theGame.gameLost();
                sounds.playLose(); 
    		}, 1000);
		} else { // restarts level
			// set a timeout to perform the rest
			var _this = this;
			var _player = player;
			setTimeout(function() {
      			_this.reset(_player);
    		}, 2000);
		}
	}
    
    //go to next level
	complete(player){
		theGame.advancePage();
        if(theGame.currentPageIndex === theGame.pages.length-2){
           sounds.playWin();
           }
	};
	
    //manually starts and stops movement of obstacles
	keyPressed(keyCode) {
		if (keyCode === 32) {
			this.running = !this.running;
		}
	}
	
	//checks for collisions in car lanes using two functions
	isCarLane(laneNum) {
		return (laneNum >= 1) && (laneNum <= this.numCarLanes);
	}
	
	checkCarCollision(player) {
		if (this.isCarLane(player.lane)) {
			return this.lanes[player.lane].checkCollision(player);
		} else {
			return false;
		}
	}

    
    //checks for collisions in log lanes using two functions
	isLogLane(laneNum) {
		return (laneNum >= (this.numCarLanes + 2)) && (laneNum <= (this.numTotalLanes - 2));
	}
	
	checkWaterCollision(player) {
		if (this.isLogLane(player.lane)) {
			return !this.lanes[player.lane].checkCollision(player);
		} else {
			return false;
		}
	}
}


//--------------------------------------------------
//------------Creates all of the levels-------------
//--------------------------------------------------

class Level1 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
				[yellowCar, 2, [2, -4]],
				[yellowCar, -3, [1, -3]]
        ],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, -2, [2, -4]],
				[basicLog, 1.5, [3, -3]]
		])
	}
}

class Level2 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
				[yellowCar, 3, [2, -4]],
				[yellowCar, -4, [1, -3]]
				//[yellowCar, -3, [4, -8]]
		],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, -3, [2, -4]],
				[basicLog, 2, [3, -3]]
		])
	}  
}

class Level3 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
                [yellowCar, -3.1, [1, -5]],
				[yellowCar, 2.2, [2, -4]],
				[yellowCar, -3, [2, -2, 2, -6]]
		],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, 2, [3, -3]],
				[basicLog, -3, [2, -4]],
				[basicLog, 4, [4, -2]]
		])
	}  
}

class Level4 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
				[yellowCar, -3, [1, -5]],
				[yellowCar, 2, [2, -4]],
				[yellowCar, -3.5, [1, -4, 2, -5]]
		],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, 3, [3, -3]],
				[basicLog, -3.5, [2, -4]],
				[basicLog, 4, [3, -3]]
		])
	}  
}

class Level5 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
				[yellowCar, -3.6, [1, -4, 2, -5]],
				[yellowCar, 2.4, [2, -4]],
                [yellowCar, -3.2, [1, -5]]
		],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, 3, [1, -5]],
				[basicLog, -3.5, [2, -4]],
				[basicLog, 4, [1, -3]]
		])
	}  
}

class Level6 extends Level {
	constructor() {
		super(
			// CarLaneInfos
			[
                //image, speed, pattern
				[yellowCar, 3.4, [2, -4]],
                [yellowCar, -3.9, [3, -9]],
				[yellowCar, -4.1, [1, -3]]
				
		],
			// LogLaneInfos
			[
                //image, speed, pattern
				[basicLog, -3, [2, -4]],
				[basicLog, 2.5, [1, -5]]
		])
	}  
}
