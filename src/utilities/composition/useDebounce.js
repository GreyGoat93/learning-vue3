import { ref } from "vue";

export default function useDebounce() {
    const timeout = ref("");

    function debounce(func, time = 2000) {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(func, time);
    }

    return debounce;
}