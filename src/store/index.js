import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            isLoggedIn: false,
            toggleLogin: false,
            user: null
        };
    },
    mutations: {
        setIsLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setToggleLogin(state, payload) {
            state.toggleLogin = payload;
        }
    }
});

export default store;