$(document).ready(function () {
  init();
});

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
    });
}