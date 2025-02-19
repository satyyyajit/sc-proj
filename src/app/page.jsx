"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="./favicon.ico" className="mx-3" alt="Loan Predictor" width={20} height={20} />
            <h1 className="text-2xl font-bold text-blue-600">Loan Predictor</h1>
          </div>
          <Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
            About
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-extrabold text-blue-800 mb-6">Predict Your Loan Approval</h1>
          <p className="text-xl text-gray-600 mb-8">
            Our advanced machine learning algorithm analyzes your data to provide accurate loan approval predictions.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/predictor/predict">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Quick", description: "Get results in seconds" },
            { title: "Accurate", description: "Powered by advanced AI" },
            { title: "Secure", description: "Your data is protected" },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

