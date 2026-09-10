(function(){
  window.PHOTO_DATA=window.PHOTO_DATA||{};

  const PROVIDED_ALIAS={
    niseko:'niseko',
    abrand:'abrand',
    kawana:'kawana',
    daifuji:'daifuji',
    'fuji-classic':'fuji-classic',
    narusawa:'narusawa',
    ibaraki:'ibaraki',
    beppu:'beppu',
    phoenix:'phoenix',
    'aesthetic-bunker':'traditional-bunker',
    'aesthetic-meal':'clubhouse-meal',
    'aesthetic-bath':'onsen',
    'aesthetic-lantern':'stone-lantern'
  };

  const FALLBACK={
    cover:'https://goetheweb.jp/uploads/2024/03/shibafu_43_nishifuji_1.jpg',
    furano:'https://www.princehotels.co.jp/image/2024_4_top200_golf_3.jpg',
    gozensui:'https://www.gozensui-gc.com/course/hole/10/images/movie_img.jpg',
    izumi:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',
    kiyosumi:'https://i.gimg.jp/cmsimg/294415.jpg?maxheight=1600&maxwidth=1600',
    seta:'https://stat.ameba.jp/user_images/20250114/12/ymomoki/d9/86/j/o1080081015533049993.jpg',
    ibusuki:'https://s3-ap-northeast-1.amazonaws.com/gc.supotomo.com/2015/11/30164203/9213.jpg'
  };

  const COURSE_MAP={
    'Niseko Village Golf Course':'niseko',
    'Furano Golf Course':'furano',
    'Gozensui Golf Club':'gozensui',
    'Gozensui Golf Club p':'gozensui',
    'A-Brand Golf Club':'abrand',
    'Izumi Kokusai Golf Course':'izumi',
    'Kiyosumi Golf Club':'kiyosumi',
    'Kawana Hotel Golf Course':'kawana',
    'Daifuji Golf Course':'daifuji',
    'Fuji Classic Country Club':'fuji-classic',
    'Narusawa Golf Club':'narusawa',
    'Seta Golf Course':'seta',
    'Ibaraki Country Club':'ibaraki',
    'Beppu Golf Club':'beppu',
    'Phoenix Country Club':'phoenix',
    'Ibusuki Golf Course':'ibusuki'
  };

  const blobCache={};
  function dataUriToBlobUrl(uri,key){
    if(!uri||!uri.startsWith('data:')) return uri||'';
    if(blobCache[key]) return blobCache[key];
    try{
      const comma=uri.indexOf(',');
      if(comma<0) return uri;
      const head=uri.slice(0,comma);
      const b64=uri.slice(comma+1);
      const mime=(head.match(/^data:([^;]+)/)||[])[1]||'image/webp';
      const binary=atob(b64);
      const len=binary.length;
      const bytes=new Uint8Array(len);
      for(let i=0;i<len;i++) bytes[i]=binary.charCodeAt(i);
      const url=URL.createObjectURL(new Blob([bytes],{type:mime}));
      blobCache[key]=url;
      return url;
    }catch(e){
      return uri;
    }
  }

  function providedSource(key){
    const realKey=PROVIDED_ALIAS[key]||key;
    const raw=window.PHOTO_DATA[realKey]||'';
    return raw?dataUriToBlobUrl(raw,realKey):'';
  }
  function sourceFor(key){
    return providedSource(key)||FALLBACK[key]||'';
  }
  function setImage(img,key){
    const src=sourceFor(key);
    if(!src)return;
    img.src=src;
    img.loading=img.closest('#cover')?'eager':'lazy';
    img.decoding='async';
    img.classList.add('photo-ready');
    img.onerror=function(){
      const fallback=FALLBACK[key];
      if(fallback&&img.src!==fallback){img.onerror=null;img.src=fallback;}
    };
  }

  const cover=document.querySelector('#cover .cover-image img');
  if(cover){
    cover.src=FALLBACK.cover;
    cover.loading='eager';
    cover.decoding='async';
    cover.classList.add('photo-ready');
  }

  document.querySelectorAll('img[data-photo]').forEach(function(img){
    if(img===cover)return;
    setImage(img,img.getAttribute('data-photo'));
  });

  document.querySelectorAll('article.course').forEach(function(card){
    const titleEl=card.querySelector('h3');
    if(!titleEl)return;
    let title=titleEl.textContent.trim();
    if(title==='Gozensui Golf Club p'){
      titleEl.textContent='Gozensui Golf Club';
      title='Gozensui Golf Club';
    }
    const key=COURSE_MAP[title];
    if(!key)return;
    let img=card.querySelector('.course-photo img');
    if(!img){
      const wrap=document.createElement('div');
      wrap.className='course-photo';
      img=document.createElement('img');
      img.alt=title;
      wrap.appendChild(img);
      card.insertBefore(wrap,card.firstChild);
    }
    setImage(img,key);
  });

  const menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){if(menu)menu.classList.remove('open');if(more)more.classList.remove('open');}
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
    let index=0,offset=window.scrollY+window.innerHeight*.24;
    sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i;});
    if(index===current)return;
    current=index;
    tabs.forEach(function(a,i){a.classList.toggle('active',i===index);});
    const t=tabs[index];
    if(t)t.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true;}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  sync();
})();