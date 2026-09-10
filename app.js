(function(){
  window.PHOTO_DATA=window.PHOTO_DATA||{};
  const EXTRA={
    furano:'https://www.princehotels.co.jp/golf/furano/tomonokai/images_static/pct-golf_member04.jpg',
    gozensui:'https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39c488c9afbdcb1/118068.jpg',
    izumi:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',
    kiyosumi:'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2021/04/20/f89388efa114e2322d320912a9db9a9d92fdf9a7_xlarge.jpg',
    seta:'https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg',
    ibusuki:'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2023/06/28/e28234ec89bdf0cf54f8100c981047202e231da0_xlarge.jpg'
  };
  const REGION={cover:'niseko',hokkaido:'abrand',miyagi:'izumi',saitama:'kiyosumi',shizuoka:'daifuji',yamanashi:'fuji-classic',kyoto:'seta',osaka:'ibaraki',oita:'beppu',miyazaki:'phoenix',kagoshima:'ibusuki',aesthetic:'stone-lantern'};
  const COURSE={
    'Furano Golf Course':'furano',
    'Gozensui Golf Club':'gozensui','Gozensui Golf Club p':'gozensui',
    'Izumi Kokusai Golf Course':'izumi',
    'Kiyosumi Golf Club':'kiyosumi',
    'Seta Golf Course':'seta',
    'Ibusuki Golf Course':'ibusuki'
  };
  function srcFor(k){return window.PHOTO_DATA[k]||EXTRA[k]||''}
  function regionKey(el){const s=el.closest('section');return s&&REGION[s.id]}
  function setImg(img,key){
    const src=srcFor(key)||srcFor(regionKey(img));
    if(src) img.src=src;
    img.decoding='async'; img.loading=img.closest('#cover')?'eager':'lazy';
    img.onerror=function(){const f=srcFor(regionKey(img)); if(f&&img.src!==f){img.onerror=null;img.src=f;}};
  }
  document.querySelectorAll('img[data-photo]').forEach(img=>setImg(img,img.dataset.photo));
  document.querySelectorAll('article.course').forEach(card=>{
    const h=card.querySelector('h3'); if(!h)return; const key=COURSE[h.textContent.trim()]; if(!key)return;
    let img=card.querySelector('.course-photo img');
    if(!img){const wrap=document.createElement('div');wrap.className='course-photo';img=document.createElement('img');img.alt=h.textContent.trim();wrap.appendChild(img);card.insertBefore(wrap,card.firstChild);}
    setImg(img,key);
  });
  const menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){menu&&menu.classList.remove('open');more&&more.classList.remove('open')}
  if(menuBtn&&moreBtn&&menu&&more){menuBtn.addEventListener('click',e=>{e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open')});moreBtn.addEventListener('click',e=>{e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open')});document.addEventListener('click',close);menu.addEventListener('click',close);more.addEventListener('click',e=>e.stopPropagation())}
  const tabs=[...document.querySelectorAll('#tabs a')],sections=tabs.map(a=>document.querySelector(a.getAttribute('href')));let current=-1,ticking=false;
  function sync(){ticking=false;let index=0,offset=window.scrollY+window.innerHeight*.24;sections.forEach((s,i)=>{if(s&&s.offsetTop<=offset)index=i});if(index===current)return;current=index;tabs.forEach((a,i)=>a.classList.toggle('active',i===index));tabs[index]?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true}} window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);sync();
})();
