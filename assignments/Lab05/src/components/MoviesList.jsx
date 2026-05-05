import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const retrieveMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await MovieDataService.getAll();
      setMovies(response.data.movies || []);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to load movies from the backend.");
    } finally {
      setLoading(false);
    }
  };

  const retrieveRatings = async () => {
    try {
      const response = await MovieDataService.getRatings();
      setRatings(response.data.filter(Boolean));
    } catch (requestError) {
      console.error(requestError);
      setRatings([]);
    }
  };

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const findByTitle = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await MovieDataService.findByTitle(searchTitle.trim());
      setMovies(response.data.movies || []);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to search movies by title.");
    } finally {
      setLoading(false);
    }
  };

  const findByRating = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!searchRating) {
        await retrieveMovies();
        return;
      }
      const response = await MovieDataService.findByRating(searchRating);
      setMovies(response.data.movies || []);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to search movies by rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-gap">
      <section className="hero-panel">
        <h1>Explore the movie catalog</h1>
        <p>
          Search by title or MPAA rating, then open a movie to inspect its plot
          and related reviews from MongoDB.
        </p>
      </section>

      <section className="content-panel">
        <Form className="search-grid">
          <Form.Group controlId="searchTitle">
            <Form.Label>Search by title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a movie title"
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
            />
          </Form.Group>
          <Button
            type="button"
            variant="primary"
            className="btn-brand"
            onClick={findByTitle}
            disabled={loading}
          >
            Find Title
          </Button>

          <Form.Group controlId="searchRating">
            <Form.Label>Search by rating</Form.Label>
            <Form.Select
              value={searchRating}
              onChange={(event) => setSearchRating(event.target.value)}
            >
              <option value="">All ratings</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            type="button"
            variant="outline-dark"
            onClick={findByRating}
            disabled={loading}
          >
            Find Rating
          </Button>
        </Form>
      </section>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {loading ? (
        <section className="content-panel text-center">
          <Spinner animation="border" role="status" />
        </section>
      ) : (
        <Row className="g-4">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} md={6} xl={4}>
              <Card className="movie-card">
                <Card.Body className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <Card.Title className="mb-0">{movie.title}</Card.Title>
                    <span className="meta-pill">{movie.rated || "N/A"}</span>
                  </div>
                  <Card.Text className="muted-copy">
                    {(movie.plot || "Plot is not available.").slice(0, 180)}
                    {movie.plot && movie.plot.length > 180 ? "..." : ""}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to={`/movies/${movie._id}`} className="btn-brand">
                      View Reviews
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && !movies.length ? (
        <section className="empty-state">
          <h1>No movies found</h1>
          <p>Try another title keyword or choose a different rating.</p>
        </section>
      ) : null}
    </div>
  );
}

export default MoviesList;
