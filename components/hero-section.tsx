"use client";

import { motion } from "framer-motion";
import { TicketIcon, BarChart3, Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "IT Helpdesk Ticketing System";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: TicketIcon,
      title: "Ticket Management",
      description: "Create, track, and resolve support tickets efficiently",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights and performance metrics",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Streamlined user request and assignment system",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor resolution times and SLA compliance",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-2xl">
              <TicketIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              NexusDesk
            </h1>
          </motion.div>

          <div className="h-16 flex items-center justify-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-medium min-h-[2rem]">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="text-blue-400"
              >
                |
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Streamline your IT support operations with our comprehensive
            ticketing system. Track, manage, and resolve issues efficiently
            while maintaining complete visibility into your support metrics and
            team performance.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
