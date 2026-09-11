(function(){
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const uniq=a=>a.filter((v,i,x)=>v&&x.indexOf(v)===i);

  const LOCAL={
    cover:'assets/cover-fuji.jpg',
    aesthetic:'assets/aesthetic-bunker.jpg'
  };

  /*
   * Only course-specific sources are used below.
   * Do not add a generic golf-course fallback here: a wrong course photo
   * is worse than hiding an unavailable image.
   */
  const HERO={
    hokkaido:[
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-view.jpg',
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-clubhouse.jpg'
    ],
    miyagi:[
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_7.jpg'
    ],
    saitama:[
      'https://www.kiyosumi-golf.co.jp/cms/wp-content/themes/theme-kiyosumi/images/img-index-course.jpg',
      'https://image.gora.golf.rakuten.co.jp/img/golf/drone/panorama/110020.jpg'
    ],
    shizuoka:[
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole01-05.jpg',
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg'
    ],
    yamanashi:[
      'https://zuien.net/wp-content/themes/zuien/src/images/narusawa/coursegide/out/course_out_008.jpg'
    ],
    kyoto:[
      'https://www.princehotels.co.jp/golf/seta/north/course/images_static/pct-hole03-01.jpg'
    ],
    osaka:[
      'https://ibarakicc.com/img/course/img_modal_course_east_01.jpg'
    ],
    oita:[
      'https://pgm-images.s3-ap-northeast-1.amazonaws.com/img/main_visual/133/r64e5c1d3.jpg'
    ],
    miyazaki:[
      'https://www.miyazaki-city.tourism.or.jp/storage/tourism_attractions/10013/responsive_images/tZoBx2oMkaPpx6xA4GJDAReWOBnW1NbYDCTIJ2NS__1680_1120.jpg',
      'https://www.miyazaki-city.tourism.or.jp/storage/tourism_attractions/10013/responsive_images/rRsrJIpy0kIuGCnTNVaHUsSLrX4SairtVFCfIbU2__1680_1120.jpg'
    ],
    kagoshima:[
      'https://ibusukigolf.iwasakihotels.com/en/img/slider/1.jpg',
      'https://ibusukigolf.iwasakihotels.com/en/img/slider/2.jpg'
    ],
    aesthetic:[LOCAL.aesthetic]
  };

  const ARTICLE_IMAGES={
    'Niseko Village Golf Course':[
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_aerial.jpg',
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_fairway.jpg',
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_green.jpg'
    ],
    'Furano Golf Course':[
      'https://www.princehotels.co.jp/image/2024_4_top200_golf_1.jpg',
      'https://www.princehotels.co.jp/image/2024_4_top200_golf_2.jpg'
    ],
    'Gozensui Golf Club':[
      'https://www.gozensui-gc.com/course/hole/images/screen.jpg'
    ],
    'A-Brand Golf Club':[
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-fairways.jpg',
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-tee-box.jpg'
    ],
    'Izumi Kokusai Golf Course':[
      'https://image.gora.golf.rakuten.co.jp/img/golf/40002/photo1.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_1.jpg'
    ],
    'Kiyosumi Golf Club':[
      'https://image.gora.golf.rakuten.co.jp/img/golf/110020/photo1.jpg'
    ],
    'Kawana Hotel Golf Course':[
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole02-03.jpg',
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole03-03.jpg'
    ],
    'Daifuji Golf Course':[
      'https://www.daifuji-gc.com/course/_img/h01/img_gallery02.jpg',
      'https://www.daifuji-gc.com/course/_img/h01/img_gallery01.jpg'
    ],
    'Fuji Classic':[
      'https://fuji-classic.com/_next/image?dpl=dpl_GJV7G1cCFfot22sMr52xC9XF1A2T&q=75&url=%2Fimages%2FDIYA61LfWZB4nyhczQ6SPeVXVQ.jpg&w=3840',
      'https://fuji-classic.com/_next/image?dpl=dpl_GJV7G1cCFfot22sMr52xC9XF1A2T&q=75&url=%2Fimages%2FBY4cFoz2N30pCvhBGd3cmGpS7Wc.jpg&w=3840'
    ],
    'Narusawa Golf Club':[
      'https://zuien.net/wp-content/themes/zuien/src/images/narusawa/coursegide/out/course_out_001.jpg'
    ],
    'Seta Golf Course':[
      'https://www.princehotels.co.jp/golf/seta/north/course/images_static/pct-hole06-01.jpg',
      'https://www.princehotels.co.jp/golf/seta/north/course/images_static/pct-hole18-01.jpg'
    ],
    'Ibaraki Country Club':[
      'https://ibarakicc.com/img/course/img_modal_course_east_02.jpg'
    ],
    'Beppu Golf Club':[
      'https://pgm-images.s3-ap-northeast-1.amazonaws.com/img/main_visual/133/r64e5c0d9.jpg'
    ],
    'Phoenix Country Club':[
      'https://www.miyazaki-city.tourism.or.jp/storage/tourism_attractions/10013/responsive_images/zyJrTV8cIORSJVYihD1BVq1s01VUS2PLVbi50Amg__1680_1120.jpg',
      'https://www.miyazaki-city.tourism.or.jp/storage/tourism_attractions/10013/responsive_images/9bPi0556gr7Dt4imKofuR10veIxMiY7xHd0LPYON__1679_1119.jpg'
    ],
    'Ibusuki Golf Course':[
      'https://ibusukigolf.iwasakihotels.com/en/img/slider/3.jpg',
      'https://ibusukigolf.iwasakihotels.com/en/img/slider/4.jpg',
      'https://ibusukigolf.iwasakihotels.com/en/img/slider/5.jpg'
    ]
  };

  function loadChain(img,list,{includeCurrent=false,onExhausted=null}={}){
    if(!img)return;
    const chain=uniq((includeCurrent&&img.getAttribute('src')?[img.getAttribute('src')]:[]).concat(list||[]));
    let i=0;
    img.removeAttribute('onerror');
    img.classList.remove('is-ready','image-fallback','is-unavailable');

    function failAll(){
      img.classList.add('is-unavailable');
      img.removeAttribute('src');
      if(typeof onExhausted==='function')onExhausted(img);
    }

    function next(){
      if(i>=chain.length){failAll();return;}
      const src=chain[i++];
      img.onload=()=>{
        img.classList.remove('is-unavailable');
        img.classList.add('is-ready');
      };
      img.onerror=next;
      img.setAttribute('src',src);
      if(img.complete&&img.naturalWidth>0)img.onload();
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
      const b=e.target.closest('[data-a]');
      if(!b)return;
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
    const blocked=new Set(HERO[sectionId]||[]);
    const heroImg=$('#'+sectionId+' .chapter-hero img');
    if(heroImg){
      if(heroImg.getAttribute('src'))blocked.add(heroImg.getAttribute('src'));
      if(heroImg.currentSrc)blocked.add(heroImg.currentSrc);
    }
    return uniq(ARTICLE_IMAGES[title]||[]).filter(src=>src&&!blocked.has(src));
  }

  function ensurePhotoAfter(article,sectionId){
    const title=$('h3',article)?.textContent.trim()||'';
    const sources=articleSources(title,sectionId);
    const editorial=article.parentElement;
    let photo=$$('.story-photo',editorial).find(fig=>($('img',fig)?.alt||'').trim()===title)||null;

    if(!sources.length){
      if(photo)photo.remove();
      return;
    }

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
      img.dataset.sources=JSON.stringify(sources);
      img.classList.remove('is-ready','is-unavailable');
      img.setAttribute('src',sources[0]);
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
    loadChain($('#cover .cover-image img'),[LOCAL.cover],{includeCurrent:false});

    $$('.chapter.region,.chapter.aesthetic').forEach(section=>{
      loadChain($('.chapter-hero img',section),HERO[section.id]||[],{
        includeCurrent:false
      });
    });

    $$('.story-photo img').forEach(img=>{
      let list=[];
      try{list=JSON.parse(img.dataset.sources||'[]');}catch(_){list=[];}
      loadChain(img,list,{
        includeCurrent:false,
        onExhausted:broken=>{
          const fig=broken.closest('.story-photo');
          if(fig)fig.remove();
        }
      });
    });
  }

  function menu(){
    const btn=$('#menuBtn'),panel=$('#menuPanel');
    if(!btn||!panel)return;
    const close=()=>{
      panel.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      panel.classList.toggle('open');
      document.body.classList.toggle('menu-open',panel.classList.contains('open'));
    });
    document.addEventListener('click',e=>{
      if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target))close();
    });
    panel.addEventListener('click',e=>{
      if(e.target.closest('a'))close();
    });
  }

  function active(){
    const sections=$$('.chapter');
    const links=$$('a[href^="#"]');
    let current='cover';

    function sync(){
      const y=scrollY+innerHeight*.42;
      sections.forEach(s=>{if(s.offsetTop<=y)current=s.id;});
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
    }

    addEventListener('scroll',sync,{passive:true});
    addEventListener('resize',sync);
    sync();
  }

  buildToolbar();
  rebuildMenu();
  buildCover();
  prepareEditorial();
  images();
  menu();
  active();
})();
