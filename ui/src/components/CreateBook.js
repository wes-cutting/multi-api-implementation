import React, { Component } from 'react'
import { Button, Input } from 'reactstrap';

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
        await fetch(this.state.url, {
                method: 'POST',
                body: JSON.stringify(body)
        });
        window.location.reload(true);
    }
    render () {
        return (
            <form onSubmit={this.submitHandler}>
                <Input type="text" placeholder="Title"
                       onChange={event => this.setState({title: event.target.value})}/>
                <Input type="text" placeholder="Author"
                       onChange={event => this.setState({author: event.target.value})}/>
                <Button className="rsButton" type="submit" color="success">
                    Create
                </Button>
            </form>
        )
    }
}