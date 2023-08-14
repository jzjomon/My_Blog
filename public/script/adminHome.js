const showImg = () => {
    const img = document.querySelector("#getImg")
    const showImage = document.querySelector('#showImage');
    document.querySelector('#showImage').innerHTML = null;
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

const slNo = document.querySelectorAll('.slNo');
const sl = document.querySelectorAll('.sl');
let i = 1;
for (x of sl) {
    x.innerHTML = i;
    i++
}
let j = 1;
for (x of slNo) {
    x.innerHTML = j;
    j++
}

const deletePost = (id) =>{
    const cofirmation = confirm('do you want to delete this post?');
    if(cofirmation){
        fetch('/admin/deletePost',{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({postId:id})
        }).then(response => response.json())
        .then(res =>{
            if(res.delete){
                window.location.reload()
            }else{
                alert('something went wrong')
            }
        })
    }
}

const signout = () =>{
    localStorage.clear();
    sessionStorage.clear();
    location.assign('/admin/signout')
} 
