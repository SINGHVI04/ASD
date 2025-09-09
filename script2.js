const qs = (s, el=document)=>el.querySelector(s);
const qsa = (s, el=document)=>[...el.querySelectorAll(s)];


// Menu toggle for small screens
const menuBtn = qs('.menu-toggle');
const nav = qs('#primary-nav');
menuBtn?.addEventListener('click', ()=>{
const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
menuBtn.setAttribute('aria-expanded', String(!expanded));
nav.style.display = expanded ? '' : 'flex';
});


// Reveal on scroll
const reveals = qsa('.reveal');
const handleReveal = ()=>{
const top = window.innerHeight * 0.85;
reveals.forEach(el=>{
const r = el.getBoundingClientRect();
if(r.top < top) el.classList.add('visible');
})
}
window.addEventListener('scroll', handleReveal); handleReveal();


// Portrait parallax / tilt
const portrait = qs('#portraitCard');
const applyTilt = (el, x, y, strength=14)=>{
// x,y are -1..1
el.style.transform = `rotateX(${y*strength}deg) rotateY(${x*strength}deg) translateZ(6px)`;
}
if(portrait){
portrait.addEventListener('mousemove', (e)=>{
const r = portrait.getBoundingClientRect();
const x = (e.clientX - r.left) / r.width * 2 - 1;
const y = (e.clientY - r.top) / r.height * 2 - 1;
applyTilt(portrait, x, -y, 6);
});
portrait.addEventListener('mouseleave', ()=>{portrait.style.transform='none'});
portrait.addEventListener('touchmove', (ev)=>{
const t = ev.touches[0];
const r = portrait.getBoundingClientRect();
const x = (t.clientX - r.left) / r.width * 2 - 1;
const y = (t.clientY - r.top) / r.height * 2 - 1;
applyTilt(portrait, x, -y, 6);
}, {passive:true});
}


// Card tilt effect (lightweight) for elements with data-tilt
qsa('[data-tilt]').forEach(card=>{
const strength = 8;
card.addEventListener('mousemove', e=>{
const r = card.getBoundingClientRect();
const x = (e.clientX - r.left)/r.width * 2 - 1;
const y = (e.clientY - r.top)/r.height * 2 - 1;
card.style.transform = `rotateX(${ -y * strength }deg) rotateY(${ x * strength }deg) translateZ(8px)`;
});
card.addEventListener('mouseleave', ()=>{card.style.transform = ''});
// subtle floating
card.animate([{transform:'translateY(0px)'},{transform:'translateY(-6px)'},{transform:'translateY(0px)'}],{duration:4000 + Math.random()*2000,iterations:Infinity, direction:'alternate', easing:'ease-in-out'})
});


// subtle parallax on mouse for the whole page background
let raf = null;
window.addEventListener('mousemove', e=>{
const x = (e.clientX / innerWidth - 0.5) * 20; // -10..10
const y = (e.clientY / innerHeight - 0.5) * 10; // -5..5
if(raf) cancelAnimationFrame(raf);
raf = requestAnimationFrame(()=>{
document.body.style.backgroundPosition = `${50 - x}% ${30 - y}%`;
});
});
