(function() {
	
class ToolWire extends Tool {
	constructor(editor) {
		super(editor);
		
		this._startX = undefined;
		this._startY = undefined;
	}
	
	draw(context, gridStep) {
		if(this._startX) {
			context.strokeStyle = "rgba(0, 0, 0, 0.5)";
			context.lineWidth = "2";
		
			context.beginPath();
			context.moveTo(this._startX*gridStep, this._startY*gridStep);
			context.lineTo(this._editor.cursorX*gridStep, this._editor.cursorY*gridStep);
			context.stroke();
		}
	} 
	
	mouseDown(event) {
		if(event.button == 0) {
			if(this._startX != undefined) {
				var start = this._editor.schematic.getConnectorAt(this._startX+this._editor.gridX, this._startY+this._editor.gridY);
				if(!start)
					start = new WireJoint(this._editor.schematic, this._startX+this._editor.gridX, this._startY+this._editor.gridY);
				
				var end = this._editor.schematic.getConnectorAt(this._editor.cursorX+this._editor.gridX, this._editor.cursorY+this._editor.gridY);
				if(!end)
					end = new WireJoint(this._editor.schematic, this._editor.cursorX+this._editor.gridX, this._editor.cursorY+this._editor.gridY);
				
				new Wire(this._editor.schematic, start, end);
			}
			this._startX = this._editor.cursorX;
			this._startY = this._editor.cursorY;
		}
		else if(event.button == 2) {
			this._startX = undefined;
			this._startY = undefined;
		}
	}
	
	mouseMove(event) {
		
	}
	
	mouseUp(event) {

	}
	
	keyDown(event) {
		/*switch(event.keyCode)
		{
			case 27: //Escape
				this._startX = undefined;
				this._startY = undefined;
				break;
		}*/
	}
	
	keyUp(event) {
		
		
	}
	
	destructor() {
		
		super.destructor();
	}
	
	static getLogo() {
		return 'img/wire.png';
	}
}
	
Tool.add("Wire", ToolWire);
	
})();