import React, { Component, Dispatch } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { changeEditorSlideShow } from '../../store/actions';
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
}

class TitleBack extends Component<ITitleBackProps> {
  render() {
    const { title, changeTypeIndex } = this.props

    return (
      <div className="title-back">
        <p onClick={() => changeTypeIndex!(0)}>
          <i style={{ display: this.props.titleArrow ? "inline-block" : "none", marginRight: 5 }}>←</i>
          <i>{title}</i>
        </p>
        <CloseOutlined style={{ fontSize: 14, marginTop: 2 }} onClick={() => this.closeEditorSlide()} />
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
    dispatch(changeEditorSlideShow(isShow))
  },
  changeActiveTempId(activeTempId: string) {
    dispatch(changeActiveTempId(activeTempId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TitleBack)