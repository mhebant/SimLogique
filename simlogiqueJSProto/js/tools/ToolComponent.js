(function() {

class ToolComponent extends Tool {
	constructor(editor) {
		super(editor);
		
		this.lastX = this._editor.cursorX+this._editor.gridX;
		this.lastY = this._editor.cursorY+this._editor.gridY;
		this.componentType = undefined;
		
		this._editor.selection.clear();
	}
	
	setComponentType(type) {
		var selection = this._editor.selection.get();
		while(selection.length != 0)
			selection[0].destructor();
		
		this.componentType = type;
		
		var newComponent = Component[this.componentType].getNew(this._editor.schematic, this.lastX, this.lastY);
		this._editor.selection.add(newComponent);
	}
	
	draw(context, gridStep) {
		
	}
	
	mouseDown(event) {
		this.lastX = this._editor.cursorX+this._editor.gridX;
		this.lastY = this._editor.cursorY+this._editor.gridY;
		
		if(event.button == 0) {
			if(this.componentType) {
				this._editor.selection.clear();
				var newComponent = Component[this.componentType].getNew(this._editor.schematic, this.lastX, this.lastY);
				this._editor.selection.add(newComponent);
			}
		}
	}
	
	mouseMove(event) {
		if(event.buttons & 2) {
			var offX = this._editor.cursorX+this._editor.gridX - this.lastX;
			var offY = this._editor.cursorY+this._editor.gridY - this.lastY;
			this._editor.gridX -= offX;
			this._editor.gridY -= offY;
		}
		else if(this.componentType) {
			var objects = this._editor.selection.get();
			var offX = this._editor.cursorX+this._editor.gridX - this.lastX;
			var offY = this._editor.cursorY+this._editor.gridY - this.lastY;
			for(var i = 0; i < objects.length; i++)
				objects[i].move(offX, offY, this.lastX, this.lastY);
		}
		
		
		
		this.lastX = this._editor.cursorX+this._editor.gridX;
		this.lastY = this._editor.cursorY+this._editor.gridY;
	}
	
	mouseUp(event) {
		
	}
	
	keyDown(event) {
		switch(event.keyCode)
		{
			case 82: //R
				this._editor.selection.get()[0].rotate();
				break;
			case 46: //Del
				this.componentType = undefined;
				var selection = this._editor.selection.get();
				while(selection.length != 0)
					selection[0].destructor();
				break;
		}
	}
	
	keyUp(event) {
		
		
	}
	
	getInterfaceDropdownContent() {
		var $dropdownContent = $('<ul class="menu dropdown-content"></ul>');
		for(var componentType in Component) {
			$dropdownContent.append('<li><a href="javascript:void(0);">'+componentType+'</a></li>');
			var _this = this;
			$dropdownContent.children().last().children().first().on('click.slUI', function(event) {_this.setComponentType($(event.target).html());});
		}
		return $dropdownContent;
	}
	
	destructor() {
		var selection = this._editor.selection.get();
		while(selection.length != 0)
			selection[0].destructor();
		
		super.destructor();
	}
	
	static getLogo() {
		return 'img/chip.png';
	}
}

Tool.add("Component", ToolComponent);

})();