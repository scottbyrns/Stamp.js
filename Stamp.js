(function () {
	var firstClassElements = {};
	var stamp = function (template) {
		var elementTemplate = template.import;
		if (null == elementTemplate) {
			console.warn("Bad template include.", template);
			return;
		}
		var templateNode = elementTemplate.getElementsByTagName("template")[0];
		var constructor = templateNode.getAttribute("constructor");
		var stampElement = function (event) {
			if (firstClassElements[event.detail.name]) {
				return;
			}
			var objectReference = event.detail;
			firstClassElements[objectReference.name] = objectReference;
		};
		document.addEventListener("register-stamp", stampElement, false);
		var elementName = templateNode.getAttribute("element");
		var doesExtend = templateNode.getAttribute("extends");
		var propertiesObject = {
			createdCallback: { value: function() {
				var clone = document.importNode(templateNode.content, true);
				this.createShadowRoot().appendChild(clone);
				var objectReference = firstClassElements[constructor];
				if (objectReference && objectReference.scope.prototype) {
					for (var property in objectReference.scope.prototype) {
						console.log(property);
						if (objectReference.scope.prototype.hasOwnProperty(property)) {
							this.__proto__[property] = objectReference.scope.prototype[property];
						}
					}
				}
					console.log(this);
				
				if (objectReference && objectReference.scope) {
					objectReference.scope.call(this);
					this.addEventListener("DOMCharacterDataModified", firstClassElements[constructor].scope.bind(this));
				}
			}}
		};
		var proto = Object.create(HTMLElement.prototype, propertiesObject);
		var registrationForm = {
			prototype: proto
		};
		if (doesExtend != null) {
			registrationForm.extends = doesExtend;
		}
		document.registerElement(elementName, registrationForm);
	};
	var links = document.getElementsByTagName("link");
	for (var i = 0, len = links.length; i < len; i += 1) {
		if (links[i].getAttribute("rel") == "import") {
			stamp(links[i])
		}
	}
}());