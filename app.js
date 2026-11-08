(function(){
  var d=document;
  // menu mobilne
  var b=d.querySelector('.burger');
  if(b){b.addEventListener('click',function(){var o=d.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',o?'true':'false');});
    d.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){d.body.classList.remove('menu-open');b.setAttribute('aria-expanded','false');});});}
  // karuzele: palec (natywnie), mysz (przeciaganie), strzalki
  d.querySelectorAll('[data-track]').forEach(function(box){
    var t=box.querySelector('.track'); if(!t) return;
    var step=function(){var c=t.firstElementChild;return c?c.getBoundingClientRect().width+18:300;};
    box.querySelectorAll('[data-dir]').forEach(function(btn){btn.addEventListener('click',function(){t.scrollBy({left:step()*(+btn.dataset.dir),behavior:'smooth'});});});
    var down=false,sx=0,sl=0,moved=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;t.classList.add('drag');}t.scrollLeft=sl-dx;});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;t.classList.remove('drag');});
    t.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
    t.addEventListener('dragstart',function(e){e.preventDefault();});
  });
  // wejscie sekcji
  var rv=d.querySelectorAll('.rv');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});rv.forEach(function(el){io.observe(el);});}
  else rv.forEach(function(el){el.classList.add('in');});
  // formularz pokazowy
  var f=d.querySelector('.form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();f.querySelector('.ok').style.display='block';});}
  // baner zgod
  var ck=d.querySelector('.ck'),k='ed-zgoda';
  var get=function(){try{return localStorage.getItem(k);}catch(e){return null;}};
  if(ck&&!get()){var sh=function(){ck.classList.add('on');window.removeEventListener('scroll',sh);};if(window.scrollY>40)sh();else window.addEventListener('scroll',sh,{passive:true});}
  if(ck){ck.querySelectorAll('button').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem(k,x.dataset.v);}catch(e){}ck.classList.remove('on');});});}
  var y=d.querySelectorAll('[data-rok]');y.forEach(function(el){el.textContent=new Date().getFullYear();});
})();
