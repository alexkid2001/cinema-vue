<template>
<v-container>
  <Title :title="'Booking Place'" />
  <v-row
    align="center"
    justify="center"
  >
    <v-col lg="8">
      <div class="booking">
        <div class="booking__places booking-places">
          <div class="booking-places__info">
            <div class="booking-places__screen">
            </div>
            <div 
            class="booking-places__row" 
            v-for="(row, rowIndex) in session.places" 
            :key="rowIndex">
              <div 
                class="booking-places__place" 
                v-for="(place, placeIndex) in row"
                :key="place._id"
                :class="{'busy': !place.isFree, 'checked': place._id === placeId}" 
                @click="toggleChecked"
                :data-row="rowIndex"
                :data-place="placeIndex"
                :data-id="place._id"
              >  
              </div>
            </div>
          </div>
          <div class="booking-places__choosen">
            <div class="booking-places__place-info">
              Row: {{ placeRow }}
            </div>
            <div class="booking-places__place-info">
              Place: {{ placeNumber }}
            </div>
          </div>
        </div>
        
        <div class="booking__action">
          <v-btn class="ma-2" 
                outlined 
                color="indigo" 
                @click="booking"
                :class="{'disabled' : !placeRow}"
          >
            Booking
          </v-btn>
          <v-btn class="ma-2" 
                outlined 
                color="error" 
                @click="$router.go(-1)"
          >
            Return
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-dialog
      v-model="showDialog"
      max-width="330"
    >
      <v-card>
        <v-card-title class="headline">Reservation completed!</v-card-title>

        <v-card-text>
          Your reservation code: {{ reservation_code }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="showDialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-row>
</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Title from '@/components/Title'
// import axios from 'axios'

export default {
  name: 'Booking',
  data () {
    return {
      session: {},
      choosenPlace: {
        id: '',
        row: null,
        place: null,
      },
      showDialog: false,
      reservation_code: '',
    }
  },
  components: {
    Title
  },
  computed: {
    ...mapGetters([
      'sessions'
    ]),
    placeId () {
      return this.choosenPlace.id;
    },
    placeRow () {
      return this.choosenPlace.row ? +this.choosenPlace.row + 1 : '';
    },
    placeNumber () {
      return this.choosenPlace.place ? +this.choosenPlace.place + 1 : '';
    }

  },
  methods: {
    ...mapActions([
      'bookingPlace'
    ]),
    toggleChecked () {
      const target = event.target;
      // target.classList.toggle('checked');
      this.choosenPlace.row = target.dataset.row;
      this.choosenPlace.place = target.dataset.place;
      this.choosenPlace.id = target.dataset.id;
    },
    booking () {
      let params = {
            movieShow_id : '',
            row_id : null,
            place_position : null,
            isFree : false
          }
      params.movieShow_id = this.session._id;
      params.row_id = this.choosenPlace.row;
      params.place_position = this.choosenPlace.place;
    
      this.bookingPlace(params)
        .then(resp => { 
          this.reservation_code = resp.data;
          this.showDialog = true;
        })
        .catch(err => console.log(err));
      
      
      
    }
  },
  mounted () {
    this.session = this.sessions.find(session => session._id === this.$route.params.id);
  }
}
</script>

<style>

</style>