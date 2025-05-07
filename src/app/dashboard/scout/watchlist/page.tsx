import PlayerCard from "@/components/cards/player";

export default function Watchlist() {
  return (
    <div>
      <div className=" grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            first_name: "Price",
            last_name: "Ugochukwu",
            position: "Midfielder",
            rating: "4.5",
            profile_image: "/logo.jpg",
          },
          {
            first_name: "James",
            last_name: "Montgomery",
            position: "Midfielder",
            rating: "2.5",
            profile_image: "/logo.jpg",
          },
        ].map((item) => (
          <PlayerCard key={item?.first_name} {...item} />
        ))}
      </div>
    </div>
  );
}
