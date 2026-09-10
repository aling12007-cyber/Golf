(function(){
  window.PHOTO_DATA=window.PHOTO_DATA||{};

  const PROVIDED_ALIAS={
    niseko:'niseko',abrand:'abrand',kawana:'kawana',daifuji:'daifuji','fuji-classic':'fuji-classic',narusawa:'narusawa',ibaraki:'ibaraki',beppu:'beppu',phoenix:'phoenix',
    'aesthetic-bunker':'traditional-bunker','aesthetic-meal':'clubhouse-meal','aesthetic-bath':'onsen','aesthetic-lantern':'stone-lantern'
  };
  const FALLBACK={
    cover:'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',
    niseko:'https://d111cowwekg815.cloudfront.net/area-guide/32528262837_87a7ff8771_c.jpg',
    furano:'https://www.princehotels.co.jp/golf/furano/images/2025_3_lv1_golf_16.jpg',
    gozensui:'https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39e5c4c488c9afbdcb1/118068.jpg',
    abrand:'https://d2d3p98dfsetz4.cloudfront.net/general/_1200x630_crop_center-center_82_none/a-brand-golf-01.jpg?mtime=1690957145',
    izumi:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',
    kiyosumi:'https://cdn.snsimg.carview.co.jp/minkara/blog/000/046/579/818/46579818/p1.jpg?ct=ee49b2b6c934',
    kawana:'https://static.wixstatic.com/media/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_90/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg',
    daifuji:'https://www.daifuji-gc.com/course/_img/h01/img_gallery02.jpg',
    'fuji-classic':'https://stat.ameba.jp/user_images/20250425/08/makotonote/b7/39/j/o1080081015576107700.jpg',
    narusawa:'https://images.squarespace-cdn.com/content/v1/5df6ef68b8cf5100da7c5e7f/1701751457560-4GFG1RUNPJN28ZTKBLXM/Japan%2BGolf%2BTours%2B-%2BNarusawa%2BGolf%2BClub%2B2023-10-1560.jpg',
    seta:'https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',
    ibaraki:'https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg',
    beppu:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg',
    phoenix:'https://stat.ameba.jp/user_images/20251110/18/golf-platzreife-ch/db/14/j/o1024102415713476146.jpg',
    ibusuki:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/ibusuki-golf-club_3.jpg',
    'aesthetic-bunker':'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',
    'aesthetic-meal':'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',
    'aesthetic-bath':'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',
    'aesthetic-lantern':'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg'
  };
  const COURSE_MAP={
    'Niseko Village Golf Course':'niseko','Furano Golf Course':'furano','Gozensui Golf Club':'gozensui','Gozensui Golf Club p':'gozensui','A-Brand Golf Club':'abrand',
    'Izumi Kokusai Golf Course':'izumi','Kiyosumi Golf Club':'kiyosumi','Kawana Hotel Golf Course':'kawana','Daifuji Golf Course':'daifuji','Fuji Classic Country Club':'fuji-classic',
    'Narusawa Golf Club':'narusawa','Seta Golf Course':'seta','Ibaraki Country Club':'ibaraki','Beppu Golf Club':'beppu','Phoenix Country Club':'phoenix','Ibusuki Golf Course':'ibusuki'
  };
  const HERO_COURSE={hokkaido:'A-Brand Golf Club',miyagi:'Izumi Kokusai Golf Course',saitama:'Kiyosumi Golf Club',shizuoka:'Kawana Hotel Golf Course',yamanashi:'Narusawa Golf Club',kyoto:'Seta Golf Course',osaka:'Ibaraki Country Club',oita:'Beppu Golf Club',miyazaki:'Phoenix Country Club',kagoshima:'Ibusuki Golf Course'};
  const HERO_KICKER={hokkaido:'— Northern Japan',miyagi:'— Tohoku',saitama:'— Greater Tokyo',shizuoka:'— Pacific Coast',yamanashi:'— Mount Fuji',kyoto:'— Kansai',osaka:'— Kansai',oita:'— Kyushu',miyazaki:'— Kyushu',kagoshima:'— Southern Kyushu'};

  function providedSource(key){const real=PROVIDED_ALIAS[key]||key;return window.PHOTO_DATA[real]||'';}
  function sourceFor(key){return providedSource(key)||FALLBACK[key]||'';}
  function setImage(img,key){
    const src=sourceFor(key); if(!src)return;
    img.removeAttribute('width');img.removeAttribute('height');img.loading='eager';img.decoding='async';img.src=src;
    img.onerror=function(){const fallback=FALLBACK[key];if(fallback&&this.src!==fallback){this.onerror=null;this.src=fallback;}};
  }

  const cover=document.querySelector('#cover .cover-image img');
  if(cover){cover.loading='eager';cover.decoding='async';cover.src=FALLBACK.cover;cover.onerror=function(){this.onerror=null;const s=sourceFor('fuji-classic');if(s)this.src=s;};}
  document.querySelectorAll('img[data-photo]').forEach(function(img){if(img!==cover)setImage(img,img.getAttribute('data-photo'));});
  document.querySelectorAll('article.course').forEach(function(card){
    const titleEl=card.querySelector('h3');if(!titleEl)return;let title=titleEl.textContent.trim();
    if(title==='Gozensui Golf Club p'){titleEl.textContent='Gozensui Golf Club';title='Gozensui Golf Club';}
    const key=COURSE_MAP[title];if(!key)return;
    let img=card.querySelector('.course-photo img');
    if(!img){const wrap=document.createElement('div');wrap.className='course-photo';img=document.createElement('img');img.alt=title;wrap.appendChild(img);card.insertBefore(wrap,card.firstChild);}
    setImage(img,key);
  });

  const coverSpace=document.querySelector('#cover .cover-space');
  if(coverSpace&&!coverSpace.querySelector('.access-nature')){
    const em=document.createElement('em');em.className='access-nature';em.textContent='Access Nature';coverSpace.insertBefore(em,coverSpace.firstChild);
  }

  Object.keys(HERO_COURSE).forEach(function(id){
    const sec=document.getElementById(id);if(!sec)return;
    const head=sec.querySelector('.chapter-head');const copy=sec.querySelector('.chapter-copy');if(!copy)return;
    const targetTitle=HERO_COURSE[id];
    let targetCard=[].slice.call(copy.querySelectorAll('article.course')).find(function(c){const h=c.querySelector('h3');return h&&h.textContent.trim()===targetTitle;});
    if(!targetCard)targetCard=copy.querySelector('article.course');
    let photo=targetCard&&targetCard.querySelector('.course-photo');
    if(!photo){
      const key=COURSE_MAP[targetTitle];const src=sourceFor(key);
      if(src){photo=document.createElement('div');photo.className='course-photo';const img=document.createElement('img');img.alt=targetTitle;setImage(img,key);photo.appendChild(img);}
    }
    if(photo){
      photo.classList.remove('course-photo','tall','short');photo.classList.add('chapter-hero');
      const overlay=document.createElement('div');overlay.className='hero-overlay';
      const kicker=document.createElement('em');kicker.textContent=HERO_KICKER[id]||'— Japan Golf';
      const h2=document.createElement('h2');h2.textContent=(head&&head.querySelector('h2')?head.querySelector('h2').textContent:id).toUpperCase();
      overlay.appendChild(kicker);overlay.appendChild(h2);photo.appendChild(overlay);
      sec.insertBefore(photo,sec.firstChild);
    }
    if(head)head.remove();copy.classList.add('editorial');
    copy.querySelectorAll('article.course').forEach(function(c){c.classList.add('story');});
  });

  const aesthetic=document.getElementById('aesthetic');
  if(aesthetic){
    const head=aesthetic.querySelector('.chapter-head');const grid=aesthetic.querySelector('.culture-grid');const first=grid&&grid.querySelector('figure');
    if(first){
      first.classList.add('chapter-hero');
      const overlay=document.createElement('div');overlay.className='hero-overlay';
      const em=document.createElement('em');em.textContent='— Beyond the Fairway';
      const h2=document.createElement('h2');h2.innerHTML='JAPAN GOLF<br>AESTHETIC';overlay.appendChild(em);overlay.appendChild(h2);first.appendChild(overlay);
      aesthetic.insertBefore(first,aesthetic.firstChild);
    }
    if(head)head.remove();
    const intro=aesthetic.querySelector('.aesthetic-copy');
    if(intro){intro.classList.add('editorial','aesthetic-editorial');if(!intro.querySelector('h3')){const h=document.createElement('h3');h.textContent='Tradition in the Details';intro.insertBefore(h,intro.firstChild);}}
  }

  const menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){if(menu)menu.classList.remove('open');if(more)more.classList.remove('open');}
  if(menuBtn&&moreBtn&&menu&&more){menuBtn.addEventListener('click',function(e){e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open');});moreBtn.addEventListener('click',function(e){e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open');});document.addEventListener('click',close);menu.addEventListener('click',close);more.addEventListener('click',function(e){e.stopPropagation();});}
  const tabs=[].slice.call(document.querySelectorAll('#tabs a'));const sections=tabs.map(function(a){return document.querySelector(a.getAttribute('href'));});let current=-1,ticking=false;
  function sync(){ticking=false;let index=0,offset=window.scrollY+window.innerHeight*.24;sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i;});if(index===current)return;current=index;tabs.forEach(function(a,i){a.classList.toggle('active',i===index);});const t=tabs[index];if(t)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});}
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true;}}
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);sync();
})();
