import React, { Component } from 'react';

import { WishlistBanner } from './WishlistBanner';
import { WishCreator } from './WishCreator';
import { WishRow } from './WishRow';
import { VisibilityControl } from './VisibilityControl';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Emma",
      wishes: [
        {
          wish: "",
          granted: false,
        }
      ],
      showGranted: true
    }
  }


  createNewWish = (newWish) => {
    if (!this.state.wishes.find(x => x.wish === newWish)) {
      this.setState({
        wishes: [
          ...this.state.wishes,
          {
            wish: newWish,
            granted: false
          }
        ]
      },
      () => localStorage.setItem("savedWishes", JSON.stringify(this.state))
      )
    }
  }

  wishTableRows = (grantedValue) => this.state.wishes.filter(item => item.granted === grantedValue).map(item =>
    <WishRow key={item.wish} item={item} callback={this.toggleWish} />
  );

  toggleWish = (wishToggle) => this.setState(
    {
      wishes: this.state.wishes.map(item => item.wish === wishToggle.wish ? {...item, granted: !item.granted } : item)
    },
    () => localStorage.setItem("savedWishes", JSON.stringify(this.state))
  );

  componentDidMount = () => {
    let data = localStorage.getItem("savedWishes");
    this.setState(
      data !=null ? JSON.parse(data) :
      {
        userName: "Emma",
        wishes: [
          {
            wish: "Vaccine for COVID-19",
            granted: false,
          },
          {
            wish: "End to stay-at-home order",
            granted: false,
          },
          {
            wish: "Return to classroom with Centriq classmates",
            granted: false,
          },
          {
            wish: "Pursue a career that challenges and excites me",
            granted: true
          }
        ],
        showGranted: true
      }
    );
  }


  render() {
    return (
      <div>
        <WishlistBanner name={this.state.userName} outstandingWishes={this.state.wishes} />

        <div className="container-fluid">

          <WishCreator callback={this.createNewWish} />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Wish</th>
                <th>Granted</th>
              </tr>
            </thead>
            <tbody>
              {this.wishTableRows(false)}
            </tbody>
          </table>
          <div className="bg-info text-white text-center p-2">
            <VisibilityControl description="Granted Wishes" isChecked={this.state.showGranted}
              callback={(checked) => this.setState({ showGranted: checked })} />
          </div>
          {
            this.state.showGranted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Wish</th>
                  <th>Granted</th>
                </tr>
              </thead>
              <tbody>
                {this.wishTableRows(true)}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
};