//get the form from DOM (Document object model) 
var form = document.getElementById('email-form');
form.onsubmit = function(event){
    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);

    //open the request
    xhr.open('POST','https://node-server-email.azurewebsites.net/email')
    //send the form data
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var json = JSON.stringify(Object.fromEntries(formData));
    xhr.send(json);


    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            form.reset(); //reset form after AJAX success.
        }
    }

    //Dont submit the form.
    return false; 
}
