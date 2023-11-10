import LogoIcon from "./icons/LogoIcon"
import Typography from "./Typography"

const Logo = () => {
  return (
    <div className="px-10 mt-10 mb-4 flex items-center sm:mb-10 sm:p-0">
      <LogoIcon />
      <Typography variant="Heading M" className="ml-2">devlinks</Typography>
    </div>
  )
}

export default Logo
