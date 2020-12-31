<template>
  <header>
    <h1 class="h1"><router-link to="/">App</router-link></h1>
    <nav>
      <router-link v-for="route in routeList" :key="route" :to="route.path">
        {{ route.name }}
      </router-link>

      <button v-if="isLoggedIn == false" @click="openLogin">
        Login
      </button>
      <button v-if="isLoggedIn == true" @click="logout()">
        Logout
      </button>
    </nav>
  </header>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
  data() {
    return {
      routeList: [
        { path: "/todolist", name: "Todo List" },
        { path: "/calendar", name: "Calendar" },
        { path: "/markdown", name: "Markdown" },
        { path: "/slider", name: "Slider" },
        { path: "/calculator", name: "Calculator" },
        { path: "/chats", name: "Chat" },
        { path: "/user-crud", name: "User Crud" },
        { path: "/tensorflow", name: "Tensorflow" }
      ]
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("successfull");
          this.$router.go();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openLogin() {
      this.$store.commit("setToggleLogin", true);
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  padding: 1.5em;
  background-image: linear-gradient(172deg, #030, #060);
  display: flex;
  justify-content: space-between;
}

h1 {
  text-align: left;
}

h1 a {
  color: #fff;
  text-decoration: none;
}

h1 a:hover {
  color: #ddd;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5em;
}

nav a {
  color: white;
  font-size: 0.5em;
  text-decoration: none;
}

nav a:hover {
  color: #ddd;
}
</style>
