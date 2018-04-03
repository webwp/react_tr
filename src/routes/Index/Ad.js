import React , { Component } from 'react';
import { List,Carousel, WingBlank } from 'antd-mobile';

class Ad extends Component{
    state = {
        data: ['1', '2', '3'],
        imgHeight: 180,
        slideIndex: 0,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['01', '02', '03'],
            });
            }, 100);
        }
    render(){
        return (
            <div style={{marginTop:'0'}}>
                 <WingBlank className="custom_wingblank">
                 <Carousel
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    //afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={`http://192.168.2.126:8000/image/${val}.jpg`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                 </WingBlank>
            </div>
        )
    }
}

export default Ad;