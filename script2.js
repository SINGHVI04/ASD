const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

const header = $('.site-header');
const offsetTop = el => el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 6;
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href').slice(1);
    const target=document.getElementById(id);
    if(!target) return;
    e.preventDefault();
    window.scrollTo({ top: offsetTop(target), behavior: 'smooth' });
  });
});


const toggleBtn = $('.menu-toggle');
const nav = toggleBtn ? document.getElementById(toggleBtn.getAttribute('aria-controls')) : null;
if(toggleBtn && nav){
  nav.hidden = true;
  toggleBtn.addEventListener('click', ()=>{
    const open = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
    document.body.classList.toggle('no-scroll', !open);
  });
  document.addEventListener('click', (e)=>{
    if(!nav.hidden && !nav.contains(e.target) && e.target!==toggleBtn){
      toggleBtn.click();
    }
  });
}

const reveals = $$('.reveal');
if('IntersectionObserver' in window && reveals.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });
  reveals.forEach(el=>io.observe(el));
}
