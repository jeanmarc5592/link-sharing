import { StringUtils } from "@/lib/utils/string";
import { Link, Platform } from "@prisma/client"
import clsx from "clsx";
import GitHubIcon from "./icons/GitHubIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import FrontendMentorIcon from "./icons/FrontendMentorIcon";
import TwitterIcon from "./icons/TwitterIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TwitchIcon from "./icons/TwitchIcon";
import DevtoIcon from "./icons/DevtoIcon";
import CodewarsIcon from "./icons/CodewarsIcon";
import FreecodecampIcon from "./icons/FreecodecampIcon";
import GitlabIcon from "./icons/GitlabIcon";
import HashnodeIcon from "./icons/HashnodeIcon";
import StackoverflowIcon from "./icons/StackoverflowIcon";

const getLinkButtonColor = (platform: Platform) => {
  switch (platform) {
    case "GITHUB":
      return "text-white bg-[#000]";
    case "FRONTENDMENTOR":
      return "text-custom-gray bg-[#fff border-custom-gray-lighter border";
    case "TWITTER":
      return "text-white bg-[#43B7E9]";
    case "LINKEDIN":
      return "text-white bg-[#2D68FF]";
    case "YOUTUBE":
      return "text-white bg-[#EE3939]";
    case "FACEBOOK":
      return "text-white bg-[#2442AC]";
    case "TWITCH":
      return "text-white bg-[#EE3FC8]";
    case "DEVTO":
      return "text-white bg-[#333333]";
    case "CODEWARS":
      return "text-white bg-[#8A1A50]";
    case "FREECODECAMP":
      return "text-white bg-[#302267]";
    case "GITLAB":
      return "text-white bg-[#EB4925]";
    case "HASHNODE":
      return "text-white bg-[#0330D1]";
    case "STACKOVERFLOW":
      return "text-white bg-[#EC7100]"
    default: 
      return "text-black #fff";
  }
}

const getLinkButtonIcon = (platform: Platform) => {
  const HEIGHT = 24;
  const WIDTH = 24;
  const FILL_COLOR = "#fff";

  switch(platform) {
    case "GITHUB":
      return <GitHubIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "FRONTENDMENTOR":
      return <FrontendMentorIcon width={WIDTH} height={HEIGHT} fillColor="#333333" />;
    case "TWITTER":
      return <TwitterIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "LINKEDIN":
      return <LinkedinIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "YOUTUBE":
      return <YoutubeIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "FACEBOOK":
      return <FacebookIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "TWITCH":
      return <TwitchIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "DEVTO":
      return <DevtoIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "CODEWARS":
      return <CodewarsIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "FREECODECAMP":
      return <FreecodecampIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "GITLAB":
      return <GitlabIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "HASHNODE":
      return <HashnodeIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    case "STACKOVERFLOW":
      return <StackoverflowIcon width={WIDTH} height={HEIGHT} fillColor={FILL_COLOR} />;
    default:
      return <></>;
  }
}

interface LinkButtonProps {
  link: Link;
  mode?: "default" | "preview"
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, mode = "default" }) => {
  const { platform, href } = link;

  const spacings = mode === "default" ? "p-5 mb-6" : "p-4 mb-4 cursor-default";
  const color = getLinkButtonColor(platform);
  const icon = getLinkButtonIcon(platform);
  const styles = clsx("rounded-md transition-all w-full flex justify-between items-center", color, spacings);
  const label = StringUtils.capitalize(platform);

  const handleClick = () => {
    if (mode === "preview") {
      return;
    }

    window.open(href, '_blank')?.focus();
  };

  return (
    <button className={styles} onClick={handleClick}>
      <span className="flex">
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </span>
      <ArrowRightIcon fillColor={platform === "FRONTENDMENTOR" ?  "#737373" : "#fff"} />
    </button>
  )
}

export default LinkButton
