<template>
  <div class="auth-wrapper auth-v2">
    <!-- <div class="vector-1"></div>
    <div class="vector-2"></div>
    <div class="vector-3"></div> -->
    <div class="auth-inner row m-0">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 35px;
        "
        class=""
      >
      
        <div
          class="m-0 bg-white shadow zindex-2 rounded-2 col-lg-8"
        >
          <div class="align-items-center row">
            <div
              class="col-12  col-lg-12 mx-auto py-3 "
            >
            <div class="brand-logo">
              <router-link to="/">
                <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mb-2" width="150" />
                <h2 class="brand-text text-primary ms-1"></h2>
              </router-link>
            </div>

            
            <div class="px-md-3 mt-2 mt-lg-4 create-an-account">
              <h1 class="fs-3 text-center mb-1">Create an account</h1>
              <div class="row ">
                <div class=" col-md-6 h-100">
                  <div class="card h-100 shadow-none mb-3 " :class="{ 'border-primary': selectedOption === 'user' }" @click="selectOption('user')">
                    <div class="card-body border rounded-3  ">
                      <div class="p-2">
                        <input type="radio" style="width: 30px; height:30px" class="form-check-input position-absolute top-0 end-0 mt-1 me-2" :checked="selectedOption === 'user'" @click="selectOption('user')" />
                        <img src="/assets/images/user.svg" alt="account"  :class="[selectedOption === 'user' ? '' : 'grayscale' ]" class="p-1 d-flex mx-auto " width="100" height="100" style="z-index: 2;" />
                        <h5 class="card-title text-center fs-3 fw-bolder">For Personal Use</h5>
                        <p class="card-text px-2 fs-6">Enjoy the convenience of signing and notarising documents for your personal use</p>
                      
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div class="col-md-6 h-100">
                  <div class="card h-100  mb-3 shadow-none" :class="{ 'border-primary': selectedOption === 'company' }" @click="selectOption('company')">
                    <div class="card-body border rounded-3">
                      <input type="radio" style="width: 30px; height:30px"  class="form-check-input position-absolute top-0 end-0 mt-1  me-2" :checked="selectedOption === 'company'" @click="selectOption('company')" />
                      <div class="p-2">
                        <img src="/assets/images/Account.svg" alt="account" :class="[selectedOption === 'company' ? '' : 'grayscale' ]" class="p-1 d-flex mx-auto confimation__logo   " width="100" height="100" style="z-index: 2;" />

                        <h5 class="card-title text-center fs-3 fw-bolder">For Company</h5>
                        <p class="card-text px-2 fs-6">Collaborate with team members to enjoy seamless approval, signing and notarisation processes</p>
                      
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-grid p-0  col-4 ml-auto">
                <button :disabled="selectedOption == null" type="button" class="btn btn-primary" @click="continueSignup">Continue</button>
              </div>
            </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>

import { ref } from 'vue'
import router from '@/router/index.js'
const selectedOption = ref(null)

const selectOption = (option) => {
  selectedOption.value = option
}
const continueSignup = () => {
  if(selectedOption.value === 'user'){
    router.push('/register')
  }else {
    router.push('/company-register')
  }
}
</script>

<style>
/* Additional styles can be added as per requirement */
.card {
  cursor: pointer;
}
.border-primary {
  border: 2px solid #007bff !important;
}
.custom-radio {
  display: inline-block;
  margin-right: 20px;
}
/* Custom checkmark icon */
.create-an-account .form-check-input:checked:before {
  content: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 16 16'%3e%3cpath fill='%23fff' fill-rule='evenodd' d='M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927l5.473-6.385a.75.75 0 0 1 1.057-.081Z' clip-rule='evenodd'/%3e%3c/svg%3e");
  display: block;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
}

.grayscale{
  filter:grayscale(1)
}
</style>
