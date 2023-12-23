var id;

browser.runtime.onMessage.addListener((message) => {
    // Handle the message here
    if(message.start_time){
        let start_time_in_sec = message.start_time;
        let end_time_in_sec = message.end_time;
     
        let media = document.querySelector("video")
        media.currentTime = start_time_in_sec;

        browser.storage.local.set({start_time: start_time_in_sec, end_time: end_time_in_sec})
        
        id = setInterval(() =>{
         media.currentTime = start_time_in_sec
         console.log("Reset");
        }, (end_time_in_sec - start_time_in_sec) * 1000)
    } else {
        clearInterval(id);
    }
});