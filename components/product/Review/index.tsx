import Stars from "../Stars";
import { Card, CardContent } from "../../ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Review from "@/lib/models/review";

export default function ReviewDisplay({ review }: { review: Review }) {
  const initials = review.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="grid gap-4 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="bg-gray-200 text-gray-800 flex items-center justify-center">
            <AvatarFallback className="text-lg font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{review.author.name}</h3>
            <div className="flex items-center gap-0.5">
              <Stars rating={review.rating} />
            </div>
          </div>
        </div>
        <p>{review.content}</p>
      </CardContent>
    </Card>
  );
}
