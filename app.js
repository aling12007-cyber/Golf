(function(){
  const cover=document.querySelector('#cover .cover-image img');
  if(cover){
    cover.src='assets/cover-fuji.jpg?v=20260910k';
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
  if(aesthetic&&!aesthetic.querySelector('.aesthetic-stack')){
    const gallery=document.createElement('div');
    gallery.className='aesthetic-stack';
    const photos=[
      ['Meticulous bunker care','https://www.baroness-direct.com/mame/drbaroness/0000000370/gotenba32.jpg','https://a-us.storyblok.com/f/1022273/1408x768/4554d707f9/gemini_generated_image_mj1ei0mj1ei0mj1e.png/m/1408x768/filters%3Aquality%2885%29'],
      ['Clubhouse dining','https://ximg.retty.me/crop/s1200x900/-/retty/img_repo/2l/01/37028375.jpg','https://stat.ameba.jp/user_images/20250109/18/heizoblack/31/96/j/o2000150015531323570.jpg'],
      ['Japanese bath','https://img.goo-net.com/sss/magazine/2024/01/18/1705562921.jpg','https://pix10.agoda.net/hotelImages/9071866/0/b112834f09da7f72e6b70a82db9c2b1a.jpg?ce=0&s=1024x768'],
      ['Traditional landscape detail','https://cdn.jeepe.jp/uploads/public_image/image/2704/normal_3950183d-def3-493f-82b5-4a73fd81a6ee.jpg','https://livedoor.blogimg.jp/spiderqv/imgs/b/a/ba286207.jpg'],
      ['Golf beneath Mount Fuji','https://www.daifuji-gc.com/course/_img/h01/img_gallery01.jpg','https://www.daifuji-gc.com/course/_img/h01/img_gallery02.jpg'],
      ['Coastal golf landscape','https://www.princehotels.co.jp/golf/kawana/fuji/course/images_static/pct-hole15-01.jpg','https://static.wixstatic.com/media/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_90/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg']
    ];
    photos.forEach(function(item){
      const fig=document.createElement('figure');
      const img=document.createElement('img');
      img.alt=item[0];
      img.src=item[1];
      img.loading='lazy';
      img.decoding='async';
      img.referrerPolicy='no-referrer';
      img.dataset.fallback=item[2];
      img.onerror=function(){
        if(this.dataset.fallback){const f=this.dataset.fallback;this.dataset.fallback='';this.src=f;}else{this.style.display='none';}
      };
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
    const active=tabs[index];if(active)active.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true;}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  sync();
})();
