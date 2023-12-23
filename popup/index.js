var msg_div = document.getElementById("msg")
var end_btn = document.getElementById("btn-end")


browser.storage.local.get("start_time")
.then((value) => {
    msg_div.innerHTML = `In a Loop from ${value} sec`
})

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

        if (duration < 0) {
            msg_div.innerText = "End Time cannot be greater than start time"
            return;
        }
    
        if (start_time_in_sec === end_time_in_sec) {
            msg_div.innerText = "The Start and End Time are Same";
            return;
        }
    
        if (start_sec && end_sec || start_hr && end_hr || start_min && end_min) {
            console.log("clicked")
        } else {
            msg_div.innerText = "All Fields are required"
        }
    
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            var activeTab = tabs[0];
            browser.tabs.sendMessage(activeTab.id, { start_time: start_time_in_sec, end_time: end_time_in_sec });
        });
      } catch(e){
         msg_div.innerText = "Invalid Input"
         return;
      }
    })


end_btn.addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, { start_time: null });
    });
})


