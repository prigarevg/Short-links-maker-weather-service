import React from 'react'

export const LinkCard= ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Short link:<a href={link.to} target="_blank" rel="noopener norefferrer">{link.to}</a></p>
            <p>Source:<a href={link.from} target="_blank" rel="noopener norefferrer">{link.from}</a></p>
            <p>Click count:<strong>{link.clicks}</strong></p>
            <p>Creation date:<strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}