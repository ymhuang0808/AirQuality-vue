<template>
  <svg :width="lcWidth" :height="lcHeight">
    <g ref="d3Stage" :style="{transform: `translate(${this.lcMargin.left}px, ${this.lcMargin.top}px)`}">
    </g>
  </svg>
</template>

<script>
  import * as d3 from 'd3'
  import Indicator from '../libs/indicator'
  import IndicatorHelpersMixin from '../mixins/IndicatorHelpersMixin'

  export default {
    name: 'MeasurementsBarChart',
    mixins: [IndicatorHelpersMixin],
    props: {
      lcWidth: {
        type: Number,
        required: true
      },
      lcHeight: {
        type: Number,
        required: true
      },
      lcMargin: {
        type: Object,
        default: () => ({
          left: 0,
          right: 0,
          top: 10,
          bottom: 10
        })
      },
      measurements: {
        type: Array,
        required: true
      },
      property: {
        type: Object,
        required: true
      }
    },
    data: () => {
      return {
        g: null,
        svg: null,
        x: null,
        y: null,
        line: null
      }
    },
    watch: {
      lcWidth: function () {
        console.log('watch lcWidth')
        this.render(this.property.key, this.property.name, this.property.unit)
      },
      lcHeight: function () {
        console.log('watch lcHeight')
        this.render(this.property.key, this.property.name, this.property.unit)
      },
      property: function (value) {
        console.log('watch property')
        console.log(value.key)
        console.log(value.name)
        this.render(value.key, value.name, value.unit)
      }
    },
    computed: {
      innerWidth: function () {
        return this.lcWidth - this.lcMargin.left - this.lcMargin.right
      },
      innerHeight: function () {
        return this.lcHeight - this.lcMargin.top - this.lcMargin.bottom
      }
    },
    methods: {
      getScales (key, count) {
        let self = this
        let x = d3.scaleBand()
          .range([0, this.innerWidth])
          .padding(0.2)
          .domain(this.measurements.map(d => {
            return self.parseTime(d.start_datetime)
          }))
        let y = d3.scaleLinear()
          .range([this.innerHeight, 0])
          .domain(d3.extent(this.measurements, (d) => {
            let data = d.values[key]
            return data
          }))

        return { x: x, y: y }
      },
      parseTime (str) {
        return d3.timeParse('%Y-%m-%dT%H:%M:%S%Z')(str)
      },
      createAxis (scale, xCount) {
        let axisX = d3.axisBottom(scale.x)
          .ticks(xCount / 2)
          .tickFormat((d) => {
            return d3.timeFormat('%H')(d)
          })
        let axisY = d3.axisLeft(scale.y).ticks(5)

        return { x: axisX, y: axisY }
      },
      drawXY (axis, unit) {
        if (this.x === null) {
          this.x = this.g.append('g')
        }
        this.x.exit().remove()
        this.x.attr('class', 'x-axis')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(axis.x)

        let xTickText = this.x.selectAll('text')
        xTickText.style('text-anchor', 'end')
          .attr('dx', '-.8em')
          .attr('dy', '-.55em')
          .attr('transform', 'rotate(-90)')

        if (this.y === null) {
          this.y = this.g.append('g')
        }
        this.y.exit().remove()
        this.y.attr('class', 'y-axis')
          .call(axis.y)
          .append('text')
          .attr('fill', '#000')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text(unit)
      },
      drawBar (scale, key) {
        const standard = this.getStandardInfo(Indicator.STANDARDS.custom.name)
        console.log(standard)
        let self = this
        this.g.selectAll('.bar').remove()
        let bar = this.g.selectAll('.bar')
          .data(this.measurements)
        bar.exit().remove()
        bar.enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => {
            console.log('drawBar... x')
            return scale.x(self.parseTime(d.start_datetime))
          })
          .attr('y', d => { return scale.y(d.values[key]) })
          .attr('width', scale.x.bandwidth())
          .attr('height', d => { return self.innerHeight - scale.y(d.values[key]) })
          .attr('fill', (d) => {
            console.log('fill.....')
            let value = d.values[key]
            const indicatorInfo = self.findIndicatorInfo(standard[key], value)
            let color = indicatorInfo.colorStop[1]
            return color
          })
      },
      render (key, propertyName, unit) {
        console.log('render')
        console.log('key = ' + key)
        let count = this.measurements.length
        let scales = this.getScales(key, count)
        let axis = this.createAxis(scales, count)

        this.svg = d3.select(this.$el)
        this.g = d3.select(this.$refs.d3Stage)

        this.drawXY(axis, unit)
        this.drawBar(scales, key)
      }
    },
    mounted: function () {
      this.render(this.property.key, this.property.name, this.property.unit)
    }
  }
</script>

<style scoped>

</style>
