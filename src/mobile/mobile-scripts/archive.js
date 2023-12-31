console.log("Archive loaded!");

$(document).ready(init);

function init() {
    const projects = [
        {
          name: "haikalcium.xyz",
          imagePath: "../../res/img/haikalcium.png",
          projectDescription: "The project was designed, developed, and launched by myself, I had a huge help by @TinkeringTurian to set up and evaluate every step of this project.<br /><br />haikalcium.xyz serves as a medium for me and my employers, having the sole purpose to display my current skills and keeping track of my past experiences, other than that it also serves as a place for me to experiment with new technologies and frameworks.",
          projectBriefDescription: 'My first ever passion project.',
          projectLinks: [
            {icon:'<i class="fa-solid fa-link"></i>', link:'https://www.haikalcium.xyz', title:'Website Link'},
          ],
          timeline: 'July 2023 - August 2023',
        },
        {
          name: "JOMMAWA",
          imagePath: "../../res/img/jommawa.png",
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
          imagePath: "../../res/img/terra.png",
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
          imagePath:"../../res/img/mydusun.jpg",
          projectDescription: "MyDusun is a mobile application designated to help local farmers to sell their produces without any middleman involved, the project was pitched by me in a competition named Innovation and Technology Challenge - 21 by Universiti Malaya, the project was almost successful as it managed to receive the prize of RM500 in funding as a top-10 runner-up in the competition, the project has also received a patent under Universiti Utara Malaysia.<br /><br />My responsibility and involvement in this project is both to design the application's user-interface, design the technology stack, lead and train my development team, pitch the project and implement the codes aswell. ",
          projectBriefDescription: 'Experience the true nature of local agriculture.',
          projectLinks: [
            {icon : '<i class="fa-solid fa-video"></i>', link: 'https://drive.google.com/file/d/1booE4qXN3jPXnuXkJvn9xyPnKD8gwFfx/view?usp=sharing', title:'Video Pitch'},
            {icon : '<i class="fa-solid fa-file"></i>', link: 'https://docs.google.com/document/d/10pa_Vj-gnSEidkQyIHE882zCWS6oUm7Yzlsatw54DQQ/edit', title:'Technical Report'},
          ],
          timeline: 'April 2022 - February 2023',
        },
      ];

      for(let i=0; i<projects.length; i++) {
        $('#body').append(buildTemplate(projects[i], i));
        $('#section-' + i).hide();
        }


        setTimeout(() => {
            $('#wait-text').hide();
            for(let i=0;i<projects.length;i++){
                $('#section-' + i).show();
                let revealWork = gsap.timeline({
                    scrollTrigger: {
                      trigger: `#section-${i}`,
                      start: "top center ",
                      end: "bottom center ",
                        toggleActions: "play reverse play reverse",
                    }
                  });
                  let sectionContent = $(`#section-${i}`).children();
                  revealWork.staggerFrom(sectionContent, 0.5, {opacity:`0`,x:`-100%`})
            }
        },1500)
    
    }

    function buildTemplate(project, index) {
        let documentNew = ""; // Initialize with an empty string
        for (let i = 0; i < project.projectLinks.length; i++) {
            documentNew += `<a class="text-[0.6rem]" href="${project.projectLinks[i].link}">${project.projectLinks[i].icon} ${project.projectLinks[i].title}</a>`;
        }
        return `
        <div id="section-${index}" class="my-[6%] w-full flex items-center flex-col">
        <div class="w-full">
            <div class="h-[3.4rem] flex items-center w-full bg-dessert-yellow">
            <div
                class="px-[0.4rem] h-[70%] flex items-center border-dashed border-y w-full border- border-gunmental"
            >
                <h1 class="font-bold text-[1.3rem]">${project.name}</h1>
            </div>
            </div>
        </div>
        <img src="${project.imagePath}" alt="test" class="w-[18rem] pt-[3%] h-max border-indian-red
            shadow-lg" />
        <p class="text-[0.8rem] pt-[5%]">${project.timeline}</p>
        <p class="text-[0.6rem]"><i class="fas fa-pen-nib"></i> Brief description of this project:</p>
        <p class="px-[6%] text-justify text-[0.8rem] py-[0.6rem]">
            ${project.projectDescription}
        </p>
        <br />
        <div class="justify-evenly flex w-[80%]">
            ${documentNew}
        </div>
        </div>`;

    }