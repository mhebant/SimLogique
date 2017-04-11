class Interface {
	constructor(editor, $element) {
		this._editor = editor;
		this._$elements = {};
		this._$elements.editor = $element;
		this._$elements.toolbar = this._$elements.editor.children('.toolbar');
		this._$elements.menu = this._$elements.toolbar.find('.logo>.menu');
		this._$elements.savemenu = this._$elements.menu.children('[data-slUI="savemenu"]');
		this._$elements.simulationmenu = this._$elements.menu.children('[data-slUI="simulationmenu"]');
		this._$elements.setupmenu = this._$elements.menu.children('[data-slUI="setupmenu"]');
		
		var _this = this;
		this._$elements.savemenu.on('mouseenter.slUI', function() {_this._savemenuHover();});
		this._$elements.menu.children('[data-slUI="load"]').on('click.slUI', function() {_this._editor.manager.loadCircuit();});
		this._$elements.simulationmenu.on('mouseenter.slUI', function() {_this._simulationmenuHover();});
		this._$elements.setupmenu.on('mouseenter.slUI', function() {_this._setupmenuHover();});
		
		for(var toolname in Tool) {
			this._$elements.toolbar.append('<li class="dropdown" data-slTool="' + toolname + '"><a href="javascript:void(0);" style="background: url(' + Tool[toolname].getLogo() + ');"></a></li>');
			this._$elements.toolbar.children().last().children().first().on('click.slUI', function(event) {_this._toolButton($(event.target).parent().attr('data-slTool'));});
		}
	}
	
	_savemenuHover() {
		var _this = this;
		this._$elements.savemenu.children('.dropdown-content').remove();
		this._$elements.savemenu.append('<div class="dropdown-content" style="padding: 5px; text-align: center;"><span>Filename:</span><input data-slUI="filename" style="display: inline" type="text" value="'+this._editor.manager.filename+'"/><input data-slUI="save" type="button" value="Save"/></div>')
		this._$elements.savemenu.find('[data-slUI="save"]').on('click.slUI', function() {_this._editor.manager.saveCircuit(_this._$elements.savemenu.find('[data-slUI="filename"]').val());});
	}
	
	_setupmenuHover() {
		var _this = this;
		this._$elements.setupmenu.children('.dropdown-content').remove();
		var $div = $('<div class="dropdown-content" style="padding: 5px; text-align: center;"></div>');
		$div.append('<span>FPS:</span><input data-slUI="fps" style="display: inline" type="number" value="'+this._editor.renderer.tps+'"/>');
		this._$elements.setupmenu.append($div);
		this._$elements.setupmenu.find('[data-slUI="fps"]').on('change.slUI', function() {_this._editor.renderer.tps = $(this).val();});
		
	}
	
	_simulationmenuHover() {
		var _this = this;
		this._$elements.simulationmenu.children('.dropdown-content').remove();
		var $div = $('<div class="dropdown-content" style="padding: 5px; text-align: center;"></div>');
		var $button;
		if(this._editor.manager.updater.isRunning)
			$button = $('<input type="button" value="Stop"/>');
		else
			$button = $('<input type="button" value="Start"/>');
		$div.append($button.on('click.slUI', function() {if(_this._editor.manager.updater.isRunning) {_this._editor.manager.updater.stop(); this.value = "Start";} else {_this._editor.manager.updater.start(); this.value = "Stop";}}));
		$div.append($('<input type="button" value="Step"/>').on('click.slUI', function() {_this._editor.manager.circuit.update();}));
		$div.append('<br><span>TPS:</span>');
		$div.append($('<input style="display: inline" type="number" value="'+this._editor.manager.updater.tps+'"/>').on('change.slUI', function() {_this._editor.manager.updater.tps = $(this).val();}));
		
		this._$elements.simulationmenu.append($div);
	}
	
	_toolButton(toolname) {
		this._editor.setTool(toolname);
	};
	
	_selectedToolHover() {
		var $selectedTool = this._$elements.toolbar.children('.selected');
		$selectedTool.children('.dropdown-content').remove();
		$selectedTool.append(this._editor.tool.getInterfaceDropdownContent());
	};
	
	selectTool(toolname) {
		this._$elements.toolbar.children('.selected').removeClass('selected').off('mouseenter.slUI').children('.dropdown-content').remove();
		var _this = this;
		this._$elements.toolbar.children('[data-slTool="' + toolname + '"]').addClass('selected').on('mouseenter.slUI', function() {_this._selectedToolHover();});
		this._selectedToolHover();
	}
	
	destructor() {
		this._$elements.toolbar.children('li[data-slTool]').remove();
		
		this._$elements.menu.find('[data-slUI]').off('.slUI');
	}
}