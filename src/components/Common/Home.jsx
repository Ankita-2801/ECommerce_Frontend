
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// High quality herbal / nature-themed Unsplash images
const heroData = [
     {
    text: "  No Chemicals. No Additives.🍃",
    image:
      "https://plus.unsplash.com/premium_photo-1744079117309-8f105805a5c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVyYiUyMGhlYWxpbmclMjBtb21lbnRzfGVufDB8fDB8fHww",
  },
  {
    text: "Let's cheers with herbal milk nut shake 🪴",
    image:
      "https://images.unsplash.com/photo-1521146490572-acf652a27fb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVkaWNpbmUlMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    text: "Pure Herbal Wellness🌿",
    image:
      "https://plus.unsplash.com/premium_photo-1726769198572-542339268a7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaWNpbmUlMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    text: "Nature's Healing Touch🍃",
    image:
      "https://media.istockphoto.com/id/2152439466/photo/natural-hair-care-portrait-of-young-woman-in-exotic-tropical-foliage.jpg?s=612x612&w=0&k=20&c=IzkMMAWQ-6ZZp8hialA_mUQISbrXAmsBBy0ko11OLdw=",
  },
  {
    text: "Organic Living, Healthy You🌿",
    image:
      "https://media.istockphoto.com/id/697862770/photo/indian-ayurvedic-dietary-supplement-called-chyawanprash-chyavanaprasha-is-a-cooked-mixture-of.jpg?s=612x612&w=0&k=20&c=uI7Fd9Gc8GVg8c02M-dJZ1qI_kd-TkR6KWz3WHyIx_s=",
  },
  {
    text: "Power of Herbs, Touch of Purity.🍃",
    image:
      "https://media.istockphoto.com/id/1186197556/photo/hair-remedy-of-all-purpose-ayurvedic-medicinal-herb-i-e-neem-or-nim-or-indian-lilac-in-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=LMOtQKeBrnkSSeTmD215oerKMNPj7MZpwr5VMj-KNBw=",
  },
  {
    text: "Herbal Goodness, Every Sip.🌿",
    image:
      "https://images.unsplash.com/photo-1659052867667-75c701b85527?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlcmJhbCUyMGdvb2QlMjBuZXNzJTIwZXZlcnklMjBzaXB8ZW58MHx8MHx8fDA%3D",
  },
  
  {
    text: " Nature’s Cure, Bottled for You.🍃",
    image:
      "https://plus.unsplash.com/premium_photo-1681154818769-d5bdae6d9a35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwYm90dGxlfGVufDB8fDB8fHww",
  },
  {
    text: "Where Tradition Meets Wellness. 🌿",
    image:
      "https://media.istockphoto.com/id/123376184/photo/traditional-indian-ayurvedic-oil-foot-massage.webp?a=1&b=1&s=612x612&w=0&k=20&c=q_BTVTUPEHNEdVtmUI0RjGQaVfjgfMxG6Q3oQz17dfE=",
  },
  {
    text: " Revive Your Energy, Naturally.🍃",
    image:
      "https://plus.unsplash.com/premium_photo-1683141213983-b38ba149a025?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxyZXZpdmUlMjBlbmVyZ3klMjBuYXR1cmFsbHl8ZW58MHx8MHx8fDA%3D",
  },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prev) =>
      prev < heroData.length - 1 ? prev + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url(${heroData[slideIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen flex items-center px-10 md:px-32 relative"
    >
      {/*  Overlay removed, clean background image only */}

      <div className="z-10 grid gap-10">
        {/* Animated Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={heroData[slideIndex].text}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl text-white font-bold drop-shadow-lg"
          >
            {heroData[slideIndex].text}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex + "-cta"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#"
              className="bg-white inline-flex items-center justify-between gap-6 md:gap-10 p-2 rounded-full pl-4 shadow-lg hover:scale-105 transition"
            >
              <span className="text-lg md:text-xl font-semibold text-gray-800">
                Let's Shop Together
              </span>
              <span className="bg-teal-600 p-3 md:p-4 grid place-items-center text-white rounded-full">
                <FaArrowRight />
              </span>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-8 md:mt-12">
          {heroData.map((_, index) => (
            <span
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition ${
                index === slideIndex
                  ? "bg-teal-600"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}