import React from 'react';

import smallCardListStyles from './smallCardsList.module.scss'

import AHrefed from './aHrefed.component.tsx';

const SmallCardsList = ({items, imagesFolder}) => {
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
                                                <p
                                                    key={url[1]}
                                                    onClick={() => {

                                                    }}
                                                >
                                                    {url[1]}
                                                </p>
                                            )})
                                        }
                                        { !Array.isArray(item.url) &&
                                            <AHrefed href={item.url} text={item.url}/>
                                        }
                                    </p>
                                }
                                <img src={require(imagesFolder + item.images + ".png")} alt={item.name}></img>
                            </article>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SmallCardsList;