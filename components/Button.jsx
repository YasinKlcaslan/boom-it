import React from 'react'

function Button({
  children,
  className = '',
  icon: Icon,
  dark = false,
  border = false,
  group = false,
  full = false,
  textSize = 'base',
  hover = '',
  ...props
}) {
  let base = 'py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer';
  let color = dark ? 'bg-[#171717] text-white' : 'bg-white text-black';
  let borderStyle = border ? (dark ? 'border border-white' : 'border border-black') : '';
  let groupStyle = group ? 'group' : '';
  let fullStyle = full ? 'w-full' : '';
  let textSizeStyle = textSize === 'base' ? 'text-base' : textSize;
  let hoverStyle = hover;

  return (
    <button
      className={`
        ${base} 
        ${color} 
        ${borderStyle} 
        ${groupStyle} 
        ${fullStyle} 
        ${textSizeStyle} 
        ${hoverStyle} 
        ${className}`.replace(/\s+/g, ' ')}
      {...props}
    >
      {Icon && <span className="flex items-center">{typeof Icon === 'function' ? <Icon /> : Icon}</span>}
      {children}
    </button>
  );
}

export default Button