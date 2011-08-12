TopLayer = function ()
{
	CACILDS.Display.call(this);
	this.dom = document.createElement('div');
	this.dom.parent = this;

	var resultsText;

	this.draw();

}

TopLayer.prototype = new CACILDS.Display();
TopLayer.prototype.constructor = TopLayer;

TopLayer.prototype.draw = function() 
{
	this.style({
		margin : "10px",
	})

	tf = new CACILDS.Sprite();
	tf.style({
		color : "#FFFFFF"
	})
	tf.html("Choose the tag");
	this.addChild(tf);

	form = new CACILDS.Sprite();
	form.style({
		margin: "2px",
		marginTop: "5px"
	});

	input = new CACILDS.Input();
	input.style({
		float: "left",
		clear : "left"
	})
	input.value('checkin');
	
	form.addChild(input);

	browseButton = new CACILDS.Sprite();
	browseButton.style({
		marginTop: '1px',
		float : "left"
	});
	browseButton.html('<input type="submit" value="Submit" />');
	browseButton.addEventListener('click', this.onBrowseClick);

	form.addChild(browseButton);

	this.resultsText = new CACILDS.Sprite();
	this.resultsText.style({
		float : "left",
		marginLeft : "4px",
		clear : "both",
		color : "#FFFFFF"
	})

	this.addChild(form);

	this.addChild(this.resultsText);
}

TopLayer.prototype.onBrowseClick = function(e)
{
	e.preventDefault();
	var event = document.createEvent("Event");
  	event.initEvent("submitTag", true, true);
  	event.customData = input.value();
  	this.dispatchEvent(event);
}

TopLayer.prototype.updateResults = function(r)
{
	this.resultsText.html("<p>" + r + " tweets found </p>");
}