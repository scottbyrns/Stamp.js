
// Stamp - 1.0.0-SNAPSHOT
(function () {
	var stamp = function (template) {
		var elementTemplate = template.import;
		var templateNode = elementTemplate.getElementsByTagName("template")[0];
		var elementName = templateNode.getAttribute("element");
		var constructor = templateNode.getAttribute("constructor");
		var doesExtend = templateNode.getAttribute("extends");
		var propertiesObject = {
			createdCallback: { value: function() {
				var clone = document.importNode(templateNode.content, true);
				this.createShadowRoot().appendChild(clone);
				if (constructor) {
					try {
						this.addEventListener("DOMCharacterDataModified", window[constructor].bind(this));
						window[constructor].call(this);
					}
					catch (e) {}
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
		document.createElement(elementName);
	};
	var links = document.getElementsByTagName("link");
	for (var i = 0, len = links.length; i < len; i += 1) {
		if (links[i].getAttribute("rel") == "import") {
			stamp(links[i])
		}
	}
}());

