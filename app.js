(function(){
  const FALLBACKS={
    hokkaido:[
      'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_1_l.jpg',
      'https://www.visit-hokkaido.jp/lsc/upfile/spot/0001/3097/13097_3_l.jpg',
      'assets/niseko-village.jpg'
    ],
    miyagi:[
      'https://i.gimg.jp/resource/reserve/gstart/gcimg/230202/20240930-34.jpg?w=686',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg'
    ],
    saitama:[
      'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2021/04/20/5295e5d960e2ba680a6b1c9685c429c4475843e6_xlarge.jpg',
      'https://image.gora.golf.rakuten.co.jp/img/golf/110020/img/c0/001.jpg'
    ],
    shizuoka:[
      'https://static.wixstatic.com/media/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg/v1/fill/w_800,h_533,al_c,q_90/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg',
      'https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole01-05.jpg'
    ],
    yamanashi:[
      'https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',
      'https://stat.ameba.jp/user_images/20250425/08/makotonote/b7/39/j/o1080081015576107700.jpg'
    ],
    kyoto:[
      'https://www.asiaodysseytravel.com/images/asia-tours/japan-tours/seta-golf-club-700-4.jpg',
      'https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg'
    ],
    osaka:[
      'https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2e21a769-ced1-42dd-a4f5-16642dc097ad.jpeg'
    ],
    oita:[
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_0.jpg'
    ],
    miyazaki:[
      'https://www.kanko-miyazaki.jp/storage/tourism_attractions/1271/responsive_images/X39EA0gDkUYBWNtMH3vSlYjv04kLQR0w5XsvuA5h__1581_1054.jpg',
      'https://stat.ameba.jp/user_images/20251110/18/golf-platzreife-ch/db/14/j/o1024102415713476146.jpg'
    ],
    kagoshima:[
      'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2020/01/14/d74450ecdfbb6139dd5574c7d4f580958db70aaf_large.jpg',
      'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/ibusuki-golf-club_3.jpg'
    ]
  };

  function useChain(img,urls){
    if(!img||!urls||!urls.length)return;
    let i=0;
    const next=function(){
      if(i>=urls.length){img.style.display='none';return;}
      img.style.display='block';
      img.src=urls[i++];
    };
    img.onerror=next;
    next();
  }

  Object.keys(FALLBACKS).forEach(function(id){
    useChain(document.querySelector('#'+id+' .chapter-hero img'),FALLBACKS[id]);
  });

  const fuji=document.querySelector('#yamanashi img[alt="Fuji Classic"]');
  if(fuji)useChain(fuji,[
    'https://stat.ameba.jp/user_images/20250425/08/makotonote/b7/39/j/o1080081015576107700.jpg',
    'https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg'
  ]);

  const aesthetic=document.querySelector('#aesthetic .aesthetic-editorial');
  if(aesthetic){
    const old=aesthetic.querySelector('.aesthetic-stack');
    if(old)old.remove();
    const gallery=document.createElement('div');
    gallery.className='aesthetic-stack';
    [
      ['Meticulous bunker care','assets/aesthetic-bunker.jpg?v=20260910n'],
      ['Clubhouse dining','assets/aesthetic-meal.jpg?v=20260910n'],
      ['Japanese bath','assets/aesthetic-bath.jpg?v=20260910n'],
      ['Traditional landscape detail','assets/aesthetic-lantern.jpg?v=20260910n']
    ].forEach(function(item){
      const fig=document.createElement('figure');
      const img=document.createElement('img');
      img.alt=item[0];img.src=item[1];img.loading='lazy';img.decoding='async';
      fig.appendChild(img);gallery.appendChild(fig);
    });
    aesthetic.appendChild(gallery);
  }

  const cover=document.querySelector('#cover .cover-image img');
  if(cover){cover.src='assets/cover-fuji.jpg?v=20260910n';cover.alt='Golf course with Mount Fuji';}
  const coverLine=document.querySelector('#cover .cover-breath em');
  if(coverLine)coverLine.textContent='Discover Japan Through Golf';
  document.querySelectorAll('a.map').forEach(function(a){a.textContent='Google Maps';});

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