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

  const HERO_FALLBACKS={
    hokkaido:['https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_3_l.jpg',LOCAL.hokkaido],
    miyagi:['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',LOCAL.generic],
    saitama:['https://image.gora.golf.rakuten.co.jp/img/golf/110020/img/c0/001.jpg',LOCAL.generic],
    shizuoka:['https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg',LOCAL.generic],
    yamanashi:[LOCAL.generic],
    kyoto:['https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',LOCAL.generic],
    osaka:['https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2e21a769-ced1-42dd-a4f5-16642dc097ad.jpeg',LOCAL.generic],
    oita:['https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_0.jpg',LOCAL.generic],
    miyazaki:['https://www.kanko-miyazaki.jp/storage/tourism_attractions/1271/responsive_images/X39EA0gDkUYBWNtMH3vSlYjv04kLQR0w5XsvuA5h__1581_1054.jpg',LOCAL.generic],
    kagoshima:['https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2020/01/14/d74450ecdfbb6139dd5574c7d4f580958db70aaf_large.jpg',LOCAL.generic],
    aesthetic:[LOCAL.aesthetic,LOCAL.generic]
  };

  const STORY_FALLBACKS={
    'Niseko Village Golf Course':[LOCAL.hokkaido,LOCAL.generic],
    'Furano Golf Course':['https://www.princehotels.co.jp/golf/furano/course/images_static/pct-hole15-01-01.jpg',LOCAL.hokkaido,LOCAL.generic],
    'Gozensui Golf Club':['https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39c488c9afbdcb1/118068.jpg',LOCAL.hokkaido,LOCAL.generic],
    'Daifuji Golf Course':['https://www.daifuji-gc.com/course/_img/h01/img_gallery01.jpg',LOCAL.generic],
    'Fuji Classic':['https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',LOCAL.generic]
  };

  function markReady(img){img.classList.add('is-ready');}
  function loadChain(img,candidates,finalLocal){
    if(!img)return;
    img.removeAttribute('onerror');
    img.removeAttribute('onload');
    img.style.display='block';
    const chain=uniq([img.getAttribute('src')].concat(candidates||[],[finalLocal||LOCAL.generic]));
    let i=0;
    function next(){
      if(i>=chain.length){img.src=finalLocal||LOCAL.generic;img.classList.add('image-fallback');markReady(img);return;}
      const src=chain[i++];
      img.onload=function(){if(src.indexOf('assets/')!==-1)img.classList.add('image-fallback');markReady(img);};
      img.onerror=next;
      img.src=src;
    }
    next();
  }

  function buildTopActions(){
    const mast=$('.mast');
    if(!mast||$('.mast-actions'))return;
    const more=$('#moreBtn');if(more)more.style.display='none';
    const box=document.createElement('div');box.className='mast-actions';
    box.innerHTML='<button class="top-action" data-action="share" aria-label="Share"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 12l8-6M8 12l8 6"/></svg></button><button class="top-action" data-action="print" aria-label="Print"><svg viewBox="0 0 24 24"><path d="M8 3h8v5H8z"/><path d="M6 9H5a2 2 0 0 0-2 2v4h4"/><path d="M18 15h3v-4a2 2 0 0 0-2-2h-1"/><path d="M7 14h10v7H7z"/></svg></button><button class="top-action" data-action="contact" aria-label="Contact"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a16 16 0 0 0 5 5L15 13l5 2v4c-8.5.8-15.8-6.5-15-15z"/></svg></button>';
    mast.appendChild(box);
    box.addEventListener('click',async e=>{
      const b=e.target.closest('[data-action]');if(!b)return;
      if(b.dataset.action==='share'){
        if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(_){}}
        else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);}catch(_){}}
      }
      if(b.dataset.action==='print')window.print();
      if(b.dataset.action==='contact')location.href='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(location.href);
    });
  }

  function rebuildMenu(){
    const menu=$('#menuPanel'),tabs=$$('#tabs a');if(!menu||!tabs.length)return;
    menu.innerHTML=tabs.map(a=>'<a href="'+a.getAttribute('href')+'">'+a.textContent+'</a>').join('');
  }

  function buildCoverRight(){
    const box=$('#cover .cover-breath');if(!box)return;
    box.innerHTML='<div class="panel-arrow-wrap"><a aria-label="Continue" class="down-arrow" href="#hokkaido"></a></div><div class="cover-intro"><div class="cover-kicker">Discover Japan Through Golf</div><h2>A Curated Journey Through Japan\'s Signature Golf Regions</h2><div class="intro-rule"></div><p>From Hokkaido to Kyushu, this guide presents Japan through destination golf, landscape and hospitality.</p><p>Scroll through the chapters and the left-hand visual changes with each region while the editorial story continues on the right.</p></div>';
  }

  function prepareChapters(){
    $$('.chapter.region, .chapter.aesthetic').forEach(section=>{
      const editorial=$('.editorial',section),overlay=$('.hero-overlay',section);if(!editorial||!overlay)return;
      if(!$('.chapter-intro',editorial)){
        const label=($('em',overlay)?.textContent||'').replace(/^—\s*/,'').trim();
        const title=($('h2',overlay)?.textContent||'').replace(/\s+/g,' ').trim();
        const intro=document.createElement('div');intro.className='chapter-intro';
        intro.innerHTML='<div class="chapter-cue-label">'+(label||'Explore Japan')+'</div><div class="chapter-cue-title">'+title+'</div><div class="chapter-cue-arrow" aria-hidden="true"></div>';
        editorial.prepend(intro);
      }
      if(!$('.editorial-inner',editorial)){
        const intro=$('.chapter-intro',editorial),wrap=document.createElement('div');wrap.className=section.id==='aesthetic'?'aesthetic-inner editorial-inner':'editorial-inner';
        Array.from(editorial.childNodes).forEach(n=>{if(n!==intro)wrap.appendChild(n);});
        editorial.appendChild(wrap);
      }
    });
  }

  function rebuildAesthetic(){
    const root=$('#aesthetic .editorial-inner');if(!root)return;
    const old=$('.aesthetic-stack',root);if(old)old.remove();
    const gallery=document.createElement('div');gallery.className='aesthetic-stack';
    [['Meticulous bunker care','assets/aesthetic-bunker.jpg'],['Clubhouse dining','assets/aesthetic-meal.jpg'],['Japanese bath','assets/aesthetic-bath.jpg'],['Traditional landscape detail','assets/aesthetic-lantern.jpg']].forEach(item=>{
      const f=document.createElement('figure'),img=document.createElement('img');img.alt=item[0];img.src=item[1];img.loading='lazy';img.decoding='async';f.appendChild(img);gallery.appendChild(f);loadChain(img,[LOCAL.generic],LOCAL.generic);
    });
    root.appendChild(gallery);
  }

  function prepareImages(){
    const cover=$('#cover .cover-image img');if(cover){cover.loading='eager';loadChain(cover,[LOCAL.cover],LOCAL.cover);}
    Object.keys(HERO_FALLBACKS).forEach(id=>{
      const img=$('#'+id+' .chapter-hero img');if(!img)return;img.loading=id==='hokkaido'?'eager':'lazy';img.decoding='async';loadChain(img,HERO_FALLBACKS[id],id==='hokkaido'?LOCAL.hokkaido:(id==='aesthetic'?LOCAL.aesthetic:LOCAL.generic));
    });
    $$('.story-photo img').forEach(img=>{img.loading='lazy';img.decoding='async';loadChain(img,STORY_FALLBACKS[img.alt]||[],img.alt.includes('Niseko')?LOCAL.hokkaido:LOCAL.generic);});
  }

  function setupMenu(){
    const btn=$('#menuBtn'),menu=$('#menuPanel');if(!btn||!menu)return;
    const close=()=>{menu.classList.remove('open');document.body.classList.remove('menu-open');};
    btn.addEventListener('click',e=>{e.stopPropagation();menu.classList.toggle('open');document.body.classList.toggle('menu-open',menu.classList.contains('open'));});
    document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!btn.contains(e.target))close();});
    menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  }

  function setupActiveChapter(){
    const sections=$$('.chapter'),links=$$('a[href^="#"]'),ratios=new Map();
    const set=id=>links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>ratios.set(e.target.id,e.intersectionRatio));
      let id=sections[0]?.id,max=-1;sections.forEach(s=>{const r=ratios.get(s.id)||0;if(r>max){max=r;id=s.id;}});if(id)set(id);
    },{threshold:[0,.15,.35,.55,.75],rootMargin:'-8% 0px -38% 0px'});
    sections.forEach(s=>io.observe(s));
  }

  buildTopActions();
  rebuildMenu();
  buildCoverRight();
  prepareChapters();
  prepareImages();
  rebuildAesthetic();
  $$('.map').forEach(a=>a.textContent='Google Maps');
  setupMenu();
  setupActiveChapter();
})();
