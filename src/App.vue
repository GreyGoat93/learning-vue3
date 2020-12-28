<template>
  <app-header />
  <div class="cont">
    <div class="inner-container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <login-modal v-if="toggleLogin" />
    </transition>
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";
export default {
  components: {
    AppHeader,
    LoginModal
  },
  computed: {
    toggleLogin() {
      return this.$store.state.toggleLogin;
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit("setIsLoggedIn", true);
        this.$store.commit("setUser", user);
      } else {
        this.$store.commit("setIsLoggedIn", false);
        this.$store.commit("setUser", user);
      }
    });
  }
};
</script>

<style scoped>
.inner-container,
.cont {
  margin: 0;
  padding: 0;
  width: 100%;
}

.inner-container {
  margin-top: 1em;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
