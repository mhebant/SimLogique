class Manager {
	constructor() {
		var _this = this;
		
		this._circuit = new Circuit();
		this._circuit.newSchematic();
		this._filename = "";
		this._updater = new Timer(function(tickTime) {_this._circuit.update();}, 30);
		this._updater.start();
	}
	
	get filename() { return this._filename; }
	get updater() { return this._updater; }
	get circuit() { return this._circuit; }
	
	saveCircuit(filename) {
		var xmlSaver = new XmlSaver();
		var xml = document.implementation.createDocument(null, "root");
		var node = this._circuit.toXmlNode(xml, xmlSaver);
		xml.getElementsByTagName("root")[0].appendChild(node);
		XmlFile.saveXml(xml, filename);
		this._filename = filename;
	}
	
	loadCircuit() {
		var _this = this;
		XmlFile.loadXml(function(xml, file) {
			_this._filename = file.name;
			_this._circuit = Circuit.fromXmlNode(xml.getElementsByTagName("Schematic")[0], new XmlLoader());
			});
	}
	
	destructor() {
		this._updater.stop();
	}
}

class Editor {
	constructor($element, manager) {
		var _this = this;
		
		this._$editor = $element;
		this._canvas = $element[0].getElementsByTagName("canvas")[0];
		this._context = this._canvas.getContext("2d");
		this._renderer = new Timer(function(tickTime){_this._draw(tickTime);}, 10);
		this._renderer.start();
		this._manager = manager;
		this._interface = new Interface(this, $element);
		this._mouseX = 0;
		this._mouseY = 0;
		this._cursorX = 0;
		this._cursorY = 0;
		this._selection = new Selection();
		this._tool;
		this.setTool("Cursor");
		this._schematic;
		this.setSchematic(this._manager.circuit.schematics[0]);
		this.gridStep = 15;
		this.gridX = 0;
		this.gridY = 0;
		
		/* Events */
		this._mouseDownFunc = function(event){_this._mouseDown(event);};
		this._mouseMoveFunc = function(event){_this._mouseMove(event);};
		this._mouseUpFunc = function(event){_this._mouseUp(event);};
		this._keyDownFunc = function(event){_this._keyDown(event);};
		this._keyUpFunc = function(event){_this._keyUp(event);};
		
		this._$editor.children("canvas").on({mousedown: this._mouseDownFunc, mousemove: this._mouseMoveFunc, mouseup: this._mouseUpFunc});
		$(document).on({keydown: this._keyDownFunc, keyup: this._keyUpFunc});	
	}
	
	get selection() { return this._selection; }
	get mouseX() { return this._mouseX; }
	get mouseY() { return this._mouseY; }
	get cursorX() { return this._cursorX; }
	get cursorY() { return this._cursorY; }
	get schematic() { return this._schematic; }
	get tool() { return this._tool; }
	//In test
	get interface() { return this._interface; }
	get manager() { return this._manager; }
	get renderer() { return this._renderer; }
	
	setTool(toolname) {
		var tool = new Tool[toolname](this);
		if(!(tool instanceof Tool))
			throw new Error("Editor.setTool() need a Tool name in argument");
		
		if(this._tool)
			this._tool.destructor();
		
		this._tool = tool;
		
		this._interface.selectTool(toolname);
	}
	
	setSchematic(schematic) {
		if(!(schematic instanceof Schematic))
			throw new Error("Editor.setSchematic() need a Schematic in argument");
		
		this._schematic = schematic;
	}
	
	destructor() {
		this._$editor.children("canvas").off({mousedown: this._mouseDownFunc, mousemove: this._mouseMoveFunc, mouseup: this._mouseUpFunc});
		$(document).off({keydown: this._keyDownFunc, keyup: this._keyUpFunc});
		
		this._renderer.stop();
		
		this._interface.destructor();
		this._interface = undefined;
		
		this._$editor = undefined;
	}
	
	/*_tick(tickTime) {
		this._schematic.circuit.update();
	}*/
	
	_draw(frameTime) {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
		
		this._context.save();
		this._context.translate(-this.gridX*this.gridStep, -this.gridY*this.gridStep)
		this._schematic.draw(this._context, this.gridStep);
		this._context.beginPath();
		this._context.strokeStyle = "black";
		this._context.moveTo(-this.gridStep, 0);
		this._context.lineTo(this.gridStep, 0);
		this._context.moveTo(0, -this.gridStep);
		this._context.lineTo(0, this.gridStep);
		this._context.stroke();
		this._context.restore();
		
		this._tool.draw(this._context, this.gridStep);
		
		this._context.fillStyle = "rgb(200, 200, 200)";
		this._context.beginPath();
		this._context.arc(this._cursorX*this.gridStep, this._cursorY*this.gridStep, this.gridStep*0.3, 0, Math.PI * 2);
		this._context.fill();
	}
	
	_cursorUpdate(event) {
		this._mouseX = (event.clientX + window.pageXOffset - this._canvas.offsetLeft)/this.gridStep;
		this._mouseY = (event.clientY + window.pageYOffset - this._canvas.offsetTop)/this.gridStep;
		this._cursorX = Math.round(this._mouseX);
		this._cursorY = Math.round(this._mouseY);
	}
	
	_mouseDown(event) {
		this._cursorUpdate(event);
		this._tool.mouseDown(event);
	}
	
	_mouseMove(event) {
		this._cursorUpdate(event);
		this._tool.mouseMove(event);
	}
	
	_mouseUp(event) {
		this._cursorUpdate(event);
		this._tool.mouseUp(event);
	}
	
	_keyDown(event) {
		if(event.keyCode == 27) // Escape
			this.setTool("Cursor");
		this._tool.keyDown(event);
	}
	
	_keyUp(event) {
		this._tool.keyUp(event);
	}

}