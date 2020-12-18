<template>
  <app-header :isSignedIn="isSignedIn" @open-login-modal="toggleLogin = true"/>
  <div class="cont">
    <div class="inner-container">
      <transition name="fade">
      <router-view></router-view>
      </transition>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <login-modal v-if="toggleLogin == true" @close-login-modal="toggleLogin = false"/>
    </transition>
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal"
import firebase from "./utilities/firebase"
export default {
  components: {
    AppHeader, LoginModal
  },
  data(){
    return {
      toggleLogin: false,
      isSignedIn: false,
      authUser: {},
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     this.isSignedIn = true;
     this.authUser = user;
     console.log(this.authUser);
    } else {
      this.isSignedIn = false;
      this.authUser = {};
      console.log('No User');
    }
});
  }
}

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

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
