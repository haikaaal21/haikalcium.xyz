const screenHeight = window.screen.height;

//Make an init function that cleans the index.html from any appends
function init() {
  $(document).ready(function() {
    $("#header-kal").remove();
    $("#home-page").remove();
    $("#ko-head").remove();
  });
}

function goToMainScreen() {
  $(document).ready(function() {
    var loadingText = $("#loading-div");
    const transitionPage = $.get("./components/transition.html");
    loadingText.show();
    
    $.get('./components/header.html', function(data) {
      transitionPage.done(function(resource) {
        $("body").append(resource);
        
        TweenMax.to({}, 1, {
          delay: 0.2, 
          onComplete: transitionKal
        });
      });
      loadingText.hide();
      $("header").append(data);
    });

    $.get('./routes/home_page.html', function(data) {
      $(data).insertAfter("header");
    });
  
    $.get('./components/ko-head.html', function(data) {
      $("footer").append(data);
    });
  
    $("body").append("<div></div>");
    $("body").addClass("bg-misty-rose z-10 h-screen justify-between flex flex-col overflow-hidden");
    $("footer").addClass("absolute z-0 bottom-0 items-center w-full flex justify-center");
  });
}

goToMainScreen();

function transitionKalBackwards() {
  let transition = new TimelineMax({onComplete: transitionToIndex()}).fromTo(
    "#transition-page",
    1.9,
    { y: -screenHeight },
    { y: 0, ease: Power2.easeIn }
  );
  let transition2 = new TimelineMax({  }).fromTo(
    "#transition-2",
    1.78,
    { y: -screenHeight },
    { y: 0, ease: Power2.easeIn }
  );
  let transition3 = new TimelineMax({  }).fromTo(
    "#transition-3",
    1.6,
    { y: -screenHeight },
    { y: 0, ease: Power2.easeIn }
  );
  transition.play();
  transition2.play();
  transition3.play();
}

function transitionKal() {
  let transition = new TimelineMax({ }).fromTo("#transition-page", 1.5, { y:0 }, { y: -screenHeight ,ease: Power2.easeIn});
  let transition2 = new TimelineMax({}).fromTo('#transition-2',1.65 ,{ y:0 }, { y: -screenHeight ,ease: Power2.easeIn} )
  let transition3 = new TimelineMax({}).fromTo('#transition-3',1.9 ,{ y:0 }, { y: -screenHeight ,ease: Power2.easeIn} )
  transition.play();
  transition2.play();
  transition3.play();
}

function transitionToIndex() {
    transitionKalBackwards();
    init();
    goToMainScreen();
    transitionKal();
}
