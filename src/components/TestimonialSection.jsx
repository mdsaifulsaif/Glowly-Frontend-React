import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Devon Lane",
    image: "/assets/BG (2).png",
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Cooper",
    image: "/assets/BG (3).png",
    text: "The quality of these products is unmatched. My skin has never felt so hydrated and glowing. Truly a premium experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Devon Lane",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
    rating: 5,
  },
  {
    id: 1,
    name: "Devon Lane",
    image: "/assets/BG (2).png",
    text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 mb-2">
            3940+ Happy Users
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#A68B77]">
            Don't just take our words
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          className="testimonial-swiper pb-16"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6">
                {/* User Image */}
                <div className="w-full md:w-48 h-56 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-2xl shadow-sm"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col text-left">
                  <div className="flex gap-1 text-[#E6A4B4] mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{item.text}"
                  </p>
                  <h4 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Styling for Custom Pink Dots */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #d1d1d1;
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #e6a4b4 ! from-inherit; /* Pink color from image */
          width: 12px;
          height: 12px;
        }
        .testimonial-swiper .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
