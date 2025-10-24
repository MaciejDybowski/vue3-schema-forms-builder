<template>
  <v-dialog
    v-model="showDialog"
    :fullscreen="fullscreen"
    :height="fullscreen ? '' : height"
    :style="fullscreen ? 'top:0;left:0;' : ''"
    :width="fullscreen ? '' : width"
    open-delay="0"
    persistent
  >
    <v-card ref="dialogCardEl" :class="{ resizeable: resazible && !fullscreen }">
      <v-card-title class="py-1 px-2">
        <v-row align="center" dense no-gutters>
          <v-col class="px-4">{{ t('advancedConfiguration') }}</v-col>

          <v-col class="pa-0" cols="auto">
            <v-btn icon variant="text" @click="toggleFullscreen">
              <v-icon size="20">{{ fullscreen ? "mdi-window-restore" : "mdi-window-maximize" }}</v-icon>
            </v-btn>
          </v-col>

          <v-col class="pa-0" cols="auto">
            <v-btn icon variant="text" @click="closeDialog">
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="overflow-y-auto overflow-x-auto px-0">


        <tcn-code-editor
          v-model="localValue"
          :codemirrorOptions="{}"
          height="300px"
          language="text"
        />

      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn v-bind="style.buttonStyle.value" @click="closeDialog">{{ t('cancel') }}</v-btn>
        <v-btn color="primary" v-bind="style.buttonStyle.value" @click="handleSave">{{ t('save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {nextTick, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useStyle} from "@/main";

const {t} = useI18n()
const style = useStyle()

const localValue = defineModel()

const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  height?: string
  resazible?: boolean
  fullscreen?: boolean
  codemirrorOptions?: Record<string, any>
}>(), {
  width: '800px',
  height: '400px',
  resazible: true,
  fullscreen: false,
  codemirrorOptions: () => ({})
})


const emit = defineEmits(['update:modelValue', 'update:show', 'save'])

//const localValue = ref<any>(props.modelValue)
watch(() => localValue.value, val => {
  console.log(val)
  localValue.value = val
}, {deep: true})
watch(() => props.show, val => showDialog.value = val)

const showDialog = ref(props.show)
const fullscreen = ref(props.fullscreen)
const dialogCardEl = ref<any>(null)
const dialogState = {width: '', height: '', top: '', left: ''}

function closeDialog() {
  showDialog.value = false
  emit('update:show', false)
  fullscreen.value = false
}

function handleSave() {
  emit('update:modelValue', localValue.value)
  emit('save', localValue.value)
  showDialog.value = false
  emit('update:show', false)
}

async function toggleFullscreen() {
  await nextTick()
  const el = dialogCardEl.value?.$el as HTMLElement
  if (!el) return

  if (!fullscreen.value) {
    dialogState.width = el.offsetWidth + "px"
    dialogState.height = el.offsetHeight + "px"
    el.style.position = "fixed"
    el.style.top = "0"
    el.style.left = "0"
    el.style.width = "100%"
    el.style.height = "100%"
    el.style.margin = "0"
    document.body.style.overflow = 'hidden'
    fullscreen.value = true
  } else {
    el.style.position = ""
    el.style.top = ""
    el.style.left = ""
    el.style.width = dialogState.width
    el.style.height = dialogState.height
    el.style.margin = ""
    document.body.style.overflow = ''
    fullscreen.value = false
  }
}

</script>

<style lang="scss" scoped>
.resizeable {
  resize: both;
  min-height: 200px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 0.3em;
}

.v-dialog__content {
  overflow: hidden !important;
}
</style>

<i18n lang="json">
{
  "en": {
    "advancedConfiguration": "Advanced configuration",
    "cancel": "Cancel",
    "save": "Save"
  },
  "pl": {
    "advancedConfiguration": "Konfiguracja zaawansowana",
    "cancel": "Anuluj",
    "save": "Zapisz"
  }
}
</i18n>
