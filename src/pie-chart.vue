<template>
<div class="pie-chart" :style="cssVars">
  <svg viewBox="0 0 400 210">
    
    <text class="title-text" x="200" y="20">{{ title }}</text>

    <g v-if="plot.length > 1">
      <g v-for="datum in accumulate(plot)" :key="datum.id">
        
        <path
          class="sector"
          stroke-width="2"
          stroke-linejoin="round"
          :fill="datum.color"
          :style="`--move-x: ${5 * unitCircleX(datum.mid)}px; --move-y: ${5 * unitCircleY(datum.mid)}px;`"
          @click="datum.id !== undefined && $emit('click', datum.id)"
          :d="`
            M ${getCart(datum.start)}
            A 50,50 0 ${datum.end - datum.start > 50 ? '1,1' : '0,1'} ${getCart(datum.end)}
            L 200,120
            Z
          `"/>

        <line
          class="data-line"
          stoke-width="2"
          :x1="getX(datum.mid, 55)"
          :y1="getY(datum.mid, 55)"
          :x2="getX(datum.mid, 70)"
          :y2="getY(datum.mid, 70)"
        />

        <text
          class="data-label"
          :x="getX(datum.mid, 80)"
          :y="getY(datum.mid, 80)"
          :text-anchor="datum.mid < 50 || datum.mid > 97 ? 'start' : 'end'"
        >
          {{ datum.label }} ({{ Math.round(datum.value) }}%)
        </text>
      </g>
    </g>

    <text v-else class="title-text" x="200" y="100">Not enough data</text>
  </svg>
</div>
</template>

<style lang="scss" scoped>

.pie-chart {
  --bg-color: grey;
  --text-color: white;
  background-color: var(--bg-color);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-chart svg {
  width: 100%;
  height: 100%;
}

.sector {
  transition: transform .3s;
  stroke: var(--text-color);
}

.sector:hover {
  transform: translate(var(--move-x), var(--move-y));
}

.sector:hover ~ .data-label {
  font-size: 10.5px;
}

.data-label {
  font-size: 10px;
  transition: font-size .3s;
  fill: var(--text-color);
}

.data-line {
  stroke: var(--text-color);
}

.title-text {
  text-anchor: middle;
  font-size: 16px;
  fill: var(--text-color);
}
</style>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

const RADIUS = 50
const CENTER = { x: 200, y: 120 }

export default Vue.extend({
  props: ['plot', 'title', 'backgroundColor', 'color'],
  computed: {
    cssVars(): string {
      let result = ''
      if (this.color) {
        result += '--text-color: ' + this.color + '; '
      }
      if (this.backgroundColor) {
        result += '--bg-color: ' + this.backgroundColor + '; '
      }
      return result
    },
  },
  methods: {
    accumulate(plot: any[]) {
      let total = 0
      plot.forEach(datum => {
        datum.start = total
        total += datum.value
        datum.end = total
        datum.mid = (datum.start + datum.end) / 2
      })

      if (Math.round(total) < 100) {
        plot.push({
          value: 100 - total,
          start: total,
          mid: (total + 100) / 2,
          end: 100,
          label: 'Other',
          color: 'white',
        })
      }
      return plot
    },
    getCart(percent: number, radius: number = RADIUS) {
      const rad = percent * 3.6 * Math.PI / 180
      const x = CENTER.x + radius * Math.sin(rad)
      const y = CENTER.y - radius * Math.cos(rad)
      return x + ',' + y
    },
    getX(percent: number, radius: number = RADIUS) {
      const rad = percent * 3.6 * Math.PI / 180
      return CENTER.x + radius * Math.sin(rad)
    },
    getY(percent: number, radius: number = RADIUS) {
      const rad = percent * 3.6 * Math.PI / 180
      return CENTER.y - radius * Math.cos(rad)
    },
    unitCircleX(percent: number) {
      const rad = percent * 3.6 * Math.PI / 180
      return Math.sin(rad)
    },
    unitCircleY(percent: number) {
      const rad = percent * 3.6 * Math.PI / 180
      return -Math.cos(rad)
    },
  },
})
</script>

