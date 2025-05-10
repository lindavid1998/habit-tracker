import '../styles/TextInput.css';
import { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

function TextInput({
  label,
  type = 'text',
  required = false,
  value = '',
  onChange,
}: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="text-input">
      <label>{label}</label>
      <input
        type={type}
        placeholder={label}
        required={required}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextInput;
