import React, { Component, Fragment, Dispatch } from 'react'
import { message, Input, Row, Radio } from 'antd'
import { connect } from 'react-redux'
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../store/data';
import { updateIconTitleTextItemShow, updateCurrentTempData, deleteIconTitleTextItem, swapArray, updateIconTitleTextItemTitle, updateIconTitleTextItemText, updateIconTitleTextItemTitleFontColor, updateIconTitleTextItemTextFontColor, updateIconTitleTextItemTitleBgColor, updateIconTitleTextItemTitleBgType } from '../../../utils/utils'
import TitleBack from "../commonEditorComponent/titleBack"
import { Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { BackgroundSetType } from '../../BackgroundSet/store/state'
import { SketchPicker } from 'react-color'

import Draggable, { IDraggableData } from '../commonEditorComponent/draggable'
import FontColorSet from '../../FontColorSet'

import './index.less'

interface IEditorIconTitleTextProps {
  isShow?: boolean
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  titleArrow?: boolean
  changeTempData?: (tempData: ITemplateModel[]) => void
}

interface IEditorIconTitleTextState {
  typeIndex: number
  sort: number
  topTitle: string
  title: string
  editItemData?: IIconTitleTextModel
  currentFontColor: string
  fontColorSelectModalVisible: boolean
  fontColorChangeType?: FontColorChangeType
}

enum FontColorChangeType {
  Titile = 1,
  Text
}

class EditorIconTitleText extends Component<IEditorIconTitleTextProps, IEditorIconTitleTextState> {
  state: IEditorIconTitleTextState = {
    sort: 1,
    typeIndex: 0,
    topTitle: "图标标题文字模板编辑",
    title: "条目管理",
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data } = this.props;
    const {
      typeIndex,
      title,
      topTitle,
      editItemData,
      currentFontColor,
      fontColorSelectModalVisible
    } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={typeIndex === 1}
          title={topTitle!}
          changeTypeIndex={(index) => this.changeTypeIndex(index)}
        />
        <div className="item-Manage-content" style={{ display: typeIndex === 0 ? "block" : "none" }}>
          <div className="item-Manage">
            <p>{title}</p>
          </div>
          <Draggable
            data={data.tempData as IDraggableData[]}
            handleEditItem={(itemData: IDraggableData) => this.inToDetails(itemData as IIconTitleTextModel)}
            handleDeleteItem={(itemSort: number) => this.deleteIconTitle(itemSort)}
            handleIsShowItem={(checked: boolean, itemSort: number) => this.changeChecked(checked, itemSort)}
            handleDraggableItemChange={(dragItemStartIndex: number, dragItemEndIndex: number) =>
              this.changeItemSort(dragItemStartIndex, dragItemEndIndex)}
          />
        </div>
        <div className="second-Manage-content" style={{ display: typeIndex === 1 ? "block" : "none" }}>
          <Row className="inputAndColor_wrap">
            <p>修改标题</p>
            <div className="inputAndColor_box">
              <Input placeholder="请输入标题" maxLength={10} value={editItemData?.title}
                onChange={(e) => this.changeItemTitle(e.target.value)}
              />
              <div className="fontColorSelect"
                style={{ background: editItemData?.titleFontColor }}
                onClick={() => this.initFontColorSelectModal(FontColorChangeType.Titile, editItemData!.titleFontColor!)}
              ></div>
            </div>
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>修改标题背景色</p>
            <div style={{ marginBottom: 10 }}>
              <Radio.Group
                value={editItemData?.background?.bgType}
                onChange={(e) => this.changeTitleBgType(e.target.value)}
              >
                <Radio value={BackgroundSetType.PureColor}>纯色</Radio>
                <Radio value={BackgroundSetType.BackgroundImage}>背景图</Radio>
              </Radio.Group>
            </div>
            {this.renderEditItemTitleBackgroundSet()}
          </Row>
          <Row className="inputAndColor_wrap">
            <p>修改文字</p>
            <div className="inputAndColor_box">
              <Input placeholder="请输入文字" maxLength={20} value={editItemData?.text}
                onChange={(e) => this.changeItemText(e.target.value)}
              />
              <div className="fontColorSelect"
                style={{ background: editItemData?.textFontColor }}
                onClick={() => this.initFontColorSelectModal(FontColorChangeType.Text, editItemData!.titleFontColor!)}
              ></div>
            </div>
          </Row>
        </div>
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={flag => this.handleFontColorSelectModalVisible(flag)}
          handleChangeFontColor={color => this.handleChangeFontColor(color)}
        />
      </Fragment >
    )
  }

  changeTitleBgType(titleBgType: BackgroundSetType) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitleBgType(titleBgType, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  renderEditItemTitleBackgroundSet(): JSX.Element {
    const { editItemData } = this.state
    switch (editItemData?.background?.bgType) {
      case BackgroundSetType.PureColor:
        return <SketchPicker
          color={editItemData?.background?.bgColor}
          onChange={color => this.changeTitleBackgroundColor(color.hex)}
        />
      case BackgroundSetType.BackgroundImage:
      default:
        return <Fragment></Fragment>
    }
  }

  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitle(title, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  changeItemText(text: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemText(text, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  changeTypeIndex(typeIndex: number) {
    this.setState({ typeIndex })
    if (typeIndex === 0) {
      this.setState({ topTitle: '图标标题文字模板编辑' })
    }
  }

  inToDetails(editItemData: IIconTitleTextModel) {
    this.setState({
      topTitle: '修改详情页',
      typeIndex: 1,
      editItemData
    })
  }

  deleteIconTitle(sort: number) {
    const { data, allTempData, changeTempData } = this.props;
    if ((data.tempData as IIconTitleTextModel[]).length === 1) return message.warning('最后一条请勿删除');
    data.tempData = deleteIconTitleTextItem(sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  changeChecked(checkedState: boolean, sort: number) {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checkedState, sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  changeItemSort(dragItemStartIndex: number, dragItemEndIndex: number) {
    const { data, allTempData, changeTempData } = this.props
    swapArray(data.tempData as IIconTitleTextModel[], dragItemStartIndex, dragItemEndIndex)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  initFontColorSelectModal(fontColorChangeType: FontColorChangeType, currentFontColor: string) {
    this.setState({
      currentFontColor,
      fontColorChangeType
    })
    this.handleFontColorSelectModalVisible(true)
  }

  handleFontColorSelectModalVisible(fontColorSelectModalVisible: boolean) {
    this.setState({ fontColorSelectModalVisible })
  }

  handleChangeFontColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { fontColorChangeType, editItemData } = this.state
    if (!fontColorChangeType) return

    switch (fontColorChangeType) {
      case FontColorChangeType.Titile:
        updateIconTitleTextItemTitleFontColor(color, editItemData!.sort, data.tempData as IIconTitleTextModel[])
        break
      case FontColorChangeType.Text:
        updateIconTitleTextItemTextFontColor(color, editItemData!.sort, data.tempData as IIconTitleTextModel[])
        break
      default:
        break
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  changeTitleBackgroundColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitleBgColor(color, editItemData!.sort, data.tempData as IIconTitleTextModel[])
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorIconTitleTextProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorIconTitleText)