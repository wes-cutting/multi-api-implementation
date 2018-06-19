import React, { Component } from 'react'
import { BASE_URL } from '../config'

export default class extends Component {
    state = {
        title: "",
        author: "",
        url: BASE_URL + "/books"
    }
    submitHandler = async (event) => {
        event.preventDefault()
        const body = {
            title: this.state.title,
            author: this.state.author
        }
        console.log("Body: ", JSON.stringify(body))
        const response = await fetch(this.state.url, {
                method: 'POST',
                body: JSON.stringify(body)
            });
        console.log("Res: ",response)
    }
    render () {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" placeholder="Title"
                       onChange={event => this.setState({title: event.target.value})}/>
                <input type="text" placeholder="Author"
                       onChange={event => this.setState({author: event.target.value})}/>
                <input type="submit"/>
            </form>
        )
    }
}