import React, { FC, useMemo } from 'react'

interface IIconItemProps {
  hasIcon?: boolean
  iconUrl?: string
}

const IconItem: FC<IIconItemProps> = props => {
  const { hasIcon, iconUrl } = props

  return useMemo(() => (
    <>
      {
        hasIcon ?
          <div className="icon-box">
            <img className="des_icon" src={iconUrl} alt="" />
          </div>
          : null
      }
    </>
  ), [hasIcon, iconUrl])
}

export default IconItem