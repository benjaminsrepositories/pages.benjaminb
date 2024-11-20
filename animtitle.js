function animateTitle(text, delay) {
    let direction = 'forward';
    let index = 0;
    
    function updateTitle() {
      if (direction === 'forward') {
        index++;
        if (index > text.length) {
          direction = 'backward';
          index = text.length;
        }
      } else {
        index--;
        if (index < 0) {
          direction = 'forward';
          index = 0;
        }
      }
      
      document.title = text.substring(0, index);
      setTimeout(updateTitle, delay);
    }
    
    updateTitle();
  }

  let animationInterval;

  function startAnimation() {
    animateTitle("Benjamin - Portfolio", 200);
  }
  
  function stopAnimation() {
    clearTimeout(animationInterval);
    document.title = "Benjamin - Portfolio"; // Reset to full title
  }
  
  // Start animation when tab loses focus
  window.onblur = stopAnimation;
  
  // Stop animation when tab regains focus
  window.onfocus = startAnimation;