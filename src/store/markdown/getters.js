export function isFileNameValid (state) {
  return state.fileName.trim() !== ''
}

export function fileNameEncoded (state) {
  return state.fileName.trim().replace(/[/\\?%*:|"<>]/g, '-')
}
