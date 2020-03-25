import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    roleDict() {
      return this.mapRoleDict()
    },
    mixinAreaSub() {
      return this.citysList()
    }
  },
  mounted() {
    this.initMixinRoleDict()
  },
  methods: {
    ...mapActions(['getRoleDict']),
    ...mapGetters(['mapRoleDict']),
    initMixinRoleDict() {
      this.getRoleDict()
    }
  }
}