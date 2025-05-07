import './TextInput.css'

interface TextInputProps {
  label: string,
  type?: string
}

function TextInput({ label, type = 'text' }: TextInputProps) {
  return (
    <div className="text-input">
      <label>{label}</label>
      <input type={type} placeholder={label}></input>
    </div>
  )
}

export default TextInput; 