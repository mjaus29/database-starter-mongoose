"use server";

import dbConnect from "../db";
import Review from "../models/review";

import mongoose from "mongoose";
import { unstable_cache as cache, revalidateTag } from "next/cache";

async function _getReviewsAndRating(productId: string) {
  await dbConnect();
  const reviews = await Review.find({ productId });

  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return { reviews, averageRating };
}

export const getReviewsAndRating = cache(
  _getReviewsAndRating,
  ["getReviewsAndRating"],
  {
    tags: ["getReviewsAndRating"],
    revalidate: 60,
  }
);

export async function createReview(review: Review) {
  await dbConnect();
  try {
    const newReview = await Review.create(review);

    revalidateTag("getReviewsAndRating");
    return newReview._id.toString();
  } catch (err) {
    console.error(err);
    throw new Error("Error creating review");
  }
}
