/*
 * City Object
*/

City = function()
{
	CACILDS.Sprite.call(this);
	this.dom = document.createElement('div');
	this.index;
	this.infoPanel;
	this.marker;
	this.lat;
	this.lng;
	this.id;
	this.dom.parent = this;
	this.active = false;
}

City.prototype = new CACILDS.Sprite();
City.prototype.constructor = City;