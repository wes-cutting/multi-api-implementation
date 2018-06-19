import React from 'react'
import Book from './Book'
import {BASE_URL} from '../config'

export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            books: [],
            url: BASE_URL + "/books"
        }
    }

    async componentWillMount () {
        const response = await fetch(this.state.url, {method: 'GET'});
        console.log(this.state.url);
        const responseJSON = await response.json();
        const books = responseJSON.map(dbItem => <Book content={dbItem}/>)
        this.setState({books: books})
    }

    render(){
        return (
            <div className="flexbox">
                {this.state.books}
            </div>
        )
    }
}