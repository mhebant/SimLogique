class Connection {
	constructor(circuit) {
		this._circuit = circuit;
		this._links = [];
		this._pins = []; /* Friend of lPin */
		this._value = false;
		this._circuit._connections.push(this);
	}
	
	update() {
		this._value = false;
		for(var i = 0; i < this._pins.length; i++)
			if(this._pins[i]._value) {
				this._value = true;
				break;
			}
	}
	
	get value() {
		return this._value;
	}
	
	_addLink(link) { /* Friend of Link */
		this._links.push(link);
	}
	
	_removeLink(link) { /* Friend of Link */
		var i = this._links.indexOf(link);
		this._links.splice(i, 1);
		if(this._links.length == 0)
			this._destructor();
	}
	
	_destructor() {
		this._circuit._connections.splice(this._circuit._connections.indexOf(this), 1);
		
		/* DEBUG */
		if(this._pins.length) throw new Error("Connection destructor called and still connected ! (Should not append ^^)");
		while(this._pins.length)
			this._pins[0].setConnection(undefined);
		this._pins = undefined;
	}
	// No destructor, they are "self destructed" when all link are removed because it's remove any refrence to them
}