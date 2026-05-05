import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";

function AddReview({ user }) {
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentMovie = location.state?.currentMovie || null;
  const currentReview = location.state?.currentReview || null;
  const isEditing = Boolean(currentReview);

  useEffect(() => {
    if (currentReview) {
      setReview(currentReview.review || "");
      return;
    }
    setReview("");
  }, [currentReview]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const saveReview = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (isEditing) {
        await MovieDataService.updateReview({
          review_id: currentReview._id,
          review,
          user_id: user.id,
        });
      } else {
        await MovieDataService.createReview({
          movie_id: id,
          review,
          name: user.name,
          user_id: user.id,
        });
      }

      navigate(`/movies/${id}`);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to save the review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-panel">
      <h1>{isEditing ? "Edit review" : "Write a review"}</h1>
      <p className="muted-copy">
        {currentMovie?.title
          ? `Movie: ${currentMovie.title}`
          : "Enter your review for the selected movie."}
      </p>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Form onSubmit={saveReview}>
        <Form.Group className="mb-3" controlId="reviewText">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Share what you think about this movie"
            required
          />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit" className="btn-brand" disabled={submitting}>
            {submitting
              ? "Saving..."
              : isEditing
                ? "Update Review"
                : "Submit Review"}
          </Button>
          <Button
            type="button"
            variant="outline-dark"
            onClick={() => navigate(`/movies/${id}`)}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default AddReview;
