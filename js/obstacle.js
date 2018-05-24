class Obstacle {
	constructor(img, x, y, width, height, flip){
        //creates and defines variables for Obstacle class
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.flip= flip;
		this.centerX = this.x + (int)(this.width/2);
		this.centerY = this.y + (int)(this.height/2);
	}
    
    //draws stuff!
	draw(){
    	// Save current matrix and set it up so we rotate this obstacle 
		push();
		translate(this.centerX, this.centerY); // translate to our center point
		if (this.flip) {
			scale(-1,1); // flip along the X-axis to "reverse direction"
		}
	
		// Since our coordinate system is now at our center, draw in CENTER mode
    	imageMode(CENTER);
    	image(this.img, 0, 0, this.width, this.height);
		
		// Restore the previous matrix so our changes don't affect others
		pop();
	}
}
