const showAlert = (mail) => {
    const newPass = document.querySelector('#newPass').value;
    const again = document.querySelector('#again').value;
    if(newPass.length == 0 || again.length == 0){
        swal("Something went wrong !", "", "warning");
    }else{
        if(newPass.length < 6){
            swal("Use a strong password !", "", "warning");
        }else{
            if(newPass == again){
                const bodyObj = {};
                bodyObj.password = again;
                bodyObj.email = mail;
                fetch('/updateReset',{
                    method:'post',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({data:bodyObj})
                }).then(res => res.json())
                .then(res => {
                    if(res.reset){
                        swal({
                            title: 'Successfully Reseted Your Password ',
                            text: "go to login page",
                            type: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'GO'
                        }).then(res => {
                            if(res.value){
                                window.location.href = "http://localhost:8080/"
                            }
                        })
                    }else{
                        swal("Something went wrong !", "", "warning");
                    }
                })
            }else{
                swal("Passwords are not same !", "", "warning");
            }
        }
        }
    }
    