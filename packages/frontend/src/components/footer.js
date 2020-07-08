import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/footer.css";


const footer = () => {
    return (
        <>
        <footer className="footer-distributed">
            <div className="footer-center">
                <p className="footer-company-name">Copyright © 2019 - 2020 &nbsp;
                <Link to="/" className="footer-link">
                    Willis.com
                </Link>
                &nbsp;All Rights Reserved.</p>
            </div>
        </footer>
        </>
    )
}

export default footer;