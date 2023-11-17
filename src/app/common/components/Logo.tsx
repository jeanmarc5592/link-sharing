import LogoIcon from "./icons/LogoIcon"
import Typography from "./Typography"

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <LogoIcon />
      <Typography variant="Heading M" className="ml-2">devlinks</Typography>
    </div>
  )
}

export default Logo
