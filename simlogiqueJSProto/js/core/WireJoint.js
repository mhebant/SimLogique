class WireJoint extends Object { /* extends Connector */
	constructor(schematic, x, y) {
		super(schematic);
		
		this._connection = undefined; /* inherit from Connector */
		this._wires = []; /* inherit from Connector */
		
		this.x = x;
		this.y = y;
		
		this._schematic._wireJoints.push(this);
	}
	
	bounding(x, y, width, height) {
		if(width == undefined)
			return (x >= this.x-0.3 && x <= this.x+0.3 && y >= this.y-0.3 && y <= this.y+0.3);
		else
			return (this.x >= x && this.x <= x+width && this.y >= y && this.y <= y+height);
	}
	
	draw(context, gridStep) {
		var color;
		if(this.isSelected())
			color = "rgb(0, 0, 255)";
		else
			color = "rgb(0, 0, 0)";
		context.fillStyle = color;
		context.beginPath();
		context.arc(this.x*gridStep, this.y*gridStep, gridStep/3, 0, Math.PI * 2);
		context.fill();
	}
	
	move(offX, offY, lastX, lastY) {
		this.x += offX;
		this.y += offY;
	}
	
	_connect(wire) { /* inherit from Connector */ /* Friend of Wire */
		this._wires.push(wire);
		if(this._connection != undefined)
			wire.setConnection(this._connection);
	}
	
	_disconnect(wire) { /* inherit from Connector */ /* Friend of Wire */
		var i = this._wires.indexOf(wire);
		this._wires.splice(i, 1);
		if(this._wires.length == 0)
			this.setConnection(undefined);
	}
	
	isConnected() { /* inherit from Connector */
		return this._wires.length != 0;
	}
	
	setConnection(connection) { /* inherit from Connector */
		if(connection != this._connection) {
			this._connection = connection;
			for(var i = 0; i < this._wires.length; i++)
				this._wires[i].setConnection(connection);
		}
	}
	
	destructor() { 
		/* inherit from Connector */
		while(this._wires.length)
			this._wires[0].destructor();
		
		this._schematic._wireJoints.splice(this._schematic._wireJoints.indexOf(this), 1);
		
		super.destructor();
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = xml.createElement("WireJoint");
		node.setAttribute("id", xmlSaver._getId(this));
		
		var constructor = xml.createElement("constructor");
		constructor.setAttribute("x", this.x);
		constructor.setAttribute("y", this.y);
		node.appendChild(constructor);
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		var constructor = node.getElementsByTagName("constructor")[0];
		var x = parseInt(constructor.getAttribute("x"));
		var y = parseInt(constructor.getAttribute("y"));
		var obj = new WireJoint(schematic, x, y);
		
		xmlLoader._setObj(obj, parseInt(node.getAttribute("id")));
		
		return obj;
	}
}