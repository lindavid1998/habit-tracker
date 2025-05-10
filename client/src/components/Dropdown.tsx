import '../styles/Dropdown.css';

interface DropdownProps {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function Dropdown({ options, label, value, onChange, required = false }: DropdownProps) {
  return (
    <div className="dropdown">
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        name={label}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
