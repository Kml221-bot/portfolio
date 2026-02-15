// Formation académique
const edu = [
    { date: "2025 - 2026", title: "Licence 2", place: "Univers Professionnel • Dakar" },
    { date: "2024 - 2025", title: "Licence 1", place: "Univers Professionnel • Dakar" },
    { date: "2023 - 2024", title: "Bac Scientifique", place: "Lycée Cheikh Hamidou Kane • Dakar" }
];

// Expériences professionnelles
const exp = [
    { date: "Avril 2025", title: "Stage Génie Info", place: "Tout en Génie Informatique", desc: "Câblage, no-code low-code, graphisme." },
    { date: "Académique", title: "Sites Vitrines", place: "Freelance", desc: "Réalisation de sites responsives." }
];

// Mes certifications
const certs = [
    { title: "Certification Hack and fix", url: "https://academy.hackandfix.com/certificate-page/?user=11920&course=54789", color: "primary" },
    { title: "Mon certificat de redteamleaders", url: "https://courses.redteamleaders.com/exam-completion/7d83475c5da02ab0", color: "secondary" },
    { title: "Mon autre certificat de redteamleaders", url: "https://courses.redteamleaders.com/exam-completion/f8f0c39044f09fb2", color: "secondary" },
    { title: "Mon autre certificat de hack and fix", url: "https://academy.hackandfix.com/certificate-page/?user=11920&course=53700", color: "primary" }
];

// Mes projets
const projects = [
    { title: "Gestion Banquaire", desc: "Plateforme de gestion pour entreprises.", tags: ["JS", "Swing"], img: "https://i.postimg.cc/fk482kjW/image.png", link: "https://github.com/Kml221-bot/java" }, 
    { title: "Site web du club informatique", desc: "Site web responsive pour le club informatique de UNIPRO.", tags: ["HTML", "TAILWIND-CSS", "Node.js", "TS"], img: "https://i.postimg.cc/FFJ5ZSh0/image.png", link: "https://kml221-bot.github.io/Unipro/" },
    { title: "Site immobilier", desc: "Un site immobilier statique.", tags: ["HTML", "CSS"], img: "https://i.postimg.cc/dtVL7NxG/Whats-App-Image-2026-02-14-at-12-28-40.jpg", link: "https://kml221-bot.github.io/site22/" }
];

/**
 * @param {Array} data 
 * @param {string} containerId 
 * @param {string} color 
 */
const renderTimeline = (data, containerId, color) => {
    document.getElementById(containerId).innerHTML = data.map(i => `
        <div class="relative pl-8">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-${color}"></div>
            <span class="text-sm text-${color} font-bold">${i.date}</span>
            <h3 class="text-xl font-bold mt-1">${i.title}</h3>
            <p class="text-slate-400">${i.place}</p>
            ${i.desc ? `<p class="text-slate-500 text-sm mt-2">${i.desc}</p>` : ''}
        </div>`).join('');
};

// Affichage de la section Formation
renderTimeline(edu, 'edu-container', 'primary');

// Affichage de la section Expériences
renderTimeline(exp, 'exp-container', 'secondary');

// Affichage des certifications
document.getElementById('cert-container').innerHTML = certs.map(c => `
    <a href="${c.url}" target="_blank" class="w-full md:w-2/3 px-6 py-4 border-2 border-${c.color} text-${c.color} rounded-lg font-semibold hover:bg-${c.color} hover:text-white transition-all"><i class="fas fa-award mr-2"></i> ${c.title}</a>`).join('');

// Affichage des projets et overplay opacité 0 qui devient 100 au hover avec un bouton pour voir le projet
document.getElementById('projects-container').innerHTML =
projects.map(p => `
    <article class="relative bg-card rounded-xl overflow-hidden shadow-lg transition-all group">

        <div class="relative">
            <img src="${p.img}" class="w-full h-48 object-cover">

            <div class="absolute inset-0 bg-black/60 opacity-0 
                        group-hover:opacity-100 
                        transition-all duration-300 
                        flex items-center justify-center">

                <a href="${p.link}" target="_blank"
                   class="bg-primary text-white px-5 py-2 rounded-full 
                          transform scale-90 group-hover:scale-100 
                          transition-all">
                    Voir le projet
                </a>

            </div>
        </div>

        <div class="p-6">
            <h3 class="text-xl font-bold mb-2">${p.title}</h3>
            <p class="text-slate-400 text-sm mb-4">${p.desc}</p>

            <div class="flex gap-2 flex-wrap">
                ${p.tags.map(t =>
                    `<span class="px-2 py-1 text-xs bg-slate-700 rounded-full">${t}</span>`
                ).join('')}
            </div>
        </div>

    </article>
`).join('');

// Gestion du menu mobile 
document.getElementById('mobile-menu-btn').onclick = () => document.getElementById('mobile-menu').classList.toggle('hidden');

// C'est pour observer pour les animations au scroll 
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('active'));
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gestion du formulaire de contact
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault(); 
    const btn = e.target.querySelector('button');
    btn.innerText = "Envoi..."; 
    
    // Simulation d'envoi (1 seconde)
    setTimeout(() => {
        // Affichage du toast de confirmation
        document.getElementById('toast').classList.remove('translate-y-20', 'opacity-0');
        e.target.reset(); 
        btn.innerText = "Envoyer"; 
        
        // Masquage du toast après 3 secondes
        setTimeout(() => document.getElementById('toast').classList.add('translate-y-20', 'opacity-0'), 3000);
    }, 1000);
};

// Initialisation du canvas pour l'effet de particules dans la section hero
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Fonction pour ajuster la taille du canvas à la fenêtre
const resize = () => { 
    canvas.width = innerWidth; 
    canvas.height = innerHeight; 
};
window.onresize = resize; 
resize(); 

// Création de 60 particules avec positions et vitesses aléatoires
for(let i=0; i<60; i++) {
    particles.push({
        x: Math.random() * canvas.width,  
        y: Math.random() * canvas.height, 
        vx: (Math.random() - 0.5),        
        vy: (Math.random() - 0.5)       
    });
}

/*
Fonction d'animation qui crée l'effet de particules connectées
S'exécute en boucle via requestAnimationFrame
 */
const animate = () => {
    // Effacer le canvas à chaque frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
        // Déplacement de la particule
        p.x += p.vx; 
        p.y += p.vy;
        
        // Rebond sur les bords de l'écran
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Dessiner la particule 
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Connexion avec les autres particules proches 
        for(let j = i + 1; j < particles.length; j++) {
            const d = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
            if(d < 150) {
                // Ligne violet avec opacité basée sur la distance
                ctx.strokeStyle = `rgba(139,92,246,${1 - d/150})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    
    requestAnimationFrame(animate);
};

// Démarrage de l'animation
animate();
