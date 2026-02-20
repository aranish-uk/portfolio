"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import SkillsTape from "./SkillsTape";

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 ">
      <div className="flex items-center justify-center px-6 py-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-black/80 backdrop-blur rounded-xl shadow-lg p-10"
        >
          {/* Header */}
          <motion.h2
            className="text-3xl font-bold text-center text-pink-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-center text-gray-400 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Whether it’s about projects, opportunities, or just a chat — feel
            free to reach out.
          </motion.p>

          {/* Contact Options */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Email */}
            <motion.a
              href="mailto:aranish@asu.edu"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-gray-700/50 hover:bg-gray-700 rounded-lg p-6 transition shadow-md"
            >
              <Mail className="w-8 h-8 text-pink-300 mb-3" />
              <h3 className="font-semibold text-gray-100">Email</h3>
              <p className="text-sm text-gray-400">aranish@asu.edu</p>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+16232817065"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-gray-700/50 hover:bg-gray-700 rounded-lg p-6 transition shadow-md"
            >
              <Phone className="w-8 h-8 text-pink-300 mb-3" />
              <h3 className="font-semibold text-gray-100">Phone</h3>
              <p className="text-sm text-gray-400">+1 (623) 281-7065</p>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/abhinavranish/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-gray-700/50 hover:bg-gray-700 rounded-lg p-6 transition shadow-md"
            >
              <Linkedin className="w-8 h-8 text-pink-300 mb-3" />
              <h3 className="font-semibold text-gray-100">LinkedIn</h3>
              <p className="text-sm text-gray-400">/in/abhinavranish</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
      <div className="px-2 py-1 max-w-7xl mx-auto">
        {" "}
        <SkillsTape />
      </div>
    </div>
  );
}
