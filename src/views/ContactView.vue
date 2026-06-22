<script setup>
import { ref, reactive } from 'vue'

const envoye = ref(false)
const envoi = ref(false)

const form = reactive({
  nom: '',
  email: '',
  sujet: '',
  message: '',
})

const erreurs = reactive({})

function valider() {
  Object.keys(erreurs).forEach((k) => delete erreurs[k])
  if (!form.nom.trim()) erreurs.nom = 'Le nom est requis.'
  if (!form.email.trim()) erreurs.email = "L'email est requis."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    erreurs.email = "L'adresse email n'est pas valide."
  if (!form.message.trim()) erreurs.message = 'Le message est requis.'
  return Object.keys(erreurs).length === 0
}

function soumettre() {
  if (!valider()) return
  envoi.value = true
  setTimeout(() => {
    envoye.value = true
    envoi.value = false
    form.nom = ''
    form.email = ''
    form.sujet = ''
    form.message = ''
  }, 1200)
}
</script>

<template>
  <div class="contact-page">
    <div class="container contact-inner">
      <div class="contact-info">
        <h1>Contactez-nous</h1>
        <p class="subtitle">
          Une question sur nos formations ? Vous souhaitez vous inscrire ? Nous sommes là pour vous aider.
        </p>

        <div class="infos-list">
          <div class="info-item">
            <span class="info-icon">📧</span>
            <div>
              <strong>Email</strong>
              <span>contact@formapro.fr</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <div>
              <strong>Téléphone</strong>
              <span>+33 1 23 45 67 89</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕐</span>
            <div>
              <strong>Horaires</strong>
              <span>Lun – Ven, 9h – 18h</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div>
              <strong>Adresse</strong>
              <span>12 rue du Numérique, 75001 Paris</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-card">
        <div v-if="envoye" class="succes">
          <span>✅</span>
          <h2>Message envoyé !</h2>
          <p>Nous vous répondrons dans les 24 heures.</p>
          <button class="btn btn-outline" @click="envoye = false">Envoyer un autre message</button>
        </div>

        <form v-else @submit.prevent="soumettre">
          <h2>Envoyer un message</h2>

          <div class="champ" :class="{ erreur: erreurs.nom }">
            <label for="nom">Nom complet *</label>
            <input id="nom" v-model="form.nom" type="text" placeholder="Jean Dupont" />
            <span v-if="erreurs.nom" class="erreur-msg">{{ erreurs.nom }}</span>
          </div>

          <div class="champ" :class="{ erreur: erreurs.email }">
            <label for="email">Email *</label>
            <input id="email" v-model="form.email" type="email" placeholder="jean@example.com" />
            <span v-if="erreurs.email" class="erreur-msg">{{ erreurs.email }}</span>
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
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              placeholder="Votre message..."
            ></textarea>
            <span v-if="erreurs.message" class="erreur-msg">{{ erreurs.message }}</span>
          </div>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="envoi">
            {{ envoi ? 'Envoi en cours…' : 'Envoyer le message' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  padding: 60px 0 80px;
}

.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 40px;
}

.infos-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.info-icon { font-size: 22px; }

.info-item div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-item strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-h);
}

.info-item span {
  font-size: 14px;
  color: var(--text);
}

.form-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 36px;
}

.form-card h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 28px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
}

input,
textarea,
select {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  background: var(--bg);
  color: var(--text-h);
  transition: border-color 0.15s;
  width: 100%;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--accent);
}

.champ.erreur input,
.champ.erreur textarea {
  border-color: #ef4444;
}

.erreur-msg {
  font-size: 13px;
  color: #ef4444;
}

textarea { resize: vertical; }

.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 12px;
  font-size: 16px;
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.succes {
  text-align: center;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.succes span { font-size: 48px; }

.succes h2 {
  font-size: 22px;
  margin: 0;
}

.succes p {
  color: var(--text);
  font-size: 15px;
}
</style>
