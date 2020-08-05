import React, { FC } from 'react'
import { IPictureTextModel, IIconTitleTextModel } from '../../store/data'
import { getIsShowList } from '../../utils/utils'

import TxtItem from './components/TxtItem'

import './index.less'

interface PictureTextProps {
  data: IPictureTextModel
}

const PictureText: FC<PictureTextProps> = props => {
  const { data } = props

  /**
   * 渲染标题文字内容项
   * @param txtList 标题文字数据
   */
  const renderTxtList = (txtList: IIconTitleTextModel[]) => {
    if (txtList.length === 0) return null
    const filterList = getIsShowList(txtList) as IIconTitleTextModel[]
    if (filterList.length === 0) return null

    return (
      txtList.map((item, index) => (
        <TxtItem data={item} key={index} />
      ))
    )
  }

  return (
    <div className="PictureText_box">
      <div className="PictureText_item">
        {renderTxtList(data.titleTextList)}
        <div className="describe_img">
          <img src={data.picUrl} alt="" data-preview-src data-preview-group="1"
            style={{ width: `${data.picWidthPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default PictureText