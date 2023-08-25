const deletePost = (id) => {
    swal({
        title: 'Are You Sure ?',
        text: "Delete this post ",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then(res => {
        if(res.value){
            window.location.href = "/removePost?postId="+id;
        }
    })
}
const deleteAdminPost = (id) => {
    swal({
        title: 'Are You Sure ?',
        text: "Delete this post ",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then(res => {
        if(res.value){
            window.location.href = "/admin/deleteAdminPost?postId="+id;
        }
    })
}