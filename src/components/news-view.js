import React, { Component } from 'react';

class NewsView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    formatData = (data) => {
        const index = data.indexOf("G");
        return data.slice(0, index);
    }

    render() {
        if(this.props.news.length === 0) 
        return null;
        const news = this.props.news;
        const self = this;
        console.log(news[0].data.toDate().toString())
        return (
            <div>
                {
                    news.length > 0 &&
                    <div><h5>News:</h5>
                        <div className="table-responsive">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news.map(function (item) {
                                        return <tr key={item.titlu + "1"}>
                                            <th key={item.titlu + "2"} scope="row">{item.titlu}</th>
                                            <td key={item.titlu + "3"}>{item.descriere}</td>
                                            <td key={item.titlu + "4"}>{self.formatData(item.data.toDate().toString())}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </table></div></div>
                }

            </div>
        )
    }
}

export default NewsView;