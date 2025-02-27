"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
  person_age: z.number().min(18).max(100),
  person_gender: z.enum(["male", "female"]),
  person_education: z.enum(["High School", "Bachelor", "Master", "Associate"]),
  person_income: z.number().positive(),
  person_emp_exp: z.number().min(0),
  person_home_ownership: z.enum(["OWN", "MORTGAGE", "RENT"]),
  loan_amnt: z.number().positive(),
  loan_intent: z.enum(["PERSONAL", "EDUCATION", "VENTURE", "MEDICAL", "DEBTCONSOLIDATION", "HOMEIMPROVEMENT"]),
  loan_int_rate: z.number().min(0).max(100),
  loan_percent_income: z.number().min(0).max(1),
  cb_person_cred_hist_length: z.number().min(0),
  credit_score: z.number().min(300).max(850),
  previous_loan_defaults_on_file: z.enum(["Yes", "No"]),
})

export default function PredictorForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    person_age: "",
    person_gender: "",
    person_education: "",
    person_income: "",
    person_emp_exp: "",
    person_home_ownership: "",
    loan_amnt: "",
    loan_intent: "",
    loan_int_rate: "",
    loan_percent_income: "",
    cb_person_cred_hist_length: "",
    credit_score: "",
    previous_loan_defaults_on_file: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const validatedData = formSchema.parse({
        ...formData,
        person_age: Number(formData.person_age),
        person_income: Number(formData.person_income),
        person_emp_exp: Number(formData.person_emp_exp),
        loan_amnt: Number(formData.loan_amnt),
        loan_int_rate: Number(formData.loan_int_rate),
        loan_percent_income: Number(formData.loan_amnt)/Number(formData.person_income),
        cb_person_cred_hist_length: Number(formData.cb_person_cred_hist_length),
        credit_score: Number(formData.credit_score),
      })

      fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      })
        .then((res) => res.json())
        .then((data) => {
          // Create query params with new API structure
          const predictionData = {
            decision: data.prediction.decision,
            probability: data.prediction.probability,
            confidence_level: data.prediction.confidence_level,
            risk_score: data.prediction.risk_score,
            approval_threshold: data.prediction.approval_threshold,
          }
          
          // Add any additional info from the API
          if (data.prediction.additional_info) {
            Object.entries(data.prediction.additional_info).forEach(([key, value]) => {
              predictionData[`additional_${key}`] = value
            })
          }
          
          // Combine with form data
          const queryString = new URLSearchParams({ 
            ...predictionData,
            ...validatedData 
          }).toString()
          
          router.push(`/predictor/results?${queryString}`)
        })
        .catch((error) => {
          console.error("Error:", error)
          setIsSubmitting(false)
        })
    } catch (error) {
      setIsSubmitting(false)
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Loan Predictor</div>
            <h2 className="text-2xl leading-tight font-bold text-gray-900 mb-5">Enter Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="person_age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="person_age"
                    name="person_age"
                    value={formData.person_age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.person_age && <p className="text-red-500 text-xs mt-1">{errors.person_age}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="person_gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="person_gender"
                    name="person_gender"
                    value={formData.person_gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  >
                    <option value="">Select an option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.person_gender && <p className="text-red-500 text-xs mt-1">{errors.person_gender}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="person_education" className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <select
                    id="person_education"
                    name="person_education"
                    value={formData.person_education}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  >
                    <option value="">Select an option</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Associate">Associate</option>
                  </select>
                  {errors.person_education && <p className="text-red-500 text-xs mt-1">{errors.person_education}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="person_income" className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    id="person_income"
                    name="person_income"
                    value={formData.person_income}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.person_income && <p className="text-red-500 text-xs mt-1">{errors.person_income}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="person_emp_exp" className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Experience (years)
                  </label>
                  <input
                    type="number"
                    id="person_emp_exp"
                    name="person_emp_exp"
                    value={formData.person_emp_exp}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.person_emp_exp && <p className="text-red-500 text-xs mt-1">{errors.person_emp_exp}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="person_home_ownership" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Ownership
                  </label>
                  <select
                    id="person_home_ownership"
                    name="person_home_ownership"
                    value={formData.person_home_ownership}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  >
                    <option value="">Select an option</option>
                    <option value="OWN">Own</option>
                    <option value="MORTGAGE">Mortgage</option>
                    <option value="RENT">Rent</option>
                  </select>
                  {errors.person_home_ownership && (
                    <p className="text-red-500 text-xs mt-1">{errors.person_home_ownership}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_amnt" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    id="loan_amnt"
                    name="loan_amnt"
                    value={formData.loan_amnt}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.loan_amnt && <p className="text-red-500 text-xs mt-1">{errors.loan_amnt}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_intent" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Intent
                  </label>
                  <select
                    id="loan_intent"
                    name="loan_intent"
                    value={formData.loan_intent}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  >
                    <option value="">Select an option</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="EDUCATION">Education</option>
                    <option value="VENTURE">Venture</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="DEBTCONSOLIDATION">Debt Consolidation</option>
                    <option value="HOMEIMPROVEMENT">Home Improvement</option>
                  </select>
                  {errors.loan_intent && <p className="text-red-500 text-xs mt-1">{errors.loan_intent}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_int_rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Interest Rate
                  </label>
                  <input
                    type="number"
                    id="loan_int_rate"
                    name="loan_int_rate"
                    value={formData.loan_int_rate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.loan_int_rate && <p className="text-red-500 text-xs mt-1">{errors.loan_int_rate}</p>}
                </div>
               
                <div className="mb-4">
                  <label htmlFor="cb_person_cred_hist_length" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit History Length (years)
                  </label>
                  <input
                    type="number"
                    id="cb_person_cred_hist_length"
                    name="cb_person_cred_hist_length"
                    value={formData.cb_person_cred_hist_length}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.cb_person_cred_hist_length && (
                    <p className="text-red-500 text-xs mt-1">{errors.cb_person_cred_hist_length}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="credit_score" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Score
                  </label>
                  <input
                    type="number"
                    id="credit_score"
                    name="credit_score"
                    value={formData.credit_score}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                  {errors.credit_score && <p className="text-red-500 text-xs mt-1">{errors.credit_score}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="previous_loan_defaults_on_file"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Previous Loan Defaults
                  </label>
                  <select
                    id="previous_loan_defaults_on_file"
                    name="previous_loan_defaults_on_file"
                    value={formData.previous_loan_defaults_on_file}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.previous_loan_defaults_on_file && (
                    <p className="text-red-500 text-xs mt-1">{errors.previous_loan_defaults_on_file}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                  {isSubmitting ? "Processing..." : "Predict Loan Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}