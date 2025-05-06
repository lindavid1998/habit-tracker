import './TextInput.css'

interface TextInputProps {
  label: string
}

function TextInput({ label }: TextInputProps) {
  return (
    <div className="text-input">
      <label>{label}</label>
      <input type='text' placeholder={label}></input>
    </div>
  )
}

export default TextInput; 