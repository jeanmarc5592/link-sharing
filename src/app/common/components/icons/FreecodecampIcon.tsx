import { ReactiveIconProps } from "./types"

const FreecodecampIcon: React.FC<ReactiveIconProps> = ({ isSelected }) => {
  const fillColor = isSelected ? "#633CFF" : "#737373";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <g clip-path="url(#a)">
        <path fill={fillColor} d="M13.257 2.604a.414.414 0 0 0-.236.08c-.054.053-.108.13-.108.209 0 .133.158.316.449.615 1.215 1.17 1.825 2.602 1.821 4.33-.004 1.91-.646 3.446-1.896 4.635-.262.236-.37.42-.371.578 0 .078.053.158.107.236.063.062.146.1.235.108.29 0 .693-.342 1.222-1.006 1.028-1.26 1.493-2.652 1.52-4.55.023-1.898-.572-3.184-1.736-4.513-.42-.475-.769-.721-1.007-.722Zm-10.513.001c-.239 0-.588.247-1.007.722C.572 4.656-.023 5.943.001 7.841c.026 1.897.491 3.288 1.52 4.549.527.665.932 1.007 1.221 1.006a.382.382 0 0 0 .235-.108c.053-.077.106-.158.106-.235 0-.158-.108-.343-.37-.578C1.464 11.285.82 9.751.817 7.84c-.004-1.728.606-3.16 1.821-4.33.291-.299.45-.481.449-.615 0-.078-.054-.155-.108-.209a.414.414 0 0 0-.236-.08h.001Zm4.704.597s.437 1.387-1.766 4.485c-2.104 2.955.697 4.766.955 4.924-.188-.12-1.334-1 .268-3.616.31-.513.717-.98 1.222-2.027 0 0 .447.63.214 1.999-.349 2.067 1.514 1.476 1.542 1.504.651.767-.538 2.114-.611 2.156-.072.04 3.397-2.087.933-5.29-.169.168-.388.961-.845.844-.456-.116 1.417-2.33-1.912-4.979Zm-.811 9.409.025.016-.025-.016Z"/>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default FreecodecampIcon
