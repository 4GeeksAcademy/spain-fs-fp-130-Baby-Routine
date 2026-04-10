import React from 'react'
import { useState } from 'react'

const Cloudinary = () => {

    const preset_name = "Lmroch";
    const cloud_name = "dlcubj61o"

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)


    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', preset_name)

        setLoading(true)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            const urlOptimizada = file.secure_url.replace('/upload/', '/upload/w_150,h_150,c_fill,g_face/');
            setImage(urlOptimizada);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {!image && !loading && (
                <>
                    <h4 style={{ fontSize: "14px", margin: "0" }}>+ Foto</h4>
                    <input
                        type="file"
                        name="file"
                        style={{ width: "90px", fontSize: "10px", marginTop: "5px" }} // Ajuste para que quepa en el círculo, busqueda de información del 09/04
                        onChange={(e) => uploadImage(e)}
                    />
                </>
            )}

            {loading && <h4 style={{ fontSize: "14px", margin: "0" }}>Subiendo...</h4>}

            {image && !loading && (
                <img
                    src={image}
                    alt="Perfil"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />
            )}
        </div>
    );
}

export default Cloudinary;