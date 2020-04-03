<template>
<v-container>
  <Title :title="'Sessions'"/>
  <v-row
    align="center"
    justify="center"
  >
    <v-col lg="8">
      <table class="sessions">
        <thead>
          <tr>
            <td></td>
            <td>Movie</td>
            <td>Price</td>
            <td>Session Date, Time</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(session, index) in customSessions" :key="session.id">
            <td>
              {{ index }}
            </td>
            <td>
              <div class="poster poster_session" @click="$router.push({name: 'filmDetails', 
                                                                        params: {
                                                                          id: session.movie_id
                                                                        } })">
                <div class="poster__image">
                  <img :src="session.movie.pictureLink" :alt="session.movie.name">
                </div>
                <div class="poster__info-wrap">
                  <div class="poster__name">{{ session.movie.name }}</div>
                  <div class="poster__footer">{{ new Date(session.movie.dateOfRelease).getFullYear() }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ session.ticketPrice }} p.
            </td>
            <td>
              <div>{{ session.date }}</div>
              <div>{{ session.time }}</div>
            </td>
            <td>
              <v-btn class="ma-2" outlined color="indigo" 
                @click="$router.push({name: 'booking', params: {id: session._id}})">Booking</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-col>

  </v-row>
</v-container>

</template>

<script>
// import axios from 'axios';
import Title from '@/components/Title';
import { mapActions, mapGetters } from 'vuex';

// const baseUrl = 'https://cinema-api-test.herokuapp.com/movieShows';

export default {
  name: 'Sessions',
  components: {
    Title,
  },
  data() {
    return {
      // customSessions: []
    }
  },
  computed: {
    ...mapGetters([
      'movies',
      'sessions',
    ]),
    customSessions() {
      let sess = this.sessions;
      sess.forEach(item => {
        const date = new Date(item.startTime);
        item.movie = this.movies.find(movie => movie._id === item.movie_id);
        item.time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        item.date = ('0' + date.getDate()).slice(-2) + '.' + ('0' + date.getMonth()).slice(-2);
      })
      return sess;
    }
  },
  methods: {
    ...mapActions([
      'getAllMovies',
      'getSessions',
    ]),
    getMovieDetails(id) {
      return this.movies.find(movie => movie._id ===  id);
    }
  },
  mounted () {
    this.getAllMovies();
    this.getSessions();
  }
}
</script>

<style>
img {
  width: 50px;
  height: 60px;
}

</style>