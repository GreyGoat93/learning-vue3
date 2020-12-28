<template>
  <div class="cont">
    <h1>Markdown App</h1>
    <section>
      <article class="mark-left">
        <textarea :input="text" @input="renderText" ref="textarea"></textarea>
      </article>
      <article class="mark-right" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import useDebounce from "../utilities/composition/useDebounce.js";
import marked from "marked";
export default {
  data() {
    return {
      text: "",
      debounce: ""
    };
  },
  mounted() {
    this.debounce = useDebounce();
    this.$refs.textarea.focus();
  },
  methods: {
    renderText(e) {
      const task = () => {
        this.text = e.target.value;
      };
      this.debounce(task, 2000);
    }
  },
  computed: {
    markedText() {
      return marked(this.text);
    }
  }
};
</script>

<style scoped>
.cont {
  margin: 0 auto;
}

h1 {
  text-align: center;
}

section {
  width: 80%;
  margin: 0 auto;
  display: flex;
  height: 400px;
}
article {
  width: 50%;
}

textarea {
  width: 100%;
  height: 100%;
}
</style>
