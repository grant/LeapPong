var FADE_TIME = 200;

$(function() {
  var $popup = $('.popup');
  var $game = $('.game');

  $popup.find('button').click(function () {
    var $button = $(this);

    $popup.fadeOut(FADE_TIME);
  });
});