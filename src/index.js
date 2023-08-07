// ! Everything's fucked, back to phase 0 and re-do the whole thing $.get is ACTUAL get
/**
 * * What TODO :
 * * Don't use multiple $.get operations
 * ? Simplify the component architecture
 * * You can use .hide() and .show() just to do stuff
 * * Maybe put the transition and directory page over at the index.html itself ?
 * ? Refactor components, throw out unnecessary things!
 */

// * Routes
const routes = [
  {
    pageName: '#home',
    bodyPath: './routes/home_page.html',
    footer: '#footer-1',
    bodyClass: 'bg-misty-rose z-10 h-screen justify-center flex flex-col overflow-hidden'
  },
  {
    pageName : '#about',
    bodyPath: './routes/about-me.html',
    footer: '#footer-2',
    bodyClass:'bg-misty-rose z-10 h-screen justify-center flex flex-col ',
  },
  {
    pageName: '#archive',
    bodyPath: './routes/archive.html',
    footer: '#footer-2',
    bodyClass:'bg-crayola-red overflow-x-hidden z-10 h-screen flex flex-col ',
  }
  // TODO : add more routes here
];

// * Toggle Button Indicator
let directoryOpened = false;
let currentPage;
let pageBefore;

// * Items to be appended
const cv = [
  {whereToPut: '#cv', title: 'Head of Publicity and Media', subtitle: 'ASTRONOUT2020', date: 'June 2019 - January 2020'}, 
  {whereToPut: '#cv', title: 'Information Technology; Major in Software Engineering', subtitle: 'Universiti Utara Malaysia', date: '2021 - 2025'}, 
  {whereToPut: '#awards', title: 'Top 10 Runner-ups', subtitle: 'Innovation and Technology Challenge - 21', date: 'February 2023'}, 
  {whereToPut: '#awards', title: 'Top 5 Finalists', subtitle: 'NeRACA Capture the Flags', date: '27 February 2023'}, 
  {whereToPut: '#awards', title: "Dean's Awards A211 Session", subtitle: 'Universiti Utara Malaysia', date: '11 June 2023'}, 
  {whereToPut: '#certifications', title: "Band - 7", subtitle: 'International English Language Test System', date: '16 September 2021'}, 
]

const screenHeight = window.screen.height;
gsap.registerPlugin(TextPlugin,ScrollTrigger);
// * Main Screen Transition
transition = new TimelineMax({paused: true}).fromTo("#transition-1", 1.5, { y:0 }, { y: -screenHeight ,ease: Power2.easeIn});
transition2 = new TimelineMax({paused: true}).fromTo('#transition-2',1.65 ,{ y:0 }, { y: -screenHeight ,ease: Power2.easeIn} )
transition3 = new TimelineMax({paused: true}).fromTo('#transition-3',1.8 ,{ y:0 }, { y: -screenHeight ,ease: Power2.easeIn} )

// * Directories transition
transDirectory = new TimelineMax({ paused: true }).fromTo("#d1", 0.8, { y: -screenHeight }, { y: 0, ease: "power4.out" });
transDirectory2 = new TimelineMax({ paused: true }).fromTo("#d2", 1.2, { y: screenHeight }, { y: 0, ease: "power4.out" });
transDirectory3 = new TimelineMax({ paused: true }).fromTo("#d3", 1.7, { y: -screenHeight }, { y: 0, ease: "power4.out" });
transDirectory4 = new TimelineMax({ paused: true }).fromTo("#d4", 2, { y: screenHeight }, { y: 0, ease: "power4.out" });
content = new TimelineMax({ paused: true }).fromTo("#content", 0.8, { opacity: 0, y: 120 }, { opacity: 1, y: 0, ease: "power4.easeOut" });
directText = new TimelineMax({ paused: true }).fromTo("#directories-button", 0.8, { text: "Directories" }, { text: "Close[X]", ease: "power4.easeIn" });
header = new TimelineMax({ paused: true }).fromTo("#header-wrapper", 0.8, {}, { color: "white", ease: "power4.easeOut" });


// * Components
let youAreHere = `
<span class="flex" id="indicator">
  <img src="../res/svg/lefty.svg" alt="" class="h-[4%] w-[4%]" />
  <p class="text-[20%] text-left text-dessert-yellow font-exposition mx-3">
    You are here!
  </p>
  <img src="../res/svg/righty.svg" alt="" class="h-[3%] w-[3%]" />
</span>
`;

function init() {
  $('#directory-page').hide();
  playTransition(false);
  delegator('home');
}

// todo : Create the function to go back to the home page
// todo : Make the about me button functional

//* Page delegator
function delegator(indicator) {
  currentPage = '#' + indicator;
  buildIndicator();
  console.log(currentPage);
  if(directoryOpened) {
    toggleDirectories();
  }
  switch (indicator) {
    case 'home':
      buildPage(routes[0].bodyPath, routes[0].footer, routes[0].bodyClass);
      break;
    case 'about':
      buildPage(routes[1].bodyPath, routes[1].footer, routes[1].bodyClass).then(() => {
        buildContainers();
        footer2Animation();
            })
      break;
    case 'archive':
       // todo : Make the onScroll animation on the tapes
       // todo : make the forLoop for each projects but put it in the archive.html
       // todo : Create the whole archive
       // todo : Import images and links if needed
      buildPage(routes[2].bodyPath, routes[2].footer, routes[2].bodyClass).then(() => {
        footer2Animation();
      });
      // TODO : add more cases here
  }
}

// * Builders
function buildPage(bodyPath, footer, bodyClass) {
  $('body').removeClass();
  return new Promise((resolve, reject) => {
    $('#body').remove();
    pageBefore = currentPage;
    currentPage = routes[0].pageName;
    $.get(bodyPath, function(homePage) {
      $('footer').hide();
      $(footer).show();
      $('body').addClass(bodyClass);
      $(homePage).insertBefore($(footer));
      resolve(); 
    }).fail(() => {
      reject(error);
    });
  });
}

// ? This thing builds the "You are here!" text in the directories page
function buildIndicator() {
  $(pageBefore).removeClass('font-times-new-roman');
  $('#indicator').remove();
  console.log(currentPage);
  $(youAreHere).insertBefore(currentPage);
  $(currentPage).addClass('font-times-new-roman');
}

function buildContainers() {
  for (let i = 0; i < cv.length; i++) {
    let item = `<div
                id="container"
                class="mx-[12%] my-[1%] py-[1%] flex items-center border-t border-ultramarine-blue"
                >
                <div class="bg-center w-[40px] h-[40px] mr-[3%]">
                  <img src="../res/svg/star.svg" alt="Test!" />
                </div>
                <div class="flex flex-col w-full">
                  <div class="text-1xl flex justify-between items-center">
                    <p class="inline-block"><i>${cv[i].subtitle}</i></p>
                    <p>${cv[i].date}</p>
                  </div>
                  <h2 id="subtitle" class="text-2xl font-bold">${cv[i].title}</h2>
                </div>
                  <div class="absolute" id="test-id">
                    <p>test!</p>
                  </div>
                </div>
                `;
    $(item).insertAfter(cv[i].whereToPut);
  }
}

// * Transition controllers
function playTransition(reverse) {
  if(reverse) {
    transition.reverse();
    transition2.reverse();
    transition3.reverse();
  } else {
    transition.play();
    transition2.play();
    transition3.play();
  }
}

function footer2Animation() {
  let transitionTrigger = gsap.timeline({
    scrollTrigger: {
      trigger: "#footer-2",
      toggleActions: "play reverse play reverse",
    },
  });
  transitionTrigger.from("#koko-head", { y: 100, duration: 0.9 });
}


// * Initiator
$(document).ready(init);

// * Button Listeners
$('#directories-button').click(toggleDirectories);
$('#about').click(() => delegator('about'));
$('#home').click(() => delegator('home'));
$('#archive').click(() => delegator('archive'));

// * Directories toggler
// todo : make the onHover animation for the directory buttn hover
function toggleDirectories() {
  directoryOpened = !directoryOpened;
  if (directoryOpened) {
    $('#haikalcium-button').removeClass('hover:text-indian-red');
    $('#haikalcium-button').addClass('hover:text-dessert-yellow');
    $('#directory-page').show();
    transDirectory.play();
    transDirectory2.play();
    transDirectory3.play();
    transDirectory4.play();
    content.play();
    directText.play();
    header.play();
  } else {
    $('#haikalcium-button').removeClass('hover:text-dessert-yellow');
    $('#haikalcium-button').addClass('hover:text-indian-red');
    transDirectory.reverse();
    transDirectory2.reverse();
    transDirectory3.reverse();
    transDirectory4.reverse();
    content.reverse();
    directText.reverse();
    header.reverse();
    // ? Why won't it work on just a regular function ?
    transDirectory4.eventCallback("onReverseComplete", function hideDirectory() {
      $('#directory-page').hide()
    });
  }
}