<template lang="">
  <div class="text-center bg-white px-3 py-2 card mx-1">
    <div class="my-2">
      <div class="d-flex flex-wrap justify-content-between align-items-center flex-sm">
        <div class="sort d-flex flex-wrap align-items-center">
          <div class="skeleton__item" style="width:60px; height: 20px"  />
          <div style="width:60px; height: 20px" class=" skeleton__item" />
          <div class="skeleton__item" style="width:60px; height: 20px"  />
        </div>
        <div class="search">
          <div class="skeleton__item " style="width:50px; height: 20px"  />
          <div class="skeleton__item" style="width:170px; height: 20px"  />
          
        </div>
      </div>

      <table class="table table-borderless d-none d-md-block" role="grid">
        <tbody>
          <tr>
            <th style="padding-left: 0 !important">
              <div class="skeleton__item" style="width:20px; height: 20px"  />
            </th>
            <template>
              <th style="width: 120px">
                <div class="skeleton__item" style="width:20px; height: 20px"  />
              </th>
            </template>
            <th style="width: 400px">
              <div class="skeleton__item" style="width:20px; height: 20px"  />
            </th>
            <th style="width: 220px">
              <span class="skeleton__item" width="20px" height="20px" />
            </th>
            <th style="width: 220px">
              <div class="skeleton__item" style="height: 20px"  />
              <!-- <PuSkeleton height="20px" /> -->
            </th>
            <th style="width: 300px">
              <div class="skeleton__item" style=" height: 20px"  />

              <!-- <PuSkeleton height="20px" /> -->
            </th>
            <th style="width: 120px; padding-right: 0 !important">
              <div class="skeleton__item" style="height: 20px"  />

              <!-- <PuSkeleton height="20px" /> -->
            </th>
          </tr>
        </tbody>
      </table>

      <div class="row mb-1">
        <div class="skeleton__item" style="height: 250px"  />
        <!-- <PuSkeleton height="250px" /> -->
      </div>

      <div class="d-flex flex-wrap justify-content-between align-items-center flex-sm">
        <div class="sort">
          <div class="skeleton__item" style="width:150px; height: 20px"  />

          <!-- <PuSkeleton width="150px" height="20px" /> -->
        </div>
        <div class="search">
          <div class="skeleton__item" style="width:250px; height: 20px"  />
          <!-- <PuSkeleton width="250px" height="20px" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
<style>
.skeleton__wrapper {
  display: flex;
  justify-content: space-between;
}
.skeleton__shimmer {
  height: 42px;
  min-width: 250px;
  background: linear-gradient(to right, #eff1f3 4%, #f8f9fb 25%, #eff1f3 36%);
  background-size: 1000px 100%;
  animation: shimmer 3s infinite linear;
  margin-bottom: 1rem;
}
.skeleton__shimmer--sm {
  min-width: 60px;
  margin-left: 1rem;
}
.skeleton__shimmer--lg {
  max-width: 400px;
  height: 24px;
}
.skeleton__shimmer--slim {
  height: 24px;
  max-width: 350px;
}
.skeleton__head {
  background: linear-gradient(to right, #eff1f3 4%, #f8f9fb 25%, #eff1f3 36%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  margin-bottom: 2rem;
}
.skeleton__row {
  border-bottom: 1px solid #f8f9fb;
  display: flex;
  justify-content: stretch;
  align-items: center;
  margin-bottom: 12px;
}
.skeleton__item {
  background: linear-gradient(to right, #eeeeee 4%, #f8f9fb 25%, #eff1f3 36%);
  background-size: 1000px 100%;
  flex-grow: 1;
  animation: shimmer 2s infinite linear;
}
.skeleton__item:not(:last-of-type) {
  margin-right: 10px;
}
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
 }
  100% {
    background-position: 1000px 0;
 }
}

</style>