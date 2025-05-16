import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  
  const handlePurchase = async (planId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to purchase a plan.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Feature items with icons
  const features = [
    {
      title: "Instant Results",
      desc: "Real-time analysis of your skin and hair conditions.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Personalized Tips",
      desc: "Receive care suggestions based on AI predictions.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Track History",
      desc: "Monitor your progress with past analysis reports.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Privacy First",
      desc: "We don't store your photos without permission.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Free to Use",
      desc: "Basic analysis is free, advanced available via credits.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Mobile Ready",
      desc: "Use on your phone anytime, anywhere.",
      icon: (
        <svg className="w-10 h-10 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // Plan data with additional styling information
  const plans = [
    {
      name: "Starter",
      price: "$5",
      credits: 5,
      id: "starter",
      color: "from-blue-500 to-blue-600",
      features: ["5 AI analyses", "Basic recommendations", "5 day history"],
    },
    {
      name: "Pro",
      price: "$10",
      credits: 15,
      id: "pro",
      color: "from-purple-500 to-blue-600",
      features: ["15 AI analyses", "Detailed recommendations", "30 day history", "Priority support"],
      popular: true,
    },
    {
      name: "Elite",
      price: "$20",
      credits: 40,
      id: "elite",
      color: "from-pink-500 to-purple-600",
      features: ["40 AI analyses", "Premium recommendations", "90 day history", "Priority support", "Custom reports"],
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <main className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500 opacity-10 dark:opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-10 w-72 h-72 bg-pink-500 opacity-10 dark:opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Analyze Your <span className="text-blue-600">Hair</span> & <span className="text-pink-600">Skin</span> Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Get personalized beauty insights using cutting-edge AI. Upload a photo or use your camera to begin.
          </p>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Please log in to access the dashboard.");
                navigate("/login");
              } else {
                navigate("/dashboard");
              }
            }}
            className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg hover:from-blue-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Get Started
          </button>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Results</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>10K+ Happy Users</span>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DermaScan AI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our advanced AI technology provides accurate analysis and personalized recommendations for your hair and skin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50 dark:bg-gray-800 flex flex-col"
              >
                <div className="flex-grow">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Select the plan that best fits your needs. All plans include our core analysis features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'transform md:-translate-y-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-pink-600 text-white py-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden ${plan.popular ? 'border-2 border-blue-500 dark:border-blue-400' : 'border border-gray-200 dark:border-gray-700'}`}>
                  <div className={`py-8 px-6 bg-gradient-to-r ${plan.color} text-white`}>
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <div className="flex justify-center items-baseline">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="ml-1 text-lg opacity-80">one-time</span>
                    </div>
                    <p className="mt-2 text-lg opacity-90">{plan.credits} Credits</p>
                  </div>
                  
                  <div className="flex-grow p-6 flex flex-col">
                    <ul className="mb-8 space-y-3 text-left flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="ml-2 text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handlePurchase(plan.id)}
                      className={`w-full py-3 px-4 font-medium rounded-lg text-white transition-all duration-200 shadow-md hover:shadow-lg ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Thousands of people have transformed their beauty routines with DermaScan AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                role: "Beauty Enthusiast",
                text: "DermaScan AI helped me identify my skin concerns and recommended products that actually worked for me!",
                avatar: "S",
              },
              {
                name: "Michael T.",
                role: "Fitness Trainer",
                text: "As someone who spends a lot of time outdoors, tracking my skin health is important. This app makes it so easy!",
                avatar: "M",
              },
              {
                name: "Elena R.",
                role: "Makeup Artist",
                text: "I recommend DermaScan AI to all my clients. It's like having a dermatologist in your pocket.",
                avatar: "E",
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">DS</span>
                </div>
                <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                  DermaScan AI
                </span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                AI-powered beauty analysis and recommendations
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DermaScan AI. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;