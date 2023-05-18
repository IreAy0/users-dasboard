<template>
  <div>
    <div
      class="d-flex align-items-start modern-horizontal-wizard bs-stepper wizard-modern modern-wizard-example d-flex flex-column flex-lg-row">
      <ul
        class="nav nav-steps nav-tabs flex-nowrap overflow-auto  py-1 px-0 col-12 col-md-3 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline"
        id="myTab" role="tablist">
        <li class="nav-item step" role="presentation">
          <button class="nav-link active company-indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title">Company Information</span>
              </span>
            </span>
          </button>
        </li>
        <li class="nav-item step" role="presentation">
          <button class="nav-link company-indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 2</span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title">Verify Company IDs</span>
              </span>
            </span>
          </button>
        </li>
        <li class="nav-item step" role="presentation">
          <button class="nav-link company-indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 3</span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title">Stamp and seal</span>
              </span>
            </span>
          </button>
        </li>
      </ul>
      <div class="tab-content tab-content col-12 col-md-9 bs-stepper-content">
        <div class="companysteps step-0 ">
          <Form @submit="handleSubmit" :validation-schema="simpleSchema" id="company-details-modern" novalidate>
            <div class="content-header mb-1">
              <h5 class="mb-0">Add company information</h5>
              <small class="text-muted">Enter Your company's Information.</small>
            </div>
            <div class="row">
              <div class="mb-1 col-md-12">
                <label class="form-label" for="modern-first-name">Company Name </label>
                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  type="text" id="modern-first-name" class="form-control" placeholder="John" name="company_name"
                  v-model="profile.company_name" />
                <ErrorMessage name="company_name" class="text-danger" />
              </div>

              <div class="mb-1 col-md-12">
                <label class="form-label" for="company-email">Email</label>
                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  type="email" name="email" id="company-email" class="form-control"
                  :class="{ 'has-error': errorMessage }" placeholder="john.doe@email.com" aria-label="john.doe"
                  v-model="profile.email" />
                <ErrorMessage name="email" class="text-danger" />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="modern-phone">Company Address </label>
                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  type="text" name="address" id="company-address" class="form-control" placeholder="Address"
                  aria-label="phone_number" v-model="profile.address" />
                <ErrorMessage name="address" class="text-danger" />
              </div>
              <div class="mb-1 col-md-6">
                <label class="form-label" for="modern-phone">Phone Number </label>
                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  type="tel" name="phone" id="modern-phone" class="form-control" :class="{ 'has-error': errorMessage }"
                  placeholder="070 0000 000" aria-label="phone_number" v-model="profile.phone" />
                <ErrorMessage name="phone" class="text-danger" />
              </div>
              <div class="mb-1 col-md-6">
                <label class="form-label" for="country">Country  </label>
                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  name="country" as="select" @change="getStates(country)" v-model="country"
                  class="select2 w-100 form-select" id="company-country">
                  <option value="">Please select a country</option>
                  <option :key="option" :selected="option?.id === country ? true : false" v-for="option in countries"
                    :value="option?.id">
                    {{ option?.name }}
                  </option>
                </Field>
              </div>
              <div class="mb-1 col-md-6">
                <label class="form-label" for="state">State</label>
                <!-- <b-form-select :options="states"></b-form-select> -->

                <Field :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  name="state" as="select" v-model="state" class="select2 w-100 form-select" id="state">
                  <option value="" disabled>Please select a state</option>
                  <option :key="option" v-for="option in states" :value="option?.id"
                    :selected="option?.id === state ? true : false">
                    {{ option?.name }}
                  </option>
                </Field>
                <ErrorMessage name="state" class="text-danger" />
              </div>
              <div class="row align-items-baseline pt-1">
                <label class="form-label" for="state">Company Logo * </label>

                <div class="col-12 col-md-8 rounded-3">
                  <div class="file-upload">
                    <!-- <button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button> -->

                    <div class="image-upload-wrap">
                      <input :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                        class="file-upload-input" type="file" @change="onFileChange" accept="image/*" />
                      <div class="drag-text">
                        <h3>Click to add your Logo</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-4 mt-2 mt-md-0">
                  <!-- <button class="btn  bg-primary text-primary  bg-opacity-10 rounded-3 border border-primary">Preview Signature</button> -->
                  <div>
                    <div class="mt-1">
                      <img :src="profile?.logo" class="sign-preview"
                        :style="{ width: '100%', maxHeight: '150px', objectFit: 'contain' }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <b-button-group class="mt-2 w-100 justify-content-end">
              <div>
                <button id="nextbtn" class="rounded btn btn-primary btn-next">
                  <span v-show="verifying" class="spinner-border spinner-border-sm"></span>
                  <span class="align-middle d-inline-block">Save and Continue</span>
                </button>
              </div>
            </b-button-group>
          </Form>
        </div>
        <div class="companysteps step-1 d-none">
          <div id="personal-info-modern" class="">
            <div class="content-header mb-1">
              <h5 class="mb-0">Identity Verification</h5>
              <small>Verify your ID.</small>
            </div>
            <div class="row">
              <div class="mb-1 col-md-6">
                <label class="form-label" for="id_type">Company Type</label>
                <select
                  :disabled="validState === true || getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                  v-model="profile.type" class="select2 w-100 form-select">
                  <option value="" disabled>Please select a type</option>
                  <option value="Limited Company">Limited Company</option>
                  <option value="Incorprated Trustee">
                    Incorprated Trustee
                  </option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <b-col md="6">
                <label class="form-label" for="bvn">Company Registration Number</label>
                <div></div>
                <div class="input-group relative mb-3">
                  <input placeholder="12345678910" v-model="profile.registration_company_number"
                    :disabled="validState === true" id="registration_company_number" type="text"
                    class="form-control rounded-end" aria-label="BVN" />
                  <span v-if="validState" class="position-absolute end-0  px-1" :style="{ top: '7px' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      class="bi bi-check-lg text-success" viewBox="0 0 16 16">
                      <path
                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  </span>
                  <button v-show="validState == false" @click="verifyId"
                    class="btn border mb-0 btn-primary-outline border-primary text-primary ms-1">
                    <span v-show="verifying" class="spinner-border spinner-border-sm"></span>
                    <span class="align-middle d-inline-block">Verify ID</span>
                  </button>
                </div>
              </b-col>
            </div>
            <b-button-group class="mt-2 w-100 justify-content-end">
              <div>
                <button @click="goToStep(0)" id="prev" class="me-3 rounded-circle p-1 btn btn-outline-secondary">
                  <span class="align-middle d-inline-block">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                        fill="#A1A0A0" />
                    </svg>
                  </span>
                </button>
                <button :disabled="validState !== true" @click="goToStep(2)" id="nextbtn"
                  class="rounded btn btn-primary btn-next">
                  <span class="align-middle d-inline-block">Save and Continue</span>
                </button>
              </div>
            </b-button-group>
          </div>

        </div>
        <div class="companysteps step-2 d-none">
          <div id="address-step-modern">
            <div class="content-header my-1">
              <h5 class="mb-0">Digitise Stamp and Seal</h5>
              <small>Create Your digital Stamp and Seal.</small>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <div class="rounded-3 border">
                  <nav>
                    <div class="nav nav-tabs ms-1" id="nav-tab" role="tablist">
                      <button class="nav-link" @click.prevent="setActive('seal')"
                        :class="{ ' active': isActive('seal') }" href="#seal">
                        Seal
                      </button>
                      <button class="nav-link" @click.prevent="setActive('stamp')"
                        :class="{ ' active': isActive('stamp') }" href="#stamp">
                        Stamp
                      </button>
                    </div>
                  </nav>
                  <div class="tab-content px-2" id="nav-tabContent">

                    <div class="tab-pane fade" :class="{ 'active show': isActive('seal') }" id="seal">
                      <SealTraditional @goToStep="goToStep(1)" :getActiveTeam="getActiveTeam"
                        :getActiveUser="getActiveUser" />
                    </div>

                    <div :disabled="getActiveUser()?.permission !== 'Admin' || getActiveUser()?.isOwner !== true"
                      class="tab-pane fade" :class="{ 'active show': isActive('stamp') }" id="stamp">
                      <StampCreate @goToStep="goToStep(1)" :getActiveUser="getActiveUser" />
                    </div>

                    <div class="d-flex justify-content-between py-2">
                      <small class="text-muted fst-italic">By clicking save, I confirm that all the information
                        given is true and I have the authority to create and use
                        this seal and it is as valid as all alternate company
                        seals to the extent allowed by law.</small>
                      <!-- <button @click="onSaveSignature" class="btn btn-primary">
                        <span
                          v-show="updating"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Save
                      </button> -->
                    </div>
                  </div>
                </div>

              </div>
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
import ToNote from "@/Services/Tonote";
import { mapActions, mapState, useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import SealTraditional from "./SealTraditional.vue";
import StampCreate from "./StampCreate.vue";

const $toast = useToast();

export default {
  name: "CompanyDetails",
  components: { Form, ErrorMessage, Field, SealTraditional, StampCreate },
  props: {
    generalData: {
      type: Object,
      default: () => { },
    },
    getActiveTeam: {
      type: Object,
      default: () => { },
    },
  },
  setup() {
    const store = useStore();
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
      if (stepNumber == 2) {
        store?.dispatch("CompanyModule/getCompany");
      }

      let currentStep = stepNumber;

      let inputsToHide = document.getElementsByClassName("companysteps");
      let inputs = document.getElementsByClassName(`step-${currentStep}`);

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
        x = document.getElementsByClassName("company-indicator");
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

    return { nextButton, prevButton, goNext, goPrev, goToStep, store };
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
      company_name(value) {
        if (!value) {
          return "Company name is required";
        }
        return true;
      },

      address(value) {
        if (!value) {
          return "Address is required";
        }
        return true;
      },
      state(value) {
        if (!value) {
          return "State is required";
        }
        return true;
      },
      phone(value) {
        if (!value) {
          return "Phone Number is required";
        }
        return true;
      },
      // state(value){
      //   if(!value){
      //     return "State is required";
      //   }
      //   return true;
      // }
    };
    return {
      activeItem: "seal",
      tabIndexAdv1: ref(0),
      states: [],
      profile: {},
      simpleSchema,
      state: "",
      country: "",
      validState: "",
      ID: "",
      verifying: false,
      currentStep: 1,
      errors: "",
      setImage: "",
    };
  },
  computed: {
    ...mapState("CompanyModule", [
      "updated",
      "Errors",
      "updating",
      "companyProfile",
      "changeValue",
    ]),
    ...mapState('TeamsModule', ['Teams', 'teamsUsers']),
    ...mapState("ProfileModule", [
      "updated",
      "userProfile",
      "signature",
      "updating",
      "gettingProfile",
    ]),
  },
  watch: {
    changeValue: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        if (
          newVal?.length > 0 &&
          this.activeItem == "seal"

        ) {
          this.$store.dispatch("CompanyModule/listCompanySeals");
          this.setActive("stamp");
        }
        else if (
          newVal?.length > 0 &&
          this.activeItem == "stamp"
        ) {
          this.$store.dispatch("CompanyModule/listCompanyStamps");
          $toast.success("Company setup Completed", {
            position: "top-right",
            duration: 5000,
            closeButton: false,
            progressBar: false,
          });
          this.$router.push("/admin/dashboard");

        }
      },

      deep: true,
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },

    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    getMenu(value) {
      this.setActive(value);
    },
    getActiveUser() {
      const activeUser = this.getActiveTeam?.users?.find(team => team?.id == this.userProfile?.id)

      return activeUser
    },
    ...mapActions("CompanyModule", ["companyUpdate", "getCompany"]),

    getStates(country) {
      ToNote.get(`/countries/${country}`).then((res) => {
        this.states = res?.data?.data;
      });
    },

    onFileChange(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = (e) => {
        let image = e.target.result;
        this.profile.logo = image;
      };
    },
    handleSubmit() {
      let data = {
        country_id: this.country,
        company_name: this.profile.company_name,
        email: this.profile.email,
        address: this.profile.address,
        state_id: this.state,
        phone: this.profile.phone,
        logo: this.profile.logo,
      };
      if (data) {
        this.verifying = true;
        this.companyUpdate(data)
          .then((res) => {
            if (res) {
              this.verifying = false;
              this.$store.dispatch("CompanyModule/getCompany");
              this.$store.dispatch("ProfileModule/getUser");
              $toast.success("Updated successfully", {
                duration: 3000,
                queue: false,
                position: "top-right",
                dismissible: true,
                pauseOnHover: true,
              });
              this.goToStep(1);
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.verifying = false;
            $toast.error(error.response.data.errors.logo, {
              duration: 3000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
    },

    verifyId() {
      this.verifying = true;
      ToNote.post("/verify/company", {
        registration_company_number: this.profile?.registration_company_number,
        type: this.profile.type,
      })
        .then((res) => {
          if (res.status == 200) {
            this.validState = true;
            $toast.success("ID verified successfully", {
              duration: 3000,
              queue: false,
              position:"top-right",
              dismissible: true,
              pauseOnHover: true,
            });
            this.verifying = false;
          }
        })
        .catch((err) => {
          this.verifying = false;
          $toast.error("Error while verifying business", {
            duration: 3000,
            queue: false,
            position:"top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    },
  },

  beforeCreate() {
    ToNote.get("/company")
      .then((res) => {
        this.profile = res?.data?.data;
        this.validState = res?.data?.data?.is_verified;
        this.state = res?.data?.data?.state_id;
        this.country = res?.data?.data?.country_id;
        this.getStates(this.country)
      })
      .catch((err) => {
        this.errors = err?.response?.data?.data?.error;
      });
    ToNote.get("/countries").then((res) => {
      this.countries = res?.data?.data;
    });
  },
  mounted() {


    if (this.companyProfile) {
      ToNote.get(`/countries/${this.companyProfile?.country_id}`).then((res) => {
        this.states = res?.data?.data;


      });
    }

  },
  //  mounted() {

  //   ToNote.get(`/countries/${this.userProfile?.country?.id}`).then((res) => {
  //     this.states = res?.data?.data;
  //   });
  // },
};
</script>

<style scoped>
.file-upload {
  background-color: #ffffff;
  width: 100%;
  margin: 0 auto;
}

.file-upload-input {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
}

.image-upload-wrap {
  /* margin-top: 20px; */
  border: 2px dashed #cacaca;
  position: relative;
}

.drag-text {
  text-align: center;
}

.drag-text h3 {
  font-weight: 400;
  text-transform: uppercase;
  color: #cacaca;
  padding: 60px 0;
}
</style>
