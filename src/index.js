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
    bodyClass:'bg-misty-rose overflow-x-hidden z-10 h-screen flex flex-col ',
  },
  {
    pageName: '#contact',
    bodyPath: './routes/contact.html',
    footer: '#footer-1',
    bodyClass:'bg-misty-rose overflow-hidden ',
  },
  
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

const projects = [
  {
    name: "haikalcium.xyz",
    imagePath: "../res/img/haikalcium.png",
    projectDescription: "The project was designed, developed, and launched by myself, I had a huge help by @TinkeringTurian to set up and evaluate every step of this project.<br /><br />haikalcium.xyz serves as a medium for me and my employers, having the sole purpose to display my current skills and keeping track of my past experiences, other than that it also serves as a place for me to experiment with new technologies and frameworks.",
    projectBriefDescription: 'My first ever passion project.',
    projectLinks: [
      {icon:'<i class="fa-solid fa-link"></i>', link:'https://www.haikalcium.xyz', title:'Website Link'},
    ],
    timeline: 'July 2023 - August 2023',
  },
  {
    name: "JOMMAWA",
    imagePath: "../res/img/jommawa.png",
    projectDescription: "Jommawa is an e-commerce application that targets university students to rent/sell their belongings to other students, the project was submitted to a hackathon but was rejected due to the rules stating that only locals may apply.<br /><br />I was responsible on handling the UI and general design, team coordination, and creating marketing resources.",
    projectBriefDescription: 'Helping university students finding their way around the tough economy!',
    projectLinks: [
      {icon:'<i class="fa-solid fa-video"></i>', link:'https://youtu.be/QxAd1N10Gf4', title:'Video Pitch'},
      {icon:'<i class="fa-solid fa-mobile"></i>', link:'https://www.figma.com/proto/V7Z7JRtKYtRBYo736p6HyS/JOMMAWA?type=design&node-id=140-1225&t=SoVJIEd1P64zRsVU-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=18%3A724&show-proto-sidebar=1&mode=design', title:'Low Fidelity Prototype'},
    ],
    timeline: 'April 2023 - April 2023',
  },
  {
    name: "TERRA",
    imagePath: "../res/img/terra.png",
    projectDescription: "TERRA is a project that revolves around the idea of reusing waste of any kind, the project is still in it's design phase as it requires improvements.<br /><br />The project was designed by me and data research was provided by my co-workers and I, the project was submitted to a virtual hackathon by Universiti Sains Malaysia named Varsity Hackathon.",
    projectBriefDescription: 'Reducing the world\'s waste little by little.',
    projectLinks: [
      {icon: '<i class="fa-solid fa-video"></i>', link: "https://youtu.be/l38rq1MFdKk", title: "Video Pitch"},
      {icon:'<i class="fa-solid fa-mobile"></i>', link:"https://www.figma.com/proto/7LNfuGYC2JKINBUvjAvTyK/Proyek-VHACK?node-id=22-196&starting-point-node-id=22%3A196", title:"Low fidelity prototype"}
    ],
    timeline: 'February 2023 - March 2023',
  },
  {
    name: "MyDusun",
    imagePath:"../res/img/mydusun.jpg",
    projectDescription: "MyDusun is a mobile application designated to help local farmers to sell their produces without any middleman involved, the project was pitched by me in a competition named Innovation and Technology Challenge - 21 by Universiti Malaya, the project was almost successful as it managed to receive the prize of RM500 in funding as a top-10 runner-up in the competition, the project has also received a patent under Universiti Utara Malaysia.<br /><br />My responsibility and involvement in this project is both to design the application's user-interface, design the technology stack, lead and train my development team, pitch the project and implement the codes aswell. ",
    projectBriefDescription: 'Experience the true nature of local agriculture.',
    projectLinks: [
      {icon : '<i class="fa-solid fa-video"></i>', link: 'https://drive.google.com/file/d/1booE4qXN3jPXnuXkJvn9xyPnKD8gwFfx/view?usp=sharing', title:'Video Pitch'},
      {icon : '<i class="fa-solid fa-file"></i>', link: 'https://docs.google.com/document/d/10pa_Vj-gnSEidkQyIHE882zCWS6oUm7Yzlsatw54DQQ/edit', title:'Technical Report'},
    ],
    timeline: 'April 2022 - February 2023',
  },
];



const screenHeight = window.screen.height;
gsap.registerPlugin(TextPlugin,ScrollTrigger);
// * Main Screen Transition
transition = new TimelineMax({paused: true}).fromTo("#transition-1", 1.5, { y:0 }, { y: `-100%` ,ease: Power2.easeIn});
transition2 = new TimelineMax({paused: true}).fromTo('#transition-2',1.65 ,{ y:0 }, { y: `-100%` ,ease: Power2.easeIn} )
transition3 = new TimelineMax({paused: true}).fromTo('#transition-3',1.8 ,{ y:0 }, { y: `-100%` ,ease: Power2.easeIn} )

// * Directories transition
transDirectory = new TimelineMax({ paused: true }).fromTo("#d1", 0.8, { y: `-100%` }, { y: 0, ease: "power4.out" });
transDirectory2 = new TimelineMax({ paused: true }).fromTo("#d2", 1.2, { y: `100%` }, { y: 0, ease: "power4.out" });
transDirectory3 = new TimelineMax({ paused: true }).fromTo("#d3", 1.7, { y: `-100%` }, { y: 0, ease: "power4.out" });
transDirectory4 = new TimelineMax({ paused: true }).fromTo("#d4", 2, { y: `100%` }, { y: 0, ease: "power4.out" });
content = new TimelineMax({ paused: true }).fromTo("#content", 0.8, { opacity: 0, y: 120 }, { opacity: 1, y: 0, ease: "power4.easeOut" });
directText = new TimelineMax({ paused: true }).fromTo("#directories-button", 0.8, { text: "Directories" }, { text: "Close[X]", ease: "power4.easeIn" });
header = new TimelineMax({ paused: true }).fromTo("#header-wrapper", 0.8, {}, { color: "white", ease: "power4.easeOut" });

// * Peek animation
let footerAnimation;

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

function returnTemplate(item, index) {
  let html2 = "";
  for (let i = 0; i < item.projectLinks.length; i++) {
    let aElement = document.createElement("a");
    aElement.href = item.projectLinks[i].link;
    aElement.target = "_blank";
    aElement.innerHTML = item.projectLinks[i].icon + " " + item.projectLinks[i].title;
    aElement.className = "hover:text-bittersweet-shimmer hover:tracking-widest duration-300 ease-out"
    html2 += aElement.outerHTML;
  }

  return `<div id="work-${index}" class ='pt-[2%]'>
  <div id="rollTape-${index}" class="w-full scale-[110%] bg-dessert-yellow rotate-[6deg] py-4">
    <div class="border-y-2 border-gunmental border-dashed">
      <div class="font-bold md:text-[3rem] px-[7%]">${item.name}</div>
    </div>
  </div>
  <div class="flex pt-[5%] 2xl:mx-[10%] px-[4%]">
    <div class="w-[50%]   mr-[3%]">
      <img src="${item.imagePath}" alt="" class="shadow-xl shadow-indian-red " />
    </div>
    <div class="w-[50%]">
    <p class="font-bold italic md:text-[2rem] uppercase ">${item.projectBriefDescription}</p>
    <p>${item.timeline}</p>
    <p class="md:text-[1rem] "><i class="fa-solid fa-pen-nib"></i>
    Brief description of this project: </p> </br>
      <p class="text-justify md:text-[1.15rem]">
        ${item.projectDescription}
      </p>
      <ul id="links" class="flex justify-evenly pt-[2%] w-full">
      ${html2}
      </ul>
    </div>
  </div>
</div>`;
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function init() {
  // ? This function makes sure that it takes 1 milisecond first before scrolling to the top
  if(isMobileDevice()) {
    window.location.href = "./routes/under-construction.html"
  } else {
    window.onload = function() {
      setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
  };
    $('#directory-page').hide();
    playTransition(false);
    delegator('home');
    footerAnimation = new TimelineMax({ paused: true }).fromTo("#footer-1", 1.2, { y: 0 }, { y: `-30%`, ease: "Power4.easeInOut" });
  }
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
      buildPage(routes[0].bodyPath, routes[0].footer, routes[0].bodyClass).then(() => {
        let aboutMeArrowAnim = new TimelineMax({ paused: true }).fromTo("#arrow", 0.8, { x:-10, opacity:0 }, { x: 0, opacity:100, ease: "Power4.easeInOut" });
        let aboutMeTextAnim = new TimelineMax({ paused: true }).fromTo("#about-me-text", 0.8, { x:-10 }, { x: 0, ease: "Power4.easeInOut" });
        $('#about-me-btn').on("mouseenter", ()=>{
          aboutMeArrowAnim.play(), 
          aboutMeTextAnim.play()
        }).on("mouseleave", ()=>{
          aboutMeArrowAnim.reverse(), 
          aboutMeTextAnim.reverse()
        });
        $('#about-me-btn').click(() => {
          playTransition(true);
          setTimeout(() => {
            playTransition(false);
            delegator('about');
          }, 2000)
        });
      });
      break;
    case 'about':
      buildPage(routes[1].bodyPath, routes[1].footer, routes[1].bodyClass).then(() => {
        buildContainers();
        footer2Animation();
            })
      break;
    case 'archive':
      buildPage(routes[2].bodyPath, routes[2].footer, routes[2].bodyClass).then(() => {
        footer2Animation();
          for (let i = 0; i < projects.length; i++) {
            $("#body").append(returnTemplate(projects[i], i));
          }
          let rollTapeAnimations = [];
          archiveAnimationCreation(rollTapeAnimations);
      });
      break;
      case 'contact':
        buildPage(routes[3].bodyPath, routes[3].footer, routes[3].bodyClass);
        break;
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

let transitionTrigger;
function footer2Animation() {
   // ! There's a little bug with the extension
   transitionTrigger = null;
    transitionTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-2",
        start: 'bottom bottom',
      },
    });
    transitionTrigger.from("#koko-head", { y: 100, duration: 1.4 });
  console.log(transitionTrigger);
}

// * Animation Controllers
function peekAnimation() {
  footerAnimation.play();
  setTimeout(()=> {
    footerAnimation.reverse();
  }, 2500);
}


setInterval(peekAnimation, 8000);

function archiveAnimationCreation(rollTapeAnimations) {
  for (let i = 0; i < projects.length; i++) {
    let revealWork = gsap.timeline({
      scrollTrigger: {
        trigger: `#work-${i}`,
        start: "top center+=20%",
        end: 'bottom center',
      }
    });
    revealWork.from(`#work-${i}`, { opacity: 0, y: 300, duration: 2.4, ease: Power4.easeOut });
    let rolltapeAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: `#rollTape-${i}`,
        start: "top center+=20%",
        end: 'bottom center',
      }
    });
    rolltapeAnimation.from(`#rollTape-${i}`, { x: -3000, duration: 1.4, ease: Power4.easeOut });
    rollTapeAnimations.push(rolltapeAnimation);
  }
}

// * Initiator
$(document).ready(init);

// * Button Listeners
$('#directories-button').click(toggleDirectories);
$('#about').click(() => delegator('about'));
$('#home').click(() => delegator('home'));
$('#archive').click(() => delegator('archive'));
$('#contact').click(() => delegator('contact'));
$('#haikalcium-button').click(navigateBackToHome);

// * Back to home
function navigateBackToHome() {
  playTransition(true);
  setTimeout(() => {
    delegator('home');
    playTransition(false);
  }, 2000)

}
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