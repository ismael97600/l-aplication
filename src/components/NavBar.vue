<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavorisStore } from '../stores/favoris.js'

const favoris = useFavorisStore()

const liens = [
  { to: '/', label: 'Accueil' },
  { to: '/formations', label: 'Formations' },
  { to: '/contact', label: 'Contact' },
]

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <RouterLink to="/" class="logo" aria-label="Aller à l'accueil">
        <span class="logo-icon" aria-hidden="true">FP</span>
        <span class="logo-text">FormaPro</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Navigation principale">
        <RouterLink
          v-for="lien in liens"
          :key="lien.to"
          :to="lien.to"
          class="nav-link"
        >
          {{ lien.label }}
        </RouterLink>
      </nav>

      <RouterLink to="/favoris" class="fav-btn" aria-label="Voir mes favoris">
        <span class="fav-icon" aria-hidden="true">♡</span>
        <span class="fav-label">Favoris</span>
        <span v-if="favoris.nombreFavoris > 0" class="fav-count">
          {{ favoris.nombreFavoris }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 960px;
  z-index: 100;
  border-radius: 16px;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid var(--border);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.navbar.scrolled {
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  border-color: var(--accent-border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 10px 18px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: max-content;
  margin-right: auto;
  color: var(--text-h);
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 13px;
  border-radius: 9px;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.nav-link:hover {
  color: var(--accent);
  background: var(--accent-bg);
}

.nav-link.router-link-exact-active {
  color: var(--accent);
  background: var(--accent-bg);
  font-weight: 600;
}

.fav-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 36px;
  padding: 0 14px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: var(--text-h);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background-color 0.15s;
  flex-shrink: 0;
}

.fav-btn:hover,
.fav-btn.router-link-active {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-bg);
}

.fav-icon {
  font-size: 16px;
  line-height: 1;
}

.fav-count {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  padding: 2px 5px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 760px) {
  .navbar {
    top: 10px;
    width: calc(100% - 24px);
    border-radius: 14px;
  }

  .navbar-inner {
    padding: 8px 14px;
    gap: 12px;
  }

  .logo {
    margin-right: 0;
  }

  .nav-link {
    font-size: 13px;
    padding: 0 10px;
  }
}

@media (max-width: 520px) {
  .navbar {
    top: 8px;
    border-radius: 12px;
  }

  .navbar-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    row-gap: 8px;
    padding: 10px 14px;
  }

  .logo {
    margin-right: 0;
  }

  .nav-links {
    grid-column: 1 / -1;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar { display: none; }

  .nav-link {
    flex: 1 0 auto;
    justify-content: center;
  }
}

@media (max-width: 360px) {
  .logo-text,
  .fav-label {
    display: none;
  }
}
</style>
