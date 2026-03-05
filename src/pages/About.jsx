import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <div className="font-raleway text-gray-800 px-4 md:px-0 overflow-hidden">
      {/* 1. Our Story Section - Removed extra padding to touch edges */}
      <section className="bg-[#F9E4CB] px-4 md:px-0 flex items-center min-h-[500px]">
        <div className="container mx-auto grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div
            {...fadeIn}
            className="py-16 md:py-24 pr-4 md:pr-12 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 uppercase tracking-wider">
              Our <span className="font-bold">Story</span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-lg">
              Seoul Mirage was born from a passion for Korean skincare
              innovation and a commitment to creating luxury products that
              deliver exceptional results.
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="w-full">
            <img
              src="/assets/ab1.png"
              alt="Story"
              className="w-full h-full min-h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Our Journey Section - White Background Seamless */}
      <section className="bg-white flex items-center min-h-[500px]">
        <div className="container mx-auto grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div {...fadeIn} className="order-2 md:order-1 w-full">
            <img
              src="/assets/ab2.png"
              alt="Journey"
              className="w-full h-full min-h-[400px] object-cover"
            />
          </motion.div>
          <motion.div
            {...fadeIn}
            className="order-1 md:order-2 py-16 md:py-24 pl-4 md:pl-16 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-wider">
              Our Journey
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
              <p>
                Founded in 2018 by skincare enthusiast and biochemist Dr.
                Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
                heart of Seoul’s beauty district.
              </p>
              <p>
                Today, Seoul Mirage has grown into a global brand, but our
                commitment to purity, efficacy, and luxury remains unchanged.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Philosophy Section - Grid with no gap to match image */}
      <section className="bg-white border-t border-gray-100 min-h-[600px]">
        <div className="container mx-auto grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div {...fadeIn} className="py-16 md:py-24 pr-4 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-wider">
              Our Philosophy
            </h2>
            <p className="mb-10 text-gray-600 italic">
              Founded in 2018, we strive for purity and innovation.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: "Purity",
                  desc: "We source the highest quality ingredients to ensure our products are free from harmful chemicals.",
                },
                {
                  title: "Innovation",
                  desc: "We continuously research new formulations that harness tradition and science.",
                },
                {
                  title: "Sustainability",
                  desc: "We are committed to ethical practices and eco-friendly packaging.",
                },
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-black pl-6">
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeIn} className="w-full">
            <img
              src="/assets/ab3.png"
              alt="Philosophy"
              className="w-full h-full min-h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Our Ingredients Section (Same as your request - Perfect) */}
      <section className="bg-[#F9E4CB] py-20 text-center">
        <div className="container mx-auto">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6 uppercase tracking-wider">
              Our Ingredients
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              We believe in the power of nature enhanced by science.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop",
                name: "Botanical Extracts",
                text: "From ginseng to green tea, our products harness the power of traditional Korean botanicals.",
              },
              {
                img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1000&auto=format&fit=crop",
                name: "Fermented Ingredients",
                text: "We utilize the ancient Korean practice of fermentation to enhance potency.",
              },
              {
                img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
                name: "Scientific Compounds",
                text: "Our formulations incorporate cutting-edge compounds like peptides and hyaluronic acid.",
              },
            ].map((ing, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="relative group overflow-hidden rounded-sm cursor-pointer"
              >
                {/* Zoom effect on hover */}
                <img
                  src={ing.img}
                  alt={ing.name}
                  className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-left text-white">
                  <motion.h4 className="text-xl font-bold mb-2 uppercase tracking-wider">
                    {ing.name}
                  </motion.h4>

                  {/* Text reveals on hover */}
                  <p className="text-xs sm:text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 leading-relaxed text-gray-200">
                    {ing.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
