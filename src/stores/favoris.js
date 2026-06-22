import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavorisStore = defineStore('favoris', () => {
  const favoris = ref([])

  const nombreFavoris = computed(() => favoris.value.length)

  function estEnFavori(id) {
    return favoris.value.some((f) => f.id === id)
  }

  function ajouterFavori(formation) {
    if (!estEnFavori(formation.id)) {
      favoris.value.push(formation)
    }
  }

  function supprimerFavori(id) {
    favoris.value = favoris.value.filter((f) => f.id !== id)
  }

  function basculerFavori(formation) {
    if (estEnFavori(formation.id)) {
      supprimerFavori(formation.id)
    } else {
      ajouterFavori(formation)
    }
  }

  return { favoris, nombreFavoris, estEnFavori, ajouterFavori, supprimerFavori, basculerFavori }
})
