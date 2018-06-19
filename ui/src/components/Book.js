import React, { Component } from 'react'
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
                <input type="text" value={this.state.title}//placeholder="Title"
                       onChange={event => this.setState({title: event.target.value})}/>
                <input type="text" value={this.state.author} // placeholder="Author"
                       onChange={event => this.setState({author: event.target.value})}/>
            </form>
        )
    }

    displayBook = () => {
        return (
            <div>
                <p>Title: {this.state.title}</p>
                <p>Author: {this.state.author}</p>
            </div>
        )
    }

    render() {
        const update = this.updateBookForm()
        const display = this.displayBook()
        return (
            <div className="book">
                <h3>New Book</h3>
                { this.state.isUpdating ? update : display}
                <form onSubmit={this.updateBook}>
                    <input type="submit" value={this.state.updateButton}/>
                </form>
                <form onSubmit={this.deleteBook} hidden={this.state.isUpdating}>
                    <input type="submit" value="Delete"/>
                </form>

            </div>
        )
    }
}



