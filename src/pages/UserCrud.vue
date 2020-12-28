<template>
  <div class="cont">
    <div class="users" v-if="state.users.length !== 0">
      <div class="user" style="margin-bottom: 0.5em; font-weight: bold">
        <span class="col-1o3">Email</span>
        <span class="col-1o3">First Name</span>
        <span class="col-1o3">Last Name</span>
      </div>
      <div class="user" v-for="user in state.users" :key="user.id">
        <span class="col-1o3">{{ user.email }}</span>
        <span class="col-1o3">{{ user.first_name }}</span>
        <span class="col-1o3">{{ user.last_name }}</span>
      </div>
      <div class="buttons">
        <div class="button-group">
          <button
            :disabled="state.buttonDelay"
            v-if="state.page != 1"
            @click="prevPage"
          >
            Prev
          </button>
          <button
            :disabled="state.buttonDelay"
            v-if="state.page < state.totalPage"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      users: [],
      page: 1,
      totalPage: null,
      buttonDelay: false
    });

    function getData() {
      state.buttonDelay = true;
      axios.get(`https://reqres.in/api/users?page=${state.page}`).then(data => {
        console.log(data);
        state.users = { ...data.data.data };
        state.totalPage = data.data.total_pages;
        state.buttonDelay = false;
      });
    }

    function prevPage() {
      state.page -= 1;
      getData();
    }

    function nextPage() {
      state.page += 1;
      getData();
    }

    onMounted(() => {
      getData();
    });

    return { state, prevPage, nextPage };
  }
};
</script>

<style scoped>
.users {
  width: 80%;
  margin: 0 auto;
  margin-top: 1.6em;
}

.user {
  display: flex;
  justify-content: space-between;
}

.col-1o3 {
  width: 33.33333333%;
  text-align: center;
}

.buttons {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.button-group button {
  margin: 0 1em;
  border: none;
  background: black;
  color: white;
}
</style>
