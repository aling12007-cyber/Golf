(function(){
  'use strict';

  const LOCAL={
    cover:'assets/cover-fuji.jpg',
    hokkaido:'assets/niseko-village.jpg',
    generic:'assets/cover-fuji.jpg',
    aesthetic:'assets/aesthetic-bunker.jpg'
  };

  const HERO_FALLBACKS={
    hokkaido:[
      'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_1_l.jpg',
      'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_3_l.jpg',
      LOCAL.hokkaido
    ],
    miyagi:[
      'https://i.gimg.jp/resource/reserve/gstart/gcimg/230202/20240930-34.jpg?w=1200',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',
      LOCAL.generic
    ],
    saitama:[
      'https://www.kiyosumi-golf.co.jp/cms/wp-content/themes/theme-kiyosumi/images/img-index-course.jpg',
      'https://image.gora.golf.rakuten.co.jp/img/golf/110020/img/c0/001.jpg',
      LOCAL.generic
    ],
    shizuoka:[
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole01-05.jpg',
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg',
      LOCAL.generic
    ],
    yamanashi:[
      'https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',
      LOCAL.generic
    ],
    kyoto:[
      'https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg',
      'https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',
      LOCAL.generic
    ],
    osaka:[
      'https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2e21a769-ced1-42dd-a4f5-16642dc097ad.jpeg',
      LOCAL.generic
    ],
    oita:[
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_0.jpg',
      LOCAL.generic
    ],
    miyazaki:[
      'https://www.kanko-miyazaki.jp/storage/tourism_attractions/1271/responsive_images/X39EA0gDkUYBWNtMH3vSlYjv04kLQR0w5XsvuA5h__1581_1054.jpg',
      LOCAL.generic
    ],
    kagoshima:[
      'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2020/01/14/d74450ecdfbb6139dd5574c7d4f580958db70aaf_large.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/ibusuki-golf-club_3.jpg',
      LOCAL.generic
    ],
    aesthetic:[
      'https://www.golfsavers.com/assets/image/Golf-in-Japan-1.jpg',
      LOCAL.aesthetic,
      LOCAL.generic
    ]
  };

  const STORY_FALLBACKS={
    'Niseko Village Golf Course':[LOCAL.hokkaido,LOCAL.generic],
    'Furano Golf Course':[
      'https://www.princehotels.co.jp/golf/furano/course/images_static/pct-hole15-01-01.jpg',
      LOCAL.hokkaido,LOCAL.generic
    ],
    'Gozensui Golf Club':[
      'https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39c488c9afbdcb1/118068.jpg',
      LOCAL.hokkaido,LOCAL.generic
    ],
    'Daifuji Golf Course':[
      'https://www.daifuji-gc.com/course/_img/h01/img_gallery01.jpg',
      LOCAL.generic
    ],
    'Fuji Classic':[
      'https://fuji-classic.com/_next/image?url=%2Fimages%2Frj99obGXlII0ZAtVf3rVl0s1g.jpg&w=1920&q=85',
      LOCAL.generic
    ]
  };

  function uniq(list){
    return list.filter(function(v,i,a){return v&&a.indexOf(v)===i;});
  }

  function markReady(img){
    img.classList.add('is-ready');
  }

  function installFallback(img,candidates,finalLocal){
    if(!img)return;
    img.removeAttribute('onerror');
    const original=img.getAttribute('src');
    const chain=uniq([original].concat(candidates||[],[finalLocal||LOCAL.generic]));
    let index=Math.max(0,chain.indexOf(original));
    let finished=false;

    function loaded(){
      if(finished)return;
      finished=true;
      if(img.src.indexOf('assets/')!==-1)img.classList.add('image-fallback');
      markReady(img);
    }

    function next(){
      finished=false;
      index+=1;
      if(index>=chain.length){
        img.src=LOCAL.generic;
        img.classList.add('image-fallback');
        markReady(img);
        return;
      }
      img.src=chain[index];
    }

    img.addEventListener('load',loaded);
    img.addEventListener('error',next);
    if(img.complete&&img.naturalWidth>0)loaded();
  }

  const cover=document.querySelector('#cover .cover-image img');
  if(cover){
    cover.alt='Golf course with Mount Fuji';
    cover.loading='eager';
    installFallback(cover,[LOCAL.cover],LOCAL.cover);
  }

  Object.keys(HERO_FALLBACKS).forEach(function(id){
    const img=document.querySelector('#'+id+' .chapter-hero img');
    if(img){
      img.loading=id==='hokkaido'?'eager':'lazy';
      img.decoding='async';
      installFallback(img,HERO_FALLBACKS[id],id==='hokkaido'?LOCAL.hokkaido:(id==='aesthetic'?LOCAL.aesthetic:LOCAL.generic));
    }
  });

  document.querySelectorAll('.story-photo img').forEach(function(img){
    img.loading='lazy';
    img.decoding='async';
    installFallback(img,STORY_FALLBACKS[img.alt]||[],img.alt.indexOf('Niseko')!==-1?LOCAL.hokkaido:LOCAL.generic);
  });

  /* Rebuild the final gallery from repository-hosted assets only. */
  const aesthetic=document.querySelector('#aesthetic .aesthetic-editorial');
  if(aesthetic){
    const old=aesthetic.querySelector('.aesthetic-stack');
    if(old)old.remove();
    const gallery=document.createElement('div');
    gallery.className='aesthetic-stack';
    [
      ['Meticulous bunker care','assets/aesthetic-bunker.jpg'],
      ['Clubhouse dining','assets/aesthetic-meal.jpg'],
      ['Japanese bath','assets/aesthetic-bath.jpg'],
      ['Traditional landscape detail','assets/aesthetic-lantern.jpg']
    ].forEach(function(item){
      const fig=document.createElement('figure');
      const img=document.createElement('img');
      img.alt=item[0];
      img.src=item[1];
      img.loading='lazy';
      img.decoding='async';
      img.addEventListener('load',function(){markReady(img);});
      img.addEventListener('error',function(){img.src=LOCAL.generic;img.classList.add('image-fallback');markReady(img);},{once:true});
      fig.appendChild(img);
      gallery.appendChild(fig);
      if(img.complete&&img.naturalWidth>0)markReady(img);
    });
    aesthetic.appendChild(gallery);
  }

  const coverLine=document.querySelector('#cover .cover-breath em');
  if(coverLine)coverLine.textContent='Discover Japan Through Golf';
  document.querySelectorAll('a.map').forEach(function(a){a.textContent='Google Maps';});

  const menuBtn=document.getElementById('menuBtn');
  const moreBtn=document.getElementById('moreBtn');
  const menu=document.getElementById('menuPanel');
  const more=document.getElementById('morePanel');

  function closePanels(){
    if(menu)menu.classList.remove('open');
    if(more)more.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  if(menuBtn&&menu){
    menuBtn.addEventListener('click',function(e){
      e.stopPropagation();
      if(window.innerWidth>980)return;
      if(more)more.classList.remove('open');
      menu.classList.toggle('open');
      document.body.classList.toggle('menu-open',menu.classList.contains('open'));
    });
  }
  if(moreBtn&&more){
    moreBtn.addEventListener('click',function(e){
      e.stopPropagation();
      if(menu)menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      more.classList.toggle('open');
    });
  }
  document.addEventListener('click',function(e){
    if(more&&more.contains(e.target))return;
    if(menu&&menu.contains(e.target))return;
    closePanels();
  });
  if(menu)menu.addEventListener('click',function(e){
    if(e.target.closest('a'))closePanels();
  });

  const tabs=[].slice.call(document.querySelectorAll('#tabs a'));
  const sections=tabs.map(function(a){return document.querySelector(a.getAttribute('href'));});
  let current=-1;
  let ticking=false;

  function sync(){
    ticking=false;
    const desktop=window.innerWidth>980;
    const probe=window.scrollY+(desktop?window.innerHeight*.32:(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile-head'))||70)+90);
    let index=0;
    sections.forEach(function(section,i){if(section&&section.offsetTop<=probe)index=i;});
    if(index===current)return;
    current=index;
    tabs.forEach(function(a,i){a.classList.toggle('active',i===index);});
    if(!desktop&&tabs[index])tabs[index].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }

  function onScroll(){
    if(!ticking){requestAnimationFrame(sync);ticking=true;}
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){closePanels();onScroll();});
  sync();
})();
