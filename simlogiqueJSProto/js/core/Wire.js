class Wire extends Object { /* extends Link */
	constructor(schematic, start, end) {
		super(schematic);
		
		this._start = start; /* inherit from Link */
		this._end = end; /* inherit from Link */
		this._connection = undefined; /* inherit from Link */
		
		this._start._connect(this); /* inherit from Link */
		this._end._connect(this); /* inherit from Link */
		
		if(this._connection == undefined) /* inherit from Link */
			this.setConnection(new Connection(this._schematic.circuit)); /* inherit from Link */
		
		this._schematic._wires.push(this);
	}
	
	setConnection(connection) { /* inherit from Link */
		if(connection != this._connection) {
			var oldConnection = this._connection;
			this._connection = connection;
			this._connection._addLink(this);
			this._start.setConnection(this._connection);
			this._end.setConnection(this._connection);
			if(oldConnection != undefined)
				oldConnection._removeLink(this);
		}
	}
	bounding(pX, pY, width, height) {
		if(width == undefined) {
			var xx = this._start.x - this._end.x;
			var yy = this._start.y - this._end.y;
			var yxyx = (this._end.y * this._start.x) - (this._start.y * this._end.x);
			if(Math.abs(xx) > Math.abs(yy))	
			{
				var y = pX * (yy / xx) + (yxyx / xx);
				if(pX >= Math.min(this._start.x, this._end.x)-0.3 && pX <= Math.max(this._start.x, this._end.x)+0.3 && pY >= y-0.3 && pY <= y+0.3)
					return true;
			}
			else
			{
				var x = pY * (xx / yy) - (yxyx / yy);
				if(pY >= Math.min(this._start.y, this._end.y)-0.3 && pY <= Math.max(this._start.y, this._end.y)+0.3 && pX >= x-0.3 && pX <= x+0.3)
					return true;
			}
			return false;
		}
		else
			return (this._start.x >= pX && this._start.x <= pX+width && this._start.y >= pY && this._start.y <= pY+height) && (this._end.x >= pX && this._end.x <= pX+width && this._end.y >= pY && this._end.y <= pY+height);
	}
	
	move(offX, offY, lastX, lastY) {

	}
	
	draw(context, gridStep) {
		var color;
		if(this.isSelected())
			color = "rgb(0, 0, 255)";
		else if(this._connection.value)
			color = "rgb(255, 0, 0)";
		else
			color = "rgb(0, 0, 0)";
		context.strokeStyle = color;
		context.lineWidth = "2";
		
		context.beginPath();
		context.moveTo(this._start.x*gridStep, this._start.y*gridStep);
		context.lineTo(this._end.x*gridStep, this._end.y*gridStep);
		context.stroke();
	}
	
	destructor() {
		this._start._disconnect(this); /* inherit from Link */
		this._end._disconnect(this); /* inherit from Link */
		if(this._start.isConnected() && this._end.isConnected()) /* inherit from Link */
			this._start.setConnection(new Connection(this._schematic.circuit)); /* inherit from Link */
		this._connection._removeLink(this); /* inherit from Link */
		
		this._schematic._wires.splice(this._schematic._wires.indexOf(this), 1);
		
		super.destructor();
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = xml.createElement("Wire");
		node.setAttribute("id", xmlSaver._getId(this));
		
		var constructor = xml.createElement("constructor");
		constructor.setAttribute("start", xmlSaver._getId(this._start));
		constructor.setAttribute("end", xmlSaver._getId(this._end));
		node.appendChild(constructor);
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		var constructor = node.getElementsByTagName("constructor")[0];
		var start = xmlLoader._getObj(parseInt(constructor.getAttribute("start")));
		var end = xmlLoader._getObj(parseInt(constructor.getAttribute("end")));
		var obj = new Wire(schematic, start, end);
		
		xmlLoader._setObj(obj, parseInt(node.getAttribute("id")));
		
		return obj;
	}
}