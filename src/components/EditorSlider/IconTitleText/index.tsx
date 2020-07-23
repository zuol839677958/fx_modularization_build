import React, { PureComponent, Fragment, Dispatch } from 'react'
import { message, Input, Row, Radio, Button, Slider } from 'antd'
import { connect } from 'react-redux'
import { IIconTitleTextModel, ITemplateModel, IPageState } from '../../../store/data';
import { updateIconTitleTextItemShow, updateCurrentTempData, deleteIconTitleTextItem, swapArray, updateIconTitleTextItemTitle, updateIconTitleTextItemText, updateIconTitleTextItemTitleFontColor, updateIconTitleTextItemTextFontColor, updateIconTitleTextItemTitleBgColor, updateIconTitleTextItemTitleBgType, deepClone, updateIconTitleTextIconUrl, updateIconTitleTextItemTitleBgImageUrl, updateIconTitleTextIconIsShow, insertItemToArray } from '../../../utils/utils'
import TitleBack from "../commonEditorComponent/titleBack"
import { Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { BackgroundSetType } from '../../BackgroundSet/store/state'
import { SketchPicker } from 'react-color'
import { SliderValue } from 'antd/lib/slider'

import Draggable, { IDraggableData } from '../commonEditorComponent/draggable'
import FontColorSet from '../../FontColorSet'
import AliyunOSSUpload from '../../AliyunOSSUpload'
import { changeEditorSliderTab } from '../store/actions'

import './index.less'

interface IEditorIconTitleTextProps {
  isShow?: boolean
  data: ITemplateModel<IIconTitleTextModel[]>
  allTempData?: ITemplateModel<any>[]
  tabTypeIndex?: number
  changeTempData?: (tempData: ITemplateModel<any>[]) => void
  changeTabTypeIndex?: (tabTypeIndex: number) => void
}

interface IEditorIconTitleTextState {
  sort: number
  topTitle: string
  title: string
  editItemIndex?: number
  editItemData?: IIconTitleTextModel
  currentFontColor: string
  fontColorSelectModalVisible: boolean
  fontColorChangeType?: FontColorChangeType
}

enum FontColorChangeType {
  Titile = 1,
  Text
}

class EditorIconTitleText extends PureComponent<IEditorIconTitleTextProps, IEditorIconTitleTextState> {
  state: IEditorIconTitleTextState = {
    sort: 1,
    topTitle: "图标标题文字模板编辑",
    title: "条目管理",
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data, tabTypeIndex } = this.props;
    const {
      title,
      topTitle,
      editItemData,
      currentFontColor,
      fontColorSelectModalVisible
    } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={tabTypeIndex === 1}
          title={topTitle!}
          changeTypeIndex={index => this.changeTypeIndex(index)}
        />
        <div className="item-Manage-content" style={{ display: tabTypeIndex === 0 ? "block" : "none" }}>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>模板间距(像素)</p>
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={200}
              value={data.spacing}
              onChange={this.changeTempSpacing}
            />
          </Row>
          <div className="item-Manage">
            <p>{title}</p>
          </div>
          <Draggable
            data={data.tempData as IDraggableData[]}
            handleCopyItem={this.copyTemplateItem}
            handleEditItem={this.inToDetails}
            handleDeleteItem={this.deleteIconTitle}
            handleIsShowItem={this.changeChecked}
            handleDraggableItemChange={this.changeItemSort}
          />
          <Row style={{ justifyContent: "center" }}>
            <Button type="primary" shape="round"
              style={{ marginTop: '50px', width: 200 }}
              onClick={() => this.addTemplateItem()}
              disabled={data.tempData.length >= 6}
            >加一栏</Button>
          </Row>
        </div>
        <div className="second-Manage-content" style={{ display: tabTypeIndex === 1 ? "block" : "none" }}>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>是否显示图标</p>
            <Radio.Group
              value={editItemData?.hasIcon || false}
              onChange={e => this.changeIconIsShow(e.target.value)}
            >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Row>
          {editItemData?.hasIcon
            ? <Row style={{ marginBottom: 10, flexDirection: 'column' }}>
              <p>修改图标</p>
              <AliyunOSSUpload
                preImageUrl={editItemData?.iconUrl}
                handleUploadImageChange={imageUrl => this.changeIconUrl(imageUrl)}
              />
            </Row> : null}
          <Row className="inputAndColor_wrap">
            <p>修改标题</p>
            <div className="inputAndColor_box">
              <Input placeholder="请输入标题" value={editItemData?.title}
                onChange={e => this.changeItemTitle(e.target.value)}
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
                onChange={e => this.changeTitleBgType(e.target.value)}
              >
                <Radio value={BackgroundSetType.NoneColor}>无</Radio>
                <Radio value={BackgroundSetType.PureColor}>纯色</Radio>
                <Radio value={BackgroundSetType.BackgroundImage}>背景图</Radio>
              </Radio.Group>
            </div>
            {this.renderEditItemTitleBackgroundSet()}
          </Row>
          <Row className="inputAndColor_wrap">
            <p>修改文字</p>
            <div className="inputAndColor_box">
              <Input placeholder="请输入文字" value={editItemData?.text}
                onChange={e => this.changeItemText(e.target.value)}
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

  // 更改模板间距
  changeTempSpacing(spacing: SliderValue) {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换图标显示隐藏
  changeIconIsShow(hasIcon: boolean) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextIconIsShow(hasIcon, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题背景类型
  changeTitleBgType(titleBgType: BackgroundSetType) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgType(titleBgType, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 加载正在编辑条目标题背景
  renderEditItemTitleBackgroundSet(): JSX.Element {
    const { editItemData } = this.state
    switch (editItemData?.background?.bgType) {
      case BackgroundSetType.PureColor:
        return <SketchPicker
          color={editItemData?.background?.bgColor}
          onChange={color => this.changeTitleBackgroundColor(color.hex)}
        />
      case BackgroundSetType.BackgroundImage:
        return <AliyunOSSUpload
          preImageUrl={editItemData?.background?.bgImageUrl}
          handleUploadImageChange={imageUrl => this.changeTitleBackgroundImageUrl(imageUrl)}
        />
      default:
        return <Fragment></Fragment>
    }
  }

  // 更改图标链接
  changeIconUrl(iconUrl: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex, editItemData } = this.state
    updateIconTitleTextIconUrl(iconUrl, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  // 更改标题文本
  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex, editItemData } = this.state
    updateIconTitleTextItemTitle(title, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  // 更改文字内容文本
  changeItemText(text: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex, editItemData } = this.state
    updateIconTitleTextItemText(text, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.setState({ editItemData })
  }

  // 切换页面tab
  changeTypeIndex(tabTypeIndex: number) {
    const { changeTabTypeIndex } = this.props
    changeTabTypeIndex!(tabTypeIndex)
    if (tabTypeIndex === 0) {
      this.setState({ topTitle: '图标标题文字模板编辑' })
    }
  }

  // 进入条目修改详情页
  inToDetails = (draggableData: IDraggableData, draggableIndex: number) => {
    const { changeTabTypeIndex } = this.props
    changeTabTypeIndex!(1)
    this.setState({
      topTitle: '修改详情页',
      editItemIndex: draggableIndex,
      editItemData: draggableData as IIconTitleTextModel
    })
  }

  // 复制条目
  copyTemplateItem = (draggableData: IDraggableData, draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    if (data.tempData.length >= 6) return message.warning('已超过条目最大限制！')
    const tempData = deepClone(data.tempData)
    insertItemToArray(tempData, draggableIndex, draggableData)
    data.tempData = tempData
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 删除条目
  deleteIconTitle = (draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    if (data.tempData.length === 1) return message.warning('最后一条请勿删除')
    data.tempData = deleteIconTitleTextItem(draggableIndex, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换条目显示隐藏
  changeChecked = (checkedState: boolean, draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checkedState, draggableIndex, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换条目排序
  changeItemSort = (dragItemStartIndex: number, dragItemEndIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    swapArray(data.tempData, dragItemStartIndex, dragItemEndIndex)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 加载颜色选择弹窗
  initFontColorSelectModal(fontColorChangeType: FontColorChangeType, currentFontColor: string) {
    this.setState({
      currentFontColor,
      fontColorChangeType
    })
    this.handleFontColorSelectModalVisible(true)
  }

  // 处理颜色选择弹窗显示隐藏
  handleFontColorSelectModalVisible(fontColorSelectModalVisible: boolean) {
    this.setState({ fontColorSelectModalVisible })
  }

  // 更改字体颜色
  handleChangeFontColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { fontColorChangeType, editItemIndex } = this.state
    if (!fontColorChangeType) return

    switch (fontColorChangeType) {
      case FontColorChangeType.Titile:
        updateIconTitleTextItemTitleFontColor(color, editItemIndex!, data.tempData)
        break
      case FontColorChangeType.Text:
        updateIconTitleTextItemTextFontColor(color, editItemIndex!, data.tempData)
        break
      default:
        break
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  // 更改标题背景色
  changeTitleBackgroundColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgColor(color, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题背景图
  changeTitleBackgroundImageUrl(bgImageUrl: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgImageUrl(bgImageUrl, editItemIndex!, data.tempData)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 添加条目
  addTemplateItem() {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    const copyItem = deepClone(tempData[0])
    tempData.push(copyItem)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorIconTitleTextProps) => ({
  currentTemplateId: state.editorContainerReducer.activeTempId,
  allTempData: state.editorContainerReducer.allTempData,
  tabTypeIndex: state.editorSliderReducer.tabTypeIndex
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeTempData(allTempData))
  },
  changeTabTypeIndex(tabTypeIndex: number) {
    dispatch(changeEditorSliderTab(tabTypeIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorIconTitleText)