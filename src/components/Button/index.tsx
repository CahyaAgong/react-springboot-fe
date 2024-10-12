interface ButtonProps {
  text: string
  type: 'button' | 'submit'
  styles?: string
  onClick: () => void
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  const { text, styles, onClick, type = 'button', disabled = false } = props
  return(
    <>
      <button type={type} className={`px-3 py-2 ${styles && styles}`} onClick={onClick} disabled={disabled}>{text}</button>
    </>
  )
}