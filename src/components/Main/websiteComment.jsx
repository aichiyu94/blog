import React from 'react';
import { websiteCommentList } from '../../api/article'
//留言
class WebsiteComment extends React.Component {
    constructor() {
        super();
        this.state = {
            commentRank: []
        };
    }
    componentDidMount() {
        websiteCommentList({ top: 4 }, r => {
            const { data } = r;
            this.setState({
                commentRank: data
            })
        })
    }
    render() {
        return (
            this.state.commentRank.map((m, index) => {
                return (
                    <li key={index}>
                        <span>{index + 1}</span>
                        <a href="#">{m.text}
                            <b>({m.thumbUpCount})</b>
                        </a>
                    </li>
                )
            })
        )
    }
}

export default WebsiteComment