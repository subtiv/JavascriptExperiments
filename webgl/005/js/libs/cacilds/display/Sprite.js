/**
 * Display Object Sprite (inspired on AS3)
 * 
 * @author silvio paganini | s2paganini.com
 */

Sprite = function(name)
{
	this.childList = [];
	this.name = (name || "sprite" + Math.round(Math.random() * 100)).toString();
	
	this.dom = document.createElement("div");
	this.dom.unselectable = "on";
	this.dom.id = this.name;
	
	// display properties
	this._buttonMode = false;
	this._transform;
	this._perspective;
	this._align;
	this.x = 0;
	this.y = 0;
};

Sprite.prototype.addChild = function(child)
{
	var dom = child.dom || child.domElement;
	this.childList[dom.id.toString()] = child;
	this.dom.appendChild(child.dom || child.domElement);
};

Sprite.prototype.numChildren = function()
{
	return this.dom.childNodes.length;
};

Sprite.prototype.getChildAt = function(index)
{
	return this.dom.childNodes[index];
};

Sprite.prototype.getChildById = function(childId)
{
	return this.childList[childId];
};

Sprite.prototype.removeChild = function(child)
{
	var dom = child.dom || child.domElement;
	this.childList[dom.id] = null;
	delete this.childList[dom.id];
	this.dom.removeChild(dom);
};

Sprite.prototype.removeAllChilds = function()
{
	while(this.dom.childNodes.length > 0)
	{
		this.dom.removeChild(this.dom.childNodes[0]);
	}
	
	this.childList = [];
};

Sprite.prototype.move = function(x, y)
{
	this.dom.style.left = x + "px";
	this.dom.style.top = y + "px";
	
	this.x = x;
	this.y = y;
};

Sprite.prototype.html = function(h)
{
	if(h)
	{
		this.dom.innerHTML = h;
	} else {
		return this.dom.innerHTML;
	}
};

Sprite.prototype.transform = function(transform)
{
	if(transform)
	{
		this._transform = transform;
		container.dom.style.transform = transform;
		container.dom.style.webkitTransform = transform;
		container.dom.style.msTransform = transform;
		container.dom.style.MozTransform = transform;
		container.dom.style.OTransform = transform;
	} else {
		return this._transform;
	}
};

Sprite.prototype.position = function(p)
{
	if(p)
	{
		this.dom.style.position = p;
	} else {
		return this.dom.style.position;
	}
};

Sprite.prototype.alpha = function(value)
{
	if(value)
	{
		this._alpha = value;
		this.dom.style.opacity = value;
	} else {
		return this._alpha; 
	}
};

Sprite.prototype.align = function(value)
{
	if(value)
	{
		this._align = value;
		this.dom.style.textAlign = value;
	} else {
		return this._align;
	}
};

Sprite.prototype.buttonMode = function(value)
{
	if(value)
	{
		this._buttonMode = value;
		this.dom.style.cursor = value ? "pointer" : "none";
	} else {
		return this._buttonMode;
	}
};

/*Sprite.prototype.addEventListener = function(event, handler)
{
	this.jquery.bind(event, handler);
};

Sprite.prototype.removeEventListener = function(event)
{
	this.jquery.unbind(event);
};*/