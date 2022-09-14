/* eslint-disable no-undef */
import { SVGProps } from 'react'

export default function chevronIcon (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className="text-white"
      fill="currentColor"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
    </svg>
  )
}