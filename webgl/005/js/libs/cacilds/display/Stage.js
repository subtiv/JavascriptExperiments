/**
 * 
 */

Stage = function()
{
	this.dom = document.getElementsByTagName("body")[0];
};

Stage.prototype.addChild = function(child)
{
	this.dom.appendChild(child.dom || child.domElement);
};

Stage.prototype.removeChild = function(child)
{
	this.dom.removeChild(child.dom || child.domElement);
};