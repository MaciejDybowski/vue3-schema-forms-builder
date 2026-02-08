<template>
  <v-btn
    v-if="!isOpen"
    :style="buttonStyle as StyleValue"
    icon
    size="large"
    @click="isOpen = true"
  >
    <v-icon>mdi-robot</v-icon>
  </v-btn>

  <v-overlay
    v-model="isOpen"
    :scrim="false"
    class="d-flex justify-end align-end"
    style="pointer-events: none"
  >
    <v-btn
      :style="buttonStyle as StyleValue"
      icon
      size="large"
      style="pointer-events: auto; position: fixed; z-index: 2001;"
      @click="isOpen = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-card
      :style="cardStyle as StyleValue"
      class="d-flex flex-column"
      :color="theme.isLightTheme.value ? 'grey-lighten-5': 'grey-darken-3'"
      height="480"
      style="pointer-events: auto; z-index: 2000;"
      width="380"
    >
      <v-card-title class="flex-shrink-0">
        AI Chatbot
      </v-card-title>

      <v-divider class="flex-shrink-0"/>

      <v-card-text class="d-flex flex-column pa-0" style="flex: 1; min-height: 0;">
        <div
          ref="chatContainer"
          class="flex-grow-1"
          style="overflow-y: auto; padding: 0 16px;"
        >
          <v-list class="pa-0"
                  :style="theme.isLightTheme.value ? 'background-color: #FAFAFA;' : 'background-color: #424242;'">
            <v-list-item
              v-for="(msg, i) in messages"
              :key="i"
              class="px-0"
            >
              <div
                :class="[
                  'pa-2 rounded mb-2',
                  msg.from === 'user' ? 'bg-primary text-white ml-auto' : theme.isLightTheme.value ? 'bg-grey-lighten-3' : 'bg-grey-darken-2'
                ]"
                style="max-width: 85%"
              >
                {{ msg.text }}
              </div>
              <div v-if="msg.showAiActions" class="my-2">
                <v-btn
                  class="mr-2"
                  color="green"
                  size="x-small"
                  v-bind="style.buttonStyle.value"
                  @click="accept(msg)"
                >
                  {{ t('accept') }}
                </v-btn>
                <v-btn
                  class="ml-2"
                  color="error"
                  size="x-small"
                  v-bind="style.buttonStyle.value"
                  @click="reject(msg)"
                >
                  {{ t('reject') }}
                </v-btn>
              </div>
            </v-list-item>
          </v-list>
        </div>

        <div class="flex-shrink-0 pa-3 pt-0">
          <v-textarea
            v-model="newMessage"
            append-inner-icon="mdi-send"
            auto-grow
            max-rows="4"
            no-resize
            placeholder="Napisz wiadomość..."
            rows="2"
            v-bind="style.inputStyle.value"
            @keyup.enter="sendMessage"
            @click:append-inner="sendMessage"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import {computed, nextTick, ref, StyleValue, watch} from 'vue'
import {useDrawers} from '@/composables/useDrawers'
import {useStyle} from "@/main";
import axios from "axios";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import {useVTheme} from "@/composables/useVTheme";

const theme = useVTheme()

const {t} = useBuilderLocale()
const drawers = useDrawers()
const isOpen = ref(false)
const newMessage = ref('')
const messages = ref([
  {
    from: 'ai',
    text: t('helloMessage'),
    showAiActions: false
  }
])

const emits = defineEmits<{
  (e: "preview", val: any),
  (e: "accept"),
  (e: "reject"),
}>()

const style = useStyle()
const chatContainer = ref<HTMLElement | null>(null)

const {schema} = defineProps<{
  schema: any
}>()

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

watch(messages, async () => {
  await scrollToBottom()
}, {deep: true})

watch(isOpen, async (newValue) => {
  if (newValue) {
    await scrollToBottom()
  }
})

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  newMessage.value = newMessage.value.trim()

  messages.value.push({from: 'user', text: newMessage.value, showAiActions: false})
  const userText = newMessage.value.toLowerCase()
  newMessage.value = ''

  await scrollToBottom()

  messages.value.push({
    from: 'ai',
    text: t('workInProgress'),
    showAiActions: false
  })
  await callAiModel(userText)
}

async function callAiModel(message: string) {
  try {
    const response = await axios.post('/api/assist/form', {
      userMessage: message,
      currentFormJson: schema
    })
    messages.value.push({
      from: 'ai',
      text: response.data.rationale,
      showAiActions: true,
    })
    emits("preview", response.data.updatedFormJson)
  } catch (e) {
    console.error(e)

    messages.value.push({
      from: 'ai',
      text: t('sthWentWrong'),
      showAiActions: false
    })
  }
}

function accept(mes) {
  mes.showAiActions = false
  emits('accept')
}

function reject(mes) {
  mes.showAiActions = false
  emits('reject')
}

const offset = computed(() =>
  (drawers.propertiesDrawer.value ? 350 : 0) + 24
)

const buttonStyle = computed((): StyleValue => ({
  position: 'fixed' as const,
  bottom: '24px',
  right: `${offset.value}px`,
  transition: 'right 0.3s ease',
  zIndex: 2002
}))

const cardStyle = computed((): StyleValue => ({
  marginRight: `${drawers.propertiesDrawer.value ? 380 : 30}px`,
  marginBottom: '88px',
  transition: 'margin-right 0.3s ease'
}))
</script>
