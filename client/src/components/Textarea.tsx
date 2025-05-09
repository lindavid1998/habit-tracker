import '../styles/TextInput.css';

interface TextareaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export default function Textarea({ label, value, onChange, required = false }: TextareaProps) {
  return (
    <div className="text-input">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={label}
        required={required}
        rows={4}
      />
    </div>
  );
}
