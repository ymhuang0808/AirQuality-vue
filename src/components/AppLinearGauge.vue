<template>
  <canvas ref="appLinearGauge" v-bind:width="lWidth" v-bind:height="linearGaugeHeight"></canvas>
</template>

<script>
  const widthScale = 4
  const heightScale = 1

  export default {
    name: 'AppLinearGauge',
    props: {
      lWidth: Number,
      stops: Array,
      maxValue: Number,
      lValue: Number
    },
    computed: {
      linearGaugeHeight: function () {
        return this.getLinearGaugeHeight(this.lWidth)
      }
    },
    methods: {
      getLinearGaugeHeight (width) {
        // console.log('getLinearGaugeHeight')
        // console.log('width = ' + width)

        let height = width * (heightScale / widthScale)
        // console.log('height = ' + height)
        return height
      },
      getColorByValue (value) {
        let startValue
        let endValue
        let color
        let maxValue = this.stops[this.stops.length - 1][0]

        // console.log('value = ' + value)
        // console.log('maxValue = ' + maxValue)

        if (value > maxValue) {
          // console.log('larger')
          color = this.stops[this.stops.length - 1][1]
        }

        for (let i = 0; i < this.stops.length - 1; i++) {
          startValue = this.stops[i][0]
          endValue = this.stops[i + 1][0]

          // console.log('startValue = ' + startValue)
          // console.log('endValue = ' + endValue)

          if (value >= startValue && value < endValue) {
            color = this.stops[i][1]
            break
          }
        }

        return color
      },
      draw () {
        // console.log('draw()')
        const leftPadding = this.lWidth / 12 + 5
        const rightPadding = this.lWidth / 12 + 5

        let canvas = this.$refs.appLinearGauge
        let ctx

        if (canvas.getContext) {
          ctx = canvas.getContext('2d')
        } else {
          // console.error('Cannot support the canvus')
          return
        }

        // Calculate range parameters
        let stopCount = this.stops.length
        let linearGaugeHeight = this.getLinearGaugeHeight(this.lWidth)
        let rangeWidth = this.lWidth - leftPadding - rightPadding
        let rangeHeight = linearGaugeHeight / 7
        let rangeX = 0 + leftPadding
        let rangeY = linearGaugeHeight - rangeHeight

        let minValue = this.stops[0][0]
        let maxValue = Number(this.maxValue)
        let valueRange = maxValue - minValue + 1

        // console.log('valueRange = ' + valueRange)
        // console.log('rangeWidth = ' + rangeWidth)
        // console.log('rangeHeight = ' + rangeHeight)

        ctx.clearRect(0, 0, this.lWidth, linearGaugeHeight)

        // Draw range line
        this.stops.forEach(function (stop, index, stops) {
          let stageStartValue = stop[0]
          let stageEndValue

          if (index === stopCount - 1) {
            stageEndValue = maxValue
          } else {
            stageEndValue = stops[index + 1][0]
          }

          let percentage = (stageEndValue - stageStartValue) / valueRange
          let stageWidth = percentage * rangeWidth
          let color = stop[1]

          ctx.fillStyle = color
          ctx.fillRect(rangeX, rangeY, stageWidth, rangeHeight)

          rangeX += stageWidth
        })

        // Calculate pointer parameters
        let pointValue = Number(this.lValue)

        // console.log('this.lValue = ' + this.lValue)
        // console.log('maxValue = ' + maxValue)

        // console.log('typeof this.lValue = ' + (typeof this.lValue === 'number'))

        if (pointValue > maxValue) {
          // console.log('larger~~')
          pointValue = maxValue
        }

        // console.log('pointValue = ' + pointValue)

        let pointXPercentage = (pointValue - minValue) / valueRange
        let pointX = pointXPercentage * rangeWidth + leftPadding
        let pointY = rangeY + (rangeHeight / 3)
        let pointXoffset = rangeWidth / 40
        let pointRightX = pointX + pointXoffset
        let pointLeftX = pointX - pointXoffset
        let pointTopY = pointY - rangeHeight

        // console.log('pointXPercentage = ' + pointXPercentage)
        // console.log('pointX = ' + pointX)

        // Draw the triangle bottom border
        let borderWidth = 2

        ctx.strokeStyle = '#ffffff'
        ctx.beginPath()
        ctx.moveTo(pointX, pointY + borderWidth)
        ctx.lineTo(pointRightX + borderWidth, pointTopY)

        ctx.moveTo(pointX, pointY + borderWidth)
        ctx.lineTo(pointLeftX - borderWidth, pointTopY)
        ctx.lineWidth = borderWidth
        ctx.stroke()

        let pointerColor = this.getColorByValue(this.lValue)

        // Draw pointer
        ctx.fillStyle = pointerColor
        ctx.beginPath()
        ctx.moveTo(pointX, pointY)
        ctx.lineTo(pointRightX, pointTopY)
        ctx.lineTo(pointLeftX, pointTopY)
        ctx.fill()

        // Draw text box of pointer
        let boxHalfWidth = this.lWidth / 12
        let boxX = pointX - boxHalfWidth
        let boxY = (pointTopY - rangeHeight * 3) + 1
        let boxWidth = boxHalfWidth * 2
        let boxHeight = rangeHeight * 3

        ctx.fillStyle = pointerColor
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight)

        let fontSize = boxHeight * 0.7
        let textX = boxX + boxHalfWidth
        let textY = boxY + 3 + boxHeight / 2

        // console.log('fontSize = ' + fontSize)
        // Draw text in the text box
        ctx.font = `${fontSize}px Arial`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ffffff'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.lValue, textX, textY)
      }
    },
    mounted: function () {
      // console.log('mounted')

      this.draw()
    }
  }
</script>

<style scoped>

</style>
