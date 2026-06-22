<script setup>
import { RouterLink } from 'vue-router'
import { formations } from '../data/formations.js'
import CarteFormation from '../components/CarteFormation.vue'

const featured = formations.slice(0, 3)

const stats = [
  { valeur: '8', label: 'Formations' },
  { valeur: '100%', label: 'En ligne' },
  { valeur: '5★', label: 'Satisfaction' },
]
</script>


<template>
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <span class="hero-tag">🚀 Développement Web</span>
        <h1>Formez-vous aux métiers du numérique</h1>
        <p class="hero-sub">
          Des formations professionnelles pour apprendre le développement web, du débutant au niveau avancé. Certifiantes, flexibles et accessibles.
        </p>
        <div class="hero-actions">
          <RouterLink to="/formations" class="btn btn-primary">Voir les formations</RouterLink>
          <RouterLink to="/contact" class="btn btn-outline">Nous contacter</RouterLink>
        </div>

        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <span class="stat-val">{{ s.valeur }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="featured">
    <div class="container">
      <div class="section-header">
        <h2>Formations populaires</h2>
        <RouterLink to="/formations" class="voir-tout">Voir tout →</RouterLink>
      </div>
      <div class="grille">
        <CarteFormation v-for="f in featured" :key="f.id" :formation="f" />
      </div>
    </div>
  </section>

  <section class="avantages">
    <div class="container">
      <h2 class="avantages-titre">Pourquoi choisir FormaPro ?</h2>
      <div class="avantages-grille">
        <div class="avantage">
          <span class="avantage-icon">🎯</span>
          <h3>100% pratique</h3>
          <p>Des projets concrets pour apprendre en faisant, pas seulement en lisant.</p>
        </div>
        <div class="avantage">
          <span class="avantage-icon">👨‍🏫</span>
          <h3>Formateurs experts</h3>
          <p>Des professionnels du secteur avec des années d'expérience en entreprise.</p>
        </div>
        <div class="avantage">
          <span class="avantage-icon">📜</span>
          <h3>Certifications reconnues</h3>
          <p>Des formations éligibles aux financements OPCO et Pôle Emploi.</p>
        </div>
        <div class="avantage">
          <span class="avantage-icon">🔄</span>
          <h3>Accès à vie</h3>
          <p>Vos supports de cours restent accessibles bien après la fin de la formation.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--accent-bg) 0%, var(--bg) 60%);
  border-bottom: 1px solid var(--border);
  padding: 80px 0 64px;
}

.hero-inner {
  max-width: 720px;
}

.hero-tag {
  display: inline-block;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
}

h1 {
  font-size: clamp(32px, 5vw, 54px);
  font-weight: 700;
  margin: 0 0 16px;
  line-height: 1.15;
}

.hero-sub {
  font-size: 18px;
  line-height: 1.6;
  color: var(--text);
  max-width: 560px;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.stats {
  display: flex;
  gap: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-val {
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--text);
  margin-top: 4px;
}

.featured {
  padding: 64px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-header h2 { font-size: 24px; }

.voir-tout {
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.avantages {
  background: var(--accent-bg);
  border-top: 1px solid var(--border);
  padding: 64px 0;
}

.avantages-titre {
  text-align: center;
  font-size: 26px;
  margin-bottom: 48px;
}

.avantages-grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 32px;
}

.avantage {
  text-align: center;
}

.avantage-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 12px;
}

.avantage h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.avantage p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
}
</style>
