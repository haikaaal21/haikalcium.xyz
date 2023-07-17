import {fetchWorldTime} from "../res/scripts/script.js";
import anime from '../../node_modules/animejs/lib/anime.es.js';


$(document).ready(function() {
  var loadingText = $("#loading-div");
  loadingText.show();
    fetchWorldTime();
    $.get('./components/header.html', function (data) {
      loadingText.hide();
      $("header").append(data);
    })
    $.get('./routes/home_page.html', function(data) {
      $(data).insertAfter("header");
    })
    $.get('./components/ko-head.html', function(data) {
      $("footer").append(data);
    })
    $("#body").append("<div></div>");
    $("#body").addClass("bg-misty-rose z-10 h-screen justify-between flex flex-col overflow-hidden");
    $("footer").addClass("absolute z-0 bottom-0 items-center w-full flex justify-center ");
  });
