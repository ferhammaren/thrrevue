<template>
  <MainLayout>
    <main class="bio-page">
      <!-- Artist archive header -->
      <header class="bio-header">
        <div class="bio-eyebrow">
          <span>ARTIST ARCHIVE</span>
          <span>FILE /// BIO-001</span>
        </div>

        <h1 class="bio-page-title title">Artist Profile<span>!</span></h1>

        <div class="bio-header-bottom">
          <span>PERSONNEL / VOCALS & GUITAR</span>
          <span>DOCUMENTED HISTORY</span>
        </div>
      </header>

      <!-- Biography -->
      <section class="bio-profile">
        <div class="bio-portrait-wrap">
          <div class="bio-portrait-stamp">PROFILE FILE</div>

          <img
            :src="BioImage"
            alt="Takano Tetsu"
            class="bio-portrait"
          />

          <div class="bio-portrait-caption">
            <span>TAKANO TETSU</span>
            <span>/// ARCHIVE IMAGE</span>
          </div>
        </div>

        <div class="bio-details">
          <div class="bio-section-label">
            <span>01</span>
            <span>IDENTIFICATION</span>
          </div>

          <h2 class="bio-name japanese">
            <ruby>
              高<rp>(</rp><rt>たか</rt><rp>)</rp>野<rp>(</rp><rt>の</rt><rp>)</rp>
              哲<rp>(</rp><rt>てつ</rt><rp>)</rp>
            </ruby>
          </h2>

          <p class="bio-name-romaji">TAKANO TETSU</p>

          <dl class="bio-facts">
            <div class="bio-fact">
              <dt>NAME</dt>
              <dd>Takano Tetsu</dd>
            </div>

            <div class="bio-fact">
              <dt>BIRTHDATE</dt>
              <dd>December 12, 1972</dd>
            </div>

            <div class="bio-fact">
              <dt>PLACE OF ORIGIN</dt>
              <dd>Obihiro, Hokkaido</dd>
            </div>

            <div class="bio-fact">
              <dt>INSTRUMENTS</dt>
              <dd>Vocal, guitar</dd>
            </div>
          </dl>

          <div class="bio-profile-footer">
            <span>SUBJECT NO. 001</span>
            <span>/// JAPAN</span>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="bio-history">
        <div class="bio-history-heading">
          <div class="bio-section-label">
            <span>02</span>
            <span>CHRONOLOGY</span>
          </div>

          <h2 class="bio-history-title title">History &amp; Timeline</h2>

          <p class="bio-history-note">
            EVENTS /// CAREER /// ARCHIVE RECORD
          </p>
        </div>

        <div class="bio-timeline-frame">
          <Timeline :items="timelineData" />
        </div>

        <footer class="bio-footer">
          <span>END OF PROFILE</span>
          <span>/// ARTIST ARCHIVE</span>
        </footer>
      </section>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BioImage from "@/UI/images/bio.jpg";
import Timeline from "@/UI/Organisms/Timeline.vue";
import timelineData from "@/data/Bio/timeline.json";
</script>

<style scoped>
.bio-page {
  --bio-paper: var(--color-base-100, #f5f3e9);
  --bio-ink: var(--color-base-content, #171717);
  --bio-red: var(--color-primary, #e00016);
  --bio-muted: var(--color-base-300, #deddd4);

  max-width: 1440px;
  margin-inline: auto;
  padding: 1rem;
  color: var(--bio-ink);
}

/* Main editorial heading */
.bio-header {
  margin-bottom: 1.5rem;
  padding: 1rem 0 0.75rem;
  border-top: 5px solid var(--bio-red);
  border-bottom: 2px solid var(--bio-ink);
}

.bio-eyebrow,
.bio-header-bottom,
.bio-portrait-caption,
.bio-section-label,
.bio-profile-footer,
.bio-history-note,
.bio-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.bio-eyebrow {
  color: var(--bio-red);
}

.bio-page-title {
  margin: 1rem 0;
  font-size: clamp(2.8rem, 8vw, 6rem);
  line-height: 0.95;
  text-transform: uppercase;
}

.bio-page-title span {
  color: var(--bio-red);
}

.bio-header-bottom {
  padding-top: 0.65rem;
  border-top: 1px dashed var(--bio-ink);
}

/* Profile panel */
.bio-profile {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.bio-portrait-wrap {
  position: relative;
  align-self: start;
  padding: 0.45rem;
  border: 2px solid var(--bio-ink);
  background: var(--bio-paper);
  box-shadow: 6px 6px 0 var(--bio-ink);
}

.bio-portrait {
  display: block;
  width: 100%;
  max-height: 680px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center;
  filter: grayscale(35%) contrast(1.05);
  transition: filter 180ms ease;
}

.bio-portrait-wrap:hover .bio-portrait {
  filter: grayscale(0%) contrast(1);
}

.bio-portrait-stamp {
  position: absolute;
  z-index: 1;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.55rem;
  background: var(--bio-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  transform: rotate(-4deg);
}

.bio-portrait-caption {
  flex-wrap: wrap;
  padding: 0.65rem 0.2rem 0.15rem;
  font-size: 0.6rem;
}

.bio-section-label {
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.bio-section-label span:first-child {
  display: inline-flex;
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background: var(--bio-red);
  color: #fff;
}

.bio-details {
  min-width: 0;
  padding-top: 0.25rem;
}

.bio-name {
  margin: 0.75rem 0 0.25rem;
  color: var(--bio-red);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.5;
}

.bio-name rt {
  font-size: 0.3em;
}

.bio-name-romaji {
  margin: 0 0 1.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.bio-facts {
  margin: 0;
  border-top: 2px solid var(--bio-ink);
}

.bio-fact {
  display: grid;
  grid-template-columns: minmax(7rem, 0.75fr) minmax(0, 1.25fr);
  gap: 0.75rem;
  padding: 0.85rem 0.25rem;
  border-bottom: 1px dashed var(--bio-muted);
}

.bio-fact dt {
  align-self: start;
  padding-top: 0.2rem;
  color: var(--bio-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
}

.bio-fact dd {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.bio-profile-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--bio-ink);
}

/* Timeline section */
.bio-history {
  border-top: 3px solid var(--bio-ink);
}

.bio-history-heading {
  padding: 1.25rem 0;
}

.bio-history-title {
  margin: 0.5rem 0;
  color: var(--bio-red);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
  text-transform: uppercase;
}

.bio-history-note {
  justify-content: flex-start;
  margin-top: 0.75rem;
}

.bio-timeline-frame {
  min-width: 0;
  padding: 0.5rem 0;
}

/* Keep the timeline's own layout; only align its container with the page. */
.bio-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--bio-ink);
}

@media (min-width: 768px) {
  .bio-page {
    padding: 2rem;
  }

  .bio-header {
    margin-bottom: 2rem;
  }

  .bio-profile {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
    gap: 2rem;
    margin-bottom: 3.5rem;
  }

  .bio-portrait-wrap {
    position: sticky;
    top: 1.5rem;
  }

  .bio-fact {
    padding: 1rem 0.5rem;
  }

  .bio-fact dd {
    font-size: 1.1rem;
  }

  .bio-history-heading {
    padding-top: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bio-portrait {
    transition: none;
  }
}
</style>