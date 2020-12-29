<template>
  <div>
    <div class="cover-modal" @click="$emit('closeModal')"></div>
    <div class="modal-container">
      <div class="modal-inside">
        <div class="content-modal">
          <slot>Insert something here!</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.cover-modal {
  width: 100vw;
  height: 100vh;
  background: rgba(25, 25, 25);
  opacity: 25%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 29;
}

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-inside {
  display: flex;
  height: 100%;
}

.content-modal {
  background: #fff;
  z-index: 30;
  margin: auto;
  min-width: 40%;
  text-align: center;
  border: #fff 5px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
