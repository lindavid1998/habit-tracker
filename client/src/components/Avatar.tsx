import '../styles/Avatar.css';

interface AvatarProps {
  letter?: string;
}

function Avatar({ letter = 'U' }: AvatarProps) {
  return <div className="avatar">{letter.toUpperCase()}</div>;
}

export default Avatar;
