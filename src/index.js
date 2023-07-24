const screenHeight = window.screen.height;
gsap.registerPlugin(TextPlugin);

function init(listToRemove) {
  $(document).ready(function() {
    $.each(listToRemove, function(index, whatToRemove) {
      $(whatToRemove).remove();
    });
    $("body").removeClass();
    $("footer").removeClass();
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

    $(document).ready(function() {
      $(document).off("click", "#directories-button");
      $(document).on("click", "#directories-button", function() {
        openDirectoriesFromIndex();
      });
    })

    $.get('./routes/home_page.html', function(data) {
      $(data).insertAfter("header");
    });
  
    $.get('./components/ko-head.html', function(data) {
      $("footer").append(data);
    });
    $("body").addClass("bg-misty-rose z-10 h-screen justify-between flex flex-col overflow-hidden");
    $("footer").addClass("absolute z-0 bottom-0 items-center w-full flex justify-center");
  });
}

goToMainScreen();

function transitionKalBackwards(listToRemove) {
  let transition = new TimelineMax({onComplete: function() {
    init(listToRemove);
    goToMainScreen();
  }}).fromTo(
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
  const listToRemove = ["#header-kal", "#home-page", "#ko-head", "#crutch", "#directory-page"];
  transitionKalBackwards(listToRemove);
}

function openDirectoriesFromIndex() {
  const listToRemove = ["#header-kal", "#home-page", "#ko-head", "#crutch"];
  $.get("./routes/directory_page.html", function(data) {
    $("header").removeClass("z-20");
    $("header").addClass("z-20");
    $("body").append(data);
    directoriesTransition("#home");
    const whatToHovers = ["#home", "#about", "#archive", "#contact"];
    whatToHovers.forEach(whatToHover => {
      hoverOnStuff(whatToHover);
    });
  });
  console.log("open directories");
}
 
function hoverOnStuff(whatToHover) {
  let animationTimeline;
  let $addedArrow;
  $(whatToHover).hover(
    function() {
      $.get("./components/arrow.html", function(arrow) {
        if($(whatToHover).find("#arrow").length <= 0) {
        $(whatToHover).prepend(arrow);
        }
        $addedArrow = $(whatToHover).find("#arrow"); 
        $paragraph = $(whatToHover).find("li"); 
        animationTimeline = new TimelineMax({});
        animationTimeline.fromTo($paragraph, 0.5, { x: 0 }, { x: 25, ease: Power2.easeOut }).fromTo($addedArrow, 0.5, { x: 0, opacity:0 }, { x: 20, opacity:1, ease: Power2.easeOut }, "-=0.2");
      });
    },
    function() {
        animationTimeline.reverse();
        animationTimeline.eventCallback("onReverseComplete", function() {
          $($addedArrow).remove();
        });
    }
  );
  
}

function directoriesTransition(selectedIndex) {
  let transDirectory = new TimelineMax({ }).fromTo("#d1", 0.8, { y:-screenHeight }, { y:0  ,ease:"power4.out"});
    let transDirectory2 = new TimelineMax({ }).fromTo("#d2", 1.2, { y:screenHeight }, { y:0  ,ease:"power4.out"});
    let transDirectory3 = new TimelineMax({ }).fromTo("#d3", 1.7, { y:-screenHeight }, { y:0  ,ease:"power4.out"});
    let transDirectory4 = new TimelineMax({ }).fromTo("#d4", 2, { y:screenHeight }, { y:0  ,ease:"power4.out"}, );
    let content = new TimelineMax({ }).fromTo("#content", 0.8, { opacity:0, y:120 }, { opacity:1, y:0 ,ease:"power4.easeOut"});
    let directText = new TimelineMax({ }).fromTo("#directories-button", 0.8, {text:"Directories"}, { text:"Close[X]",ease:"power4.easeIn"});
    let header = new TimelineMax({ }).fromTo("#header-kal", 0.8, {}, {color: "white" ,ease:"power4.easeOut"});
    $("#header-p").removeClass("hover:text-indian-red");
    $("#header-p").addClass("hover:text-dessert-yellow");
    $(selectedIndex).addClass("font-times-new-roman");
    $("#directories-button").removeAttr("onclick");
    $.get("./components/you-are-here.html", function(data) {
      let dataToAppend = $(data);
      $(dataToAppend).insertBefore(selectedIndex);
    });
    $(document).ready(function() {
      $(document).off("click", "#directories-button");
      $(document).on("click", "#directories-button", function() {
        transDirectory.reverse();
      transDirectory2.reverse();
      transDirectory3.reverse();
      transDirectory4.reverse();
      content.reverse();
      directText.reverse();
      header.reverse();
      $("#header-p").removeClass("hover:text-dessert-yellow");
    $("#header-p").addClass("hover:text-indian-red");
      $(document).on("click", "#directories-button", function() {
        openDirectoriesFromIndex();
        $("#directory-page").remove();
      });
      });
    })
}

