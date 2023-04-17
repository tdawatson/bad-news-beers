<template>
  <div class="games-list">
    <h2 class="games-list__title">Upcoming Games</h2>
    <div v-if="games.length">
      <baseball-game v-for="game in games" :key="game.id" :game="game" />
    </div>
    <div v-else>
      <p>No upcoming games.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseballGame from '@/components/BaseballGame.vue';
// import games from '@/data/games.json';

export default {
  name: 'HomeView',
  components: {
    BaseballGame
  },
  data() {
    return {
      games: []
    }
  },
  created() {
    fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
      this.games = data;
    })
    .catch(error => {
      console.error('Error fetching games:', error);
    });
  }
}
</script>

<style scoped>
.games-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.games-list__title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.games-list__empty-message {
  font-size: 16px;
  color: #888;
}

.games-list__empty-message p {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .games-list {
    padding: 10px;
  }
}
</style>
