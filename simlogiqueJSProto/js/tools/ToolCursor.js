(function() {

class ToolCursor extends Tool {
	constructor(editor) {
		super(editor);
		
		this.startX = undefined;
		this.startY = undefined;
		this.lastX = undefined;
		this.lastY = undefined;
		this.objectUnder = undefined;
	}
	
	draw(context, gridStep) {
		if(this.startX && this.objectUnder == undefined) {
			context.strokeStyle = "rgb(0, 128, 255)";
			context.fillStyle = "rgba(0, 128, 255, 0.5)";
			context.lineWidth = "1";
		
			context.beginPath();
			context.rect((this.startX-this._editor.gridX)*gridStep, (this.startY-this._editor.gridY)*gridStep, (this.lastX-this.startX)*gridStep, (this.lastY-this.startY)*gridStep);
			context.fill();
			context.stroke();
		}
	}
	
	mouseDown(event) {
		this.startX = this._editor.cursorX+this._editor.gridX;
		this.startY = this._editor.cursorY+this._editor.gridY;
		this.lastX = this._editor.cursorX+this._editor.gridX;
		this.lastY = this._editor.cursorY+this._editor.gridY;
		this.objectUnder = this._editor.schematic.getObjectsAt(this._editor.mouseX+this._editor.gridX, this._editor.mouseY+this._editor.gridY)[0];
		
		if(event.button == 0) {
			if(this.objectUnder) {
				if(!this.objectUnder.isSelected() && event.ctrlKey != 1) {
					this._editor.selection.clear();
					this._editor.selection.add(this.objectUnder);
				}
			}
			else
				if(event.ctrlKey != 1)
					this._editor.selection.clear();
		}
	}
	
	mouseMove(event) {
		if(event.buttons & 1) {
			if(this.objectUnder) {
				var objects = this._editor.selection.get();
				var offX = this._editor.cursorX+this._editor.gridX - this.lastX;
				var offY = this._editor.cursorY+this._editor.gridY - this.lastY;
				for(var i = 0; i < objects.length; i++)
					objects[i].move(offX, offY, this.lastX, this.lastY);
			}
		}
		else if(event.buttons & 2) {
			var offX = this._editor.cursorX+this._editor.gridX - this.lastX;
			var offY = this._editor.cursorY+this._editor.gridY - this.lastY;
			this._editor.gridX -= offX;
			this._editor.gridY -= offY;
		}
		
		this.lastX = this._editor.cursorX+this._editor.gridX;
		this.lastY = this._editor.cursorY+this._editor.gridY;
	}
	
	mouseUp(event) {
		if(event.button == 0) {
			if(this._editor.cursorX+this._editor.gridX == this.startX && this._editor.cursorY+this._editor.gridY == this.startY) {
				if(event.ctrlKey == 1 && this.objectUnder) {
					if(this.objectUnder.isSelected()) 
						this._editor.selection.remove(this.objectUnder);
					else
						this._editor.selection.add(this.objectUnder);
				}
			}
			else if(this.objectUnder == undefined) {
				var x;
				var width;
				if(this.startX < this.lastX) {
					x = this.startX;
					width = this.lastX-this.startX;
				}
				else {
					x = this.lastX;
					width = this.startX-this.lastX;
				}
				var y;
				var height;
				if(this.startY < this.lastY) {
					y = this.startY;
					height = this.lastY-this.startY;
				}
				else {
					y = this.lastY;
					height = this.startY-this.lastY;
				}
				var objs = this._editor.schematic.getObjectsAt(x, y, width, height);
				for(var i = 0; i < objs.length; i++) {
					if(event.ctrlKey == 1 && objs[i].isSelected()) 
						this._editor.selection.remove(objs[i]);
					else
						this._editor.selection.add(objs[i]);
				}
			}
		}	
			
		this.startX = undefined;
		this.startY = undefined;
		this.lastX = undefined;
		this.lastY = undefined;
		this.objectUnder = undefined;
	}
	
	keyDown(event) {
		switch(event.keyCode)
		{
			case 27: //Escape
				this._editor.selection.clear();
				break;
			case 46: //Del
				var selection = this._editor.selection.get();
				while(selection.length != 0)
					selection[0].destructor();
				break;
		}
	}
	
	keyUp(event) {
		
		
	}
	
	destructor() {
		
		super.destructor();
	}
	
	static getLogo() {
		return 'img/cursor.png';
	}
}

Tool.add("Cursor", ToolCursor);

})();