<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-1"
        nuxt="true"
        :to="link.to"
      >
        {{ link.text }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        to: '/rules',
        text: 'Reglas'
      },
      {
        to: '/about',
        text: 'Acerca'
      }
    ]
  })
}
</script>
