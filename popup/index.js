let start_hr_i = document.getElementById("start-hr");
        let start_min_i= document.getElementById("start-min")
        let start_sec_i = document.getElementById("start-sec")
        let end_hr_i = document.getElementById("end-hr")
        let end_min_i = document.getElementById("end-min")
        let end_sec_i = document.getElementById("end-sec")
        let msg_div = document.getElementById("msg")
        let start_btn = document.getElementById("btn-start")
        let end_btn  = document.getElementById("btn-end")


       
        start_btn.addEventListener("click", () => {

            let start_hr = parseInt(start_hr_i.value);
            let start_min = parseInt(start_min_i.value);
            let start_sec = parseInt(start_sec_i.value);
            let end_hr = parseInt(end_hr_i.value);
            let end_min = parseInt(end_min_i.value);
            let end_sec = parseInt(end_sec_i.value);
    
            let start_time_in_sec = start_hr * 3600  + start_min * 60 + start_sec;
            let end_time_in_sec = end_hr * 3600 + end_min * 60 + end_sec;
            let duration = end_time_in_sec - start_time_in_sec;

            if(duration < 0){
                msg_div.innerText = "End Time cannot be greater than start time"
                return;
            }

            if(start_time_in_sec === end_time_in_sec){
                msg_div.innerText = "The Start and End Time are Same";
                return;
            }
    

            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                var activeTab = tabs[0];
                browser.tabs.sendMessage(activeTab.id, { start_time: start_time_in_sec, end_time: end_time_in_sec });
            });
            
            if(start_sec && end_sec || start_hr && end_hr || start_min && end_min){
                console.log("clicked")
            } else {
              msg_div.innerText = "All Fields are required"
            }
        })

        end_btn.addEventListener("click", () => {
            browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var activeTab = tabs[0];
                browser.tabs.sendMessage(activeTab.id, { message: "Loop ended" });
            });
        })
       

