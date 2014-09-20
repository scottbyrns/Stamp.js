
// Stamp - 1.0.0-SNAPSHOT
(function () {
	var stamp = function (elementName, template) {
		var elementTemplate = template.import;
		var proto = Object.create(HTMLElement.prototype, {
			createdCallback: { value: function() {
				var clone = document.importNode(elementTemplate.getElementsByTagName("template")[0].content, true);
				this.createShadowRoot().appendChild(clone);
			}}
		});
		document.registerElement(elementName, {prototype: proto});
		document.createElement(elementName);
	};
	var links = document.getElementsByTagName("link");
	for (var i = 0, len = links.length; i < len; i += 1) {
		if (links[i].getAttribute("rel") == "import") {
			stamp(links[i].getAttribute("id"), links[i])
		}
	}
}());
