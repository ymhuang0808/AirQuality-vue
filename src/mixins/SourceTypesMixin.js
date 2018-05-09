import SOURCE_TYPE_PROPERTIES from '../libs/sourceTypeProperties'

const SourceTypesMixins = {
  methods: {
    getSourceTypes (sourceType) {
      return SOURCE_TYPE_PROPERTIES[sourceType]
    }
  }
}

export default SourceTypesMixins
