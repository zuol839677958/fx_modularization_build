import React, { PureComponent, Dispatch } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { changeEditorSliderShow } from '../../store/actions';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { IPageState } from '../../../../store/data';
import { changeActiveTempId } from '../../../EditorContainer/store/actions';

import './index.less';

interface ITitleBackProps {
  titleArrow: boolean;
  title: string;
  changeTypeIndex?: (index: number) => void;
  changeEditorSlideShow?: (isShow: boolean) => void
  changeActiveTempId?: (activeTempId: string) => void
  customCloseSlider?: () => void
}

class TitleBack extends PureComponent<ITitleBackProps> {
  render() {
    const { title, titleArrow, changeTypeIndex, customCloseSlider } = this.props

    return (
      <div className="title-back">
        <p onClick={() => {
          if (titleArrow) changeTypeIndex!(0)
        }}>
          <i style={{ display: titleArrow ? "inline-block" : "none", marginRight: 5 }}>←</i>
          <i>{title}</i>
        </p>
        <CloseOutlined
          style={{ fontSize: 14, marginTop: 2 }}
          onClick={() => {
            if (customCloseSlider) customCloseSlider()
            else this.closeEditorSlide()
          }}
        />
      </div>
    )
  }

  closeEditorSlide() {
    const { changeTypeIndex, changeEditorSlideShow, changeActiveTempId } = this.props;
    changeTypeIndex && changeTypeIndex(0);
    changeEditorSlideShow!(false)
    changeActiveTempId!('')
  }


}
const mapStateToProps = (state: IPageState, ownProps: ITitleBackProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeEditorSliderShow(isShow))
  },
  changeActiveTempId(activeTempId: string) {
    dispatch(changeActiveTempId(activeTempId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TitleBack)