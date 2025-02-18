import dbConnect from "../db";
import Review from "../models/review";

export async function getReviewsAndRating(productId: string) {
  await dbConnect();
  const reviews = await Review.find({ productId });

  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return { reviews, averageRating };
}
