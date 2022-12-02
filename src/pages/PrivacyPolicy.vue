<template lang="pug">
q-page.bg-grey-10.text-grey-1.q-pa-sm.flex.justify-center.items-center
  q-card(style="max-width: 750px;").text-grey-10
    q-card-section.flex.justify-center
      .text-h5.q-pa-sm Privacy policy
    q-card-section
      p In short, we don't collect nominative personal data. Our optional visits analytics tool Matomo anonimises IP address and uses a cookie.
      p In long, we only use a tool called "Matomo" to collect anonymised visits analytics data. If you activate the optional tracking in the "Privacy" item of the main menu, Matomo will track your actions in the metronome, anonymise your IP address and the tracking information will be part of our usage statistics. Matomo sets a cookie in the web browser (for the acompas.org website), or in the mobile device (for the Android app).
    q-card-section.flex.justify-center
      q-btn(
        color="primary",
        to="/"
      ) Back to the metronome
</template>
