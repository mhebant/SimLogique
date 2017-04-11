class Object {
	constructor(schematic) {
		this._selection = undefined;
		this._schematic = schematic;
	}
	
	_select(selection) { /* Friend of Selection */
		this._selection = selection;
	}
	
	_deselect(selection) { /* Friend of selection */
		this._selection = undefined;
	}
	
	isSelected() {
		return (this._selection != undefined);
	}
	
	bounding(x, y) {
		
	}
	
	move(offX, offY, lastX, lastY) {
		
	}
	
	draw(context, gridStep) {
		
	}
	
	destructor() {
		if(this._selection)
			this._selection.remove(this);
	}
}