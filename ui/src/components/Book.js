import React, { Component } from 'react'
import { Card, Button, Input } from 'reactstrap';

import {BASE_URL} from '../config'

export default class extends Component {
    state = {
        deleteURL: BASE_URL + "/books/" + this.props.content._id,
        updateURL: BASE_URL + "/books",
        isUpdating : false,
        updateButton: "Update",
        title: this.props.content.title,
        author: this.props.content.author
    }

    updateBook = async (event) => {
        event.preventDefault()
        if(this.state.isUpdating){
            const body = {
                "title": this.state.title,
                "author": this.state.author,
                "id": this.props.content._id
            }
            await fetch(this.state.updateURL, {method: 'PUT', body: JSON.stringify(body)})
            this.setState({updateButton: "Update"})
        }else {
            this.setState({updateButton: "Submit"})
        }
        this.setState({isUpdating: !this.state.isUpdating })
    }

    deleteBook = async (event) => {
        event.preventDefault()
        await fetch(this.state.deleteURL, {method: 'DELETE'})
        window.location.reload(true);
    }

    updateBookForm = () => {
        return (
            <form>
                <Input type="text" value={this.state.title}//placeholder="Title"
                       onChange={event => this.setState({title: event.target.value})}/>
                <br/>
                <Input type="text" value={this.state.author} // placeholder="Author"
                       onChange={event => this.setState({author: event.target.value})}/>
            </form>
        )
    }

    displayBook = () => {
        return (
            <div>
                <h4>{this.state.title}</h4>
                <h5>by: {this.state.author}</h5>
            </div>
        )
    }

    render() {
        const update = this.updateBookForm()
        const display = this.displayBook()
        return (
            <Card className="book" body inverse color="info">
                <h3>This Book</h3>
                { this.state.isUpdating ? update : display}
                <form onSubmit={this.updateBook}>
                    <Button className="rsButton" type="submit" color="primary">
                        {this.state.updateButton}
                    </Button>
                </form>
                <form onSubmit={this.deleteBook} hidden={this.state.isUpdating}>
                    <Button className="rsButton" type="submit" color="danger">
                        Delete
                    </Button>
                </form>

            </Card>
        )
    }
}



