import React, { useState, useRef } from 'react';

const Cloudinary = () => {
    const preset_name = "Lmroch";
    const cloud_name = "dlcubj61o";

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const uploadImage = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

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
    };

    const handleContainerClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div 
            onClick={!loading ? handleContainerClick : null}
            style={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: loading ? "wait" : "pointer",
                position: "relative"
            }}
        >
            <input
                type="file"
                name="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={uploadImage}
            />

            {!image && !loading && (
                <h4 style={{ fontSize: "14px", margin: "0" }}>+ Foto</h4>
            )}

            {loading && (
                <h4 style={{ fontSize: "14px", margin: "0" }}>Subiendo...</h4>
            )}

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