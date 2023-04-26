<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Player</th>
        <th>AB</th>
        <th>O</th>
        <th>1B</th>
        <th>2B</th>
        <th>3B</th>
        <th>HR</th>
        <th>R</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in players" :key="player.name">
        <td>{{ player.name }}</td>
        <td>{{ player.ab }}</td>
        <td>{{ player.o }}</td>
        <td>{{ player['1b'] }}</td>
        <td>{{ player['2b'] }}</td>
        <td>{{ player['3b'] }}</td>
        <td>{{ player.hr }}</td>
        <td>{{ player.r }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="8" class="text-end">
          <small>AB: At Bats | O: Outs | 1B: Singles | 2B: Doubles | 3B: Triples | HR: Home Runs | R: Runs Scored</small>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.table {
  font-size: 14px;
}

.table th, .table td {
  vertical-align: middle;
}

.table thead th {
  font-weight: bold;
  background-color: #eee;
}

.table tfoot {
  background-color: #f9f9f9;
}

.small {
  font-size: 12px;
  color: #999;
}
</style>