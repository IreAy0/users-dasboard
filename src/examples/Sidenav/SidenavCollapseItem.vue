<template>
  <li class="nav-item">
    <a
      class="nav-link text-white"
      data-bs-toggle="collapse"
      aria-expanded="false"
      :href="`#${refer}`"
      @click="isExpanded = !isExpanded"
    >
    <!-- {{isExpanded}} -->
    <slot name="miniIcon" class="sidenav-mini-icon" /> 
      <span class="sidenav-normal ps-75">
        {{ text }} <b class="caret"></b
      ></span>
    </a>
    <div :class="isExpanded ? 'collapse show' : 'collapse'">
      <ul  :class="`${subnav_style} nav nav-sm flex-column`">
        <slot name="nav-child-item" />
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "SidenavCollapseItem",
  props: {
    refer: {
      type: String,
      required: true,
    },
    subnav_style:{
      type: String,
      required: false
    },
    // miniIcon: {
    //   type: String,
    //   required: true,
    // },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
};
</script>
