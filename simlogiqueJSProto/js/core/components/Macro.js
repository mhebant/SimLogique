//(function() {

class Macro extends Component {
	constructor(schematic, x, y, width, height, rot, name) {
		super(schematic, x, y, width, height, rot);
		
		this._name = name;
		this._schematic = new Schematic();
		
		//this.bindlPin(this._lcomponent.A, "A", this._x-1, this._y+2, 'l');
		//this.bindlPin(this._lcomponent.S, "S", this._x+5, this._y+2, 'r');
	}
	
	get schematic() {return this._schematic;}
	
	draw(context, gridStep) {
		super.draw(context, gridStep);
		
		context.strokeRect(this._x*gridStep, this._y*gridStep, this._width*gridStep, this._height*gridStep);
		context.font = "10pt monospace";
		context.fillStyle = "black";
		context.fillText(this._name, (this._x+this._width/2)*gridStep-(3.5*this._name.length), (this._y+this._height/2)*gridStep+5);
	}
	
	update() {
		this._schematic.update();
	}
	
	destructor() {
		
		super.destructor();
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = super.toXmlNode(xml, xmlSaver);

		node.setAttribute("type", "Macro");
		
		var constructor = xml.createElement("constructor");
		constructor.setAttribute("x", this._x);
		constructor.setAttribute("y", this._y);
		constructor.setAttribute("width", this._width);
		constructor.setAttribute("height", this._heigth);
		constructor.setAttribute("rot", this._rot);
		constructor.setAttribute("name", this._name);
		node.appendChild(constructor);
		
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		var constructor = node.getElementsByTagName("constructor")[0];
		var x = parseInt(constructor.getAttribute("x"));
		var y = parseInt(constructor.getAttribute("y"));
		var width = parseInt(constructor.getAttribute("width"));
		var height = parseInt(constructor.getAttribute("height"));
		var rot = parseInt(constructor.getAttribute("rot"));
		var name = constructor.getAttribute("name");
		var obj = new NotGate(schematic, x, y, width, height, rot, name);
		
		xmlLoader._setObj(obj, parseInt(node.getAttribute("id")));
		
		return obj;
	}
}

class MacroIO extends Component {
	constructor(schematic, x, y, rot, name) {
		super(schematic, x, y, 0, 0, 0);
		
		this._name = name;
		
		this.bindlPin(new lPin(), "", this._x+1, this._y, 'r');
		
		rot = rot%4;
		while(this._rot != rot)
			this.rotate();
	}
	
	draw(context, gridStep) {
		super.draw(context, gridStep);
		
		context.beginPath();
		context.arc(this._x*gridStep, this._y*gridStep, gridStep/2, Math.PI, -Math.PI);
		context.fillStyle = "white";
		context.fill();
		context.stroke();
		context.font = "10pt monospace";
		context.fillStyle = "black";
		switch(this._rot) {
		case 0:
			context.fillText(this._name, (this._x-0.5)*gridStep-(7*this._name.length)-7, this._y*gridStep+5);
			break;
		case 1:
			context.fillText(this._name, this._x*gridStep-(3.5*this._name.length), (this._y-0.5)*gridStep-5);
			break;
		case 2:
			context.fillText(this._name, (this._x+0.5)*gridStep+5, this._y*gridStep+5);
			break;
		case 3:
			context.fillText(this._name, this._x*gridStep-(3.5*this._name.length), (this._y+0.5)*gridStep+15);
			break;
		}
	}
	
	bounding(x, y, width, height) {
		if(width == undefined)
			return (x >= this._x-0.5 && x <= this._x+0.5 && y >= this._y-0.5 && y <= this._y+0.5);
		else
			return (this._x >= x && this._x <= x+width && this._y >= y && this._y <= y+height);
	}
	
	update() {
		
	}
	
	_destructor() {
		
		super.destructor();
	}
	
	destructor() {
		if(this._selection)
			this._selection.remove(this);
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = super.toXmlNode(xml, xmlSaver);

		node.setAttribute("type", "Macro");
		
		var constructor = xml.createElement("constructor");
		constructor.setAttribute("x", this._x);
		constructor.setAttribute("y", this._y);
		constructor.setAttribute("width", this._width);
		constructor.setAttribute("height", this._heigth);
		constructor.setAttribute("rot", this._rot);
		constructor.setAttribute("name", this._name);
		node.appendChild(constructor);
		
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		var constructor = node.getElementsByTagName("constructor")[0];
		var x = parseInt(constructor.getAttribute("x"));
		var y = parseInt(constructor.getAttribute("y"));
		var width = parseInt(constructor.getAttribute("width"));
		var height = parseInt(constructor.getAttribute("height"));
		var rot = parseInt(constructor.getAttribute("rot"));
		var name = constructor.getAttribute("name");
		var obj = new NotGate(schematic, x, y, width, height, rot, name);
		
		xmlLoader._setObj(obj, parseInt(node.getAttribute("id")));
		
		return obj;
	}
}

class Link {
	constructor(start, end) {
		this._start = start;
		this._end = end;
		this._connection = undefined;
		
		this._start._connect(this);
		this._end._connect(this);
		
		if(this._connection == undefined)
			this.setConnection(new Connection(this._schematic));
	}
	
	setConnection(connection) {
		if(connection != this._connection) {
			var oldConnection = this._connection;
			this._connection = connection;
			this._connection._addWire(this);
			this._start.setConnection(this._connection);
			this._end.setConnection(this._connection);
			if(oldConnection != undefined)
				oldConnection._removeWire(this);
		}
	}
	
	destructor() {
		this._start._disconnect(this);
		this._end._disconnect(this);
		if(this._start.isConnected() && this._end.isConnected())
			this._start.setConnection(new Connection(this._schematic));
		this._connection._removeWire(this);
	}
}

class MacroPin extends Pin {
	constructor(lpin, x, y, side, name) {
		super(lpin, x, y, side, name);
		
		this._macroIO = new MacroIO(macro.schematic, 0, 0, 0, name);
		
		
	}
	
	get name() {return this.name;}
	set name(name) {this.name = name; this._macroIO._name = name;}
	
	destructor() {
		this._macroIO.destructor();
		
		super.destructor();
	}
}

Component.add("Macro", Macro);
//})();