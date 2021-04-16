import React, { Component } from 'react';
import { articleCommentRank } from '../../api/article'
import { timeFormat } from '../../utils/timeUtils'

//文章互动
class ArticleInteract extends Component {
    constructor() {
        super()
        this.state = {
            Interacts: []
        }
    }
    componentDidMount() {
        articleCommentRank(4, r => {
            const { data } = r;
            for (let c of data) {
                const timeStr = timeFormat(new Date(c.modifyTime));
                c.modifyTime = timeStr;
            }
            this.setState({
                Interacts: data
            })
        })
    }
    render() {
        return (
            this.state.Interacts.map((article, idx) => {
                return (
                    <li key={idx}>
                        <div className="art-hd-list-left">
                            <a href={'/View?articleId=' + article.id}><img src={article.coverImage} alt="" /></a>
                        </div>
                        <div className="art-hd-list-right">
                            <i className="el-user"></i>{article.authorNickName}
                            <small>{article.modifyTime}</small>
                            <p>{article.firstTitle}</p>
                        </div>
                    </li>
                )
            })
        )
    }
}

export default ArticleInteract