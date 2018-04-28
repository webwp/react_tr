import React , { Component } from 'react';
import { Carousel, WingBlank,WhiteSpace } from 'antd-mobile';

class CarouselAd extends Component {
  state = {
    slideIndex:0
  }
  render() {
    const data = [
      'http://img.zcool.cn/community/010a1b554c01d1000001bf72a68b37.jpg@1280w_1l_2o_100sh.png', 
      'https://img3.duitang.com/uploads/item/201503/14/20150314212812_kCLmy.thumb.700_0.jpeg', 
      'http://up.qqjia.com/z/17/tu17742_2.jpg'
    ];
    return (
      <div style={{width:'100%',overflow:'hidden'}}>
      <WingBlank>
        <WhiteSpace />
        <Carousel className="space-carousel custom-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={1}
          autoplay
          infinite
          dots={false}
          beforeChange={(from, to ) => console.log(`slide from ${from} to ${to} as `)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {data.map((val, index) => (
            <a
              key={val}
              href="#"
              style={{
                display: 'block',
                position: 'relative',
                //top: this.state.slideIndex === index ? 0 : 0,
                // top: this.state.slideIndex === index ? 0 : 10,
                 height: this.state.slideIndex === index ? 96 : 96,
              }}
            >
              <img
                src={val}
                alt={val}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  //this.setState({ imgHeight: '100px' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
      </div>
    );
  }
}

export default CarouselAd;