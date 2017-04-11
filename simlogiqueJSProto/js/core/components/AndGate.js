// (function() {

class AndGate extends Component {
	constructor(schematic, x, y, rot) {
		super(schematic, x, y, 4, 4, 0);
		
		this._A = this.addPin(this._x-1, this._y+1, 'l', "A");
		this._B = this.addPin(this._x-1, this._y+3, 'l', "B");
		this._S = this.addPin(this._x+5, this._y+2, 'r', "S");

		rot = rot%4;
		while(this._rot != rot)
			this.rotate();
	}
	
	draw(context, gridStep) {
		super.draw(context, gridStep);
		
		context.save();
		switch(this._rot) {
		case 0:
			context.translate(this._x*gridStep, this._y*gridStep);
			break;
		case 1:
			context.translate((this._x+this._width)*gridStep, this._y*gridStep);
			break;
		case 2:
			context.translate((this._x+this._width)*gridStep, (this._y+this._height)*gridStep);
			break;
		case 3:
			context.translate(this._x*gridStep, (this._y+this._height)*gridStep);
			break;
		}
		context.rotate(this._rot*Math.PI/2);
		
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, 4*gridStep);
		context.arc(0, gridStep*5, gridStep*5, 1.5*Math.PI, 1.79*Math.PI);
		context.arc(0, -gridStep, gridStep*5, 0.21*Math.PI, 0.5*Math.PI);
		context.stroke();
		
		context.restore();
	}
	
	update() {
		this._S.value = this._A.value && this._B.value;
	}
	
	destructor() {		
		super.destructor();
	}
	
	/* Save */
	
	toXmlNode(xml, xmlSaver) {
		var node = super.toXmlNode(xml, xmlSaver);

		node.setAttribute("type", "AndGate");
		
		var constructor = xml.createElement("constructor");
		constructor.setAttribute("x", this._x);
		constructor.setAttribute("y", this._y);
		constructor.setAttribute("rot", this._rot);
		node.appendChild(constructor);
		
		return node;
	}
	
	/* Load */
	
	static fromXmlNode(node, xmlLoader, schematic) {
		var constructor = node.getElementsByTagName("constructor")[0];
		var x = parseInt(constructor.getAttribute("x"));
		var y = parseInt(constructor.getAttribute("y"));
		var rot = parseInt(constructor.getAttribute("rot"));
		var obj = new AndGate(schematic, x, y, rot);
		
		xmlLoader._setObj(obj, parseInt(node.getAttribute("id")));
		
		return obj;
	}
	
	static getNew(schematic, x, y) {
		return new AndGate(schematic, x, y, 0);
	}
}

Component.add("AndGate", AndGate);

// })();