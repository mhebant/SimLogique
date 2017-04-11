class Circuit {
	constructor() {
		this._schematics = []; /* instanceof Schematic. */
		
		this._connections = []; /* instanceof Connection. Friend of Connection */
	}
	
	get schematics() { return this._schematics; }
	
	newSchematic() {
		var schematic = new Schematic(this);
		this._schematics.push(schematic);
		return schematic;
	}
	
	deleteSchematic(schematic) {
		var i = this._schematics.indexOf(schematic);
		if(i < 0)
			throw new Error("Try to delete a schematic that doesn't beyong to thi circuit");
		schematic.destructor();
		this._schematics.splice(i, 1);
	}
	
	update() {
		for(var i = this._schematics.length-1; i >= 0; i--)
			this._schematics[i].update();
		for(var i = this._connections.length-1; i >= 0; i--)
			this._connections[i].update();
	}
	
	destructor() {
		while(this._schematics.length)
			this.deleteSchematic(this._schematics[0]);
	}
	
	/* XLM save and load */
	
	toXmlNode(xml, xmlSaver) {
		var node = xml.createElement("Circuit");
		node.setAttribute("id", xmlSaver._getId(this));
		
		for (var i = 0; i < this._schematics.length; i++)
			node.appendChild(this._schematics[i].toXmlNode(xml, xmlSaver));
		
		return node;
	}
	
	static fromXmlNode(node, xmlLoader, circuit) {
		var circuit = new Circuit();
		
		xmlLoader._setObj(this, parseInt(node.getAttribute("id")));
		
		var schematics = node.getElementsByTagName("Schematic");
		for(var i = 0; i < schematic.length; i++)
			this._schematics.push(Schematic.fromXmlNode(schematic[i], xmlLoader, circuit));
		
		for(var i = this._connections.length-1; i >= 0; i--)
			this._connections[i].update();
		
		return circuit;
	}
}