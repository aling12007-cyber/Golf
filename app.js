(function(){
  document.querySelectorAll('[data-photo]').forEach(function(el){var k=el.getAttribute('data-photo');if(window.PHOTO_DATA&&window.PHOTO_DATA[k])el.src=window.PHOTO_DATA[k]});
  var menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){menu.classList.remove('open');more.classList.remove('open')}
  menuBtn.addEventListener('click',function(e){e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open')});
  moreBtn.addEventListener('click',function(e){e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open')});
  document.addEventListener('click',close);menu.addEventListener('click',close);more.addEventListener('click',function(e){e.stopPropagation()});
  var tabs=[].slice.call(document.querySelectorAll('#tabs a'));var sections=tabs.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function setActive(){var offset=window.scrollY+230,index=0;sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i});tabs.forEach(function(a,i){a.classList.toggle('active',i===index)});var t=tabs[index];if(t)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}
  window.addEventListener('scroll',setActive,{passive:true});setActive();
})();