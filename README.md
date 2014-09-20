# Stamp.js Overview

Stamp.js is a shadow dom library to stamp out new elements in a document from imported templates.

##Example

#####index.html
```
<html>
	<head>
		<title>Stamp.js Example</title>
		<link rel="import" id="a-stamp" href="a-stamp.html"></link>
		<script type="text/javascript" src="../Stamp.js"></script>
	</head>
	<body>
		<a-stamp>
			<value>3</value>
			<units>&cent;</units>
		</a-stamp>
	</body>
</html>

```

#####a-stamp.html
```
<template>
	<style>
	div {
		display:inline-block;
		width:200px;
		height:350px;
		border:5px dotted #CACACA;
	}
	h1 {
		line-height:350px;
		text-align:center;
		color:#1F1F1F;
		background-color:#FAFAFA;
		margin-top:0px;
	}
	</style>
	<div>
		<h1>
			<content select="value"></content>
			<content select="units"></content>
		</h1>
	</div>
</template>
```

###Structure

####Imports
To import templates use the link import now available in new browsers.

```

<link rel="import" id="a-strong-header" href="a-strong-header.html"></link>

```

Stamp.js uses the id from the link to attach the template to a stamped out element.

####Templates

Stamp.js uses the new template tag to populate the shadow dom of stamped elements.

Every template must have a <template /> tag for an opening and closing tag.
Simply use the <content /> selector to reference the values that will be mapped to the template.

```
<template>
	<strong>
		<content select="h1"></content>
	</strong>
</template>
```

In this example we select the h1 to populate the template. In this case wrapping it in a <strong /> tag.

To provide this element with its required values we place an <h1 /> tag in our stamped element.

```
<a-strong-header>
	<h1>Strong Header</h1>
</a-strong-header>
```

####Stamp.js

The Stamp.js library is a closure that scans the document for imports and maps new first class html tags to the imported templates.

Stamp.js is designed to run once then end its life cycle.

All imports need to be declared before Stamp.js is included in your document otherwise they will be ignored by Stamp.js.

```
<head>
	<link rel="import" id="a-strong-header" href="a-strong-header.html"></link>
	<script type="text/javascript" src="../Stamp.js"></script>
</head>
```

