(function(){
 window.PHOTO_DATA=window.PHOTO_DATA||{};
 if(window.PHOTO_DATA['traditional-bunker']&&!window.PHOTO_DATA['aesthetic-bunker'])window.PHOTO_DATA['aesthetic-bunker']=window.PHOTO_DATA['traditional-bunker'];
 if(window.PHOTO_DATA['clubhouse-meal']&&!window.PHOTO_DATA['aesthetic-meal'])window.PHOTO_DATA['aesthetic-meal']=window.PHOTO_DATA['clubhouse-meal'];
 if(window.PHOTO_DATA['onsen']&&!window.PHOTO_DATA['aesthetic-bath'])window.PHOTO_DATA['aesthetic-bath']=window.PHOTO_DATA['onsen'];
 if(window.PHOTO_DATA['stone-lantern']&&!window.PHOTO_DATA['aesthetic-lantern'])window.PHOTO_DATA['aesthetic-lantern']=window.PHOTO_DATA['stone-lantern'];
 document.querySelectorAll('[data-photo]').forEach(function(el){var k=el.getAttribute('data-photo');if(window.PHOTO_DATA&&window.PHOTO_DATA[k])el.src=window.PHOTO_DATA[k]});
 var menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
 function close(){menu.classList.remove('open');more.classList.remove('open')}
 menuBtn.addEventListener('click',function(e){e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open')});
 moreBtn.addEventListener('click',function(e){e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open')});
 document.addEventListener('click',close);menu.addEventListener('click',close);more.addEventListener('click',function(e){e.stopPropagation()});
 var tabs=[].slice.call(document.querySelectorAll('#tabs a')), sections=tabs.map(function(a){return document.querySelector(a.getAttribute('href'))}), current=-1, ticking=false;
 function sync(){ticking=false;var offset=window.scrollY+window.innerHeight*.24,index=0;sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i});if(index===current)return;current=index;tabs.forEach(function(a,i){a.classList.toggle('active',i===index)});var t=tabs[index];if(t)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}
 function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true}}
 window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);sync();
})();