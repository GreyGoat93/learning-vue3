import { createRouter, createWebHistory } from 'vue-router';
import TodoList from './pages/TodoList';
import Calendar from './pages/Calendar';
import Markdown from './pages/Markdown';
import Slider from './pages/Slider'
import Home from './pages/Home';

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/calendar', name: "Calendar", component: Calendar },
    { path: '/todolist', name: "TodoList", component: TodoList },
    { path: '/markdown', name: "Markdown", component: Markdown },
    { path: '/slider', name: "Slider", component: Slider },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;