import { SHOW_SIDEBAR, HIDE_SIDEBAR, TOGGLE_SIDEBAR } from "../actions/types";

const initialStore = {
  showSidebar: true,
};

const SidebarReducer = (state = initialStore, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return { ...state, showSidebar: true };
    case HIDE_SIDEBAR:
      return { ...state, showSidebar: false };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    default:
      return { ...state };
  }
};

export default SidebarReducer;
