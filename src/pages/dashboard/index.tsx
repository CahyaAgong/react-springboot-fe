import { useEffect, useState } from "react"

import { jwtDecode } from "jwt-decode";

import { LOCALSTORAGE_KEY } from "../../constants"

interface JwtPayload {
  sub: string;
  name: string;
  exp: number;
  iat: number;
}

export default function Dashboard() {

  const [session, setSession] = useState<JwtPayload | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY.token)

    if (!token) return

    let decodedToken = jwtDecode<JwtPayload>(token)
    decodedToken.name = decodedToken.sub.split('@')[0]
    setSession(decodedToken)
  }, [])

  return (
    <div className="flex flex-col items-center h-screen w-full justify-center">
      <h1 className="text-2xl text-black mb-3">Welcome, <span className="font-semibold">{session?.name}</span></h1>
      <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3 px-10">
              <div className="photo-wrapper p-2">
                  <img className="w-32 h-32 rounded-full mx-auto" src="https://i.pinimg.com/564x/29/06/09/2906099a50ab7fc23dbc1a8f01ec64ac.jpg" alt={session?.name} />
              </div>
              <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{session?.name}</h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                      <p>Ceo of Dashboard</p>
                  </div>
                  <table className="text-xs my-3">
                      <tbody>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Nick</td>
                            <td className="px-2 py-2">Mr. {session?.name}</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                            <td className="px-2 py-2">+977 9955221114</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                            <td className="px-2 py-2">{session?.sub}</td>
                        </tr>
                      </tbody>
                  </table>

                  <div className="text-center my-3">
                      <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                  </div>

              </div>
          </div>
      </div>

    </div>
  )
}