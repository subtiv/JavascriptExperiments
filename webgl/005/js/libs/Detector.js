/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 * added sound api 
 * @author silvio paganini / http://s2paganini.com
 */

Detector = {

	canvas : !! window.CanvasRenderingContext2D,
	webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers : !! window.Worker,
	fileapi : window.File && window.FileReader && window.FileList && window.Blob,
	audioAPI : (function () { if ( !window.AudioContext ) { if ( !window.webkitAudioContext ) { return false; } else { window.AudioContext = window.webkitAudioContext; return true ;	} } else { window.webkitAudioContext = window.AudioContext; return true ; }}) (),

	getWebGLErrorMessage : function () {

		var domElement = document.createElement( 'div' );

		domElement.style.fontFamily = 'monospace';
		domElement.style.fontSize = '13px';
		domElement.style.textAlign = 'center';
		domElement.style.background = '#eee';
		domElement.style.color = '#000';
		domElement.style.padding = '1em';
		domElement.style.width = '475px';
		domElement.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			domElement.innerHTML = window.WebGLRenderingContext ? [
				'Sorry, your graphics card doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>'
			].join( '\n' ) : [
				'Sorry, your browser doesn\'t support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a><br/>',
				'Please try with',
				'<a href="http://www.google.com/chrome">Chrome</a>, ',
				'<a href="http://www.mozilla.com/en-US/firefox/new/">Firefox 4</a> or',
				'<a href="http://nightly.webkit.org/">Webkit Nightly (Mac)</a>'
			].join( '\n' );

		}

		return domElement;

	},
	
	getAudioErrorMessage : function () {

		var domElement = document.createElement( 'div' );

		domElement.style.fontFamily = 'monospace';
		domElement.style.fontSize = '13px';
		domElement.style.textAlign = 'center';
		domElement.style.background = '#eee';
		domElement.style.color = '#000';
		domElement.style.padding = '1em';
		domElement.style.width = '475px';
		domElement.style.margin = '5em auto 0';

		if ( ! this.webkitAudioContext ) {

			domElement.innerHTML = [
				'Sorry, your browser doesn\'t support <a href="http://chromium.googlecode.com/svn/trunk/samples/audio/index.html">Web Audio API.</a><br/>',
				'Note: when first running Chrome, the "Web Audio" feature must be enabled by going to about:flags (type "about:flags" in the link field), enabling "Web Audio", and finally clicking the restart button at the bottom of the page.',
				'Please try with',
				'<a href="http://www.google.com/chrome">Chrome</a>, ',
				'<a href="http://nightly.webkit.org/">Webkit Nightly (Mac)</a>'
			].join( '\n' );

		}

		return domElement;

	},

	addGetWebGLMessage : function ( parameters ) {

		var parent, id, domElement;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		domElement = Detector.getWebGLErrorMessage();
		domElement.id = id;

		parent.appendChild( domElement );

	}, 
	
	addGetAudioMessage : function ( parameters ) {

		var parent, id, domElement;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		domElement = Detector.getAudioErrorMessage();
		domElement.id = id;

		parent.appendChild( domElement );

	}

};
