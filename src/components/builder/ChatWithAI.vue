<template>
  <v-btn
    v-if="!isOpen"
    color="primary"
    icon
    size="large"
    :style="buttonStyle"
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
      color="primary"
      icon
      size="large"
      :style="buttonStyle"
      style="pointer-events: auto; position: fixed"
      @click="isOpen = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <!-- Okno czatu -->
    <v-card
      width="380"
      height="480"
      class="d-flex flex-column"
      :style="cardStyle"
      style="pointer-events: auto"
    >
      <v-card-title class="text-primary">
        AI Chatbot
      </v-card-title>

      <v-divider/>

      <v-list class="flex-grow-1" style="overflow-y: auto;">
        <v-list-item v-for="(msg, i) in messages" :key="i">
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

      <v-text-field
        v-model="newMessage"
        append-inner-icon="mdi-send"
        placeholder="Napisz wiadomość..."
        class="ma-3"
        @keyup.enter="sendMessage"
        @click:append-inner="sendMessage"
      />
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDrawers } from '@/composables/useDrawers'

const drawers = useDrawers()
const isOpen = ref(false)
const newMessage = ref('')
const messages = ref([
  { from: 'ai', text: 'Cześć! Jak mogę pomóc?' }
])

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({ from: 'user', text: newMessage.value })
  const userText = newMessage.value.toLowerCase()
  newMessage.value = ''

  setTimeout(() => {
    const reply = userText.includes('test') ? 'Test OK ✅' : 'Interesujące! 🤔'
    messages.value.push({ from: 'ai', text: reply })
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
