export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    dataType: {
      type: String,
      default: 'object' // object/value
    }
  },
  data() {
    return {
      list: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      initial: false,
      dataMap: {},
      smallMap: {}
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        let parent
        let child
        if (this.dataType === 'object') {
          parent = this.dataMap[val[0]]
          child = this.smallMap[val[1]]
        } else {
          parent = val[0]
          child = val[1]
        }
        this.$emit('change', [parent, child])
      }
    }
  },
  watch: {
    'value'(val) {
      this.initData(val)
    }
  },
  created() {
    this.initData(this.value)
  },
  methods: {
    listParent() {
      throw new Error('请重写listParent')
    },
    listChildren() {
      throw new Error('请重写listChildren')
    },
    init() {
      if (this.initial === false) {
        this.initial = true
        return this.listParent().then(data => {
          this.list = data.map(v => {
            this.dataMap[v.value] = v
            v.children = []
            return v
          })
        })
      }
      return Promise.resolve()
    },
    initData(val) {
      if (val && val[0] && !this.initial) {
        this.init().then(() => {
          if (val[1]) {
            this.handleItemChange(val).then(() => {
              this.computedValue = val
            })
          } else {
            this.computedValue = val
          }
        })
      }
    },
    handleItemChange(val) {
      let value = val[0]
      if (value && this.dataMap[value] && !this.dataMap[value].children.length) {
        return this.listChildren(value).then(data => {
          data.forEach(v => {
            this.smallMap[v.value] = v
          })
          this.dataMap[value].children = data
        })
      }
      return Promise.resolve()
    }
  }
}