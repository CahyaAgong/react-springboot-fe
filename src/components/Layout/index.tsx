import { useState } from "react";
import { Navbar, Sidebar } from "..";

type LayoutProps = {
  children: React.ReactNode; // Tipe untuk children di React
};

export default function Layout(props: LayoutProps) {
  const { children } = props

  const [isExpand, setIsExpand] = useState(false)

  return (
    <>
      <div className="flex h-screen bg-gray-100 relative">
        <Sidebar isExpand={isExpand} />

        <div className="flex flex-col flex-1 overflow-y-auto">
            <Navbar isExpand={isExpand} setIsExpand={setIsExpand} />

            {children}
          </div>
      </div>
    </>
  )
}