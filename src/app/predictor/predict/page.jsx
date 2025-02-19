"use client"
import Link from "next/link"

import { useState } from "react"

export default function PredictorForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }


  const handleSubmit = () => {
    e.preventDefault()
    console.log(formData)
    

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
                    type="text"
                    id="person_age"
                    name="person_age"
                    value={formData.person_age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                </div>
                <div className="mb-4">
                  <label htmlFor="person_income" className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income
                  </label>
                  <input
                    type="text"
                    id="person_income"
                    name="person_income"
                    value={formData.person_income}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="person_emp_exp" className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Experience (years)
                  </label>
                  <input
                    type="text"
                    id="person_emp_exp"
                    name="person_emp_exp"
                    value={formData.person_emp_exp}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
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
                    <option value="Own">Own</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_amnt" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    id="loan_amnt"
                    name="loan_amnt"
                    value={formData.loan_amnt}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
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
                    <option value="Personal">Personal</option>
                    <option value="Education">Education</option>
                    <option value="Venture">Venture</option>
                    <option value="Medical">Medical</option>
                    <option value="DebtConsolidation">Debt Consolidation</option>
                    <option value="HomeImprovement">Home Improvement</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_int_rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Interest Rate
                  </label>
                  <input
                    type="text"
                    id="loan_int_rate"
                    name="loan_int_rate"
                    value={formData.loan_int_rate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="loan_percent_income" className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Percent Income
                  </label>
                  <input
                    type="text"
                    id="loan_percent_income"
                    name="loan_percent_income"
                    value={formData.loan_percent_income}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cb_person_cred_hist_length" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit History Length (years)
                  </label>
                  <input
                    type="text"
                    id="cb_person_cred_hist_length"
                    name="cb_person_cred_hist_length"
                    value={formData.cb_person_cred_hist_length}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="credit_score" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Score
                  </label>
                  <input
                    type="text"
                    id="credit_score"
                    name="credit_score"
                    value={formData.credit_score}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-2 py-2 px-2"
                  />
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
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Predict Loan Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

