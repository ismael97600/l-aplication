<script setup>
import { ref, reactive } from 'vue'

const envoye = ref(false)
const envoi  = ref(false)
const secouer = ref(false)
const confettis = ref([])

const COULEURS = ['#aa3bff','#f093fb','#4facfe','#f5576c','#ffd200','#38ef7d','#ff9a3c']

const form = reactive({ nom: '', email: '', sujet: '', message: '' })
const erreurs = reactive({})

const infos = [
  { icon: '📧', label: 'Email',     valeur: 'contact@formapro.fr' },
  { icon: '📞', label: 'Téléphone', valeur: '+33 1 23 45 67 89' },
  { icon: '🕐', label: 'Horaires',  valeur: 'Lun – Ven, 9h – 18h' },
  { icon: '📍', label: 'Adresse',   valeur: '12 rue du Numérique, 75001 Paris' },
]

function valider() {
  Object.keys(erreurs).forEach((k) => delete erreurs[k])
  if (!form.nom.trim()) erreurs.nom = 'Le nom est requis.'
  if (!form.email.trim()) erreurs.email = "L'email est requis."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    erreurs.email = "L'adresse email n'est pas valide."
  if (!form.message.trim()) erreurs.message = 'Le message est requis.'
  return Object.keys(erreurs).length === 0
}

function lancerConfettis() {
  confettis.value = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    color: COULEURS[i % COULEURS.length],
    delay: Math.random() * 0.7,
    duree: 0.9 + Math.random() * 0.8,
    taille: 6 + Math.random() * 10,
    rotate: -360 + Math.random() * 720,
    forme: Math.random() > 0.5 ? '50%' : '2px',
  }))
  setTimeout(() => (confettis.value = []), 2800)
}

function ripple(e) {
  const btn = e.currentTarget
  const el = document.createElement('span')
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  el.className = 'ripple-wave'
  el.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  btn.appendChild(el)
  setTimeout(() => el.remove(), 700)
}

function soumettre() {
  if (!valider()) {
    secouer.value = true
    setTimeout(() => (secouer.value = false), 600)
    return
  }
  envoi.value = true
  setTimeout(() => {
    envoye.value = true
    envoi.value = false
    lancerConfettis()
    form.nom = form.email = form.sujet = form.message = ''
  }, 1400)
}
</script>

<template>
  <div class="contact-page">

    <!-- Blobs décoratifs animés -->
    <div class="blob blob-1" aria-hidden="true"></div>
    <div class="blob blob-2" aria-hidden="true"></div>
    <div class="blob blob-3" aria-hidden="true"></div>

    <div class="container contact-inner">

      <!-- ── Gauche ── -->
      <div class="contact-info">
        <h1 class="fade-up titre-gradient" style="--d:0s">Contactez-nous</h1>
        <p class="subtitle fade-up" style="--d:0.1s">
          Une question sur nos formations ? Vous souhaitez vous inscrire ?
          Nous sommes là pour vous aider.
        </p>

        <div class="infos-list">
          <div
            v-for="(item, i) in infos"
            :key="item.label"
            class="info-item fade-up"
            :style="`--d:${0.18 + i * 0.09}s`"
          >
            <span class="info-icon">{{ item.icon }}</span>
            <div>
              <strong>{{ item.label }}</strong>
              <span>{{ item.valeur }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Droite : carte formulaire ── -->
      <div class="form-wrap fade-up" style="--d:0.12s">
        <div class="form-card" :class="{ secoue: secouer }">

          <!-- Confettis -->
          <div class="confetti-zone" aria-hidden="true">
            <span
              v-for="c in confettis"
              :key="c.id"
              class="confetti-piece"
              :style="{
                left: c.x + '%',
                width: c.taille + 'px',
                height: c.taille + 'px',
                background: c.color,
                borderRadius: c.forme,
                animationDelay: c.delay + 's',
                animationDuration: c.duree + 's',
                '--rotate': c.rotate + 'deg',
              }"
            ></span>
          </div>

          <Transition name="swap" mode="out-in">

            <!-- État succès -->
            <div v-if="envoye" class="succes" key="succes">
              <span class="succes-emoji">✅</span>
              <h2>Message envoyé !</h2>
              <p>Nous vous répondrons dans les 24 heures.</p>
              <button class="btn btn-outline succes-btn" @click="envoye = false">
                Envoyer un autre message
              </button>
            </div>

            <!-- Formulaire -->
            <form v-else @submit.prevent="soumettre" key="form">
              <h2>Envoyer un message</h2>

              <div class="champ" :class="{ erreur: erreurs.nom }">
                <label for="nom">Nom complet *</label>
                <div class="input-wrap">
                  <input id="nom" v-model="form.nom" type="text" placeholder="Jean Dupont" />
                  <span class="focus-ring" aria-hidden="true"></span>
                </div>
                <Transition name="msg">
                  <span v-if="erreurs.nom" class="erreur-msg">{{ erreurs.nom }}</span>
                </Transition>
              </div>

              <div class="champ" :class="{ erreur: erreurs.email }">
                <label for="email">Email *</label>
                <div class="input-wrap">
                  <input id="email" v-model="form.email" type="email" placeholder="jean@example.com" />
                  <span class="focus-ring" aria-hidden="true"></span>
                </div>
                <Transition name="msg">
                  <span v-if="erreurs.email" class="erreur-msg">{{ erreurs.email }}</span>
                </Transition>
              </div>

              <div class="champ">
                <label for="sujet">Sujet</label>
                <select id="sujet" v-model="form.sujet">
                  <option value="">Choisir un sujet…</option>
                  <option>Demande d'inscription</option>
                  <option>Renseignement sur une formation</option>
                  <option>Financement / OPCO</option>
                  <option>Autre</option>
                </select>
              </div>

              <div class="champ" :class="{ erreur: erreurs.message }">
                <label for="message">Message *</label>
                <div class="input-wrap">
                  <textarea id="message" v-model="form.message" rows="5" placeholder="Votre message..."></textarea>
                  <span class="focus-ring" aria-hidden="true"></span>
                </div>
                <Transition name="msg">
                  <span v-if="erreurs.message" class="erreur-msg">{{ erreurs.message }}</span>
                </Transition>
              </div>

              <button
                type="submit"
                class="btn btn-primary submit-btn"
                :disabled="envoi"
                @click="ripple"
              >
                <span v-if="envoi" class="spinner" aria-hidden="true"></span>
                {{ envoi ? 'Envoi en cours…' : 'Envoyer le message' }}
              </button>
            </form>

          </Transition>
        </div>
      </div>

    </div>
  </div>
</template>

<!-- Style global pour le ripple (élément créé dynamiquement via JS) -->
<style>
.ripple-wave {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: rippleAnim 0.65s linear forwards;
  pointer-events: none;
}
@keyframes rippleAnim {
  to { transform: scale(2.8); opacity: 0; }
}
</style>

<style scoped>
/* ── Blobs de fond ── */
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(40px, -30px) scale(1.1); }
  66%       { transform: translate(-25px, 20px) scale(0.9); }
}

.contact-page {
  position: relative;
  overflow: hidden;
  padding: 60px 0 80px;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: blobFloat 12s ease-in-out infinite;
}

.blob-1 {
  width: 450px; height: 450px;
  background: var(--accent);
  opacity: 0.09;
  top: -120px; left: -120px;
}
.blob-2 {
  width: 320px; height: 320px;
  background: #4facfe;
  opacity: 0.08;
  bottom: -80px; right: -80px;
  animation-delay: -5s;
}
.blob-3 {
  width: 200px; height: 200px;
  background: #f5576c;
  opacity: 0.06;
  top: 50%; left: 55%;
  animation-delay: -2.5s;
  animation-duration: 9s;
}

/* ── Entrée page ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up {
  animation: fadeUp 0.55s ease both;
  animation-delay: var(--d, 0s);
}

/* ── Titre dégradé animé ── */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.titre-gradient {
  background: linear-gradient(135deg, var(--text-h) 0%, var(--accent) 45%, #4facfe 80%, var(--text-h) 100%);
  background-size: 250% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 5s ease infinite;
}

/* ── Layout ── */
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .contact-inner { grid-template-columns: 1fr; gap: 40px; }
}

h1 { font-size: 36px; font-weight: 700; margin-bottom: 16px; }

.subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 40px;
}

/* ── Info items ── */
.infos-list { display: flex; flex-direction: column; gap: 8px; }

.info-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 12px;
  transition: background-color 0.25s, transform 0.25s;
  cursor: default;
}

.info-item:hover {
  background: var(--accent-bg);
  transform: translateX(8px);
}

.info-icon {
  font-size: 22px;
  flex-shrink: 0;
  display: inline-block;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.info-item:hover .info-icon {
  transform: scale(1.35) rotate(-10deg);
}

.info-item div   { display: flex; flex-direction: column; gap: 2px; }
.info-item strong { font-size: 14px; font-weight: 600; color: var(--text-h); }
.info-item span   { font-size: 14px; color: var(--text); }

/* ── Carte formulaire ── */
.form-wrap { position: relative; }

.form-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 36px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.form-card:hover { box-shadow: var(--shadow-hover); }

/* Shake sur erreur */
@keyframes secouer {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-9px); }
  30%       { transform: translateX(9px); }
  45%       { transform: translateX(-6px); }
  60%       { transform: translateX(6px); }
  75%       { transform: translateX(-3px); }
  90%       { transform: translateX(3px); }
}

.form-card.secoue { animation: secouer 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }

.form-card h2 { font-size: 22px; font-weight: 600; margin-bottom: 28px; }

/* ── Champs ── */
.champ { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }

label { font-size: 14px; font-weight: 500; color: var(--text-h); }

.input-wrap { position: relative; display: flex; }

input, textarea, select {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  background: var(--bg);
  color: var(--text-h);
  width: 100%;
  position: relative;
  z-index: 1;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Anneau lumineux pulsé au focus */
.focus-ring {
  position: absolute;
  inset: -3px;
  border-radius: 11px;
  border: 2px solid var(--accent);
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.2s;
}

@keyframes ringPulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent-bg); }
  50%       { box-shadow: 0 0 0 7px transparent; }
}

input:focus ~ .focus-ring,
textarea:focus ~ .focus-ring {
  opacity: 1;
  animation: ringPulse 1.6s ease infinite;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.champ.erreur input,
.champ.erreur textarea {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
}

textarea { resize: vertical; }
select { cursor: pointer; }

/* ── Messages d'erreur ── */
.msg-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.msg-leave-active { transition: opacity 0.15s ease; }
.msg-enter-from   { opacity: 0; transform: translateY(-5px); }
.msg-leave-to     { opacity: 0; }

.erreur-msg { font-size: 13px; color: #ef4444; }

/* ── Bouton envoi ── */
.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 12px;
  font-size: 16px;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(170, 59, 255, 0.45);
}

.submit-btn:not(:disabled):active { transform: translateY(1px); }
.submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

/* ── Spinner ── */
@keyframes spin { to { transform: rotate(360deg); } }

.spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

/* ── Transition formulaire ↔ succès ── */
.swap-enter-active { transition: opacity 0.38s ease, transform 0.38s ease; }
.swap-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.swap-enter-from   { opacity: 0; transform: translateY(16px) scale(0.97); }
.swap-leave-to     { opacity: 0; transform: translateY(-12px) scale(0.97); }

/* ── Page succès ── */
@keyframes pop {
  0%   { transform: scale(0) rotate(-15deg); }
  60%  { transform: scale(1.3) rotate(5deg); }
  100% { transform: scale(1) rotate(0); }
}

.succes {
  text-align: center;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.succes-emoji {
  font-size: 56px;
  display: inline-block;
  animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.succes h2 { font-size: 24px; margin: 0; }
.succes p  { color: var(--text); font-size: 15px; }

.succes-btn {
  margin-top: 8px;
  transition: transform 0.15s, box-shadow 0.2s;
}
.succes-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* ── Confettis ── */
.confetti-zone {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 20;
}

@keyframes confettiFall {
  0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(420px) rotate(var(--rotate)); opacity: 0; }
}

.confetti-piece {
  position: absolute;
  top: 0;
  animation: confettiFall var(--dur, 1.2s) ease-in var(--delay, 0s) both;
}
</style>
