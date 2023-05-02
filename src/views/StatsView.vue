<template>
  <div>
    <h2>Stats for All Games</h2>
    <StatTable :players="combinedPlayers" />
  </div>
</template>

<script>
import StatTable from '@/components/StatTable.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios';

export default {
  components: {
    StatTable
  },
  setup() {
    const combinedPlayers = ref([])

    onMounted(async () => {
      const response = await axios.get('/data/games.json')
      const games = response.data;
      const statsData = games.map(game => game.player_stats).filter(stats => stats !== undefined).flat();
      console.log(statsData)

      const playerNames = new Set(statsData.map((player) => player.name))
      combinedPlayers.value = [...playerNames].map((name) => {
        const playerStats = statsData.filter((player) => player.name === name)
        return {
          name,
          ab: playerStats.reduce((acc, curr) => acc + curr.ab, 0),
          o: playerStats.reduce((acc, curr) => acc + curr.o, 0),
          '1b': playerStats.reduce((acc, curr) => acc + curr['1b'], 0),
          '2b': playerStats.reduce((acc, curr) => acc + curr['2b'], 0),
          '3b': playerStats.reduce((acc, curr) => acc + curr['3b'], 0),
          hr: playerStats.reduce((acc, curr) => acc + curr.hr, 0),
          r: playerStats.reduce((acc, curr) => acc + curr.r, 0)
        }
      }).sort((a, b) => {
        if (b.ab === a.ab) {
          return b.r - a.r; // sort by r in descending order if ab is the same
        }
        return b.ab - a.ab; // sort by ab in descending order
      });
    })

    return {
      combinedPlayers
    }
  }
}
</script>
