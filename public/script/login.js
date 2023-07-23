function validateEmail(){
    let text = document.querySelector('#email').value 
    if(text === ''){
        document.querySelector('#warningEmail').innerHTML = "email cannot be empty";
        document.querySelector('#warningEmail').style.color = "red";
        return false;
    }else{
        document.querySelector('#warningEmail').innerHTML = "";
        return true;
    }
}
function validatePassword(){
    let text = document.querySelector('#password').value 
    if(text === ""){
        document.querySelector('#warningPassword').innerHTML = "password cannot be empty";
        document.querySelector('#warningPassword').style.color = "red";
        return false;
    }else{
        document.querySelector('#warningPassword').innerHTML = "";
        return true;
    }
}
function validateAll(){
    validateEmail()
    validatePassword()
    if(validateEmail() && validatePassword()){
        const formdata = {};
        formdata.email = document.querySelector('#email').value
        formdata.password = document.querySelector('#password').value;
        fetch('/reqhome',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formdata)
        }).then(()=>{
            window.location.href='/home';
        })
        
        return true
    }else{
        return false
    }
}