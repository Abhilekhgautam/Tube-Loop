var id;

browser.runtime.onMessage.addListener((message) => {
    // Handle the message here
    if(message.start_time){
        let start_time_in_sec = parseInt(message.start_time);
        let end_time_in_sec = parseInt(message.end_time);
     
        let media = document.querySelector("video")
	let total_video_duration = media.duration;

	if(end_time_in_sec >  total_video_duration || start_time_in_sec > total_video_duration){
          console.log("Very Large Loop Duration")
          browser.runtime.sendMessage({status: 0})         		
	}
	else{
          console.log((end_time_in_sec - start_time_in_sec) >= total_video_duration)	  	
          media.currentTime = start_time_in_sec;

          browser.storage.local.set({time: start_time_in_sec + "-" + end_time_in_sec})
        
          id = setInterval(() =>{
          media.currentTime = start_time_in_sec
          console.log("Reset");
          }, (end_time_in_sec - start_time_in_sec) * 1000)
	}
    } else {
	browser.storage.local.clear();
        clearInterval(id);
	console.log("Loop Cleared")
    }
});
