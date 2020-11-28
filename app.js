document.addEventListener("DOMContentLoaded", () => {
  // Lazy Loading
  (function () {
    const images = document.querySelectorAll("img");
    const imgOptions = {
      threshold: 1,
    };
    const imgObserver = new IntersectionObserver((entries, imageObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          preloadImage(entry.target);
          imgObserver.unobserve(entry.target);
        }
      });
    }, imgOptions);

    images.forEach(image => {
      imgObserver.observe(image);
    });

    function preloadImage(img) {
      const src = img.getAttribute("img");
      if (!src) {
        return;
      }
      img.src = src;
    }
  })();

  // Video Player
  (function () {
    const players = document.querySelectorAll(".overlay__video-player");
    players.forEach(player => {
      const video = player.querySelector(".overlay__video-player__video");
      const progress = player.querySelector(".progress");
      const progressBar = progress.querySelector(".progress__filled");
      const toggle = player.querySelector(".toggle");

      toggle.addEventListener("click", togglePlay);

      video.addEventListener("click", togglePlay);
      video.addEventListener("play", updateButton);
      video.addEventListener("pause", updateButton);

      video.addEventListener("timeupdate", handleProgress);
      video.addEventListener("mousemove", handleProgress);

      let mousedown = false;
      progress.addEventListener("click", scrub);
      progress.addEventListener("mousemove", e => mousedown && scrub(e));
      progress.addEventListener("mousedown", () => (mousedown = true));
      progress.addEventListener("mouseup", () => (mousedown = false));

      function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
      }

      function togglePlay() {
        const method = video.paused ? "play" : "pause";
        video[method]();
      }

      function updateButton() {
        const icon = this.paused ? "►" : "❚❚";
        toggle.textContent = icon;
      }

      function handleProgress() {
        //console.log(this.value);
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
      }
    });
  })();

  (function () {
    // Overlay On
    const titleTriggers = document.querySelectorAll(
      ".portfolio__card__info__title"
    );
    // Overlay Off
    const closeTriggers = document.querySelectorAll(".overlay_close");

    titleTriggers.forEach(titleTrigger => {
      titleTrigger.addEventListener("click", showOverlay);
    });

    closeTriggers.forEach(closeTrigger => {
      closeTrigger.addEventListener("click", closeOverlay);
    });

    function showOverlay(e) {
      const overlayId = this.href.split("#")[1];
      const overlayLayer = document.getElementById(overlayId);
      overlayLayer.style.display = "block";
    }

    function closeOverlay(e) {
      const overlayLayer = this.parentElement.parentElement;
      overlayLayer.style.display = "none";
    }
  })();
});
