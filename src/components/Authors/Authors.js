import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from 'ethers'


import './Author_style.css'
import { FaUserFriends, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { ImHistory } from 'react-icons/im'
import { BsTagsFill } from 'react-icons/bs'
import { Moralis } from 'moralis'
import { create as ipfsHttpClient } from 'ipfs-http-client'
// import Web3Modal from 'web3modal'




export default function Authors() {


  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  let [getInpiut, setGetInput] = useState({ first: "", second: "", third: "", image: "" })
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [myData, setMydata] = useState(null);
  let [myUrl, setMyUrl] = useState()

// const create=ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

 
  

  // const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


  // async function onChange(e) {
  //   const file = e.target.files[0]
  //   try {
  //     const added = await client.add(
  //       file,
  //       {
  //         progress: (prog) => console.log(`received: ${prog}`)
  //       }
  //     )
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     setFileUrl(url)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }
  // }
  // async function uploadToIPFS() {
  //   const { name, description, price } = formInput
  //   if (!name || !description || !price || !fileUrl) return
  //   /* first, upload to IPFS */
  //   const data = JSON.stringify({
  //     name, description, image: fileUrl
  //   })
  //   try {
  //     const added = await client.add(data)
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     /* after file is uploaded to IPFS, return the URL to use it in the transaction */
  //     return url
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }
  // }

  // async function listNFTForSale() {
  //   const url = await uploadToIPFS()
  //   setMyUrl(url);
  //   const web3Modal = new Web3Modal()
  //   const connection = await web3Modal.connect()
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()

  //   let address = "0x038576432600f9431572db558ab0369e35e376aa";
  //   let abi = [
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "marketplaceAddress",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "constructor"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "approved",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Approval",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "bool",
  //           "name": "approved",
  //           "type": "bool"
  //         }
  //       ],
  //       "name": "ApprovalForAll",
  //       "type": "event"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "approve",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "string",
  //           "name": "tokenURI",
  //           "type": "string"
  //         }
  //       ],
  //       "name": "createToken",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "safeTransferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "bytes",
  //           "name": "_data",
  //           "type": "bytes"
  //         }
  //       ],
  //       "name": "safeTransferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "bool",
  //           "name": "approved",
  //           "type": "bool"
  //         }
  //       ],
  //       "name": "setApprovalForAll",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Transfer",
  //       "type": "event"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "getApproved",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "isApprovedForAll",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "name",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "ownerOf",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "interfaceId",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "supportsInterface",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "symbol",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "tokenURI",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     }
  //   ]


  //   /* next, create the item */
  //   const price = ethers.utils.parseUnits(formInput.price, 'ether')
  //   let contract = new ethers.Contract(address, abi, signer)
  //   // let listingPrice = await contract.getListingPrice()
  //   // listingPrice = listingPrice.toString()
  //   // console.log("Url is ", url.name);
  //   let transaction = await contract.createToken(url)
  //   await transaction.wait() ;

  //   // router.push('/')
  //   // fetchApi()
  //   // let fetchingApi =await fetch(url).then((res)=>res.json()).then((data)=>{
  //   //   setMydata(data)
  //   // })
  //   // console.log("fetchingApi",fetchingApi);
  // }


  // const fetchApi = async () => {
  //   console.log("Into fetching asdf", myUrl);
  //   let fetchedData = await axios.get(myUrl);
  //   let finalData = fetchedData.data
  //   let apiName = finalData.name
  //   let apiDes = finalData.description;
  //   let apiImage = finalData.image;
  //   setImage(apiImage);
  //   setDescription(apiDes);
  //   setName(apiName);

  //   console.log("fetchedData", fetchedData.data);

  // }

  // setInterval(() => {
  //   fetchApi();
  // }, 10000)


  // useEffect(() => {

  //   fetchApi();
  // }, []);




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
                  <a ><img src="images/box-item/image-box-6.jpg" alt="Image" /></a>
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
                      <img src="images/avatar/avt-9.jpg" alt="Image" />
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
                  <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><FaShoppingCart />  <span>Place Bid</span></a>
                  <a class="view-history reload text-white"> <ImHistory /> View History</a>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-6 col-md-12 col-12">
              <div class="form-create-item">
                <form action="#">
                  <h4 class="title-create-item">Upload file</h4>
                  <label class="uploadFile">
                    <span class="filename">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</span>
                    <input type="file" class="inputfile form-control" name="fileInput" id="fileInput" 
                    // onChange={()=>onChange()}
                     />
                  </label>
                </form>
                <div class="flat-tabs tab-create-item">
                  <h4 class="title-create-item">Select method</h4>
                  <ul class="menu-tab tabs">
                    <li class="tablinks active"><span class="icon-fl-tag"><BsTagsFill /></span> Fixed Price</li>
                    <li class="tablinks"><span class="icon-fl-clock"><ImHistory /></span> Time Auctions</li>
                    <li class="tablinks"><span class="icon-fl-icon-22"><FaUsers /></span> Open For Bids</li>
                  </ul>
                  <div class="content-tab">
                    <div class="content-inner" >
                      <form action="#">
                        <h4 class="title-create-item">Price</h4>
                        <input type="text" placeholder="Enter price for one item (ETH)" 
                        // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                        />

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" name="metadataName" id="metadataName"
                        //  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                          />

                        <h4 class="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”" name="metadataDescription" id="metadataDescription"
                        //  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                         ></textarea>
                        {/* {
                          fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} alt='' />
                          )
                        } */}
{/* 
                        <button onClick={()=>listNFTForSale()} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                          Create NFT
                        </button>

                        <div className='mt-5'>
                          <h3 className='mt-5'>
                            {name}
                          </h3>
                          <h3 className='mt-5'>
                            {description}
                          </h3>

                          <img className="rounded mt-4" width="350" src={image} alt='' />

                        </div> */}
                        <div class="row-form style-3">
                          <div class="inner-row-form">
                            <h4 class="title-create-item">Royalties</h4>
                            <input type="text" placeholder="5%" />
                          </div>
                          <div class="inner-row-form">
                            <h4 class="title-create-item">Size</h4>
                            <input type="text" placeholder="e.g. “size”" />
                          </div>
                          <div class="inner-row-form style-2 mt-4">
                            <div class="seclect-box">
                              <div id="item-create" class="dropdown">
                                <a href="#" class="btn-selector nolink">Abstraction</a>
                                <ul style={{ display: "none" }}>
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
                    <div class="content-inner" style={{ display: "none" }}>
                      <form action="#">
                        <h4 class="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div class="row">
                          <div class="col-md-6">
                            <h5 class="title-create-item">Starting date</h5>
                            <input type="date" name="bid_starting_date" id="bid_starting_date" class="form-control" min="1997-01-01" />
                          </div>
                          <div class="col-md-6">
                            <h4 class="title-create-item">Expiration date</h4>
                            <input type="date" name="bid_expiration_date" id="bid_expiration_date" class="form-control" />
                          </div>
                        </div>

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 class="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”" onChange={(e) => setDescription(e.target.value)}></textarea>
                      </form>
                    </div>
                    <div class="content-inner" style={{ display: "none" }}>
                      <form action="#">
                        <h4 class="title-create-item">Price</h4>
                        <input type="text" placeholder="Enter price for one item (ETH)" />

                        <h4 class="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div class="row">
                          <div class="col-md-6">
                            <h5 class="title-create-item">Starting date</h5>
                            <input type="date" name="bid_starting_date" id="bid_starting_date2" class="form-control" min="1997-01-01" />
                          </div>
                          <div class="col-md-6">
                            <h4 class="title-create-item">Expiration date</h4>
                            <input type="date" name="bid_expiration_date" id="bid_expiration_date2" class="form-control" />
                          </div>
                        </div>

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

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



