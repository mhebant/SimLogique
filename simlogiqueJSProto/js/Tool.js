class Tool {
	
	static add(name, cl) {
		if(Tool[name])
			return false;
		else {
			Tool[name] = cl;
			return true;
		}
	}
	
	constructor(editor) {
		this._editor = editor;
	}
	
	draw(context, gridStep) {
		
	}
	
	mouseDown(event) {
		
	}
	
	mouseMove(event) {
		
	}
	
	mouseUp(event) {
		
	}
	
	keyDown(event) {
		
	}
	
	keyUp(event) {
		
	}
	
	getInterfaceDropdownContent() {
		return undefined;
	}
	
	destructor() {
		
	}
}