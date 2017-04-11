class Connector {
	constructor() {
		this._connection = undefined;
		this._links = [];
	}
	
	_connect(link) { /* Friend of Link */
		this._links.push(link);
		if(this._connection != undefined)
			link.setConnection(this._connection);
	}
	
	_disconnect(link) { /* Friend of Link */
		var i = this._links.indexOf(link);
		this._links.splice(i, 1);
		if(this._links.length == 0)
			this.setConnection(undefined);
	}
	
	isConnected() {
		return this._links.length != 0;
	}
	
	setConnection(connection) {
		if(connection != this._connection) {
			this._connection = connection;
			for(var i = 0; i < this._links.length; i++)
				this._links[i].setConnection(connection);
		}
	}
	
	destructor() {
		while(this._links.length)
			this._links[0].destructor();
	}
}