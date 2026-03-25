<script setup>
import { ref } from 'vue';

  const name = ref("John doe")
  const status = ref("")
  const tasks = ref(["Task 1", "Task 2", "Task 3"])
  const href = "https://google.com"
</script>

<template>
  <h1>Hello, {{ name }}</h1>
  <p v-if="status == 'active'">Active</p>
  <p v-else-if="status == 'pending'">User is pending</p>
  <p v-else>Inactive</p>


  <h1>Tasks:</h1>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <a :href>Google!</a>
</template>