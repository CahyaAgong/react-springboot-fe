interface InputProps {
  type: 'text' | 'email' | 'number' | 'password' | 'search'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  styles?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

export default function Input(props: InputProps) {
  const { type, name = '', onChange, styles = '', placeholder = '', value = '', disabled = false, required = false } = props

  return(
    <>
      <input
        className={`${styles}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </>
  )
}