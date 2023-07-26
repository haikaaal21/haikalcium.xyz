const screenHeight = window.screen.height;
gsap.registerPlugin(TextPlugin);

let transDirectory, transDirectory2, transDirectory3, transDirectory4, content, directText, header;

function refresh(listToRemove) {
    for(i = 0; i < listToRemove.length; i++) {
      $(listToRemove[i]).remove();
    } 
    $("body").removeClass();
    $("footer").removeClass();
}

function init() {
  $(document).ready(function() {
    var loadingText = $("#loading-div");
    const transitionPage = $.get("./components/transition.html");
    loadingText.show();
    
    $.get('./components/header.html', function(data) {
      transitionPage.done(function(resource) {
        if($("#transition-page").length <= 0) {
          $("body").append(resource);
        }
        transitionKal();
      });
      loadingText.hide();
      if($("#header-cover").length <= 0) {
        $("header").append(data);
      }
      $("#header-p").addClass("hover:text-indian-red");
      $("#header-p").removeClass("hover:text-dessert-yellow");
    });
    if(header != null) {
      header.reverse();
    }
    if(directText != null) {
      directText.reverse();
    }

      $(document).off("click", "#directories-button");
      $(document).on("click", "#directories-button", function() {
        openDirectoriesFromIndex();
      });


    $.get('./routes/home_page.html', function(data) {
      $(data).insertAfter("header");
    });
  
    $.get('./components/ko-head.html', function(data) {
      $("footer").append(data);
    });
    $("body").addClass("bg-misty-rose z-10 h-screen justify-between flex flex-col overflow-hidden ");
    $("footer").addClass("absolute z-0 bottom-0 items-center w-full flex justify-center");
  });
}

init();

function goToMainScreenFromDirectory() {
  listToRemove = [ "#home-page", "#ko-head", "#crutch"];
  refresh(listToRemove);
    $.get('./routes/home_page.html', function(data) {
      $(data).insertAfter("header");
    });
    $.get('./components/ko-head.html', function(data) {
      $("footer").append(data);
    });
    $("body").addClass("bg-misty-rose z-10 h-screen justify-between flex flex-col overflow-hidden ");
    $("footer").addClass("absolute z-0 bottom-0 items-center w-full flex justify-center");
    pullBack();
}

function transitionKalBackwards(listToRemove) {
  let transition = new TimelineMax({onComplete: function() {
    refresh(listToRemove);
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
  const listToRemove = [ "#home-page", "#ko-head", "#crutch", "#directory-page"];
  transitionKalBackwards(listToRemove);
}

function openDirectoriesFromIndex() {
  $.get("./routes/directory_page.html", function(data) {
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
  let $text;
  $(whatToHover).hover(
    function() {
      $.get("./components/arrow.html", function(arrow) {
        if($(whatToHover).find("#arrow").length <= 0) {
        $(whatToHover).prepend(arrow);
        }
        $addedArrow = $(whatToHover).find("#arrow"); 
        $paragraph = $(whatToHover).find("li"); 
        animationTimeline = new TimelineMax({});
        console.log($text);
        animationTimeline.fromTo($paragraph, 0.5, { x: 0 }, {x: 25, ease: Power2.easeOut }).fromTo($addedArrow, 0.5, { x: 0, opacity:0 }, { x: 20, opacity:1, ease: Power2.easeOut }, "-=0.2");
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
   transDirectory = new TimelineMax({ }).fromTo("#d1", 0.8, { y:-screenHeight }, { y:0  ,ease:"power4.out"});
     transDirectory2 = new TimelineMax({ }).fromTo("#d2", 1.2, { y:screenHeight }, { y:0  ,ease:"power4.out"});
     transDirectory3 = new TimelineMax({ }).fromTo("#d3", 1.7, { y:-screenHeight }, { y:0  ,ease:"power4.out"});
     transDirectory4 = new TimelineMax({}).fromTo("#d4", 2, { y:screenHeight }, { y:0  ,ease:"power4.out"}, );
     content = new TimelineMax({ }).fromTo("#content", 0.8, { opacity:0, y:120 }, { opacity:1, y:0 ,ease:"power4.easeOut"});
     directText = new TimelineMax({ }).fromTo("#directories-button", 0.8, {text:"Directories"}, { text:"Close[X]",ease:"power4.easeIn"});
     header = new TimelineMax({ }).fromTo("#header-kal", 0.8, {}, {color: "white" ,ease:"power4.easeOut"});
    $("#header-p").removeClass("hover:text-indian-red");
    $("#header-p").addClass("hover:text-dessert-yellow");
    $(selectedIndex).addClass("font-times-new-roman");
    $("#directories-button").removeAttr("onclick");
    $.get("./components/you-are-here.html", function(data) {
      let dataToAppend = $(data);
      $(dataToAppend).insertBefore(selectedIndex);
    });
    $(document).off("click", "#directories-button");
    $(document).on("click", "#directories-button", function() {
      pullBack();
    });
}

function pullBack() {
  transDirectory.reverse();
  transDirectory2.reverse();
  transDirectory3.reverse();
  transDirectory4.reverse().eventCallback("onReverseComplete", function () {
    $("#directory-page").remove();
  });
  content.reverse();
  directText.reverse();
  header.reverse();
  $("#header-p").removeClass("hover:text-dessert-yellow");
  $("#header-p").addClass("hover:text-indian-red");
  $(document).on("click", "#directories-button", function () {
    openDirectoriesFromIndex();
  });
}


function navigateToAboutMe() {
  listToRemove = [ "#home-page", "#ko-head", "#crutch"];
  refresh(listToRemove);
    $.get('./routes/about-me.html', function(data) {
      pullBack();
      $("body").addClass("bg-misty-rose z-10 h-screen flex flex-col ");
      $(data).insertBefore("footer");
      $.get('./components/container.html' , function(container) {
        $(container).insertAfter("#education");
        $("#contTitle").text(education.title);
        $("#lefty").text(education.lefty);
        $("#righty").text(education.righty);
        $("#content").text(education.content);
      });
      $.get('./components/formal-footer.html', function(data) {
        $("footer").append(data);
      });
    });
}

function openDirectoriesFromAboutMe() {
  
  $.get("./routes/directory_page.html", function(data) {
    $("body").append(data);
    directoriesTransition("#about");
    const whatToHovers = ["#home", "#about", "#archive", "#contact"];
    for (let i = 0; i < whatToHovers.length; i++) {
      hoverOnStuff(whatToHovers[i]);
    }
  });
  console.log("open directories");
}

const education = {
  title : "Universiti Utara Malaysia",
  lefty : "INFORMATION TECHNOLOGY",
  righty : "2021 - 2024",
  content : "Lorem something-something",
  tooltip: "Universiti Utara Malaysia is a public university in Malaysia. It was established on 16 February 1984."
}
