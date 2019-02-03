// var vrView = new VRView.Player('#vrview', {
//   video: './TEST2.jpg',
//   default_yaw: 90,
//   is_yaw_only: true
//   // is_stereo: true
// });
function startListener(){

  var el = document.querySelector('#image')
  var el2 = document.querySelector('#text')
  el.setAttribute('src', '#my-image')
  el.setAttribute('visible',true)
  el2.setAttribute('visible',true)
  el2.setAttribute('value','Speak into the mic')
  // document.getElementById('not-found').style.visibility = 'hidden';
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();

  recognition.onresult = function(event) {
      console.log(event.results[0][0].transcript);
      queryWikipedia(event.results[0][0].transcript)
      keyWordsearch(event.results[0][0].transcript);
  };
}

function keyWordsearch(query){
    var el = document.querySelector('#image')
    var el2 = document.querySelector('#text')
    if (query.toLowerCase().includes('temple') || query.toLowerCase().includes('thailand')){
      el.setAttribute('visible',false)
      el2.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#temple')
      document.querySelector('#temple').play()
    }
    else if (query.toLowerCase().includes('alps')) {
      el.setAttribute('visible',false)
      el2.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#alps')
      document.querySelector('#alps').play()
    } 
    else if (query.toLowerCase().includes('beach') || query.toLowerCase().includes('rocky')) {
      el.setAttribute('visible',false)
      el2.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#rocky-beach')
      document.querySelector('#rocky-beach').play()
    } 
    else if (query.toLowerCase().includes('water')) {
      el.setAttribute('visible',false)
      el2.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#water')
      document.querySelector('#water').play()
    } 
    else if (query.toLowerCase().includes('amsterdam')) {
      el.setAttribute('visible',false)
      el2.setAttribute('visible',false)
      document.querySelector('a-videosphere').setAttribute('src','#city')
      document.querySelector('#city').play()
    } 
    else {
      el.setAttribute('visible',true)
      el2.setAttribute('visible',true)
      el2.setAttribute('value','Didn\'t catch that')
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
        var URL = 'https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1';

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

            var i  =1;
            console.log(result.length);                    //  set your counter to 1
            //document.getElementById('facts').style.display = "block";
            function myLoop (result) {
                  //  create a loop function
               setTimeout(function () {    //  call a 3s setTimeout when the loop is called

                  document.getElementById('facts').innerHTML = result[i];      //  your code here
                  i++;                     //  increment the counter
                  if (i < result.length) {            //  if the counter < 10, call the loop function
                     myLoop(result);             //  ..  again which will trigger another
                  }                        //  ..  setTimeout()
               }, 6000)
            }


            myLoop(result);

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
