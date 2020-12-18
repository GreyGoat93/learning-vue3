<template>
<div>
    <section 
    @click="closeLogin()" 
    class="cover-login">
    </section>
    <div class="login-container">
        <div class="login-inside">
            <div class="login">
                <h2>Login</h2>
                <google-login @close-login="closeLogin()" />
                <form @submit.prevent>
                    <div class="form-row">
                        <label>Email: </label>
                        <input v-model="form.email" ref="loginEmail"/>
                    </div>
                    <div class="form-row">
                        <label>Password: </label>
                        <input v-model="form.password" type="password" />
                    </div>
                    <div class="form-row">
                        <button class="btn-login" type="submit" @click="login">
                            <transition-group name="fade">
                            <span v-if="isLoading">Waiting...</span>
                            <span v-else>Login</span>
                            </transition-group>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from '../utilities/firebase'
import GoogleLogin from './login/GoogleLogin.vue'
export default {
    components: { GoogleLogin }, 
    data(){
        return {
            form: {
                email: "ahmet.tahaa93@gmail.com",
                password: "boyrazlar11",
            },
            isLoading: false,
        }
    },
    methods: {
        login(){
            this.isLoading = true;
            let formData = this.form;
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                formData.email = "";
                formData.password = "";
                this.isLoading = false;
                this.closeLogin();
            })
            .catch((e) => {
                console.log(e);
                formData.email = "";
                formData.password = "";
                this.isLoading = false;
                this.closeLogin();
            })
        },
        closeLogin(){
            this.$emit('close-login-modal');
        }
    },
    mounted(){
        this.$refs.loginEmail.focus();
    }
}
</script>

<style scoped>
    .cover-login {
        width: 100vw;
        height: 100vh;
        background: rgba(25,25,25);
        opacity: 25%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 29;
    }

    .login-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .login-inside {
        display: flex;
        height: 100%;
    }

    .login {
        background: #fff;
        z-index: 30;
        margin: auto;
        min-width: 40%;
        text-align: center;
        border:#fff 5px solid;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-row {
        width: 100%;
        margin-bottom: 1.5em;
    }

    h2 {
        margin-top: 0.7em;
    }

    form {
        background: #fff;
        width: 100%;
        margin: 0; 
        padding: 3em;
    }

    label,
    input {
        display: block;
    }

    input{
        width: 100%;
        margin: 0 auto;
        padding: 0.3em;
    }

    label {
        margin-bottom: -0.15em;
    }

    .btn-login {
        position: relative;
        height: auto;
        width: 100%;
        height: 3em;
        overflow: hidden;
        border: none;
        color: #fff;
        background: linear-gradient(135deg, #23F, #00F);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button span {
        position: absolute;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>