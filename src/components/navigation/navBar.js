import React from 'react'
import { A } from 'hookrouter'

function NavigationBar(props) {
    return (
        <div className="navigation-container">
            <div className="navigation-link-container">
                <div className="navigation-link">
                    <A className="navigation-link-tag" href="/">Home</A>
                </div>
                <div className="navigation-link">
                    <A className="navigation-link-tag" href="/add-book">Add Book</A>
                </div>
                <div className="navigation-link">
                    <A onClick={() => props.logout()} className="navigation-link-tag" href="/login">Login</A>
                </div>
                <div className="navigation-link">
                    <A className="navigation-link-tag" href="/signup">Sign Up</A>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar