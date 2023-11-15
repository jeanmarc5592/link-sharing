import { Fragment, } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { PlatformObject } from '../../../lib/constants/platforms';
import { StringUtils } from '@/lib/utils/string';

interface DropdownProps {
  label: string;
  data: PlatformObject[];
  selected: PlatformObject;
  setSelected: (platformObject: PlatformObject) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, data, selected, setSelected }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-custom-gray">{label}</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-pointer bg-white py-2.5 pl-3 pr-10 text-left text-custom-black border border-custom-gray-lighter custom-black rounded-md focus:border-custom-purple">
              <span className="flex items-center">
                <span className="block truncate">{StringUtils.capitalize(selected.id)}</span>
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
                {data.map((element) => (
                  <Listbox.Option
                    key={element.id}
                    className="relative cursor-default select-none py-2 pl-3 pr-9"
                    value={element}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center cursor-pointer">
                          <span
                            className={clsx(selected ? 'text-custom-purple' : 'text-custom-black', 'block truncate')}
                          >
                            {StringUtils.capitalize(element.id)} {selected && "(Selected)"}
                          </span>
                          {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-custom-purple',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <></>
                          </span>
                        ) : null}
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Dropdown;