document.querySelector('.navbar-toggler').addEventListener('click',function(){
	if(document.querySelector('.navbar-collapse.collapse').classList.contains('show')){
		document.querySelector('.navbar-toggler').classList.remove('is-active');
	}else{
		document.querySelector('.navbar-toggler').classList.add('is-active');
	}
});
var didScroll=false;
var lastScrollTop=0;
var nav=document.querySelector("nav");
var navHeight=nav.offsetHeight;
window.addEventListener('scroll',function(){
	var alertbar=document.querySelector(".alertbar");
	if(this.scrollY>280){
		alertbar.style.bottom="0px";
	}else{
		alertbar.style.bottom="-80px";
	}
	didScroll=true;
});
setInterval(function(){
	if(didScroll){
		hasScrolled();
		didScroll=false;
	}
},250); 
function hasScrolled() {
	var st=this.scrollY;
	if(Math.abs(lastScrollTop-st)<=5){
		return;
	}
	if (st>lastScrollTop && st>navHeight){
		nav.style.top=(-nav.offsetHeight+'px');
	}else{
		if(st+window.innerHeight < Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)){
			nav.style.top='0px';
		}
	}
	lastScrollTop = st;
}
document.querySelector('.site-content').style.top='0px';