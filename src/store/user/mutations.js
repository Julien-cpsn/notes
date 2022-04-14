export function toggleDarkMode (state) {
  state.darkMode = !state.darkMode
}

export function setThemeColor(state, color) {
  state.themeColor = color
}

export function setAdvancedToolbar(state, advanced) {
  state.advancedToolbar = advanced
}
