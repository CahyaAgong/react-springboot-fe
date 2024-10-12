import { useEffect, useState } from "react"
import { APIResponse, Member as MemberType } from "../../types"
import { axiosInstance } from "../../helpers"
import { DEFAULT_IMAGE, LOCALSTORAGE_KEY, URL } from "../../constants"
import { useNavigate } from "react-router-dom"
import { Button, Card, Input } from "../../components"

export default function Member() {
  const navigate = useNavigate()
  const [members, setMembers] = useState<MemberType[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [errors, setErrors] = useState<string[]>([])

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY.token);
    if (!token) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this member?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error('Error deleting member', error);
    }
  };

  useEffect(() => {
    const fetchMembers = async(page: number, search: string = '') => {
      const token = localStorage.getItem(LOCALSTORAGE_KEY.token)

      if (!token) return

      try {
        const res: APIResponse = await axiosInstance.get(URL.members + `?searchTerm=${search}&page=${page}&size=5`, 
          { 
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )

        if (!res.success) return

        const { content, currentPage, totalPages } = res.data;

        if (content) setMembers(content);
        if (currentPage) setCurrentPage(currentPage);
        if (totalPages) setTotalPages(totalPages);
        
      } catch (error) {
        const err = error as APIResponse
        // console.error('Error fetching members', err.error);
        if (err && err.error) setErrors([err.error])
      }
    }

    fetchMembers(currentPage, searchTerm)

  }, [currentPage, searchTerm])

  return (
    <div className="px-3 pt-2 pb-5 m-2 h-fit bg-white rounded-lg">

      {errors.length > 0 && errors.map((data, key) => 
        (<div key={key} className="bg-red-500 px-4 py-2 rounded-lg text-white text-sm font-semibold relative">
          <span>{data}</span>
          <span onClick={()=> setErrors([])} className="p-0 absolute top-1 right-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </span>
        </div>))}

      <div className="flex items-center justify-between mt-3">
        <h1 className="text-2xl font-semibold">Organization's Member List</h1>
        <Button type="button" text="Add" styles="bg-green-500 text-white font-semibold text-sm rounded-lg" onClick={() => navigate('/members/create')} />
      </div>

      <br />

      <Input
        styles="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        type="search"
        value={searchTerm}
        placeholder="Search Member..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-2 mt-4">
        {members.length > 0 
          ? members.map((member) => (
            <Card key={member.id} styles="flex items-center gap-3">
              <div className="border rounded-full w-16 h-16 overflow-hidden">
                <img
                  src={member.pictureUrl ? member.pictureUrl : DEFAULT_IMAGE}
                  className="w-full h-full object-cover"
                  alt="profile_picture"
                />
              </div>

              <div className="flex flex-col flex-1 gap-1">
                <h4 className="text-lg font-semibold text-black">{member.name}</h4>
                <p className="text-sm text-gray-500">Position : <span className="font-semibold">{member.position}</span></p>
                <p className="text-xs text-gray-500">Reports To : <span className="font-semibold">{member.reportsToName ? member.reportsToName : '-'}</span></p>
              </div>

              <div className="flex flex-col gap-2 self-start">
                <span className="rounded-md font-semibold text-sm text-white bg-yellow-500 flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer" onClick={() => navigate(`/members/${member.id}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <p className="text-sm font-semibold">Detail</p>
                </span>

                <span className="rounded-md font-semibold text-sm text-white bg-red-500 flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer" onClick={() => handleDelete(member.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                  <p className="text-sm font-semibold">Delete</p>
                </span>
              </div>
            </Card>
          ))
          : <h3 className="text-xl font-semibold text-black text-opacity-50 400 text-center my-2">No Data...</h3>
        }
      </div>

      <div className={`mt-4 items-center gap-3 ${members.length > 0 ? 'flex' : 'hidden'}`}>
        <Button
          type="button"
          text="Previous"
          styles={`${currentPage === 0 ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'} font-semibold text-sm rounded-md cursor-pointer`}
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        />

        <Button
          type="button"
          text="Next"
          styles={`${currentPage === totalPages - 1 ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'} font-semibold text-sm rounded-md cursor-pointer`}
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  )
}