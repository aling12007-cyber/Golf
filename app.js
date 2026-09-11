(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const uniq=a=>a.filter((v,i,x)=>v&&x.indexOf(v)===i);

  const LOCAL={
    cover:'assets/cover-fuji.jpg',
    hokkaido:'assets/niseko-village.jpg',
    generic:'assets/cover-fuji.jpg',
    aesthetic:'assets/aesthetic-bunker.jpg'
  };

  const HERO={
    hokkaido:['https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_1_l.jpg','https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_3_l.jpg',LOCAL.hokkaido],
    miyagi:['https://i.gimg.jp/resource/reserve/gstart/gcimg/230202/20240930-34.jpg?w=1200','https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',LOCAL.generic],
    saitama:['https://www.kiyosumi-golf.co.jp/cms/wp-content/themes/theme-kiyosumi/images/img-index-course.jpg','https://image.gora.golf.rakuten.co.jp/img/golf/110020/img/c0/001.jpg',LOCAL.generic],
    shizuoka:['https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole01-05.jpg','https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg',LOCAL.generic],
    yamanashi:['https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',LOCAL.generic],
    kyoto:['https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg','https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',LOCAL.generic],
    osaka:['https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg','https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2e21a769-ced1-42dd-a4f5-16642dc097ad.jpeg',LOCAL.generic],
    oita:['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg','https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_0.jpg',LOCAL.generic],
    miyazaki:['https://www.kanko-miyazaki.jp/storage/tourism_attractions/1271/responsive_images/X39EA0gDkUYBWNtMH3vSlYjv04kLQR0w5XsvuA5h__1581_1054.jpg','https://stat.ameba.jp/user_images/20251110/18/golf-platzreife-ch/db/14/j/o1024102415713476146.jpg',LOCAL.generic],
    kagoshima:['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/ibusuki-golf-club_3.jpg','https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2020/01/14/d74450ecdfbb6139dd5574c7d4f580958db70aaf_large.jpg',LOCAL.generic],
    aesthetic:['https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',LOCAL.aesthetic,LOCAL.generic]
  };

  const ARTICLE_IMAGES={
    'Niseko Village Golf Course':['assets/niseko-village.jpg',LOCAL.hokkaido,LOCAL.generic],
    'Furano Golf Course':['https://www.princehotels.co.jp/golf/furano/course/images_static/pct-hole15-01-01.jpg','https://www.princehotels.co.jp/image/2026_03_lv1_golf_1.jpg',LOCAL.hokkaido],
    'Gozensui Golf Club':['https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39c488c9afbdcb1/118068.jpg','https://www.gozensui-gc.com/course/hole/11/images/movie_img.jpg',LOCAL.hokkaido],
    'A-Brand Golf Club':['https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_3_l.jpg','https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_1_l.jpg',LOCAL.hokkaido],
    'Izumi Kokusai Golf Course':['https://i.gimg.jp/resource/reserve/gstart/gcimg/230202/20240930-34.jpg?w=1200','https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',LOCAL.generic],
    'Kiyosumi Golf Club':['https://www.kiyosumi-golf.co.jp/cms/wp-content/themes/theme-kiyosumi/images/img-index-course.jpg','https://image.gora.golf.rakuten.co.jp/img/golf/110020/img/c0/001.jpg',LOCAL.generic],
    'Kawana Hotel Golf Course':['https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg','https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole01-05.jpg',LOCAL.generic],
    'Daifuji Golf Course':['https://www.daifuji-gc.com/course/_img/h01/img_gallery02.jpg','https://www.daifuji-gc.com/course/_img/h01/img_gallery01.jpg',LOCAL.generic],
    'Fuji Classic':['https://fuji-classic.com/_next/image?url=%2Fimages%2Frj99obGXlII0ZAtVf3rVl0s1g.jpg&w=1920&q=85','https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',LOCAL.generic],
    'Narusawa Golf Club':['https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',LOCAL.generic],
    'Seta Golf Course':['https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg','https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',LOCAL.generic],
    'Ibaraki Country Club':['https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg','https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2e21a769-ced1-42dd-a4f5-16642dc097ad.jpeg',LOCAL.generic],
    'Beppu Golf Club':['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg','https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_0.jpg',LOCAL.generic],
    'Phoenix Country Club':['https://www.kanko-miyazaki.jp/storage/tourism_attractions/1271/responsive_images/X39EA0gDkUYBWNtMH3vSlYjv04kLQR0w5XsvuA5h__1581_1054.jpg','https://stat.ameba.jp/user_images/20251110/18/golf-platzreife-ch/db/14/j/o1024102415713476146.jpg',LOCAL.generic],
    'Ibusuki Golf Course':['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/ibusuki-golf-club_3.jpg','https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2020/01/14/d74450ecdfbb6139dd5574c7d4f580958db70aaf_large.jpg',LOCAL.generic]
  };

  function loadChain(img,list){
    if(!img)return;
    const chain=uniq([img.getAttribute('src')].concat(list||[],[LOCAL.generic]));
    let i=0;
    img.removeAttribute('onerror');
    img.classList.remove('is-ready');
    function next(){
      if(i>=chain.length){img.src=LOCAL.generic;img.classList.add('is-ready','image-fallback');return;}
      const src=chain[i++];
      img.onload=()=>{img.classList.add('is-ready');if(src.indexOf('assets/')===0)img.classList.add('image-fallback');};
      img.onerror=next;
      if(img.src!==src)img.src=src;
      else if(img.complete&&img.naturalWidth>0)img.onload();
    }
    next();
  }

  function buildToolbar(){
    const mast=$('.mast');
    if(!mast)return;
    const old=$('#moreBtn');
    if(old)old.remove();
    if($('.mast-actions'))return;
    const actions=document.createElement('div');
    actions.className='mast-actions';
    actions.innerHTML='<button class="top-action" data-a="share" aria-label="Share"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="18" cy="19" r="2"></circle><path d="M8 12l8-6M8 12l8 6"></path></svg></button><button class="top-action" data-a="print" aria-label="Print"><svg viewBox="0 0 24 24"><path d="M8 3h8v5H8z"></path><path d="M6 9H5a2 2 0 0 0-2 2v4h4"></path><path d="M18 15h3v-4a2 2 0 0 0-2-2h-1"></path><path d="M7 14h10v7H7z"></path></svg></button><button class="top-action" data-a="contact" aria-label="Contact"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a16 16 0 0 0 5 5L15 13l5 2v4c-8.5.8-15.8-6.5-15-15z"></path></svg></button>';
    mast.appendChild(actions);
    actions.addEventListener('click',async e=>{
      const b=e.target.closest('[data-a]'); if(!b)return;
      if(b.dataset.a==='print')return window.print();
      if(b.dataset.a==='contact')return location.href='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(location.href);
      if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(_){}}
      else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);}catch(_){}}
    });
  }

  function rebuildMenu(){
    const panel=$('#menuPanel');
    if(!panel)return;
    panel.innerHTML='<div class="menu-title">All Chapters</div>'+$$('#tabs a').map(a=>'<a href="'+a.getAttribute('href')+'">'+a.textContent+'</a>').join('');
  }

  function buildCover(){
    const imgBox=$('#cover .cover-image');
    const right=$('#cover .cover-breath');
    if(imgBox&&!$('.cover-byline',imgBox)){
      imgBox.insertAdjacentHTML('beforeend','<div class="cover-byline">— Curated Golf Guide</div><div class="cover-subtitle">Discover Japan<br>Through Golf</div>');
    }
    if(right){
      right.innerHTML='<div class="cover-intro"><div class="cover-kicker">Japan Golf Itineraries</div><h2>A Guide to Japan’s Signature Golf Destinations</h2><div class="intro-rule"></div><p>From Hokkaido’s open fairways to Mount Fuji panoramas, classic Pacific coast courses and the refined clubs of Kansai, this guide brings together distinctive golf experiences across Japan.</p><p>Scroll to move through each region. The image on the left stays full-screen while the story changes on the right.</p></div>';
    }
  }

  function articleSources(title,sectionId){
    return ARTICLE_IMAGES[title]||HERO[sectionId]||[LOCAL.generic];
  }

  function ensurePhotoAfter(article,sectionId){
    const title=$('h3',article)?.textContent.trim()||'';
    const sources=articleSources(title,sectionId);
    const editorial=article.parentElement;
    let photo=$$('.story-photo',editorial).find(fig=>($('img',fig)?.alt||'').trim()===title)||null;

    if(!photo){
      photo=document.createElement('figure');
      photo.className='story-photo';
      photo.innerHTML='<img alt="'+title.replace(/"/g,'&quot;')+'" decoding="async" loading="lazy"><figcaption>'+title+'</figcaption>';
    }else{
      let cap=$('figcaption',photo);
      if(!cap){cap=document.createElement('figcaption');photo.appendChild(cap);}
      cap.textContent=title;
    }

    article.after(photo);
    const img=$('img',photo);
    if(img){
      img.alt=title;
      img.loading='lazy';
      img.decoding='async';
      img.referrerPolicy='no-referrer';
      if(!img.getAttribute('src'))img.setAttribute('src',sources[0]);
      img.dataset.sources=JSON.stringify(sources);
    }
  }

  function prepareEditorial(){
    $$('.chapter.region,.chapter.aesthetic').forEach(section=>{
      const editorial=$('.editorial',section);
      if(!editorial)return;
      $$('.aesthetic-stack',editorial).forEach(n=>n.remove());
      const intro=$('.chapter-intro',editorial);
      if(intro)intro.remove();
      $$('.story',editorial).forEach(article=>ensurePhotoAfter(article,section.id));
      if($('.editorial-inner',editorial))return;
      const wrap=document.createElement('div');
      wrap.className='editorial-inner';
      Array.from(editorial.childNodes).forEach(n=>wrap.appendChild(n));
      editorial.appendChild(wrap);
    });
  }

  function images(){
    loadChain($('#cover .cover-image img'),[LOCAL.cover]);
    $$('.chapter.region,.chapter.aesthetic').forEach(s=>loadChain($('.chapter-hero img',s),HERO[s.id]||[]));
    $$('.story-photo img').forEach(img=>{
      let list=[];
      try{list=JSON.parse(img.dataset.sources||'[]');}catch(_){list=[];}
      loadChain(img,list);
    });
  }

  function menu(){
    const btn=$('#menuBtn'),panel=$('#menuPanel'); if(!btn||!panel)return;
    const close=()=>{panel.classList.remove('open');document.body.classList.remove('menu-open');};
    btn.addEventListener('click',e=>{e.stopPropagation();panel.classList.toggle('open');document.body.classList.toggle('menu-open',panel.classList.contains('open'));});
    document.addEventListener('click',e=>{if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target))close();});
    panel.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  }

  function active(){
    const sections=$$('.chapter'),links=$$('a[href^="#"]');
    let current='cover';
    function sync(){
      const y=scrollY+innerHeight*.42;
      sections.forEach(s=>{if(s.offsetTop<=y)current=s.id;});
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
    }
    addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);sync();
  }

  buildToolbar();
  rebuildMenu();
  buildCover();
  prepareEditorial();
  images();
  menu();
  active();
})();
