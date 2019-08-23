import {
  OPEN_MENU,
  CLOSE_MENU,
  TOGGLE_FILTER
} from './types';

export const openMobileMenu = () => ({ type: OPEN_MENU })
export const closeMobileMenu = () => ({ type: CLOSE_MENU })
export const toggleFilter = () => ({ type: TOGGLE_FILTER })