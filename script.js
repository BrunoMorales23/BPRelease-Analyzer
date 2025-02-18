document.getElementById('fileInput').addEventListener('change', function() {
    var file = this.files[0];
    var fileName = file ? file.name : '';
    document.getElementById('fileName').textContent = 'Selected file: ' + fileName;
});