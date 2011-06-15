/**
 * 
 */

Stage = function()
{
	this.dom = document.getElementsByTagName("body")[0];
	this.jquery = $('body');
};

Stage.prototype.addChild = function(child)
{
	this.jquery.append(child.dom);
};

Stage.prototype.removeChild = function(child)
{
	this.jquery.remove(child.dom);
};

Stage.prototype.addEventListener = function(event, handler)
{
	this.jquery.bind(event, handler);
};

Stage.prototype.removeEventListener = function(event)
{
	this.jquery.unbind(event);
};