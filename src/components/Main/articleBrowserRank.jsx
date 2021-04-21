import React from 'react';
import { articleBrowserRank } from '../../api/article'

//文章浏览排行
class ArticleBrowserRank extends React.Component {
    constructor() {
        super()
        this.state = {
            browserRank: []
        }
    }
    componentDidMount() {
        articleBrowserRank({ top: 5 }, r => {
            const { data } = r;
            let rank = [];
            for (const a of data) {
                rank.push({
                    id: a.id,
                    firstTitle: a.firstTitle,
                    browserCount: a.browserCount
                });
            }
            this.setState({
                browserRank: rank
            })
        })
    }

    render() {
        return (
            this.state.browserRank.map((article, idx) => {
                return (
                    <li key={idx}>
                        <span>{idx + 1}</span>
                        <a href={'/View?articleId=' + article.id}>{article.firstTitle}
                            <b>({article.browserCount})</b>
                        </a>
                    </li>
                )
            })
        )
    }
}


export default ArticleBrowserRank