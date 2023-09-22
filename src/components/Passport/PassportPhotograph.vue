<template>
  <div>
    <!-- <TopTabWrapper> -->
      <!-- <TopTabList title="Take picture"> -->
        <div class="app px-3">
          <div>
            <h6 class="text-gray-900 mb-50">Guidelines</h6>
            <div>
              <b-list-group horizontal class="justify-content-between">
                <b-list-group-item> <span class="d-inline-flex text-success badge  bg-success bg-opacity-10 rounded-circle">1</span> Ensure good lighting</b-list-group-item>
                <b-list-group-item><span class="d-inline-flex text-success badge  bg-success bg-opacity-10 rounded-circle">2</span> Frame your face properly</b-list-group-item>
                <b-list-group-item><span class="d-inline-flex text-success badge  bg-success bg-opacity-10 rounded-circle">3</span> No hats</b-list-group-item>
                <b-list-group-item><span class="d-inline-flex text-success badge  bg-success bg-opacity-10 rounded-circle">4</span> No glasses</b-list-group-item>
              </b-list-group>
            </div>
          </div>

          <div>
           
            <CameraComponent @close="closeSnap"/>
          </div>
          
        </div>
      <!-- </TopTabList>
    </TopTabWrapper> -->
  </div>

</template>

<script setup>
import { Icon } from "@iconify/vue";
import CropperComp from '@/components/CropperComp.vue'
import DropZone from "@/components/DropZone.vue";
import CameraComponent from './CameraComponent.vue';

import { ref, defineEmits, computed } from "vue";

import PassportCamera from "@/components/Passport/PassportCamera.vue";

import TopTabList from "@/components/Tab/TabTopNav/TopTabList.vue";
import TopTabWrapper from "@/components/Tab/TabTopNav/TopTabWrapper.vue";
import ModalComp from "@/components/ModalComp.vue";

import { useActions, useGetters } from "vuex-composition-helpers/dist";

const { prints } = useGetters({
  prints: "print/prints",
  croppedWH: "document/croppedWH",
});

const { savePrint, removePrint } = useActions({
  savePrint: "print/savePrint",
  removePrint: "print/removePrint",
});

const dropzoneFile = ref("");
const imgUrl = ref(null);
const fileValidated = ref("");
const isSelected = ref(false);
const isUpload = ref(false);
const isLoading = ref(false);
const loading = ref(false);
const isDelete = ref(false);
const printId = ref("");
const selectedTitle = ref(false);
const isCameraOpen = ref(false);

const loader = ref(true);
setTimeout(() => (loader.value = false), 1000);

const closeSnap = () => emit("close", true);

const emit = defineEmits(["close"]);


const printFile = ref('')

</script>

<style scoped>
.app {
  width: 100%;
  min-height: 33vh;
  display: grid;
  
}

.transformed {
  object-fit: scale-down;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.grid {
  display: grid;
  place-items: center;
  gap: 20px;
}

.grid__3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid__1 {
  grid-template-columns: 1fr;
}

.grid__2 {
  grid-template-columns: 1fr 1fr;
}

[type="radio"] {
  position: absolute;
  opacity: 0;
}

[type="radio"]+img {
  cursor: pointer;
  margin-right: 0.5rem;
}

[type="radio"]+img:hover {
  outline: 0.5px solid #003bb3;
}

[type="radio"]:checked+img {
  outline: 3px solid #003bb3;
}
.app .list-group-item{
  border: 0px;
  padding:0px;
  color: #101828;
  font-weight: 500;
}
.delete {
  position: absolute;
  top: -14px;
  right: -14px;
  border-radius: 50%;
  border: 1px solid red;
  padding: 8px;
}

.custom-placeholder {
  background-color: #eee;
  padding: 20px;
  text-align: center;
}

@media screen and (max-width: 991.5px) {
  .grid__3 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid__2 {
    grid-template-columns: 1fr;
  }
}
</style>
