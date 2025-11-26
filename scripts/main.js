// Données des galeries de projets
const projectGalleries = {
    zelda: {
        title: "Jeu sur Terminal - Zelda",
        images: [
            { src: "images/zelda1.png", alt: "Vue principale" },
            { src: "images/zelda2.png", alt: "Gameplay" },
        ],
    },
    puissance4: {
        title: "Puissance 4",
        images: [
            { src: "images/connect4.png", alt: "Interface du jeu" },
            { src: "images/connect4.2.png", alt: "Partie en cours" }
        ],
    }
};

let currentGallery = null;
let currentImageIndex = 0;

// Ouvrir la galerie
function openGallery(projectId) {
    currentGallery = projectGalleries[projectId];
    if (!currentGallery) return;

    currentImageIndex = 0;
    
    document.getElementById('gallery-title').textContent = currentGallery.title;
    document.getElementById('gallery-popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    
    // Créer les miniatures
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    currentGallery.images.forEach((image, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '');
        thumb.onclick = () => showImage(index);
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.onerror = () => {
            thumb.innerHTML = currentGallery.placeholder;
            thumb.style.fontSize = '32px';
            thumb.style.color = 'var(--text-dark)';
        };
        
        thumb.appendChild(img);
        thumbnailsContainer.appendChild(thumb);
    });
    
    showImage(0);
}

// Afficher une image spécifique
function showImage(index) {
    currentImageIndex = index;
    const image = currentGallery.images[index];
    
    const mainImg = document.getElementById('main-image');
    const placeholder = document.getElementById('main-placeholder');
    
    mainImg.src = image.src;
    mainImg.alt = image.alt;
    
    mainImg.onerror = () => {
        mainImg.style.display = 'none';
        placeholder.style.display = 'flex';
        placeholder.textContent = currentGallery.placeholder;
    };
    
    mainImg.onload = () => {
        mainImg.style.display = 'block';
        placeholder.style.display = 'none';
    };
    
    // Mettre à jour le compteur
    document.getElementById('gallery-counter').textContent = 
        `${index + 1} / ${currentGallery.images.length}`;
    
    // Mettre à jour les miniatures actives
    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Image suivante
function nextImage() {
    const nextIndex = (currentImageIndex + 1) % currentGallery.images.length;
    showImage(nextIndex);
}

// Image précédente
function prevImage() {
    const prevIndex = (currentImageIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
    showImage(prevIndex);
}

// Fermer la galerie
function closeGallery() {
    document.getElementById('gallery-popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    currentGallery = null;
}

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (!currentGallery) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeGallery();
});

// Gestion du thème
function toggleTheme() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Charger le thème sauvegardé au démarrage
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('theme-btn');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '🌙';
    }
});

// Navigation entre les pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Popup de confirmation
function showPopup() {
    document.getElementById('popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function closePopup() {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

function handleSubmit(event) {
    showPopup();
}