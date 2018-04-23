import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import { navBack } from '../../utils/navAction';

const Page = ({title, back, right, children, others, history,action , _bool}) => {
	const isAnn = !!(window.APP_CONF.platform == 'ann');
	if(window.originalPostMessage){
        const o = {title:title}
		window.postMessage(JSON.stringify(o));
	}else{
		_bool = true
	}
	if (isAnn) {
		
		//dd.biz.navigation.setTitle({title: title});
	}

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
