import React, { Component, Dispatch, Fragment } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState } from '../../store/data'
import { TemplateType } from './store/state'
import { changeEditorSlideShow } from '../EditorSlide/store/actions'
import { changeActiveTempId, changeTempData } from './store/actions'
import { getIsShowList } from '../../utils/utils'

//模板
import IconTitleText from '../../template/IconTitleText'
import PictureText from '../../template/PictureText'

import './index.less'

interface IEditorContainerProps {
  activeTempId?: string;
  allTempData?: ITemplateModel[]
  isShowSlider?: boolean
  changeEditorSliderShow?: (isShow: boolean) => void
  changeActiveTempId?: (activeTempId: string) => void
  changeTempData?: (tempData: ITemplateModel[]) => void
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { allTempData, isShowSlider } = this.props

    return (
      <div className="editor-content" style={{ paddingLeft: isShowSlider ? "340px" : "0px" }}>
        <div className="editor-wrap">
          {this.renderAllTemplate(allTempData as ITemplateModel[])}
        </div>
      </div>
    )
  }

  renderAllTemplate(allTempData: ITemplateModel[]): JSX.Element {
    if (allTempData.length === 0) return <Fragment></Fragment>
    const { activeTempId, changeActiveTempId, changeTempData } = this.props
    const filterAllTempData = getIsShowList(allTempData) as ITemplateModel[]
    return (
      <Fragment>
        {
          filterAllTempData.map(tempData => {
            switch (tempData.type) {
              case TemplateType.IconTitleText:
                return <IconTitleText
                  key={tempData.id}
                  activeTempId={activeTempId as string}
                  allTempData={filterAllTempData}
                  iconTitleTextTempData={tempData}
                  changeActiveTempId={(activeTempId: string) => changeActiveTempId && changeActiveTempId(activeTempId)}
                  showEditorSlider={() => this.showEditorSlider()}
                  changeTempData={(tempData: ITemplateModel[]) => changeTempData && changeTempData(tempData)}
                />
              case TemplateType.LeftPictureRightText:
              case TemplateType.LeftTextRightPicture:
                return <PictureText
                  key={tempData.id}
                  activeTempId={activeTempId as string}
                  allTempData={filterAllTempData}
                  pictureTextTempData={tempData}
                  changeActiveTempId={(activeTempId: string) => changeActiveTempId && changeActiveTempId(activeTempId)}
                  showEditorSlider={() => this.showEditorSlider()}
                  changeTempData={(allTempData: ITemplateModel[]) => changeTempData && changeTempData(allTempData)}
                />
              default:
                return <Fragment></Fragment>
            }
          })
        }
      </Fragment>
    )
  }

  showEditorSlider() {
    const { isShowSlider, changeEditorSliderShow } = this.props
    if (isShowSlider) return
    changeEditorSliderShow && changeEditorSliderShow(true)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorContainerProps) => ({
  activeTempId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  isShowSlider: state.editorSlideReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSliderShow(isShow: boolean) {
    dispatch(changeEditorSlideShow(isShow))
  },
  changeActiveTempId(activeTempId: string) {
    dispatch(changeActiveTempId(activeTempId))
  },
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
