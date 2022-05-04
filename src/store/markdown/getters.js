export function selectedFile(state) {
  return state.files[state.selectedFileIndex]
}

export const getFile = (state) => (index) => {
  return state.files[index]
}

export function isFileNameValid (state) {
  return state.files[state.selectedFileIndex].name.trim() !== ''
}

export function fileNameEncoded (state) {
  return state.files[state.selectedFileIndex].name.trim().replace(/[/\\?%*:|"<>]/g, '-')
}
