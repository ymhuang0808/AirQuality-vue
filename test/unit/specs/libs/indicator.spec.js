import Indicator from '@/libs/indicator'

describe('Indicator', () => {
  describe('getPm25LevelInfo()', () => {
    it('should get correct PM2.5 level info when the value is 40', () => {
      let levelInfo = Indicator.getPm25LevelInfo(40, 'TW_AQI')
      expect(levelInfo.index)
        .to.equal(0)
      expect(levelInfo.color)
        .to.equal('#00e800')
      expect(levelInfo.description)
        .to.equal('good')
    })

    it('should get correct PM2.5 level info when the value is 187', () => {
      let levelInfo = Indicator.getPm25LevelInfo(187, 'TW_AQI')
      expect(levelInfo.index)
        .to.equal(2)
      expect(levelInfo.color)
        .to.equal('#ff7e00')
      expect(levelInfo.description)
        .to.equal('unhealthy_for_sensitive')
    })
  })
})
