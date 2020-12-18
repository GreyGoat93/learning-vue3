<template>
    <section>
        <button @click="loginWithGoogle">Login With Google</button>
    </section>
</template>

<script>
import firebase from "firebase";
export default {
    methods: {
        loginWithGoogle(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$emit('close-login');
            });
        },
    }
}
</script>

<style>

</style>