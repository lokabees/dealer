<template lang="html">
  <div class="bg-white overflow-hidden">
    <div class="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <svg
        class="absolute top-0 mt-8 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
      >
        <defs>
          <pattern
            id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-white md:text-light"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="784"
          fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
        />
      </svg>

      <div class="relative lg:grid lg:grid-cols-3 lg:col-gap-8">
        <div class="lg:col-span-1">
          <h3 class="text-5xl leading-none text-primary">
            Eine bessere <br />
            Beratung.
          </h3>
        </div>
        <div
          class="mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0"
        >
          <div>
            <div
              v-scroll-reveal.reset="{ delay: 0, distance: '10px' }"
              class="flex items-center justify-center md:justify-start"
            >
              <img src="img/rocket.webp" alt="rocket" />
            </div>
            <div class="mt-5 text-center md:text-left">
              <h4 class="text-xl font-serif mb-4">
                Digitale Geschäftsprozesse
              </h4>
              <p class="leading-6 text-dark">
                Konzeption von ganzheitlichen, nutzerzentrierten
                Geschäftsprozessen sowie die Definition von zukunftsorientierten
                Strategien.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div
              v-scroll-reveal.reset="{ delay: 100, distance: '10px' }"
              class="flex items-center justify-center md:justify-start"
            >
              <img src="img/gift.webp" alt="gift" />
            </div>
            <div class="mt-5 text-center md:text-left">
              <h4 class="text-xl font-serif mb-4">
                UX Prototypenentwicklung
              </h4>
              <p class="leading-6 text-dark">
                Ermittlung und Evaluierung von nutzerzentrierten Anforderungen
                mit Methodenwissen rund um das Thema User Research.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div
              v-scroll-reveal.reset="{ delay: 200, distance: '10px' }"
              class="flex items-center justify-center md:justify-start"
            >
              <img src="img/computer.webp" alt="computer" />
            </div>
            <div class="mt-5 text-center md:text-left">
              <h4 class="text-xl font-serif mb-4">
                Digitales Marketing
              </h4>
              <p class="leading-6 text-dark">
                Starke und zielgruppenorientierte Positionierung Ihrer Kampagnen
                auf aktuelle Social Media Platformen sowie Content Marketing.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div
              v-scroll-reveal.reset="{ delay: 300, distance: '10px' }"
              class="flex items-center justify-center md:justify-start"
            >
              <img src="img/phone.webp" alt="phone" />
            </div>
            <div class="mt-5 text-center md:text-left">
              <h4 class="text-xl font-serif mb-4">
                Web &amp; App Entwicklung
              </h4>
              <p class="leading-6 text-dark">
                Expertenwissen in modernen Browsertechnologien sowie die
                Entwicklung von Progressiven Webapplikationen (PWA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
