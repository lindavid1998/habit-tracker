import React from 'react';

interface MeatballsMenuProps {
  size?: number;
  color?: string;
  onClick?: () => void;
}

const MeatballsMenu: React.FC<MeatballsMenuProps> = ({
  size = 24,
  color = 'currentColor',
  onClick,
}) => {
  return (
    <div className="meatballs-menu" onClick={onClick} style={{ cursor: 'pointer' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="12" r="2" fill={color} />
        <circle cx="12" cy="12" r="2" fill={color} />
        <circle cx="18" cy="12" r="2" fill={color} />
      </svg>
    </div>
  );
};

export default MeatballsMenu;
