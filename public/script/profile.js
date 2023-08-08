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
