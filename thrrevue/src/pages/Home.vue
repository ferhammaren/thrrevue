<template>
  <HomeLayout>
    <main class="home-page">
      <!-- Editorial masthead -->
      <header class="home-masthead">
        <div class="masthead-top">
          <span>TKNTT /// MUSIC ARCHIVE</span>
          <span> MUSIC / RELEASES / NEWS</span>
        </div>
      </header>

      <!-- Main editorial grid -->
      <div class="home-grid">
        <!-- Tour dates -->
        <section class="home-section tour-section" aria-labelledby="tour-heading">
          <div class="section-heading">
            <span class="section-number">01</span>
            <h2 id="tour-heading">Tour Dates</h2>
          </div>

          <div class="tour-paper">
            <p class="section-kicker">LIVE / ON THE ROAD</p>

           <TourCalendar />

          </div>

          <p class="section-footnote">LIVE MUSIC /// TOUR ARCHIVE</p>
        </section>

        <!-- News -->
        <section class="home-section news-section" aria-labelledby="news-heading">
          <div class="section-heading">
            <span class="section-number">02</span>
            <h2 id="news-heading">Latest News</h2>
            <span class="heading-tag">JUST IN</span>
          </div>

          <div class="news-feature">
            <div class="news-feature-top">
              <span>NEWS BULLETIN</span>
              <span>NO. 001</span>
            </div>

            <Newspost
              title="New Release"
              date="May 22, 2026"
              chip="nil"
            >
              <template #default>
                <div class="post-content news-copy">
                  <p>
                    Lorem ipsum
                  </p>
                </div>
              </template>
            </Newspost>

            <div class="news-feature-bottom">
              <span>END OF TRANSMISSION</span>
              <span>THUNDER ROAD ARCHIVE</span>
            </div>
          </div>

          <p class="section-footnote">UPDATES /// ANNOUNCEMENTS /// RELEASES</p>
        </section>

        <!-- Latest release -->
        <section
          class="home-section release-section"
          aria-labelledby="release-heading"
        >
          <div class="section-heading">
            <span class="section-number">03</span>
            <h2 id="release-heading">Latest Release</h2>
          </div>

          <article class="release-card">
            <div class="release-card-top">
              <span>FEATURED RECORD</span>
              <span>MINI ALBUM /// 2026</span>
            </div>

            <RouterLink
              :to="`/THE JUNEJULYAUGUST/nightSongs`"
              title="THE JUNEJULYAUGUST - Night Songs"
              class="release-cover-link"
            >
              <div class="release-cover-frame">
                <img
                  :src="nightsongs"
                  alt="jja — Night Songs cover"
                  class="release-cover"
                />
                <span class="cover-stamp">NOW<br />PLAYING</span>
              </div>
            </RouterLink>

            <div class="release-info">
              <p class="release-artist">THE JUNEJULYAUGUST /// NEW RELEASE</p>
              <h3>Night Songs</h3>
            </div>

            <div class="release-links-label">
              <span>LISTEN NOW</span>
              <span>↘</span>
            </div>

            <div class="streaming-links" aria-label="Listen to Night Songs  on streaming platforms">
              <a
                href="https://music.youtube.com/playlist?list=OLAK5uy_m-zrN9q5td6unGXVD0d781ZiUvZmstPAw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on YouTube Music"
                title="YouTube Music"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="icons.youtube.path" />
                </svg>
              </a>

              <a
                href="https://open.spotify.com/album/03cehJZg2MnNk3RrCPFwgm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on Spotify"
                title="Spotify"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="icons.spotify.path" />
                </svg>
              </a>

              <a
                href="https://music.apple.com/mx/album/wildflower-ep/1893895654"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on Apple Music"
                title="Apple Music"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="icons.apple.path" />
                </svg>
              </a>
            </div>

            <RouterLink
              :to="`/THE JUNEJULYAUGUST/nightSongs`"
              class="release-details-link"
            >
              <span>VIEW RELEASE FILE</span>
              <span aria-hidden="true">→</span>
            </RouterLink>
          </article>

          <p class="section-footnote">DISCOGRAPHY /// RELEASE FILES</p>
        </section>
      </div>

      <footer class="home-footer">
        <span>TKNTT /// THUNDER ROAD REVUE</span>
        <span>all songs is love songs.</span>
      </footer>
    </main>
  </HomeLayout>
</template>

<script setup lang="ts">
import TourCalendar from "@/UI/Organisms/TourCalendar.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import Newspost from "@/UI/Molecules/Newspost.vue";
import nightsongs from "@/UI/images/jja/nightSongs.jpg";
import {
  siYoutubemusic,
  siSpotify,
  siApplemusic,
} from "simple-icons";

const icons = {
  youtube: siYoutubemusic,
  spotify: siSpotify,
  apple: siApplemusic,
};
</script>

<style scoped>
.home-page {
  --home-paper: var(--color-base-100, #f5f3e9);
  --home-ink: var(--color-base-content, #171717);
  --home-red: var(--color-primary, #e00016);
  --home-line: var(--color-base-300, #b5b4ac);

  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  padding: clamp(0.75rem, 2.5vw, 2rem);
  color: var(--home-ink);
}

.home-masthead {
  position: relative;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  border-block: 4px solid var(--home-ink);
}

.masthead-top,
.masthead-bottom,
.news-feature-top,
.news-feature-bottom,
.release-card-top,
.release-links-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.masthead-top {
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--home-ink);
}

.masthead-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: clamp(1.5rem, 4vw, 3rem);
}

.section-kicker {
  margin: 0 0 0.65rem;
  color: var(--home-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-title {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.055em;
  text-transform: uppercase;
}

.home-title span {
  color: var(--home-red);
}

.masthead-stamp {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(6.5rem, 14vw, 10rem);
  aspect-ratio: 1;
  padding: 0.75rem;
  border: 3px solid var(--home-red);
  color: var(--home-red);
  text-align: center;
  transform: rotate(5deg);
}

.masthead-stamp span {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.masthead-stamp strong {
  margin-block: 0.2rem;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.25rem, 3vw, 2rem);
  line-height: 1;
}

.masthead-bottom {
  padding-block: 0.6rem;
  border-top: 1px solid var(--home-ink);
}

.home-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  align-items: start;
}

.home-section {
  min-width: 0;
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 3px solid var(--home-ink);
}

.section-number {
  color: var(--home-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
}

.section-heading h2 {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  line-height: 1.1;
  text-transform: uppercase;
}

.heading-tag {
  margin-left: auto;
  padding: 0.2rem 0.4rem;
  background: var(--home-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  white-space: nowrap;
}

.tour-paper {
  padding: clamp(0.75rem, 2vw, 1.25rem);
  border: 1px solid var(--home-line);
  background: var(--home-paper);
  box-shadow: 5px 5px 0 var(--home-line);
}

.home-calendar {
  display: block;
  width: 100%;
  max-width: 100%;
  margin-top: 0.5rem;
  padding: 0.35rem;
  border: 1px solid var(--home-line);
  border-radius: 0;
  background: var(--home-paper);
  box-shadow: none;
  font-family: "IBM Plex Mono", monospace;
}

.calendar-arrow {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.tour-note {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--home-line);
  text-align: left;
}

.note-marker {
  display: grid;
  flex: 0 0 1.4rem;
  width: 1.4rem;
  height: 1.4rem;
  place-items: center;
  background: var(--home-red);
  color: white;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 700;
}

.tour-note p {
  margin: 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.news-feature {
  padding: clamp(0.75rem, 2vw, 1.25rem);
  border: 2px solid var(--home-ink);
  background: var(--home-paper);
  box-shadow: 6px 6px 0 var(--home-red);
}

.news-feature-top {
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--home-line);
  color: var(--home-red);
}

.news-copy {
  font-size: 1rem;
  line-height: 1.8;
}

.news-feature-bottom {
  margin-top: 1rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--home-line);
  color: var(--home-ink);
  font-size: 0.6rem;
}

.release-card {
  padding: clamp(0.75rem, 2vw, 1.25rem);
  border: 2px solid var(--home-ink);
  background: var(--home-paper);
  box-shadow: 6px 6px 0 var(--home-ink);
}

.release-card-top {
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--home-line);
  color: var(--home-red);
}

.release-cover-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.release-cover-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--home-ink);
  background: var(--home-line);
}

.release-cover {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.05);
  transition:
    filter 250ms ease,
    transform 250ms ease;
}

.release-cover-link:hover .release-cover,
.release-cover-link:focus-visible .release-cover {
  filter: grayscale(0%) contrast(1);
  transform: scale(1.025);
}

.cover-stamp {
  position: absolute;
  right: 0.65rem;
  bottom: 0.65rem;
  padding: 0.45rem 0.55rem;
  border: 2px solid var(--home-red);
  background: var(--home-paper);
  color: var(--home-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  transform: rotate(-5deg);
}

.release-info {
  padding-block: 1rem;
}

.release-artist {
  margin: 0 0 0.3rem;
  color: var(--home-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.release-info h3 {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  line-height: 1.1;
  text-transform: uppercase;
}

.release-caption {
  margin: 0.5rem 0 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.release-links-label {
  padding-block: 0.65rem;
  border-block: 1px dashed var(--home-line);
}

.streaming-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-block: 0.65rem;
}

.streaming-links a {
  display: grid;
  width: 3.25rem;
  height: 3.25rem;
  place-items: center;
  border: 1px solid var(--home-ink);
  background: var(--home-paper);
  color: var(--home-ink);
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.streaming-links a:hover,
.streaming-links a:focus-visible {
  transform: translateY(-3px);
  border-color: var(--home-red);
  background: var(--home-red);
  color: white;
}

.streaming-links svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
}

.release-details-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.4rem;
  padding: 0.85rem 0.75rem;
  background: var(--home-ink);
  color: var(--home-paper);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.release-details-link:hover,
.release-details-link:focus-visible {
  background: var(--home-red);
  color: white;
}

.section-footnote {
  margin: 1rem 0 0;
  color: var(--home-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  line-height: 1.6;
}

.home-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  padding-block: 0.85rem;
  border-block: 3px solid var(--home-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

@media (min-width: 640px) {
  .home-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .news-section {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .tour-section {
    grid-column: 1;
    grid-row: 2;
  }

  .release-section {
    grid-column: 2;
    grid-row: 2;
  }
}

@media (min-width: 1100px) {
  .home-grid {
    grid-template-columns:
      minmax(0, 0.9fr)
      minmax(0, 1.5fr)
      minmax(0, 0.9fr);
    gap: clamp(1rem, 2vw, 2rem);
  }

  .news-section,
  .tour-section,
  .release-section {
    grid-column: auto;
    grid-row: auto;
    min-width: 0;
  }

  .news-section {
    order: 2;
  }

  .tour-section {
    order: 1;
  }

  .release-section {
    order: 3;
  }
}

@media (max-width: 480px) {
  .masthead-main {
    align-items: flex-start;
  }

  .masthead-stamp {
    width: 5.5rem;
    padding: 0.4rem;
    border-width: 2px;
  }

  .masthead-stamp span {
    font-size: 0.4rem;
  }

  .masthead-stamp strong {
    font-size: 1.1rem;
  }

  .masthead-top,
  .masthead-bottom,
  .home-footer {
    font-size: 0.55rem;
  }

  .section-heading h2 {
    font-size: 1.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .release-cover,
  .streaming-links a,
  .release-details-link {
    transition: none;
  }

  .release-cover-link:hover .release-cover,
  .release-cover-link:focus-visible .release-cover,
  .streaming-links a:hover,
  .streaming-links a:focus-visible {
    transform: none;
  }
}
</style>