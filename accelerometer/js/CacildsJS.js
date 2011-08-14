/*
 * CacildsJS
 * http://github.com/silviopaganini/
 * @silviopaganini | s2paganini.com
 */

var CACILDS=CACILDS||{};CACILDS.Display=function(){this.children=[];this.name="";this.dom={};this.parent={}};
CACILDS.Display.prototype={addChild:function(a){var b=a.dom||a.domElement;this.children.push(a);this.dom.appendChild(b)},removeChild:function(a){var b=a.dom||a.domElement,a=this.children.indexOf(a);a!==-1&&(this.children.splice(a,1),this.dom.removeChild(b))},removeAllChildren:function(){for(;this.children.length>0;)this.removeChild(this.children[0]),this.children.splice(this.children.length-1,0)},getChildByName:function(a){var b,c;for(b=0;b<this.children.length;b++)if(c=this.children[b],c.name===
a)return c},html:function(a){if(a)this.dom.innerHTML=a;else return this.dom.innerHTML},style:function(a){if(a)for(var b in a)this.dom.style[b]=a[b];else return this.dom.style},addEventListener:function(a,b){this.dom.addEventListener(a,b)},removeEventListener:function(a,b){this.dom.removeEventListener(a,b)}};CACILDS.Sprite=function(){CACILDS.Display.call(this);this.dom=document.createElement("div");this.dom.parent=this};CACILDS.Sprite.prototype=new CACILDS.Display;
CACILDS.Sprite.prototype.constructor=CACILDS.Sprite;CACILDS.Stage=function(){CACILDS.Display.call(this);this.dom=document.getElementsByTagName("body")[0];this.dom.parent=this};CACILDS.Stage.prototype=new CACILDS.Display;CACILDS.Stage.prototype.constructor=CACILDS.Stage;
