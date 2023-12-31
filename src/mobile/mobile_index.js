$(document).ready(function () {
  init();
});


let transition = new TimelineMax({paused: true}).fromTo("#transition-1", 1.5, { y:0 }, { y: `-100%` ,ease: Power2.easeIn});
let transition2 = new TimelineMax({paused: true}).fromTo('#transition-2',1.65 ,{ y:0 }, { y: `-100%` ,ease: Power2.easeIn} );
let transition3 = new TimelineMax({paused: true}).fromTo('#transition-3',1.8 ,{ y:0 }, { y: `-100%` ,ease: Power2.easeIn} );
const routes = [
    {'name':'#home','route' : './routes/mobile_home_page.html','bodyClass' : 'bg-misty-rose text-gunmental flex flex-col items-center justify-center h-screen '},
    {'name':'#contact','route' : './routes/mobile_contact.html','bodyClass' : 'bg-misty-rose text-gunmental flex flex-col items-center justify-between h-screen '},
    {'name':'#about','route' : './routes/mobile_about_me.html', 'bodyClass' : 'bg-misty-rose text-gunmental flex flex-col items-center justify-center '},
    {'name':'#archive','route' : './routes/mobile_archive.html', 'bodyClass' : 'bg-misty-rose text-gunmental flex flex-col items-center justify-center '},
]
let directoryOpen = false;
let directoriesTransition;
let contentTransition;
let currentPage;
let loaded;

// ? Creates the transition of the directories page
function createDirectoriesTransition() {
    var elements = $("#curtains").children("div");
    var contentElements = $("#directories-content").children();
  directoriesTransition = gsap.timeline({ paused: true })
    .staggerFromTo(
      [elements],
      1,
      {x: `-100%` },
      {  x: 0, ease: "power2.out" },
      0.08
    );
    contentTransition = gsap.timeline({ paused: true }).staggerFromTo(
        [contentElements], 1.2, {x:`-100%` },{ x: 0, ease: "power2.out" }, 0.2
    );
    
}

//? Initiator of the website
function init() {
    console.log('Ready!');
    delegator(routes[0]);
    currentPage = routes[0];
    mainTransitionPlay(false);
    createDirectoriesTransition();
    $('#directories-page').hide();
    
}

//? Delegator is used to navigate to certain routes and tell the builder
//? what to build
function delegator(route) {
        currentPage = route;
    if(route == routes[1]) {
        $('footer').hide();
    } else {
        $('footer').show();
    }
    deconstruct();
    builder(route.route, route.bodyClass);
function init() {
    console.log('Ready!');
    delegator();
}

function delegator() {
    builder();
}

function builder() {
    $.get('./routes/mobile_home_page.html', function (body) {
        $(body).insertBefore('footer');
        $('body').addClass(bodyClass);
    }).then(() => {
        loaded = true;
    })
}

function deconstruct() {
    $('body').removeClass();
    $('#body').remove();
}

function navigateToAboutMe() {
    mainTransitionPlay(true);
    setTimeout(() => {
        delegator(routes[2]);
        mainTransitionPlay(false);
    },2000);
}

function goToHome() {
    mainTransitionPlay(true);
    if(directoryOpen){
        openAndCloseTransition();
    }
    setTimeout(() => {
        delegator(routes[0]);
        mainTransitionPlay(false);
    },2000);
}

function mainTransitionPlay(reverse) {
    console.log(reverse);
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

// ? Event listeners
$('#directories-button').click(openAndCloseTransition);
$('#home').click(() => {clickFunc(routes[0])});
$('#contact').click(()=>{
    clickFunc(routes[1]);
});
$('#about').click(()=>{
   clickFunc(routes[2]);
});
$('#archive').click(()=>{
    clickFunc(routes[3]);
});


function clickFunc(route) {
    delegator(route);
    openAndCloseTransition();
}
function openAndCloseTransition() {
    directoryOpen = !directoryOpen;

    if(directoryOpen) {
        $('#directories-page').show();
        directoriesTransition.play();
        contentTransition.play();
        buildIndicator();
    }
    else {
        buildIndicator();
        directoriesTransition.reverse();
        contentTransition.reverse();
        directoriesTransition.eventCallback("onReverseComplete", () => {
            $('#directories-page').hide();
        });
        
    }
}

function buildIndicator() {
    var elements = $('#directories-buttons').children();
    let youAreHere = ` 
        <span class="flex" id="indicator">
        <img src="../../res/svg/lefty.svg" alt="" class="h-[4%] w-[4%]" />
        <p class="text-[20%] text-left text-dessert-yellow font-exposition mx-3">
            You are here!
        </p>
        <img src="../../res/svg/righty.svg" alt="" class="h-[3%] w-[3%]" />
        </span>
        `;
    $(elements).removeClass();
    $('#indicator').remove();
    $(youAreHere).insertBefore(currentPage.name);
    $(currentPage.name).addClass('font-times-new-roman');

    });
}