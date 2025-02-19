"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {

    const simulatedResult = {
      approved: Math.random() > 0.5,
      probability: Math.random(),
      formData: {
        person_age: 30,
        person_gender: "Female",
        person_education: "Bachelor's",
        person_income: 75000,
        person_emp_exp: 5,
        person_home_ownership: "Mortgage",
        loan_amnt: 25000,
        loan_intent: "Debt Consolidation",
        loan_int_rate: 8.5,
        loan_percent_income: 15,
        cb_person_cred_hist_length: 7,
        credit_score: 720,
        previous_loan_defaults_on_file: "No",
      },
    };
    setPredictionResult(simulatedResult);
  }, []);

  if (!predictionResult) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { approved, probability, formData } = predictionResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Loan Prediction Result</h1>
            <div className="mb-8">
              <div
                className={`flex items-center justify-center p-4 rounded-lg ${approved ? "bg-green-100" : "bg-red-100"}`}
              >
                {approved ? (
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                )}
                <span className="text-xl font-semibold">{approved ? "Loan Approved" : "Loan Not Approved"}</span>
              </div>
              <p className="mt-2 text-center text-gray-600">Probability: {(probability * 100).toFixed(2)}%</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">{key.replace(/_/g, " ").toUpperCase()}</span>
                  <span className="mt-1 text-lg text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link href="/predictor/predict" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Prediction Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
