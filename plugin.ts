import { VueConstructor } from 'vue'

import PieChart from './pie-chart.vue'

module.exports = {
  install(Vue: VueConstructor) {
    Vue.component('pie-chart', PieChart)
  },
}
