class Schematic {
	constructor(circuit) {
		this._circuit = circuit;
		this._wireJoints = []; /* instanceof WireJoint. Friend of WireJoint */
		this._wires = []; /* instanceof Wire. Friend of Wire */
		this._components = []; /* instanceof Component. Friend of Component */
	}
	
	get circuit() { return this._circuit; }
	
	getObjectsAt(x, y, width, height) {
		var objs = [];
		for (var i = 0; i < this._wireJoints.length; i++)
			if(this._wireJoints[i].bounding(x, y, width, height))
				objs.push(this._wireJoints[i]);
		for (var i = 0; i < this._wires.length; i++)
			if(this._wires[i].bounding(x, y, width, height))
				objs.push(this._wires[i]);
		for (var i = 0; i < this._components.length; i++)
			if(this._components[i].bounding(x, y, width, height))
				objs.push(this._components[i]);
		return objs;
	}
	
	getConnectorAt(x, y) {
		for (var i = 0; i < this._wireJoints.length; i++)
			if(this._wireJoints[i].bounding(x, y))
				return this._wireJoints[i];
		for (var i = 0; i < this._components.length; i++) {
			var connector = this._components[i].getConnectorAt(x, y);
			if(connector)
				return connector;
		}
	}
	
	draw(context, gridStep) {
		for(var i = this._components.length-1; i>=0; i--)
			this._components[i].draw(context, gridStep);
		for(var i = this._wires.length-1; i>=0; i--)
			this._wires[i].draw(context, gridStep);
		for(var i = this._wireJoints.length-1; i>=0; i--)
			this._wireJoints[i].draw(context, gridStep);
	}
	
	update() {
		for(var i = this._components.length-1; i >= 0; i--)
			this._components[i].update();
	}
	
	destructor() {
		while(this._components.length)
			this._components[0].destructor();
		while(this._wires.length)
			this._wires[0].destructor();
		while(this._wireJoints.length)
			this._wireJoints[0].destructor();
	}
	
	/* XLM save and load */
	
	toXmlNode(xml, xmlSaver) {
		var node = xml.createElement("Schematic");
		node.setAttribute("id", xmlSaver._getId(this));
		
		for (var i = 0; i < this._wireJoints.length; i++)
			node.appendChild(this._wireJoints[i].toXmlNode(xml, xmlSaver));
		for (var i = 0; i < this._components.length; i++)
			node.appendChild(this._components[i].toXmlNode(xml, xmlSaver));
		for (var i = 0; i < this._wires.length; i++)
			node.appendChild(this._wires[i].toXmlNode(xml, xmlSaver));
		
		return node;
	}
	
	static fromXmlNode(node, xmlLoader, circuit) {
		var schematic = new Schematic();
		
		xmlLoader._setObj(this, parseInt(node.getAttribute("id")));
		
		var wireJoints = node.getElementsByTagName("WireJoint");
		for(var i = 0; i < wireJoints.length; i++)
			WireJoint.fromXmlNode(wireJoints[i], xmlLoader, schematic);
		var components = node.getElementsByTagName("Component");
		for(var i = 0; i < components.length; i++)
			Component.fromXmlNode(components[i], xmlLoader, schematic);
		var wires = node.getElementsByTagName("Wire");
		for(var i = 0; i < wires.length; i++)
			Wire.fromXmlNode(wires[i], xmlLoader, schematic);
		
		/*
		for(var i = schematic._connections.length-1; i >= 0; i--)
			schematic._connections[i].lconnection.update();
		*/
		return schematic;
	}
}