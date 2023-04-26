<template>
  <div>
    <div v-if="game">
      <h2>{{game.opponent}} - {{ formattedDate }}</h2>
      <StatTable :players="game.players" />
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import StatTable from '@/components/StatTable.vue'

export default {
  components: {
    StatTable
  },
  setup() {
    const game = ref(null)
    const route = useRoute()
    const date = computed(() => route.params.date)
    const formattedDate = computed(() => {
      const options = {weekday: 'long', month: 'long', day: 'numeric'}
      return new Date(date.value + 'T00:00:00-07:00').toLocaleDateString('en-US', options)
    })

    onMounted(async () => {
      try {
        const response = await axios.get(`/stats/${date.value}.json`)
        game.value = response.data
      } catch (error) {
        console.error(error)
      }
    })

    return {
      game,
      formattedDate
    }
  },
  methods: {
    formatDate(date) {
      const options = {weekday: 'long', month: 'long', day: 'numeric'}
      return new Date(date + 'T00:00:00-07:00').toLocaleDateString('en-US', options)
    }
  }
}
</script>
