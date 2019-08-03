export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const openMobileMenu = () => ({ type: OPEN_MENU })
export const closeMobileMenu = () => ({ type: CLOSE_MENU })

export const toggleFilter = () => ({ type: TOGGLE_FILTER })