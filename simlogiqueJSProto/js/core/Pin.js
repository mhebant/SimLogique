class Pin extends Connector {
	constructor(x, y, side, name) {
		super();
		
		this._value = false;
		this.x = x;
		this.y = y;
		this.side = side;
		this.name = name;
	}
	
	get value() {
		return this._value || (this._connection && this._connection.value);
	}
	
	set value(val) {
		this._value = val;
	}
	
	draw(context, gridStep) {
		if(this.value)
			context.strokeStyle = "rgb(255, 0, 0)";
		else
			context.strokeStyle = "rgb(0, 0, 0)";
		context.font = "10pt monospace";
		context.fillStyle = "black";
		context.lineCap = 'round';
		context.beginPath();
		context.moveTo(this.x*gridStep, this.y*gridStep);
		switch(this.side)
		{
			case 'r':
				context.lineTo((this.x-1)*gridStep, this.y*gridStep);
				if(this.name)
					context.fillText(this.name, (this.x-1)*gridStep+3, this.y*gridStep-3);
				break;
			case 'u':
				context.lineTo(this.x*gridStep, (this.y+1)*gridStep);
				if(this.name) {
					context.save();
					context.translate(this.x*gridStep-3, (this.y+1)*gridStep-3);
					context.rotate(-Math.PI / 2);
					context.fillText(this.name, 0, 0);
					context.restore();
				}
				break;
			case 'l':
				context.lineTo((this.x+1)*gridStep, this.y*gridStep);
				if(this.name)
					context.fillText(this.name, (this.x+1)*gridStep-this.name.length*7-3, this.y*gridStep-3);
				break;
			case 'd':
				context.lineTo(this.x*gridStep, (this.y-1)*gridStep);
				if(this.name) {
					context.save();
					context.translate(this.x*gridStep-3, (this.y-1)*gridStep+this.name.length*7+3);
					context.rotate(-Math.PI / 2);
					context.fillText(this.name, 0, 0);
					context.restore();
				}
				break;
		}
		context.stroke();
	}
	
	setConnection(connection) {
		if(this._connection != connection) {
			if(this._connection)
				this._connection._pins.splice(this._connection._pins.indexOf(this), 1);
			super.setConnection(connection);
			if(this._connection)
				this._connection._pins.push(this);
		}
	}
	
	destructor() {
		super.destructor();
	}
}