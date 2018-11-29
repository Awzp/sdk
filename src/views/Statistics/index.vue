<template>
  <div>
    <filter-tab/>
    <bag-box title="趋势总览">
      <StTotal slot="content" />
    </bag-box>
    <bag-box title="详细数据">
      <StTable slot="content" />
    </bag-box>
  </div>
</template>

<script>
import BagBox from '@/components/BagBox'
import FilterTab from './components/FilterTab'
import StTotal from './components/StTotal'
import StTable from './components/StTable'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    BagBox,
    FilterTab,
    StTotal,
    StTable
  },
  created() {
  },
  methods: {
  }
}
</script>
