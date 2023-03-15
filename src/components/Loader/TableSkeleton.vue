<template lang="">
  <div class="text-center bg-white px-3 py-2 card mx-1">
    <div class="my-2">
      <div class="d-flex flex-wrap justify-content-between align-items-center flex-sm">
        <div class="sort">
          <PuSkeleton width="30px" height="20px" />
          <PuSkeleton width="60px" height="20px" class="mx-1" />
          <PuSkeleton width="60px" height="20px" />
        </div>
        <div class="search">
          <PuSkeleton width="50px" height="20px" class="me-1" />
          <PuSkeleton width="170px" height="20px" />
        </div>
      </div>

      <table class="table table-borderless d-none d-md-block" role="grid">
        <tbody>
          <tr>
            <th style="padding-left: 0 !important">
              <PuSkeleton width="20px" height="20px" />
            </th>
            <template>
              <th style="width: 120px">
                <PuSkeleton height="20px" />
              </th>
            </template>
            <th style="width: 400px">
              <PuSkeleton height="20px" />
            </th>
            <th style="width: 220px">
              <PuSkeleton height="20px" />
            </th>
            <th style="width: 220px">
              <PuSkeleton height="20px" />
            </th>
            <th style="width: 300px">
              <PuSkeleton height="20px" />
            </th>
            <th style="width: 120px; padding-right: 0 !important">
              <PuSkeleton height="20px" />
            </th>
          </tr>
        </tbody>
      </table>

      <div class="row mb-1">
        <PuSkeleton height="250px" />
      </div>

      <div class="d-flex flex-wrap justify-content-between align-items-center flex-sm">
        <div class="sort">
          <PuSkeleton width="150px" height="20px" />
        </div>
        <div class="search">
          <PuSkeleton width="250px" height="20px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
<style>


</style>