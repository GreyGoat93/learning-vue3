<template>
  <div class="cont">
    <div class="header">
      <h1>Chat</h1>
    </div>
    <div class="chat">
      <div class="messages" ref="messages">
        <div
          class="message"
          v-for="chat in state.chats"
          :key="chat.message"
          :class="chat.uid == uid ? 'm-align-right' : 'm-align-left'"
        >
          <p>
            {{ chat.message }}
          </p>
        </div>
      </div>
      <div class="input-field">
        <input v-model="state.message" @keydown.enter="addMessage" />
        <button @click="addMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { chatsRef } from "../utilities/firebase";
export default {
  setup() {
    const store = useStore();
    const messages = ref("");
    const state = reactive({
      chats: [],
      message: "",
      scrollHeight: messages.value.scrollHeight,
      scrollTop: messages.value.scrollTop,
      firstScroll: true
    });

    const uid = computed(() => {
      if (store.state.user != null) {
        return store.state.user.uid;
      } else {
        return null;
      }
    });

    function addMessage() {
      chatsRef.push({
        uid: uid.value,
        message: state.message
      });

      scrollDown();
      state.message = "";
    }

    function scrollDown() {
      if (state.scrollTop >= state.scrollHeight - 1000 || state.firstScroll) {
        state.firstScroll = false;
        messages.value.scrollTop = messages.value.scrollHeight;
      }
    }

    function onScroll(e) {
      state.scrollHeight = e.target.scrollHeight;
      state.scrollTop = e.target.scrollTop;
    }

    onMounted(async () => {
      await chatsRef.on("child_added", s => {
        state.chats.push({ ...s.val() });
        scrollDown();
      });
      messages.value.addEventListener("scroll", onScroll);
      setTimeout(() => {
        messages.value.scrollTop = messages.value.scrollHeight;
      }, 3000);
    });

    return { state, addMessage, messages, uid };
  }
};
</script>

<style scoped>
.cont {
}

.header {
  text-align: center;
}

.chat {
  padding: 0;
  height: 60vh;
  width: calc(90% - 40vw);
  margin: 0 auto;
  background-color: #aaaaaa;
  border: 5px solid #000;
}

.messages {
  height: 90%;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

.input-field {
  height: 10%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
}

input {
  width: 80%;
}

button {
  width: 20%;
}

button:focus {
  outline: none;
}

input,
button {
  border: 1px #00b solid;
  height: 100%;
  padding: 0;
  outline: none;
}

.message {
  color: #fff;
  display: flex;
  width: 100%;
  margin-bottom: 0.2em;
}

.message p {
  background: #111;
  margin: 0;
  padding: 0.2em;
}

.m-align-left {
  justify-content: flex-start;
}

.m-align-right {
  justify-content: flex-end;
}
</style>
