var msg_div = document.getElementById("msg")
var time_container = document.getElementById("time-container")
var msg_para = document.getElementById("msg-para")
var end_btn = document.getElementById("btn-end")

function checkStorage(){	
browser.storage.local.get("time")
.then((value) => {
  if(value.time){
    let time = value.time.split('-');
    let start_time = time[0]
    let end_time = time[1]
    msg_para.innerText =  `In a Loop from ${start_time} sec to ${end_time} sec`;
    time_container.style.display = "none";
    end_btn.style.display = "block"
    console.log(value)
   }
 })
}

 let start_hr_i = document.getElementById("start-hr");
 let start_min_i = document.getElementById("start-min")
 let start_sec_i = document.getElementById("start-sec")
 let end_hr_i = document.getElementById("end-hr")
 let end_min_i = document.getElementById("end-min")
 let end_sec_i = document.getElementById("end-sec")
 let start_btn = document.getElementById("btn-start")
    
    
 start_btn.addEventListener("click", () => {
  try{

    var start_hr = parseInt(start_hr_i.value);
    var start_min = parseInt(start_min_i.value);
    var start_sec = parseInt(start_sec_i.value);
    var end_hr = parseInt(end_hr_i.value);
    var end_min = parseInt(end_min_i.value);
    var end_sec = parseInt(end_sec_i.value);
    
    var start_time_in_sec = start_hr * 3600 + start_min * 60 + start_sec;
    var end_time_in_sec = end_hr * 3600 + end_min * 60 + end_sec;
    var duration = end_time_in_sec - start_time_in_sec;

    if(start_hr_i.value.length == 0 || start_min_i.value.length == 0 || start_sec_i.value.length == 0 || end_hr_i.value.length == 0 || end_min_i.value.length == 0 || end_sec_i.value.length == 0){
      msg_para.innerText = "All the fields are required"	    
    }

     else if(duration < 0) {
       msg_para.innerText = "End Time cannot be greater than start time"
     }
    
     else if (start_time_in_sec === end_time_in_sec) {
       msg_para.innerText = "The Start and End Time are Same";
      }
     else{
     browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
         var activeTab = tabs[0];
	 browser.tabs.sendMessage(activeTab.id, { start_time: start_time_in_sec, end_time: end_time_in_sec, id: activeTab.id });
         time_container.style.display = "none";
         msg_div.style.display = "block";
	 checkMessge();
      });
     }
     } catch(e){
        msg_para.innerText = "Invalid Input"
     }
    })

function checkMessge(){
 browser.runtime.onMessage.addListener((message) => {
   if(message.status == 0){
     msg_para.innerText = "Duration too long"
     time_container.style.display = "block";
   } else {
     checkStorage()	   
   }	 
 })
  	
}

if(end_btn){
  end_btn.addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, { start_time: null });
    });
  time_container.style.display = "block";
  msg_div.style.display = "none";

 })
}

checkStorage();

