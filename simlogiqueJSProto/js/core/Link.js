class Link {
	constructor(circuit, start, end) {
		this._circuit = circuit;
		this._start = start;
		this._end = end;
		this._connection = undefined;
		
		this._start._connect(this);
		this._end._connect(this);
		
		if(this._connection == undefined)
			this.setConnection(new Connection(this._circuit));
	}
	
	setConnection(connection) {
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
	
	destructor() {
		this._start._disconnect(this);
		this._end._disconnect(this);
		if(this._start.isConnected() && this._end.isConnected())
			this._start.setConnection(new Connection(this._circuit));
		this._connection._removeLink(this);
	}
}