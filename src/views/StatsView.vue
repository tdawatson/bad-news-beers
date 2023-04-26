<template>
  <div>
    <h2>Stats for All Games</h2>
    <StatTable :players="combinedPlayers" />
  </div>
</template>

<script>
import StatTable from '@/components/StatTable.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  components: {
    StatTable
  },
  setup() {
    const combinedPlayers = ref([])

    onMounted(async () => {
      const statsFiles = await axios.get('/stats')
      const statsData = await Promise.all(
          statsFiles.data.map(async (file) => {
            const response = await axios.get(`/stats/${file}`)
            return response.data
          })
      )

      const players = statsData.flatMap((game) => game.players)
      const playerNames = new Set(players.map((player) => player.name))
      const uniquePlayers = [...playerNames].map((name) => {
        const playerStats = players.filter((player) => player.name === name)
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
      })

      combinedPlayers.value = uniquePlayers
    })

    return {
      combinedPlayers
    }
  }
}
</script>
