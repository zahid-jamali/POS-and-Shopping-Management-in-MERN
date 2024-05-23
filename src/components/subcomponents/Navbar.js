import { Link } from "react-router-dom";

const Navbar = () => {
    const user=JSON.parse(sessionStorage.getItem('user'));

    return (
      <>
        {sessionStorage.length > 0 ? (
          <div className="mynav">
            <h2>Qonkar Task 1</h2>
            <p>Staff: {user.Name} {user.isAdmin ? <><div className="adminBulb"></div></> : <div className="sellerBulb"></div>}</p>
            <div className="navUl">
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/order-history">Order History</Link>
                </li>
                {user.isAdmin && (
                  <>
                    <li>
                      <Link to="/add-products">Add Products</Link>
                    </li>
                    <li>
                      <Link to="/update-stock">Manage Stocks</Link>
                    </li>
                    <li>
                      <Link to="/view-staff">All Staff</Link>
                    </li>
                    <li>
                      <Link to="/add-staff">Add Staff</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="mynav">
            <h2>Qonkar Task 1</h2>
            <div className="navUl">
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </>
    );
  };

export default Navbar;