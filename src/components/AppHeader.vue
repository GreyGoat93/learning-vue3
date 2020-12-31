<template>
  <header>
    <h1 class="h1"><router-link to="/">GreyGoat93</router-link></h1>
    <nav>
      <div class="display-desktop">
        <router-link v-for="route in routeList" :key="route" :to="route.path">
          {{ route.name }}
        </router-link>

        <button v-if="isLoggedIn == false" @click="openLogin">
          Login
        </button>
        <button v-if="isLoggedIn == true" @click="logout()">
          Logout
        </button>
      </div>
      <div class="display-phone">
        <div class="menu" :class="isExpanded ? 'd-block' : 'd-none'">
          <ul class="menu-list">
            <router-link
              v-for="route in routeList"
              :key="route"
              :to="route.path"
            >
              <li>{{ route.name }}</li>
            </router-link>
          </ul>

          <button v-if="isLoggedIn == false" @click="openLogin">
            Login
          </button>
          <button v-if="isLoggedIn == true" @click="logout()">
            Logout
          </button>
        </div>
      </div>
      <div class="menu-expand-shrink">
        <button class="display-phone" @click="shrinkExpandButton">
          {{ shrinkExpandMsg }}
        </button>
      </div>
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
        { path: "/tensorflow", name: "Object Detection" }
      ],
      shrinkExpandMsg: "Expand the Menu",
      isExpanded: false
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
    },
    shrinkExpandButton() {
      if (this.isExpanded) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  padding: 1.5em;
  background-image: linear-gradient(172deg, #030, #060);
}

h1 {
  text-align: center;
}

h1 a {
  color: #fff;
  text-decoration: none;
}

h1 a:hover {
  color: #ddd;
}

.menu-list {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  font-size: 1em;
  text-decoration: none;
  margin: 0 0.5em;
}

nav a:hover {
  color: #ddd;
}

.d-block {
  display: block;
}

.d-none {
  display: none;
}

.menu-expand-shrink {
  color: white;
  text-align: center;
}

.display-desktop {
  display: none;
}

@media (min-width: 768px) {
  .display-desktop {
    display: block;
  }

  .display-phone {
    display: none;
  }

  header {
    display: flex;
    justify-content: space-between;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1.5em;
  }
}
</style>
