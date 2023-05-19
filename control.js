var audioElement = document.getElementById('myAudio');
var playButton = document.getElementById('playButton');
var pauseButton = document.getElementById('pauseButton');

playButton.addEventListener('click', function() {
  audioElement.play();
});

pauseButton.addEventListener('click', function() {
  audioElement.pause();
});
