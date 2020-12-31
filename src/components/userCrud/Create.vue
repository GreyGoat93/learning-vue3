<template>
  <div class="options">
    <button @click="state.optionModal = true">Add</button>
  </div>
  <teleport to="body" v-if="state.optionModal == true">
    <modal @closeModal="state.optionModal = false">
      <div>
        <form @submit.prevent="addUser()">
          <div>
            <label>Avatar URL:</label>
            <input type="text" v-model="state.form.avatarURL" />
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" v-model="state.form.first_name" />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" v-model="state.form.last_name" />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" v-model="state.form.email" />
          </div>
          <button>
            Add
          </button>
        </form>
      </div>
    </modal>
  </teleport>
</template>

<script>
import { reactive } from "vue";
import Modal from "../Modal.vue";
import axios from "../../plugins/axios.js";
export default {
  components: { Modal },
  emits: ["getData"],
  setup(_, { emit }) {
    const state = reactive({
      optionModal: false,
      form: {
        avatarURL: "",
        first_name: "",
        last_name: "",
        email: ""
      }
    });

    function addUser() {
      axios.post("/users", state.form).then(() => {
        emit("getData");
        state.form.avatarURL = "";
        state.form.first_name = "";
        state.form.last_name = "";
        state.form.email = "";
        state.optionModal = false;
      });
    }
    return { state, addUser };
  }
};
</script>

<style></style>
