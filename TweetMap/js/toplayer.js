TopLayer = function ()
{
	CACILDS.Display.call(this);
	this.dom = document.createElement('div');
	this.dom.parent = this;

	this.resultsText  		= new CACILDS.Sprite();
	this.input 		  		= new CACILDS.Input();
	this.form 		  		= new CACILDS.Sprite();
	this.tf  		  		= new CACILDS.Sprite();
	this.browseButton 		= new CACILDS.Sprite();
	this.clearButton  		= new CACILDS.Sprite();
	this.autoUpdate   		= new CACILDS.Input("checkbox");
	this.autoUpdateLabel  	= new CACILDS.Sprite();

	this.draw();
}

TopLayer.prototype = new CACILDS.Display();
TopLayer.prototype.constructor = TopLayer;

TopLayer.prototype.draw = function() 
{
	this.style({
		margin : "10px",
	})

	// LABEL

	this.tf.style({
		color : "#FFFFFF"
	})
	this.tf.html("Choose the tag");
	this.addChild(this.tf);

	// FORM

	this.form.style({
		margin: "2px",
		marginTop: "5px"
	});

	// INPUT TEXT

	this.input.style({
		float: "left",
		clear : "left"
	})
	this.input.value('');
	
	this.form.addChild(this.input);

	// SUBMIT BUTTON

	this.browseButton.style({
		marginTop: '1px',
		float : "left"
	});
	this.browseButton.html('<input type="submit" value="Submit" />');
	this.browseButton.addEventListener('click', this.onBrowseClick);

	this.form.addChild(this.browseButton);

	// CLEAR BUTTON

	this.clearButton.style({
		marginTop: '1px',
		float : "left"
	});
	this.clearButton.html('<input type="submit" value="Clear" />');
	this.clearButton.addEventListener('click', this.onClearClick);

	this.form.addChild(this.clearButton);

	// AUTO UPDATE

	this.autoUpdate.style({
		float : "left",
		margin : "5px",
		position : "fixed",
		left : "300px"
	})
	this.autoUpdate.addEventListener('click', this.onAutoUpdateToogle);
	this.form.addChild(this.autoUpdate);

	// AUTO UPDATE LABEL

	this.autoUpdateLabel.html("<p>Auto refresh (15 sec)</p>")
	this.autoUpdateLabel.style({
		color : '#FFFFFF',
		float : "left",
		position : "fixed",
		left : "325px",
		top: "24px"
	})
	this.form.addChild(this.autoUpdateLabel);

	// RESULT

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

TopLayer.prototype.onAutoUpdateToogle = function(e)
{
	var event = document.createEvent("Event");
  	event.initEvent("autoUpdateChange", true, true);
  	event.customData = this.parent.value();
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