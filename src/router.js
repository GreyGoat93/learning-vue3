import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import TodoList from "./pages/TodoList";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import UserCrud from "./pages/UserCrud";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/calendar", name: "Calendar", component: Calendar },
    { path: "/todolist", name: "TodoList", component: TodoList },
    { path: "/markdown", name: "Markdown", component: Markdown },
    { path: "/slider", name: "Slider", component: Slider },
    { path: "/calculator", name: "Calculator", component: Calculator },
    { path: "/user-crud", name: "UserCrud", component: UserCrud },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,
        meta: { middleware: "auth" }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        let middleware = require(`./middleware/${to.meta.middleware}`);
        if (middleware) {
            middleware.default(next, store);
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;