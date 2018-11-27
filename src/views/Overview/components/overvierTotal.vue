<template>
  <ul class="overview-container_total">
    <ShowItem
      v-for="(item, index) in data"
      :type="item.type"
      :styles="item.style"
      :data="item.data"
      :key="index"
      :fontsize="item.fontSize" />
  </ul>
</template>

<script>
import ShowItem from './showItem'
import { getData } from '@/api/overview'
export default {
  components: {
    ShowItem
  },
  data() {
    return {
      showData: {
        pos: {
          total: 0,
          approve: 0,
          deny: 0,
          added: 0,
          online: 0
        },
        app: {
          total: 0,
          approve: 0,
          deny: 0,
          added: 0
        },
        income: {
          total: 0,
          yestoday: 0,
          week: 0,
          month: 0,
          today: 0
        }

      }
    }
  },
  computed: {
    'data': function() {
      return [{
        style: {
          width: '205px'
        },
        fontSize: '26px',
        type: 'showNumber',
        data: {
          title: '预估总收益',
          number: this.showData.income.total
        }
      }, {
        style: {
          width: '140px'
        },
        type: 'defalut',
        data: {
          title: '应用总数',
          number: this.showData.app.total
        }
      }, {
        style: {
          width: '200px',
          flex: '1'
        },
        type: 'adStatus',
        data: {
          title: '广告位',
          items: {
            put: {
              label: '投放中',
              number: this.showData.pos.online
            },
            audit: {
              label: '审核中',
              number: this.showData.pos.added
            }
          }
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'showNumber',
        data: {
          title: '昨日收益',
          number: this.showData.income.yestoday
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'showNumber',
        data: {
          title: '近7天收益',
          number: this.showData.income.week
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'showNumber',
        data: {
          title: '本月收益',
          number: this.showData.income.month
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'addApp',
        data: {
          title: '添加App'
        }
      }]
    }
  },
  created() {
    getData().then(res => {
      this.showData = res.data
    })
  }
}
</script>
