import { Dispatch, SetStateAction, useState } from "react"

import './styles.css'
import { LOCALSTORAGE_KEY } from "../../constants"

interface props {
  isExpand: boolean
  setIsExpand?: Dispatch<SetStateAction<any>>
}

export default function Sidebar(props: props) {
  const { isExpand } = props

  const menus = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
          />
        </svg>
      ),
      onclick: () => {}
    },
    {
      path: '/members',
      title: 'Members',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
      onclick: () => {}
    },
    {
      path: '/',
      title: 'Logout',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>

      ),
      onclick: () => {
        localStorage.removeItem(LOCALSTORAGE_KEY.token)
      }
    }
  ]

  return (
    <div className={`navbar ${isExpand ? 'opened' : '' }`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold uppercase">Your Dashboard</span>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
                {menus.map((data, index) => (
                  <a key={index} onClick={data.onclick} href={data.path} className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                    {data.icon()}

                    {data.title}
                  </a>
                ))}
            </nav>
        </div>
    </div>
  )
}