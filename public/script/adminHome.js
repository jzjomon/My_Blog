const showImg = () =>{
    const img = document.querySelector("#getImg")
    const showImage = document.querySelector('#showImage');
    const selectedImg = img.files
    for(x of selectedImg){
        const image = document.createElement('img')
        image.style.cssText = `width:150px; margin:3px;`
        image.src=URL.createObjectURL(x)
        showImage.appendChild(image);
    }
}