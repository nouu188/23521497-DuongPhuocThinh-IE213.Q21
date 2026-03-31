import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        id: req.body.user_id,
      };
      const date = new Date();

      await ReviewsDAO.addReview(movieId, userInfo, review, date);
      res.json({ status: "success" });
    } catch (e) {
      console.error(`apiPostReview error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const userId = req.body.user_id;
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.updateReview(reviewId, userId, review, date);

      const { modifiedCount } = ReviewResponse;
      if (modifiedCount === 0) {
        throw new Error("unable to update review - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(`apiUpdateReview error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (e) {
      console.error(`apiDeleteReview error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}
