<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="physicals">
    <h2>Physical Measurements</h2>
    <div class="chart-container">
      <canvas ref="physicalChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'PhysicalsModule',
  data() {
    return {
      chart: null,
      physicalData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Weight (kg)',
          data: [70, 71, 70.5, 70.2, 69.8, 69.5],
          borderColor: '#2196F3',
          tension: 0.1
        }, {
          label: 'Body Fat %',
          data: [20, 19.5, 19.2, 18.8, 18.5, 18.2],
          borderColor: '#F44336',
          tension: 0.1
        }]
      }
    }
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      const ctx = this.$refs.physicalChart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.physicalData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      })
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>

<style scoped>
.physicals {
  padding: 20px;
}

.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
