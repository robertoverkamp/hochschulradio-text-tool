let textInput;
let gridType;
let img = null;
let typeAmountSlider;
let typeMovementSelect;
let selectedPositions = []; // Speichert die ausgewählten Spalten für jede Zeile
let showImage;
let font;
let textTileAmountx;
let textTileAmounty;
let secondTypeMovement;
let imageContainer;

let canvas;
let videoDownload;
let mediaRecorder;
let recordedChunks = [];
let recording = false;
let totalFrames = 600; 
let currentFrame = 0;

//Typografie 
let font2;
let textArea;
let textArea2;
let textArea3;
let headline1;
let textFields = []; // Array für alle Textfelder

let h1X;
let h1Y;
let h2X;
let h2Y;
let s1X;
let s2X;

let subline1Direction = "";
let headline2Direction = "";

let textColor;
let textBgColor;

let blur
let oceanus;
let comic;

let typeSelect;

//Einfärbung der Bilder
let tintColor; // Variable für Tint-Farbe
let lastMoodValue = ""; // Speichert die letzte ausgewählte Stimmung

function preload() {
  font = loadFont('ESKlarheitGrotesk-Bk.otf');
  font2 = loadFont('ESKlarheitPlakat-Blk.ttf');
}


function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('canvasWrapper');

  formatSelect = document.getElementById('format');
  formatSelect.addEventListener('change', handleFormatChange);

  // textFont(font);
  textAlign(CENTER, CENTER);
  textFont(font);

  moodSelect = document.getElementById('moodSelect');
  mood = moodColors();

  // Hole das Textfeld-Element
  textInput = document.getElementById('textArea');

  textInput.addEventListener('input', () => {
    textInput.value = textInput.value.toUpperCase(); // Konvertiere den gesamten Text in Großbuchstaben
  });
  

  
  showImage = document.getElementById('showImage');

  imageContainer = document.getElementById('imageContainer');


    // Event-Listener für Bild-Upload hinzufügen
    let uploadElement = document.getElementById("imageUpload");
    uploadElement.addEventListener("change", handleImageUpload);
  
  imageDownload = document.getElementById('imgDownload');
  imageDownload.addEventListener('click', saveImage);

  typeMovementSelect = document.getElementById('selectMovement');
  secondTypeMovement = document.getElementById('selectSecondMovement');

  typeSelect = document.getElementById('selectTextStyle');

  //Typografie Initialisierung:

  textArea = document.getElementById('headlineText');

  textArea.addEventListener('input', () => {
    textArea.value = textArea.value.toUpperCase();
    restrictHeadline1(); // Begrenzung prüfen
  });


  textArea2 = document.getElementById('headline2Text');
  textArea2.addEventListener('input', () => {
    textArea2.value = textArea2.value.toUpperCase();
    restrictHeadline2(); // Begrenzung prüfen
  });

  textArea3 = document.getElementById('subline1Text');
  textArea3.addEventListener('input', () => {
    textArea3.value = textArea3.value.toUpperCase();
    restrictSubline1(); // Begrenzung prüfen
  });


  textFields = document.querySelectorAll("#headlineText, #headline2Text, #subline1Text");

  typeLayoutSelect = document.getElementById('typeLayoutSelect');

  imageContainer.style.display = 'none';

  videoDownload = document.getElementById('videoDownload');
  videoDownload.addEventListener('click', saveVideo);
}

function generateRandomPositions() {
  // Erstelle eine Liste mit allen Spaltenindizes und mische sie
  let columnIndices = Array.from({ length: textTileAmountx }, (_, i) => i);
  selectedPositions = shuffle(columnIndices); 
}

function handleImageUpload(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      loadImage(e.target.result, (loadedImage) => {
        img = loadedImage; // Ersetze das Bild
        grayImage = null;  // Cache zurücksetzen, damit ein neues Graustufenbild erstellt wird
        lastMoodValue = ""; // Stimmung zurücksetzen, um einen neuen Tint-Effekt auszulösen
        imageContainer.style.display = 'block';
        showImage.checked = true;
      });
    };
    reader.readAsDataURL(file);
  }
}


function draw() {
  background(200);

  if (moodSelect.value === 'color1') {
    background(0);
    fill(mood.color1[0]);
    textBgColor = mood.color1[2];
    textColor = mood.color1[0];
    textFillColor = hexToRGB(mood.color1[2]);
    tintColor = 255, 255, 255; // Farbe für Tint setzen
  } else if (moodSelect.value === 'color2') {
    background(mood.color2[0]);
    fill(mood.color2[1]);
    textBgColor = mood.color2[0];
    textColor = mood.color2[2];
    textFillColor = hexToRGB(mood.color2[1]);
    tintColor = hexToRGB(mood.color2[0]); 
}   else if (moodSelect.value === 'color3') {
    background(mood.color3[0]);
    fill(mood.color3[1]);
    textBgColor = mood.color3[1];
    textFillColor = hexToRGB(mood.color3[1]);
    textColor = 0;
    tintColor = hexToRGB(mood.color3[0]);
}   else if (moodSelect.value === 'color4') {
    background(mood.color4[0]);
    fill(mood.color4[2]);
    textBgColor = mood.color4[1];
    textFillColor = hexToRGB(mood.color4[2]);
    textColor = mood.color4[3];
    tintColor = hexToRGB(mood.color4[3]);
  } else if (moodSelect.value === 'color5') {
    background(mood.color5[0]);
    fill(mood.color5[2]);
    textBgColor = mood.color5[1];
    textFillColor = hexToRGB(mood.color5[2]);
    textColor = mood.color5[2];
    tintColor = hexToRGB(mood.color5[0]);
  } else if (moodSelect.value === 'color6') {
    background(mood.color6[0]);
    fill(mood.color6[1]);
    textBgColor = mood.color6[0];
    textFillColor = hexToRGB(mood.color6[2]);
    textColor = mood.color6[1];
    tintColor = hexToRGB(mood.color6[0]);
  } else if (moodSelect.value === 'color7') {
    background(mood.color7[2]);
    fill(mood.color7[1]);
    textBgColor = mood.color7[2];
    textFillColor = hexToRGB(mood.color7[1]);
    textColor = mood.color7[0];
    tintColor = hexToRGB(mood.color7[2]);
  } else if (moodSelect.value === 'color8') {
    background(mood.color8[0]);
    fill(mood.color8[1]);
    textBgColor = mood.color8[2];
    textFillColor = hexToRGB(mood.color8[1]);
    textColor = mood.color8[0];
    tintColor = hexToRGB(mood.color8[0]);
  } else if (moodSelect.value === 'color9') {
    background(mood.color9[0]);
    fill(mood.color9[1]);
    textBgColor = mood.color9[1];
    textFillColor = hexToRGB(mood.color9[2]);
    textColor = mood.color9[0];
    tintColor = hexToRGB(mood.color9[0]);
  }


  if (img && showImage.checked) {
    if (moodSelect.value !== lastMoodValue) {
      // Aktualisiere nur, wenn sich die Stimmung ändert
      lastMoodValue = moodSelect.value;
      grayImage = createGrayImage(); // Erstelle Graustufenbild nur einmal
    }

    let canvasAspect = width / height; // Verhältnis des Canvas
    let imgAspect = img.width / img.height; // Verhältnis des Bildes
  
    let drawWidth, drawHeight;
  
     // Vergleiche das Verhältnis des Bildes mit dem Canvas
     if (canvasAspect > imgAspect) {
      // Breiter Canvas: Bildhöhe anpassen, Breite überragen lassen
      drawWidth = width;
      drawHeight = width / imgAspect;
    } else {
      // Höherer Canvas: Bildbreite anpassen, Höhe überragen lassen
      drawWidth = height * imgAspect;
      drawHeight = height;
    }
  
    if (grayImage) {
      imageMode(CENTER);
      tint(tintColor); // Einfärben des Bildes
      image(grayImage, width / 2, height / 2, drawWidth, drawHeight); // Bild zeichnen
      noTint(); // Nach dem Zeichnen kein Tint anwenden, um andere Bilder nicht zu beeinflussen
    }
  }

  let textLength = textInput.value.length; // Zähle die Anzahl der Zeichen im Textfeld
  let textLines = textInput.value.split('\n'); // Zerlege den Input in Zeilen
  let maxLineLength = Math.max(...textLines.map(line => line.length)); // Finde die längste Zeile


    textTileAmountx = textLength;
    textTileAmounty = textLength;
  //   else if (gridType.value === 'singleLetter'){
  //   textTileAmountx = typeAmountx;
  //   textTileAmounty = typeAmountx;
  // }

  if (frameCount % 60 === 0) {
    generateRandomPositions(); // Alle 60 Frames aufrufen
  }

  let textTileWidth = width / textTileAmountx; // Berechne die Breite der "Kacheln"
  let textTileHeight = height / textTileAmounty; 

  // Berechne die aktuell sichtbare Row basierend auf frameCount
  let visibleRow = Math.floor(frameCount / 20) % textTileAmountx;

  for (let x = 0; x < textTileAmountx; x++) {
    for (let y = 0; y < textTileAmounty; y++) {
      let centerX = textTileWidth * x + textTileWidth / 2;
      let centerY = textTileHeight * y + textTileHeight / 2;
  
      let xPositionUpdate = centerX;
  
      let alpha = 255;
  
      push(); // Transformationen starten
      translate(centerX, centerY); // Ursprung zur Kachelmitte verschieben
  
      if (typeMovementSelect.value === 'tanWave') {
        let tanMovement = tan(radians(frameCount + x / 2 + y * 5)) * 50;
        xPositionUpdate += tanMovement; // Bewegung auf X-Achse
        translate(tanMovement, 0); // Verschiebe zusätzlich
      } else if (typeMovementSelect.value === 'row') {
        alpha = y === visibleRow ? 255 : 0; // Sichtbarkeit pro Zeile
      } else if (typeMovementSelect.value === 'curve') {
        let midPoint = (textTileAmountx - 1) / 2;
        let waveFactor = sin(radians(frameCount + y * 20));
        let offset = abs(x - midPoint) * 20 * waveFactor;
        xPositionUpdate += x < midPoint ? -offset : offset;
        translate(xPositionUpdate - centerX, 0); // Anpassen an Bewegung
      } else if (typeMovementSelect.value === 'randomType') {
        alpha = selectedPositions[y] === x ? 255 : 0;
      } else if (typeMovementSelect.value === 'wave') {
        let sinMovement = sin(radians(frameCount + x / 10 + y * 20)) * 100;
        xPositionUpdate += sinMovement; // Bewegung auf X-Achse
        translate(sinMovement, 0); // Verschiebe zusätzlich
      } else if (typeMovementSelect.value === 'flag') {
        let sinMovement = sin(radians(frameCount + x * 10 + y * 10 ))*100;
        translate(sinMovement, sinMovement); // Verschiebe zusätzlich
      } 

      if (secondTypeMovement.value === 'rotation') {
        let rotationAngle = radians(frameCount + x * 10 + y * 5);
        rotate(rotationAngle); // Drehe das Element
      } else if (secondTypeMovement.value === 'scale') {
        let scaleAmount = map(sin(radians(frameCount + x * 15 + y * 7.5)), -1, 1, 0.2, 2);
        scale(scaleAmount); // Skaliere das Element
      }
      
      else {
        
      }

        

      // Füllfarbe mit Opazität
      fill(textFillColor[0], textFillColor[1], textFillColor[2], alpha);

      

      // if (typeSelect.value === 'classic'){
        textFont(font);
        textSize(textTileWidth - textTileWidth/3);
        let textHeight = textAscent() - textDescent();
        let yOffset = -textHeight / 5; // Vertikales Offset, um den Buchstaben zu zentrieren
        let letter = textInput.value[x];
        text(letter, 0, yOffset);



      pop(); // Wiederherstellen des vorherigen Transformationszustands
    }
  }

  push();
  typeLayout1();
  headline(h1X, h1Y); // Zeichnet die Überschrift (Text und Rechtecke)
  headlineTwo(h2X, h2Y, headline2Direction); // Zeichnet die Überschrift (Text und Rechtecke)
  sublineOne(s1X, s1Y, subline1Direction);
  pop();

  if (recording) {
    currentFrame++;
    if (currentFrame >= totalFrames) {
      stopRecording();
    }
  }
}


function createGrayImage() {
  // Graustufen-Kopie des Bildes erstellen
  let grayImg = createImage(img.width, img.height);
  grayImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  grayImg.filter(GRAY); // Graustufenfilter anwenden
  return grayImg;
}


function hexToRGB(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b]; // Rückgabe als RGB-Array
}


  function saveImage() {
    saveCanvas('canvas', 'png');  // Canvas als PNG speichern
  }

  function saveVideo() {
    if (!recording) {
      // Initialisiere den MediaRecorder für den Canvas-Stream
      let stream = canvas.elt.captureStream(60);
      mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  
      // Event: Frame-Daten sammeln
      mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
  
      // Event: Aufnahme beenden und speichern
      mediaRecorder.onstop = saveRecording;
  
      // Starte die Aufnahme
      recordedChunks = [];
      recording = true;
      currentFrame = 0;
      mediaRecorder.start();
      console.log("Videoaufnahme gestartet...");
    }
  }
  
  function stopRecording() {
    console.log("Videoaufnahme beendet.");
    recording = false;
    mediaRecorder.stop();
  }
  
  function saveRecording() {
    // Video als Blob speichern
    let blob = new Blob(recordedChunks, { type: "video/webm" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "canvas_recording.webm";
    a.click();
    URL.revokeObjectURL(url);
    console.log("Video gespeichert!");
  }


function handleFormatChange() {
  const artboard = document.getElementById("artboard"); // Artboard-Element abrufen

  // Verhalten je nach Auswahl im Dropdown
  if (formatSelect.value === 'rect') {
    resizeCanvas(800, 800); // Quadratisches Format
    artboard.style.scale = "0.96"; // Standard-Skalierung
  } else if (formatSelect.value === 'reel') {
    resizeCanvas(600, 1067); // Hochformat
    artboard.style.scale = "0.72"; // Kleinere Skalierung für REEL

  } else if (formatSelect.value === 'poster') {
    // resizeCanvas(566, 800); 
    resizeCanvas(437, 800); 
    artboard.style.scale = "0.96";

  } else if (formatSelect.value === 'banner') {
   resizeCanvas(800, 200); 

    artboard.style.scale = "0.96";

  } else {
    resizeCanvas(800, 800); // Standard-Fall
    artboard.style.scale = "0.96"; // Standard-Skalierung
  }
}