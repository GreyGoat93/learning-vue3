import marked from 'marked';
const debounce = {
    data() {
        return {
            timeout: "",
        }
    },
    methods: {
        debounce(func, time = 1000) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(func, time)
        }
    },
    computed: {
        markedText() {
            return marked(this.text);
        },
    }
}

export default debounce;