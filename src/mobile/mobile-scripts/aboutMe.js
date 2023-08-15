console.log('aboutMe.js loaded');


  $(document).ready(init);

  function init() {
    const cv = [
        {whereToPut: '#cv', title: 'Head of Publicity and Media', subtitle: 'ASTRONOUT2020', date: 'June 2019 - January 2020'}, 
        {whereToPut: '#cv', title: 'Information Technology; Major in Software Engineering', subtitle: 'Universiti Utara Malaysia', date: '2021 - 2025'}, 
        {whereToPut: '#awards', title: 'Top 10 Runner-ups', subtitle: 'Innovation and Technology Challenge - 21', date: 'February 2023'}, 
        {whereToPut: '#awards', title: 'Top 5 Finalists', subtitle: 'NeRACA Capture the Flags', date: '27 February 2023'}, 
        {whereToPut: '#awards', title: "Dean's Awards A211 Session", subtitle: 'Universiti Utara Malaysia', date: '11 June 2023'}, 
        {whereToPut: '#certifications', title: "Band - 7", subtitle: 'International English Language Test System', date: '16 September 2021'}, 
      ] 
    for(let i=0 ; i<cv.length; i++){
        makeContainers(cv[i]);
    }
    animate();
  }

  function makeContainers(cv) {
    return $(cv.whereToPut).append(`
    <div class="border-t my-[1%] py-[2%] flex border-ultramarine-blue w-full">
    <img
      src="../../res/svg/star.svg"
      class="w-[5%] mr-[5%]"
      alt=""
      srcset=""
    />
    <div class="w-[95%]">
    <p class="italic text-[0.6rem]">${cv.date}</p>
    <p class="text-[0.6rem]">${cv.subtitle}</p>
    <h1 class="font-bold text-[0.8rem]">${cv.title}</h1>
    </div>
  </div>
`)
  }

  function animate() {
    let animation = new TimelineMax();
    let contents1 = $('#certifications').children();
    let contents2 = $('#awards').children();
    let contents3 = $('#cv').children();
    animation.staggerFrom(['#inner-body','#awards-text', contents2, '#cv-text', contents3, '#certifications-text', contents1], 1.2, {opacity: 0, y: `100%`}, 0.3);
    animation.play();
  }