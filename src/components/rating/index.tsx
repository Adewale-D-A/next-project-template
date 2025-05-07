import SolidStarIcon from "./solid-star";
import StarIcon from "./star";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className=" flex gap-2">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <div key={index}>
            {rating >= index + 1 ? (
              <SolidStarIcon className="w-5 h-5 text-[#F3DD16]" />
            ) : (
              <StarIcon className="w-5 h-5" />
            )}
          </div>
        );
      })}
    </div>
  );
}
