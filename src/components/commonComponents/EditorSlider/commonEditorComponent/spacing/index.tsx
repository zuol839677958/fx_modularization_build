import React, { FC } from 'react'
import { Row, Slider } from 'antd'
import { connect } from 'react-redux'
import { IPageState, ITemplateModel } from '@/store/data'
import { changeMobileTempData } from '@/store/actions/editor.mobile.actions'
import { changeTempData } from '@/store/actions/editor.actions'
import { Dispatch, Action } from 'redux'
import { updateCurrentTempData } from '@/utils'

interface ISpacingProps {
  data: ITemplateModel<any>
  allTempData?: ITemplateModel<any>[]
  isMobile?: boolean
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

const Spacing: FC<ISpacingProps> = props => {
  const { data, allTempData, changeTempData } = props

  /**
   * 更新模板间距
   * @param value 滑块改变的值
   * @param isTopSpacing 是否为模板上边距更改
   */
  const changeTempSpacing = (value: number, isTopSpacing: boolean) => {
    if (isTopSpacing) data.topSpacing = value
    else data.bottomSpacing = value
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  return (
    <>
      <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
        <p>模板上间距(像素)</p>
        <Slider
          style={{ width: '100%' }}
          min={0}
          max={200}
          value={data.topSpacing}
          onChange={(value: number) => changeTempSpacing(value, true)}
        />
      </Row>
      <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
        <p>模板下间距(像素)</p>
        <Slider
          style={{ width: '100%' }}
          min={0}
          max={200}
          value={data.bottomSpacing}
          onChange={(value: number) => changeTempSpacing(value, false)}
        />
      </Row>
    </>
  )
}

const mapStateToProps = (state: IPageState, ownProps: ISpacingProps) => ({
  allTempData: ownProps.isMobile ? state.editorContainerMobileReducer.allTempData : state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: ISpacingProps) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      dispatch(changeMobileTempData(allTempData))
    } else {
      dispatch(changeTempData(allTempData))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Spacing)