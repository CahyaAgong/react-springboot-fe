interface CardProps {
  children: React.ReactNode
  styles?: string
}

export default function Card(props: CardProps) {
  const { children, styles = '' } = props

  return (
    <div className={`px-3 py-2 border border-black border-opacity-20 rounded-lg shadow-md ${styles ? styles : ''}`}>
      { children }
    </div>
  )
}