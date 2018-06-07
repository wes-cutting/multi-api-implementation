import React from 'react'
import Book from './Book'

export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            books: [],
            url: "https://api-fxyqdjwfth.now.sh/books"
        }
    }

    async componentWillMount () {
        const response = await fetch(this.state.url, {method: 'GET'});
        console.log(this.state.url);
        const responseJSON = await response.json();
        const books = responseJSON.map(book => <Book book={book}/>)
        this.setState({books: books})
    }

    render(){
        return (
            <div>
                {this.state.books}
            </div>
        )
    }
}