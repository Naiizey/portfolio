import React from "react"

const aHrefed = ({href, text}) => {
    return(
        <a href={href} target="_blank" rel="noreferrer">{text}</a>
    )
}

export default aHrefed