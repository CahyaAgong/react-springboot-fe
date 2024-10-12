import { FormEvent, useEffect, useState } from "react"

import axiosInstance from "../../helpers/axios"
import { CONNECTION, LOCALSTORAGE_KEY, URL } from "../../constants"
import { APIResponse, LoginRegisterDTO } from "../../types"
import { handleInputChange } from "../../helpers"
import { Alert } from "../../components"
import { useNavigate } from "react-router-dom"

const FormInitialValue = {
  email: '',
  name: '',
  password: ''
}

export default function Auth() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState<LoginRegisterDTO>(FormInitialValue)
  
  const [response, setResponse] = useState<{ success: boolean; message: string} | null>( null)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleFormMode = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmit(true)
    try {

      const POST_URL = isLogin ? URL.login : URL.register

      const res: APIResponse = await axiosInstance.post(POST_URL, form)
      
      setResponse({ success: res.success, message: res.message })

      if (res.data.token) {
        localStorage.setItem(LOCALSTORAGE_KEY.token, res.data.token)

        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      }
    } catch (error: unknown) {
      const err = error as APIResponse

      setResponse({ success: err.success, message: err.message })
    } finally {
      setIsSubmit(false)
      if (!isLogin && response?.success) setForm(FormInitialValue)
    }
  }

  const handleGoogleSignin = async() => {
    window.open(`${CONNECTION.BASE_URL}:${CONNECTION.PORT}/${URL.google}`,'_blank');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or {' '}
              <span onClick={handleFormMode} className="font-medium cursor-pointer text-blue-600 hover:text-blue-500">
                  {isLogin ? 'create an account' : 'sign in to your account'}
              </span>
          </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {response && <Alert data={response} />}

              <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                      </label>

                      <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"
                            onChange={(e) => handleInputChange(e, form, setForm)}
                          />
                      </div>
                  </div>

                  {!isLogin && 
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                      </label>

                      <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"
                            onChange={(e) => handleInputChange(e, form, setForm)}
                          />
                      </div>
                  </div>
                  }

                  <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                      </label>
                      <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your password"
                            onChange={(e) => handleInputChange(e, form, setForm)}
                          />
                      </div>
                  </div>

                  <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <input id="remember_me" name="remember_me" type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                              Remember me
                          </label>
                      </div>

                      <div className="text-sm hidden">
                          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                              Forgot your password?
                          </a>
                      </div>
                  </div>

                  <div>
                      <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          disabled={isSubmit}
                        >

                          {isSubmit ? 'Loading' : isLogin ? 'Sign in' : 'Sign up' }
                      </button>
                  </div>
              </form>

              <div className="mt-6">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-gray-100 text-gray-500">
                              Or continue with
                          </span>
                      </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                      <div>
                          <button onClick={handleGoogleSignin} className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}