import React from 'react';

import smallCardListStyles from './smallCardsList.module.scss'

import AHrefed from './aHrefed.component.tsx';

const SmallCardsList = ({items, imagesFolder, setScrollCarousel}) => {
    return(
        <div className={smallCardListStyles.list}>
            {
                items.map((item) => {
                    return(
                        <div className={smallCardListStyles.card} key={item.name}>
                            <article>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                { item.url &&
                                    <p>
                                        { Array.isArray(item.url) &&
                                            item.url.map(url => {
                                                url = url.split("/");
                                                return (
                                                <button
                                                    key={url[1]}
                                                    onClick={() => {
                                                        setScrollCarousel(url);
                                                    }}
                                                >
                                                    {url[1]}
                                                </button>
                                            )})
                                        }
                                        { !Array.isArray(item.url) &&
                                            <AHrefed href={item.url} text={item.url}/>
                                        }
                                    </p>
                                }
                                <img src={require(imagesFolder + item.images + ".webp")} alt={item.name}></img>
                            </article>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SmallCardsList;