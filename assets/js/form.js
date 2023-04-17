//get the form from DOM (Document object model) 
var form = document.getElementById('email-form');
form.onsubmit = function(event){
    event.preventDefault();




    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);

    form.querySelector('.loading').classList.add('d-block');

    //open the request
    //xhr.open('POST','https://node-server-email.azurewebsites.net/email')
    //send the form data
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var json = JSON.stringify(Object.fromEntries(formData));
    // xhr.send(json);


    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         form.querySelector('.loading').classList.remove('d-block');
    //         form.querySelector('.sent-message').classList.add('d-block');
    //         form.reset(); //reset form after AJAX success.
    //     }
    // }

    fetch('https://node-server-email.azurewebsites.net/email',{
        method : 'POST',
        body : json,
        headers: {'X-Requested-With': 'XMLHttpRequest', "Content-Type": "application/json;charset=UTF-8"}
    }).then((response)=>{
        if( response.ok ) {
            return response.text();
        } else {
            throw new Error(`${response.status} ${response.statusText}`); 
        }
    }).then((data)=>{

      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      if (data.trim().toUpperCase() == 'OK') {
        form.querySelector('.loading').classList.remove('d-block');
        form.querySelector('.sent-message').classList.add('d-block');
        form.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    }).catch((error) => {
      displayError(form, error);
    });


    //Dont submit the form.
    return false; 
}

  function displayError(form, error) {
    form.querySelector('.loading').classList.remove('d-block');
    form.querySelector('.error-message').innerHTML = "Sorry! Form submission failed";
    form.querySelector('.error-message').classList.add('d-block');
  }
