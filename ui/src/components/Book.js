import React, { Component } from 'react'

export default class extends Component {
    render() {
        const book = this.props.content
        return (
            <div className="book">
                <h3>New Book</h3>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
            </div>
        )
    }
}