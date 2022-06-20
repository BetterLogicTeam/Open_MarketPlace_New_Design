import React, { Component } from "react";
import axios from "axios";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";
import './Author_style.css'
import { FaUserFriends, FaShoppingCart,FaUsers } from 'react-icons/fa'
import { ImHistory } from 'react-icons/im'
import { BsTagsFill } from 'react-icons/bs'




const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/authors";

class Authors extends Component {
  _isMounted = 1;

  state = {
    data: [],
    authorData: [],
    creatorData: [],
    error: null,
  };
  loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      this.setState({ ...this.state, vid: src });
    };
    img.onload = () => {
      this.setState({ ...this.state, img: src });
    };
    img.src = src;
  };
  fetchImageObject = async (uri) => {
    try {
      axios
        .get(`https://gateway.pinata.cloud/ipfs/${uri}`)
        .then((resp) =>
          this.loadMedia(
            `https://ipfs.io/ipfs/${resp.data.image?.split("ipfs://")[1]}`
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  getAllCreator = gql`
    {
      creators {
        id
        nfts {
          id
        }
      }
    }
  `;
  getAllCreator = async (query) => {
    try {
      const response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(() => ({
          creatorData: response.data.data.creators,
        }));
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };

  getNftOfCreator = async (id) => {
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query: `{
                nftentities(where: {creator: "${id}"}) {
                  name
                  description
                  id
                  uri
                  owner
                  creator {
                    id
                  }
                }
              }`,
        }
      );

      this.setState(() => ({
        isLoaded: true,
        data: res.data.data.nftentities,
      }));
      this.fetchImageObject(res.data.data.nftentity.uri);
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          authorData: res.data.authorData,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    this._isMounted = 1;
    const query = `
    {
        creators {
          id
          nfts {
            id
          }
        }
      }
    `;
    this.getAllCreator(query);

    const path = window.location.pathname;
    const id = path.split("/")[2];
    this.getNftOfCreator(id);
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { creatorData } = this.state;
    return (
      <>
        <section class="flat-title-page inner top_bg_activity">
          <div class="overlay"></div>
          <div class="themesflat-container">
            <div class="row">
              <div class="col-md-12">
                <div class="page-title-heading mg-bt-12">
                  <h1 class="heading text-center">Create</h1>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div class="tf-create-item tf-section">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                <h4 class="title-create-item">Preview item</h4>
                <div class="sc-card-product">
                  <div class="card-media">
                    <a ><img src="images/box-item/image-box-6.jpg" alt="Image"/></a>
                    {/* <button class="wishlist-button heart"><span class="number-like"> 100</span></button> */}
                    <div class="featured-countdown">
                      <span class="slogan"></span>
                      <span class="js-countdown text-white" data-timer="716400" data-labels=" :  ,  : , : , "><div aria-hidden="true" class="countdown__timer"><span class="countdown__item"><span class="countdown__value countdown__value--0 js-countdown__value--0">8</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--1 js-countdown__value--1">05</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--2 js-countdown__value--2">52</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--3 js-countdown__value--3">38</span><span class="countdown__label"></span></span></div></span>
                    </div>
                  </div>
                  <div class="card-title">
                    <h5><a >"Cyber Doberman #766”</a></h5>
                    <div class="tags">bsc</div>
                  </div>
                  <div class="meta-info mt-n4">
                    <div class="author">
                      <div class="avatar mt-n4">
                        <img src="images/avatar/avt-9.jpg" alt="Image"/>
                      </div>
                      <div class="info">
                        <span>Owned By</span>
                        <h6 className="mt-1"> <a >Freddie Carpenter</a></h6>
                      </div>
                    </div>
                    <div class="price">
                      <span>Current Bid</span>
                      <h5> 4.89 ETH</h5>
                    </div>
                  </div>
                  <div class="card-bottom">
                    <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><FaShoppingCart/>  <span>Place Bid</span></a>
                    <a  class="view-history reload text-white"> <ImHistory/> View History</a>
                  </div>
                </div>
              </div>
              <div class="col-xl-8 col-lg-6 col-md-12 col-12">
                <div class="form-create-item">
                  <form action="#">
                    <h4 class="title-create-item">Upload file</h4>
                    <label class="uploadFile">
                      <span class="filename">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</span>
                      <input type="file" class="inputfile form-control" name="file"/>
                    </label>
                  </form>
                  <div class="flat-tabs tab-create-item">
                    <h4 class="title-create-item">Select method</h4>
                    <ul class="menu-tab tabs">
                      <li class="tablinks active"><span class="icon-fl-tag"><BsTagsFill/></span> Fixed Price</li>
                      <li class="tablinks"><span class="icon-fl-clock"><ImHistory/></span> Time Auctions</li>
                      <li class="tablinks"><span class="icon-fl-icon-22"><FaUsers/></span> Open For Bids</li>
                    </ul>
                    <div class="content-tab">
                      <div class="content-inner" >
                        <form action="#">
                          <h4 class="title-create-item">Price</h4>
                          <input type="text" placeholder="Enter price for one item (ETH)"/>

                            <h4 class="title-create-item">Title</h4>
                            <input type="text" placeholder="Item Name"/>

                              <h4 class="title-create-item">Description</h4>
                              <textarea placeholder="e.g. “This is very limited item”"></textarea>

                              <div class="row-form style-3">
                                <div class="inner-row-form">
                                  <h4 class="title-create-item">Royalties</h4>
                                  <input type="text" placeholder="5%"/>
                                </div>
                                <div class="inner-row-form">
                                  <h4 class="title-create-item">Size</h4>
                                  <input type="text" placeholder="e.g. “size”"/>
                                </div>
                                <div class="inner-row-form style-2 mt-4">
                                  <div class="seclect-box">
                                    <div id="item-create" class="dropdown">
                                      <a href="#" class="btn-selector nolink">Abstraction</a>
                                      <ul style={{display: "none"}}>
                                        <li><span>Art</span></li>
                                        <li><span>Music</span></li>
                                        <li><span>Domain Names</span></li>
                                        <li><span>Virtual World</span></li>
                                        <li><span>Trading Cards</span></li>
                                        <li><span>Sports</span></li>
                                        <li><span>Utility</span></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div class="content-inner" style={{display: "none"}}>
                            <form action="#">
                              <h4 class="title-create-item">Minimum bid</h4>
                              <input type="text" placeholder="enter minimum bid"/>
                                <div class="row">
                                  <div class="col-md-6">
                                    <h5 class="title-create-item">Starting date</h5>
                                    <input type="date" name="bid_starting_date" id="bid_starting_date" class="form-control" min="1997-01-01"/>
                                  </div>
                                  <div class="col-md-6">
                                    <h4 class="title-create-item">Expiration date</h4>
                                    <input type="date" name="bid_expiration_date" id="bid_expiration_date" class="form-control"/>
                                  </div>
                                </div>

                                <h4 class="title-create-item">Title</h4>
                                <input type="text" placeholder="Item Name"/>

                                  <h4 class="title-create-item">Description</h4>
                                  <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                </form>
                              </div>
                              <div class="content-inner" style={{display: "none"}}>
                                <form action="#">
                                  <h4 class="title-create-item">Price</h4>
                                  <input type="text" placeholder="Enter price for one item (ETH)"/>

                                    <h4 class="title-create-item">Minimum bid</h4>
                                    <input type="text" placeholder="enter minimum bid"/>

                                      <div class="row">
                                        <div class="col-md-6">
                                          <h5 class="title-create-item">Starting date</h5>
                                          <input type="date" name="bid_starting_date" id="bid_starting_date2" class="form-control" min="1997-01-01"/>
                                        </div>
                                        <div class="col-md-6">
                                          <h4 class="title-create-item">Expiration date</h4>
                                          <input type="date" name="bid_expiration_date" id="bid_expiration_date2" class="form-control"/>
                                        </div>
                                      </div>

                                      <h4 class="title-create-item">Title</h4>
                                      <input type="text" placeholder="Item Name"/>

                                        <h4 class="title-create-item">Description</h4>
                                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                      </form>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>


              </>
              );
  }
}

              export default withRouter(Authors);
