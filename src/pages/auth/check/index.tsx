import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LOCALSTORAGE_KEY } from "../../../constants";

export default function CheckAuth() {
  const navigate = useNavigate()
  const { token } = useParams();

  useEffect(() => {
    if (!token) return navigate('/')

    localStorage.setItem(LOCALSTORAGE_KEY.token, token)
    navigate('/dashboard')
  }, [token])

  return <div className="text-2xl text-black flex justify-center items-center h-screen"><span>Loading...</span></div>
}