var database = firebase.database();

chrome.extension.onRequest.addListener(function(request, tab, respond) {
    if (request.action == 'debug') {

        if (request.crud == 'create') {
            
                            // chrome.extension.getBackgroundPage().console.log(request.record.get(1));
                            chrome.extension.getBackgroundPage().console.log(request.record[1]);
            
                            firebase.database().ref("log/").push(request.record);
            
            
                        }
    }
});
