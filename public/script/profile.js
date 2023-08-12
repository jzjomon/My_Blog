const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/logout');
}
const showImg = () => {
    const img = document.getElementById('getImg')
    const showImg = document.getElementById('showimg')
    const selectedImages = img.files
    showImg.innerHTML = null
    for (x of selectedImages) {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(x);
        image.style.cssText = `width:100px; height:100px; margin:3px; border-radius:100%`
        showImg.appendChild(image);
    }
}
const saveProfile = () => {
    const result = confirm("do you want to save this details")
    if (result) {
        return true
    }else{
        return false
    }
}
const addPost = (data) =>{
    var data = data;
    fetch('/admin/check',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({data:data})
    }).then(res => res.json())
    .then(res => {
        if(res.creator){
            const addPost = document.querySelector('.addPost')
            addPost.setAttribute("data-bs-toggle","modal");
            addPost.setAttribute("data-bs-target","#staticBackdrop2");
        }else{
            const result = confirm('You are not a content creator. click "OK" to request to admin')
            if(result){
                fetch('/admin/requestCreator',{
                    method:"post",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({id:res.id})
                }).then(res => res.json())
                .then(res => {
                    if(res.requested){
                        alert('successfully requested')
                    }
                })
            }
        }
    })
}
const showUploadImg = () => {
    const img = document.querySelector("#getImg1")
    const showImage = document.querySelector('#showImage1');
    document.querySelector('#showImage1').innerHTML = null;
    const selectedImg = img.files;
    if(selectedImg.length > 3){
        showImage.innerHTML = 'maximum 3 images !'
        showImage.style.color = 'red'
    }else{
        for (x of selectedImg) {
            const image = document.createElement('img')
            image.style.cssText = `width:150px; margin:3px;`
            image.src = URL.createObjectURL(x)
            showImage.appendChild(image);
        }
    }
}