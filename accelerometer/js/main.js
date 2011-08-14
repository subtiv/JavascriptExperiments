var stage;
    
    

function init()
{
	stage = new CACILDS.Stage();

    _stats = new Stats();
    stage.addChild(_stats)
}

window.onload = init;