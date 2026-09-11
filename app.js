(function(){
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const unique=a=>a.filter((v,i,x)=>v&&x.indexOf(v)===i);

  const ARTICLE_IMAGES={
    'Niseko Village Golf Course':[
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_aerial.jpg',
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_fairway.jpg',
      'https://www.golfsavers.com/assets/image/niseko_village_golf_resort_green.jpg',
      'assets/niseko-village.jpg'
    ],
    'Furano Golf Course':[
      'https://www.princehotels.co.jp/image/2024_4_top200_golf_1.jpg',
      'https://www.princehotels.co.jp/image/2024_4_top200_golf_2.jpg'
    ],
    'Gozensui Golf Club':['https://www.gozensui-gc.com/course/hole/images/screen.jpg'],
    'A-Brand Golf Club':[
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-fairways.jpg',
      'https://japan.golfsavers.com/assets/image/A-Brand-golf-Club-tee-box.jpg'
    ],
    'Izumi Kokusai Golf Course':[
      'https://image.gora.golf.rakuten.co.jp/img/golf/40002/photo1.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_1.jpg'
    ],
    'Kiyosumi Golf Club':['https://image.gora.golf.rakuten.co.jp/img/golf/110020/photo1.jpg'],
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
    'Narusawa Golf Club':['https://zuien.net/wp-content/themes/zuien/src/images/narusawa/coursegide/out/course_out_001.jpg'],
    'Seta Golf Course':[
      'https://www.princehotels.co.jp/golf/seta/north/course/images_static/pct-hole06-01.jpg',
      'https://www.princehotels.co.jp/golf/seta/north/course/images_static/pct-hole18-01.jpg'
    ],
    'Ibaraki Country Club':['https://ibarakicc.com/img/course/img_modal_course_east_02.jpg'],
    'Beppu Golf Club':['https://pgm-images.s3-ap-northeast-1.amazonaws.com/img/main_visual/133/r64e5c0d9.jpg'],
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

  function loadFallback(img,sources,onFail){
    const queue=unique(sources);
    let i=0;
    const next=()=>{
      if(i>=queue.length){ if(onFail)onFail(); return; }
      img.onerror=next;
      img.onload=()=>img.classList.add('is-ready');
      img.src=queue[i++];
    };
    next();
  }

  function setupHeroFallbacks(){
    $$('.chapter.region .chapter-hero img').forEach(img=>{
      const fallback=img.dataset.fallback;
      if(!fallback)return;
      const primary=img.currentSrc||img.src;
      img.onerror=()=>{
        img.onerror=null;
        if(fallback&&fallback!==primary)img.src=fallback;
      };
    });
  }

  function prepareSection(section){
    if(section.dataset.prepared==='1')return;
    section.dataset.prepared='1';
    const editorial=$('.editorial',section);
    if(!editorial)return;

    let inner=$('.editorial-inner',editorial);
    if(!inner){
      inner=document.createElement('div');
      inner.className='editorial-inner';
      while(editorial.firstChild)inner.appendChild(editorial.firstChild);
      editorial.appendChild(inner);
    }

    $$('.story',inner).forEach(article=>{
      const title=$('h3',article)?.textContent.trim()||'';
      const sources=ARTICLE_IMAGES[title]||[];
      if(!sources.length)return;

      const fig=document.createElement('figure');
      fig.className='story-photo';
      const img=document.createElement('img');
      img.alt=title;
      img.loading='lazy';
      img.decoding='async';
      img.referrerPolicy='no-referrer';
      const cap=document.createElement('figcaption');
      cap.textContent=title;
      fig.append(img,cap);
      article.after(fig);
      loadFallback(img,sources,()=>fig.remove());
    });
  }

  function setupLazyEditorial(){
    const sections=$$('.chapter.region');
    if(!('IntersectionObserver' in window)){
      sections.forEach(prepareSection);
      return;
    }
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        prepareSection(entry.target);
        io.unobserve(entry.target);
      });
    },{rootMargin:'900px 0px'});
    sections.forEach(section=>io.observe(section));
  }

  function setupAestheticHero(){
    const section=$('#aesthetic');
    const hero=$('[data-bunker-hero]',section);
    if(!section||!hero)return;

    const load=()=>{
      if(hero.dataset.loaded==='1')return;
      hero.dataset.loaded='1';
      fetch('assets/aesthetic-bunker-small.jpg.b64.txt?v=20260911u',{cache:'force-cache'})
        .then(r=>{if(!r.ok)throw new Error('image');return r.text();})
        .then(text=>{
          const b64=text.replace(/\s+/g,'');
          if(!b64.startsWith('/9j/'))throw new Error('jpeg');
          hero.onload=()=>hero.classList.add('is-ready');
          hero.src='data:image/jpeg;base64,'+b64;
        })
        .catch(()=>{
          hero.onload=()=>hero.classList.add('is-ready');
          hero.src='assets/aesthetic-lantern.jpg';
        });
    };

    if(!('IntersectionObserver' in window)){load();return;}
    const io=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){
        load();
        io.disconnect();
      }
    },{rootMargin:'1000px 0px'});
    io.observe(section);
  }

  function setupMenu(){
    const btn=$('#menuBtn');
    const panel=$('#menuPanel');
    if(!btn||!panel)return;

    panel.innerHTML='<div class="menu-title">All Chapters</div>'+$$('.chapter').map(section=>{
      const label=section.id==='cover'?'Cover Page':section.id==='aesthetic'?'Japan Golf Aesthetic':section.id.charAt(0).toUpperCase()+section.id.slice(1);
      return '<a href="#'+section.id+'">'+label+'</a>';
    }).join('');

    const close=()=>{panel.classList.remove('open');document.body.classList.remove('menu-open');};
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      panel.classList.toggle('open');
      document.body.classList.toggle('menu-open',panel.classList.contains('open'));
    });
    panel.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    document.addEventListener('click',e=>{if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target))close();});
  }

  function setupActions(){
    $('.mast-actions')?.addEventListener('click',async e=>{
      const btn=e.target.closest('[data-action]');
      if(!btn)return;
      const action=btn.dataset.action;
      if(action==='print'){window.print();return;}
      if(action==='contact'){
        location.href='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(location.href);
        return;
      }
      if(action==='share'){
        if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(_){}}
        else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);}catch(_){}}
      }
    });
  }

  function setupActiveMenu(){
    const sections=$$('.chapter');
    const links=()=>$$('#menuPanel a');
    let ticking=false;
    const sync=()=>{
      ticking=false;
      const y=scrollY+innerHeight*.42;
      let current=sections[0]?.id||'';
      sections.forEach(s=>{if(s.offsetTop<=y)current=s.id;});
      links().forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
    };
    addEventListener('scroll',()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(sync);
    },{passive:true});
    addEventListener('resize',sync,{passive:true});
    sync();
  }

  setupHeroFallbacks();
  setupLazyEditorial();
  setupAestheticHero();
  setupMenu();
  setupActions();
  setupActiveMenu();
})();
