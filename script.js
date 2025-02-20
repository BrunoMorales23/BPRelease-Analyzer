/* This is intended to show in screen the FileName as a validation that the file is uploaded correctly
document.getElementById('fileInput').addEventListener('change', function() {
    var file = this.files[0];
    var fileName = file ? file.name : '';

    document.getElementById('fileName').textContent = 'Selected file: ' + fileName;
});

document.getElementById('DOMContentLoaded', () =>{
    fetch(file)
    .then (response => response.text())
    .then (data =>{
        var parser = new DOMParser ();
        var xml = parser.parseFromString(data , file)
        document.getElementById('preview').textContent = data;
    })
}) */

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
    
        if (!file) {
            console.error("No se seleccionó ningún archivo.");
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = function(e) {
            const xmlText = e.target.result; // Contenido del archivo en texto
            console.log("Contenido XML:\n", xmlText);
    
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml"); // Parsea el XML
    
            // Validar si hay errores en el XML
            const parseError = xmlDoc.querySelector("parsererror");
            if (parseError) {
                console.error("Error al analizar el XML:", parseError.textContent);
                return;
            }
    
            console.log("Documento XML:", xmlDoc);

            function getObjectsFromXML(xmlDoc) {
                // Selecciona todas las etiquetas <object>
                const objects = xmlDoc.querySelectorAll("object"); 
                const result = [];
            
                objects.forEach(obj => {
                    const id = obj.getAttribute("id");
                    const name = obj.getAttribute("name");
                    
                    // Solo agregar si tiene id y name
                    if (id && name) {
                        result.push({ id, name });
                    }
                });
            
                return result;
            }
            
            // Suponiendo que xmlDoc ya contiene el XML cargado
            const objectsArray = getObjectsFromXML(xmlDoc);
            console.log(objectsArray);
        };
    
        reader.onerror = function() {
            console.error("Error al leer el archivo.");
        };
    
        reader.readAsText(file); // Leer el archivo como texto
    });
