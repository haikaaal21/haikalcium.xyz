const screenHeight = window.screen.height;
let transition, transition2, transition3;
let transDirectory, transDirectory2, transDirectory3, transDirectory4, content, directText, header;
let currentPage;
let directoryOpened = true;
gsap.registerPlugin(TextPlugin);

/**
 * Initializes the website
 */
function init() {
  currentPage = "#home";
  $(document).ready(function () {
    $("#loading-div").hide();
    $.get('./components/transition.html', function (transition) {
      $(transition).appendTo("body");
      initializeTransition(false);
    });
    $.get('./components/header.html', function (header) {
      $(header).appendTo("header");
      $("header").addClass("fixed top-0");
      buildMainPage();
      buildDirectoriesPage();
      $('#header').click(function() {
        goToHome();
      });
      $('#directories-button').click(function() {
        console.log(directoryOpened);
        toggleDirectory();
      });
    })
  });
}
init();

function reset(listToRemove) {
  for(i = 0; i < listToRemove.length; i++) {
    $(listToRemove[i]).remove();
  }
  $("body").removeClass();
  $("footer").removeClass();
}

/**
 * Routers
 * This method routes the website to the page from buttonListeners
 */

function routeToMainPage() {
  currentPage = "#home";
  const listToRemove = ['#body', '#footer'];
  reset(listToRemove);
  buildMainPage();
  toggleDirectory();
}

function routeToArchive() {
  currentPage = "#archive";
  const listToRemove = ['#body', '#footer'];
  reset(listToRemove);
  buildArchive();
  toggleDirectory();
}

function routeToAboutMe() {
  currentPage = "#about";
  let listToRemove = ['#body', '#footer'];
  reset(listToRemove);
  buildAboutMe();
  toggleDirectory();
}

function routeToContact() {
  currentPage = "#contact";
  let listToRemove = ['#body', '#footer'];
  reset(listToRemove);
  buildContact();
  toggleDirectory();
}

/**
 *  Website Builders
 *  These methods appends everything and instantiates the CSS using TailwindCSS
 */

function buildMainPage() {
  var headerClassCSS = 'bg-misty-rose z-10 h-screen justify-center flex flex-col overflow-hidden';
  var footerClassCSS = 'absolute z-0 bottom-0 items-center w-full flex justify-center';
  $.get('./routes/home_page.html', function (homePage) {
      $(homePage).appendTo("body");
  });
  $.get('./components/ko-head.html', function(footer){
    $(footer).appendTo("footer");
  })
  $("body").addClass(headerClassCSS);
  $("footer").addClass(footerClassCSS);
} 

function buildAboutMe() {
  var bodyClassCSS = 'bg-misty-rose z-10 h-screen flex flex-col';
  $("body").addClass(bodyClassCSS);
  $.get('./routes/about-me.html', function(aboutMe){
    $(aboutMe).insertBefore("footer");
  })
  $.get('./components/formal-footer.html', function(footer){
    $(footer).appendTo("footer");
  })
}

function buildContact() {
  var bodyClassCSS = 'bg-misty-rose z-10 h-screen flex flex-col';
  $("body").addClass(bodyClassCSS);
  //Body inserts here
  $.get('./components/formal-footer.html', function(footer){
    $(footer).appendTo("footer");
  })
}

function buildArchive() {
  var bodyClassCSS = 'bg-misty-rose z-10 h-screen flex flex-col';
  $("body").addClass(bodyClassCSS);
  //Body inserts here
  $.get('./components/formal-footer.html', function(footer){
    $(footer).appendTo("footer");
  })
}

function buildContainer() {

}

function buildIndicator(currentPage) {
  let list = ['#home', '#about', '#contact', '#archive'];
  for(i = 0; i<list.length; i++) {
    $(list[i]).removeClass('font-times-new-roman');
  }
  $("#indicator").remove();
  console.log(currentPage);
  $.get("./components/you-are-here.html", function(youAreHere) {
    $(youAreHere).insertBefore(currentPage);
    $(currentPage).addClass('font-times-new-roman')
  });
}

function buildDirectoriesPage() {
  const directoriesAndFunctions = [
    {directory: '#home', func: routeToMainPage},
    {directory: '#about', func: routeToAboutMe},
    {directory: '#contact', func: routeToContact},
    {directory: '#archive', func: routeToArchive},
  ]
  $.get('./routes/directory_page.html', function (directoryPage) {
    $(directoryPage).appendTo("body");
    transDirectory = new TimelineMax({ paused: true }).fromTo("#d1", 0.8, { y: -screenHeight }, { y: 0, ease: "power4.out" });
    transDirectory2 = new TimelineMax({ paused: true }).fromTo("#d2", 1.2, { y: screenHeight }, { y: 0, ease: "power4.out" });
    transDirectory3 = new TimelineMax({ paused: true }).fromTo("#d3", 1.7, { y: -screenHeight }, { y: 0, ease: "power4.out" });
    transDirectory4 = new TimelineMax({ paused: true }).fromTo("#d4", 2, { y: screenHeight }, { y: 0, ease: "power4.out" });
    content = new TimelineMax({ paused: true }).fromTo("#content", 0.8, { opacity: 0, y: 120 }, { opacity: 1, y: 0, ease: "power4.easeOut" });
    directText = new TimelineMax({ paused: true }).fromTo("#directories-button", 0.8, { text: "Directories" }, { text: "Close[X]", ease: "power4.easeIn" });
    header = new TimelineMax({ paused: true }).fromTo("#header-wrapper", 0.8, {}, { color: "white", ease: "power4.easeOut" });
    directoryTransition();
    $("#directory-page").hide();
    for (let i = 0; i < directoriesAndFunctions.length; i++) {
      directoryBtnListener(directoriesAndFunctions[i].func, directoriesAndFunctions[i].directory);
    }
  });

}

/**
 * Animation initializers
 * This method initializes the transition animation if it does not exist
 * This methoda also plays the transition if needed
 */

function initializeTransition(reverse) {
  if(transition == null || transition2 == null || transition3 == null) {
  transition = new TimelineMax({paused: true}).fromTo("#transition-1", 1.5, { y:0 }, { y: -screenHeight ,ease: Power2.easeIn});

 transition2 = new TimelineMax({paused: true}).fromTo('#transition-2',1.65 ,{ y:0 }, { y: -screenHeight ,ease: Power2.easeIn} )

 transition3 = new TimelineMax({paused: true}).fromTo('#transition-3',1.8 ,{ y:0 }, {  y: -screenHeight ,ease: Power2.easeIn} )
  }

  if(reverse) {
    transition.reverse();
    transition2.reverse();
    transition3.reverse();
    transition3.eventCallback("onReverseComplete", function () {
      initializeTransition(false);
    });
    
  } else {
    transition.play();
    transition2.play();
    transition3.play();
  }
}

function directoryTransition() {

  if(directoryOpened) {
    transDirectory.reverse();
    transDirectory2.reverse();
    transDirectory3.reverse();
    transDirectory4.reverse();
    content.reverse();
    directText.reverse();
    header.reverse();
    $("#header-p").removeClass("hover:text-dessert-yellow");
    $("#header-p").addClass("hover:text-indian-red");
    transDirectory4.eventCallback("onReverseComplete", function () {
      $("#directory-page").hide();
    });
  } else {
    transDirectory.play();
    transDirectory2.play();
    transDirectory3.play();
    transDirectory4.play();
    content.play();
    directText.play();
    header.play();
    $("#header-p").removeClass("hover:text-indian-red");
    $("#header-p").addClass("hover:text-dessert-yellow");
    $("#directory-page").show();
  }
}
/**
   * Button Callers
   */

function toggleDirectory() {
  directoryOpened = !directoryOpened;
    directoryTransition();
    buildIndicator(currentPage);
}

function goToHome() {
  if(directoryOpened == false) {
    toggleDirectory();
  }
  initializeTransition(true, function() {
    let listToRemove = ['#body', '#footer'];
    reset(listToRemove);
    buildMainPage();
    initializeTransition(false);
  });
}

function hoverOnStuff(whatToHover) {
   
}

function directoryBtnListener(functionToCall, nameOfButton ) {
  $(nameOfButton).click(function () {
    console.log("clicked!");
    functionToCall();
  });
}