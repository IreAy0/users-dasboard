<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
      <div class="content-header row d-none">
        <div class="content-header-left col-md-9 col-12 mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h2 class="content-header-title float-start mb-0">insert page</h2>
              <div class="breadcrumb-wrapper">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="dashboard/">page title</a>
                  </li>
                  <li class="breadcrumb-item active">insert page</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
          <div class="mb-1 breadcrumb-right">
            <div class="dropdown">
              <button class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i data-feather="grid"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="app-todo.html"><i class="me-1" data-feather="check-square"></i><span
                    class="align-middle">Todo</span></a><a class="dropdown-item" href="app-chat.html"><i class="me-1"
                    data-feather="message-square"></i><span class="align-middle">Chat</span></a><a class="dropdown-item"
                  href="app-email.html"><i class="me-1" data-feather="mail"></i><span
                    class="align-middle">Email</span></a><a class="dropdown-item" href="app-calendar.html"><i
                    class="me-1" data-feather="calendar"></i><span class="align-middle">Calendar</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-body">
        <div class="row" :class="{ ' hidden': userProfile?.national_verification === true }">
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

        <div class="row analytic">
          <div class="col-lg-3 col-sm-6 col-6">
            <router-link to="/admin/requests" class="card">
              <div class="card-header">
                <div>
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.scheduledRequests }}</h2>
                  <p class="card-text text-dark">Requests</p>
                </div>
                <div class="avatar  bg-light-warning p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                      stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-lg-3 col-sm-6 col-6">
            <a :href="`${getEnv}?status=received?qt=${getToken}`" class="card">
              <div class="card-header">
                <div>
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.viewed }}</h2>
                  <p class="card-text text-dark">Received</p>
                </div>
                <div class="avatar bg-light-primary p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                      stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-3 col-sm-6 col-6">
            <a :href="`${getEnv}?status=sent?qt=${getToken}`" class="card">
              <div class="card-header">
                <div>
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.completed }}</h2>
                  <p class="card-text text-dark">Signed</p>
                </div>
                <div class="avatar bg-light-secondary p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-check-square">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-3 col-sm-6 col-6">
            <div class="card">
              <div class="card-header">
                <div>
                  <h2 class="fw-bolder mb-0">{{ dashboardData?.notarised }}</h2>
                  <p class="card-text text-dark">Notarised</p>
                </div>
                <div class="avatar bg-light-success p-25 p-lg-50 m-0">
                  <div class="avatar-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-file-text">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
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

  <!-- <ModalComp :show="showModal" :size="'modal-lg'" :footer="false" @close="clearModal">
    <template #header>

    </template>
    <template #body>
        
      </template>
  </ModalComp> -->
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
import { mapState, mapActions } from "vuex";
import AffidavitModal from "../Affidavit/AffidavitModal.vue";
import RequestNotaryModal from "@/components/Notary/RequestNotaryModal.vue";
import DocumentsList from "@/components/Admin/Document/DocumentList.vue";
import { getToken } from "@/Services/helpers";

Request;
export default {
  name: "AdminDashboard",
  components: { AffidavitModal, RequestNotaryModal, DocumentsList},
  data(){
  return {
    showModal: false
  }  
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
    close(){
      console.log('logout')
    },
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
</style>
