import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { PlatformObject } from '../../../lib/constants/platforms';
import { StringUtils } from '@/lib/utils/string';
import GitHubIcon from './icons/GitHubIcon';
import FrontendMentorIcon from './icons/FrontendMentorIcon';
import TwitterIcon from './icons/TwitterIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitchIcon from './icons/TwitchIcon';
import DevtoIcon from './icons/DevtoIcon';
import CodewarsIcon from './icons/CodewarsIcon';
import FreecodecampIcon from './icons/FreecodecampIcon';
import GitlabIcon from './icons/GitlabIcon';
import HashnodeIcon from './icons/HashnodeIcon';
import StackoverflowIcon from './icons/StackoverflowIcon';

interface DropdownProps {
  label: string;
  data: PlatformObject[];
  selectedEl: PlatformObject;
  setSelected: (platformObject: PlatformObject) => void;
}

const renderPlatformIcon = (platform: PlatformObject, isSelected?: boolean,) => {
  switch (platform.id) {
    case "GITHUB": 
      return <GitHubIcon isSelected={isSelected} />;
    case "FRONTENDMENTOR":
      return <FrontendMentorIcon isSelected={isSelected} />;
    case "TWITTER":
      return <TwitterIcon isSelected={isSelected} />;
    case "LINKEDIN":
      return <LinkedinIcon isSelected={isSelected} />;
    case "YOUTUBE":
      return <YoutubeIcon isSelected={isSelected} />;
    case "FACEBOOK":
      return <FacebookIcon isSelected={isSelected} />;
    case "TWITCH":
      return <TwitchIcon isSelected={isSelected} />;
    case "DEVTO":
      return <DevtoIcon isSelected={isSelected} />;
    case "CODEWARS":
      return <CodewarsIcon isSelected={isSelected} />;
    case "FREECODECAMP":
      return <FreecodecampIcon isSelected={isSelected} />;
    case "GITLAB":
      return <GitlabIcon isSelected={isSelected} />;
    case "HASHNODE":
      return <HashnodeIcon isSelected={isSelected} />;
    case "STACKOVERFLOW":
      return <StackoverflowIcon isSelected={isSelected} />;
    default:
      return <></>;
  }
};

const Dropdown: React.FC<DropdownProps> = ({ label, data, selectedEl, setSelected }) => {
  return (
    <div className="mb-4">
        <Listbox value={selectedEl} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-custom-gray">{label}</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-pointer bg-white py-2.5 pl-3.5 pr-10 text-left text-custom-black border border-custom-gray-lighter custom-black rounded-md focus:border-custom-purple">
                <span className="flex items-center">
                  <span className="flex items-center truncate">
                    <span className="mr-1">{renderPlatformIcon(selectedEl)}</span> {StringUtils.capitalize(selectedEl.id)}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-custom-gray" aria-hidden="true" />
                  </span>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute cursor-pointer z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-custom-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((element) => {
                    const isSelected = element.id == selectedEl.id;

                    return (
                      <Listbox.Option
                        key={element.id}
                        className="relative cursor-default select-none py-2 pl-3.5 pr-9"
                        value={element}
                      >
                        <div className="flex items-center cursor-pointer">
                          <span className={clsx(isSelected ? 'text-custom-purple' : 'text-custom-black', 'flex items-center truncate')}>
                            <span className="mr-1">{renderPlatformIcon(element, isSelected)}</span> {StringUtils.capitalize(element.id)} {isSelected && "(Selected)"}
                          </span>
                          {isSelected && <span className="absolute inset-y-0 right-0 flex items-center pr-4" />}
                         </div>
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default Dropdown;