import React from 'react'

export function Reveal({ children, className = '', delay = 0, as = 'div', variant = 'ink' }) {
  const Component = as
  return <Component className={className} data-reveal={variant} style={{ '--reveal-delay': `${delay}s` }}>{children}</Component>
}

export function Divider({ label = 'فصلٌ جديد' }) {
  return <div className="divider" aria-hidden="true"><span className="divider-line"/><span className="divider-mark">✳</span><span className="divider-label">{label}</span><span className="divider-line"/></div>
}
