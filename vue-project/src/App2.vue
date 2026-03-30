<script setup>
import { onMounted, ref } from 'vue';

  const name = ref("John doe")
  const status = ref("")
  const tasks = ref(["Task 1", "Task 2", "Task 3"])
  const href = "https://google.com"
  const newTask = ref("")

  const toggleStatus = () => {
    if (status.value == "active"){
      status.value = "pending"
    } else if (status.value === "pending"){
      status.value = "inactive";
    } else {
      status.value = "active"
    }
  }

  const addTask = () => {
    if (newTask.value.trim() !== ""){
      tasks.value.push(newTask.value)
      newTask.value = ""
    }
  }

  const deleteTask = index => {
    tasks.value.splice(index, 1)
  }

  onMounted(async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      tasks.value = data.map(task => task.title);
    } catch (error){
      console.error("Error fetching tasks:", error)
    }
  })
</script>

<template>
  <h1>Hello, {{ name }}</h1>
  <p v-if="status == 'active'">Active</p>
  <p v-else-if="status == 'pending'">User is pending</p>
  <p v-else>Inactive</p>


  <h1>Tasks:</h1>
  <ul>
    <li v-for="(task, index) in tasks" :key="task" @click="deleteTask(index)">{{ task }}</li>
  </ul>
  <a :href>Google!</a>

  <button @click="toggleStatus">Change Status</button>

  <form @submit.prevent="addTask">
    <label for="newTask">Add task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <p>Your input: {{ newTask }}</p>
</template>