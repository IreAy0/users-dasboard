<template>
  <div class="auth-wrapper auth-v2">
    <div class="vector-1"></div>
    <div class="vector-2"></div>
    <div class="vector-3"></div>
    <b-row class="auth-inner m-0">
      <b-col
        lg="6"
        class="d-flex align-items-center position-relative mx-auto auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="10"
          class="mx-auto login-card bg-white zindex-3 rounded h-100 py-3"
        >
          <b-link class="d-flex justify-content-center">
            <img
              src="/app-assets/images/logo/betaLogo.png"
              class="img-fluid"
              width="150"
            />
          </b-link>
          <b-card-title
            class="mb-2large text-center mt-4 card-title no-whitespace text-gray-900 font-weight-bold"
            tag="h2"
          >
            Welcome to ToNote! 👋
          </b-card-title>
          <TopTabWrapper>
            <TopTabList styles="p-0" title="User SignIn">
              <newLogin />
            </TopTabList>
        
            <TopTabList styles="p-0" title="Company SignIn">
              <companyLogin />
            </TopTabList>
        
           
          </TopTabWrapper>
          

         
        </b-col>
      </b-col>
      <!-- /Login-->

      <!-- Left Text-->
      <b-col lg="6" class="d-none d-lg-flex align-items-center p-5 auth-bg">
        <div class="w-100 align-items-center justify-content-center px-5">
          <div
            ref="loginSwiper"
            class="loginSwiper swiper-container mySwiper myswiper-container"
          >
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in items"
                :key="index"
              >
                <!-- <img :src="item" alt="Slide Image" /> -->
                <div class="d-flex justify-content-center">
                  <b-img fluid width="324" :src="item?.img" alt="Login V2" />
                </div>
                <p class="mt-2 mb-50">
                  {{ item?.text }}
                </p>
              </div>
            </div>
            <a class="text-primary" href="http://">
              Learn More <Icon icon="ph:arrow-right-light" />
            </a>
          </div>

          <div
            class="m-auto d-flex align-items-center justify-content-center mt-2 gap-3"
          >
            <div>
              <svg
                class="swiper-button-prev"
                :class="customClassName + '__prev'"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M12.5 15.24L7.5 10.24L12.5 5.23999"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="swiper-pagination swiper-login-pagination"></div>
            <div>
              <svg
                class="swiper-button-next"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M7.5 15.24L12.5 10.24L7.5 5.23999"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import newLogin from './newLogin.vue'
import TopTabList from "@/components/Tab/TabTopNav/TopTabList.vue";
import TopTabWrapper from "@/components/Tab/TabTopNav/TopTabWrapper.vue";
import companyLogin from './companyLogin.vue'
import {
  initSwiper,
  destroySwiper,
} from "../../../components/SwiperInstance.js";

const items = ref([
        {
          img: "/app-assets/images/banner/auth-image-1.png",
          text: "We aim to streamline the process of reaching agreements and cultivate trust",
        },
        {
          img: "/app-assets/images/banner/auth-image-2.png",
          text: "Say goodbye to the traditional hassles of finding a Notary.",
        },
        {
          img: "/app-assets/images/banner/auth-image-3.png",
          text: "We promote a sense of confidence and security in all your dealings.",
        },
        {
          img: "/app-assets/images/banner/auth-image-4.png",
          text: "We save valuable time and ensures the highest level of accuracy in legal documentation.",
        },

        //  'We aim to streamline the process of reaching agreements and cultivate trust',
        //   'Say goodbye to the traditional hassles of finding a Notary.' ,
        //   'We promote a sense of confidence and security in all your dealings.',
        //   'We save valuable time and ensures the highest level of accuracy in legal documentation.',
      ])
  const loginSwiper = ref(null)
onMounted(() => {
  initSwiper(loginSwiper.value, {
      spaceBetween: 50,
      loop: true,
      // speed:500,
      effect: "fade",
      pagination: {
        el: ".swiper-login-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
})


</script>

<style lang="scss">
.myswiper-container {
  padding: 30px 40px;
  border-radius: 8px;
  margin: 10px 0;
  width: 100%;
  color: #000;
  font-size: 18px;
  // display: flex;
  // flex-direction: column;
  text-align: initial;
}

.myswiper-container p {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  color: #000;
}

.myswiper-container a {
  font-size: 15px;
}

.swiper-slide {
  opacity: 0 !important;
}
.swiper-slide-active {
  opacity: 1 !important;
}
.swiper-pagination {
  position: relative;
}

.swiper-pagination .swiper-pagination-bullet {
  margin: 0 6px;
}
.swiper-pagination-bullets.swiper-pagination-horizontal {
  top: 0;
  width: auto;
}
.swiper-button-prev {
  // display: none;
  display: block;
  margin-top: 0;
  position: relative;
  // top: 83.5%;
  left: auto;
  z-index: 2;

  &:focus {
    outline: none;
  }
}

.swiper-button-next {
  //display: none;
  position: relative;
  display: block;
  margin-top: 0;
  // top: 83.5%;
  right: auto;
  z-index: 2;

  &:focus {
    outline: none;
  }
}
</style>