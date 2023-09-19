var id;

browser.runtime.onMessage.addListener((message) => {
    // Handle the message here
    if(message.hasOwnProperty('start_time')){
        let start_time_in_sec = message.start_time;
        let end_time_in_sec = message.end_time;
     
        let media = document.querySelector("video")
        media.currentTime = start_time_in_sec;
        
        id = setInterval(() =>{
         media.currentTime = start_time_in_sec
         console.log("Reset");
        }, (end_time_in_sec - start_time_in_sec) * 1000)
    } else if (message.hasOwnProperty('message')){
        clearInterval(id);
    }
});