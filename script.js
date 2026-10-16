// CONTACT : remplir ces champs avant la mise en ligne.
// Laisser un champ vide pour ne pas afficher le lien correspondant.
const CONTACT = {
  email: "", // Exemple : "mamilouartisanat@gmail.com"
  telephone: "", // Exemple : "5144625090"
  facebook: "" // Exemple : "https://www.facebook.com/mamilou.creations"
};

// Chaque entrée correspond à une des photographies fournies.
const creations = [
  {image:"img_3725",titre:"Décorations murales",categorie:"macrame",detail:"Macramé artisanal"},
  {image:"img_3726",titre:"Attrape-rêves et hiboux",categorie:"macrame",detail:"Décorations à suspendre"},
  {image:"img_3727",titre:"Suspension en macramé",categorie:"macrame",detail:"Pièce décorative"},
  {image:"img_3733",titre:"Attaches décoratives",categorie:"macrame",detail:"Accessoires faits main"},
  {image:"img_3736",titre:"Petite boîte textile",categorie:"couture",detail:"Rangement décoratif"},
  {image:"img_3731",titre:"Pochette compartimentée",categorie:"couture",detail:"Accessoire cousu"},
  {image:"img_3732",titre:"Rangement mural",categorie:"couture",detail:"Organisation et tissu"},
  {image:"img_3734",titre:"Petits accessoires",categorie:"couture",detail:"Pièces confectionnées à la main"},
  {image:"img_3745",titre:"Collection de bracelets",categorie:"bijoux",detail:"Bijoux et accessoires"},
  {image:"img_3738",titre:"Coffret décoratif",categorie:"bijoux",detail:"Objet artisanal"},
  {image:"img_3750",titre:"Fleurs faites main",categorie:"macrame",detail:"Créations florales"},
  {image:"img_3737",titre:"Signature Mamilou",categorie:"bijoux",detail:"Décoration d'atelier"}
];
const gallery = document.querySelector('#gallery');
function drawGallery(filter='all') {
  const items=creations.filter(item=>filter==='all'||item.categorie===filter);
  gallery.innerHTML=items.map(item=>`<article class="gallery-card"><button class="gallery-image" data-image="${item.image}" aria-label="Agrandir : ${item.titre}"><img loading="lazy" src="images/${item.image}.webp" alt="${item.titre}"></button><h3>${item.titre}</h3><p>${item.detail}</p></article>`).join('');
}
drawGallery();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});
  button.classList.add('active');button.setAttribute('aria-pressed','true');drawGallery(button.dataset.filter);
}));
const dialog=document.querySelector('#lightbox');
gallery.addEventListener('click',event=>{
  const target=event.target.closest('[data-image]');if(!target)return;
  const item=creations.find(c=>c.image===target.dataset.image);if(!item)return;
  dialog.querySelector('img').src=`images/${item.image}.webp`;
  dialog.querySelector('img').alt=item.titre;
  dialog.querySelector('p').textContent=item.titre;
  dialog.showModal();
});
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const methods=document.querySelector('#contact-methods');
const links=[];
if(CONTACT.email.trim())links.push({label:'Envoyer un courriel ↗',href:`mailto:${CONTACT.email.trim()}?subject=${encodeURIComponent('Demande pour Mamilou')}`});
if(CONTACT.telephone.trim())links.push({label:'Téléphoner ↗',href:`tel:${CONTACT.telephone.replace(/[^+0-9]/g,'')}`});
if(/^https:\/\//i.test(CONTACT.facebook.trim()))links.push({label:'Page Facebook ↗',href:CONTACT.facebook.trim()});
links.forEach(link=>{const a=document.createElement('a');a.textContent=link.label;a.href=link.href;if(link.href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer'}methods.appendChild(a)});
if(links.length)document.querySelector('#contact-pending').hidden=true;
document.querySelector('#year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.header nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
