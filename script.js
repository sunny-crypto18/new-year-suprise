

const scenes = document.querySelectorAll('.scene');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let current = 0;
let playing = false;
let autoPlayActive = true;

document.addEventListener('DOMContentLoaded', () => {
  try {
    setupNavigation();
    createFloatingHearts();
    createSparkles();
    setupMusicButton();
    autoPlaySequence();
    updateNavButtons();
  } catch (e) {
    console.error('Init:', e);
  }
});

function showScene(index) {
  if (index < 0 || index >= scenes.length) return;
  scenes[current].classList.remove('active');
  current = index;
  scenes[current].classList.add('active');
  updateNavButtons();
  
  // Scene index is 0-based, but scenes in HTML are numbered starting from 1
  // So scene5 (galaxy) = index 4, scene7 (slideshow) = index 6, etc.
  if (index === 4) setTimeout(() => initGalaxy(), 100);
  if (index === 6) startSlideshow();
  if (index === 8) createHeartPhotos();
  if (index === 9) envelopeAnimation();
  if (index === 10) startConstellationAnimation();
  if (index === 12) startMemoryLaneAnimation(); // Scene 13 in HTML = index 12
  if (index === 16) setTimeout(() => initParticleHeart(), 100); // Scene 17
  if (index === 17) setTimeout(() => initPolaroidAnimation(), 100); // Scene 18
  if (index === 18) setTimeout(() => initEndingSparkles(), 100); // Scene 19
}

function updateNavButtons() {
  // Show/hide prev buttons based on current scene
  prevBtns.forEach((btn, idx) => {
    if (current > 0) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
}

function setupNavigation() {
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
     
      if (current === 0) {
        startAutoPlayFromScene2();
       
        try {
          music.play().catch(e => console.log('Music play:', e));
          musicBtn.textContent = '🔊';
          playing = true;
        } catch (e) {
          console.log('Music error:', e);
        }
      }
      
      autoPlayActive = false; 
      if (current < scenes.length - 1) showScene(current + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      autoPlayActive = false;
      if (current > 0) showScene(current - 1);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      autoPlayActive = false;
      if (current < scenes.length - 1) showScene(current + 1);
    } else if (e.key === 'ArrowLeft') {
      autoPlayActive = false;
      if (current > 0) showScene(current - 1);
    }
  });
}


function startAutoPlayFromScene2() {
  const timing = [4000, 4000, 4000, 4000, 6000, 4000, 8000, 4000, 7000, 8000, 25000, 15000, 12000, 13000, 14000];
  let idx = 1;
  autoPlayActive = true;

  function advance() {
    if (idx < scenes.length - 1 && autoPlayActive) {
      setTimeout(() => {
        showScene(idx + 1);
        idx++;
        advance();
      }, timing[idx]);
    }
  }
  advance();
}


function autoPlaySequence() {
  const timing = [4000, 4000, 4000, 4000, 6000, 4000, 8000, 4000, 7000, 8000, 25000, 15000, 12000, 13000, 14000];
  let idx = 0;

  function advance() {
    
    if (idx > 0 && idx < scenes.length - 1 && autoPlayActive) {
      setTimeout(() => {
        showScene(idx + 1);
        idx++;
        advance();
      }, timing[idx]);
    }
  }

}

function setupMusicButton() {
  musicBtn.addEventListener('click', () => {
    try {
      if (!playing) {
        music.play().catch(e => console.log('Play:', e));
        musicBtn.textContent = '🔊';
      } else {
        music.pause();
        musicBtn.textContent = '🔇';
      }
      playing = !playing;
    } catch (e) {
      console.log('Music:', e);
    }
  });

  document.addEventListener('click', () => {
    if (!playing && music.paused) {
      try { music.play().catch(() => {}); } catch (e) {}
    }
  }, { once: true });
}


function createFloatingHearts() {
  const container = document.querySelector('.floating-hearts-container');
  if (!container) return;
  
  const hearts = ['❤️', '💕', '💖', '💗', '💝'];
  setInterval(() => {
    try {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '-50px';
      heart.style.animationDuration = (3 + Math.random() * 2) + 's';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 5500);
    } catch (e) {}
  }, 500);
}


function createSparkles() {
  const container = document.querySelector('.sparkles-bg');
  if (!container) return;
  
  try {
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(sparkle);
    }
  } catch (e) {}
}

function initGalaxy() {
  const canvas = document.getElementById('galaxyCanvas');
  if (!canvas) return;
  
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';

      for (let i = 0; i < 200; i++) {
        const x = Math.sin(i * 0.1 + time * 0.001) * canvas.width * 0.4 + canvas.width * 0.5;
        const y = Math.cos(i * 0.1 + time * 0.001) * canvas.height * 0.4 + canvas.height * 0.5;
        const size = Math.sin(i * 0.05 + time * 0.0005) * 1.5 + 2;
        ctx.globalAlpha = Math.sin(i * 0.1 + time * 0.001) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      time++;
      if (scenes[4].classList.contains('active')) {
        requestAnimationFrame(draw);
      }
    }
    draw();

    const orbits = document.querySelector('.orbiting-hearts');
    if (orbits) {
      orbits.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const h = document.createElement('div');
        h.classList.add('orbiting-heart');
        h.textContent = '💕';
        h.style.animationDelay = (i * 1.6) + 's';
        orbits.appendChild(h);
      }
    }
  } catch (e) {
    console.error('Galaxy:', e);
  }
}


function startSlideshow() {
  const img = document.getElementById('slideshow');
  const cap = document.getElementById('caption');
  if (!img || !cap) return;

  const images = ['images/img5.jpg', 'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg', 'images/img11.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img1.jpg'];
  const captions = ['Every memory with you is treasured forever.', 'Your laughter fills my heart with joy.', 'You are my favorite adventure.', 'In your eyes, I found my home.', 'Every moment with you feels like a dream.', 'You are my greatest blessing.', 'With you, everything feels perfect.', 'Your smile is my favorite view.', 'Every beat of my heart says your name.', 'You are my peace and my passion.', 'Forever starts with you.'];

  let idx = 0;
  function show() {
    if (!scenes[6].classList.contains('active')) return;
    img.style.animation = 'none';
    setTimeout(() => {
      img.src = images[idx];
      cap.textContent = captions[idx];
      img.style.animation = 'zoom-in 0.8s ease-out';
      createPetals();
      idx = (idx + 1) % images.length;
      setTimeout(show, 4000);
    }, 100);
  }
  show();
}

function createPetals() {
  const c = document.querySelector('.petals-container');
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.textContent = '🌸';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (3 + Math.random() * 2) + 's';
    c.appendChild(p);
  }
}


function createHeartPhotos() {
  const img = document.getElementById('heart-img');
  if (!img) return;

  const photos = ['images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg', 'images/img11.jpg', 'images/img1.jpg', 'images/img2.jpg'];
  let idx = 0;

  function change() {
    if (!scenes[8].classList.contains('active')) return;
    img.style.animation = 'none';
    setTimeout(() => {
      img.src = photos[idx];
      img.style.animation = 'fade-scale 1s ease-out';
      idx = (idx + 1) % photos.length;
      setTimeout(change, 1500);
    }, 100);
  }
  change();
}
function envelopeAnimation() {
  const env = document.getElementById('envelope');
  const letter = document.getElementById('letterContent');
  if (!env || !letter) return;
  
  env.style.display = 'block';
  letter.style.display = 'none';
  
  setTimeout(() => {
    env.style.display = 'none';
    letter.style.display = 'block';
  }, 2000);
}


function finalPhotosAnimation() {
  const photos = document.querySelectorAll('.shower-photo');
  if (photos.length === 0) return;
  
  photos.forEach((p, i) => {
    p.style.animation = 'none';
    setTimeout(() => {
      p.style.animation = `float-to-center 4s ease-in-out ${i * 0.2}s forwards`;
    }, 100);
  });
}

function startConstellationAnimation() {
  const stage = document.getElementById('constellationStage');
  const photos = Array.from(document.querySelectorAll('.constellation-photo'));
  const svg = document.getElementById('constellationSVG');
  const greeting = document.getElementById('constellationGreeting');
  const particleContainer = document.getElementById('constellationParticles');
  const core = document.getElementById('constellationCore');
  
  if (!stage || photos.length === 0) return;


  photos.forEach(p => { p.style.opacity = 0; });
  greeting.classList.remove('show');
  particleContainer.innerHTML = '';
  if (core) core.classList.remove('glow-pulse');


  const rect = stage.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768;
  const baseRadius = isMobile ? Math.min(rect.width, rect.height) * 0.15 : isTablet ? Math.min(rect.width, rect.height) * 0.2 : Math.min(rect.width, rect.height) * 0.25;
  
  
  const positions = [
    { x: centerX, y: centerY - baseRadius, angle: 0 },
    { x: centerX + baseRadius * 0.866, y: centerY - baseRadius * 0.5, angle: 60 },
    { x: centerX + baseRadius * 0.866, y: centerY + baseRadius * 0.5, angle: 120 },
    { x: centerX, y: centerY + baseRadius, angle: 180 }, 
    { x: centerX - baseRadius * 0.866, y: centerY + baseRadius * 0.5, angle: 240 },
    { x: centerX - baseRadius * 0.866, y: centerY - baseRadius * 0.5, angle: 300 },
    { x: centerX + baseRadius * 0.5, y: centerY - baseRadius * 0.3, angle: 30 },
    { x: centerX + baseRadius * 0.5, y: centerY + baseRadius * 0.3, angle: 150 },
    { x: centerX - baseRadius * 0.5, y: centerY + baseRadius * 0.3, angle: 210 },
    { x: centerX - baseRadius * 0.5, y: centerY - baseRadius * 0.3, angle: 270 },
    { x: centerX, y: centerY, angle: 0 } 
  ];

 
  if (core) {
    setTimeout(() => core.classList.add('glow-pulse'), 200);
  }

 
  photos.forEach((photo, i) => {
    const pos = positions[i % positions.length];
    const delay = i * 150 + 300;

    setTimeout(() => {
      photo.style.left = pos.x + 'px';
      photo.style.top = pos.y + 'px';
      photo.style.opacity = 1;
      photo.classList.add('photo-arrived');
    }, delay);
  });

  
  setTimeout(() => {
    drawConstellationLines(photos, positions, svg);
    createConstellationParticles(particleContainer, isMobile ? 40 : 80);
  }, 800 + photos.length * 150);

  
  const fadeOutDelay = 2200 + photos.length * 150;
  setTimeout(() => {
   
    photos.forEach(photo => {
      photo.style.transition = 'opacity 1s ease-out';
      photo.style.opacity = 0;
    });
    
    
    setTimeout(() => {
      greeting.classList.add('show');
      
      setTimeout(() => {
        if (current < scenes.length - 1) showScene(current + 1);
      }, 8000);
    }, 1200);
  }, fadeOutDelay);
}

function drawConstellationLines(photos, positions, svg) {
  if (!svg) return;
  const g = svg.getElementById('connectionLines');
  if (!g) return;
  
  
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 6], [1, 7], [2, 8], [3, 9], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 5]
  ];

  lines.forEach((pair, idx) => {
    if (pair[0] >= positions.length || pair[1] >= positions.length) return;
    
    const p1 = positions[pair[0]];
    const p2 = positions[pair[1]];
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('class', 'constellation-line');
    line.style.animationDelay = (idx * 80) + 'ms';
    
    g.appendChild(line);
  });
}

function createConstellationParticles(container, total = 80) {
  if (!container) return;
  let created = 0;
  
  const interval = setInterval(() => {
    if (created++ >= total) { clearInterval(interval); return; }
    
    const particle = document.createElement('div');
    particle.className = 'const-particle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 1 + Math.random() * 3;
    const duration = 3 + Math.random() * 3;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000 + 100);
  }, 50);
}

function createBloomHearts(container, total=30){
  if (!container) return;
  let created = 0;
  const interval = setInterval(()=>{
    if (created++ >= total) { clearInterval(interval); return; }
    const b = document.createElement('div');
    b.className = 'b-heart';
    b.textContent = '💕';
    const x = 20 + Math.random()*60; 
    const y = 60 + Math.random()*30;
    b.style.left = x + '%';
    b.style.top = y + '%';
    b.style.opacity = 1;
    container.appendChild(b);
    
    setTimeout(()=>{ b.style.transition = 'transform 3s ease-out, opacity 2.5s ease-out'; b.style.transform = 'translateY(-160px) scale(1.2)'; b.style.opacity = 0; }, 50 + Math.random()*200);
    setTimeout(()=> b.remove(), 3200 + Math.random()*800);
  }, 120);
}

// ===== NEW SCENE ANIMATIONS =====

function startMemoryLaneAnimation() {
  const wheel = document.getElementById('memoryWheel');
  if (!wheel) return;
  
  // Memory wheel is already spinning via CSS, nothing extra needed
  // Optional: Add interactive hover effects if needed
}

// ===== SCENE 17: 3D PARTICLE HEART ANIMATION =====
function initParticleHeart() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 150;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  class Particle {
    constructor() {
      this.angle = Math.random() * Math.PI * 2;
      this.radius = Math.random() * 200 + 50;
      this.x = centerX + Math.cos(this.angle) * this.radius;
      this.y = centerY + Math.sin(this.angle) * this.radius;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = `hsla(${Math.random() * 60 + 320}, 100%, ${Math.random() * 30 + 60}%, 0.8)`;
      this.targetAngle = this.angle;
      this.targetRadius = this.radius;
    }
    
    update() {
      // Heart shape formula
      const t = Date.now() * 0.001;
      this.targetAngle += 0.02;
      const heartX = 16 * Math.pow(Math.sin(this.targetAngle), 3);
      const heartY = -(13 * Math.cos(this.targetAngle) - 5 * Math.cos(2 * this.targetAngle) - 2 * Math.cos(3 * this.targetAngle) - Math.cos(4 * this.targetAngle));
      
      this.x += (centerX + heartX * 12 - this.x) * 0.05;
      this.y += (centerY + heartY * 12 - this.y) * 0.05;
      
      this.size = 2 + Math.sin(t + this.angle * 10) * 1.5;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    if (!scenes[16] || !scenes[16].classList.contains('active')) return;
    
    ctx.fillStyle = 'rgba(15, 10, 30, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ===== SCENE 18: POLAROID ANIMATION =====
function initPolaroidAnimation() {
  const cards = document.querySelectorAll('.polaroid-card');
  if (!cards.length) return;
  
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'polaroid-appear 0.8s ease-out forwards';
      card.style.animationDelay = (index * 0.2) + 's';
    }, 100);
  });
}

// Add CSS for polaroid appear animation
const polaroidStyle = document.createElement('style');
polaroidStyle.textContent = `
  @keyframes polaroid-appear {
    0% {
      opacity: 0;
      transform: translateY(-100px) rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(var(--rotation, 0deg)) scale(1);
    }
  }
  .polaroid-card:nth-child(1) { --rotation: -15deg; }
  .polaroid-card:nth-child(2) { --rotation: 8deg; }
  .polaroid-card:nth-child(3) { --rotation: -5deg; }
  .polaroid-card:nth-child(4) { --rotation: 12deg; }
`;
document.head.appendChild(polaroidStyle);

// ===== SCENE 19: ENDING SPARKLES =====
function initEndingSparkles() {
  const container = document.getElementById('endingSparkles');
  if (!container) return;
  
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
    container.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 3000);
  }, 200);
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('galaxyCanvas');
  if (canvas && scenes[4] && scenes[4].classList.contains('active')) {
    try { initGalaxy(); } catch (e) {}
  }
  
  const particleCanvas = document.getElementById('particleCanvas');
  if (particleCanvas && scenes[16] && scenes[16].classList.contains('active')) {
    try { initParticleHeart(); } catch (e) {}
  }
});

console.log('💕 You, My Forever Story - 19 Scenes (Epic Love Story Unfolds)');
console.log('🎵 Music: 6:02 | 🎬 Press Next or use Arrow Keys');
console.log('✨ New scenes: Memory Lane, Timeline, Love Notes, Particle Heart, Polaroids & Ending');
