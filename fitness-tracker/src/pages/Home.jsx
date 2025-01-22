import React from "react";
import { motion } from "framer-motion";
import feature1 from "../assets/feature1.jpg";
import feature2 from "../assets/feature2.jpg";
import feature3 from "../assets/feature3.jpg"; // Using feature2 as fallback for feature3

const FeatureCard = ({ title, description }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
    className="group p-8 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
  >
    <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-gray-500 to-[#00bfa5] flex items-center justify-center text-white font-bold">
      {title.charAt(0)}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
      {description}
    </p>
  </motion.div>
);

const WorkoutPlanCard = ({ title, image, index }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
    className="group relative overflow-hidden rounded-2xl bg-gray-800"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
    </div>
    <div className="p-6 relative">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">Customized plans for maximum results</p>
      <div className="flex items-center text-[#00bfa5] hover:text-[#009d8a] transition-colors cursor-pointer">
        Learn more 
        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
  };

  const features = [
    {
      title: "Activity Tracking",
      description: "Real-time monitoring of your workouts and daily activities"
    },
    {
      title: "Goal Setting",
      description: "Set and track personalized fitness goals with smart insights"
    },
    {
      title: "Workout Planning",
      description: "Create and follow custom workout plans tailored to you"
    }
  ];

  const workoutPlans = [
    {
      title: "Strength Master",
      image: feature1
    },
    {
      title: "Flexibility Flow",
      image: feature2
    },
    {
      title: "HIIT Beast",
      image: feature3
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-[#00bfa5]">
            FitTrack Elite
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl mx-auto mb-8 text-gray-200">
            Transform your fitness journey with advanced tracking and personalized insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00bfa5] to-[#009d8a] hover:from-[#009d8a] hover:to-[#008b76] text-white font-semibold transform hover:scale-105 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-gray-300 hover:border-white text-white font-semibold hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-8 border-2 border-white/70 rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 border-l-2 border-b-2 border-white/70 transform rotate-45 translate-y-[-2px]" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-400 to-[#00bfa5] bg-clip-text text-transparent">
            Your Fitness Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Workout Plans Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-400 to-[#00bfa5] bg-clip-text text-transparent"
          >
            Premium Workout Plans
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {workoutPlans.map((plan, index) => (
              <WorkoutPlanCard 
                key={index}
                {...plan}
                index={index}
             
                />
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    );
  };
  
  export default Home;
  