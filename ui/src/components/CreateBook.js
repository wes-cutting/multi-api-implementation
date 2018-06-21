import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                <TextField type="text" placeholder="Title"
                       onChange={event => this.setState({title: event.target.value})}/>
                <TextField type="text" placeholder="Author"
                       onChange={event => this.setState({author: event.target.value})}/>
                <Button type="submit" variant="contained">Create</Button>
            </form>
        )
    }
}