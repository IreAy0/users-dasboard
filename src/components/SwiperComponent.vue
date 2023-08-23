<template>
  <div class="swiper-container mySwiper myswiper-container">
      <div class="swiper-wrapper ">
        <div class="swiper-slide bg-white " v-for="(item, index) in items" :key="index">
          <!-- <img :src="item" alt="Slide Image" /> -->
          <p>
            {{ item }}
          </p>
        </div>
        
      </div>
      <a class="text-primary" href="http://">
        Learn More <Icon icon="ph:arrow-right-light" />
      </a> 
  </div>

  <div class="m-auto d-flex align-items-center justify-content-center mt-2 gap-3 ">
    <div  @click="swiper.slidePrev()">
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
     <div class="swiper-pagination"></div>
    <div  @click="swiper.slideNext()">
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

</template>

<script>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper/swiper-bundle';
import { Icon } from "@iconify/vue";
import 'swiper/swiper-bundle.css';


export default {
  name: 'SwiperComponent',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    Icon,
  },
  data(){
    return {
      customClassName: 'custom'
    }
  },
  setup(props) {
    const swiperInstance = ref(null);

    onMounted(() => {
      swiperInstance.value = new Swiper('.mySwiper', {
        spaceBetween: 50,
        loop: true,
        // speed:500,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      });
    });

    return {
      swiperInstance
    };
  }
};
</script>

<style lang="scss">
.swiper-slide img {
  width: 100%;
  height: auto;
}

.myswiper-container {
  padding: 30px 40px;
  background-color: #fff;
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

.swiper-slide{
  opacity:0 !important;
}
.swiper-slide-active{
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
