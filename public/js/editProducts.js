function deleteBtn(img) {
    let deleteImg = document.getElementById(img);
    let deleteBtn = document.getElementById(`${img}_btn`);
    let images = document.getElementById('images');
    let auxArray = images.value.split(",");

    deleteImg.style.display = 'none';
    deleteBtn.style.display = 'none';
        
    auxArray = auxArray.filter(image => image != img)
    images.value = auxArray.join(',');
}