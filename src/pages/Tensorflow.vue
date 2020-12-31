<template>
  <div class="cont">
    <h1>Tensorflow</h1>
    <img
      ref="imgRef"
      src="https://images.unsplash.com/photo-1566829965538-fc82e475a2b0"
      width="200"
      crossorigin="anonymous"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
export default {
  setup() {
    const imgRef = ref("");
    onMounted(async () => {
      console.log(imgRef.value);
      const img = imgRef.value;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      console.log("Predictions: ");
      console.log(predictions);
    });
    return { imgRef };
  }
};
</script>

<style scoped>
.cont {
  width: 80%;
  margin: 0 auto;
}
</style>
