import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: 'search term'
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    // pass state of the search term to `this.props.onSearch`
    search() {
        this.props.onSearch(this.state.searchTerm);
    }
    // set state of search bar's term to event targets value
    handleTermChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}