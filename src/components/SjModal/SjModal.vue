<template>
  <a-modal
    :visible="visible"
    @ok="emit('ok')"
    @cancel="emit('cancel')"
    v-bind="defaultProps"
  >
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { useAttrs } from "@vue/runtime-core";
import { defineEmits, defineProps, reactive } from "vue";

interface IProps {
  visible: boolean;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "ok"): void;
}>();

// eslint-disable-next-line no-undef
let attrs = reactive({});
try {
  attrs = useAttrs() || reactive({});
} catch (error) {
  // console.error("error-----", error);
}

const defaultProps = {
  centered: true,
  cancelText: "取消",
  okText: "确定",
  maskClosable: false,
  keyboard: false,
  ...attrs,
};
</script>
