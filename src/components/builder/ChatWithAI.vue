<template>
  <!-- Przycisk otwierania czatu -->
  <v-btn
    class="chat-toggle-btn"
    color="primary"
    icon
    size="large"
    :style="toggleButtonStyle"
    @click="toggleChat"
  >
    <v-icon>{{ isOpen ? 'mdi-close' : 'mdi-robot' }}</v-icon>
  </v-btn>

  <!-- Okno czatu -->
  <v-expand-transition>
    <v-card
      v-if="isOpen"
      elevation="100"

      :style="chatWindowStyle"
    >
      <v-card-title class="text-primary text-h6">
        AI Chatbot
      </v-card-title>

      <v-divider/>

      <v-card-text class="d-flex flex-column flex-grow-1 pa-0">
        <!-- Lista wiadomości -->
        <v-list class="flex-grow-1 px-4" style="overflow-y: auto;">
          <v-list-item
            v-for="(msg, i) in messages"
            :key="i"
            class="px-0"
          >
            <div
              :class="[
                'pa-2 rounded-lg mb-2',
                msg.from === 'user'
                  ? 'bg-primary text-white align-self-end'
                  : 'bg-grey-lighten-4 text-body-1'
              ]"
              style="max-width: 80%; white-space: pre-wrap;"
            >
              {{ msg.text }}
            </div>
          </v-list-item>
        </v-list>

        <!-- Pole tekstowe -->
        <v-text-field
          v-model="newMessage"
          append-inner-icon="mdi-send"
          class="px-3 pb-3"
          clearable
          density="comfortable"
          hide-details
          placeholder="Napisz wiadomość..."
          @keyup.enter="sendMessage"
          @click:append-inner="sendMessage"
        />
      </v-card-text>
    </v-card>
  </v-expand-transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import {useDrawers} from "@/composables/useDrawers";

interface Message {
  from: 'user' | 'ai'
  text: string
}

const drawers = useDrawers();

const DRAWER_WIDTH = 350
const BASE_RIGHT = 24
const OPEN_BOTTOM = 88

const isOpen = ref(false)
const messages = ref<Message[]>([
  { from: 'ai', text: 'Cześć 👋 Jestem Twoim asystentem AI. Jak mogę pomóc?' }
])
const newMessage = ref('')

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const sendMessage = async () => {
  const text = newMessage.value.trim()
  if (!text) return

  messages.value.push({ from: 'user', text })
  newMessage.value = ''
  await nextTick()
  scrollToBottom()

  // Symulowana odpowiedź AI
  setTimeout(() => {
    messages.value.push({
      from: 'ai',
      text: generateReply(text)
    })
    nextTick().then(scrollToBottom)
  }, 600)
}

const generateReply = (text: string) => {
  const lower = text.toLowerCase()
  if (lower.includes('hej') || lower.includes('cześć')) return 'Hej! 😄 Jak się masz?'
  if (lower.includes('test')) return 'Test zakończony powodzeniem ✅'
  return 'Interesujące... powiedz mi więcej 🤔'
}

const scrollToBottom = () => {
  const list = document.querySelector('.v-list')
  if (list) list.scrollTop = list.scrollHeight
}

const rightOffset = computed(() =>
  drawers.propertiesDrawer.value ? DRAWER_WIDTH + BASE_RIGHT : BASE_RIGHT
)

const chatWindowStyle = computed(() => ({
  position: 'fixed',
  bottom: `${OPEN_BOTTOM}px`,
  right: `${rightOffset.value}px`,
  width: '380px',
  height: '480px',
  display: 'flex',
  flexDirection: 'column'
}))
const toggleButtonStyle = computed(() => ({
  position: 'fixed',
  bottom: '24px',
  right: `${rightOffset.value}px`,
}))
</script>

<style scoped>
/* Nie potrzeba zmian w stylu - wszystko w style w JS */
</style>
