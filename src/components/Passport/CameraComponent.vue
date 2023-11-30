<template>
  <div class="mt-3">
    <div class="camera-passport-placeholder">
      <div class="camera-placeholder text-center">
        <template v-if="snapshot && !cameraActive">
          <img
            :src="snapshot"
            alt="Snapshot"
            style="object-fit: cover"
            class="position-relative w-100 h-100"
          />
        </template>
        <template v-else-if="!cameraActive">
          <div class="position-relative w-100 h-100">
            <svg
              class="position-absolute top-50 start-50 translate-middle"
              xmlns="http://www.w3.org/2000/svg"
              width="132"
              height="133"
              viewBox="0 0 132 133"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M41.2063 35.6549C41.2063 29.2528 43.7495 23.1128 48.2765 18.5858C52.8035 14.0589 58.9434 11.5156 65.3456 11.5156C71.7477 11.5156 77.8876 14.0589 82.4146 18.5858C86.9416 23.1128 89.4848 29.2528 89.4848 35.6549C89.4848 42.057 86.9416 48.1969 82.4146 52.7239C77.8876 57.2509 71.7477 59.7941 65.3456 59.7941C58.9434 59.7941 52.8035 57.2509 48.2765 52.7239C43.7495 48.1969 41.2063 42.057 41.2063 35.6549ZM41.2063 71.8638C33.2036 71.8638 25.5287 75.0428 19.87 80.7015C14.2113 86.3603 11.0322 94.0352 11.0322 102.038C11.0322 106.839 12.9397 111.444 16.3349 114.84C19.7301 118.235 24.3351 120.142 29.1367 120.142H101.554C106.356 120.142 110.961 118.235 114.356 114.84C117.751 111.444 119.659 106.839 119.659 102.038C119.659 94.0352 116.48 86.3603 110.821 80.7015C105.162 75.0428 97.4875 71.8638 89.4848 71.8638H41.2063Z"
                fill="#809DD9"
              />
            </svg>
            <svg
              class="position-absolute top-50 start-50 translate-middle"
              xmlns="http://www.w3.org/2000/svg"
              width="164"
              height="164"
              viewBox="0 0 164 164"
              fill="none"
            >
              <path
                d="M162 52.103V22.0712C162 16.7822 159.901 11.7089 156.163 7.96345C152.426 4.21795 147.354 2.10578 142.06 2.08992L112 2M162 112.047V142.019C162 147.318 159.893 152.4 156.142 156.148C152.391 159.895 147.304 162 142 162H112M52 2L21.94 2.09991C16.6461 2.11577 11.5744 4.22794 7.83663 7.97344C4.09887 11.7189 1.99998 16.7922 2 22.0812V52.103M52 162H22C16.6957 162 11.6086 159.895 7.85786 156.148C4.10714 152.4 2 147.318 2 142.019V112.047"
                stroke="#809DD9"
                stroke-width="2.34868"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </template>

        <video
          ref="camera"
          v-show="cameraActive"
          autoplay
          playsinline
          class="camera-view"
        ></video>
        <canvas
          ref="canvas"
          v-show="cameraActive"
          style="display: none"
        ></canvas>
      </div>
    </div>
    <div class="mt-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-primary mb-2"
        @click="activateCamera"
        v-if="!cameraActive && !snapshot"
      >
        Activate Camera
      </button>
      <button
        type="button"
        class="btn btn-primary mb-2"
        @click="takeSnapshot"
        v-if="cameraActive"
      >
        Capture
      </button>
      <div v-if="snapshot && !cameraActive" class="d-flex gap-2">
        <button
          @click="activateCamera"
          style="--bs-bg-opacity: 0.5"
          type="button"
          class="btn btn-primary-light mb-2"
        >
          Retake
        </button>
        <button @click="closeSnap" type="button" class="btn btn-primary mb-2">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineEmits, watch, computed, onMounted } from "vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";
import { useBreakpointsComposable } from "@/composables/useBreakpoints";
import Compressor from "compressorjs";

export default {
  data() {
    return {
      cameraActive: false,
      snapshot: null,
      showVideo: true,
    };
  },
  setup() {
    const { prints, isSaved } = useGetters({
      prints: "print/prints",
      isSaved: "print/isSaved",
    });

    const { setVerificationImage } = useActions({
      setVerificationImage: "user/setVerificationImage",
    });

    return { setVerificationImage };
  },
  methods: {
    activateCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            const camera = this.$refs.camera;
            camera.srcObject = stream;
            this.cameraActive = true;
            camera.style.transform = "scaleX(-1)";
          })
          .catch((error) => {
            console.error("Camera activation error:", error);
          });
      }
    },
    async takeSnapshot() {
      const camera = this.$refs.camera;
      let canvas = document.createElement("canvas"); // Create a temporary canvas
      const context = canvas.getContext("2d");
      canvas.width = camera.videoWidth/2;
      canvas.height = camera.videoHeight/2;
      context.drawImage(camera, 0, 0, canvas.width, canvas.height);

      const quality = 1; // Adjust the quality as needed

      const compressedSnapshot = canvas.toDataURL("image/png", quality);

      // Update your component's data property with the compressed snapshot
       // Set canvas to null, removing the reference
      canvas = null;

      // Shut down the camera
      if (camera.srcObject) {
          const tracks = camera.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
        this.snapshot = compressedSnapshot;
        if (compressedSnapshot) {
          this.cameraActive = false;
          camera.srcObject = null;
        }
    },
    closeSnap() {
      this.setVerificationImage(this.snapshot);
      this.$emit("close", true);
    },
  },
};
</script>

<style scoped>
.camera-passport-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.camera-placeholder {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  background: #f2f5fb;
}

.camera-view {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.camera-placeholder i,
.passport-placeholder i {
  color: #ccc;
}
</style>
