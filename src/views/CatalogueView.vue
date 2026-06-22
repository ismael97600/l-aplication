<script setup>
import { ref, computed } from 'vue'
import { formations } from '../data/formations.js'
import CarteFormation from '../components/CarteFormation.vue'

const recherche = ref('')
const niveauFiltre = ref('Tous')
const triPar = ref('defaut')

const niveaux = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé']

const formationsFiltrees = computed(() => {
  let liste = [...formations]

  if (recherche.value.trim()) {
    const q = recherche.value.toLowerCase()
    liste = liste.filter(
      (f) =>
        f.titre.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    )
  }

  if (niveauFiltre.value !== 'Tous') {
    liste = liste.filter((f) => f.niveau === niveauFiltre.value)
  }

  if (triPar.value === 'prix-asc') liste.sort((a, b) => a.prix - b.prix)
  else if (triPar.value === 'prix-desc') liste.sort((a, b) => b.prix - a.prix)
  else if (triPar.value === 'duree') liste.sort((a, b) => a.duree.localeCompare(b.duree))

  return liste
})
</script>

<template>
  <div class="catalogue-page">
    <div class="container">
      <div class="page-header">
        <h1>Nos formations</h1>
        <p>{{ formationsFiltrees.length }} formation{{ formationsFiltrees.length > 1 ? 's' : '' }} disponible{{ formationsFiltrees.length > 1 ? 's' : '' }}</p>
      </div>

      <div class="filtres">
        <div class="recherche-wrap">
          <span class="recherche-icon">🔍</span>
          <input
            v-model="recherche"
            type="search"
            placeholder="Rechercher une formation..."
            class="recherche-input"
          />
        </div>

        <div class="filtres-row">
          <div class="niveau-filtres">
            <button
              v-for="n in niveaux"
              :key="n"
              class="niveau-btn"
              :class="{ active: niveauFiltre === n }"
              @click="niveauFiltre = n"
            >
              {{ n }}
            </button>
          </div>

          <select v-model="triPar" class="tri-select">
            <option value="defaut">Trier par défaut</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="duree">Durée</option>
          </select>
        </div>
      </div>

      <div v-if="formationsFiltrees.length > 0" class="grille">
        <CarteFormation v-for="f in formationsFiltrees" :key="f.id" :formation="f" />
      </div>

      <div v-else class="vide">
        <span>😕</span>
        <p>Aucune formation ne correspond à votre recherche.</p>
        <button class="btn btn-outline" @click="recherche = ''; niveauFiltre = 'Tous'">
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalogue-page {
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

.filtres {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.recherche-wrap {
  position: relative;
}

.recherche-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
}

.recherche-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 15px;
  background: var(--card-bg);
  color: var(--text-h);
  font-family: inherit;
  transition: border-color 0.15s;
}

.recherche-input:focus {
  outline: none;
  border-color: var(--accent);
}

.filtres-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.niveau-filtres {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.niveau-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1.5px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.niveau-btn:hover,
.niveau-btn.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
}

.tri-select {
  padding: 8px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-h);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.vide {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.vide span { font-size: 48px; }
.vide p { font-size: 17px; color: var(--text); }
</style>
