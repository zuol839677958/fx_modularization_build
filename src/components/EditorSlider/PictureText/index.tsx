import React, { PureComponent, Fragment } from 'react'
import { IPageState, ITemplateModel, IPictureTextModel, IIconTitleTextModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { updateIconTitleTextItemShow, updateCurrentTempData, swapArray, deleteIconTitleTextItem, updateIconTitleTextItemTitle, updateIconTitleTextItemText, updateIconTitleTextItemTitleFontColor, updateIconTitleTextItemTextFontColor, updateIconTitleTextItemTitleBgType, updateIconTitleTextItemTitleBgColor, deepClone, updateIconTitleTextItemTitleBgImageUrl, insertItemToArray, updateIconTitleTextItemTitleFontSize } from '../../../utils/utils'
import { message, Input, Row, Button, Radio, Slider } from 'antd'
import { BackgroundSetType } from '../../BackgroundSet/store/state'
import { SketchPicker } from 'react-color'
import { changeEditorSliderTab } from '../store/actions'
import { SliderValue } from 'antd/lib/slider'
import { changeMobileTempData } from '../../EditorContainerMobile/store/actions'

import TitleBack from '../commonEditorComponent/titleBack'
import Draggable, { IDraggableData } from '../commonEditorComponent/draggable'
import RichTextEditor from '../../RichTextEditor'
import FontColorSet from '../../FontColorSet'
import AliyunOSSUpload from '../../AliyunOSSUpload'

import './index.less'

interface IEditorPictureTextProps {
  isMobile?: boolean
  data: ITemplateModel<IPictureTextModel>
  allTempData?: ITemplateModel<any>[]
  tabTypeIndex?: number
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
  changeTabTypeIndex?: (tabTypeIndex: number) => void
}

interface IEditorPictureTextState {
  tabTitle: string
  editItemIndex?: number
  editItemData?: IIconTitleTextModel
  richTextEditorModalVisible: boolean
  currentFontColor: string
  fontColorSelectModalVisible: boolean
  fontColorChangeType?: FontColorChangeType
}

enum FontColorChangeType {
  Titile = 1,
  Text
}

class EditorPictureText extends PureComponent<IEditorPictureTextProps, IEditorPictureTextState> {
  state: IEditorPictureTextState = {
    tabTitle: '图文模板编辑',
    richTextEditorModalVisible: false,
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data, tabTypeIndex } = this.props
    const {
      tabTitle,
      editItemData,
      richTextEditorModalVisible,
      currentFontColor,
      fontColorSelectModalVisible
    } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={tabTypeIndex === 1}
          title={tabTitle}
          changeTypeIndex={this.changeTabTypeIndex}
        />
        <div className="editor_box" style={{ display: tabTypeIndex === 0 ? "block" : "none" }}>
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
          <p>更换图片</p>
          <AliyunOSSUpload
            preImageUrl={data.tempData.picUrl}
            handleUploadImageChange={this.changePictureUrl}
          />
          <p style={{ marginTop: 20 }}>图片宽度(%)</p>
          <div className="spacing-box">
            <Slider
              style={{ width: '100%' }}
              min={10}
              max={100}
              value={data.tempData.picWidthPercent}
              onChange={this.changePictureWidthPercent}
            />
          </div>
          <p>图文间距(%)</p>
          <div className="spacing-box">
            <Slider
              style={{ width: '100%' }}
              min={1}
              max={50}
              value={data.tempData.spacingPercent}
              onChange={this.changePictureTextSpacing}
            />
          </div>
          <p>条目管理</p>
          <Draggable
            data={data.tempData.titleTextList}
            handleCopyItem={this.copyTemplateItem}
            handleEditItem={this.initEditDetails}
            handleDeleteItem={this.deleteTxtListItem}
            handleIsShowItem={this.checkedTxtListItem}
            handleDraggableItemChange={this.changeTxtListItemSort}
          />
          <Row style={{ justifyContent: "center" }}>
            <Button type="primary" shape="round"
              style={{ marginTop: '50px', width: 200 }}
              onClick={this.addTemplateItem}
              disabled={data.tempData.titleTextList.length >= 6}
            >加一栏</Button>
          </Row>
        </div>
        <div className="details_box" style={{ display: tabTypeIndex === 1 ? "block" : "none" }}>
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
            <p>修改标题字体大小</p>
            <Slider
              style={{ width: '100%' }}
              min={10}
              max={50}
              value={editItemData?.titleFontSize}
              onChange={this.changeItemTitleFontSize}
            />
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
              <Button type="primary" shape="round"
                onClick={() => this.handleRichTextEditorModalVisible(true)}
              >编辑内容</Button>
              {/* <div className="fontColorSelect"
                style={{ background: editItemData?.textFontColor }}
                onClick={() => this.initFontColorSelectModal(FontColorChangeType.Text, editItemData!.titleFontColor!)}
              ></div> */}
            </div>
          </Row>
          <RichTextEditor
            modalVisible={richTextEditorModalVisible}
            richTextContent={editItemData?.text as string}
            handleModalVisible={this.handleRichTextEditorModalVisible}
            saveContent={this.changeItemText}
          />
        </div>
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={this.handleFontColorSelectModalVisible}
          handleChangeFontColor={this.handleChangeFontColor}
        />
      </Fragment>
    )
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

  // 更改模板间距
  changeTempSpacing = (spacing: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题文本
  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitle(title, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题文字大小
  changeItemTitleFontSize = (titleFontSize: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleFontSize(titleFontSize as number, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 处理富文本编辑弹窗显示隐藏
  handleRichTextEditorModalVisible = (richTextEditorModalVisible: boolean) => {
    this.setState({ richTextEditorModalVisible })
  }

  // 更改文字内容文本
  changeItemText = (text: string) => {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemText(text, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleRichTextEditorModalVisible(false)
  }

  // 更换图片
  changePictureUrl = (picUrl: string) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.picUrl = picUrl
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改图片宽度
  changePictureWidthPercent = (picWidthPercent: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.picWidthPercent = picWidthPercent as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改图文间距
  changePictureTextSpacing = (spacing: SliderValue) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData.spacingPercent = spacing as number
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换页面tab
  changeTabTypeIndex = (tabTypeIndex: number) => {
    const { changeTabTypeIndex } = this.props
    changeTabTypeIndex!(tabTypeIndex)
    if (tabTypeIndex === 0) {
      this.setState({ tabTitle: '图文模板编辑' })
    }
  }

  // 进入条目编辑详情页
  initEditDetails = (draggableData: IDraggableData, draggableIndex: number) => {
    const { changeTabTypeIndex } = this.props
    changeTabTypeIndex!(1)
    this.setState({
      tabTitle: '修改详情页',
      editItemIndex: draggableIndex,
      editItemData: draggableData as IIconTitleTextModel
    })
  }

  // 复制条目
  copyTemplateItem = (draggableData: IDraggableData, draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    if (data.tempData.titleTextList.length >= 6) return message.warning('已超过条目最大限制！')
    const tempData = deepClone(data.tempData)
    insertItemToArray(tempData.titleTextList, draggableIndex, draggableData)
    data.tempData = tempData
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 删除条目
  deleteTxtListItem = (draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    if (tempData.titleTextList.length === 1) return message.warning('最后一条请勿删除')
    tempData.titleTextList = deleteIconTitleTextItem(draggableIndex, tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换条目显示隐藏
  checkedTxtListItem = (checked: boolean, draggableIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checked, draggableIndex, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改条目排序
  changeTxtListItemSort = (dragItemStartIndex: number, dragItemEndIndex: number) => {
    const { data, allTempData, changeTempData } = this.props
    swapArray(data.tempData.titleTextList, dragItemStartIndex, dragItemEndIndex)
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
  handleFontColorSelectModalVisible = (fontColorSelectModalVisible: boolean) => {
    this.setState({ fontColorSelectModalVisible })
  }

  // 更改字体颜色
  handleChangeFontColor = (color: string) => {
    const { data, allTempData, changeTempData } = this.props
    const { fontColorChangeType, editItemIndex } = this.state
    if (!fontColorChangeType) return

    switch (fontColorChangeType) {
      case FontColorChangeType.Titile:
        updateIconTitleTextItemTitleFontColor(color, editItemIndex!, data.tempData.titleTextList)
        break
      case FontColorChangeType.Text:
        updateIconTitleTextItemTextFontColor(color, editItemIndex!, data.tempData.titleTextList)
        break
      default:
        break
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  // 更改标题背景类型
  changeTitleBgType(titleBgType: BackgroundSetType) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgType(titleBgType, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题背景色
  changeTitleBackgroundColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgColor(color, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题背景图
  changeTitleBackgroundImageUrl(bgImageUrl: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemIndex } = this.state
    updateIconTitleTextItemTitleBgImageUrl(bgImageUrl, editItemIndex!, data.tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 添加条目
  addTemplateItem = () => {
    const { data, allTempData, changeTempData } = this.props
    const { titleTextList } = data.tempData
    const copyItem = deepClone(titleTextList[0])
    titleTextList.push(copyItem)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorPictureTextProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
  tabTypeIndex: state.editorSliderReducer.tabTypeIndex
})

const mapDispatchToProps = (dispatch: Dispatch<Action>, ownProps: IEditorPictureTextProps) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    if (ownProps.isMobile) {
      dispatch(changeMobileTempData(allTempData))
    } else {
      dispatch(changeTempData(allTempData))
    }
  },
  changeTabTypeIndex(tabTypeIndex: number) {
    dispatch(changeEditorSliderTab(tabTypeIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPictureText)