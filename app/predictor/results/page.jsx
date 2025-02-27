"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Info, BarChart2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResultsPage() {
  const [predictionResult, setPredictionResult] = useState(null)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (searchParams && !predictionResult) {
      const data = Object.fromEntries(searchParams.entries())
      setPredictionResult(data)
    }
  }, [searchParams, predictionResult])
  
  if (!predictionResult) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  
  // Extract prediction data from the enhanced API response
  const { 
    decision,
    probability,
    confidence_level,
    risk_score,
    approval_threshold,
    additional_risk_category,
    additional_affordability_ratio,
    additional_debt_to_income,
    additional_interest_rate,
    additional_model_version,
    ...formData 
  } = predictionResult
  
  // Determine if approved based on decision field
  const approved = decision === "Approved"
  
  // Parse numerical values
  const probabilityValue = parseFloat(probability) || 0
  const riskScore = parseFloat(risk_score) || 0
  const affordabilityRatio = parseFloat(additional_affordability_ratio) || 0
  
  // Helper function to get risk color
  const getRiskColor = (score) => {
    if (score < 20) return "bg-green-100 text-green-800"
    if (score < 40) return "bg-blue-100 text-blue-800"
    if (score < 60) return "bg-yellow-100 text-yellow-800"
    if (score < 80) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Loan Prediction Result</h1>
            
            {/* Main Decision Card */}
            <div className="mb-8">
              <div
                className={`flex items-center justify-center p-4 rounded-lg ${
                  approved ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {approved ? (
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                )}
                <span className="text-xl font-semibold">
                  {approved ? "Loan Approved" : "Loan Not Approved"}
                </span>
              </div>
            </div>
            
            {/* Risk Assessment Section */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart2 className="w-5 h-5 mr-2" />
                Risk Assessment
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Confidence Level</div>
                  <div className="text-lg">{confidence_level}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Risk Score</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskScore)}`}>
                    {riskScore.toFixed(1)} - {additional_risk_category || "Unknown"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Affordability Ratio</div>
                  <div className="text-lg">{affordabilityRatio.toFixed(2)}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Debt-to-Income</div>
                  <div className="text-lg">{parseFloat(additional_debt_to_income || 0).toFixed(2)}</div>
                </div>
              </div>
              
              {/* Risk factors explanation */}
              <div className="mt-4 bg-blue-50 p-3 rounded flex items-start">
                <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Key factors in this decision:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {parseFloat(formData.credit_score) < 650 && (
                      <li>Credit score below recommended threshold</li>
                    )}
                    {parseFloat(formData.loan_int_rate) > 15 && (
                      <li>High interest rate may increase default risk</li>
                    )}
                    {parseFloat(formData.person_income) < 30000 && (
                      <li>Income may be insufficient for requested loan amount</li>
                    )}
                    {formData.previous_loan_defaults_on_file === "Yes" && (
                      <li>Previous defaults on record</li>
                    )}
                    {affordabilityRatio > 0.4 && (
                      <li>Loan amount exceeds recommended ratio to income</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Applicant Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Applicant Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData).map(([key, value]) => {
                  // Skip internal keys, empty values, or additional_* values that we handle separately
                  if (key.startsWith('_') || !value || key.startsWith('additional_')) return null;
                  
                  // Format the key for better display
                  const formattedKey = key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                  
                  // Format values for better display
                  let displayValue = value;
                  if (key === "loan_amnt") {
                    displayValue = `$${parseInt(value).toLocaleString()}`;
                  } else if (key === "person_income") {
                    displayValue = `$${parseInt(value).toLocaleString()}/year`;
                  } else if (key === "loan_int_rate") {
                    displayValue = `${value}%`;
                  }
                  
                  return (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{formattedKey}</span>
                      <span className="mt-1 text-lg text-gray-900">{displayValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Model Information */}
            <div className="text-xs text-gray-500 mt-6">
              Model Version: {additional_model_version || "1.0"} • Decision Threshold: {parseFloat(approval_threshold).toFixed(2)}
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
  )
}