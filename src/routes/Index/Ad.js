import React , { Component } from 'react';
import { List,Carousel, WingBlank } from 'antd-mobile';

class Ad extends Component{
    state = {
        data: ['01', '02', '03'],
        imgHeight: 150,
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
                    dotActiveStyle={{backgroundColor:'rgba(0, 204, 99, 0.77)'}}
                    //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    //afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href="#"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={`image/${val}.jpeg`}
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