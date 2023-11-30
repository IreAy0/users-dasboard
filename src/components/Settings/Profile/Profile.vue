<template>
  <div
    class="d-flex align-items-start modern-horizontal-wizard bs-stepper wizard-modern modern-wizard-example d-flex flex-column flex-lg-row"
  >
    <nav class="col-12 col-md-3">
      <ul
        class="nav nav-steps flex-nowrap overflow-auto nav-tabs py-1 px-0 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline"
        id="myTab"
        role="tablist"
      >
        <li @click="goToStep(0)" class="nav-item step" role="presentation">
          <button class="nav-link active indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title"> Identity Verification</span>
              </span>
            </span>
          </button>
        </li>
        <li @click="goToStep(1)" class="nav-item step">
          <button class="nav-link indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 2</span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title">Personal Info</span>
              </span>
            </span>
          </button>
        </li>
        <li @click="goToStep(2)" class="nav-item step" role="presentation">
          <button class="nav-link indicator">
            <span class="step-trigger">
              <span class="bs-stepper-box d-none d-lg-block"> 3</span>
              <span class="bs-stepper-label">
                <span class="bs-stepper-title">Digitize signature</span>
              </span>
            </span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="tab-content tab-content col-12 col-md-9 bs-stepper-content">
      <div class="formstep step1 d-none">
        <div class="content-header mb-1">
          <h5 class="mb-0">Personal Info</h5>
          <small class="text-muted">Update Your Personal Information.</small>
        </div>

        <div class="pb-2 d-flex gap-3 align-items-center">
          <div
            class="rounded-3 border d-flex justify-content-center align-items-center"
            style="width: 100px; height: 100px"
            alt="Avatar"
          >
            <img
              v-if="userProfile.image.includes('user')"
              width="100"
              :src="userProfile.image"
              :alt="userProfile.first_name"
            />
            <i v-else class="fas fa-user-alt fa-3x text-primary"></i>
          </div>
          <div>
            <h3>{{ userProfile.first_name }} {{ userProfile.last_name }}</h3>
            <p>{{ userProfile.email }}</p>
          </div>
        </div>
        <Form
          autocomplete="off"
          @submit="handleSubmit"
          :validation-schema="simpleSchema"
          id="account-details-modern"
          novalidate
        >
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
                v-model="userProfile.first_name"
              />
              <ErrorMessage name="first_name" class="text-danger" />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-last-name">Last Name</label>
              <Field
                type="text"
                id="modern-last-name"
                class="form-control"
                placeholder="Doe"
                name="last_name"
                v-model="userProfile.last_name"
              />
              <ErrorMessage name="last_name" class="text-danger" />
            </div>
            <div class="mb-1 col-md-6">
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
                v-model="userProfile.email"
              />
              <ErrorMessage name="email" class="text-danger" />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-phone">Date of Birth</label>

              <Field
                type="date"
                name="date_of_birth"
                id="modern-date_of_birth"
                class="form-control"
                aria-label="date_of_birth"
                v-model="userProfile.dob"
              />
              <ErrorMessage name="date_of_birth" class="text-danger" />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="id_type">Gender</label>
              <select
                v-model="userProfile.gender"
                class="select2 w-100 form-select"
              >
                <option disabled>Please select a gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">I'd prefer not to say</option>
              </select>
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-phone">Address</label>
              <Field
                type="text"
                name="address"
                id="modern-address"
                class="form-control"
                placeholder="Address"
                aria-label="phone_number"
                v-model="userProfile.address"
              />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="modern-phone">Phone Number</label>
              <Field
                type="tel"
                name="phone"
                id="modern-phone"
                class="form-control"
                :class="{ 'has-error': errorMessage }"
                placeholder="070 0000 000"
                aria-label="phone_number"
                v-model="userProfile.phone"
              />
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="country">Country</label>
              <Field
                name="country"
                as="select"
                @change="getStates(country)"
                v-model="country"
                class="select2 w-100 form-select"
                id="country"
              >
                <option value="">Please select a country</option>
                <option
                  :key="option"
                  :selected="option?.id === country ? true : false"
                  v-for="option in countries"
                  :value="option?.id"
                >
                  {{ option?.name }}
                </option>
              </Field>
            </div>
            <div class="mb-1 col-md-6">
              <label class="form-label" for="state">State of Residence</label>
              <Field
                name="state"
                as="select"
                v-model="state"
                class="select2 w-100 form-select"
                id="state"
              >
                <option value="" disabled>Please select a state</option>
                <option
                  :key="option"
                  :selected="option?.id === state ? true : false"
                  v-for="option in states"
                  :value="option?.id"
                >
                  {{ option?.name }}
                </option>
              </Field>
              <ErrorMessage name="state" class="text-danger" />
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
              <button
                type="button"
                @click="goPrev"
                id="nextbtn"
                class="me-3 rounded-circle p-1 btn btn-outline-secondary"
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
              </button>

              <button id="nextbtn" class="rounded btn btn-primary btn-next">
                <span class="align-middle d-inline-block"
                  >Save and Continue</span
                >
              </button>
            </div>
          </b-button-group>
        </Form>
      </div>
      <div class="formstep step0">
        <div id="personal-info-modern" class="">
          <div class="content-header mb-1">
            <h5 class="mb-0">Identity Verification</h5>
            <small>Verify your ID.</small>
          </div>
          <hr />
          <!-- @submit="verifyId" -->
          <Form
            
            :validation-schema="verificationSchema"
            class="row"
          >
            <h6 class="text-gray-900 my-1">
              1. Choose your ID type and enter your ID number and Date of birth
            </h6>

            <div class="col-md-6">
              <div class="mb-1">
                <label class="form-label" for="id_type"
                  >Identification Type</label
                >
                <!--:disabled="validState"-->
                <Field
                  as="select"
                  :disabled="validState"
                  v-model="profile.identity_type"
                  name="id_type"
                  class="select2 w-100 py-1 form-select text-sm"
                >
                  <option value="" disabled>
                    Please select a form of Identity
                  </option>
                  <option value="nin">NIN</option>
                  <option value="drivers_license">Drivers License</option>
                  <option value="bvn">BVN</option>
                </Field>
                <ErrorMessage name="id_type" class="text-danger" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-1">
                <label class="form-label" for="bvn">ID Number</label>

                <div class="input-group relative">
                  <template v-if="userProfile.identity_number == null">
                    <Field
                      placeholder="12345678910"
                      name="registration_company_number"
                      v-model="profile.identity_number"
                      :disabled="validState === true"
                      id="registration_company_number"
                      type="text"
                      class="form-control py-2 rounded-end"
                      aria-label="BVN"
                    />
                  </template>
                  <template v-else>
                    <!--:disabled="validState === true"-->
                    <Field
                      :disabled="validState === true"
                      placeholder="12345678910"
                      name="registration_company_number"
                      v-model="maskedNumber"
                      id="registration_company_number"
                      type="text"
                      class="form-control py-2 rounded-end"
                      aria-label="BVN"
                    />
                  </template>

                  <span
                    v-if="validState"
                    class="position-absolute end-0 px-1"
                    :style="{ top: '7px' }"
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
                </div>
                <ErrorMessage
                  name="registration_company_number"
                  class="text-danger"
                />
              </div>
            </div>
            
            <!-- <div class="col-md-6">
              <br />
              <button
                style="padding: 8px 14px"
                type="submit"
                v-show="validState == false"
                class="btn btn-md border mb-0 btn-primary-outline border-primary text-primary"
              >
                <span
                  v-show="verifying"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span class="align-middle d-inline-block">Verify ID</span>
              </button>
            </div> -->
          </Form>
          <h6 v-show="validState !== true"  class="text-gray-900 my-1">
            2. We will carry out further identity verification checks
          </h6>
          <div v-if="validState !== true" class="d-flex align-items-center flex-column  flex-lg-row gap-3">
            <div class="camera-passport-placeholder">
              <div class="camera-placeholder text-center">
                <template v-if="userVerificationImage">
                  <img
                    :src="userVerificationImage"
                    alt="Snapshot"
                    style="object-fit: cover"
                    class="img-fluid h-100 object-fit-cover"
                  />
                </template>
                <!-- v-else-if="!cameraActive" -->
                <template v-else>
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
              </div>
            </div>
            <div>
              
              <button
              v-if="!userVerificationImage "
                @click="setPhotographModal"
                class="btn btn-primary btn-sm px-3 py-1 waves-effect"
                id="takePicture"
              >
                <!-- <EditIcon /> -->
                Start face match
              </button>
              <button
              v-else-if="verifyError == true"
                @click="setPhotographModal"
                class="btn btn-primary btn-sm px-3 py-1 waves-effect"
                id="takePicture"
              >
                <!-- <EditIcon /> -->
                Retake
              </button>
              <button
              :disabled="verifying == true"
              v-else
                @click="verifyId"
                class="btn btn-primary btn-sm px-3 py-1 waves-effect"
                id="takePicture"
              >
              <span
                  v-show="verifying"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Complete Verification</span>
                <!-- <EditIcon /> -->
                
              </button>
            </div>
          </div>

          <div
            v-show="
              userProfile.identity_type === 'vnin' ||
              (profile.identity_type == 'vnin' && validState === false)
            "
          >
            <div
              class="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                class="bi bi-exclamation-triangle-fill flex-shrink-0 me-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 11.7654V7.76538H6.5V8.76538H7.5V11.7654H6V12.7654H10V11.7654H8.5ZM8 4.76538C7.85166 4.76538 7.70666 4.80937 7.58332 4.89178C7.45999 4.97419 7.36386 5.09132 7.30709 5.22837C7.25032 5.36541 7.23547 5.51621 7.26441 5.6617C7.29335 5.80718 7.36478 5.94082 7.46967 6.04571C7.57456 6.1506 7.7082 6.22203 7.85368 6.25097C7.99917 6.27991 8.14997 6.26506 8.28701 6.20829C8.42406 6.15152 8.54119 6.0554 8.6236 5.93206C8.70601 5.80872 8.75 5.66372 8.75 5.51538C8.75 5.31647 8.67098 5.1257 8.53033 4.98505C8.38968 4.8444 8.19891 4.76538 8 4.76538Z"
                  fill="currentColor"
                />
                <path
                  d="M8 15.7654C6.61553 15.7654 5.26216 15.3548 4.11101 14.5857C2.95987 13.8165 2.06266 12.7233 1.53285 11.4442C1.00303 10.1651 0.86441 8.75762 1.13451 7.39975C1.4046 6.04189 2.07129 4.7946 3.05026 3.81564C4.02922 2.83667 5.2765 2.16998 6.63437 1.89989C7.99224 1.62979 9.3997 1.76841 10.6788 2.29823C11.9579 2.82804 13.0511 3.72525 13.8203 4.87639C14.5895 6.02754 15 7.38091 15 8.76538C15 10.6219 14.2625 12.4024 12.9497 13.7151C11.637 15.0279 9.85652 15.7654 8 15.7654ZM8 2.76538C6.81332 2.76538 5.65328 3.11728 4.66658 3.77657C3.67989 4.43585 2.91085 5.37293 2.45673 6.46928C2.0026 7.56564 1.88378 8.77204 2.11529 9.93593C2.3468 11.0998 2.91825 12.1689 3.75736 13.008C4.59648 13.8471 5.66558 14.4186 6.82946 14.6501C7.99335 14.8816 9.19975 14.7628 10.2961 14.3087C11.3925 13.8545 12.3295 13.0855 12.9888 12.0988C13.6481 11.1121 14 9.95207 14 8.76538C14 7.17409 13.3679 5.64796 12.2426 4.52274C11.1174 3.39752 9.5913 2.76538 8 2.76538Z"
                  fill="currentColor"
                />
              </svg>

              <div>
                Your NIN will no longer work due to National Database updates
              </div>
            </div>
            <h6 class="text-primary fs-6 fw-boldest">
              How to get your virtual NIN
            </h6>
            <h6 class="text-black fs-6 fw-boldest mt-1">
              Through the NIMC app
            </h6>
            <ol
              class="list-group-numbered p-0 text-black fs-small fw-normal lh-base mt-1"
            >
              <li>Download the NIMC App from your mobile store.</li>
              <li>Click on "Get Virtual NIN"</li>
              <li>
                Select "Input Enterprise short-code" and type
                <span class="fw-boldest">715461</span>
              </li>
              <li>Click "Submit" and your virtual NIN will be generated.</li>
              <li>You can type the virtual NIN into the field.</li>
            </ol>
            <hr />
            <h6 class="text-black fs-6 fw-boldest">Via USSD</h6>
            <p class="fs-small text-black fw-normal mt-1">
              Dial <span class="fw-boldest">*346* 3*Your NIN*715461#</span> An
              SMS message will be sent back to you containing the Virtual NIN
              generated for you.
            </p>
          </div>
          <b-button-group class="mt-3 w-100 justify-content-end">
            <div>
              <button
                @click="goNext"
                id="nextbtn"
                :disabled="validState === false"
                class="rounded btn btn-primary btn-next"
              >
                <span class="align-middle d-inline-block"
                  >Save and Continue</span
                >
              </button>
            </div>
          </b-button-group>
        </div>
      </div>
      <div class="formstep step2 d-none">
        <div id="address-step-modern">
          <div class="content-header mb-2">
            <h3 class="text-gray-900 fw-bolder">Digitise signature</h3>
            <p class="">Digitize your signature</p>
          </div>
          <hr />
          <div class="row mt-2">
            <div class="col-md-12 mb-2">
              <div class="signature-display">
                <h4 v-if="!dashboard.default_signature" class="text-gray-secondary">
                  Your Signatures displays here
                </h4>
                <!-- v-if="userProfile.image.includes('user')" -->
                <div v-else >
                  <img 
                  class="img-fluid"
                  :src="getDefaultSignature?.file"
                  :alt="userProfile.first_name"
                />
                </div>
                
                <button
                  @click="updateModal"
                  class="btn btn-primary px-3 py-1 waves-effect flex-shrink-0"
                  id="updateSignature"
                >
                  <!-- <EditIcon /> -->
                {{dashboard.default_signature ? "Edit Signature" : "Create Signature"}}
                </button>
              </div>
            </div>
          </div>
          <!-- <Signature
                  @goPrev="goPrev"
                  v-if="profile"
                  :generalData="profile"
                ></Signature> -->
        </div>
      </div>
    </div>
  </div>
  <ModalComp
    :show="updateSignatureModal"
    :footer="false"
    @close="updateSignatureModal = false"
    :style="'zindex-4'"
    modalClass="px-0 "
  >
    <template #header>
      <h4 class="modal-title">Create signature</h4>
    </template>

    <template #body>
      <TabWrapper
        tabListStyle="underline"
        tabStyles="justify-content-start border-2 border-bottom mx-3"
      >
        <TabList styles="p-0" title="Draw">
          <SignaturePad @close="updateSignatureModal = false" />
        </TabList>

        <TabList styles="p-0" title="Select">
          <SignatureSelectFull @close="updateSignatureModal = false" />
        </TabList>

        <TabList styles="p-0" title="Upload">
          <!-- <div class="row">
            <div class="col-md-12 mx-auto position-relative"> -->
          <SignatureUpload @close="updateSignatureModal = false" />
          <!-- </div>
          </div> -->
        </TabList>
      </TabWrapper>
    </template>

    <template #footer> footer </template>
  </ModalComp>

  <ModalComp
    :show="takePhotographModal"
    :footer="false"
    @close="takePhotographModal = false"
    :style="'zindex-4'"
    modalClass="px-0 "
  >
    <template #header>
      <div>
        <h4 class="modal-title text-gray-900">Face verification</h4>
        <p class="text-gray-700 mt-50 mb-0 fw-normal">
          We now wil carry out additional verification. Face your camera, follow
          the guidlines below and take a picture for verification
        </p>
      </div>
    </template>

    <template #body>
      <PassportPhotograph @close="receiveEmit" />
    </template>
  </ModalComp>
</template>

<script>
import { ref } from "vue";
import { Form, ErrorMessage, Field } from "vee-validate";
import Signature from "@/components/Signature/Signature.vue";
import ToNote from "@/Services/Tonote";
import { mapActions, mapGetters, mapState } from "vuex";
import { useToast } from "vue-toast-notification";
import { mask } from "@/Services/helpers";
import ModalComp from "@/components/NewModalComp.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
import PassportPhotograph from "@/components/Passport/PassportPhotograph.vue";

import TabWrapper from "@/components/Tab/TabTopNav/TopTabWrapper.vue";
import TabList from "@/components/Tab/TabTopNav/TopTabList.vue";

import SignaturePrint from "@/components/NewSignature/SignaturePrint.vue";
import SignaturePad from "@/components/NewSignature/SignaturePad.vue";

import SignatureSelectFull from "@/components/NewSignature/SignatureSelectFull.vue";
import SignatureUpload from "@/components/NewSignature/SignatureUpload.vue";

const $toast = useToast();
// const store = useStore()

export default {
  name: "ProfilePage",
  components: {
    // Signature,
    Form,
    ErrorMessage,
    Field,
    ModalComp,
    TabWrapper,
    TabList,
    // SignaturePrint,
    SignaturePad,
    SignatureSelectFull,
    SignatureUpload,
    PassportPhotograph,
  },
  setup() {
    let step = 0;
    const nextButton = document.getElementById("nextbtn");
    const prevButton = document.getElementById("prev");
    const updateSignatureModal = ref(false);
    const takePhotographModal = ref(false);
    const { useGetters, useActions } = createNamespacedHelpers(["print"]);
    // const { useGetters, useActions } = createNamespacedHelpers(["user"]);

    const { prints } = useGetters(["prints", "print"]);
    const { userVerificationImage } = useGetters([
      "user/userVerificationImage",
    ]);

    const { savePrint, getUserPrints } = useActions([
      "savePrint",
      "getUserPrints",
      "getUserPrint",
    ]);


    function updateModal() {
      updateSignatureModal.value = true;
    }

    function setPhotographModal() {
      takePhotographModal.value = true;
    }
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

    return {
      getUserPrints,
      nextButton,
      prevButton,
      goNext,
      goPrev,
      goToStep,
      updateModal,
      updateSignatureModal,
      setPhotographModal,
      takePhotographModal,
      prints
      // userVerificationImage
    };
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
      date_of_birth(value) {
        if (!value) {
          return "Date of birth is required";
        }
        return true;
      },
    };
    const verificationSchema = {
      id_type(value) {
        if (!value) {
          return "ID Type is required";
        }
        return true;
      },
      registration_company_number(value) {
        if (!value) {
          return "ID number is required";
        }
        if (value.length > 12) {
          return "ID must not be more than 12 characters";
        }
        if (value.length < 10) {
          return "ID must not be less than 10 characters";
        }
        // check if value is  a number
        // if (isNaN(value)) {
        //   return "ID must be a number";
        // }
        return true;
      },
    };

    return {
      tabIndexAdv1: ref(0),
      states: [],
      countries: [],
      profile: {},
      simpleSchema,
      verificationSchema,
      state: "",
      country: "",
      validState: "",
      ID: "",
      verifying: false,
      currentStep: 1,
      verifyError: false,
      // updateSignatureModal: false
    };
  },
  computed: {
    ...mapState("ProfileModule", [
      "updated",
      "userProfile",
      "signature",
      "updating",
      "dashboard"
    ]),
    
    ...mapGetters("ProfileModule", [
      "updated",
      "user",
      "signature",
      "updating",
      
    ]),
    ...mapGetters("user", ["userVerificationImage"]),
    // populate state from api
    getCountry() {
      const country_id = this.profile?.country?.id;

      return country_id;
    },
    maskedNumber() {
      
      if (this.userProfile?.identity_number !== null) {
        return mask(this.userProfile?.identity_number);
      }
      return null;
    },
    getDefaultSignature(){

      let signatures = this.prints.Signature
      const defaultSignature =  signatures?.find(sign => sign.id == this.dashboard.default_signature)

      return defaultSignature
    }
  },
  methods: {
    ...mapActions("ProfileModule", ["userUpdate", "getDashboard"]),
    ...mapActions("user", ["setVerificationImage"]),
    
    goHome() {
      this.$router.push("/");
    },
    getStates(country) {
      ToNote.get(`/countries/${country}`).then((res) => {
        this.states = res?.data?.data;
      });
    },
    receiveEmit() {
      this.takePhotographModal = false;
    },
    handleSubmit() {
      let data = {
        first_name: this.userProfile.first_name,
        last_name: this.userProfile.last_name,
        email: this.userProfile.email,
        address: this.userProfile.address,
        country_id: this.country,
        state_id: this.state,
        phone: this.userProfile.phone,
        dob: this.userProfile.dob,
        gender: this.userProfile.gender,
      };

      if (data) {
        this.userUpdate(data).then(this.goNext(), this.tabIndexAdv1++);
      }
    },

    verifyId() {
      this.verifying = true;
      ToNote.post("/verification/user-face-match", {
        type: this.profile.identity_type,
        idNumber: this.profile?.identity_number,
        photoBase64: this.userVerificationImage,
      })
        .then((res) => {
          if (res.status == 200) {
            this.validState = true;
            this.$store.dispatch("ProfileModule/getUser");
            $toast.success(`ID verified successfully`, {
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
          this.verifyError = true;
          this.verifying = false;
          this.setVerificationImage("");
          $toast.error(
            err.response.data.message || err.response.data.data.error,
            {
              duration: 3000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            }
          );
        });
    },
  },
  watch: {
    // whenever question changes, this function will run
    userVerificationImage: function (newImage, oldImage) {
     if(newImage){
      this.verifyError = false
     }
    }
  },
  mounted() {
    // ToNote.get("/user/profile").then((res) => {
    //   // this.profile = res?.data?.data;
    //   this.validState = res?.data?.data?.national_verification;
    //   this.state = res?.data?.data?.state?.id;
    //   this.country = res?.data?.data?.country?.id;
    //   this.getStates(this?.country)
    // });
    this.getDashboard();
    this.getUserPrints();
    this.$store.dispatch("ProfileModule/getUser");
    this.validState = this.userProfile?.national_verification;
    this.state = this.userProfile?.state?.id;
    this.country = this.userProfile?.country?.id;
    this.getStates(this?.country);
    ToNote.get("/countries").then((res) => {
      this.countries = res?.data?.data;
    });
  },
  created() {
    this.profile = this.userProfile;
    if (this?.profile) {
      ToNote.get(`/countries/${this?.country}`).then((res) => {
        this.states = res?.data?.data;
      });
    }
  },
};
</script>

<style scoped>
.camera-passport-placeholder {
  width: 250px;
  height: 250px;
}

.camera-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #f2f5fb;
}
.camera-view {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signature-display {
  display: flex;
  width: 760px;
  height: 200px;
  padding: 20px 60px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 8px;
  background: #f7f9fd;
  gap: 80px;
}
</style>
