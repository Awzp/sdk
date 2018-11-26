<script>
export default {
  name: 'ShowItem',
  props: {
    type: {
      type: String,
      default: 'showNumber'
    },
    styles: {
      type: Object,
      default: function() {
        return { width: '180px' }
      }
    },
    data: {
      type: Object,
      required: true
    },
    fontsize: {
      type: String,
      default: '18px'
    }
  },
  render(createElement) {
    let content
    switch (this.type) {
      case 'showNumber': {
        content = createElement(
          'p',
          {
            class: ['overview-container_total_item_number'],
            style: {
              'font-size': this.fontsize
            }
          },
          `￥${this.data.number}`
        )
        break
      }

      case 'adStatus': {
        const items = this.data.items
        const itemElements = []
        Object.keys(items).forEach(item => {
          itemElements.push(createElement(
            'li',
            `${items[item].label}: ${items[item].number}`
          ))
        })
        content = createElement(
          'ul',
          {
            class: ['overview-container_total_item_ad']
          },
          itemElements
        )
        break
      }
      case 'addApp': {
        content = createElement(
          'el-button',
          {
            attrs: {
              type: 'primary',
              size: 'small',
              icon: 'el-icon-plus'
            },
            class: ['ov-add-app']
          }
        )
        break
      }
      default:
        content = createElement('p', { style: { 'font-size': this.fontsize }}, `${this.data.number}`)
        break
    }
    return createElement(
      'li',
      {
        'class': {
          'overview-container_total_item': true
        },
        style: this.styles
      },
      [
        createElement(
          'p',
          {
            class: ['title']
          },
          this.data.title
        ),
        createElement(
          'div',
          {
            class: ['overview-container_total_content_box']
          },
          [content]
        )
      ]
    )
  }
}
</script>
