<template>
<v-container>
  <Title :title="'Movie details'"/>
  <v-row
    align="center"
    justify="center"
    no-gutters
  >
    <Loader v-if="loading" />
    <v-col lg="8" v-else>
      <div class="poster poster_details">
        <div class="poster__image">
          <img :src="filmDetails.pictureLink" :alt="filmDetails.name">
        </div>
        <div class="poster__info-wrap">
          <div class="poster__name">{{ filmDetails.name }}</div> 
          <div class="poster__release">{{ parseYear(filmDetails.dateOfRelease) }}</div>
          <div class="poster__genre">{{ ganresList(filmDetails.genre_id) }}</div> 
          <div class="poster__description">{{ filmDetails.description }}</div>
        </div>
      </div>
      <v-row
        align="center"
        justify="center"
      >
        <v-btn class="ma-2" outlined color="indigo" @click="goBack">Return</v-btn>
      </v-row>
      
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue'
import Title from '@/components/Title'
import { mapGetters } from 'vuex'
// import { filmsUrl } from '@/constants'
const baseUrl = 'https://cinema-api-test.herokuapp.com/movies?movie_id='

export default {
  name: 'FilpDetails',
  components: {
    Loader,
    Title
  },
  data () {
    return {
      id: '',
      filmDetails: {},
      loading: true,
    }
  },
  computed: {
    ...mapGetters([
      'ganres'
    ])
  },
  methods: {
    getFilmById(id) {
      axios.get(baseUrl + id)
        .then(resp => {
          this.filmDetails = resp.data;
          this.loading = false;
          console.log(this.filmDetails);
        })
        .catch (err => {
          console.error(err);
        });
    },
    parseYear (date) {
      return new Date(date).getFullYear();
    },
    ganresList (arr) {
      let ganresArr = [];
      if (arr) {
        arr.forEach( item => {
        ganresArr.push(this.ganres[item]);
      });
      console.log(ganresArr);
      return ganresArr.join(', ')
      }
    },
    goBack () {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getFilmById(this.id)
  }
}
</script>

<style>

</style>