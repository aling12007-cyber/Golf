(function(){
  const PHOTO={
    niseko:'https://d111cowwekg815.cloudfront.net/area-guide/32528262837_87a7ff8771_c.jpg',
    abrand:'https://d2d3p98dfsetz4.cloudfront.net/general/_1200x630_crop_center-center_82_none/a-brand-golf-01.jpg?mtime=1690957145',
    furano:'https://www.princehotels.co.jp/golf/furano/tomonokai/images_static/pct-golf_member04.jpg',
    gozensui:'https://golf-pass.brightspotcdn.com/55/c9/aed7e1d0c39c488c9afbdcb1/118068.jpg',
    izumi:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/izumi-international-golf-club_0.jpg',
    kiyosumi:'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2021/04/20/f89388efa114e2322d320912a9db9a9d92fdf9a7_xlarge.jpg',
    kawana:'https://static.wixstatic.com/media/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg/v1/fill/w_800%2Ch_533%2Cal_c/eda014_8943335cc7724ee2a50080bf52d1ff38~mv2.jpg',
    daifuji:'https://www.daifuji-gc.com/course/_img/h01/img_gallery02.jpg',
    fujiClassic:'https://stat.ameba.jp/user_images/20250425/08/makotonote/b7/39/j/o1080081015576107700.jpg',
    narusawa:'https://image.jimcdn.com/app/cms/image/transf/none/path/sad2a693edfa25add/image/i5837fbb702792e41/version/1750730084/image.jpg',
    seta:'https://www.princehotels.com/en/golf/tournament/asset/img/seta/photo_05.jpg',
    ibaraki:'https://stat.ameba.jp/user_images/20211126/08/merisuke06/ef/94/j/o0792071815037245486.jpg',
    beppu:'https://d2sniq1199ov7.cloudfront.net/golf/courses/images/userphotos/beppu-golf-club_2.jpg',
    phoenix:'https://stat.ameba.jp/user_images/20251110/18/golf-platzreife-ch/db/14/j/o1024102415713476146.jpg',
    ibusuki:'https://d1uzk9o9cg136f.cloudfront.net/f/16783386/rc/2023/06/28/e28234ec89bdf0cf54f8100c981047202e231da0_xlarge.jpg'
  };
  const KEY={
    niseko:'niseko','niseko-yotei':'niseko','hokkaido-mountain':'abrand',abrand:'abrand','a-brand':'abrand',
    kawana:'kawana','kawana-coast':'kawana',daifuji:'daifuji','daifuji-mt-fuji':'daifuji',
    'fuji-classic':'fujiClassic',narusawa:'narusawa',ibaraki:'ibaraki',beppu:'beppu','beppu-clubhouse':'beppu',
    phoenix:'phoenix','phoenix-golfer':'phoenix'
  };
  const REGION={cover:'niseko',hokkaido:'abrand',miyagi:'izumi',saitama:'kiyosumi',shizuoka:'daifuji',yamanashi:'fujiClassic',kyoto:'seta',osaka:'ibaraki',oita:'beppu',miyazaki:'phoenix',kagoshima:'ibusuki'};
  const COURSE={
    'Niseko Village Golf Course':'niseko','Furano Golf Course':'furano','Gozensui Golf Club':'gozensui','Gozensui Golf Club p':'gozensui','A-Brand Golf Club':'abrand',
    'Izumi Kokusai Golf Course':'izumi','Kiyosumi Golf Club':'kiyosumi','Kawana Hotel Golf Course':'kawana','Daifuji Golf Course':'daifuji',
    'Fuji Classic Country Club':'fujiClassic','Narusawa Golf Club':'narusawa','Seta Golf Course':'seta','Ibaraki Country Club':'ibaraki',
    'Beppu Golf Club':'beppu','Phoenix Country Club':'phoenix','Ibusuki Golf Course':'ibusuki'
  };
  function regionKey(el){const s=el.closest('section');return s&&REGION[s.id]}
  function sourceFor(key){return PHOTO[key]||''}
  function setImg(img,key){
    const src=sourceFor(key)||sourceFor(regionKey(img));
    if(src)img.src=src;
    img.decoding='async';img.loading=img.closest('#cover')?'eager':'lazy';
    img.onerror=function(){const fallback=sourceFor(regionKey(img));if(fallback&&img.src!==fallback){img.onerror=null;img.src=fallback;}};
  }
  document.querySelectorAll('img[data-photo]').forEach(img=>{
    const k=KEY[img.dataset.photo];
    if(k)setImg(img,k);
    else if(window.PHOTO_DATA&&window.PHOTO_DATA[img.dataset.photo]){
      img.src=window.PHOTO_DATA[img.dataset.photo];
      img.onerror=function(){const f=sourceFor(regionKey(img));if(f){img.onerror=null;img.src=f;}};
    }
  });
  document.querySelectorAll('article.course').forEach(card=>{
    const h=card.querySelector('h3');if(!h)return;
    const original=h.textContent.trim();
    if(original==='Gozensui Golf Club p')h.textContent='Gozensui Golf Club';
    const key=COURSE[original]||COURSE[h.textContent.trim()];if(!key)return;
    let img=card.querySelector('.course-photo img');
    if(!img){const wrap=document.createElement('div');wrap.className='course-photo';img=document.createElement('img');img.alt=h.textContent.trim();wrap.appendChild(img);card.insertBefore(wrap,card.firstChild);}
    setImg(img,key);
  });
  const menuBtn=document.getElementById('menuBtn'),moreBtn=document.getElementById('moreBtn'),menu=document.getElementById('menuPanel'),more=document.getElementById('morePanel');
  function close(){menu&&menu.classList.remove('open');more&&more.classList.remove('open')}
  if(menuBtn&&moreBtn&&menu&&more){menuBtn.addEventListener('click',e=>{e.stopPropagation();more.classList.remove('open');menu.classList.toggle('open')});moreBtn.addEventListener('click',e=>{e.stopPropagation();menu.classList.remove('open');more.classList.toggle('open')});document.addEventListener('click',close);menu.addEventListener('click',close);more.addEventListener('click',e=>e.stopPropagation())}
  const tabs=[...document.querySelectorAll('#tabs a')],sections=tabs.map(a=>document.querySelector(a.getAttribute('href')));let current=-1,ticking=false;
  function sync(){ticking=false;let index=0,offset=window.scrollY+window.innerHeight*.24;sections.forEach((s,i)=>{if(s&&s.offsetTop<=offset)index=i});if(index===current)return;current=index;tabs.forEach((a,i)=>a.classList.toggle('active',i===index));tabs[index]?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true}}window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);sync();
})();
