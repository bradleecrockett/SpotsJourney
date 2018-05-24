class Lane {
	constructor(laneNum, height, y, bgColor) {
		this.laneNum = laneNum;
		this.height = height;
		this.x = 0;
		this.y = y;
		this.width = canvas.width;
		this.objY = this.y + (int)((this.height-objectSize)/2);
		this.bgColor = bgColor;
    }

	draw() {
        //simple lane draw function
		fill(this.bgColor);
		noStroke();
        rectMode(CORNER);
        rect(0, this.y, this.width, this.height);
	}
	
	move() {
		//used and determined by ObstacleLanes
	}
	
	reset(){
		//used and determined by ObstacleLanes
	}
	
	checkCollision(player) {
		return false;
	}
}


//calls the green safe lane and nothing else
class SafeLane extends Lane {
	constructor(laneNum, height, y) {
		super(laneNum, height, y, safeColor)
	}
}


//defines everything needed to create either a logLane or a carLane
class ObstacleLane extends Lane {
	constructor(laneNum, height, y, color, laneInfo) {
		super(laneNum, height, y, color)
		
        //defines variables
		var img = laneInfo[0];
		this.speed = laneInfo[1];
		var pattern = laneInfo[2];
		var flip;
        
        //flips image based on direction
		if (this.speed < 0) {
			flip = true;
		} else {
			flip = false;
		}
        
        //create empty array
		this.obstacles = [];

		//lay out pattern left to right, fills the above array
		var nextX = 0;
		while (nextX <= canvas.width){
			for(var i=0; i < pattern.length; i++){
				var width = pattern[i]*objectSize;
				if (width < 0){ //used if item is a space
					nextX += -width;
                    
				}else{ //used if item is an object
					this.obstacles.push(
						new Obstacle(img, nextX, this.objY,
									 width, objectSize, flip));

					nextX += width;
				}
			}
		}
		this.width = nextX;
	    
        
        //calculates the wrapping of lanes based on direction
		if (this.speed < 0){ //lane move left
			this.resetX = 0;
            
		} else { //lane move right
			this.resetX = -(this.width - canvas.width);
		}
	}
	
    //draws multiple repetions of the pattens defined in Levels
	draw() {
		translate(this.x, 0);
		super.draw();
		
		for (var i =0; i < this.obstacles.length; i++){
			this.obstacles[i].draw();
		}
		resetMatrix();
	}
	
    
    //moves the lanes as a whole, objects stay in place relative to the levels
	move() {
		super.move();
		this.x += this.speed;
		if (this.speed<0) { //move left
			var extraRight = this.x + this.width - canvas.width; 
			if (extraRight < 0) {
				this.x = extraRight;
			}
            
		}else{ //move right
			var extraLeft = -this.x;
			if (extraLeft < 0) {
				this.x = this.resetX + extraLeft;
			}
		}
	}
	
	reset() {
		this.x = this.resetX;
	}
	
	checkCollision(player) {
		// shifts player position to match obstacle positions
		var pBeginX = player.x - this.x;
		var pEndX = pBeginX + player.size;
		
		// loop through all obstacles in this lane to see if they collide with player
		for (var i =0; i < this.obstacles.length; i++){
			var obstacle = this.obstacles[i];
			var oBeginX = obstacle.x;
			var oEndX = oBeginX + obstacle.width;
			
			if ((pEndX >= oBeginX) && (pBeginX <= oEndX)) {
				// returns if this obstacle overlaps the player
				return true;
			}
		}
		
		// if we got to the end of the obstacle list without finding a collision
		return false;
	}
}

//defines attributes of ObstacleLane to call LogLane
class LogLane extends ObstacleLane {
	constructor(laneNum, height, y, logInfo) {
		super(laneNum, height, y, waterColor, logInfo)
	}
}


//defines attributes of ObstacleLane to call CarLane
class CarLane extends ObstacleLane {
	constructor(laneNum, height, y, carInfo) {
		super(laneNum, height, y, roadColor, carInfo)
	}
}

