TopLayer = function ()
{
	CACILDS.Display.call(this);
	this.dom = document.createElement('div');
	this.dom.parent = this;

	this.resultsText  = new CACILDS.Sprite();
	this.input 		  = new CACILDS.Input();
	this.form 		  = new CACILDS.Sprite();
	this.tf  		  = new CACILDS.Sprite();
	this.browseButton = new CACILDS.Sprite();
	this.clearButton  = new CACILDS.Sprite();

	this.draw();
}

TopLayer.prototype = new CACILDS.Display();
TopLayer.prototype.constructor = TopLayer;

TopLayer.prototype.draw = function() 
{
	this.style({
		margin : "10px",
	})

	this.tf.style({
		color : "#FFFFFF"
	})
	this.tf.html("Choose the tag");
	this.addChild(this.tf);

	this.form.style({
		margin: "2px",
		marginTop: "5px"
	});

	this.input.style({
		float: "left",
		clear : "left"
	})
	this.input.value('VaiCorinthians');
	
	this.form.addChild(this.input);

	this.browseButton.style({
		marginTop: '1px',
		float : "left"
	});
	this.browseButton.html('<input type="submit" value="Submit" />');
	this.browseButton.addEventListener('click', this.onBrowseClick);

	this.form.addChild(this.browseButton);


	this.clearButton.style({
		marginTop: '1px',
		float : "left"
	});
	this.clearButton.html('<input type="submit" value="Clear" />');
	this.clearButton.addEventListener('click', this.onClearClick);

	this.form.addChild(this.clearButton);

	this.resultsText.style({
		float : "left",
		marginLeft : "4px",
		clear : "both",
		color : "#FFFFFF"
	})

	this.addChild(this.form);

	this.addChild(this.resultsText);
}

TopLayer.prototype.onBrowseClick = function(e)
{
	e.preventDefault();

	var event = document.createEvent("Event");
  	event.initEvent("submitTag", true, true);
  	event.customData = topSearch.getInputValue();
  	this.dispatchEvent(event);
}

TopLayer.prototype.onClearClick = function(e)
{
	e.preventDefault();

	topSearch.clear();
	topSearch.updateInput("");

	var event = document.createEvent("Event");
  	event.initEvent("clear", true, true);
  	this.dispatchEvent(event);
}

TopLayer.prototype.getInputValue = function()
{
	return this.input.value();
}

TopLayer.prototype.updateResults = function(totalTweets, geoTweets)
{
	this.resultsText.html("<p>" + totalTweets + " tweets found / " + geoTweets + " tweets geo located </p>");
}

TopLayer.prototype.clear = function()
{
	this.resultsText.html("<p></p>");
}

TopLayer.prototype.updateInput = function(p)
{
	this.input.value(p);
}