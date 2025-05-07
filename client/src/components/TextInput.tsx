import '../styles/TextInput.css'

interface TextInputProps {
  label: string,
  type?: string,
  required?: boolean
}

function TextInput({ label, type = 'text', required = false }: TextInputProps) {
  return (
    <div className="text-input">
      <label>{label}</label>
      <input type={type} placeholder={label} required={required}></input>
    </div>
  )
}

export default TextInput; 