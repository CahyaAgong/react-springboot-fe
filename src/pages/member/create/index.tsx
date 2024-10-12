import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { APIResponse, Member, MemberDTO } from "../../../types"
import { Button, Input } from "../../../components"
import { axiosInstance, handleInputChange } from "../../../helpers"
import { LOCALSTORAGE_KEY, URL as URL_CONSTANT } from "../../../constants"

const FormInitialValue = {
  name: '',
  position: '',
  pictureUrl: '',
  reportsTo: null
}

export default function CreateMember() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();

  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<MemberDTO>(FormInitialValue)
  const [isUrl, setIsUrl] = useState(true)

  const [file, setFile] = useState<string | null>(null);

  const [reportsToValue, setReportsToValue] = useState<string | null>(null)

  const [isSubmit, setIsSubmit] = useState(false)
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files)
      setFile(URL.createObjectURL(e.target.files[0]));
}

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!reportsToValue) return alert('fill superior user')
    
    setIsSubmit(true)

    try {
      const token = localStorage.getItem(LOCALSTORAGE_KEY.token)

      form.reportsTo = reportsToValue
      const { name, position, pictureUrl, reportsTo } = form

      const payload: MemberDTO = {
        name,
        position,
        pictureUrl,
        reportsTo,
      }

      let res: APIResponse;

      if (id) {
        res = await axiosInstance.put(URL_CONSTANT.members + `/${id}`, payload, { headers: { Authorization: `Bearer ${token}`}})
      } else {
        res = await axiosInstance.post(URL_CONSTANT.members, payload, { headers: { Authorization: `Bearer ${token}`}})
      }

      if (!res.success) return alert('create member failed')
       
      navigate('/members')
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsSubmit(false)
    }

  }

  useEffect(() => {
    const fetchMembers = async(page: number, search: string = '') => {
      const token = localStorage.getItem(LOCALSTORAGE_KEY.token)

      if (!token) return

      try {
        const res: APIResponse = await axiosInstance.get(URL_CONSTANT.members + `?searchTerm=${search}&page=${page}&size=50`, 
          { 
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )

        if (!res.success) return

        const { content } = res.data;

        if (content) setMembers(content);
        
      } catch (error) {
        const err = error as APIResponse
        if (err && err.error) alert(err.error)
      }
    }

    fetchMembers(0, '')

  }, [])

  useEffect(() => {
    const fetchMemberDetail = async () => {
      const token = localStorage.getItem(LOCALSTORAGE_KEY.token);
      if (!token) return;

      try {
        setLoading(true);
        const res: APIResponse = await axiosInstance.get(`${URL_CONSTANT.members}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.success) {
          const data: Member = res.data

          setForm({
            name: data.name,
            pictureUrl: data.pictureUrl,
            position: data.position,
            reportsTo: data.reportsTo
          })

          setReportsToValue(data.reportsTo)
        }
      } catch (error) {
        console.error('Error fetching member details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMemberDetail();
  }, [id])

  return (
    <div className="px-3 py-2 m-2 h-screen bg-white rounded-lg">
      <h1 className="text-2xl text-black font-semibold">Form Create Member</h1>

      <div className="mt-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => handleInputChange(e, form, setForm)}
            styles="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter member name..."
            required
          />

          <Input
            type="text"
            name="position"
            value={form.position}
            onChange={(e) => handleInputChange(e, form, setForm)}
            styles="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter member position..."
            required
          />

          <div className="flex flex-col gap-1">
            {isUrl 
              ? <Input
                  type="text"
                  name="pictureUrl"
                  value={form.pictureUrl}
                  onChange={(e) => handleInputChange(e, form, setForm)}
                  styles="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter photo's url..."
                  required
                />
              : <label htmlFor="uploadFile"
                  className="bg-white text-gray-500 font-semibold text-base rounded w-full h-42 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto py-2 font-[sans-serif] relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000" />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000" />
                  </svg>
                  Upload file
            
                  <input type="file" id='uploadFile' className="hidden" onChange={handleChange} />
                  <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>

                  {file && 
                    <div className="w-60 h-60 overflow-hidden rounded-full mt-2">
                      <img src={file} className="w-full h-full object-cover" alt="preview_photo" />
                    </div>
                  }
                </label>
            }

            <div className="flex gap-1 text-sm mt-2">
              <input id={`toggleUrlForm`} type="checkbox" checked={isUrl} onChange={(e) => setIsUrl(e.target.checked)}  />
              <label htmlFor="toggleUrlForm" className="text-xs font-semibold text-black text-opacity-80">Using photo's url?</label>
            </div>
          </div>

          <div className="flex flex-col text-sm">
            <label htmlFor="reportsToList" className="text-sm font-semibold text-black">Select Superior to reports</label>
            <select
              className="border border-black border-opacity-20 px-3 py-2 rounded-lg mt-2"
              name="reportsToList"
              id="reportsToList"
              value={reportsToValue ?? ''}
              onChange={(e) => setReportsToValue(e.target.value)}>
              <option value="">Select Option</option>
              {members.length > 0 && members.map((data) => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
          </div>

          <div className="flex gap-3 self-end">
            <Button type={`button`} text={`Cancel`} onClick={() => navigate('/members')} styles="bg-red-500 text-white font-semibold text-sm rounded-lg" />
            <Button type={`submit`} disabled={isSubmit} text={isSubmit ? 'Loading...' : `Submit`} onClick={() => {}} styles="bg-green-500 text-white font-semibold text-sm rounded-lg" />
          </div>
        </form>
      </div>
    </div>
  )
}