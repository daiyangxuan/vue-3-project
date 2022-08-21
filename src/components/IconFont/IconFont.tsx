import {defineComponent} from '@vue/runtime-core'
import {createFromIconfontCN} from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '/font/iconfont.js',
})

export default defineComponent({
  props: {
    type: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <IconFont
        style={{
          fontSize: `${props.size}px`,
          color: props.color,
        }}
        type={props.type}
      />
    )
  },
})
