// remove right click
document.addEventListener('contextmenu', e => e.preventDefault())

function ctrl(e, keyCode) {
  return e.ctrlKey && e.keyCode === keyCode.charCodeAt(0)
}

function ctrlShift(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0)
}

document.onkeydown = e => {
  if (ctrlShift(e, 'C') || ctrlShift(e, 'I') || ctrlShift(e, 'J') || ctrl(e, 'U')) {
    console.log('Somebody toucha my spaghet!')
    return false
  } else {
    return true
  }
}