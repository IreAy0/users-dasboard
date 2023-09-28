<template>
  <div>
    <div class="">
      <!-- {{active_team?.subscription?.plan?.id}} -->
      <!-- {{subcriptions?.subcriptions?.filter(({id}) => id === active_team?.subscription?.plan?.id)}} -->
      <!-- {{subcriptions?.subcriptions}} -->

      <div class="d-flex justify-content-between">
        <p class="font-weight-bold">
          Current Plan Details
        </p>
        <a @click="cancelSubscription()" class="text-danger text-md font-weight-bold">Cancel Subcription</a>
      </div>
      <div class="row gap-2 mx-0">
        <div class="col border flex flex-col justify-content-between p-1 rounded-2">
          <p class="text-black">Plan</p>
          <p class="text-primary mb-0 h5">{{active_team?.subscription?.plan?.name}}</p>
        </div>
        <div class="col border p-1 flex flex-col justify-content-between rounded-2">
          <p class="text-black">Payment Duration</p>
          <p class="text-primary mb-0 h5">{{active_team?.subscription?.plan?.periodicity_type}}</p>
        </div>
        <div class="col border p-1 flex flex-col justify-content-between rounded-2">
          <p class="text-black">Active Users</p>
          <p class="text-primary mb-0 h5">{{active_team?.users?.length}} of {{active_team?.users?.length}}</p>
        </div>
        <div class="col border p-1 flex flex-col justify-content-between rounded-2">
          <p class="text-black">Next Renewal Date</p>
          <p class="text-primary mb-0 h5">{{moment(active_team?.subscription?.plan?.expired_at).format("Do MMM YYYY")}}</p>
        </div>
      </div>
      <div class="row gap-2 mx-0 mt-2">
        <div class="col-4 rounded-2 p-1 border">
          <p class="text-black">Document Limit</p>
          <!-- ?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.remaining -->
          <p class="text-primary mb-0 h5">
            {{active_team?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.remaining}}
          </p>
        </div>
        <div class="col p-1 rounded-2 border">
          <p class="text-black">Payment Owner</p>
          <p class="text-primary mb-0 h5">{{active_team?.users?.find((owner) => owner?.isOwner == true)?.email}}</p>
        </div>
      </div>
      <hr />
      <h2 class="text-black font-weight-bold   mt-3">Plans & Pricing</h2>
       
      <div v-if="!singleData?.id">
        <div class="form-check form-switch gap-1 flex-row my-1 d-flex ps-0">
          <label class="form-check-label">Monthly</label>
          <div class="form-check form-switch">
            <!-- <b-form-checkbox v-model="checked" name="check-button" switch>
              <b>(Checked: {{ checked }})</b>
            </b-form-checkbox> -->
             
            <input v-model="checked" @click="switchPlan()"  class="form-check-input " type="checkbox" id="flexSwitchCheckDefault">
          </div>
          <label class="form-check-label " for="flexSwitchCheckDefault">Annually</label>  
           </div>
           <small class="text-secondary">Get 10% discount when you pay for your plan annually</small>
        <div class="mt-1 mb-2">
          <div class="row">
            <div v-show="plan?.name !== 'Custom'" v-for="plan in subcriptions.subcriptions" :key="plan" @click="getPlanId(plan.id)" class="col-lg-4 col-md-12 p-50">
              <label class="card-label h-100 ">

                <!-- <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" :value="plan.id">Option A</b-form-radio> -->
                <input type="radio" name="plans" v-model="selected" :value="plan?.id" class="card-input-element d-none" id="subscriptions">
                <div :style="{border: single_plan.name  === 'Basic' && selected == plan.id ? '2px solid #003BB3' : single_plan.name == 'Pro' && selected == plan.id ? '2px solid #DB922B' : single_plan.name == 'Business' && selected == plan.id ? '2px solid black' :  '1px solid #EBE9F1 ' }" class="card shadow-none rounded-2 card1 h-100">
                  <div class="card-body pt-2 pb-0 px-0  justify-content-center">
                    <!-- <small class='text-muted'>Individual</small> -->
                   
                    <div class="d-flex pt-1 px-1 mb-1 flex-row justify-content-between align-items-center">
                      <div v-show="plan.id == active_team?.subscription?.plan?.id" title="Current Plan" class="rounded-3 text-center position-absolute px-1 border-none p-25 bg-success  bg-opacity-10 text-success" data-v-735b3461=""> Current Plan</div>
                      <div :style="{color: plan.name  == 'Basic' ? '#003BB3' : plan.name == 'Pro'  ? '#DB922B' : plan.name == 'Business'  ? 'black' : '#EBE9F1'}" :class="[selected == plan.id && single_plan.name == 'Pro' ? 'd-block' : selected == plan.id && single_plan.name == 'Business'? 'd-block' : selected == plan.id && single_plan.name == 'Basic' ? 'd-block' : 'd-none', 'ms-auto' ]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                          <rect width="20" height="20" rx="4" fill="currentColor"/>
                          <path d="M8.66667 12.9332L6 10.2665L6.93333 9.33317L8.66667 11.0665L13.0667 6.6665L14 7.59984L8.66667 12.9332Z" fill="white"/>
                          </svg>
                      </div>
                    </div>
                    <h3 :style="{color: plan.name  == 'Basic' ? '#003BB3' : plan.name == 'Pro'  ? '#DB922B' : plan.name == 'Business'  ? 'black' : '#EBE9F1'}" class=" text-center text-2xl ">
                      <span> 
                        <svg v-if="plan.name  == 'Basic'" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_4165_7908)">
                          <path d="M16.3845 13.9291C18.5789 13.9291 20.3578 12.1502 20.3578 9.95576C20.3578 7.76134 18.5789 5.98242 16.3845 5.98242C14.1901 5.98242 12.4111 7.76134 12.4111 9.95576C12.4111 12.1502 14.1901 13.9291 16.3845 13.9291Z" fill="#003BB3"/>
                          <path d="M16.5979 16.0451C15.437 15.9982 14.2787 16.1867 13.1926 16.5991C12.1065 17.0116 11.115 17.6395 10.2779 18.4451L10.0557 18.694V24.3206C10.0591 24.5039 10.0987 24.6847 10.172 24.8527C10.2454 25.0207 10.3511 25.1726 10.4832 25.2997C10.6153 25.4268 10.7711 25.5267 10.9418 25.5936C11.1124 25.6605 11.2946 25.6931 11.4779 25.6895H21.6912C21.8745 25.6931 22.0567 25.6605 22.2273 25.5936C22.398 25.5267 22.5538 25.4268 22.6859 25.2997C22.818 25.1726 22.9237 25.0207 22.9971 24.8527C23.0704 24.6847 23.11 24.5039 23.1134 24.3206V18.7117L22.9001 18.4451C22.0684 17.637 21.0804 17.0073 19.9967 16.5946C18.913 16.1819 17.7564 15.9949 16.5979 16.0451Z" fill="#003BB3"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_4165_7908">
                          <rect width="32" height="32" fill="white" transform="translate(0.5)"/>
                          </clipPath>
                          </defs>
                          </svg>
                          
                        <svg v-if="plan.name == 'Pro'" width="32" height="32" viewBox="0 0 32 32" fill="none" >
                          <g clip-path="url(#clip0_4088_940)">
                          <path d="M10.6671 14.3468H9.89373C8.8384 14.3087 7.7865 14.4878 6.80329 14.8732C5.82009 15.2585 4.92657 15.8418 4.17818 16.5868L3.96484 16.8357V24.1957H7.59151V20.0179L8.0804 19.4668L8.30262 19.209C9.45989 18.0202 10.9006 17.1453 12.4893 16.6668C11.6939 16.0616 11.0666 15.2629 10.6671 14.3468Z" fill="currentColor"/>
                          <path d="M27.8568 16.5605C27.1084 15.8154 26.2148 15.2321 25.2316 14.8468C24.2484 14.4615 23.1965 14.2823 22.1412 14.3205C21.8175 14.3214 21.4941 14.3392 21.1723 14.3738C20.7653 15.2333 20.1551 15.9807 19.3945 16.5516C21.0905 17.0208 22.6269 17.9426 23.839 19.2182L24.0612 19.4671L24.5412 20.0182V24.2049H28.0434V16.8093L27.8568 16.5605Z" fill="currentColor"/>
                          <path d="M9.8659 12.6135H10.1415C10.0134 11.5141 10.2063 10.4012 10.6969 9.40912C11.1874 8.417 11.9546 7.58806 12.9059 7.02237C12.5611 6.49557 12.0853 6.06736 11.5253 5.77966C10.9652 5.49196 10.3401 5.35464 9.711 5.38115C9.08193 5.40766 8.47054 5.59709 7.93668 5.93089C7.40281 6.26468 6.96479 6.73141 6.66551 7.28535C6.36622 7.8393 6.21592 8.46147 6.22934 9.09095C6.24276 9.72044 6.41942 10.3356 6.74204 10.8763C7.06466 11.417 7.52217 11.8647 8.06977 12.1754C8.61736 12.4862 9.23628 12.6494 9.8659 12.649V12.6135Z" fill="currentColor"/>
                          <path d="M21.7151 11.947C21.7259 12.1513 21.7259 12.3561 21.7151 12.5604C21.8857 12.5874 22.058 12.6023 22.2307 12.6048H22.3995C23.0264 12.5714 23.6339 12.3762 24.163 12.0383C24.692 11.7004 25.1245 11.2313 25.4184 10.6766C25.7123 10.1219 25.8576 9.50053 25.8401 8.87303C25.8226 8.24552 25.6429 7.63325 25.3185 7.0958C24.9941 6.55836 24.5361 6.11407 23.9891 5.80618C23.442 5.49829 22.8246 5.3373 22.1968 5.33888C21.5691 5.34046 20.9524 5.50455 20.4069 5.81519C19.8614 6.12583 19.4057 6.57242 19.084 7.11149C19.8885 7.63676 20.55 8.35354 21.0093 9.1975C21.4685 10.0415 21.711 10.9862 21.7151 11.947Z" fill="currentColor"/>
                          <path d="M15.8835 15.9291C18.0779 15.9291 19.8568 14.1502 19.8568 11.9558C19.8568 9.76134 18.0779 7.98242 15.8835 7.98242C13.6891 7.98242 11.9102 9.76134 11.9102 11.9558C11.9102 14.1502 13.6891 15.9291 15.8835 15.9291Z" fill="currentColor"/>
                          <path d="M16.0969 18.0441C14.9361 17.9972 13.7777 18.1857 12.6916 18.5981C11.6055 19.0106 10.614 19.6385 9.77691 20.4441L9.55469 20.693V26.3197C9.55816 26.5029 9.5977 26.6837 9.67106 26.8517C9.74441 27.0197 9.85015 27.1716 9.98222 27.2987C10.1143 27.4258 10.2701 27.5257 10.4408 27.5926C10.6115 27.6595 10.7936 27.6921 10.9769 27.6885H21.1902C21.3735 27.6921 21.5557 27.6595 21.7264 27.5926C21.897 27.5257 22.0529 27.4258 22.1849 27.2987C22.317 27.1716 22.4227 27.0197 22.4961 26.8517C22.5695 26.6837 22.609 26.5029 22.6125 26.3197V20.7108L22.3991 20.4441C21.5674 19.636 20.5794 19.0063 19.4957 18.5937C18.412 18.181 17.2554 17.994 16.0969 18.0441Z" fill="currentColor"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_4088_940">
                          <rect width="32" height="32" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                          
                          <svg v-if="plan.name == 'Business'" width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.75 20H14.25C13.5625 20 13 19.4375 13 18.75H4.2625V23.75C4.2625 25.125 5.3875 26.25 6.7625 26.25H24.25C25.625 26.25 26.75 25.125 26.75 23.75V18.75H18C18 19.4375 17.4375 20 16.75 20ZM25.5 8.75H20.5C20.5 5.9875 18.2625 3.75 15.5 3.75C12.7375 3.75 10.5 5.9875 10.5 8.75H5.5C4.125 8.75 3 9.875 3 11.25V15C3 16.3875 4.1125 17.5 5.5 17.5H13V16.25C13 15.5625 13.5625 15 14.25 15H16.75C17.4375 15 18 15.5625 18 16.25V17.5H25.5C26.875 17.5 28 16.375 28 15V11.25C28 9.875 26.875 8.75 25.5 8.75ZM13 8.75C13 7.375 14.125 6.25 15.5 6.25C16.875 6.25 18 7.375 18 8.75H12.9875H13Z" fill="black"/>
                            </svg>
                            
                      </span>
                      ToNote {{ plan.name }}
                    </h3>
                   
                    <div class="d-grid my-3">
                      <span class="mx-1  btn btn-outline-dark px-0 py-2 text-3xl font-weight-bolder text-black">{{`${plan.amount == 0 ? 'FREE' : '₦'+plan.amount.toLocaleString()}` }}
                     <span class="text-md text-secondary">Per user</span> 
                      </span>
                      <p v-show="plan.name !== active_team?.subscription?.plan?.name"  @click="addUsersModal(plan)" v-if="plan.name == 'Pro' " style="color:#DB922B" class="text-lg font-weight-bold  text-center mt-2 mb-0 ">
                       {{active_team?.subscription?.plan?.name == 'Business' ? 'Downgrade' : 'Upgrade'}} to Pro Plan
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 18L13.1 16.55L16.65 13H4.5V11H16.65L13.1 7.45L14.5 6L20.5 12L14.5 18Z" fill="#DB922B"/>
                          </svg>
                          
                      </p>
                      <p v-show="plan.name !== active_team?.subscription?.plan?.name || active_team?.subscription?.plan?.trial == true" @click="addUsersModal(plan)" v-if="plan.name == 'Business' " style="color:black" class="text-lg font-weight-bold  text-center mt-2 mb-0 p-50">
                        Upgrade to Business Plan
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 18L13.1 16.55L16.65 13H4.5V11H16.65L13.1 7.45L14.5 6L20.5 12L14.5 18Z" fill="black"/>
                          </svg>
                      </p>
                      <p v-if="plan.name == 'Basic'" style="color:#003BB3" class="text-lg font-weight-bold text-center mt-2 mb-0 ">Default Plan</p>

                    </div>
                  </div>
      
                  
                </div>
              </label>
              
            </div>
            
          </div>    
          </div>
          <!-- {{features?.value?.map((item) => item?.id )}}
          <div :key="feature" v-for="feature in features">
            <p>{{feature?.name}}</p>
          </div>
          {{single_plan}} --> 
          <!-- || active_team?.subscription?.plan -->
          <!-- || active_team?.subscription?.plan?.features -->
          <div class="features" v-show="selected ">
            <p class="font-weight-bold text-lg text-black px-1">Plans include:</p>
            <ul  class="border-0 multiple_columns row ">
              <li v-for="feature in features " :key="feature"  class="list-group-item gap-1 border-0 d-flex  align-items-center col-12 col-md-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="flex-shrink-0">
                  <rect width="20" height="20" rx="10" :fill="single_plan.name  == 'Pro'  ? '#DB922B' : single_plan.name == 'Business' ? 'black'  :  '#003BB3'"/>
                  <g clip-path="url(#clip0_4148_8100)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7217 5.65326C16.7703 5.70172 16.8089 5.75929 16.8352 5.82266C16.8615 5.88604 16.875 5.95398 16.875 6.0226C16.875 6.09122 16.8615 6.15916 16.8352 6.22254C16.8089 6.28592 16.7703 6.34349 16.7217 6.39194L9.41836 13.6953C9.3699 13.7439 9.31234 13.7824 9.24896 13.8087C9.18558 13.835 9.11764 13.8486 9.04902 13.8486C8.9804 13.8486 8.91246 13.835 8.84908 13.8087C8.7857 13.7824 8.72814 13.7439 8.67968 13.6953L5.02799 10.0436C4.93003 9.94568 4.875 9.81282 4.875 9.67429C4.875 9.53576 4.93003 9.40291 5.02799 9.30495C5.12594 9.20699 5.2588 9.15196 5.39733 9.15196C5.53586 9.15196 5.66872 9.20699 5.76667 9.30495L9.04902 12.5883L15.9831 5.65326C16.0315 5.60468 16.0891 5.56613 16.1525 5.53984C16.2158 5.51354 16.2838 5.5 16.3524 5.5C16.421 5.5 16.489 5.51354 16.5523 5.53984C16.6157 5.56613 16.6733 5.60468 16.7217 5.65326Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_4148_8100">
                  <rect width="12" height="8.25" fill="white" transform="translate(4.5 5.5)"/>
                  </clipPath>
                  </defs>
                  </svg>
                  {{ feature?.description }} 
              </li>
            </ul>
            <!-- <div class="my-2 px-1 ">
              <div :style="{'background-color':'#F5F6F7', 'border-radius': '8px','padding': '24px 32px'}">            
                <h5 class="font-weight-bolder text-dark">Notarization Cost:</h5>
                <ul v-if="single_plan?.name !== 'Business' "  class="list-group border-0 bg-transparent">
                  <li class="list-group-item font-weight-bold gap-1 p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                   ₦8,000 per Notary Session
                  </li>
                  <li class="list-group-item font-weight-bold gap-1 p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                   ₦4,000 per Additional Session
                </li>
                <li class="list-group-item gap-1 font-weight-bold p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                ₦4,000 per Affidavit
              </li>
              <li class="list-group-item gap-1 font-weight-bold p-0 border-0 d-flex bg-transparent align-items-center">
                    
              ₦10,000 per Custom Affidavit
            </li>
                </ul>
                <ul v-else  class="list-group border-0 bg-transparent">
                  <li class="list-group-item font-weight-bold gap-1 p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                   ₦6,500 per Notary Session
                  </li>
                  <li class="list-group-item font-weight-bold gap-1 p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                   ₦3,500 per Additional Session
                </li>
                <li class="list-group-item gap-1 font-weight-bold p-0 border-0 bg-transparent d-flex  align-items-center">
                    
                ₦3,500 per Affidavit
              </li>
              <li class="list-group-item gap-1 font-weight-bold p-0 border-0 d-flex bg-transparent align-items-center">
                    
              ₦9,000 per Custom Affidavit
            </li>
                </ul>
              </div>

            </div> -->
            
          </div>
      </div>


      <div v-else>
        <Upgrade :current_plan="singleData" :active_team="active_team" />
      </div>
    </div>
    <div>
      <p>
        For custom requests please send an email to <a target="_blanket" href="mailto:ask@gettonote.com">ask@gettonote.com</a>
      </p>
    </div>
  </div>

  <ModalComp :show="userModal.open" :footer="false" :size="'modal-lg'" @close="userModal.open = false">
    <template #header>
      <h5 class="mb-0">
        Plan Upgrade
      </h5>
    </template>

    <template #body>
      <h4 class="text-primary">
        Invite team members to your plan
      </h4>
      <p>You are about to upgrade to the pro plan, invite the team members and proceed to payment</p>
      <div class="px-1">
        <div class="row">
          <div class="col ">
            <div>
              <div :key="user" v-for="user in active_team.users.filter(user => user.isOwner == true)" class="d-flex justify-content-between pb-50 " >
                <p class="font-weight-bold mb-0">{{user.email}}</p>
                <p class="font-weight-bold mb-0"> ₦{{ selected_subscription.amount }} </p>
                <p class="font-weight-bold mb-0">{{user.isOwner == true ? 'Owner' : user.permission}}</p>
              </div>
              <b-table show-empty :items="active_team.users.filter(user => user.isOwner == false)" :fields="fields" responsive="sm" >
                <template #empty>
                  <h4 class="text-center p-2">No Team Member</h4>
                </template>
              </b-table>
            </div>
          </div>
          <div class="col-md-4  p-2">
            <div class="border text-center p-2 rounded-3">
              <div>
                <p class="mb-0">Team Members</p>
                <h2 class="font-weight-bold text-black">0</h2>
              </div>
              <hr />
              <div>
                <p class="mb-0">Total due</p>
                <h2 class="font-weight-bold text-black">N3,000</h2>
              </div>

            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center ">
          <p @click="openAddUserModal()" class="d-inline-flex text-primary align-items-center"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#003BB3"/>
            </svg>
           <span class="font-weight-bold ml-1">Add team member</span> </p>
            <div>
              <button class="rounded btn btn-primary">
                <span class="align-middle d-inline-block">Proceed to Pay</span>
              </button>
            </div>
          
        </div>
      </div>
    
    
    </template>

    <template #footer>
      <button class="btn btn-sm btn-secondary" @click="deleteLockerDocument(false)">
        cancel
      </button>
      <button :disabled="loading" class="btn btn-sm btn-primary" @click="shareLockerDocument(true)">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        Share
      </button>
    </template>
  </ModalComp>
  <b-modal id="modal-center" centered title="Invite your teammate" hide-footer v-model="addTeamModal">
    <form @submit.prevent="inviteTeamMember" class="auth-register-form mt-2 row" novalidate>
      <div class="mb-2 col-6">
        <label class="form-label" for="first-name">First Name</label>
        <input class="form-control" id="first-name" type="text" name="first_name" placeholder="Thomas"
          aria-describedby="first-name" autofocus="" tabindex="1" v-model="first_name" />
      </div>

      <div class="mb-2 col-6">
        <label class="form-label" for="last-name">Last name</label>
        <input class="form-control" id="last-name" type="text" name="last_name" placeholder="Edison"
          aria-describedby="last-name" autofocus="" tabindex="1" v-model="last_name" />
      </div>

      <div class="mb-2 col-12">
        <label class="form-label" for="register-email">Email</label>
        <input class="form-control" id="register-email" type="text" name="email" v-model="email"
          placeholder="john@example.com" aria-describedby="register-email" tabindex="2" />
      </div>
      <div>
        <b-form-group class="permissions" label="Add Permissions">
          <b-form-radio-group v-model="permission" :options="options" name="radios-stacked" stacked />
        </b-form-group>
      </div>
      <div class="col-12">
        <button class="btn btn-primary w-100" tabindex="5">
          Invite
        </button>
        <img v-if="loggingIn"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </b-modal>
<!-- {{ singleData }} -->
</template>

<script setup>
import { ref, onMounted, onUpdated, computed, defineProps, watch, watchEffect } from "vue";
import { useState, useActions, useGetters } from 'vuex-composition-helpers';
import ModalComp from "@/components/ModalComp.vue";
import { useStore } from 'vuex'
import moment from "moment";
// import { defineProps } from "vue";
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";
import Upgrade from './Upgrade_new'

const props = defineProps({
  active_team: { type: Array, default: [] },
});

const store = useStore()
const $toast = useToast();

// const { subscriptions } = useState('TeamsModule', ['subcriptions']);
const teams  = computed(() => (store.state.TeamsModule.Teams))
const singleData = computed(() => (store.state.TeamsModule.upgradePlan))
const selected = ref() 
const plan_id = ref("")
const single_plan = ref({})
const checked = ref(false)
let features = ref()
const addTeamModal = ref(false)
const activeTeam = ref({})
const selected_subscription = ref({})
const fields  = ref([{
  key: 'email',
  label: 'Team Members',

}, "cost", "action"])

const userModal = ref({open: false, subscription: {}});

const { subcriptions, Teams } = useState({
  subcriptions: "TeamsModule",
  Teams: "TeamsModule/Teams"
});

const {
  getTeams,
  getSingleSubscription,
  getSubcriptions
} = useActions({
  getTeams: "TeamsModule/getTeams",
  getSingleSubscription: "TeamsModule/getSingleSubscription",
  getSubcriptions: "TeamsModule/getSubcriptions"
});
// ?.value?.filter(({id}) => id == props.active_team?.subscription?.plan?.id
// activeFeatures.value = computed(()=> subcriptions?.subscriptions) 
let activeFeatures = ref(subcriptions?.subscriptions)
const getPlanId = (id) => {
single_plan.value =  subcriptions?.value?.subcriptions.find(element => element.id == id )
plan_id.value = id
features.value = single_plan?.value?.benefits
}
// getTeams
const addUsersModal = (id) => {
  getSingleSubscription(id)
  selected_subscription.value = id
};

const paymentSwitch = (value) => {
  getSubcriptions()
}

const openAddUserModal = () => {
  addTeamModal.value = true
  userModal.value.open = false;
}

const switchPlan = () => {
  if(checked.value == false){
    getSubcriptions('12')
  }else {
    getSubcriptions()
  }
}

const cancelSubscription = () => {
  // /api/v1/cancel-subscription
  return ToNote.get(`/cancel-subscription`)
              .then(res => {
      getTeams()
      $toast.success(res.data.data.message, {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
              })
              .catch(err => {
                console.log(err.response, 'err')
                $toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         return err
              })
}
onMounted(() => {
  // features.value = computed(() => props.active_team?.subscription?.plan?.features) 
  // selected.value = computed(() => props.active_team?.subscription?.plan?.id)
  single_plan.value = computed(() => props.active_team?.subscription?.plan) 
  getTeams()
  // selected.value = props.active_team?.subscription?.plan?.id

})


</script>

<style>
label.card-label {
  width: 100%;
  font-size: 1rem;
}

.card-input-element+.card:hover {
  cursor: pointer;
}



@-webkit-keyframes fadeInCheckbox {
  from {
    opacity: 0;
    -webkit-transform: rotateZ(-20deg);
  }
  to {
    opacity: 1;
    -webkit-transform: rotateZ(0deg);
  }
}

@keyframes fadeInCheckbox {
  from {
    opacity: 0;
    transform: rotateZ(-20deg);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg);
  }
}


</style>