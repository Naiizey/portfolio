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
    }, [currImageIndex])

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
            <img src={require(imagesFolder + currImage + '.png')} alt={currImage}/>
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
        </div>
    )
}

export default ImagesViewer;