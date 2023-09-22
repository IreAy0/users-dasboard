<template>
  <Transition name="modal">
      <div v-if="show" :class="[style, 'modal-mask']" >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable " :class="size">
          <div class="modal-content" style="overflow: hidden; position:initial">
            <div v-if="header" class="modal-header ">
              <slot name="header">default header</slot>
            </div>
            <button v-if="closeBtn != false" type="button" class="btn-close" @click="$emit('close')"></button>

            <div class="modal-body " :class="[style, modalClass]">
              <slot name="body">default body</slot>
            </div>
  
            <div class="modal-footer" v-if="footer">
              <slot name="footer">
                <span @click="$emit('close')"></span>
              </slot>
            </div>
          </div>
        </div>
      </div>
  </Transition>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  show: Boolean,
  style: { type: String, default: null },
  closeBtn: { type: Boolean, default: true },
  footer: { type: Boolean, default: true },
  size: { type: String, default: "modal-lg" },
  header:{type:String, default: true},
  modalClass:{type: String, default: null}
});
</script>

<style scoped>

.modal-body{
  padding: 20px 32px 40px 32px;
}
.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-dialog-scrollable .modal-content {
  overflow: visible;
}

.modal-header {
  padding: 40px 32px 16px 32px;
  border-bottom: 1px solid #EAECF0;
}

.btn-close {
  padding: 0.8rem !important;
  opacity: 1;
  -webkit-transition: all 0.23s ease 0.1s;
  transition: all 0.23s ease 0.1s;
  position: absolute;
  right:0;
  -webkit-transform: translate(-25px, 18px);
  -ms-transform: translate(-25px, 18px);
  transform: translate(-25px, 18px);
}



.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
