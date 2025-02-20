"use server";

import { unstable_cache as cache, revalidateTag } from "next/cache";

import Product from "@/lib/models/product";
import dbConnect from "@/lib/db";

export async function createProduct(product: Product) {
  try {
    await dbConnect();
    const newProduct = await Product.create(product);
    return newProduct._id.toString();
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
}

async function _getProductById(_id: string) {
  await dbConnect();
  try {
    const product = await Product.findById(_id).lean();
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getProductById = cache(_getProductById, ["getProductById"], {
  tags: ["Product"],
  revalidate: 60,
});

export async function updateProduct(productId: string, data: Partial<Product>) {
  await dbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });

    revalidateTag("Product");
    return updatedProduct._id.toString();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteProduct(productId: string): Promise<boolean> {
  await dbConnect();
  try {
    const result = await Product.deleteOne({ _id: productId });

    revalidateTag("Product");
    return result.deletedCount === 1;
  } catch (error) {
    console.error("Error deleting product", error);
    return false;
  }
}

export async function getProducts({
  page = 1,
  name,
  minPrice,
  category,
}: {
  page?: number;
  name?: string;
  minPrice?: number;
  category?: string;
}) {
  await dbConnect();

  const limit = 5;
  const skip = (page - 1) * limit;

  const filters: any = {};

  if (name) {
    filters.name = { $regex: name, $options: "i" };
  }

  if (category && category !== "all") {
    filters.category = category;
  }

  if (minPrice) {
    filters.price = { $gte: minPrice };
  }

  try {
    const products = await Product.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          category: 1,
          image: { $first: "$images" },
          averageRating: {
            $avg: "$reviews.rating",
          },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);
    return products;
  } catch (error) {
    console.log(error);
  }
}
