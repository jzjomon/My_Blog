const showAlert = () => {
    const newPass = document.querySelector('#newPass').value;
    const again = document.querySelector('#again').value;
    const email = document.querySelector('#email').value;
    if(newPass == again){
        const bodyObj = {};
        bodyObj.password = again;
        bodyObj.email = email;
        fetch('/admin/updateReset',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({data:bodyObj})
        }).then(res => res.json())
        .then(res => {
            if(res.reset){
                let result = confirm('succesfully reseted password. Click OK to go to the login page');
                if(result){
                    window.location.href = "http://localhost:8080/admin"
                }
            }else{
                alert('something went wrong !')
            }
        })
    }else{
        alert('passwords are not same');
    }
}