import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";

function Movie({ user }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getMovie = async (movieId) => {
    setLoading(true);
    setError("");
    try {
      const response = await MovieDataService.get(movieId);
      setMovie(response.data);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await MovieDataService.deleteReview({
        review_id: reviewId,
        user_id: user.id,
      });
      await getMovie(id);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to delete this review.");
    }
  };

  if (loading) {
    return (
      <section className="content-panel text-center">
        <Spinner animation="border" role="status" />
      </section>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!movie) {
    return (
      <section className="empty-state">
        <h1>Movie not found</h1>
        <p>No detail could be loaded for the selected movie.</p>
      </section>
    );
  }

  return (
    <div className="section-gap">
      <section className="detail-panel">
        <div className="d-flex flex-wrap justify-content-between gap-3">
          <div>
            <h1>{movie.title}</h1>
            <div className="d-flex flex-wrap gap-2">
              <span className="meta-pill">{movie.rated || "N/A"}</span>
              {movie.runtime ? (
                <span className="meta-pill">{movie.runtime} minutes</span>
              ) : null}
              {movie.year ? <span className="meta-pill">{movie.year}</span> : null}
            </div>
          </div>
          <div>
            <Button
              as={Link}
              to={`/movies/${movie._id}/review`}
              state={{ currentMovie: movie }}
              className="btn-brand"
            >
              Add Review
            </Button>
          </div>
        </div>
        <p className="plot-text mt-4 mb-0">
          {movie.plot || "Plot is not available for this movie."}
        </p>
      </section>

      <section className="review-panel">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
          <h2 className="h4 mb-0">Reviews</h2>
          <span className="muted-copy">
            {movie.reviews?.length || 0} review{movie.reviews?.length === 1 ? "" : "s"}
          </span>
        </div>

        {movie.reviews?.length ? (
          movie.reviews.map((review) => {
            const isOwner = user && user.id === review.user_id;
            return (
              <article key={review._id} className="review-item">
                <div className="review-meta">
                  <strong>{review.name}</strong>
                  <span>
                    {moment(review.date).format("DD/MM/YYYY HH:mm")}
                  </span>
                </div>
                <p className="mb-0">{review.review}</p>
                {isOwner ? (
                  <div className="review-actions">
                    <Button
                      as={Link}
                      to={`/movies/${movie._id}/review`}
                      state={{ currentMovie: movie, currentReview: review }}
                      variant="outline-dark"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </article>
            );
          })
        ) : (
          <p className="muted-copy mb-0">
            There are no reviews for this movie yet.
          </p>
        )}
      </section>
    </div>
  );
}

export default Movie;
