// ==========================================================================
// GALINDA & WICKED - AMOR Y AMISTAD EDITION
// Lógica Interactiva, Web Audio Sintetizado, Partículas y Supabase
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initBubbleGenerator();
  initWebAudio();
  initSurveyForm();
  initAdminModal();
});

// ==========================================================================
// 1. EFECTO DE PARTÍCULAS DE ESTRELLA (CURSOR SPARKLE TRAIL)
// ==========================================================================
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = ['#ff4389', '#ff8ebb', '#fbbf24', '#fef3c7', '#e9d5ff', '#ffffff'];

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2 + 0.6;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.rotation = Math.random() * Math.PI * 2;
      this.vRot = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.rotation += this.vRot;
      this.size *= 0.97;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;

      // Dibujar destello de 4 puntas
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(0, -this.size * 1.5);
        ctx.lineTo(this.size * 0.3, -this.size * 0.3);
        ctx.rotate(Math.PI / 2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function addParticles(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      particles.push(new Sparkle(x + (Math.random() - 0.5) * 12, y + (Math.random() - 0.5) * 12));
    }
  }

  window.addEventListener('mousemove', (e) => {
    addParticles(e.clientX, e.clientY, 2);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      addParticles(e.touches[0].clientX, e.touches[0].clientY, 3);
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0 || p.size < 0.5) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Función global para crear explosión de brillos (ej: al responder SHI)
  window.triggerSparkleExplosion = (x, y, count = 35) => {
    for (let i = 0; i < count; i++) {
      const p = new Sparkle(x, y);
      p.vx = (Math.random() - 0.5) * 9;
      p.vy = (Math.random() - 0.5) * 9;
      p.size = Math.random() * 8 + 3;
      particles.push(p);
    }
  };
}

// ==========================================================================
// 2. GENERADOR DE BURBUJAS FLOTANTES DE OZ (CON SONIDO)
// ==========================================================================
function initBubbleGenerator() {
  const container = document.getElementById('bubbles-container');
  if (!container) return;

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';

    const size = Math.random() * 45 + 25; // 25px a 70px
    const left = Math.random() * 95; // 0% a 95%
    const duration = Math.random() * 8 + 9; // 9s a 17s

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;

    bubble.addEventListener('click', (e) => {
      popBubble(bubble, e.clientX, e.clientY);
    });

    bubble.addEventListener('touchstart', (e) => {
      if (e.touches[0]) {
        popBubble(bubble, e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    container.appendChild(bubble);

    setTimeout(() => {
      if (bubble.parentElement) {
        bubble.remove();
      }
    }, duration * 1000);
  }

  function popBubble(bubbleEl, x, y) {
    if (window.playBubbleSound) {
      window.playBubbleSound();
    }
    if (window.triggerSparkleExplosion) {
      window.triggerSparkleExplosion(x, y, 20);
    }
    bubbleEl.remove();
  }

  // Generar burbujas periódicamente
  setInterval(createBubble, 1400);

  // Crear 10 iniciales a diferentes alturas
  for (let i = 0; i < 8; i++) {
    setTimeout(createBubble, i * 400);
  }
}

// ==========================================================================
// 3. SÍNTESIS DE AUDIO WEB (CAMPANILLAS Y MÚSICA DE OZ)
// ==========================================================================
function initWebAudio() {
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicInterval = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Sonido de Campanilla Mágica al Reventar Burbuja
  window.playBubbleSound = function () {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Frecuencias pentatónicas mágicas de campanilla
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(randomNote * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.log('Audio no iniciado aún por interacción del usuario', e);
    }
  };

  // Sonido especial de Brillos Triunfales (para "Popular" o "SHI")
  window.playTriumphSound = function () {
    try {
      const ctx = getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.18, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.5);
        }, idx * 70);
      });
    } catch (e) {}
  };

  // Música Ambiental de Oz (Melodía de Arpa y Caja de Música)
  const musicBtn = document.getElementById('btn-music-toggle');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const ctx = getAudioContext();
      if (!isPlayingMusic) {
        isPlayingMusic = true;
        musicBtn.innerHTML = '✨ Silenciar Oz 🫧';
        startAmbientHarp(ctx);
      } else {
        isPlayingMusic = false;
        musicBtn.innerHTML = '🎵 Música de Oz ✨';
        stopAmbientHarp();
      }
    });
  }

  function startAmbientHarp(ctx) {
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // Escala Mayor de C
    let step = 0;

    musicInterval = setInterval(() => {
      if (!isPlayingMusic) return;
      const note = scale[step % scale.length];
      step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    }, 450);
  }

  function stopAmbientHarp() {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }
}

// ==========================================================================
// 4. ENCUESTA DE AMOR Y AMISTAD & CONEXIÓN SUPABASE
// ==========================================================================
function initSurveyForm() {
  const form = document.getElementById('amor-survey-form');
  const optionLabels = document.querySelectorAll('.survey-option-label');
  const successScreen = document.getElementById('survey-success-screen');
  const summaryAnswerBadge = document.getElementById('summary-answer-badge');

  let selectedAnswer = null;

  // Manejo de Selección de Opciones ('si', 'no', 'SHI', 'ÑO')
  optionLabels.forEach((label) => {
    const radio = label.querySelector('input[type="radio"]');

    label.addEventListener('click', (e) => {
      optionLabels.forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');
      radio.checked = true;
      selectedAnswer = radio.value;

      const rect = label.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Efectos según la respuesta elegida
      if (selectedAnswer === 'SHI' || selectedAnswer === 'si') {
        if (window.triggerSparkleExplosion) {
          window.triggerSparkleExplosion(x, y, 40);
        }
        if (window.playTriumphSound) {
          window.playTriumphSound();
        }
      } else if (selectedAnswer === 'no' || selectedAnswer === 'ÑO') {
        // Reacción pícara de Galinda
        mostrarMensajeGalindaPicarona(label);
        if (window.playBubbleSound) {
          window.playBubbleSound();
        }
      }
    });

    // Pequeño guiño lúdico al pasar sobre "no" o "ÑO"
    if (label.dataset.value === 'no' || label.dataset.value === 'ÑO') {
      label.addEventListener('mouseenter', () => {
        label.style.transform = 'scale(0.96) rotate(-3deg)';
      });
      label.addEventListener('mouseleave', () => {
        if (!label.classList.contains('selected')) {
          label.style.transform = 'none';
        }
      });
    }
  });

  function mostrarMensajeGalindaPicarona(targetElement) {
    let existingToast = document.querySelector('.galinda-picaresca-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'galinda-picaresca-toast';
    toast.innerHTML = '👑 <strong>Galinda dice:</strong> <em>"¿Segura mi reina bella? ¡Un SHI es un millón de veces más Popular y fabuloso! ✨"</em>';

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #fff0f7, #fef3c7)',
      border: '2px solid #fbbf24',
      borderRadius: '25px',
      padding: '0.8rem 1.6rem',
      color: '#3b0764',
      fontSize: '0.95rem',
      boxShadow: '0 10px 30px rgba(251, 191, 36, 0.4)',
      zIndex: '10001',
      animation: 'fadeInPop 0.4s ease',
      maxWidth: '90%',
      textAlign: 'center'
    });

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  // Envío del Formulario
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!selectedAnswer) {
        alert('✨ Por favor selecciona una de las opciones mágicas: si, no, SHI o ÑO 💕');
        return;
      }

      const recommendationsText = document.getElementById('recommendations-input').value.trim();
      const submitBtn = document.getElementById('submit-survey-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '✨ Enviando tu deseo con magia... 🪄';

      const responseData = {
        id: crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now(),
        created_at: new Date().toISOString(),
        answer: selectedAnswer,
        recommendations: recommendationsText,
        author_name: 'Mi Reina Bella'
      };

      // 1. Guardar siempre en localStorage como respaldo seguro
      saveLocalResponse(responseData);

      // 2. Intentar guardar en Supabase si está configurado
      let supabaseSuccess = false;
      if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey) {
        try {
          const supabaseUrl = window.SUPABASE_CONFIG.url.trim();
          const supabaseKey = window.SUPABASE_CONFIG.anonKey.trim();

          // Inicializar cliente si la librería supabase-js está cargada
          if (window.supabase) {
            const client = window.supabase.createClient(supabaseUrl, supabaseKey);
            const { error } = await client
              .from('love_survey_responses')
              .insert([{
                answer: responseData.answer,
                recommendations: responseData.recommendations,
                author_name: responseData.author_name
              }]);

            if (!error) {
              supabaseSuccess = true;
            } else {
              console.warn('Error al insertar en Supabase:', error);
            }
          }
        } catch (err) {
          console.warn('Error de conexión con Supabase:', err);
        }
      }

      // Mostrar pantalla de éxito
      setTimeout(() => {
        form.style.display = 'none';
        successScreen.classList.add('active');
        if (summaryAnswerBadge) {
          summaryAnswerBadge.textContent = `Tu respuesta elegida: ${selectedAnswer} 💕`;
        }

        // Celebración con brillos
        if (window.triggerSparkleExplosion) {
          window.triggerSparkleExplosion(window.innerWidth / 2, window.innerHeight / 2, 60);
        }
        if (window.playTriumphSound) {
          window.playTriumphSound();
        }
      }, 800);
    });
  }

  function saveLocalResponse(item) {
    try {
      const stored = JSON.parse(localStorage.getItem('wicked_survey_responses') || '[]');
      stored.unshift(item);
      localStorage.setItem('wicked_survey_responses', JSON.stringify(stored));
    } catch (err) {
      console.error('Error guardando en localStorage:', err);
    }
  }
}

// ==========================================================================
// 5. PANEL SECRETO DE ADMINISTRACIÓN (#admin o Botón de Corona)
// ==========================================================================
function initAdminModal() {
  const modal = document.getElementById('admin-modal-overlay');
  const closeBtn = document.getElementById('btn-close-admin-modal');
  const pinScreen = document.getElementById('admin-pin-screen');
  const dataScreen = document.getElementById('admin-data-screen');
  const pinInput = document.getElementById('admin-pin-input');
  const pinSubmitBtn = document.getElementById('btn-submit-pin');
  const crownSecretButtons = document.querySelectorAll('.btn-secret-crown, .crown-admin-trigger');
  const tableBody = document.getElementById('admin-responses-tbody');
  const emptyMessage = document.getElementById('admin-empty-message');

  function openAdmin() {
    if (!modal) return;
    modal.classList.add('active');
    pinScreen.style.display = 'block';
    dataScreen.style.display = 'none';
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }

  function closeAdmin() {
    if (!modal) return;
    modal.classList.remove('active');
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  crownSecretButtons.forEach(btn => btn.addEventListener('click', openAdmin));
  if (closeBtn) closeBtn.addEventListener('click', closeAdmin);

  // Abrir si la URL contiene #admin
  if (window.location.hash === '#admin') {
    openAdmin();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openAdmin();
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAdmin();
    });
  }

  if (pinSubmitBtn && pinInput) {
    pinSubmitBtn.addEventListener('click', verifyPinAndLoad);
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyPinAndLoad();
    });
  }

  async function verifyPinAndLoad() {
    const enteredPin = pinInput.value.trim();
    const correctPin = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.adminPin) ? window.SUPABASE_CONFIG.adminPin : '2026';

    if (enteredPin === correctPin) {
      pinScreen.style.display = 'none';
      dataScreen.style.display = 'block';
      await loadResponses();
    } else {
      alert('🔒 PIN incorrecto. Intenta con: 2026');
      pinInput.value = '';
      pinInput.focus();
    }
  }

  async function loadResponses() {
    tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 2rem;">✨ Cargando respuestas de Oz...</td></tr>';
    let allResponses = [];

    // 1. Cargar desde Supabase si existe configuración
    if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey && window.supabase) {
      try {
        const client = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
        const { data, error } = await client
          .from('love_survey_responses')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          allResponses = data;
        }
      } catch (e) {
        console.warn('No se pudo conectar a Supabase, cargando datos locales:', e);
      }
    }

    // 2. Si no hay de Supabase, cargar desde localStorage
    if (allResponses.length === 0) {
      try {
        const local = JSON.parse(localStorage.getItem('wicked_survey_responses') || '[]');
        allResponses = local;
      } catch (e) {}
    }

    // Renderizar en tabla
    if (allResponses.length === 0) {
      tableBody.innerHTML = '';
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      tableBody.innerHTML = allResponses.map(item => {
        const dateFormatted = new Date(item.created_at).toLocaleString();
        const ansClass = item.answer;
        return `
          <tr>
            <td><strong>${dateFormatted}</strong></td>
            <td><span class="badge-answer ${ansClass}">${item.answer}</span></td>
            <td>${escapeHTML(item.recommendations || 'Sin sugerencias escritas')}</td>
          </tr>
        `;
      }).join('');
    }
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }
}

