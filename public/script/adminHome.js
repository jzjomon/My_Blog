const showImg = () => {
    const img = document.querySelector("#getImg")
    const showImage = document.querySelector('#showImage');
    document.querySelector('#showImage').innerHTML = null;
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
const deletePost = (id) => {
    swal({
        title: 'Are you sure?',
        text: "This file will permanently deleted !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(function (res) {
        if (res.value) {
            fetch('/admin/deletePost', {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId: id })
            }).then(response => response.json())
                .then(res => {
                    if (res.delete) {
                        swal(
                            'Deleted!',
                            'Post has been deleted.',
                            'success'
                        ).then(() => {
                            window.location.reload()
                        })
                    }
                })
        }

    })
}

const signout = () => {
    swal({
        title: 'Are You Sure ?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign Out'
    }).then(res => {
        if (res.value) {
            localStorage.clear();
            sessionStorage.clear();
            location.assign('/admin/signout')
        }
    })
}

const block = (id) => {
    swal({
        title: 'Are you sure?',
        text: "Block this person",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Block'
    }).then(res => {
        if (res.value) {
           window.location.href="/admin/blockUser?id="+id;
        }
    })
}

const unblock = (id) => {
    swal({
        title: 'Are you sure?',
        text: "Unblock this person",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Unblock'
    }).then(res => {
        if (res.value) {
           window.location.href="/admin/unblockUser?id="+id;
        }
    })
}
const creator = (id) => {
    swal({
        title: 'Are you sure?',
        text: "Add this person as a creator ?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept'
    }).then(res => {
        if (res.value) {
           window.location.href="/admin/acceptRequest?id="+id;
        }
    })
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
const manageTopic = () => {
    const value = document.querySelector('#manageTopicValue').value;
    if(value != "Manage Topics"){
        window.location.href = `/admin/specificView?cat=${value}`
    }
}