$(document).ready(function () {
  var owl = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    onInitialized: startProgressBar,
    onTranslate: resetProgressBar,
    onTranslated: startProgressBar,
  });

  var isPlaying = true;

  function startProgressBar() {
    $(".progress-bar").css({
      strokeDashoffset: 0,
      transition: "stroke-dashoffset 5000ms linear",
    });
  }

  function resetProgressBar() {
    $(".progress-bar").css({
      strokeDashoffset: 100,
      transition: "stroke-dashoffset 0s",
    });
  }

  // Custom Navigation Events
  $(".custom_indicators div").click(function () {
    var index = $(this).data("slide");
    owl.trigger("to.owl.carousel", [index, 300]);
    $(".custom_indicators div").removeClass("active");
    $(this).addClass("active");
  });

  owl.on("changed.owl.carousel", function (event) {
    var currentIndex =
      event.item.index - event.relatedTarget._clones.length / 2;
    var totalItems = event.item.count;
    var realIndex = ((currentIndex % totalItems) + totalItems) % totalItems;
    $(".custom_indicators div").removeClass("active");
    $('.custom_indicators div[data-slide="' + realIndex + '"]').addClass(
      "active"
    );
  });

  $(".pause-play-btn").click(function () {
    if (isPlaying) {
      owl.trigger("stop.owl.autoplay");
      $(this).removeClass("fa-pause").addClass("fa-play");
    } else {
      owl.trigger("play.owl.autoplay");
      $(this).removeClass("fa-play").addClass("fa-pause");
    }
    isPlaying = !isPlaying;
  });
});
