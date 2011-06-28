var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1605069-11']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  var tw = document.createElement('script'); 
  tw.type = 'text/javascript'; 
  tw.src = 'http://platform.twitter.com/widgets.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tw, s);
})();

github = document.createElement('div');
github.innerHTML = '<a href="http://github.com/silviopaganini/JavascriptExperiments"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://d3nwyuy0nl342s.cloudfront.net/img/4c7dc970b89fd04b81c8e221ba88ff99a06c6b61/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub"></a>';
document.body.appendChild(github);

twitter = document.createElement('div');
twitter.id = "twitter_follow";

twitter.style.textAlign = "right";
twitter.style.border	= "none";
twitter.style.overflow	= "hidden";
twitter.style.bottom	= "40px";
twitter.style.position	= "fixed";
twitter.style.right		= "32px";
twitter.style.width		= "150px";
twitter.style.height	= "21px";

twitter.innerHTML = '<a href="http://twitter.com/silviopaganini" class="twitter-follow-button" data-button="grey" data-text-color="#FFFFFF" data-link-color="#00AEFF" data-show-count="false">Follow @silviopaganini</a>';
document.body.appendChild(twitter);
