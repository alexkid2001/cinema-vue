<template>
<div class="poster" @click="filmDetails(filmInfo._id)">
  <div class="poster__image">
    <img :src="filmInfo.pictureLink" :alt="filmInfo.name">
  </div>
  <div class="poster__info-wrap">
    <div class="poster__name">
      <span>
        {{ filmInfo.name }}
      </span>
    </div>
    <div class="poster__footer">
      <span class="poster__release-year">
        {{ parseYear(filmInfo.dateOfRelease) }}
      </span>
      <span class="poster__ganre" v-if="ganresList(filmInfo.genre_id).length">
        , {{ ganresList(filmInfo.genre_id) }} 
      </span>
    </div>
  </div> 
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Poster',
  props: ['filmInfo'],
  computed: {
    ...mapGetters([
      'ganres'
    ])
  },
  methods: {
    filmDetails (id) {
      this.$router.push(`/film/${id}`);
    },
    parseYear (date) {
      return new Date(date).getFullYear();
    },
    ganresList (arr) {
      let ganresArr = [];
      arr.forEach( item => {
        ganresArr.push(this.ganres[item]);
      });
      return ganresArr.join(', ')
    }
  }
}
</script>

<style>

</style>