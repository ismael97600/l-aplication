<script setup>
import { RouterLink } from 'vue-router'
import { useFavorisStore } from '../stores/favoris.js'

const favoris = useFavorisStore()

const liens = [
  { to: '/', label: 'Accueil' },
  { to: '/formations', label: 'Formations' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink to="/" class="logo" aria-label="Aller a l'accueil">
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
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg) 96%, transparent);
  border-bottom: 1px solid var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 68px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: max-content;
  margin-right: auto;
  color: var(--text-h);
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--accent);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 7px;
  color: var(--text);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
  background: var(--accent-bg);
}

.nav-link.router-link-exact-active {
  color: #fff;
  background: var(--accent);
}

.fav-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
  color: var(--text-h);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background-color 0.15s;
}

.fav-btn:hover,
.fav-btn.router-link-active {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-bg);
}

.fav-icon {
  font-size: 18px;
  line-height: 1;
}

.fav-count {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  padding: 3px 6px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 760px) {
  .navbar {
    position: static;
  }

  .navbar-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    min-height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .logo {
    margin-right: 0;
  }

  .nav-links {
    grid-column: 1 / -1;
    order: 3;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    flex: 1 0 auto;
    justify-content: center;
  }

  .fav-btn {
    padding: 0 12px;
  }
}

@media (max-width: 420px) {
  .logo-text,
  .fav-label {
    display: none;
  }
}
</style>
