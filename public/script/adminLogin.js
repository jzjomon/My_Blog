function validateEmail() {
    let text = document.querySelector('#email').value
    if (text === '') {
        document.querySelector('#warningEmail').innerHTML = "email cannot be empty";
        document.querySelector('#warningEmail').style.color = "red";
        return false;
    } else {
        document.querySelector('#warningEmail').innerHTML = "";
        return true;
    }
}
function validatePassword() {
    let text = document.querySelector('#password').value
    if (text === "") {
        document.querySelector('#warningPassword').innerHTML = "password cannot be empty";
        document.querySelector('#warningPassword').style.color = "red";
        return false;
    } else {
        document.querySelector('#warningPassword').innerHTML = "";
        return true;
    }
}
function validateAll() {
    validateEmail()
    validatePassword()
    if (validateEmail() && validatePassword()) {
        const formdata = {};
        formdata.email = document.querySelector('#email').value
        formdata.password = document.querySelector('#password').value;
        fetch('admin/doLogin', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        }).then((res) => res.json()).then((res) => {
            if (res.login) {
                window.location.href = "admin/home?page=1"
            }else {
                document.querySelector('#warningPassword').innerHTML = "invalid credentials";
                document.querySelector('#warningPassword').style.color = "red";
                document.querySelector('#warningEmail').innerHTML = "invalid credentials";
                document.querySelector('#warningEmail').style.color = "red";
                setTimeout(() => {
                    document.querySelector('#warningPassword').innerHTML = "";
                    document.querySelector('#warningEmail').innerHTML = "";
                }, 2000);
            }
        })
        return true
    } else {
        return false
    }
}
const forgotPassAlert = () => {
    swal({
        title: 'Are you sure ?',
        input: "text",
        text: "Enter your email id",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then(res => {
        if (res.value.length > 0) {
            window.location.href = "/resetPass?admin=true&mail=" + res.value;
            swal("Reset link succesfully sent to your email", "please check your email and reset password", "success")
            
        } else {
            swal("Something went wrong !", "", "warning")
        }
    })
}