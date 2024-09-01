import React from 'react'

interface HeaderBoxProps {
  title: string;
  highlight: string;
  subtext: string;
}

const HeaderBox = ({ title, highlight, subtext }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">
        {title}
        <span className="text-blue-600">
          &nbsp;{highlight}
        </span>
      </h1>
      <p className="text-gray-500">
        {subtext}
      </p>
    </div>
  )
}

export default HeaderBox;