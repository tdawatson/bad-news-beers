<template>
  <div className="games-list">
    <h2 className="games-list__title">Upcoming Games</h2>
    <div v-if="upcomingGames.length">
      <baseball-game v-for="game in upcomingGames" :key="game.id" :game="game" :is-upcoming=true />
    </div>
    <div v-else>
      <p>No upcoming games.</p>
    </div>
    <h2 className="games-list__title">Past Games</h2>
    <div v-if="pastGames.length">
      <baseball-game v-for="game in pastGames" :key="game.id" :game="game" :is-upcoming=false />
    </div>
    <div v-else>
      <p>No past games.</p>
    </div>
  </div>
</template>

<script>
import BaseballGame from '@/components/BaseballGame.vue';

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
  computed: {
    upcomingGames() {
      const now = new Date();
      return this.games.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate > now.setDate(now.getDate());
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    pastGames() {
      const now = new Date();
      return this.games.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate < now.setDate(now.getDate());
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  created() {
    fetch('data/games.json').then(response => response.json()).then(data => {
      this.games = data;
    }).catch(error => {
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
