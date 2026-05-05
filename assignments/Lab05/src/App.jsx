import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddReview from "./components/AddReview";
import Login from "./components/Login";
import Movie from "./components/Movie";
import MoviesList from "./components/MoviesList";

const USER_STORAGE_KEY = "movie-reviews-user";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (nextUser) => {
    setUser(nextUser);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    navigate("/");
  };

  return (
    <div className="app-shell">
      <Navbar expand="lg" className="app-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-mark">
            Movie Reviews
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              <Nav.Link as={Link} to="/">
                Movies
              </Nav.Link>
              {user ? (
                <>
                  <Navbar.Text className="user-badge">
                    {user.name} ({user.id})
                  </Navbar.Text>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="page-body">
        <Container>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movies/:id" element={<Movie user={user} />} />
            <Route
              path="/movies/:id/review"
              element={<AddReview user={user} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="*"
              element={
                <section className="empty-state">
                  <h1>Page not found</h1>
                  <p>The page you requested does not exist.</p>
                </section>
              }
            />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
