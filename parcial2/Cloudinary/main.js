const cloudname = "ds0ltvcwm"
const preset = "Precet_5C"

const inputArchivo = document.getElementById("fileinput")
const imagenPreview = document.getElementById("preview")
const imagenResultado = document.getElementById("resultado")

const botonSubir = document.getElementById("btnSubir")
const botonOtra = document.getElementById("btnOtra")

const textoEstado = document.getElementById("estado")
const cajaSubida = document.getElementById("uploadBox")
const seccionResultado = document.getElementById("resultSection")

let archivoSeleccionado = null

inputArchivo.addEventListener("change", () => {

    const archivo = inputArchivo.files[0]
    if(!archivo) return

    if(!archivo.type.startsWith("image/")){
        textoEstado.className="error"
        textoEstado.textContent="Solo imágenes permitidas"
        return
    }

    archivoSeleccionado = archivo
    imagenPreview.src = URL.createObjectURL(archivo)
    imagenPreview.style.display="block"
})
//se sube la imagen
botonSubir.addEventListener("click", () => {

    if(!archivoSeleccionado){
        textoEstado.className="error"
        textoEstado.textContent="Selecciona una imagen"
        return
    }

    botonSubir.disabled=true
    textoEstado.className="loading"
    textoEstado.textContent="Procesando..."

    const formData = new FormData()
    formData.append("file", archivoSeleccionado)
    formData.append("upload_preset", preset)

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,{
        method:"POST",
        body:formData
    })
    .then(res=>{
        if(!res.ok){
            throw new Error("Respuesta incorrecta del servidor")
        }
        return res.json()
    })
    .then(data=>{

        const urlTransformada = data.secure_url.replace(
            "/upload/",
            "/upload/w_500,h_500,c_fill,g_face,q_auto,f_auto,e_cartoonify:20,e_brightness:30,e_contrast:20,r_50/"
        )


        imagenResultado.src = urlTransformada
        imagenResultado.style.display="block"

        seccionResultado.style.display="block"
        botonSubir.disabled=false

        textoEstado.className="success"
        textoEstado.textContent="Imagen lista"
    })
    .catch(()=>{
        textoEstado.className="error"
        textoEstado.textContent="Error en la subida"
        botonSubir.disabled=false
    })
})
// se reinicia
botonOtra.addEventListener("click", ()=>{
    archivoSeleccionado=null
    inputArchivo.value=""
    imagenPreview.style.display="none"
    imagenResultado.style.display="none"
    seccionResultado.style.display="none"
    textoEstado.textContent=""
})