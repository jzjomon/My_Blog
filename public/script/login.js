function validateEmail(){
    let text = document.querySelector('#email').value 
    let regex =/^[A-Za-z0-9_]+@[a-zA-z0-9]+(\.[a-zA-Z]+)$/
    if(regex.test(text)){
        document.querySelector('#warningEmail').innerHTML = "";
        return true;
    }else{
        document.querySelector('#warningEmail').innerHTML = "invalid email id";
        document.querySelector('#warningEmail').style.color = "red";
        return false;
    }
}
function validatePassword(){
    let text = document.querySelector('#password').value 
    let regex =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if(regex.test(text)){
        document.querySelector('#warningPassword').innerHTML = "";
        return true;
    }else{
        document.querySelector('#warningPassword').innerHTML = "incorrect password";
        document.querySelector('#warningPassword').style.color = "red";
        return false;
    }
}
function validateAll(){
    validateEmail()
    validatePassword()
    if(validateEmail() && validatePassword()){
        return true
    }else{
        document.querySelector('#warningPassword').innerHTML = "incorrect password";
        document.querySelector('#warningPassword').style.color = "red";
        document.querySelector('#warningEmail').innerHTML = "invalid email id";
        document.querySelector('#warningEmail').style.color = "red";
        document.querySelector('.forgot').style.color = "black"
        return false
    }
}