<template>
  <app-header />
  <div class="container">
    <calendar />
    <todo-list style="display:none;"/>
  </div>  
</template>

<script>
import Calendar from "./components/Calendar";
import AppHeader from "./components/AppHeader";
import TodoList from "./components/TodoList";

export default {
  components: {
    AppHeader, Calendar, TodoList
  }
}

</script>
<style scoped>

</style>
