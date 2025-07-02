<template>
  <div class="container">
    <div class="row">
      <FormElements query=""/>

      <RightList
        :list="list2"

      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import LeftList from './LeftList.vue';
import RightList from './RightList.vue';
import FormElements from "@/components/elements-drawer/FormElements.vue";

interface ListItem {
  id: number;
  name: string;
}


const list1 = ref<ListItem[]>([
  {name: "Jan", id: 1},
  {name: "Anna", id: 2},
  {name: "Piotr", id: 3},
  {name: "Maria", id: 4}
]);

const list2 = ref<ListItem[]>([
  {name: "Tomasz", id: 5},
  {name: "Katarzyna", id: 6},
  {name: "Michał", id: 7}
]);


</script>

<style lang="scss">
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.list-group {
  min-height: 200px;
  padding: 10px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
}

.list-group-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: move;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
