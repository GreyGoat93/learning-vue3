<template>
  <div style="width: 90%; margin: 0 auto;">
    <div>
      <h1>Yapılacaklar Listesi</h1>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(task, index) in tasks" :key="task.id">
        <div class="list-name">{{ task.name }}</div>
        <button class="btn btn-primary" @click="removeTask(index)">x</button>
      </li>
    </ul>
    <div class="add-task">
      <input v-model="newTask" ref="newTaskRef" />
      <button @click="addTask(newTask)">Add</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
export default {
  setup() {
    const newTask = ref("");
    const newTaskRef = ref("");
    const tasks = ref([
      { id: 0, name: "Evi Temizle" },
      { id: 1, name: "Ekmek Al" },
      { id: 2, name: "Yemek Yap" },
      { id: 3, name: "Dişini Fırçala" },
      { id: 4, name: "Çöp At" }
    ]);

    const maxTaskId = computed(() => {
      return tasks.value.length <= 0
        ? -1
        : Math.max(...tasks.value.map(a => a.id));
    });

    function addTask(task) {
      tasks.value.push({ id: maxTaskId.value + 1, name: task });
      newTask.value = "";
    }
    function removeTask(index) {
      tasks.value.splice(index, 1);
    }

    onMounted(() => {
      newTaskRef.value.focus();
    });

    return { newTask, tasks, addTask, removeTask, newTaskRef };
  }
};
</script>

<style scoped>
.list-item {
  margin: 0.7em 0;
  display: flex;
  justify-content: space-between;
}

.list {
  list-style-type: none;
  width: 100%;
  padding: 0;
}

.list-name {
  width: 200px;
  display: flex;
  align-items: center;
}

.add-task {
  width: 100%;
}

.add-task input {
  width: 70%;
}

.add-task button {
  width: 30%;
}

h1 {
  text-align: center;
}
</style>
