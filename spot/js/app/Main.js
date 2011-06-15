/**
 * 
 */

var html, stage, container, stage, containerBlocker;

$(document).ready(init);

function init ()
{
	html = document.getElementsByTagName("html")[0];
	stage = new Stage();

	container = new Sprite('container');
	container.align("center");
	container.buttonMode(false);
	stage.addChild(container);

	containerBlocker = new Sprite("containerBlocker");
	stage.addChild(containerBlocker);
	containerBlocker.position("absolute");
	
	$(window).bind("mousemove", windowMouseMove);
	$(window).bind("click", click);
	
	onWindowResize();
	$(window).resize(onWindowResize);
}

function click(event)
{
	if(container) container.removeAllChilds();
	addPoints();
}

function addPoints()
{
	for (var i = 0; i < 600; i++)
	{
		var sprite = new Sprite("sprite" + i);
		container.addChild(sprite);
		
		sprite.alpha("0");
		sprite.html("<p>" + i + "</p>");
		sprite.position("absolute");
		sprite.buttonMode(false);
		sprite.move(Math.random() * $(window).width(), Math.random() * $(window).height());
	}
	
	containerBlocker.html("<img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' width="+ $(window).width()+ " height="+$(window).height()+">");
}

function windowMouseMove(event)
{
	for(var i = 0; i<container.numChildren(); i++)
	{
		child = container.childList[container.getChildAt(i).id];
		
		value = Math.sqrt(Math.pow(event.offsetX - child.x, 2) + Math.pow(event.offsetY - child.y, 2));
		
		child.alpha(1 - ((value) / 100 - .5));
	}
}

function onWindowResize ()
{
	//var width = window.innerWidth, height = window.innerHeight;
	click();
}