class Selection {
	constructor() {
		this._list = []; /* instanceof Object */
	}
	
	get() {
		return this._list;
	}
	
	add(object) {
		if(object.isSelected())
			return;
		this._list.push(object);
		object._select(this);
	}
	
	remove(object) {
		if(!object.isSelected())
			return;
		this._list.splice(this._list.indexOf(object), 1);
		object._deselect(this);
	}
	
	clear() {
		while(this._list.length != 0)
			this.remove(this._list[0]);
	}
	
	destructor() {
		this.clear();
	}
}
