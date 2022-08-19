<template>
<div class="d-flex align-items-start modern-horizontal-wizard bs-stepper wizard-modern modern-wizard-example d-flex   flex-column flex-lg-row ">

<nav class=" col-12 col-md-3">
<ul class="nav nav-steps flex-nowrap overflow-auto    nav-tabs py-1 px-0  bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline" id="myTab" role="tablist" >
  <li class="nav-item step " role="presentation">
    <button class="nav-link active indicator" >
        <span class=" step-trigger " >

      <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
                  <span class="bs-stepper-label" >
                    <span class="bs-stepper-title">Personal Info</span>
                  </span>
    </span>
    </button>
   
  </li>
  <li class="nav-item step  " >
    <button class="nav-link indicator" >

      <span class=" step-trigger " >

      <span class="bs-stepper-box d-none d-lg-block"> 2</span>
                  <span class="bs-stepper-label" >
                    <span class="bs-stepper-title">Identity Verification</span>
                  </span>
    </span>
    </button>
  </li>
  <li class="nav-item step" role="presentation">
    <button class="nav-link indicator" >
      <span class=" step-trigger " >

      <span class="bs-stepper-box d-none d-lg-block"> 3</span>
                  <span class="bs-stepper-label" >
                    <span class="bs-stepper-title">Digitize signature</span>
                  </span>
    </span>
      </button>
  </li>
</ul>
</nav>

<div class="tab-content tab-content col-12 col-md-9 bs-stepper-content" >
  <div class=" formstep step0 " >
     <Form autocomplete="off" @submit="handleSubmit" :validation-schema="simpleSchema" id="account-details-modern" novalidate>
                <div class="content-header mb-1">
                  <h5 class="mb-0">Personal Info</h5>
                  <small class="text-muted"
                    >Enter Your Personal Information.</small
                  >
                </div>
                <div class="row">
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="modern-first-name"
                      >First Name</label
                    >

                    <Field
                      type="text"
                      autocomplete="off"
                      id="modern-first-name"
                      class="form-control"
                      placeholder="John"
                      name="first_name"
                     v-model="profile.first_name"
                    
                    />
                    <ErrorMessage name="first_name" class="text-danger "/>
                  </div>
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="modern-last-name"
                      >Last Name</label
                    >
                    <Field
                      type="text"
                      id="modern-last-name"
                      class="form-control"
                      placeholder="Doe"
                      name="last_name"
                      v-model="profile.last_name"
                    />
                     <ErrorMessage name="last_name" class="text-danger "/>
                  </div>
                  <div class="mb-1 col-md-6 " >
                    <label class="form-label" for="email">Email</label>
                    <Field
                      disabled
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      :class="{ 'has-error': errorMessage }"
                      placeholder="john.doe@email.com"
                      aria-label="john.doe"
                      v-model="profile.email"
                    />
                    <ErrorMessage name="email" class="text-danger "/>
                  </div>
                   <div class="mb-1 col-md-6 " >
                    <label class="form-label" for="modern-phone">Date of Birth</label>
                    <Field
                      type="date"
                      name="date_of_birth"
                      id="modern-date_of_birth"
                      class="form-control"
                      aria-label="date_of_birth"
                      v-model="profile.dob"
                    />
                    
                  </div>
                   <div class="mb-1 col-md-6 ">
                    <label class="form-label" for="id_type"
                      >Gender</label
                    >
                    <select  v-model="profile.gender"  class="select2 w-100 form-select">
                       <option disabled>Please select a gender</option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                      <option value="o">I'd prefer not to say</option>
                    </select>
                  </div>
                   <div class="mb-1 col-md-6 " >
                    <label class="form-label" for="modern-phone">Address</label>
                    <Field
                      type="text"
                      name="address"
                      id="modern-address"
                      class="form-control"
                     
                      placeholder="Address"
                      aria-label="phone_number"
                      v-model="profile.address"
                    />
                    
                  </div>
<div class="mb-1 col-md-6 " >
                    <label class="form-label" for="modern-phone">Phone Number</label>
                    <Field
                      type="tel"
                      name="phone"
                      id="modern-phone"
                      class="form-control"
                      :class="{ 'has-error': errorMessage }"
                      placeholder="070 0000 000"
                      aria-label="phone_number"
                      v-model="profile.phone"
                    />
                    
                  </div>
                  <div class="mb-1 col-md-6">
              
                    <label class="form-label" for="country">Country</label>
                    <Field name="country" as="select" @change="getStates(country)" v-model="country" class="select2 w-100 form-select" id="country">
                    <option value="" >Please select a country</option>
                    <option :key="option" :selected="option.id === country ? true : false"  v-for="option in countries" :value="option.id">{{option.name}}</option>
                      
                    </Field>
                  
                  </div>
                  <div class="mb-1 col-md-6">
                 
                    <label class="form-label" for="state">State of Residence</label>
                    <Field name="state" as="select" v-model="state" class="select2 w-100 form-select" id="state">
                    <option value="" disabled >Please select a state</option>
                    <option :key="option" :selected="option.id === state ? true : false" v-for="option in states" :value="option.id">{{option.name}}</option>
                      
                    </Field>
                    <ErrorMessage name="state" class="text-danger "/>
                  </div>
                  <!-- <div class="mb-1 col-md-6 " >
                    <label class="form-label" for="modern-phone">Address</label>
                    <Field
                      type="text"
                      name="address"
                      id="modern-address"
                      class="form-control"
                     
                      placeholder="Address"
                      aria-label="phone_number"
                      v-model="profile.address"
                    />
                    
                  </div> -->
                </div>
                 <b-button-group class="mt-2 w-100 justify-content-end">
        <div>
         <button  id="nextbtn"   class="  rounded btn btn-primary btn-next">
                    <span class="align-middle d-inline-block "
                      >Save and Continue</span
                    >
                    
                  </button>
                 
        </div>
       
      </b-button-group>
              </Form>
  </div>
  <div class="  formstep step1 d-none" >
      <div
                id="personal-info-modern"
                class=""
                
              >
                <div class="content-header mb-1">
                  <h5 class="mb-0">Identity Verification</h5>
                  <small>Verify your ID.</small>
                </div>
                <div class="d-flex flex-column flex-lg-row  gx-5" style=" gap: 4%;">
                  <div class="mb-1 ">
                    <label class="form-label" for="id_type"
                      >Identification Type</label
                    >
                    <select  :disabled="validState" v-model="profile.identity_type"  class="select2 w-100 form-select">
                       <option value="" disabled>Please select a form of Identity</option>
                      <option value="nin">NIN</option>
                      <option value="drivers_license">Drivers License</option>
                      <option value="bvn">BVN</option>
                    </select>
                  </div>
                   <b-col >
                    <label class="form-label" for="bvn"
                      >ID Number</label
                    >
                    <div>

                    </div>
                    <div class="input-group relative mb-3">
                  <input
                    placeholder="12345678910"
                    v-model="profile.identity_number"
                    :disabled="validState === true"
                    id="registration_company_number"
                    type="text"
                    class="form-control rounded-end"
                    aria-label="BVN"
                  />
                  <span
                    v-if="validState"
                    class="position-absolute end-0  px-1"
                    :style="{top: '7px' }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-check-lg text-success"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                      />
                    </svg>
                  </span>
                  <button
                    v-show="validState == false"
                    
                    @click="verifyId"
                    class="btn border mb-0 btn-primary-outline border-primary text-primary ms-1"
                  >
                    <span
                      v-show="verifying"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    <span class="align-middle d-inline-block">Verify ID</span>
                  </button>
                </div>
                    

      </b-col>
  
      
    
                </div>
               <b-button-group class="mt-2 w-100 justify-content-end ">
        <div>

                  <button @click="goPrev" id="nextbtn"   class="me-3 rounded-circle p-1  btn btn-outline-secondary  ">
                    <span class="align-middle d-inline-block "
                      >
                      <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z" fill="#A1A0A0"/>
</svg>

                      </span
                    >
                    
                  </button>
         <button @click="goNext" id="nextbtn" :disabled="validState === false"   class="  rounded btn btn-primary btn-next">
                    <span class="align-middle d-inline-block "
                      >Save and Continue</span
                    >
                    
                  </button>
                 
        </div>
       
      </b-button-group>
              </div>
  </div>
      <div class="formstep step2  d-none">
        <div id="address-step-modern">
          <div class="content-header mb-1">
            <h5 class="mb-0">Digitise signature</h5>
            <small>Create Your digital signature.</small>
          </div>
          <div class="row">
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-first-name">First Name</label>
              <Field
                type="text"
                id="modern-first-name"
                class="form-control"
                placeholder="John"
                name="first_name"
                v-model="profile.first_name"
              />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-last-name">Last Name</label>
              <Field
                type="text"
                id="modern-last-name"
                class="form-control"
                placeholder="Doe"
                name="last_name"
                v-model="profile.last_name"
              />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="modern-landmark">Initials</label>
              <Field
                type="text"
                id="modern-initials"
                class="form-control"
                placeholder="Doe"
                name="initials"
                v-model="profile.initials"
              />
            </div>

            <div class="col-md-12 mb-2">
              <div class="rounded-3 border">
                <Signature @goPrev="goPrev" v-if="profile" :generalData="profile"></Signature>
              </div>
              <!-- <button
                @click="goHome"
                id="nextbtn"
                class="mt-1 me-3 rounded-circle p-1 btn btn-outline-secondary"
              >
                <span class="align-middle d-inline-block">
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                      fill="#A1A0A0"
                    />
                  </svg>
                </span>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Form, ErrorMessage, Field } from "vee-validate";
import Signature from "@/components/Signature/Signature.vue";
import ToNote from "@/Services/Tonote";
import { mapActions, mapGetters, mapState } from "vuex";
import { useToast } from "vue-toast-notification";

const toast = useToast();
// const store = useStore()

export default {
  name: "ProfilePage",
  components: { Signature, Form, ErrorMessage, Field },
  setup() {
    let step = 0;
    const nextButton = document.getElementById("nextbtn");
    const prevButton = document.getElementById("prev");

    function goNext() {
      step += 1;
      goToStep(step);
    }

    function goPrev() {
      step -= 1;
      goToStep(step);
    }

    function goToStep(stepNumber) {
      let currentStep = stepNumber;

      let inputsToHide = document.getElementsByClassName("formstep");
      let inputs = document.getElementsByClassName(`step${currentStep}`);

      for (let i = 0; i < inputsToHide.length; i++) {
        inputsToHide[i].classList.add("d-none");
      }

      //hide all input
      for (let i = 0; i < inputsToHide.length; ++i) {
        hide(inputsToHide[i]);
      }

      //only show the right one
      for (let i = 0; i < inputs.length; ++i) {
        show(inputs[i]);
      }

      var i,
        x = document.getElementsByClassName("indicator");
      // This function removes the "active" class of all steps...
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace("active", " ");
      }
      //... and adds the "active" class on the current step:
      x[currentStep].className += " active";
    }
    function show(elem) {
      elem.classList.remove("d-none");
    }

    function hide(elem) {
      elem.classList.add("d-none");
    }

    return { nextButton, prevButton, goNext, goPrev };
  },
  data() {
    const simpleSchema = {
      email(value) {
        if (!value?.includes("@")) {
          return "Please add a valid email address";
        }
        if (value.length > 100) {
          return "Email must be less than 100 characters";
        }
        if (!value) {
          return "Email is required";
        }
        // validate email value...
        return true;
      },
      first_name(value) {
        if (!value) {
          return "First name is required";
        }
        return true;
      },
      last_name(value) {
        if (!value) {
          return "Last name is required";
        }
        return true;
      },
      state(value) {
        if (!value) {
          return "State is required";
        }
        return true;
      },
    };
    return {
      tabIndexAdv1: ref(0),
      states: [],
      countries: [],
      profile: {},
      simpleSchema,
      state: "",
      country: "",
      validState: "",
      ID: "",
      verifying: false,
      currentStep: 1,
    };
  },
  computed: {
    ...mapState("ProfileModule", [
      "updated",
      "userProfile",
      "signature",
      "updating",
    ]),
    ...mapGetters("ProfileModule", [
      "updated",
      "user",
      "signature",
      "updating",
    ]),
    // populate state from api
    getCountry() {
      const country_id = this.profile?.country?.id;

      return country_id;
    },
  },

  
  methods:{   
  
    ...mapActions('ProfileModule',['userUpdate']),
      goHome(){
        this.$router.push('/')
      
      },
    getStates(country){
     
        ToNote.get(`/countries/${country}`)
         .then(res => {
     
      this.states = res.data.data;  
    })
    },

    handleSubmit() {
      let data = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        email: this.profile.email,
        address: this.profile.address,
        country_id: this.country,
        state_id: this.state,
        phone: this.profile.phone,
        dob: this.profile.dob,
        gender: this.profile.gender
      };
      
      if (data) {
        this.goNext();
        this.userUpdate(data);

        this.tabIndexAdv1++;
      }
    },

    verifyId() {
      this.verifying = true;
      ToNote.post("/verify/user", {
        type: this.profile.identity_type,
        value: this.profile.identity_number,
      })
        .then((res) => {
          if (res.status == 200) {
            this.validState = true;
            this.$store.dispatch("ProfileModule/getUser");
            toast.success(`ID verified successfully`, {
              duration: 3000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            });
            this.verifying = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.verifying = false;
          toast.error("Error verifying", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    },
  },

  beforeCreate() {
    ToNote.get("/user/profile").then((res) => {
      this.profile = res?.data?.data;
      this.validState = res?.data?.data?.national_verification;
      this.state = res?.data?.data?.state?.id;
      this.country = res?.data?.data?.country?.id;
     
      this.getStates(this.country)
    });

    ToNote.get("/countries").then((res) => {
      this.countries = res?.data?.data;

    });
  },
  created() {
    console.log(this.profile, this.userProfile, this.user, this.country, 'created');
    if(this.profile){
      ToNote.get(`/countries/${this.country}`).then((res) => {
      this.states = res?.data?.data;
      console.log(res?.data?.data, 'states')
    });
    }
   
  },
};
</script>

<style scoped></style>
