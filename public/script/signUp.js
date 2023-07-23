function validateFname(){
    let text = document.querySelector('#fname').value
    let regex =/^[A-Za-z]+\s?$/
    if(regex.test(text)){
        document.querySelector('#warningFname').innerHTML = ""
        return true;
    }else{
        document.querySelector("#warningFname").innerHTML = "enter your first name";
        document.querySelector('#warningFname').style.color = "red"
        return false;
    }
}
function validateLname(){
    let text = document.querySelector('#lname').value
    let regex =/^[A-Za-z]+\s?$/
    if(regex.test(text)){
        document.querySelector("#warningLname").innerHTML = ""
        return true;
    }else{
        document.querySelector("#warningLname").innerHTML = "enter your last name";
        document.querySelector('#warningLname').style.color = "red"
        return false;
    }
}
function validateEmail(){
    let text = document.querySelector('#email').value
    let regex =/^[A-Za-z0-9_]+@[a-zA-z0-9]+(\.[a-zA-Z]+)$/
    if(regex.test(text)){
        document.querySelector("#warningEmail").innerHTML = ""
        return true;
    }else{
        document.querySelector("#warningEmail").innerHTML = "enter your email id";
        document.querySelector('#warningEmail').style.color = "red"
        return false;
    }
}
function validatePass(){
    let text = document.querySelector('#pass').value
    let regex =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if(regex.test(text)){
        document.querySelector('#warningPass').innerHTML = "";
        return true;
    }else{
        document.querySelector('#warningPass').innerHTML = "password must be alphanumeric and atleast 6 characters";
        document.querySelector('#warningPass').style.color = "red"
        return false
    }
}
function validatePassword(pass){
    let text = document.querySelector('#pass').value 
    if(pass===text){
        document.querySelector('#warningPassword').innerHTML = ""
        return true
    }else{
        document.querySelector('#warningPassword').innerHTML = "passwords are not same"
        document.querySelector('#warningPassword').style.color = "red"
        return false
    }
}
function validateAll(){
    if(validateFname() && validateLname() && validateEmail() && validatePass() && validatePass()){
        let formdata = {};
        formdata.fname = document.querySelector('#fname').value
        formdata.lname = document.querySelector('#lname').value;
        formdata.email = document.querySelector('#email').value;
        formdata.pass = document.querySelector('#pass').value;
        formdata.password = document.querySelector('#password').value;
        fetch('/reqHome',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formdata)
        }).then(()=>{
            window.location.href = '/home'
        })
        return true
    }else{
        document.querySelector("#warningPass").innerHTML = "password must be alphanumeric and atleast 6 characters";
        document.querySelector('#warningPass').style.color = "red"
        document.querySelector("#warningEmail").innerHTML = "enter your email id";
        document.querySelector('#warningEmail').style.color = "red"
        document.querySelector("#warningLname").innerHTML = "enter your last name";
        document.querySelector('#warningLname').style.color = "red"
        document.querySelector("#warningFname").innerHTML = "enter your first name";
        document.querySelector('#warningFname').style.color = "red";
        return false
    }
}
