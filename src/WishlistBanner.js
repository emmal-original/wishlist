import React, {Component} from 'react';

export class WishlistBanner extends Component {
    render = () =>
    <h4 className="bg-info text-white text-center p-2">
        {this.props.name}'s Wishlist 
        ({this.props.outstandingWishes.filter(w => !w.granted).length} wishes yet to be granted)
    </h4>
}