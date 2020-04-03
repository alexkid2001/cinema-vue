<template>
<v-app id="inspire">
  
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <span class="title ml-3 mr-5">Cinema</span>
    <Search />

  </v-app-bar>

  <v-content
    class="fill-height"
    fluid
  >
    
      <v-tabs
      align-with-title
      >
        <v-tab @click="$router.push({name: 'posters'})">Home</v-tab>
        <v-tab @click="$router.push({name: 'sessions'})">Session</v-tab>
      </v-tabs>
    
    <router-view/>
  </v-content>
  <v-footer app>
    <span>&copy; 2020</span>
  </v-footer>
</v-app>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  data () {
    return {
      drawer: null,
      searchText: '',
      searchParams: {
        name: '',
        ganre: ''
      }
    }
  },
  components: {
    Search
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  mounted () {
  }
}
</script>

<style lang="scss">

</style>
