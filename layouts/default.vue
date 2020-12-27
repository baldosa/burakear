<template>
  <v-app>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-toolbar-title
        @click="$router.push('/')"
        v-text="title"
      />
      <v-spacer />
      <v-btn
        icon
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-compare</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  components: {
    Footer
  },
  data () {
    return {
      title: 'Burakear'
    }
  }
}
</script>
