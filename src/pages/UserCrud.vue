<template>
  <div class="cont">
    <create @get-data="getData" />
    <div class="users" v-if="state.userLength > 0">
      <div class="user" style="margin-bottom: 0.5em; font-weight: bold">
        <span class="col-1o4">Avatar</span>
        <span class="col-1o4">First Name</span>
        <span class="col-1o4">Last Name</span>
        <span class="col-1o4">Email</span>
        <span class="col-1o4">Actions</span>
      </div>
      <div class="user" v-for="user in state.users" :key="user._id">
        <span class="col-1o4"><img class="image" :src="user.avatarURL"/></span>
        <span class="col-1o4"
          ><p>{{ user.first_name }}</p></span
        >
        <span class="col-1o4"
          ><p>{{ user.last_name }}</p></span
        >
        <span class="col-1o4"
          ><p>{{ user.email }}</p></span
        >
        <span class="col-1o4">
          <button
            @click="deleteUser(user._id)"
            @closeModal="state.optionModal = false"
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "../plugins/axios";
import Create from "../components/userCrud/Create.vue";
export default {
  components: { Create },
  setup() {
    const state = reactive({
      users: [],
      userLength: 0,
      page: 1
      // buttonDelay: false
    });

    function getData() {
      state.buttonDelay = true;
      axios.get(`users`).then(data => {
        state.users = { ...data.data };
        state.userLength = data.data.length;
      });
    }

    function deleteUser(id) {
      axios.delete(`/users/${id}`).then(() => {
        getData();
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

    return { state, prevPage, nextPage, deleteUser, getData };
  }
};
</script>

<style>
.users {
  width: 80%;
  margin: 0 auto;
  margin-top: 1.6em;
}

.user {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin: 0.3em 0;
}

.col-1o4 {
  width: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-1o4 p {
  margin: 0;
  padding: 0;
}

.image {
  height: 60px;
  width: 60px;
  display: block;
}

.buttons {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.options {
  display: flex;
  justify-content: flex-end;
}

.options button,
.button-group button {
  margin: 0 1em;
  border: none;
  background: black;
  color: white;
}

.cover-option {
  width: 100vw;
  height: 100vh;
  background: rgba(25, 25, 25);
  opacity: 25%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 29;
}

.option-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.option-inside {
  display: flex;
  height: 100%;
}

.option {
  background: #fff;
  z-index: 30;
  margin: auto;
  min-width: 40%;
  text-align: center;
  border: #fff 5px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
