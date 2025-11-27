import React, { useState } from 'react';
// Social media icon SVG paths
const socialIcons = {
  linkedin: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
  instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.624 4.909 4.909.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.624 4.771-4.909 4.909-1.265.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.148-4.77-1.624-4.909-4.909-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.251 1.624-4.77 4.909-4.909 1.265-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.949s.014 3.668.072 4.949c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.949.072s3.668-.014 4.949-.072c4.354-.2 6.78-2.618 6.979-6.98.06-1.281.074-1.689.074-4.949s-.014-3.668-.072-4.949c-.199-4.358-2.618-6.78-6.979-6.98-1.281-.059-1.689-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" />
};

// Reusable component for clean social icon rendering
const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-[#588157] hover:text-green-600 transition-colors duration-200"
  >
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      {icon}
    </svg>
  </a>
);

// Team member data - replace with your real information and social links
const teamMembers = [
  {
    name: 'SRIJEETA BISWAS',
    role: 'Founder & CEO',
    bio: 'Srijeeta is the heart and vision of GreenRemedy. She leads GreenRemedy with a bold vision to make Ayurveda-inspired wellness accessible to everyone. She combines entrepreneurial spirit with strategic leadership, guiding the company’s growth, partnerships, and customer-first approach.',
    image: '/Srijeeta.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/srijeeta-biswas-663b1a2a6/',
      
      instagram: 'https://www.instagram.com/sri_biswas103/',
    },
  },
  {
    name: 'ANUSHKA BANIK',
    role: 'Chief Architect of Digital Commerce',
    bio: 'Anushka is the mind behind the technology that powers GreenRemedy. She believes great e-commerce is more about creating an effortless experience. From secure checkouts to smooth navigation, she ensures every digital touchpoint feels intuitive, reliable, and beautifully designed.',
    image: '/Anushka.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/anushka-banik-9423a32a8/',
    
      instagram: 'https://www.instagram.com/anushka.banik.33/',
    },
  },
  {
    name: 'ANKITA PAUL',
    role: 'Lead Propulsion Engineer & Developer',
    bio: 'Ankita is the driving force behind GreenRemedy’s product innovation. With a passion for problem-solving, she transforms ideas into seamless features, making sure our digital storefront feels fast, responsive, and built to grow with our community, ensuring a seamless journey for every customer.',
    image: '/Ankita.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/ankita-paul-9b9961347/',
     
      instagram: 'https://www.instagram.com/ankita_paul2005/',
    },
  },
];

// Component to handle the contact form logic
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    console.log('Form data submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('Message Sent! Thank you for contacting us.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form className="max-w-xl mx-auto space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#5A5A5A] dark:text-[#CFCFCF]">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-[#588157] focus:border-[#588157] sm:text-sm bg-gray-100 dark:bg-[#333333] text-[#333333] dark:text-[#E8E8E8]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#5A5A5A] dark:text-[#CFCFCF]">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-[#588157] focus:border-[#588157] sm:text-sm bg-gray-100 dark:bg-[#333333] text-[#333333] dark:text-[#E8E8E8]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#5A5A5A] dark:text-[#CFCFCF]">Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-[#588157] focus:border-[#588157] sm:text-sm bg-gray-100 dark:bg-[#333333] text-[#333333] dark:text-[#E8E8E8]"
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center px-8 py-3 border-2 border-[#588157] text-base font-bold rounded-full shadow-sm text-white bg-[#588157] hover:bg-[#4a6b4b] dark:bg-[#8AA37B] dark:hover:bg-[#7a9479] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#588157] transition duration-300 ease-in-out transform hover:-translate-y-1"
          disabled={status === 'Sending...'}
        >
          {status === 'Sending...' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status && status !== 'Sending...' && (
        <p className="text-center mt-4 text-[#1D3520] dark:text-[#A8C7A5] font-semibold">{status}</p>
      )}
    </form>
  );
};

const AboutUs = () => {
  return (
    <div
      className="bg-cover bg-fixed bg-center text-[#333333] dark:text-[#E8E8E8] font-sans antialiased min-h-screen"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/33559627/pexels-photo-33559627.jpeg?cs=srgb&dl=pexels-delot-33559627.jpg&fm=jpg&_gl=1*3r17dn*_ga*MTgxNDkzMTA3OS4xNzUzMjg5MzQz*_ga_8JE65Q40S6*czE3NTYwMTg0MjMkbzUkZzEkdDE3NTYwMTg4NTgkajU5JGwwJGgw')` }}
    >
      <header className="bg-[#1D3520]/80 dark:bg-[#0E1B10]/80 text-white py-20 mb-16 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-4">
            Our Story
          </h1>
          <p className="text-xl sm:text-2xl font-light text-green-100">
            Blending the wisdom of Ayurveda with modern living.
          </p>
        </div>
      </header>

      {/* Introduction Block */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 mb-20 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-[#1D3520] dark:text-[#A8C7A5]">
            Rooted in Tradition, Designed for You
          </h2>
          <p className="text-lg leading-relaxed text-[#5A5A5A] dark:text-[#CFCFCF]">
            Welcome to <span className="text-[#1E5631] font-bold dark:text-[#8AA37B]">🌱 GreenRemedy</span>. We are a passionate team dedicated to redefining wellness for the modern world. Our journey began with a profound respect for the ancient science of Ayurveda, a holistic path to health that has stood the test of time. We believe that this age-old wisdom, combined with contemporary design and a seamless user experience, can empower everyone to live a more balanced and vibrant life.
          </p>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/19941549/pexels-photo-19941549.jpeg"
            alt="A representation of natural wellness and Ayurveda"
            className="rounded-2xl shadow-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Our Principles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-white/70 dark:text-[#A8C7A5]">
          Our Guiding Principles
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Principle 1: Purity */}
          <div className="bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] dark:bg-[#3A453B] flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#1E5631] dark:text-[#8AA37B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5l6 6m0 0l-6 6m6-6h-14m14-6a9 9 0 100 18 9 9 0 000-18z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1D3520] dark:text-[#A8C7A5]">Purity & Potency</h3>
            <p className="text-[#5A5A5A] dark:text-[#CFCFCF]">
              We meticulously source the highest quality, organic ingredients. Every product is free from artificial additives, ensuring pure and potent formulations.
            </p>
          </div>

          {/* Principle 2: Authenticity */}
          <div className="bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF5E6] dark:bg-[#453F3A] flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#B8860B] dark:text-[#D4A92B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10.5h1l-2 3-2-3h1m5 0h-1l-2 3-2-3h1m5 0h-1l-2 3-2-3h1"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1D3520] dark:text-[#A8C7A5]">Authentic Formulations</h3>
            <p className="text-[#5A5A5A] dark:text-[#CFCFCF]">
              Our products are meticulously crafted based on traditional Ayurvedic texts, ensuring that the ancient wisdom is preserved in every batch.
            </p>
          </div>

          {/* Principle 3: Innovation */}
          <div className="bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-[#E6F3FF] dark:bg-[#3A454C] flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#588157] dark:text-[#8AA37B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674m-4.674 0a3.337 3.337 0 01-3.337-3.337V9.5a3.337 3.337 0 013.337-3.337h4.674a3.337 3.337 0 013.337 3.337v4.163a3.337 3.337 0 01-3.337 3.337m-4.674 0a3.337 3.337 0 003.337 3.337h4.674a3.337 3.337 0 003.337-3.337v-4.163m-3.337-4.163V6.163a3.337 3.337 0 00-3.337-3.337H9.663m0 0a3.337 3.337 0 00-3.337 3.337v4.163m3.337 0h4.674"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1D3520] dark:text-[#A8C7A5]">Modern Innovation</h3>
            <p className="text-[#5A5A5A] dark:text-[#CFCFCF]">
              We leverage modern technology and research to ensure our products are not only effective but also delightful and easy to incorporate into your daily routine.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 text-white/70 dark:text-[#A8C7A5]">
          Meet Our Founders
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <img
                className="w-44 h-48 rounded-full object-cover mb-6 border-4 border-[#8AA37B] dark:border-[#588157] shadow-md"
                src={member.image}
                alt={member.name}
              />
              <h3 className="text-2xl font-semibold text-[#1D3520] dark:text-[#A8C7A5]">
                {member.name}
              </h3>
              <p className="text-lg text-[#588157] dark:text-[#8AA37B] font-medium mb-4">
                {member.role}
              </p>
              <p className="text-[#5A5A5A] dark:text-[#CFCFCF] leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Social Media Links */}
              <div className="flex justify-center space-x-6">
                <SocialIcon href={member.social.linkedin} icon={socialIcons.linkedin} label="LinkedIn Profile" />
                <SocialIcon href={member.social.twitter} icon={socialIcons.twitter} label="Twitter Profile" />
                <SocialIcon href={member.social.instagram} icon={socialIcons.instagram} label="Instagram Profile" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Let's Connect Section - New Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 dark:bg-[#252525]/90 rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 mb-20 backdrop-blur-sm">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8 text-[#1D3520] dark:text-[#A8C7A5]">
          Let's Connect
        </h2>
        <p className="text-center text-lg text-[#5A5A5A] dark:text-[#CFCFCF] mb-10">
          We're here to answer any questions, listen to your feedback, and help you on your wellness journey.
        </p>
        <ContactForm />
      </section>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-20">
        <p className="text-xl font-medium text-white/70 dark:text-[#CFCFCF] mb-6">
          Ready to explore the power of natural wellness?
        </p>
        <a
          href="/products"
          className="inline-flex items-center px-12 py-4 border-2 border-[#588157] text-base font-bold rounded-full shadow-sm text-[#588157] bg-white dark:bg-[#252525] hover:bg-[#588157] hover:text-white dark:hover:bg-[#8AA37B] dark:hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#588157] transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Explore Our Products
        </a>
      </div>

      {/* Footer Section - Now with matching header styling */}
      <footer className="bg-[#1D3520]/80 dark:bg-[#0E1B10]/80 text-[#E8E8E8] dark:text-[#A8C7A5] py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Address Block */}
          <div>
            <h3 className="text-xl font-bold mb-4">GreenRemedy</h3>
            <p className="text-sm">123 Wellness Way, Suite 400<br />Ayuville, AV 54321<br />India</p>
          </div>

          {/* Contact Block */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: <a href="mailto:contact@greenremedy.com" className="hover:underline">contact@greenremedy.com</a></p>
            <p className="text-sm">Phone: +91 98765 43210</p>
          </div>

          {/* Social Media Block */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <SocialIcon href="#" icon={socialIcons.linkedin} label="LinkedIn Profile" />
              <SocialIcon href="#" icon={socialIcons.twitter} label="Twitter Profile" />
              <SocialIcon href="#" icon={socialIcons.instagram} label="Instagram Profile" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;