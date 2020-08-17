import React, { FC } from 'react'
import { IPictureTextModel, IIconTitleTextModel } from '@/store/data'
import { getIsShowList } from '@/utils'

import TitleItem from './components/TitleItem'
import TextItem from './components/TextItem'
import ImageItem from './components/ImageItem'

import './index.less'

interface IPictureTextProps {
  data: IPictureTextModel
}

const PictureText: FC<IPictureTextProps> = props => {
  const { data } = props

  /**
   * 渲染标题文字内容项
   * @param txtList 标题文字数据
   */
  const renderTxtList = (txtList: IIconTitleTextModel[]) => {
    if (txtList.length === 0) return null
    const filterList = getIsShowList(txtList) as IIconTitleTextModel[]

    return (
      filterList.map((item, index) => (
        <div className="top_title_text" key={index}>
          <TitleItem {...item} />
          <TextItem {...item} />
        </div>
      ))
    )
  }

  return (
    <div className="PictureText_box">
      <div className="PictureText_item">
        {renderTxtList(data.titleTextList)}
        <ImageItem {...data} />
      </div>
    </div>
  )
}

export default PictureText