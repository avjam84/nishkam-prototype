(function(){
 const page=(location.pathname.split('/').pop()||'index.html');
 const units=[['unit1.html','Business in the Real World'],['unit2.html','Influences on Business'],['unit3.html','Business Operations'],['unit4.html','Human Resources'],['unit5.html','Marketing'],['unit6.html','Finance']];
 const grp=(id,label,items)=>`<li><button aria-expanded="false" aria-controls="${id}">${label}</button><ul class="menu" id="${id}">${items.map(([h,t,n])=>`<li><a href="${h}">${n?`<span>${n}</span>`:''}${t}</a></li>`).join('')}</ul></li>`;
 const hdr=document.createElement('header');hdr.className='site-hdr';
 hdr.innerHTML=`<div class="site-hdr__in"><a class="brand" href="index.html"><b>Nishkam School West London</b><small>AQA GCSE Business</small></a>
 <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="siteNav"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
 <nav aria-label="Main"><ul class="nav" id="siteNav"><li><a href="index.html">Home</a></li>
 ${grp('m-about','About',[['virtues.html','Nishkam Virtues'],['faith.html','Faith &amp; Business']])}
 ${grp('m-units','Units',units.map(([h,t],i)=>[h,t,i+1]))}
 ${grp('m-tools','Study Tools',[['marker.html','Mark My Work'],['generator.html','Practice Questions'],['mock.html','Mock Paper Generator'],['quiz.html','Quiz']])}
 ${grp('m-plan','Planning',[['assessments.html','Assessment Schedule'],['revision.html','How to Revise'],['alevel.html','A Level Business']])}
 <li><a class="cta" href="resources.html">Downloads</a></li></ul></nav></div>`;
 const skip=document.createElement('a');skip.className='skip';skip.href='#main';skip.textContent='Skip to content';
 const bar=document.createElement('div');bar.className='progress';bar.setAttribute('aria-hidden','true');
 document.body.prepend(bar);document.body.prepend(hdr);document.body.prepend(skip);
 const main=document.querySelector('main');if(main&&!main.id)main.id='main';
 hdr.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===page){a.setAttribute('aria-current','page');}});
 const nav=hdr.querySelector('.nav'),burger=hdr.querySelector('.burger');
 const closeMenus=except=>hdr.querySelectorAll('.nav button').forEach(b=>{if(b!==except){b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).classList.remove('open');}});
 hdr.querySelectorAll('.nav button').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const o=b.getAttribute('aria-expanded')==='true';closeMenus(b);b.setAttribute('aria-expanded',String(!o));document.getElementById(b.getAttribute('aria-controls')).classList.toggle('open',!o);}));
 document.addEventListener('click',e=>{if(!hdr.contains(e.target))closeMenus();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenus();setNav(false);}});
 const setNav=o=>{nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.classList.toggle('nav-open',o);};
 burger.addEventListener('click',()=>setNav(!nav.classList.contains('open')));
 const top=document.createElement('button');top.className='to-top';top.setAttribute('aria-label','Back to top');top.textContent='↑';
 top.onclick=()=>scrollTo({top:0,behavior:'smooth'});document.body.append(top);
 addEventListener('scroll',()=>{const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);bar.style.width=(p*100)+'%';top.classList.toggle('show',h.scrollTop>600);},{passive:true});
 const ui=units.findIndex(u=>u[0]===page);
 if(ui>=0&&main){const p=document.createElement('nav');p.className='pager';p.setAttribute('aria-label','Unit navigation');
  p.innerHTML=(ui>0?`<a href="${units[ui-1][0]}"><small>← Unit ${ui}</small>${units[ui-1][1]}</a>`:'')+(ui<5?`<a class="next" href="${units[ui+1][0]}"><small>Unit ${ui+2} →</small>${units[ui+1][1]}</a>`:'');
  const f=main.querySelector('footer');f?main.insertBefore(p,f):main.append(p);}
})();
