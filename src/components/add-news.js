import React, { Component } from 'react';

class AddNews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: "",
            description: ""
         }
    }

    handleChangeTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleChangeDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleAddNews = (event) => {
        event.preventDefault();
        this.props.handleAddNews(this.state.title, this.state. description);
    }

    render() {
        return (
            <div>
                <h3>Add news</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.handleChangeTitle} value={this.state.title} className="form-control" id="title" aria-describedby="name" placeholder="Enter title" />
                        <small id="name" className="form-text text-muted">Choose a descriptive title.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" onChange={this.handleChangeDescription} value={this.state.description} className="form-control" id="description" aria-describedby="description" placeholder="Enter description" />
                        <small id="name" className="form-text text-muted">Insert group description.</small>
                    </div>
                    <button onClick={this.handleAddNews} type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>

        );
    }
}
 
export default AddNews;