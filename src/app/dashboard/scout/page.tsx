export default function DashboardHome() {
  return (
    <div className=" w-full flex flex-col gap-5">
      {/* upcoming match and fixtures */}
      <section className=" w-full flex flex-col md:flex-row gap-4 items-stretch h-full">
        <div className=" w-full flex-3/5  flex flex-col gap-4">
          <div className="h-96 bg-gray-200 rounded-xl"></div>
          {/* stats */}
          <div className=" h-96 rounded-xl bg-purple-100"></div>
        </div>
        {/* Active competitions and Recent Player Evaluations */}
        <div className=" w-full flex-2/5 rounded-xl flex flex-col gap-4">
          <div className=" w-full bg-green-100 rounded-xl p-5">
            <h6 className=" text-lg font-bold text-gray-400">*****</h6>
            <div className=" grid grid-col-1 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className=" rounded-lg h-20 w-full bg-red-100"
                ></div>
              ))}
            </div>
          </div>
          <div className=" w-full bg-yellow-100 rounded-xl p-5">
            <h6 className=" text-lg font-bold text-gray-400">*****</h6>
            <div className=" grid grid-col-1 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className=" rounded-lg h-20 w-full bg-blue-100"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
