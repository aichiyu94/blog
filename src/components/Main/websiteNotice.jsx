import React from 'react';
/**
 * 网站通告
 */
class WebsiteNotice extends React.Component {
    constructor() {
        super();
        this.state = {
            informs: [
                { title: '买卖得心应手的时候，切忌得意忘形' },
                { title: '有子万事足，无股一身轻' }
            ]
        };
    }
    render() {
        return (
            this.state.informs.map((inform, index) => {
                return (
                    <li key={index}><a href="">{inform.title}</a></li>
                )
            })
        )
    }
}

export default WebsiteNotice