//window.onload=function(){const e=document.getElementById("notify"),t=document.getElementById("name_inp"),n=document.getElementById("em_inp"),o=document.getElementById("text_inp");document.querySelectorAll("text-field__input");document.getElementById("contact-form").addEventListener("submit",function(i){i.preventDefault(),this.contact_number.value=1e5*Math.random()|0,emailjs.sendForm("service_i41cqyx","template_szpi0hd",this).then(function(){console.log("SUCCESS!"),t.value="",n.value="",o.value="",e.classList="notify_submit",e.innerHTML="Письмо отправлено"},function(i){console.log("FAILED...",i),t.value="",n.value="",o.value="",e.classList="notify_submit_fail",e.innerHTML="Что-то пошло не так..."})})};


    window.onload = function() {

    document.querySelectorAll("text-field__input");
    document.getElementById("contact-form").addEventListener("submit", function(i) {
        i.preventDefault(), this.contact_number.value = 1e5 * Math.random() | 0, emailjs.sendForm("service_i41cqyx", "template_szpi0hd", this).then(function() {
            console.log("SUCCESS!"),
             inputName.value = "",
              inputMail.value = "",
               textArea.value = "",
                notify.classList = "notify_submit",
                 notify.innerHTML = "Письмо отправлено"
        }, function(i) {
            console.log("FAILED...", i),
             inputName.value = "",
              inputMail.value = "",
               textArea.value = "",
                notify.classList = "notify_submit_fail",
                 notify.innerHTML = "Что-то пошло не так. Попробуйте позже."
        })
    })
};


