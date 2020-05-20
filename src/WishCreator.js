import React, {Component} from 'react';

export class WishCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            newWishText: ""
        }
    }

    updateNewTextValue = (event) => this.setState({newWishText: event.target.value});

    createNewWish = () => {
        this.props.callback(this.state.newWishText);
        this.setState({newWishText: ""});
    }

    render = () =>
        <div className="my-1">
            <input className="form-control" value={this.state.newWishText} onChange={this.updateNewTextValue}/> 
            <button className="btn btn-outline-info mt-1" onClick={this.createNewWish}>Add</button>
        </div>

}