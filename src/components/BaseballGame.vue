<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h5 class="card-title mb-0">{{ formatDate(game.date) }} at {{ formatTime(game.start_time) }}</h5>
    </div>
    <div class="card-body">
      <p><strong>Opponent:</strong> {{ game.opponent }}</p>
      <p><strong>Location:</strong> <a :href="googleMapsLink" target="_blank">{{ game.location }}</a></p>
      <add-to-calendar-button
          :name="`Baseball Game vs ${game.opponent}`"
          options="'Apple','Google'"
          :location="game.address"
          :startDate="game.date"
          :endDate="game.date"
          :startTime="game.start_time"
          :endTime="addHours(game.start_time, 1.5)"
          timeZone="America/Edmonton"
          :description="`Baseball Game vs ${game.opponent} at ${game.location}`"
      />
    </div>
  </div>
</template>

<script>
import AddToCalendarButton from 'add-to-calendar-button'
import moment from 'moment'
export default {
  name: 'BaseballGame',
  components: {
    AddToCalendarButton
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' }
      return new Date( date + 'T00:00:00-07:00').toLocaleDateString('en-US', options)
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':');
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${formattedHours}:${minutes} ${ampm}`;
    },
    addHours(timeString, hoursToAdd) {
      const time = moment(timeString, 'HH:mm');
      return time.add(hoursToAdd, 'hours').format('HH:mm');
    }
  },
  computed: {
    googleMapsLink() {
      return `https://www.google.com/maps/search/${this.game.address}`
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  margin-bottom: 0.5rem;
}
</style>
