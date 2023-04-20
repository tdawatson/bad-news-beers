<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h5 class="card-title mb-0">{{ formatDate(game.date) }} at {{ formatTime(game.start_time) }}</h5>
    </div>
    <div class="card-body">
      <p><strong>Opponent:</strong> {{ game.opponent }}</p>
      <p><strong>Location:</strong> <a :href="googleMapsLink" target="_blank">{{ game.location }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseballGame',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { dateStyle: 'long' }
      return new Date(date).toLocaleDateString('en-US', options)
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':');
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${formattedHours}:${minutes} ${ampm}`;
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
