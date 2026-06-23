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

const etapes = [
  { num: '01', titre: 'Choisissez votre formation', desc: 'Parcourez notre catalogue et trouvez la formation adaptée à votre niveau et vos objectifs.' },
  { num: '02', titre: 'Apprenez à votre rythme', desc: "Accédez aux cours en ligne à tout moment, depuis n'importe quel appareil, sans contrainte d'horaire." },
  { num: '03', titre: 'Obtenez votre certification', desc: 'Validez vos compétences avec une certification reconnue et boostez votre carrière dans le numérique.' },
]

const avantages = [
  { icone: '🎯', titre: '100% pratique', desc: 'Des projets concrets pour apprendre en faisant, pas seulement en lisant.' },
  { icone: '👨‍🏫', titre: 'Formateurs experts', desc: "Des professionnels du secteur avec des années d'expérience en entreprise." },
  { icone: '📜', titre: 'Certifications reconnues', desc: 'Des formations éligibles aux financements OPCO et Pôle Emploi.' },
  { icone: '🔄', titre: 'Accès à vie', desc: 'Vos supports de cours restent accessibles bien après la fin de la formation.' },
]
</script>

<template>
  <!-- ===== HERO ===== -->
  <section class="hero">
    <div class="hero-decor" aria-hidden="true">
      <div class="decor-blob decor-blob-1"></div>
      <div class="decor-blob decor-blob-2"></div>
    </div>
    <div class="container hero-inner">
      <div class="hero-content">
        <span class="hero-tag">🚀 Développement Web</span>
        <h1>Formez-vous aux <span class="gradient-text">métiers du numérique</span></h1>
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

      <div class="hero-visual" aria-hidden="true">
        <div class="visual-card">
          <div class="vc-header">
            <div class="vc-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="vc-title">Catalogue des formations</span>
          </div>
          <div class="vc-body">
            <div v-for="f in formations.slice(0, 4)" :key="f.id" class="vc-formation">
              <span class="vc-icone">{{ f.icone }}</span>
              <div class="vc-info">
                <span class="vc-titre">{{ f.titre }}</span>
                <span class="vc-prix">{{ f.prix.toLocaleString('fr-FR') }} €</span>
              </div>
              <span class="vc-badge">{{ f.niveau }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== COMMENT ÇA MARCHE ===== -->
  <section class="process">
    <div class="container">
      <div class="section-head">
        <h2>Comment ça marche ?</h2>
        <p>Trois étapes simples pour démarrer votre parcours de formation.</p>
      </div>
      <div class="process-steps">
        <div v-for="e in etapes" :key="e.num" class="step">
          <div class="step-num">{{ e.num }}</div>
          <h3 class="step-titre">{{ e.titre }}</h3>
          <p class="step-desc">{{ e.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== FORMATIONS POPULAIRES ===== -->
  <section class="featured">
    <div class="container">
      <div class="section-header">
        <div>
          <h2>Formations populaires</h2>
          <p class="section-sub">Les formations les plus demandées par nos apprenants</p>
        </div>
        <RouterLink to="/formations" class="voir-tout">Voir tout →</RouterLink>
      </div>
      <div class="grille">
        <CarteFormation v-for="f in featured" :key="f.id" :formation="f" />
      </div>
    </div>
  </section>

  <!-- ===== AVANTAGES ===== -->
  <section class="avantages">
    <div class="container">
      <div class="section-head">
        <h2>Pourquoi choisir FormaPro ?</h2>
        <p>Une pédagogie moderne, des formateurs passionnés et un suivi personnalisé.</p>
      </div>
      <div class="avantages-grille">
        <div v-for="a in avantages" :key="a.titre" class="avantage">
          <div class="avantage-icon-wrap">
            <span class="avantage-icon">{{ a.icone }}</span>
          </div>
          <h3>{{ a.titre }}</h3>
          <p>{{ a.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== CTA FINAL ===== -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-inner">
        <div class="cta-content">
          <h2>Prêt à démarrer votre carrière ?</h2>
          <p>Rejoignez des centaines d'apprenants qui ont transformé leur profil avec FormaPro.</p>
        </div>
        <div class="cta-actions">
          <RouterLink to="/formations" class="btn btn-cta-primary">Découvrir les formations</RouterLink>
          <RouterLink to="/contact" class="btn btn-cta-outline">Parler à un conseiller</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== HERO ===== */
.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--accent-bg) 0%, var(--bg) 60%);
  border-bottom: 1px solid var(--border);
  padding: 80px 0 72px;
}

.hero-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decor-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.22;
}

.decor-blob-1 {
  width: 500px;
  height: 500px;
  background: var(--accent);
  top: -160px;
  right: -80px;
}

.decor-blob-2 {
  width: 320px;
  height: 320px;
  background: #4facfe;
  bottom: -100px;
  left: 8%;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;
  gap: 64px;
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-block;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid var(--accent-border);
  margin-bottom: 20px;
}

h1 {
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 800;
  margin: 0 0 16px;
  line-height: 1.15;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 17px;
  line-height: 1.7;
  color: var(--text);
  max-width: 520px;
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
  gap: 0;
}

.stat {
  display: flex;
  flex-direction: column;
  padding-right: 28px;
  margin-right: 28px;
  border-right: 1px solid var(--border);
}

.stat:last-child {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
}

.stat-val {
  font-size: 30px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--text);
  margin-top: 4px;
}

/* Visual preview card */
.hero-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-hover);
  width: 100%;
}

.vc-header {
  background: var(--accent-bg);
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}

.vc-dots {
  display: flex;
  gap: 6px;
}

.vc-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.vc-dots span:first-child { background: #ef4444; }
.vc-dots span:nth-child(2) { background: #f59e0b; }
.vc-dots span:nth-child(3) { background: #10b981; }

.vc-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.vc-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vc-formation {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  transition: background 0.15s;
}

.vc-formation:hover {
  background: var(--accent-bg);
}

.vc-icone {
  font-size: 22px;
  flex-shrink: 0;
}

.vc-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.vc-titre {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vc-prix {
  font-size: 12px;
  color: var(--text);
}

.vc-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  flex-shrink: 0;
}

/* ===== PROCESS ===== */
.process {
  padding: 80px 0;
  border-bottom: 1px solid var(--border);
}

.section-head {
  text-align: center;
  margin-bottom: 56px;
}

.section-head h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.section-head p {
  font-size: 16px;
  color: var(--text);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
}

.process-steps::before {
  content: '';
  position: absolute;
  top: 27px;
  left: calc(16.66% + 24px);
  right: calc(16.66% + 24px);
  height: 2px;
  background: linear-gradient(90deg, var(--accent), #4facfe);
  opacity: 0.35;
}

.step {
  text-align: center;
  padding: 0 16px;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(170, 59, 255, 0.3);
}

.step-titre {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.step-desc {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
}

/* ===== FEATURED ===== */
.featured {
  padding: 80px 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

.section-sub {
  font-size: 14px;
  color: var(--text);
}

.voir-tout {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: 4px;
  white-space: nowrap;
}

.voir-tout:hover {
  text-decoration: underline;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* ===== AVANTAGES ===== */
.avantages {
  background: var(--accent-bg);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 80px 0;
}

.avantages-grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.avantage {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px 24px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.avantage:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-3px);
}

.avantage-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--accent-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 1px solid var(--accent-border);
}

.avantage-icon {
  font-size: 26px;
}

.avantage h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.avantage p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
}

/* ===== CTA FINAL ===== */
.cta-section {
  padding: 80px 0;
}

.cta-inner {
  background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
  border-radius: 20px;
  padding: 56px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.cta-content h2 {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 10px;
}

.cta-content p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.82);
  max-width: 420px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background: #fff;
  color: var(--accent);
  text-decoration: none;
  border: none;
  transition: opacity 0.2s;
}

.btn-cta-primary:hover {
  opacity: 0.9;
}

.btn-cta-outline {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.btn-cta-outline:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.8);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1000px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .cta-inner {
    flex-direction: column;
    text-align: center;
    padding: 48px 32px;
  }

  .cta-content p {
    max-width: 100%;
  }

  .cta-actions {
    justify-content: center;
  }
}

@media (max-width: 760px) {
  .hero {
    padding: 56px 0 48px;
  }

  .process-steps {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .process-steps::before {
    display: none;
  }

  .step {
    display: grid;
    grid-template-columns: 56px 1fr;
    grid-template-rows: auto auto;
    text-align: left;
    gap: 0 16px;
    padding: 0;
  }

  .step-num {
    grid-row: 1 / 3;
    margin-bottom: 0;
    align-self: start;
  }

  .step-titre {
    margin-bottom: 4px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .cta-inner {
    padding: 36px 24px;
  }
}
</style>
