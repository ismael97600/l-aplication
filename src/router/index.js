import { createRouter, createWebHashHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import CatalogueView from '../views/CatalogueView.vue'
import DetailView from '../views/DetailView.vue'
import FavorisView from '../views/FavorisView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'accueil', component: AccueilView },
  { path: '/formations', name: 'catalogue', component: CatalogueView },
  { path: '/formations/:id', name: 'detail', component: DetailView },
  { path: '/favoris', name: 'favoris', component: FavorisView },
  { path: '/contact', name: 'contact', component: ContactView },
]

const router = createRouter({
  history: createWebHashHistory(),
  basse: import.env.BASSE_URL,
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})


export default router
