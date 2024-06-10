import React, { useEffect, useState, useRef, createRef } from 'react';

import carouselStyles from './carousel.module.scss';

import AHrefed from './aHrefed.component.tsx';
import ImagesViewer from './imagesViewer.component.tsx';

const Carousel = ({name, items, imagesFolder, pageIndex, scrollCarousel, setScrollCarousel, uOrDArrowKeyDown, wheel}) => {
    const [isImagesViewer, setIsImagesViewer] = useState(false);

    const [images, setImages] = useState(null);

    useEffect(() => {
        if(!images){
            setIsImagesViewer(false);
        }
        else{
            setIsImagesViewer(true);
        }
    }, [images]);

    useEffect(() => {
        if(isImagesViewer === false){
            setImages(null);
        }
    }, [isImagesViewer]);

    const carouselRefs = useRef(items.map(() => createRef()));

    const [currSlides, setCurrSlides] = useState([0, 1]);

    useEffect(() => {
        if(currSlides && scrollCarousel.length > 0 && name === scrollCarousel[0] && !isImagesViewer){
            const item = items.filter(filteredItem => filteredItem.name === scrollCarousel[1])[0];
            const index = items.findIndex(findIndex => findIndex === item);

            if(index%2){
                setCurrSlides([index - 1, index]);
                setScrollCarousel([]);
            }
            else{
                setCurrSlides([index, index + 1]);
                setScrollCarousel([]);
            }
        }
    }, [scrollCarousel, items, name, isImagesViewer, setScrollCarousel])

    const lOrRArrowKeyDown = (event) => {

        const currPage = Math.round((document.documentElement.scrollTop) / (window.innerHeight - 1))

        if(event.key === "ArrowLeft" && currSlides[0] !== 0 && currPage === pageIndex && !isImagesViewer){
            setCurrSlides(currSlides.map(slide => slide - 2));
        }
        else if(event.key === "ArrowRight" &&  currSlides[1] < items.length - 1 && currPage === pageIndex && !isImagesViewer){
            setCurrSlides(currSlides.map(slide => slide + 2));
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', lOrRArrowKeyDown);

        return () => {
            window.removeEventListener('keydown', lOrRArrowKeyDown);
        }
    }, [currSlides, isImagesViewer]);

    useEffect(() =>{
        if(isImagesViewer){
            window.removeEventListener('keydown', uOrDArrowKeyDown);
            window.removeEventListener('wheel', wheel);
        }

        return () => {
            window.addEventListener('keydown', uOrDArrowKeyDown);
            window.addEventListener('wheel', wheel);

            window.removeEventListener('wheel', (event) => {
                event.preventDefault();
            });
        }
    }, [isImagesViewer])

    return(
        <div className={`${carouselStyles.carrousel}`}>
            { isImagesViewer &&
                <ImagesViewer images={images} imagesFolder={imagesFolder} setIsImagesViewer={setIsImagesViewer}/>
            }
            <div className={carouselStyles.wrapper}>
                {
                    items.map((item, index) => {
                        if(currSlides.includes(index)){
                            return (
                                <article
                                    ref={carouselRefs.current[index]}
                                    key={item.name}
                                >
                                    <div className={carouselStyles.articleInfos}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        { item.url && <p>Plus d'informations disponible ici : <AHrefed href={item.url} text={item.url}/></p> }
                                        <img
                                            src={require(imagesFolder + item.images[0] + '.webp')}
                                            alt={item.images[0]}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImages(item.images);
                                            }}
                                        />
                                    </div>
                                </article>
                            )
                        }
                        return false;
                    })
                }
            </div>
            <ul className={`${carouselStyles.scrollPoints}`}>
                {
                    items.map(function(item, index) {
                        if(index%2 === 0){
                            return(
                                <li key={item.title}>
                                    <button
                                        className={`${currSlides.includes(index) ? carouselStyles.active: ''}`}
                                        onClick={() => {setCurrSlides([index, index + 1])}}></button>
                                </li>
                            )
                        }

                        return false;
                    })
                }
            </ul>
        </div>
    )
}

export default Carousel;