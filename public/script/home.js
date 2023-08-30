const search = () =>{
    const input = document.querySelector('#searchInput');
    const value = input.value;
    input.value = null;
    if(value != ""){
        window.location.href = "/specificView?name="+value;
    }else{
        swal("Search input is empty","","warning")
    }
}