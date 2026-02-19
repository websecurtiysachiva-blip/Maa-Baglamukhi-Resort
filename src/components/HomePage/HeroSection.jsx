import Laptop from "../../assets/Laptop.avif";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#F5C6C4] via-[#D8A8C0] to-[#9DA7AE] text-black pt-24 pb-40 text-center overflow-hidden">

      <h1 className="text-5xl font-semibold leading-tight max-w-3xl mx-auto">
        All-in-One Software Powering SME Growth At Every Step
      </h1>

      <p className="mt-6 text-gray-700 max-w-xl mx-auto">
        Stay ahead of the curve with solutions that are designed for tomorrow's
        challenges.
      </p>

      <button className="mt-8 bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
        Get Started
      </button>

      <div className="relative mt-20 flex justify-center">

        {/* Laptop */}
        <img
          src={Laptop}
          alt="Laptop"
          className="w-[700px] relative z-10"
        />
        

      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full h-15  bg-gradient-to-br from-[#F5C6C4] via-[#D8A8C0] to-[#9DA7AE] text-black">
        <h1 className="text-center text-black mt-4"> Trusted by 1,000,000+Business Across The Globe</h1>
      </div>

    </section>
  );
};

export default Hero;
