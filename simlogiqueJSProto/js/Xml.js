class XmlFile {
	//http://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	static saveXml(xml, filename) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(xml)));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
	
	static loadXml(callback) {
		var htmlfile = document.createElement("input");
		htmlfile.setAttribute("type", "file");
		htmlfile.style.display = 'none';
		var _this = this;
		$(htmlfile).change(function(event) {
			var file = event.target.files[0]; 
			if (file) {
				var reader = new FileReader();
				reader.onload = function(event) {
					var xml = new DOMParser().parseFromString(event.target.result, "text/xml");
					callback(xml, file);
				};
				reader.readAsText(file);
			}
			else {
				alert("Failed to load file");
			}
			document.body.removeChild(htmlfile);
		});
		document.body.appendChild(htmlfile);
		htmlfile.click();
	}
	
}

class XmlSaver {
	constructor() {
		this._objs = [];
	}
	
	_getId(obj) {
		var index = this._objs.indexOf(obj);
		if(index < 0) {
			this._objs.push(obj);
			return this._objs.length-1;
		}
		else 
			return index;
	}
}

class XmlLoader {
	constructor() {
		this._objs = [];
	}
	
	_setObj(obj, id) {
		this._objs[id] = obj;
	}
	
	_getObj(id) {
		return this._objs[id];
	}
}