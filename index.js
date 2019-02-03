// var vrView = new VRView.Player('#vrview', {
//   video: './TEST2.jpg',
//   default_yaw: 90,
//   is_yaw_only: true
//   // is_stereo: true
// });
function startListener(){
  var imageSelector = document.querySelector('#image')
  var textSelector = document.querySelector('#text')
  document.querySelector('#facts').setAttribute('visible', false)
  imageSelector.setAttribute('src', '#my-image')
  imageSelector.setAttribute('visible',true)
  textSelector.setAttribute('visible',true)
  textSelector.setAttribute('value','Speak into the mic')
  // document.getElementById('not-found').style.visibility = 'hidden';
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();

  recognition.onresult = function(event) {
      console.log(event.results[0][0].transcript);
      keyWordsearch(event.results[0][0].transcript);
  };
}

function setFacts(filepath){
  var request = new XMLHttpRequest();
  request.open("GET", filepath, false);
  request.send(null)
  var my_JSON_object = JSON.parse(request.responseText);
  console.log(my_JSON_object);
  return my_JSON_object;

}
function keyWordsearch(query){
    var imageSelector = document.querySelector('#image')
    var textSelector = document.querySelector('#text')
    if (query.toLowerCase().includes('temple') || query.toLowerCase().includes('thailand')){
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      var output = setFacts('temple.json')
      document.querySelector('#facts').setAttribute('visible', true)
      document.querySelector('#facts').setAttribute('value', output.facts[0])
      document.querySelector('a-videosphere').setAttribute('src','#safari')
      document.querySelector('#temple').play()
    }
    else if (query.toLowerCase().includes('alps')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#alps')
      document.querySelector('#alps').play()
      var output = setFacts('alps.json')
      document.querySelector('#facts').setAttribute('value', output.facts[0])
      console.log(output.facts[0]);
    } 
    else if (query.toLowerCase().includes('beach') || query.toLowerCase().includes('rocky')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#rocky-beach')
      document.querySelector('#rocky-beach').play()
    } 
    else if (query.toLowerCase().includes('water')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#water')
      document.querySelector('#water').play()
    } 
    else if (query.toLowerCase().includes('amsterdam')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#city')
      document.querySelector('#city').play()
      var output = setFacts('amsterdam.json')
      document.querySelector('#facts').setAttribute('visible', true)
      document.querySelector('#facts').setAttribute('value', output.facts[0])
    } 
    else {
      imageSelector.setAttribute('visible',true)
      textSelector.setAttribute('visible',true)
      textSelector.setAttribute('value','Didn\'t catch that')
    }
}
function makeRequest(query) {
  var request = gapi.client.youtube.search.list({
          q: query,
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          channelId: 'UC6AXBF-78lNa3_TjAIWZWmQ' //channel for teh VR videos
  });
  request.execute(function(response)  {
          $('#results').empty()
          var srchItems = response.result.items;
          if (!srchItems || srchItems.length < 1) {
            document.getElementById('not-found').style.visibility = 'visible';
            return
          }
          console.log(srchItems)
          document.getElementById('ui').style.display = 'none';
          document.getElementById('yt').style.display = 'block';
})
}


function queryWikipedia(place) {
  var URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1';

  URL += "&titles=" + place;
  request(URL);

  var setAccuracy = function(result) {
      //result = result.replace(/<(?:.|\n)*?>/gm, '');
      //result = result.query

      result = JSON.parse(result)
      var index = 47737;
      result = result.query.pages
      result = result[Object.keys(result)[0]].extract
      result = result.split(". ");
      console.log(result);
      var myJsonString = JSON.stringify(result);
      console.log(myJsonString[0]);
      return myJsonString;

  };

  function request(URL) {
      const xhr = new XMLHttpRequest();
      console.log(xhr)
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              setAccuracy(xhr.response)
          } else {
             callback(xhr.status, null)
          }
        }
      }
      xhr.ontimeout = function () {
        // Well, it took to long do some code here to handle that
      }
      xhr.open('get', URL, true)
      xhr.send();
    }
  }

