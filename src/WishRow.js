import React, {Component} from 'react';

export class WishRow extends Component {
    render = () =>
    <tr>
        <td>{this.props.item.wish}</td>
        <td>
            <input type="checkbox" checked={this.props.item.granted} onChange={() => this.props.callback(this.props.item)}/>
        </td>
    </tr>



}