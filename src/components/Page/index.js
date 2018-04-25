import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import { navBack } from '../../utils/navAction';

const Page = ({title, back, right, children, others, history,action , _bool,someThing}) => {
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
    _bool = true;
	return (
		<div>
			{_bool &&
				<NavBar
					onLeftClick={()=>navBack(back,history)}
					rightContent={right}
					icon={<Icon type="left" />}
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
