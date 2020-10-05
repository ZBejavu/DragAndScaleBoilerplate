//Your code here
const main = document.getElementById('main');
const header = document.getElementById('header');
const playground = document.getElementById('playground');
const playgroundRect = playground.getBoundingClientRect();
console.log(header)
dragElement(main)


function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    
    if (elmnt.offsetTop < playgroundRect.top) {
        elmnt.style.top = playgroundRect.top + "px";
      }
      if (elmnt.offsetTop + elmnt.offsetHeight > playgroundRect.bottom) {
        elmnt.style.top = playgroundRect.bottom - elmnt.offsetHeight + "px";
      }
      if (elmnt.offsetLeft < playgroundRect.left) {
        elmnt.style.left = playgroundRect.left + "px";
      }
      if (elmnt.offsetLeft + elmnt.offsetWidth > playgroundRect.right) {
        elmnt.style.left = playgroundRect.right - elmnt.offsetWidth + "px";
      }
  
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function makeResizableDiv(div) {
    const resizers = document.querySelectorAll('#main' + ' .resizer');
    const resizers2 = document.querySelectorAll('#main' + ' .resizer2');
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length + resizers2.length; i++) {
        let currentResizer;
        if(i > resizers.length - 1){
            currentResizer =resizers2[i- (resizers.length)];
        }else{
            currentResizer = resizers[i];
        }
        currentResizer.addEventListener('mousedown', function(e) {
          e.preventDefault()
          original_width = parseFloat(getComputedStyle(main, null).getPropertyValue('width').replace('px', ''));
          original_height = parseFloat(getComputedStyle(main, null).getPropertyValue('height').replace('px', ''));
          original_x = main.getBoundingClientRect().left;
          original_y = main.getBoundingClientRect().top;
          original_mouse_x = e.pageX;
          original_mouse_y = e.pageY;
          window.addEventListener('mousemove', resize)
          window.addEventListener('mouseup', stopResize)
          
      })
      
      function resize(e) {
        const playgroundRect = playground.getBoundingClientRect();
        //Number(main.style.top.slice(0,main.style.top.length-2))

        //console.log(main , playgroundRect);

        if (currentResizer.classList.contains('bottom-right')) {
            const width = original_width + (e.pageX - original_mouse_x);
            const height = original_height + (e.pageY - original_mouse_y);
            if (width > minimum_size) {
              main.style.width = width + 'px'
            }
            if (height > minimum_size) {
              main.style.height = height + 'px'
            }
          }
          else if (currentResizer.classList.contains('bottom-left')) {
            const height = original_height + (e.pageY - original_mouse_y)
            const width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
              main.style.height = height + 'px'
            }
            if (width > minimum_size) {
              main.style.width = width + 'px'
              main.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
          }
          else if (currentResizer.classList.contains('top-right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              main.style.width = width + 'px'
            }
            if (height > minimum_size) {
              main.style.height = height + 'px'
              main.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if(currentResizer.classList.contains('top-left')) {
            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              main.style.width = width + 'px'
              main.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
            if (height > minimum_size) {
              main.style.height = height + 'px'
              main.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if(currentResizer.classList.contains('left')) {
            const width = original_width - (e.pageX - original_mouse_x)
            if (width > minimum_size) {
              main.style.width = width + 'px'
              main.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
          }
          else if(currentResizer.classList.contains('top')) {
            const height = original_height - (e.pageY - original_mouse_y)
            if (height > minimum_size) {
              main.style.height = height + 'px'
              main.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }
          else if (currentResizer.classList.contains('right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            if (width > minimum_size) {
              main.style.width = width + 'px'
            }
          }
          else if (currentResizer.classList.contains('bottom')) {
            const height = original_height + (e.pageY - original_mouse_y)
            if (height > minimum_size) {
              main.style.height = height + 'px'
            }
          }

          if (main.offsetTop  < playgroundRect.top) {
             main.style.top = Math.ceil(playgroundRect.top) + "px";
             stopResize()
          }
          if (main.offsetTop + main.offsetHeight > playgroundRect.bottom) {
             main.style.top = Math.floor(playgroundRect.bottom - main.offsetHeight) + "px";
             stopResize()
          }
          if (main.offsetLeft < playgroundRect.left) {
             main.style.left = Math.ceil(playgroundRect.left) + "px";
             stopResize()
          }
          if (main.offsetLeft + main.offsetWidth > playgroundRect.right) {
             main.style.left = Math.floor(playgroundRect.right - main.offsetWidth) + "px";
             stopResize()
          }
          
      }
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
  
  makeResizableDiv()

