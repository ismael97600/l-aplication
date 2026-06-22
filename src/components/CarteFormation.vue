<script setup>
import { RouterLink } from 'vue-router'
import { useFavorisStore } from '../stores/favoris.js'

const props = defineProps({
  formation: { type: Object, required: true },
})

const favoris = useFavorisStore()

function niveauBadge(niveau) {
  const map = { Débutant: 'debutant', Intermédiaire: 'intermediaire', Avancé: 'avance' }
  return map[niveau] ?? 'debutant'
}
</script>

<template>
  <article class="carte">
    <div class="carte-img-wrap">
      <img :src="formation.image" :alt="formation.titre" class="carte-img" loading="lazy" />
      <button
        class="fav-toggle"
        :class="{ active: favoris.estEnFavori(formation.id) }"
        @click.prevent="favoris.basculerFavori(formation)"
        :aria-label="favoris.estEnFavori(formation.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        {{ favoris.estEnFavori(formation.id) ? '♥' : '♡' }}
      </button>
      <span v-if="formation.certifiant" class="certifiant-badge">✓ Certifiant</span>
    </div>

    <div class="carte-body">
      <div class="carte-meta">
        <span class="badge" :class="`badge-${niveauBadge(formation.niveau)}`">
          {{ formation.niveau }}
        </span>
        <span class="duree">⏱ {{ formation.duree }}</span>
      </div>

      <h3 class="carte-titre">{{ formation.titre }}</h3>
      <p class="carte-desc">{{ formation.description }}</p>

      <div class="carte-footer">
        <span class="prix">{{ formation.prix.toLocaleString('fr-FR') }} €</span>
        <RouterLink :to="`/formations/${formation.id}`" class="btn btn-primary btn-sm">
          Voir détails →
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.carte {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
}

.carte:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-3px);
}

.carte-img-wrap {
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.carte-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.carte:hover .carte-img {
  transform: scale(1.04);
}

.fav-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.92);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  color: var(--text);
}

.fav-toggle:hover { transform: scale(1.15); }
.fav-toggle.active { color: #ef4444; }

.certifiant-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.carte-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.carte-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.duree {
  font-size: 13px;
  color: var(--text);
}

.carte-titre {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.carte-desc {
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.carte-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.prix {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-h);
}

.btn-sm {
  padding: 7px 16px;
  font-size: 14px;
}
</style>
