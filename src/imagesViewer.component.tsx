import React, { useEffect, useState } from 'react';

import imagesViewerStyles from './imagesViewer.module.scss';

const ImagesViewer = ({images, imagesFolder, setIsImagesViewer}) => {
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [currImage, setCurrImage] = useState(images[0]);


    useEffect(() => {
        if(currImageIndex < 0){
            setCurrImageIndex(images.length - 1);
        }
        else if(currImageIndex > images.length - 1){
            setCurrImageIndex(0);
        }
        else{
            setCurrImage(images[currImageIndex]);
        }
    }, [currImageIndex, images])

    useEffect(() => {
        const lOrRArrowKeyDown = (event) => {
            if(event.key === "ArrowLeft"){
                if(currImageIndex > 0){
                    setCurrImageIndex(currImageIndex - 1);
                }
                else{
                    setCurrImageIndex(images.length - 1);
                }
            }
            else if(event.key === "ArrowRight"){
                if(currImageIndex < images.length - 1){
                    setCurrImageIndex(currImageIndex + 1);
                }
                else{
                    setCurrImageIndex(0);
                }
            }
        }

        window.addEventListener('keydown', lOrRArrowKeyDown);

        return () => {
            window.removeEventListener('keydown', lOrRArrowKeyDown);
        }
    }, [currImageIndex, images.length]);

    useEffect(() => {
        const escapeKeyDown = (event) => {
            if(event.key === "Escape"){
                setIsImagesViewer(false);
            }
        }

        window.addEventListener('keydown', escapeKeyDown)

        return () => {
            window.removeEventListener('keydown', escapeKeyDown)
        }
    }, [setIsImagesViewer])

    return(
        <div className={imagesViewerStyles.modal} onClick={(e) => {
            if((e.target as HTMLElement).tagName === 'DIV'){
                setIsImagesViewer(false);
            }
        }}>
            { images.length > 1 &&
                <button
                    onClick={(e) => {setCurrImageIndex(currImageIndex - 1)}}
                    className={`${imagesViewerStyles.arrow} ${imagesViewerStyles.left}`}
                    title="Image précédente"
                >
                &lt;
                </button>
            }
            <img src={require(imagesFolder + currImage + '.webp')} alt={currImage}/>
            { images.length > 1 &&
                <button
                    onClick={() => setCurrImageIndex(currImageIndex + 1)}
                    className={`${imagesViewerStyles.arrow} ${imagesViewerStyles.right}`}
                    title="Image suivante"
                >
                &gt;
                </button>
            }

            <button onClick={() => setIsImagesViewer(false)} title="Fermer la modale">X</button>

            <ul className={`${imagesViewerStyles.scrollPoints}`}>
            {
                images.map((image, index) => (
                <li key={image}>
                    <button className={`${index === currImageIndex ? imagesViewerStyles.active : ''}`} onClick={() => setCurrImageIndex(index)}></button>
                </li>
                ))
            }
            </ul>
        </div>
    )
}

export default ImagesViewer;