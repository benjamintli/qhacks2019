var vrView = new VRView.Player('#vrview', {
  video: './tester.mp4'
  // is_stereo: true
});
function startListener(){
  document.getElementById('not-found').style.visibility = 'hidden';
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

function keyWordsearch(query){
  // Our unique API key
  gapi.client.setApiKey('AIzaSyBhHHQPdj6tzL_5HOWOII6vQ9c2bAWLz9A');
  gapi.client.load('youtube', 'v3', function() {
  makeRequest(query);
  });
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
          // return srchItems[0].id.videoId
          console.log(srchItems)
          document.getElementById('ui').style.display = 'none';   
          document.getElementById('yt').style.display = 'block';   
          
          // 'https://www.youtube.com/embed/r2zLcL8ffQg?enablejsapi=1&origin=http%3A%2F%2F127.0.0.1%3A8887&widgetid=1'
          document.getElementById('yt').src = 'https://www.youtube.com/embed/' + srchItems[0].id.videoId + '?autoplay=1' 

          $.each(srchItems, function(index, item) {
          vidTitle = item.snippet.title;  
          vidThumburl =  item.snippet.thumbnails.default.url;                 
          vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:204px;height:128px"></pre>';                   

          $('#results').append('<pre>' + vidTitle + vidThumbimg +  '</pre>');                      
  })  
})  
}
