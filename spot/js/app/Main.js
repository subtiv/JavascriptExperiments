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
	
	gitHub = new Sprite("github");
	stage.addChild(gitHub);
	gitHub.html('<a href="http://github.com/silviopaganini/JavascriptExperiments"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://d3nwyuy0nl342s.cloudfront.net/img/4c7dc970b89fd04b81c8e221ba88ff99a06c6b61/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub"></a>');
	
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