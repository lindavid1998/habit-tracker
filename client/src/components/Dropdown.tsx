import '../styles/Dropdown.css';

interface DropdownProps {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ options, label, value, onChange }: DropdownProps) {
  return (
    <div className="dropdown">
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        name={label}
        required
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
