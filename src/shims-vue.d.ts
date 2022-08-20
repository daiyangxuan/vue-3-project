declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module 'vue-router'
declare module '@ant-design/*'
declare module 'lodash'
declare module 'ant-design-vue'
declare module 'ant-design-vue/*'
