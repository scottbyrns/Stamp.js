!function(){for(var t=function(t,e){var n=e.import,o=Object.create(HTMLElement.prototype,{createdCallback:{value:function(){var t=document.importNode(n.getElementsByTagName("template")[0].content,!0);this.createShadowRoot().appendChild(t);var e=n.getElementsByTagName("template")[0].getAttribute("constructor");e&&window[e].call(this)}}});document.registerElement(t,{prototype:o}),document.createElement(t)},e=document.getElementsByTagName("link"),n=0,o=e.length;o>n;n+=1)"import"==e[n].getAttribute("rel")&&t(e[n].getAttribute("id"),e[n])}()