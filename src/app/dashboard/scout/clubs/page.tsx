export default function Clubs() {
  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className=" w-full bg-amber-100 rounded-2xl min-h-16 hover:scale-125 transition-all "
        ></div>
      ))}
    </div>
  );
}
