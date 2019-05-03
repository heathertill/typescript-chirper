import * as React from 'react';
import { Link } from 'react-router-dom';



export interface NavBarProps {

}

const NavBar: React.SFC<NavBarProps> = () => {
    return (
        <>
            <div className="logoBar row justify-content-md-center sticky-top">
                <div className="header col-md-12 p-2">

                    <p className="text-center m-2">Chirper</p>
                    <Link className="btn btn-primary" to="/add">Add Chirp</Link>
                    <Link className="btn btn-primary" to="/">All Chirps</Link>
                </div>
            </div>




        </>

    );
}

export default NavBar;