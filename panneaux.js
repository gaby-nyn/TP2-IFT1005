// fonctions qui sont  visibles  de l'exterieur
var goFullscreen;
var goUp;
var goDown;
var goSpin;

/** On fait une grosse fonction pour cacher nos  fonctions et variables  **/
(function()  {
	'use strict'; // un peu plus de surveillance de notre code....
	
	var tailleY;

	// retourne le # de la diapo visible... Utilise tailleY, la  taille d'un  panneau
	function panneauActuel() {
		console.log(window.scrollY+":"+tailleY+">"+ window.scrollY/tailleY);
		return window.scrollY/tailleY;
	}
	goFullscreen=function()  {
		if(document.fullscreenElement) document.exitFullscreen();
		else document.documentElement.requestFullscreen();
	}
	goUp=function()  {
		stopSpin();
		let d=panneauActuel();
		let y=Math.floor(d-1)*tailleY;
		window.scrollTo({top:y,left:0,behavior:'smooth'});
	}
	goDown=function()  {
		stopSpin();
		let d=panneauActuel();
		let y=Math.floor(d+1)*tailleY;
		window.scrollTo({top:y,left:0,behavior:'smooth'});
	}
	//  auto scroll
	var spinner=null;  // pas de autoscroll
	function spin()  {
		let nb=document.getElementsByTagName("section").length;
		let d=panneauActuel()+1;
		console.log("Prochain  panneau",d);
		if( d>=nb ) d=0;
		let y=Math.floor(d)*tailleY;
		window.scrollTo({top:y,left:0,behavior:'smooth'});
	}
	function  stopSpin() {
		if( spinner!=null ) {
			clearInterval(spinner);
			spinner=null;
		}
	}
	goSpin=function() {
		document.getElementById("goAS").classList.toggle('rotating');
		document.getElementsByTagName("body")[0].classList.toggle('noscrollY');
		if( spinner==null ) {
			// pour  enlever  le  scrollbar quand on tourne auto
			spinner=setInterval(spin,5000);
		}else{
			clearInterval(spinner);
			spinner=null;
		}
	}


	function init()  {
		// ajuste la variable tailleY 
		window.addEventListener('resize',
			function()  {
				let  e=document.getElementsByTagName("section");
				if( e.length>0 ) {
					tailleY=e[0].getBoundingClientRect().height;
					//console.log("taille ",tailleY);
				}
			});
		//window.addEventListener('onscroll',function() { });
		window.dispatchEvent(new Event("resize"));
	}

	// Executer seulement quand le document est lu au complet!
	if (document.readyState === "loading") {
		// Le document charge encore... on  va attendre
		document.addEventListener("DOMContentLoaded", init);
	}else{ init(); } // `DOMContentLoaded` a deja ete fait.  On init tout de suite.

})();










