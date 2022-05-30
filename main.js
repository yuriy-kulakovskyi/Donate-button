let monoNum = '1111 4444 3333 2222';
let privatNum = '2222 3333 1111 4444';

let contentVal = `Monobank:
${monoNum};

PrivatBank:
${privatNum}`;

tippy('#donate-button', {
  content: contentVal,
});

tippy('#donate-button', {
  trigger: 'click',
  content: 'Copied'
});

let keys = {37: 1, 38: 1, 39: 1, 40: 1};

let preventDefault = (e) => {
  e.preventDefault();
}

let preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: () => { supportsPassive = true; } 
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
let disableScroll = () => {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
let enableScroll = () => {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


$("#donate-button").click(() => {
  const textarea = document.createElement("textarea");
  
  textarea.value = contentVal;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  disableScroll();
});

$("#close-btn").click(() => {
  enableScroll();
});

if (window.navigator.userAgentData.mobile) {
  $("#qrcode").css("display", 'none');
}