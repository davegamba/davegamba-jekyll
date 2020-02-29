---
layout: null
---

document.getElementById('lunrsearchresults').addEventListener('click',function(e){
	document.getElementById('lunrsearchresults').style.display="none";
});
document.getElementById('search-button').addEventListener('click',function(e){
	e.preventDefault();
	var term = document.getElementById('lunrsearch').value;
	if(term){
		return postSearch(term);
	}else{
		return false;
	}
});
{% assign counter = 0 %}
var documents = [{% for page in site.posts %}{"id":{{ counter }},"url":"{{ page.url | absolute_url }}","title":"{{ page.title }}","date":"{{ page.date | date: site.date_format }}","body":"{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' | truncate: 160, "..." }}"} {% unless forloop.last %},{% endunless %}{% assign counter = counter | plus: 1 %}{% endfor %}];
var idx = lunr(function(){
	this.ref('id');
	this.field('title');
	this.field('body');
	documents.forEach(function(doc){this.add(doc)},this);
});
function postSearch(term){
	document.getElementById('lunrsearchresults').style.display="block";
	document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="resultsmodal"><div class="modal-dialog shadow-lg" role="document"><div class="modal-content"><div class="modal-header" id="modtit"><button type="button" class="close search-close" data-dismiss="modal" aria-label="Chiudi"> &times; </button></div><div class="modal-body"><ul class="mb-0"></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary btn-sm search-close" data-dismiss="modal">Chiudi</button></div></div></div></div>';
	if(term){
		document.getElementById('modtit').innerHTML='<h5 class="modal-title"><i class="fa fa-search"></i> '+term+'</h5>'+document.getElementById('modtit').innerHTML;
		var results = idx.search(term);
		if(results.length>0){
			for (var i = 0; i < results.length; i++) {
				var ref = results[i]['ref'];
				var url = documents[ref]['url'];
				document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML +'<li class="lunrsearchresult"><a href="'+url+'"><span class="title">'+documents[ref]['title']+'</span><br /><small><span class="date"><i class="fa fa-clock"></i> '+documents[ref]['date']+'</span><br /><span class="body">'+documents[ref]['body']+'</span><br /><span class="url">'+url+'</span></small></a></li>';
			}
		}else{
			document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = '<li class="lunrsearchresult">Nessun risultato trovato. Prova una ricerca differente!</li>';
		}
	}
	return false;
}