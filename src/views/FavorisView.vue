<script setup>
import { RouterLink } from 'vue-router'
import { useFavorisStore } from '../stores/favoris.js'
import CarteFormation from '../components/CarteFormation.vue'

const favoris = useFavorisStore()
</script>

<template>
  <div class="container favoris-page">
    <div class="page-header">
      <h1>Mes favoris</h1>
      <p v-if="favoris.nombreFavoris > 0">
        {{ favoris.nombreFavoris }} formation{{ favoris.nombreFavoris > 1 ? 's' : '' }} sauvegardée{{ favoris.nombreFavoris > 1 ? 's' : '' }}
      </p>
    </div>

    <div v-if="favoris.nombreFavoris > 0">
      <div class="actions-bar">
        <button class="btn btn-outline" @click="favoris.favoris = []">
          🗑 Vider les favoris
        </button>
      </div>
      <div class="grille">
        <CarteFormation v-for="f in favoris.favoris" :key="f.id" :formation="f" />
      </div>
    </div>

    <div v-else class="vide">
      <span class="vide-icon">🤍</span>
      <h2>Aucun favori pour l'instant</h2>
      <p>Parcourez le catalogue et ajoutez des formations qui vous intéressent.</p>
      <RouterLink to="/formations" class="btn btn-primary">Voir le catalogue</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.favoris-page {
  padding: 48px 0 80px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 6px;
}

.page-header p {
  color: var(--text);
  font-size: 15px;
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 28px;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.vide {
  text-align: center;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.vide-icon { font-size: 56px; }

.vide h2 {
  font-size: 22px;
  margin: 0;
}

.vide p {
  color: var(--text);
  font-size: 16px;
  max-width: 360px;
}
</style>
