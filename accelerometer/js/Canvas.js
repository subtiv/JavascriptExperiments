/*
 * Canvas
 *
 */

function Canvas()
{
	this.dom;
	this.initialize();
	this.context;
}

Canvas.prototype.initialize = function()
{
	this.dom = document.createElement("canvas");
	this.dom.id = "app";
	this.dom.style.position = 'fixed';
	
	this.context = this.dom.getContext("2d");
};

Canvas.prototype.update = function(_x, _y)
{
	this.dom.width = _x;
	this.dom.height = _y;
};