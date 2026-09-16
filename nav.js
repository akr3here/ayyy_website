(function () {
  // -------------------------------------------------------------
  // 1. INJECT GLOBAL SUBPAGE BUTTON OPACITY & 110% UNDERLINE STYLES
  // -------------------------------------------------------------
  var style = document.createElement('style');
  style.id = 'subpage-button-styles';
  style.textContent = `
    .side-links-group .side-link {
      position: relative !important;
      display: inline-block !important;
      opacity: 0.35 !important;
      transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1), 
                  transform 0.25s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }

    .side-links-group .side-link::after {
      content: '' !important;
      position: absolute !important;
      left: -5% !important;
      bottom: -4px !important;
      width: 110% !important;
      height: 2px !important;
      background-color: #ffffff !important;
      transform: scaleX(0) !important;
      transform-origin: right !important;
      transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
      pointer-events: none !important;
    }

    .side-links-group .side-link:hover,
    .side-links-group .side-link:focus-visible {
      opacity: 1 !important;
      transform: translateX(-4px) !important;
    }

    .side-links-group .side-link:hover::after,
    .side-links-group .side-link:focus-visible::after {
      transform: scaleX(1) !important;
      transform-origin: left !important;
    }
  `;
  document.head.appendChild(style);

  // -------------------------------------------------------------
  // 2. SMART HISTORY BACK NAVIGATION
  // -------------------------------------------------------------
  function handleBackNavigation(e) {
    e.preventDefault();
    var hasSameOriginReferrer = false;
    if (document.referrer) {
      try {
        var refUrl = new URL(document.referrer);
        hasSameOriginReferrer = (refUrl.origin === window.location.origin);
      } catch (err) {
        hasSameOriginReferrer = false;
      }
    }

    if (window.history.length > 1 && hasSameOriginReferrer) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

  // -------------------------------------------------------------
  // 3. GLOBAL VIDEO CONTROLLER (HOVER TO PLAY / PAUSE ON LEAVE)
  // -------------------------------------------------------------
  function setupHoverVideos() {
    var videos = document.querySelectorAll('video');

    videos.forEach(function (video) {
      // Ensure video is muted so browsers allow auto-play on hover
      video.muted = true;
      video.playsInline = true;
      video.pause();

      // Find the card or container wrapper around the video
      var cardContainer = video.closest('.video-container') || video.parentElement || video;

      // Mouse enter: Play the video
      cardContainer.addEventListener('mouseenter', function () {
        var playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // Handled cleanly if browser blocks quick hover scrubbing
          });
        }
      });

      // Mouse leave: Pause the video
      cardContainer.addEventListener('mouseleave', function () {
        video.pause();
      });
    });
  }

  // Initialize both when DOM is ready
  function init() {
    var backBtn = document.querySelector('.nav-back');
    if (backBtn) {
      backBtn.removeAttribute('onclick');
      backBtn.addEventListener('click', handleBackNavigation);
    }
    setupHoverVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();