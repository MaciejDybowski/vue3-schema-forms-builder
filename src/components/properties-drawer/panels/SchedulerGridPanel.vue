<template>
  <expansion-panel
    :active="active"
    :title="t('schedulerGrid.title')"
    value="legend"
  >

    <v-container class="px-2" style="max-width: 350px;">
      <v-row dense>
        <v-col v-for="(item, index) in legend" :key="index" cols="12">
          <v-card class="pa-3 mb-2 elevation-1" flat style="border-radius: 8px;">
            <!-- Status + Label + Delete -->
            <v-row align="center" dense>
              <v-col cols="6">
                <v-text-field
                  v-model="item.statusKey"
                  density="compact"
                  hide-details
                  label="Status"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="item.label"
                  density="compact"
                  hide-details
                  label="Label"
                  variant="outlined"
                />
              </v-col>
              <v-col class="d-flex justify-center" cols="1">
                <v-btn
                  color="error"
                  density="compact"
                  icon="mdi-delete"
                  variant="text"
                  @click="removeItem(index)"
                />
              </v-col>
            </v-row>

            <!-- Color Inputs -->
            <v-row align="center" class="mt-2" dense>
              <!-- Light Color -->
              <v-col class="d-flex align-center" cols="6">
                <input
                  v-model="item.colors.light"
                  class="color-box"
                  type="color"
                />
                <span class="text-caption ml-2">Light</span>
              </v-col>

              <!-- Dark Color -->
              <v-col class="d-flex align-center" cols="6">
                <input
                  v-model="item.colors.dark"
                  class="color-box"
                  type="color"
                />
                <span class="text-caption ml-2">Dark</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Add Button -->
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            color="primary"
            density="compact"
            prepend-icon="mdi-plus"
            variant="outlined"
            @click="addItem"
          >
            Add legend item
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </expansion-panel>

</template>

<script lang="ts" setup>
import {computed} from 'vue'
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

export type LegendItem = {
  statusKey: string
  label: string
  colors: { light: string; dark: string }
}

const {t} = useBuilderLocale();

const props = withDefaults(defineProps<{
  active?: boolean
  modelValue: LegendItem[]

}>(), {
  active: false,
  modelValue: [] as any
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: LegendItem[]): void
}>()

const legend = computed<LegendItem[]>({
  get: () => props.modelValue,
  set: (v) => emits('update:modelValue', v),
})

const addItem = () => {
  legend.value.push({
    statusKey: '',
    label: '',
    colors: {light: '#C8C8C8', dark: '#333333'},
  })
}

const removeItem = (index: number) => legend.value.splice(index, 1)
</script>


<style lang="scss" scoped>
.color-box {
  width: 40px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
}
</style>
