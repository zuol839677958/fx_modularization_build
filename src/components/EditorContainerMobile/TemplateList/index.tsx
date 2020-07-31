import React, { FC } from 'react'
import { IPageState, ITemplateModel, IBannerModel } from '../../../store/data'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsShowList } from '../../../utils/utils'
import { TemplateType } from '../../EditorContainer/store/state'

//模板
import Banner from '../../../templateMobile/Banner'

interface ITemplateListProps extends RouteComponentProps {
  mobileAllTempData?: ITemplateModel<any>[]
}

const TemplateList: FC<ITemplateListProps> = props => {
  const { mobileAllTempData } = props
  const filterMobileAllTempData = getIsShowList(mobileAllTempData!) as ITemplateModel<any>[]

  if (filterMobileAllTempData.length === 0) return null

  return (
    <>
      {
        filterMobileAllTempData.map(tempData => {
          switch (tempData.type) {
            case TemplateType.Banner:
              return <Banner key={tempData.id} data={tempData.tempData as IBannerModel} />
            default:
              return null
          }
        })
      }
    </>
  )
}

const mapStateToProps = (state: IPageState, ownProps: ITemplateListProps) => ({
  mobileAllTempData: state.editorContainerMobileReducer.allTempData
})

export default connect(mapStateToProps)(TemplateList)