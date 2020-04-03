<template>
  <v-container
    class="fill-height posters"
    fluid
  >
    <Title :title="'Movies'"/>
    <v-row
      align="center"
      justify="center"
       
    >
      <Loader v-if="loading"/>
      <v-col cols="12" v-else>
        <v-row
          align="center"
          justify="center"
        >
          <poster v-for="item in filmsList"
            :key="item._id"
            :filmInfo="item"
          />
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import Poster from '@/components/Poster.vue'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Title from '@/components/Title.vue'
import { filmsUrl } from '@/constants'

export default {
  name: 'Posters',
  components: {
    Poster,
    Loader,
    Title
  },
  data () {
    return {
      filmsList: [],
      loading: true,
    }
  },
  methods: {
    getFilms () {
      axios.get(filmsUrl)
        .then(resp => {
          this.filmsList = resp.data;
          this.loading = false;
          console.log(this.filmsList);
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
  mounted () {
    this.getFilms();
  }
}
</script>

<style>

</style>