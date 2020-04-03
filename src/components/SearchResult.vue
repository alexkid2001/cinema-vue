<template>
<v-container>
  <Title :title="'Search Result'" />
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
        <template v-if="searchResult.length" >
          <poster v-for="item in searchResult"
          :key="item._id"
          :filmInfo="item"
        />
        </template>
        <template v-else>

          <h3>No result for your request</h3>
        </template>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Title from '@/components/Title.vue'
import Poster from '@/components/Poster.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'SearchResult',
  data () {
    return {
      // params: {
      //   name: '',
      //   genres: '',
      // },
      loading: false,
    }
  },
  components: {
    Title,
    Poster,
    Loader
  },
  computed: {
    ...mapGetters([
      'searchResult'
    ])
  },
  mounted () {

  }
}
</script>

<style>

</style>