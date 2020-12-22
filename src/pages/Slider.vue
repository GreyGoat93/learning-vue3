<template>
  <div>
    <div class="cont">
      <div v-for="(slide, index) in slides" :key="index" class="color-slide">
        <transition name="fade">
          <div
            v-if="currentSlide === index"
            :class="slide.color"
            class="color-slide-inside"
          ></div>
        </transition>
      </div>
    </div>
    <div class="slider">
      <button
        v-for="num in 3"
        :key="num"
        class="sliderButton"
        :class="{
          'bg-black': currentSlide === num - 1,
          'bg-disabled': currentSlide !== num - 1
        }"
        @click="changeSlider(num - 1)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        { color: "bg-red" },
        { color: "bg-green" },
        { color: "bg-blue" }
      ],
      interval: null,
      toggleText: false
    };
  },
  methods: {
    changeSlider(slide) {
      this.currentSlide = slide;
      clearInterval(this.interval);
      this.makeInterval();
    },
    makeInterval() {
      this.interval = setInterval(() => {
        this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1;
      }, 5000);
    }
  },
  mounted() {
    this.makeInterval();
  },
  unmounted() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.cont {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 450px;
}

.color-slide {
  display: flex;
  justify-content: center;
  width: 90%;
  position: absolute;
  overflow-x: hidden;
}

.color-slide-inside {
  width: 100%;
  height: 450px;
}

.bg-red {
  background: #600;
}
.bg-green {
  background: #060;
}
.bg-blue {
  background: #006;
}
.bg-disabled {
  background: #333;
}
.bg-black {
  background: #000;
}

.slider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.sliderButton {
  border: none;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  outline: none;
  margin: 0 0.3em;
}

.text-change {
  width: 100%;
  display: flex;
  justify-content: center;
}

.text-change-inner {
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
