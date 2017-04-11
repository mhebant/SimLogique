class Component extends Object {
	
	static add(name, cl) {
		if(Component[name])
			return false;
		else {
			Component[name] = cl;
			return true;
		}
	}
	
	constructor(schematic, x, y, width, height, rot) {
		super(schematic);
		
		this._pins = [];
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		this._rot = rot%4;
		
		this._schematic._components.push(this);
	}
	
	addPin(x, y, side, name) {
		var pin = new Pin(x, y, side, name);
		this._pins.push(pin);
		return pin;
	}
	
	rotate() {
		this._rot++
		if(this._rot == 4)
			this._rot = 0;
		
		var tmp = this._width;
		this._width = this._height;
		this._height = tmp;
		
		for(var i = 0; i < this._pins.length; i++) {
			var pin = this._pins[i];
			var y = this._y + (pin.x - this._x);
			var x = this._x + this._width - (pin.y - this._y);
			pin.x = x;
			pin.y = y;
			switch(pin.side) {
				case 'u':
					pin.side = 'r';
					break;
				case 'r':
					pin.side = 'd';
					break;
				case 'd':
					pin.side = 'l';
					break;
				case 'l':
					pin.side = 'u';
					break;
			}
		}
	}
	
	move(offX, offY, lastX, lastY) {
		this._x += offX;
		this._y += offY;
		
		for(var i = 0; i < this._pins.length; i++) {
			this._pins[i].x += offX;
			this._pins[i].y += offY;
		}
	}
	
	getConnectorAt(x, y) {
		for(var i = 0; i < this._pins.length; i++)
			if(this._pins[i].x == x && this._pins[i].y == y)
				return this._pins[i];
		return undefined;
	}
	
	bounding(x, y, width, height) {
		if(width == undefined)
			return (x >= this._x && x <= this._x+this._width && y >= this._y && y <= this._y+this._height);
		else
			return (this._x >= x && this._x <= x+width && this._y >= y && this._y <= y+height) && (this._x+this._width >= x && this._x+this._width <= x+width && this._y+this._height >= y && this._y+this._height <= y+height);
	}
	
	draw(context, gridStep) {
		var color;
		if(this.isSelected())
			color = "rgb(0, 0, 255)";
		else
			color = "rgb(0, 0, 0)";
		context.strokeStyle = color;
		context.lineWidth = "2";
		
		for(var i = 0; i < this._pins.length; i++)
			this._pins[i].draw(context, gridStep);
		
		context.strokeStyle = color;
	}
	
	update() {
		
	}
	
	destructor() {
		for(var i = 0; i < this._pins.length; i++)
			this._pins[i].destructor();
		
		this._schematic._components.splice(this._schematic._components.indexOf(this), 1);
		
		this._x = undefined; /* DEBUG */
		this._y = undefined; /* DEBUG */
		
		super.destructor();
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = xml.createElement("Component");
		node.setAttribute("id", xmlSaver._getId(this));
		
		for(var i = 0; i < this._pins.length; i++) {
			var pin = xml.createElement("Pin");
			pin.setAttribute("id", xmlSaver._getId(this._pins[i]));
			pin.setAttribute("value", this._pins[i]._value);
			node.appendChild(pin);
		}
		
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		if(Component[node.getAttribute("type")]) {
			var obj = Component[node.getAttribute("type")].fromXmlNode(node, xmlLoader, schematic);
			var pins = node.getElementsByTagName("Pin");
			if(obj._pins.length != pins.length)
				throw new Error("Error loading a Component: Xml pin declaration don't match real pins !");
			for(var i = 0; i < obj._pins.length; i++) {
				xmlLoader._setObj(obj._pins[i], parseInt(pins[i].getAttribute("id")));
				obj._pins[i]._value = (pins[i].getAttribute("value") === "true");
			}
			return obj;
		}
		else
			throw new Error("Error loading a Component: the type doesn't exist !");
	}
}

