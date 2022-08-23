
const state = () => ({
  hideConfigButton: false,
  isPinned: true,
  showConfig: false,
  sidebarType: "bg-white",
  isRTL: false,
  color: "primary",
  isNavFixed: false,
  isAbsolute: false,
  showNavs: true,
  showSidenav: true,
  showNavbar: true,
  showFooter: true,
  showMain: true,
  isDarkMode: false,
  navbarFixed:
    "position-sticky blur shadow-blur left-auto top-1  px-0 mx-4",
  absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
});

const mutations = {

  toggleConfigurator(state) {
    state.showConfig = !state.showConfig;
  },
  navbarMinimize(state) {
    const sidenav_show = document.querySelector(".g-sidenav-show");

    if (sidenav_show.classList.contains("g-sidenav-pinned")) {
      sidenav_show.classList.remove("g-sidenav-pinned");
      state.isPinned = true;
    } else {
      sidenav_show.classList.add("g-sidenav-pinned");
      state.isPinned = false;
      console.log(state.isPinned);
    }
  },
  navbarFixed(state) {
    if (state.isNavFixed === false) {
      state.isNavFixed = true;
    } else {
      state.isNavFixed = false;
    }
  },
  toggleEveryDisplay(state) {
    state.showNavbar = !state.showNavbar;
    state.showSidenav = !state.showSidenav;
    state.showFooter = !state.showFooter;
  },
  toggleHideConfig(state) {
    state.hideConfigButton = !state.hideConfigButton;
  },
  color(state, payload) {
    state.color = payload;
  },
}

const getters = {

};

const actions = {
  setColor({ commit }, payload) {
    commit("color", payload);
  },
}

export const MenuModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
