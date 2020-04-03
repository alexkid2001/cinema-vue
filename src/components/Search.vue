<template>
<div class="search">
  <v-text-field
    solo-inverted
    hide-details
    label="Search"
    v-model="searchParams.name"
  />
  <v-select
    hide-details
    height="48"
    :items="Object.values(ganres)"
    v-model="ganre"
    label="Gange"
    outlined
    color="grey"
    
    />
    <v-btn class="ma-2" outlined color="indigo" 
        @click="search">Search</v-btn>
    <v-btn class="ma-2" outlined color="error" 
        @click="clearFields">Clear</v-btn>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Search',
  data () {
    return {
      searchParams: {
        name: '',
        ganre: '',
      },
      ganre: '',
      // ganresValues: [],
      // ganresKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'ganres'
    ]),
    ganresValues () {
      return Object.values(this.ganres);
    },
    ganresKey () {
      return Object.keys(this.ganres);
    }

    // ganresKeys: []
  },
  methods: {
    ...mapActions([
      'searchMovies'
    ]),
    search () {
      this.searchParams.ganre = this.ganresValues.indexOf(this.ganre)
      console.log(this.searchParams);
      this.searchMovies(this.searchParams)
      if (this.$router.currentRoute.name !== 'search') {
        this.$router.push({ name: 'search'})
      }
    },
    clearFields () {
      this.searchParams.name = '';
      this.ganre = '';
      this.$router.push({name: 'posters'});
    }
  },
  mounted () {
    console.log(this.$store.baseUrl);
  }
}
</script>

<style>

</style>