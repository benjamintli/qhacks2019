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
  var listen = generateEmoji();
  imageSelector.setAttribute('src', listen)
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
      document.querySelector('a-videosphere').setAttribute('src','#temple')
      document.querySelector('#temple').play()
    }
    else if (query.toLowerCase().includes('rockies')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#rockies')
      document.querySelector('#rockies').play()
      var output = setFacts('alps.json')
      document.querySelector('#facts').setAttribute('value', output.facts[0])
      console.log(output.facts[0]);
    } 
    else if (query.toLowerCase().includes('beach') || query.toLowerCase().includes('rocky')) {
      imageSelector.setAttribute('src', '#bitmoji2')
      textSelector.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#rocky-beach')
      document.querySelector('#rocky-beach').play()
      var output = setFacts('beach.json')
      document.querySelector('#facts').setAttribute('visible', true)
      document.querySelector('#facts').setAttribute('value', output.facts[0])
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
      textSelector.setAttribute('value','Didn\'t catch that \nPress the button and try again')
    }
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

  var url_1 = "https://sdk.bitmoji.com/render/panel/"
  var tourguides = {
      "Ben" : "-AUJoNkQxx3e6AU8SXbVVRmXIdXZPEg-v1.png?transparent=1&palette=1",
      "Cache" : "-AUJoNkQxQWlVEr8mIwpp1lF8GTDokg-v1.png?transparent=1&palette=1&fbclid=IwAR0gjzgGHodoa1vpLNLRmYGIGYrOktzoxUB1fe6gRUckpyOjlAatb97nt34",
      "Johnny" : "-AUJoNkQxLNPJ~WfXuhaYGVp7wC~p~w-v1.png?transparent=1&palette=1&fbclid=IwAR2EJ0ENHgP4zOt2qjObDOWzcBgY27hvPQgYjgyyVdAiVPjUKLVvXBUGKrE",
      "Greg" : "-AUJoNkQxUDfpQvOt~8bNTgjnsTWx0Q-v1.png?transparent=1&palette=1&fbclid=IwAR2skmX3xgrFknDyurPFRlqHPv2ZLfmLSy9aEnUE--TdLS8GUZ8lrYzZO0o"
  };
  var guide = "";
  function choosingGuide(){
    function getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return  Math.floor(Math.random() * (max - min +1)) + min;
    }

    var select = getRandomInt(1,4);
    console.log(select);
    if(select == 1){
       return guide= "Ben";}
    else if(select ==2){
        return guide = "Cache";
    }
    else if(select== 3){
      return guide = "Johnny";}
    else
     return guide = "Greg";
     
  }

var character = document.querySelector('my-image');

function generateEmoji(){
  /*var bitmojiID = [
     10207805,
    10212012,
     10222099,
    9090400,
   9284933,
    10178725,
    10215119,
    10219583
  ];*/
  var guides = choosingGuide();
  console.log(guides);
  var person = tourguides[guides];
  //var action = bitmojiID[Math.floor(Math.random() * bitmojiID.length)];
  var bitch = url_1+"10215354"+person;
  //character.setAttribute('src', bitch); 
  console.log(bitch);
  return bitch;
}
