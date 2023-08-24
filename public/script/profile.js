const logout = () => {
    swal({
        title: 'Are You Sure ?',
        text: "Log Out",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log Out'
    }).then(res => {
        if (res.value) {
            localStorage.clear();
            sessionStorage.clear();
            location.assign('/logout');
        }
    })
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
const updateAlert = () => {
    swal({
        title: 'Are You Sure ?',
        text: "Save this details",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save'
    }).then(res => {
        if (res.value) {
            document.theForm.submit();
        }
    })
}
const addPost = (data) => {
    var data = data;
    fetch('/admin/check', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data })
    }).then(res => res.json())
        .then(res => {
            let id = res.id;
            if (res.creator) {
                const myModal = new bootstrap.Modal('#staticBackdrop2');
                myModal.show();
            } else {
                swal({
                    title: 'Not A Content Creator?',
                    text: "Request to Admin",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Request'
                }).then((res) => {
                    if (res.value) {
                        fetch('/admin/requestCreator', {
                            method: "post",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: id })
                        }).then(res => res.json())
                            .then(res => {
                                if (res.requested) {
                                    swal(
                                        'Requested',
                                        "",
                                        'success'
                                    )
                                }
                            })
                    }

                })
            }
        })
}
const showUploadImg = () => {
    const img = document.querySelector("#getImg1")
    const showImage = document.querySelector('#showImage1');
    document.querySelector('#showImage1').innerHTML = null;
    const selectedImg = img.files;
    if (selectedImg.length > 3) {
        showImage.innerHTML = 'maximum 3 images !'
        showImage.style.color = 'red'
    } else {
        for (x of selectedImg) {
            const image = document.createElement('img')
            image.style.cssText = `width:150px; margin:3px;`
            image.src = URL.createObjectURL(x)
            showImage.appendChild(image);
        }
    }
}

const createPost = () => {
    swal({
        title: 'Are You Sure ?',
        text: "Create Post",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Create'
    }).then(res => {
        if (res.value) {
            swal("","","success").then(res => {
                document.theCreateForm.submit();
            })
        }
    })
}