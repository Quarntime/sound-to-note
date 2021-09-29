// buttons
const stopButton = document.getElementById("stop")
const recordButton = document.getElementById("record")

// modules for mic
const audioContext = new window.AudioContext();
const analyser = audioContext.createAnalyser();
var chunks = [];
let id = 0;
let mediaRecorder

recordButton.onclick = async function () {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    id = setTimeout(() => {
        mediaRecorder = new MediaRecorder(stream);
        var chunks = [];
        mediaRecorder.start(1000);          

        mediaRecorder.ondataavailable = function(e) {
          console.log("data available after MediaRecorder.stop() called.");

          var audio = document.createElement('audio');
          audio.controls = true;
          chunks.push(e.data);
          var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
          var audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          blob.arrayBuffer().then(data => {const view = new Uint8Array(data); document.getElementById("notes").innerHTML = view});
          console.log(audioURL)
        }
      }, 1000);
    
}
stopButton.onclick = function () {
    document.getElementById('notes').innerHTML = "life is gaming"
    console.log("recorder stopped");
    mediaRecorder.stop();
}