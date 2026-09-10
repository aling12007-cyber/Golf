(function(){
  const cover=document.querySelector('#cover .cover-image img');
  if(cover){
    cover.src='assets/cover-fuji.jpg?v=20260910m';
    cover.alt='Golf course with Mount Fuji';
    cover.removeAttribute('data-fallback');
    cover.loading='eager';
    cover.decoding='async';
  }

  const coverLine=document.querySelector('#cover .cover-breath em');
  if(coverLine)coverLine.textContent='Discover Japan Through Golf';

  document.querySelectorAll('a.map').forEach(function(a){a.textContent='Google Maps';});
  document.querySelectorAll('h3').forEach(function(h){if(h.textContent.trim()==='Fuji Classic Country Club')h.textContent='Fuji Classic';});
  document.querySelectorAll('img[alt="Fuji Classic Country Club"]').forEach(function(img){img.alt='Fuji Classic';});

  const aesthetic=document.querySelector('#aesthetic .aesthetic-editorial');
  if(aesthetic){
    const old=aesthetic.querySelector('.aesthetic-stack');
    if(old)old.remove();
    const gallery=document.createElement('div');
    gallery.className='aesthetic-stack';
    const photos=[
      ['Meticulous bunker care','assets/aesthetic-bunker.jpg?v=20260910m'],
      ['Clubhouse dining','assets/aesthetic-meal.jpg?v=20260910m'],
      ['Japanese bath','assets/aesthetic-bath.jpg?v=20260910m'],
      ['Traditional landscape detail','assets/aesthetic-lantern.jpg?v=20260910m']
    ];
    photos.forEach(function(item){
      const fig=document.createElement('figure');
      const img=document.createElement('img');
      img.alt=item[0];
      img.src=item[1];
      img.loading='lazy';
      img.decoding='async';
      fig.appendChild(img);
      gallery.appendChild(fig);
    });
    aesthetic.appendChild(gallery);
  }

  const menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){menu&&menu.classList.remove('open');more&&more.classList.remove('open');}
  if(menuBtn&&moreBtn&&menu&&more){
    menuBtn.addEventListener('click',function(e){e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open');});
    moreBtn.addEventListener('click',function(e){e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open');});
    document.addEventListener('click',close);
    menu.addEventListener('click',close);
    more.addEventListener('click',function(e){e.stopPropagation();});
  }

  const tabs=[].slice.call(document.querySelectorAll('#tabs a'));
  const sections=tabs.map(function(a){return document.querySelector(a.getAttribute('href'));});
  let current=-1,ticking=false;
  function sync(){
    ticking=false;
    let index=0,offset=window.scrollY+window.innerHeight*.25;
    sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i;});
    if(index===current)return;
    current=index;
    tabs.forEach(function(a,i){a.classList.toggle('active',i===index);});
    const active=tabs[index];
    if(active)active.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true;}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  sync();
})();