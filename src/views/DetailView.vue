<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { formations } from '../data/formations.js'
import { useFavorisStore } from '../stores/favoris.js'

const route = useRoute()
const favoris = useFavorisStore()

const formation = computed(() =>
  formations.find((f) => f.id === Number(route.params.id))
)

function niveauBadge(niveau) {
  const map = { Débutant: 'debutant', Intermédiaire: 'intermediaire', Avancé: 'avance' }
  return map[niveau] ?? 'debutant'
}
</script>

<template>
  <div class="container detail-page">
    <div v-if="!formation" class="not-found">
      <h2>Formation introuvable</h2>
      <RouterLink to="/formations" class="btn btn-primary">← Retour au catalogue</RouterLink>
    </div>

    <template v-else>
      <RouterLink to="/formations" class="retour">← Retour aux formations</RouterLink>

      <div class="detail-grid">
        <div class="detail-left">
          <div class="img-wrap">
            <img :src="formation.image" :alt="formation.titre" />
            <span v-if="formation.certifiant" class="certifiant-badge">✓ Formation certifiante</span>
          </div>
        </div>

        <div class="detail-right">
          <div class="detail-meta">
            <span class="badge" :class="`badge-${niveauBadge(formation.niveau)}`">
              {{ formation.niveau }}
            </span>
            <span v-if="formation.certifiant" class="certif-tag">🏆 Certifiant</span>
          </div>

          <h1>{{ formation.titre }}</h1>
          <p class="description">{{ formation.description }}</p>

          <div class="infos">
            <div class="info-item">
              <span class="info-icon">⏱</span>
              <div>
                <span class="info-label">Durée</span>
                <span class="info-val">{{ formation.duree }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">👥</span>
              <div>
                <span class="info-label">Places disponibles</span>
                <span class="info-val">{{ formation.places }} places</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">📊</span>
              <div>
                <span class="info-label">Niveau</span>
                <span class="info-val">{{ formation.niveau }}</span>
              </div>
            </div>
          </div>

          <div class="prix-bloc">
            <span class="prix">{{ formation.prix.toLocaleString('fr-FR') }} €</span>
            <span class="prix-note">par participant</span>
          </div>

          <div class="actions">
            <RouterLink to="/contact" class="btn btn-primary">S'inscrire à cette formation</RouterLink>
            <button
              class="btn btn-outline fav-btn"
              :class="{ 'fav-active': favoris.estEnFavori(formation.id) }"
              @click="favoris.basculerFavori(formation)"
            >
              {{ favoris.estEnFavori(formation.id) ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  padding: 40px 0 80px;
}

.not-found {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.retour {
  display: inline-block;
  font-size: 14px;
  color: var(--text);
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 0.15s;
}

.retour:hover { color: var(--accent); }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.img-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.certifiant-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: var(--accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
}

.detail-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}

.certif-tag {
  font-size: 13px;
  color: var(--text);
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 32px;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--accent-bg);
  border-radius: 12px;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.info-icon { font-size: 20px; }

.info-item div {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 12px;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-val {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-h);
}

.prix-bloc {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 28px;
}

.prix {
  font-size: 40px;
  font-weight: 700;
  color: var(--text-h);
}

.prix-note {
  font-size: 14px;
  color: var(--text);
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.fav-btn.fav-active {
  color: #ef4444;
  border-color: #ef4444;
}
</style>
