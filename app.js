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
  // lightbox: caly kadr, strzalki, gest, Esc
  var groups=[];
  d.querySelectorAll('.track.gal, .stick, .track:not(.gal), .ofl').forEach(function(g){var im=[].slice.call(g.querySelectorAll('img[data-full]'));if(im.length)groups.push(im);});
  if(groups.length){
    var lb=d.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Powiększone zdjęcie');
    lb.innerHTML='<img alt=""><button class="x" aria-label="Zamknij">&times;</button><button class="pv" aria-label="Poprzednie">&#8249;</button><button class="nx" aria-label="Następne">&#8250;</button><div class="lbc"></div>';
    d.body.appendChild(lb);
    var li=lb.querySelector('img'),cap=lb.querySelector('.lbc'),cur=null,ix=0,tm=0,last=null;
    var pre=function(i){var e=cur[i];if(e){var x=new Image();x.src=e.dataset.full;}};
    var show=function(i){ix=(i+cur.length)%cur.length;var e=cur[ix];li.src=e.currentSrc||e.src;li.alt=e.alt;cap.textContent=e.alt+(cur.length>1?'  ('+(ix+1)+'/'+cur.length+')':'');
      clearTimeout(tm);tm=setTimeout(function(){var f=new Image();f.onload=function(){if(cur[ix]===e)li.src=e.dataset.full;};f.src=e.dataset.full;},180);
      lb.querySelector('.pv').style.display=lb.querySelector('.nx').style.display=cur.length>1?'':'none';
      (window.requestIdleCallback||setTimeout)(function(){pre(ix+1);});};
    var open=function(g,i){cur=g;last=d.activeElement;lb.classList.add('on');d.documentElement.style.overflow='hidden';show(i);lb.querySelector('.x').focus();};
    var close=function(){lb.classList.remove('on');d.documentElement.style.overflow='';li.removeAttribute('src');if(last)last.focus();};
    groups.forEach(function(g){g.forEach(function(e,i){e.tabIndex=0;e.setAttribute('role','button');e.addEventListener('click',function(){open(g,i);});e.addEventListener('keydown',function(k){if(k.key==='Enter'||k.key===' '){k.preventDefault();open(g,i);}});});});
    lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){show(ix-1);};lb.querySelector('.nx').onclick=function(){show(ix+1);};
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(ix-1);else if(e.key==='ArrowRight')show(ix+1);});
    var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
    lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(ix+(dx<0?1:-1));},{passive:true});
  }
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
