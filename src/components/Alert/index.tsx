import { useEffect, useState } from "react";

interface AlertProps {
  data: {
    message: string;
    success?: boolean
    error?: string
  }
  duration?: number;
}

export default function Alert(props: AlertProps) {
  const { data, duration = 2000 } = props

  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [data, duration]);

  if (!isVisible) return null;

  return (
    <div className={`${data.success ? 'bg-blue-500' : 'bg-red-500'} text-white text-sm p-4 rounded shadow-lg transition-transform transform duration-300 mb-5`}>
      {data.message}
    </div>
  )
}