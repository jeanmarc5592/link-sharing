import { StringUtils } from "@/lib/utils/string";
import { Link, Platform } from "@prisma/client"
import clsx from "clsx";
import GitHubIcon from "./icons/GitHubIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";

const getLinkButtonColor = (platform: Platform) => {
  switch (platform) {
    case "GITHUB":
      return "#000";
    case "FRONTENDMENTOR":
    case "TWITTER":
    case "LINKEDIN":
    case "YOUTUBE":
    case "FACEBOOK":
    case "TWITCH":
    case "DEVTO":
    case "CODEWARS":
    case "FREECODECAMP":
    case "GITLAB":
    case "HASHNODE":
    case "STACKOVERFLOW":
    default: 
      return "#fff";
  }
}

const getLinkButtonIcon = (platform: Platform) => {
  switch(platform) {
    case "GITHUB":
      return <GitHubIcon width={24} height={24} fillColor="#fff" />;
    case "FRONTENDMENTOR":
    case "TWITTER":
    case "LINKEDIN":
    case "YOUTUBE":
    case "FACEBOOK":
    case "TWITCH":
    case "DEVTO":
    case "CODEWARS":
    case "FREECODECAMP":
    case "GITLAB":
    case "HASHNODE":
    case "STACKOVERFLOW":
    default:
      return <></>;
  }
}

interface LinkButtonProps {
  link: Link;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const { platform, href } = link;

  const color = getLinkButtonColor(platform);
  const icon = getLinkButtonIcon(platform);
  const styles = clsx("p-5 mb-6 rounded-md text-white transition-all w-full flex justify-between items-center", `bg-[${color}]`);
  const label = StringUtils.capitalize(platform);

  const handleClick = () => {
    window.open(href, '_blank')?.focus();
  };

  return (
    <button className={styles} onClick={handleClick}>
      <span className="flex">
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </span>
      <ArrowRightIcon />
    </button>
  )
}

export default LinkButton
