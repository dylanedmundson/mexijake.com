import { Link } from 'react-router-dom';
//TODO: fix so it uses react-bootstrap navbar

export default function NavBar(props) {
    return(
        <nav className="navbar navbar-light bg-light navbar-expand-sm">
            {/* Brand (TODO: change out with MexiJake Logo) */}
            <div to="/" className="navbar-brand">MexiJake Music</div>
            
            {/* Toggler/collapse button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/events" className="nav-link">Events</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/shop" className="nav-link">Shop</Link>
                    </li>
                    <li className="navbar-item">
                    <   Link to="/cart" className="nav-link">Cart</Link>
                </li>
            </ul>
        </div>
        </nav>
    );
}
