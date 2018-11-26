<template>
  <div class="overview-container">
    <bag-box title="收益总览">
      <overview-total slot="content" />
    </bag-box>
    <bag-box title="数据概况">
      <overview-data slot="content" />
    </bag-box>
  </div>
</template>

<script>
import BagBox from '@/components/BagBox'
import overviewTotal from './components/overvierTotal'
import overviewData from './components/overviewData'
export default {
  components: {
    BagBox,
    overviewTotal,
    overviewData
  }
}
</script>
