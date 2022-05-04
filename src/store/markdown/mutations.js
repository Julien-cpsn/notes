export function setSelectedFile (state, index) {
  if (index !== null && index > -1 && index < state.files.length) {
    state.selectedFileIndex = index
  }
}

export function addFile (state, fileName) {
  state.files.push({ name: fileName, text: '' })
}

export function removeFile (state, index) {
  if (index !== null && typeof index === 'number') {
    state.files.splice(index, 1)
  }
}

export function setEditorText (state, text) {
  state.files[state.selectedFileIndex].text = text
}

export function setFileName (state, name) {
  state.files[state.selectedFileIndex].name = name
}
