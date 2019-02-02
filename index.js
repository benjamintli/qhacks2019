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
          channelId: 'UC6AXBF-78lNa3_TjAIWZWmQ'
  });
  request.execute(function(response)  {                                                                                    
          $('#results').empty()
          var srchItems = response.result.items;   
          if (!srchItems || srchItems.length < 1) {
            document.getElementById('not-found').style.visibility = 'visible';
            return
          }                
          $.each(srchItems, function(index, item) {
          vidTitle = item.snippet.title;  
          vidThumburl =  item.snippet.thumbnails.default.url;                 
          vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:204px;height:128px"></pre>';                   

          $('#results').append('<pre>' + vidTitle + vidThumbimg +  '</pre>');                      
  })  
})  
}

