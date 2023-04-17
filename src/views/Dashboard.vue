<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
    

      <div class="content-body">
        <div class="row" :class="{ ' d-none': userProfile?.national_verification === true }">
          <div class="col-12">
            <div class="alert alert-warning" role="alert">
              <div class="alert-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path
                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                Please
                <router-link class="text-primary" to="/admin/settings">Click here</router-link>&nbsp; to complete your
                profile.
              </div>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-5 g-2 mb-3">
  <div class="col">
    <div class="card h-100 justify-content-center">
      <router-link to="/admin/requests" class="">
              <div class="card-header p-1 flex-nowrap">
                <div class="flex-shrink-1">
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.notary_request}}</h2>
                  <p class="card-text text-dark">Notary requests</p>
                </div>
                <div class="avatar avatar-sm   bg-light-warning p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><defs></defs><path class="cls-1" d="M382.07,123.16c-34.68,0-63.33,28.67-63.33,63.35s28.65,63.19,63.33,63.19a63.46,63.46,0,0,0,63.17-63.19C445.24,151.83,416.75,123.16,382.07,123.16ZM235.92,182.68A53.46,53.46,0,0,0,199.34,274c20.77,20.77,55,20.88,75.77.1a54,54,0,0,0,0-75.87,53.33,53.33,0,0,0-39.19-15.54Zm255.53,40.75a12.7,12.7,0,1,0,9.33,3.72,12.69,12.69,0,0,0-9.33-3.72Zm-307,91.32c-26.64,0-48.53,22-48.53,48.68a48.71,48.71,0,0,0,48.53,48.5c26.64,0,48.67-21.86,48.67-48.5a49,49,0,0,0-48.67-48.68Zm360,29a19.64,19.64,0,1,0,19.66,19.66A19.74,19.74,0,0,0,544.44,343.71ZM237.23,448.08a42.56,42.56,0,1,0,30.23,12.42,42.64,42.64,0,0,0-30.23-12.42Zm253.91,17.83a24.81,24.81,0,1,0,18.16,42.36,25,25,0,0,0,0-35.17,24.73,24.73,0,0,0-18.16-7.19ZM363.66,509.85a33.85,33.85,0,1,0,.88,0C364.25,509.85,364,509.84,363.66,509.85Z"/></svg>
                  </div>
                </div>
              </div>
            </router-link>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 justify-content-center">
      <div class="card-header p-1 flex-nowrap">
                <div class="flex-shrink-1">
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.complete_sessions }}</h2>
                  <p class="card-text text-dark">Complete sessions</p>
                </div>
                <div class="avatar avatar-sm  bg-light-primary p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><path d="M560,122.5H140A17.48,17.48,0,0,0,122.5,140V560A17.48,17.48,0,0,0,140,577.5H560A17.48,17.48,0,0,0,577.5,560V140A17.48,17.48,0,0,0,560,122.5Zm-17.5,420h-385v-385h385Z"/><path d="M307.3,422.45a17.07,17.07,0,0,0,25.72.88l116.55-122.5a17.5,17.5,0,1,0-25.2-24.15L321.64,385,276,330.05h0a17.52,17.52,0,0,0-27,22.4Z"/></svg>
                  </div>
                </div>
              </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 justify-content-center">
      <a :href="`${getEnv}?status=sent&qt=${getToken}`"  >
              <div class="card-header p-1 flex-nowrap">
                <div class="flex-shrink-1">
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.signed_notes }}</h2>
                  <p class="card-text text-dark">Signed Notes</p>
                </div>
                <div class="avatar avatar-sm  bg-light-secondary p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><path d="M389.71,296.52H189.79a13.45,13.45,0,0,0,0,26.89H390.27A13.63,13.63,0,0,0,403.72,310c-.57-7.85-6.17-13.45-14-13.45Z"/><path d="M389.71,363.72H189.79a13.45,13.45,0,0,0,0,26.89H390.27a13.63,13.63,0,0,0,13.45-13.44c-.57-7.29-6.17-13.45-14-13.45Z"/><path d="M356.67,444.92a13.63,13.63,0,0,0-13.44-13.44H189.79a13.44,13.44,0,0,0,0,26.88h154c7.28,0,12.88-6.17,12.88-13.45Z"/><path d="M303.47,517.72l-23-23.52c-5-5-14.56-5-19.6,0l-17.35,17.36L226.2,493.64c-5-5-14.56-5-19.6,0l-26.88,28c-5,5.6-5,14,0,19,5.6,5,14,5,19,0l17.35-17.92,17.36,17.92c5,5,14.56,5,19.61,0l17.35-17.92,17.36,17.92a13.12,13.12,0,0,0,9.52,3.92h25.2A13.63,13.63,0,0,0,336,531.16c0-7.28-5.6-13.44-12.88-13.44Z"/><path d="M465.87,523.32v35.84a28.92,28.92,0,0,1-29.12,29.13H142.19a28.93,28.93,0,0,1-29.12-29.12V243.32h93a39.31,39.31,0,0,0,39.2-39.2v-93H436.76a28.67,28.67,0,0,1,29.11,29.12V300.44l26.88-37.52V140.28A53.79,53.79,0,0,0,476,100.52a55.43,55.43,0,0,0-39.77-16.24H240.75A57,57,0,0,0,201,101.08l-98,98.56A55.93,55.93,0,0,0,86.19,239.4V559.72a56.16,56.16,0,0,0,56,56H436.75a56.16,56.16,0,0,0,56-56V488l-14,20.16a114.27,114.27,0,0,1-12.88,15.12Zm-247.52-401v81.76A12.43,12.43,0,0,1,206,216.44H124.28Z"/><path d="M400.89,437.7l107-148.62,62.72,45.15-107,148.62Z"/><path d="M370.11,514.36,369,531.72c-.56,7.28,7.84,13.44,14.56,10.64l16.24-6.71a135.12,135.12,0,0,0,46.48-31.93l-61-44.23c-8.4,17.35-14,35.84-15.12,54.87Z"/><path d="M607,257.88l-38.64-28c-6.72-5-15.68-3.92-20.16,2.24l-24.63,34.73,62.72,45.35,25.19-34.71c4.48-6.16,2.25-14.57-4.48-19.61Z"/></svg>
                  </div>
                </div>
              </div>
            </a>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 justify-content-center">
      <a :href="`${getEnv}?status=received&qt=${getToken}`"  class="">
              <div class="card-header p-1 flex-nowrap">
                <div class="flex-shrink-1">
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.received_notes }}</h2>
                  <p class="card-text text-dark">Received Notes</p>
                </div>
                <div class="avatar avatar-sm  bg-light-success p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><path d="M651.84,392.31l-1.25-3.22-.41-8h-4.46L542.12,225.55H422.55V246.3H531l90,134.82H453.65v72.6H246.24v-72.6H78.86l90-134.82H277.35V225.55H157.78L53.66,381.42l-4.46.21V390l-1,2.59,1,1.46V594.85A35.18,35.18,0,0,0,84.36,630H615.63a35.07,35.07,0,0,0,35-35V394ZM630,595a14.34,14.34,0,0,1-14.32,14.31H84.37a14.34,14.34,0,0,1-14.31-14.32V401.85H225.61v72.6H474.5v-72.6H630.05V595Z"/><path d="M274.36,301.16a10.34,10.34,0,0,0-14.63,14.62l90.33,90.33,90.33-90.33a10.34,10.34,0,0,0-14.62-14.62l-65.23,65.23v-286a10.38,10.38,0,0,0-20.75,0V366.49Z"/></svg>
                  </div>
                </div>
              </div>
            </a>
    </div>
  </div>
  <div class="col">
    <div class="card h-100 justify-content-center">
      <a :href="`${getEnv}?status=completed&qt=${getToken}`" >
            <div class="card-header p-1 flex-nowrap">
              <div class="flex-shrink-1">
                <h2 class="fw-bolder mb-0">{{ dashboardData?.completed_notes }}</h2>
                <p class="card-text text-dark ">Complete Notes</p>
              </div>
              <div class="avatar avatar-sm bg-light-primary p-25 p-lg-50 m-0">
                <div class="avatar-content">
                  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><path d="M158.56,103.6a11.6,11.6,0,0,0-10.15,11.2V355.6a11.2,11.2,0,1,0,22.4,0V126h168v78.4A11.64,11.64,0,0,0,350,215.6h78.4V339c-1.85-.08-3.73-.17-5.6-.17-71,0-128.8,57.79-128.8,128.8a129.94,129.94,0,0,0,3.14,28H170.8v-95.2c.14-6.36-6.11-12.08-12.42-11.38a11.6,11.6,0,0,0-10,11.37V506.8A11.64,11.64,0,0,0,159.6,518H304.15A129,129,0,0,0,422.8,596.4c71,0,128.8-57.8,128.8-128.8,0-61.39-43.21-112.82-100.8-125.65V204.4a11.36,11.36,0,0,0-3.32-8.05l-89.61-89.6a11.26,11.26,0,0,0-7.86-3.14H158.56Zm202.65,38.15,51.45,51.45H361.21Zm61.6,219.45a106.4,106.4,0,1,1-106.4,106.4,106.23,106.23,0,0,1,106.4-106.4ZM472.16,417a11.37,11.37,0,0,0-7.52,4l-60,70-25-21a11.24,11.24,0,1,0-14.34,17.32l33.6,28A11.64,11.64,0,0,0,414.6,514l67.2-78.4A11.2,11.2,0,0,0,472.17,417Z"/></svg>
                </div>
              </div>
            </div>
          </a>
    </div>
  </div>
</div>
        

        <!-- List DataTable -->
        <div class="row">
          <div class="col-12">
            <h4 class="card-title">What will you like to do?</h4>
            <div class="pt-0 me-0">
              <div class="row row row-cols-1 row-cols-md-3">
                <div class="col mt-3 mt-lg-0">
                  <div class="card mb-0 h-100 border-primary bg-transparent rounded-4">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title text-primary">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 22.5H8.75C8.3523 22.4996 7.971 22.3414 7.68978 22.0602C7.40856 21.779 7.2504 21.3977 7.25 21V16.5H8.75V21H20V4.5H13.25V3H20C20.3977 3.0004 20.779 3.15856 21.0602 3.43978C21.3414 3.721 21.4996 4.1023 21.5 4.5V21C21.4996 21.3977 21.3414 21.779 21.0602 22.0602C20.779 22.3414 20.3977 22.4996 20 22.5Z"
                            fill="#003BB3" />
                          <path
                            d="M13.25 7.5H18.5V9H13.25V7.5ZM12.5 11.25H18.5V12.75H12.5V11.25ZM11.75 15H18.5V16.5H11.75V15ZM7.25 14.25C6.25574 14.249 5.30249 13.8536 4.59945 13.1506C3.8964 12.4475 3.50099 11.4943 3.5 10.5V2.25H5V10.5C5 11.0967 5.23705 11.669 5.65901 12.091C6.08097 12.5129 6.65326 12.75 7.25 12.75C7.84674 12.75 8.41903 12.5129 8.84099 12.091C9.26295 11.669 9.5 11.0967 9.5 10.5V3.75C9.5 3.55109 9.42098 3.36032 9.28033 3.21967C9.13968 3.07902 8.94891 3 8.75 3C8.55109 3 8.36032 3.07902 8.21967 3.21967C8.07902 3.36032 8 3.55109 8 3.75V11.25H6.5V3.75C6.5 3.15326 6.73705 2.58097 7.15901 2.15901C7.58097 1.73705 8.15326 1.5 8.75 1.5C9.34674 1.5 9.91903 1.73705 10.341 2.15901C10.7629 2.58097 11 3.15326 11 3.75V10.5C10.999 11.4943 10.6036 12.4475 9.90055 13.1506C9.19751 13.8536 8.24426 14.249 7.25 14.25Z"
                            fill="#003BB3" />
                        </svg>
                        Sign a document
                      </h5>
                      <p class="card-text">
                        Securely sign documents online with legally binding
                        electronic signatures.
                      </p>

                      <div class="mt-auto">
                        <a :href="`${getEnv}/document/upload?qt=${getToken}`"
                          class="text-primary">Sign now
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mt-3 mt-lg-0">
                  <div class="card mb-0 h-100 border-primary bg-transparent rounded-4">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title text-primary">
                        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17 12.5H12.5V10.1735C12.5208 9.14876 12.8214 8.14922 13.3693 7.283C13.9204 6.35729 14.1195 5.26403 13.9303 4.20345C13.741 3.14287 13.176 2.18597 12.3387 1.508C11.7343 1.01527 11.0122 0.688154 10.2432 0.55874C9.47424 0.429327 8.68482 0.502066 7.95243 0.769819C7.22005 1.03757 6.56985 1.49114 6.06566 2.08602C5.56147 2.68089 5.2206 3.39663 5.0765 4.163C4.86981 5.23997 5.06969 6.35532 5.6375 7.2935C6.17587 8.13103 6.4742 9.10019 6.5 10.0955V12.5H2C1.6023 12.5004 1.221 12.6586 0.939779 12.9398C0.65856 13.221 0.500397 13.6023 0.5 14V17C0.500397 17.3977 0.65856 17.779 0.939779 18.0602C1.221 18.3414 1.6023 18.4996 2 18.5V20C2.0004 20.3977 2.15856 20.779 2.43978 21.0602C2.721 21.3414 3.1023 21.4996 3.5 21.5H15.5C15.8977 21.4996 16.279 21.3414 16.5602 21.0602C16.8414 20.779 16.9996 20.3977 17 20V18.5C17.3977 18.4996 17.779 18.3414 18.0602 18.0602C18.3414 17.779 18.4996 17.3977 18.5 17V14C18.4996 13.6023 18.3414 13.221 18.0602 12.9398C17.779 12.6586 17.3977 12.5004 17 12.5ZM6.5525 4.433C6.63283 4.00213 6.80659 3.59409 7.06157 3.23759C7.31654 2.88109 7.64654 2.58479 8.02833 2.36954C8.41013 2.15428 8.83446 2.0253 9.27146 1.99166C9.70846 1.95803 10.1475 2.02056 10.5578 2.17485C10.968 2.32914 11.3395 2.57145 11.646 2.88473C11.9525 3.19801 12.1867 3.57465 12.332 3.98815C12.4773 4.40166 12.5303 4.84198 12.4871 5.27815C12.444 5.71432 12.3058 6.13573 12.0823 6.51275C11.5246 7.42141 11.1721 8.44092 11.0495 9.5H7.955C7.83691 8.44212 7.48435 7.4239 6.923 6.5195C6.54558 5.8938 6.41357 5.15038 6.5525 4.433ZM11 11V12.5H8V11H11ZM15.5 20H3.5V18.5H15.5V20ZM2 17V14H17V17H2Z"
                            fill="#003BB3" />
                        </svg>
                        Get an affidavit
                      </h5>
                      <p class="card-text">
                        Connect with a certified notary for all types of
                        affidavits and jurats.
                      </p>
                      <div class="mt-auto pt-3">
                        <a data-bs-toggle="modal" data-bs-target="#AffidavitModal" href="javascript:void(0)"
                          class="text-primary">Connect now
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mt-3 mt-lg-0">
                  <div class="card mb-0 h-100 border-primary bg-transparent rounded-4">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title text-primary">
                        <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.25 0.75C12.25 0.551088 12.171 0.360322 12.0303 0.21967C11.8897 0.0790175 11.6989 0 11.5 0C11.3011 0 11.1103 0.0790175 10.9697 0.21967C10.829 0.360322 10.75 0.551088 10.75 0.75V2.5H8.77599C8.42468 2.49984 8.08146 2.60542 7.79099 2.803L6.09599 3.957C6.05438 3.98518 6.00524 4.00016 5.95499 4H1.85299C1.65407 4 1.46331 4.07902 1.32266 4.21967C1.182 4.36032 1.10299 4.55109 1.10299 4.75C1.10299 4.94891 1.182 5.13968 1.32266 5.28033C1.46331 5.42098 1.65407 5.5 1.85299 5.5H3.42999L0.0629861 13.18C-0.000612836 13.3299 -0.0145371 13.4962 0.0232539 13.6545C0.0610449 13.8129 0.148564 13.955 0.272986 14.06C0.352986 14.124 0.433986 14.185 0.581986 14.281C0.767986 14.402 1.03399 14.559 1.37399 14.714C2.05399 15.025 3.03599 15.334 4.24999 15.334C5.24201 15.3359 6.22285 15.1245 7.12599 14.714C7.46599 14.559 7.73199 14.402 7.91799 14.281C8.06799 14.184 8.14799 14.123 8.22799 14.058C8.3534 13.9542 8.44163 13.8124 8.47933 13.654C8.51704 13.4956 8.50217 13.3292 8.43699 13.18L5.06899 5.5H5.95499C6.30599 5.5 6.64899 5.394 6.93899 5.197L8.63499 4.043C8.67631 4.01501 8.72507 4.00004 8.77499 4H10.75V18.5H6.26299C6.06407 18.5 5.87331 18.579 5.73266 18.7197C5.592 18.8603 5.51299 19.0511 5.51299 19.25C5.51299 19.4489 5.592 19.6397 5.73266 19.7803C5.87331 19.921 6.06407 20 6.26299 20H16.737C16.9359 20 17.1267 19.921 17.2673 19.7803C17.408 19.6397 17.487 19.4489 17.487 19.25C17.487 19.0511 17.408 18.8603 17.2673 18.7197C17.1267 18.579 16.9359 18.5 16.737 18.5H12.25V4H14.224C14.274 4 14.324 4.015 14.364 4.043L16.061 5.197C16.351 5.394 16.694 5.5 17.045 5.5H17.931L14.563 13.18C14.4956 13.3336 14.4817 13.5053 14.5234 13.6677C14.5651 13.8301 14.66 13.9739 14.793 14.076C14.805 14.085 14.793 14.076 14.795 14.076C14.8942 14.1507 14.9977 14.2195 15.105 14.282C15.29 14.394 15.555 14.538 15.895 14.682C16.7992 15.06 17.77 15.2531 18.75 15.25C19.7304 15.2529 20.7015 15.0594 21.606 14.681C21.944 14.538 22.21 14.394 22.396 14.282C22.5029 14.2189 22.6064 14.1501 22.706 14.076C22.839 13.9739 22.9339 13.8301 22.9756 13.6677C23.0173 13.5053 23.0033 13.3336 22.936 13.18L19.57 5.5H21.148C21.3469 5.5 21.5377 5.42098 21.6783 5.28033C21.819 5.13968 21.898 4.94891 21.898 4.75C21.898 4.55109 21.819 4.36032 21.6783 4.21967C21.5377 4.07902 21.3469 4 21.148 4H17.046C16.9961 3.99996 16.9473 3.98499 16.906 3.957L15.209 2.803C14.9188 2.60561 14.5759 2.50004 14.225 2.5H12.25V0.75ZM1.69299 13.198C2.48009 13.6168 3.35839 13.835 4.24999 13.833C5.14158 13.835 6.01989 13.6168 6.80699 13.198L4.24999 7.368L1.69299 13.198ZM16.203 13.174C16.285 13.214 16.377 13.257 16.478 13.3C17.008 13.523 17.783 13.75 18.75 13.75C19.6316 13.7525 20.5023 13.5556 21.297 13.174L18.75 7.367L16.203 13.174Z"
                            fill="#003BB3" />
                        </svg>

                        Request a Notary Session
                      </h5>
                      <p class="card-text">
                        Connect with a certified notary to notarise transaction
                        documents and certified true copies.
                      </p>
                      <div class="mt-auto">
                        <a data-bs-toggle="modal" data-bs-target="#NotaryRequestModal" href="javascript:void(0)"
                          class="text-primary">Connect now
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                          </svg>
                        </a>
                      </div>
                      <ArrowRight />
                      <Bee32 />
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <DocumentsList />
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div class="modal fade" id="AffidavitModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="AffidavitModalLabel" aria-hidden="true">
    <AffidavitModal />
  </div>

  <!-- modal -->
  <div class="modal fade" id="NotaryRequestModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="NotaryRequestModalLabel" aria-hidden="true">
    <RequestNotaryModal />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import AffidavitModal from "../components/Affidavit/AffidavitModal.vue";
import RequestNotaryModal from "@/components/Notary/RequestNotaryModal.vue";
import DocumentsList from "@/components/Admin/Document/DocumentList.vue";
import { getToken } from "@/Services/helpers";

Request;
export default {
  name: "AdminDashboard",
  components: { AffidavitModal, RequestNotaryModal, DocumentsList },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState("ProfileModule", ["userProfile", "dashboardData"]),
    getToken() {
      const token = getToken();
      return token;
    },
     getEnv(){
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_DOCUMENT_PAGE_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_DOCUMENT_PAGE_STAGING : process.env.VUE_APP_DOCUMENT_PAGE_LIVE

    }
  },
  methods: {
    ...mapActions("ProfileModule", ["getUser"]),
    ...mapActions("AuthModule", ["logout"]),
    ...mapMutations("MenuModule", ["toggleConfigurator", "navbarMinimize"]),
    ...mapActions('TeamsModule', ['getTeams', 'getTeamUsers', 'getSubcriptions']),
    ...mapActions('ProfileModule', ['getUser', 'getPrints', 'getDashboardData', '']),
    ...mapActions('TeamsModule', ['logout']),
    ...mapActions('CompanyModule', ['getCompany']),
    ...mapActions('DocumentModule', ['RequestsList', 'DocumentsList']),
    
    openNav() {
      this.navOpen = !this.navOpen;
    },
    getUrl() {
      const url = process.env.VUE_APP_DOCUMENT_PAGE;
      return url;
    },
   
  },
  mounted: function () {
    this.getUser();
    this.getCompany();
    this.getTeams();
    this.getSubcriptions();


    this.getPrints();
    this.getDashboardData();
    // this.getTransactions();
    this.RequestsList();
    this.DocumentsList();
    this.getUser();
  },

};
</script>

<style scoped>
.feather,
[data-feather] {
  height: 1.5rem;
  width: 1.5rem;
  display: inline-block;
}
.avatar-sm {
    width: 30px !important;
    height: 30px !important;
    font-size: 0.875rem;
}
.cls-1{fill-rule:evenodd;}
</style>
