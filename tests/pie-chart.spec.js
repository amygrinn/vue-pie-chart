import Vue from 'vue'
import { expect } from 'chai'

import '../dist/vue-pie-chart.min'

let PieChart

window.PieChart.install({
  component(s, c) {
    PieChart = Vue.extend(c)
  }
})

describe('Pie Chart', () => {

  describe('Styles', () => {
    it('Sets css vars to be empty string if no props', () => {
      const vm = new PieChart()
      expect(vm.cssVars).to.be.empty
    })

    it('Sets background var if prop passed in', () => {
      const vm = new PieChart({
        propsData: {
          backgroundColor: 'blue'
        }
      })

      expect(vm.cssVars).to.include('--bg-color: blue')
    })

    it('Sets foreground color if prop passed in', () => {
      const vm = new PieChart({
        propsData: {
          color: 'green'
        }
      })

      expect(vm.cssVars).to.include('--text-color: green')
    })

    it('Sets both foreground and background if props passed in', () => {
      const vm = new PieChart({
        propsData: {
          backgroundColor: 'black',
          color: 'yellow'
        }
      })

      expect(vm.cssVars).to.include('--bg-color: black')
      expect(vm.cssVars).to.include('--text-color: yellow')
    })
  })

  describe('Accumulate', () => {
    const accumulate = new PieChart().accumulate

    it('Adds \'other\' section to plot for remaining percentage', () => {
      const result = accumulate([])
      expect(result[0].label).to.equal('Other')
    })

    it('It accumulates the total as start and end props', () => {
      const result = accumulate([
        { value: 20 },
        { value: 40 },
      ])

      expect(result[1].start).to.equal(20)
      expect(result[1].end).to.equal(60)
    })

    it('It adds a midpoint to each datum', () => {
      const result = accumulate([
        { value: 20 },
        { value: 40 },
      ])

      expect(result[1].mid).to.equal(40)
    })
  })

  describe('Get Cartesian Coordinates', () => {
    const getCart = new PieChart().getCart

    it('Returns a point at the middle top if percent is 0', () => {
      expect(getCart(0)).to.equal('200,70')
    })

    it('Returns a point at right middle if percent is 25', () => {
      expect(getCart(25)).to.equal('250,120')
    })
  })

  describe('Get X Cartesian Coordinate', () => {
    const getX = new PieChart().getX

    it('Returns center x when percent is 50', () => {
      expect(getX(50)).to.equal(200)
    })
  })

  describe('Get Y Cartesian Coordinate', () => {
    const getY = new PieChart().getY
  
    it('Returns center y when percent is 75', () => {
      expect(getY(75)).to.be.closeTo(120, .01)
    })
  })

  describe('Get unit circle x coordinate', () => {
    const unitCircleX = new PieChart().unitCircleX

    it('Returns 0 if percent is 50', () => {
      expect(unitCircleX(50)).to.be.closeTo(0, .01)
    })
  })

  describe('Get unit circle y coordinate', () => {
    const unitCircleY = new PieChart().unitCircleY

    it('Returns 1 if percent is 50', () => {
      expect(unitCircleY(50)).to.be.closeTo(1, .01)
    })
  })
})

