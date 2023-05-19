// Création du contexte audio
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Création de l'analyseur de fréquence
var analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // Taille de la fenêtre d'analyse FFT

// Récupération de l'élément audio
var audioElement = document.querySelector('audio');

// Connexion de l'analyseur de fréquence à la source audio
var source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);

// Connexion de la source audio au contexte audio
source.connect(audioContext.destination);

// Tableau tampon pour stocker les données de fréquence
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

// Fonction pour mettre à jour les données de fréquence et déclencher des animations
function updateFrequencyData() {
  requestAnimationFrame(updateFrequencyData);

  // Obtention des données de fréquence
  analyser.getByteFrequencyData(dataArray);

  // Votre logique d'animation en fonction des données de fréquence ici
  // Par exemple, vous pouvez vérifier la valeur d'une certaine plage de fréquences pour déclencher une animation

  // Exemple : Détection des basses fréquences
  var bassRange = dataArray.slice(0, 1); // Vous pouvez ajuster cette plage en fonction de vos besoins
  var bassAverage = bassRange.reduce((a, b) => a + b, 0) / bassRange.length;

  // Calcul de l'échelle proportionnelle en fonction de la moyenne des basses
  var scale = 1 + (bassAverage / 255); // 255 étant la valeur maximale possible pour les données de fréquence

  // Sélection d'une div au hasard pour l'animation
  var divsToAnimate = Array.from(document.querySelectorAll('.boxAnimeBox div'));
  var randomDivIndex = Math.floor(Math.random() * divsToAnimate.length);
  var randomDiv = divsToAnimate[randomDivIndex];

  // Appliquer l'animation à la div sélectionnée
  gsap.to(document.querySelectorAll('.boxAnimeBox div'), {
    scale: scale.toFixed(100), // Mettre à l'échelle proportionnelle calculée
    duration: 0.1,
    overwrite: "auto", // Permettre à l'animation de se terminer sans être interrompue
    onComplete: function() {
      gsap.to(document.querySelectorAll('.boxAnimeBox div'), {
        scale: '1',
        duration: 0.1
      });
    }
  });
}

// Démarrer la mise à jour des données de fréquence
updateFrequencyData();
