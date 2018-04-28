import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import { navBack } from '../../utils/navAction';
/*
*title  nav 标题  
*borderBottom bool true和false
*someThing 与RN交互的数据
*mode nav 的样式
*_bool 是否显示导航
*others  nav 组件其它一些设置
*children Page要包涵的内容（组件）
*/
const Page = ({title, back, right, children, others, history,action , _bool,someThing,mode , borderBottom}) => {
	const isAnn = !!(window.APP_CONF.platform == 'ann');
	/*
	*页面渲染前判断是否载入postMessage
	*向RN发送基础数据（返回按钮，导航标题，右侧文本（图标），右侧按钮事件）
	*/
	if(window.originalPostMessage){
        const res = {title:title,...someThing};
		window.postMessage(JSON.stringify(res));
		_bool = false;
	}else{
		
	}
	if (isAnn) {
		
		//dd.biz.navigation.setTitle({title: title});
	}
	const styles = borderBottom ? {borderBottom:'1px solid #f5f5f5'} : {borderBottom:'none'}
	return (
		<div style={{height:'100%'}}>
			{_bool &&
				<NavBar
				    style = {styles}
				    mode='dark'
					onLeftClick={()=>navBack(back,history)}
					rightContent={right}
					icon={<Icon type="left" className='txt-color-green-big' />}
					{...others}
					>
					{title}
				</NavBar>
			}
			{children}
		</div>
	);
};

Page.propTypes = {
	history: PropTypes.object.isRequired,
};

Page.defaultProps = {
	title: '出行南宁',
	back: '/',
	right: null,
};

export default Page;
