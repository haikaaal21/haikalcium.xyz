$(document).ready(function () {
    const leftyElement = $('#lefty');
    const rightyElement = $('#righty');
  
    const leftyWidth = leftyElement.width();
    const rightyWidth = rightyElement.width();
  
    const gapBetweenLeftyAndRighty = rightyElement.offset().left - (leftyElement.offset().left + leftyWidth);
    console.log("ELEMENT LOG: " + gapBetweenLeftyAndRighty);
    const roundedGap = Math.floor(gapBetweenLeftyAndRighty);
    const barBetween = $('#bar-between');
    barBetween.width(roundedGap + 'px');

  });