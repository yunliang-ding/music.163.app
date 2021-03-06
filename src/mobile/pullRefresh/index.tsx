import * as React from "react"
import './index.less'
const $:any = document.querySelector.bind(document)
class PullRefresh extends React.Component<any, any> {
  props: any
  start: any = 0
  startX: any = 0
  end: any = 0
  constructor(props) {
    super(props)
  }
  bind = (element, type, callback) => {
    element = element || $('.mobile_pull_refresh')
    element.addEventListener(type, callback, false);
  }
  touchstart = (event) => {
    $('.mobile_pull_refresh_loading_iconfont').style.transition = `0s`
    var touch = event.targetTouches[0];
    this.start = touch.pageY
    this.startX = touch.pageX
  }
  touchmove = (e) => {
    let { element } = this.props
    let elementDom = $(element) || $('.mobile_pull_refresh')
    if(e.targetTouches.length > 0 && elementDom.scrollTop === 0 && Math.abs(e.touches[0].pageX - this.startX) < 40){
      this.end = e.touches[0].pageY - this.start
      this.end = this.end > 120 ? 120 : this.end
      $('.mobile_pull_refresh_loading_iconfont').style.top = this.end
      $('.mobile_pull_refresh_loading_iconfont').style.transform = `rotate(${this.end * 3}deg)`
      $('.mobile_pull_refresh_loading_iconfont').style.opacity = this.end / 120
    }
    if(elementDom.scrollTop > 50){
      $('.app-header').classList.add('app-header-shadow')
    } else {
      $('.app-header').classList.remove('app-header-shadow')
    }
  }
  touchend = () => {
    if (this.end === 120) { // 开始刷新操作
      $('.mobile_pull_refresh_loading_iconfont').style.top = 80
      $('.mobile_pull_refresh_loading_iconfont').classList.remove('icon-shuaxin1111')
      $('.mobile_pull_refresh_loading_iconfont').classList.add('icon-loading')
      $('.mobile_pull_refresh_loading_iconfont').style.transition = `.5s`
      $('.mobile_pull_refresh_loading_iconfont').style.animation = 'refresh-animation .8s linear infinite'
      setTimeout(() => {
        this.clear()
        // window.location.reload()
      }, 1000)
    } else {
      this.clear()
    }
  }
  clear = () => {
    $('.mobile_pull_refresh_loading_iconfont').style.transition = `.5s`
    $('.mobile_pull_refresh_loading_iconfont').style.top = -50
    $('.mobile_pull_refresh_loading_iconfont').style.animation = ''
    $('.mobile_pull_refresh_loading_iconfont').style.transform = `rotate(0deg)`
    $('.mobile_pull_refresh_loading_iconfont').classList.add('icon-shuaxin1111')
    $('.mobile_pull_refresh_loading_iconfont').classList.remove('icon-loading')
    this.end = 0
    this.start = 0
  }
  componentDidUpdate (){
    let { element } = this.props // 下拉的对象
    this.bind($(element), "touchstart", this.touchstart)
    this.bind($(element), "touchmove", this.touchmove)
    this.bind($(element), "touchend", this.touchend)
  }
  componentDidMount (){
    let { element } = this.props // 下拉的对象
    this.bind($(element), "touchstart", this.touchstart)
    this.bind($(element), "touchmove", this.touchmove)
    this.bind($(element), "touchend", this.touchend)
  }
  render(){
    return <div className='mobile_pull_refresh' style={this.props.style}>
      <div className='mobile_pull_refresh_loading'>
        <i className='iconfont icon-shuaxin1111 mobile_pull_refresh_loading_iconfont'></i>
      </div>
      {this.props.children}
    </div>
  }
}
export { PullRefresh }