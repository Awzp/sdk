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
export default {
  components: {
    ShowItem
  },
  data() {
    return {
      data: [{
        style: {
          width: '205px'
        },
        fontSize: '26px',
        type: 'showNumber',
        data: {
          title: '预估总收益',
          number: 123443
        }
      }, {
        style: {
          width: '140px'
        },
        type: 'defalut',
        data: {
          title: '应用总数',
          number: 1
        }
      }, {
        style: {
          width: '200px',
          flex: '1'
        },
        type: 'adStatus',
        data: {
          title: '应用总数',
          items: {
            put: {
              label: '投放中',
              number: 12
            },
            audit: {
              label: '审核中',
              number: 0
            },
            unaudit: {
              label: '未审核',
              number: 0
            },
            notPass: {
              label: '未通过',
              number: 0
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
          number: 4324321
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'showNumber',
        data: {
          title: '近7天收益',
          number: 32234433
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'showNumber',
        data: {
          title: '本月收益',
          number: 234243242134312
        }
      }, {
        style: {
          width: '144px'
        },
        fontSize: '18px',
        type: 'addApp',
        data: {
          title: '添加App',
          number: 123
        }
      }]
    }
  }
}
</script>
