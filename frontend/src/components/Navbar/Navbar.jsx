const Navbar = ({ userName, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // This will handle the actual logout logic in the parent component
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="main">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    {userName ? ( // Show dropdown if userName exists
                        <div className="dropdown">
                            <button className="dropbtn">Hello, {userName}</button> {/* Displaying the email */}
                            <div className="dropdown-content">
                                <a href="#" onClick={handleLogout}>Logout</a>
                            </div>
                        </div>
                    ) : (
                        <a href="/contact">Contact</a>
                    )}
                </div>
            </nav>
            <div className="sidebar">
                <a href="/home" className="sidebar-item">
                    <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                </a>
            </div>
        </div>
    );
};
