import {
  FaCloud,
  FaCloudDownloadAlt,
  FaShareAlt,
  FaUserShield,
} from "react-icons/fa";
const Service = [
  {
    name: "Easy Sharing",
    description:
      "Share your images easily with custom links and privacy settings.",
    icon: <FaShareAlt />,
  },
  {
    name: "Unlimited Storage",
    description: "No limit on the number of images you can upload and store.",
    icon: <FaCloud />,
  },
  {
    name: "User Authentication",
    description:
      "Secure login and OAuth support with integration with popular providers like Google and Facebook.",
    icon: <FaUserShield />,
  },
];

function Services() {
  return (
    <div className="bg-slate-100 h-[1200px] sm:h-[500px] flex flex-col justify-center items-center md:1 md:mt-4">
      <div class="relative mx-auto max-w-5xl text-center">
        <span className="text-gray-700 my-3 font-semibold flex items-center justify-center  uppercase tracking-wider">
          Why choose us
        </span>
        <h2 className="block w-full text-slate-800 font-bold  text-3xl sm:text-4xl">
          Easily manage and organize your images
        </h2>
        <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
          PikClick offers a range of affordable plans to fit every budget,
          ensuring you get the most value for your investment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {Service.map((item, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all ease-in-out cursor-pointer bg-white p-6 w-60 h-50 rounded-lg shadow-md border border-slate-400 flex flex-col justify-center items-center"
          >
            <div>{item.icon}</div>
            <h2 className="text-lg font-bold mb-2 mt-5 text-center">
              {item.name}
            </h2>
            <p className="text-gray-500 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
