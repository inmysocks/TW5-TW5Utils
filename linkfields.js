/*\
title: $:/plugins/inymsocks/TW5Utils/linkfields.js
type: application/javascript
module-type: widget

Set the value of a field in a specified tiddler to be equal to the value of a source field in a source tiddler

<$link-fields sourcetiddler=sourceTiddler sourcefield=source_field storetiddler=storeTiddler storefield=store_field/>

This is a modified version of the storecount widget from the MathyThing plugin, which is a modified version of the count widget in TiddlyWiki5

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var LinkFieldsWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
LinkFieldsWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
LinkFieldsWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
LinkFieldsWidget.prototype.execute = function() {
	this.sourceTiddler = this.getAttribute("sourcetiddler",this.getVariable("currentTiddler"));
	this.sourceField = this.getAttribute("sourcefield");
	this.storeTiddler = this.getAttribute("storetiddler");
	this.storeField = this.getAttribute("storefield");
	this.storeIndex = this.getAttribute("storeindex");
	
	// Execute the filter
	var sourceTiddler = this.wiki.getTiddler(this.sourceTiddler);
	var storeTiddler = this.wiki.getTiddler(this.storeTiddler);
	var oldvalue = storeTiddler.getFieldString(this.storeField);
	var newvalue = sourceTiddler.getFieldString(this.sourceField);

	if ( oldvalue === newvalue ) {
	} else {
		this.wiki.setText(this.storeTiddler,this.storeField,this.storeIndex,newvalue);
	}
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
LinkFieldsWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["sourcetiddler"] || changedAttributes["sourcefield"] || changedAttributes["storeindex"] || changedAttributes["storetiddler"] || changedAttributes["storefield"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports["link-fields"] = LinkFieldsWidget;

})();