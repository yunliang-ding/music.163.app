import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
const Window: any = window
const { Swiper } = Window
@inject('UI', 'Discovery', 'Header', 'Table')
@observer
class Div3 extends React.Component<any, any> {
  props: any
  constructor(props) {
    super(props)
  }
  componentDidMount (){
    new Swiper('.' + this.props.className, {
      slidesPerView: 3.2,
      spaceBetween: 10
    })
  }
  componentDidUpdate() {
    new Swiper('.' + this.props.className, {
      slidesPerView: 3.2,
      spaceBetween: 10
    })
  }
  render() {
    const {
      data,
      className
    } = this.props
    console.log(toJS(data))
    return <div className='app-discovery-div3'>
      <div className='app-discovery-songlist-title'>
        {this.props.title}
        </div>
      <div className='app-discovery-songlist-tips'>
        <span>{this.props.subtitle}</span>
        <button>查看更多</button>
      </div>
      <div className={"swiper-container2 " + className}>
        <div className="swiper-wrapper">
          {
            data && data.map(item=>{
              return <div className="swiper-slide" key={item.id} onClick={
                () => {
                  location.hash = `/playlist`
                  localStorage.setItem('playlistId', item.id)
                  this.props.Table.queryPlaylist(localStorage.getItem('playlistId'))
                  this.props.Header.setNavTitle('歌单')
                }
              }>
                <img src={item.picUrl + '?param=600y600'} />
                <span>{item.name}</span>
              </div>
            })
          }
        </div>
      </div>
    </div>
  }
}
export { Div3 }