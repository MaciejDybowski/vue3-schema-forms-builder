<template>
  <v-btn
    v-if="!isOpen"
    :style="buttonStyle"
    color="primary"
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
    <!-- Przycisk zamykający w dokładnie tym samym miejscu -->
    <v-btn
      :style="buttonStyle"
      color="primary"
      icon
      size="large"
      style="pointer-events: auto; position: fixed"
      @click="isOpen = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-card
      :style="cardStyle"
      class="d-flex flex-column"
      height="550"
      style="pointer-events: auto"
      width="380"
    >
      <v-card-title class="text-primary flex-shrink-0">
        AI Chatbot
      </v-card-title>

      <v-divider class="flex-shrink-0"/>

      <v-card-text class="d-flex flex-column pa-0" style="flex: 1; min-height: 0;">
        <!-- Obszar czatu z przewijaniem -->
        <div
          ref="chatContainer"
          class="flex-grow-1"
          style="overflow-y: auto; padding: 0 16px;"
        >
          <v-list class="pa-0">
            <v-list-item
              v-for="(msg, i) in messages"
              :key="i"
              :ref="i === messages.length - 1 ? 'lastMessage' : undefined"
              class="px-0"
            >
              <div
                :class="[
                  'pa-2 rounded mb-2',
                  msg.from === 'user' ? 'bg-primary text-white ml-auto' : 'bg-grey-lighten-4'
                ]"
                style="max-width: 80%"
              >
                {{ msg.text }}
              </div>
            </v-list-item>
          </v-list>
        </div>

        <!-- Pole tekstowe o stałej wysokości -->
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
import {computed, nextTick, ref, watch} from 'vue'
import {useDrawers} from '@/composables/useDrawers'
import {useStyle} from "@/main";

const drawers = useDrawers()
const isOpen = ref(false)
const newMessage = ref('')
const messages = ref([
  {from: 'ai', text: 'Cześć! Jak mogę pomóc?'}
])

const style = useStyle()
const chatContainer = ref<HTMLElement | null>(null)
const lastMessage = ref<HTMLElement | null>(null)

// Funkcja do płynnego przewijania do dołu
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

// Alternatywna metoda z scrollIntoView
const scrollToLastMessage = async () => {
  await nextTick()
  if (lastMessage.value) {
    lastMessage.value.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
}

// Obserwuj zmiany w wiadomościach i automatycznie przewijaj
watch(messages, async () => {
  await scrollToBottom()
}, {deep: true})

// Przewijaj do dołu gdy otwiera się czat
watch(isOpen, async (newValue) => {
  if (newValue) {
    await scrollToBottom()
  }
})

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  messages.value.push({from: 'user', text: newMessage.value})
  const userText = newMessage.value.toLowerCase()
  newMessage.value = ''

  // Przewiń po dodaniu wiadomości użytkownika
  await scrollToBottom()

  setTimeout(async () => {
    const reply = userText.includes('test') ? 'Test OK ✅' : 'Interesujące! 🤔'
    messages.value.push({from: 'ai', text: reply})
    // Przewijanie nastąpi automatycznie przez watcher
  }, 500)
}

const offset = computed(() =>
  (drawers.propertiesDrawer.value ? 350 : 0) + 24
)

const buttonStyle = computed(() => ({
  position: 'fixed',
  bottom: '24px',
  right: `${offset.value}px`,
  transition: 'right 0.3s ease'
}))

const cardStyle = computed(() => ({
  marginRight: `${drawers.propertiesDrawer.value ? 350 : 0}px`,
  marginBottom: '88px',
  transition: 'margin-right 0.3s ease'
}))
</script>
