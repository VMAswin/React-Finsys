import React, { useEffect, useState } from "react";
import FinBase from "../FinBase";
import * as XLSX from "xlsx";
import { Link, useNavigate,useParams,useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import config from "../../../functions/config";
import Vendors from "./Allvendors";

//  ${itemId}/
function View_vendor () {
    const ID = Cookies.get("Login_id");
    const location = useLocation();
    const { vendor } = location.state || {};
    // const { id } = useParams();
    // const [item, setItem] = useState(null);

    // useEffect(() => {
    //     fetch(`${config.base_url}/view_vendor/${id}/`)
    //         .then(response => response.json())
    //         .then(data => setItem(data));
    // }, [id]);
    // console.log('user id',id)
    $(document).ready(function ($) {
        $(".table-row").click(function () {
            window.document.location = $(this).data("href");
        });
    });
    function overview() {
        document.getElementById('overview').style.display = 'block';
        document.getElementById('transaction').style.display = 'none';
        document.getElementById('statement').style.display = 'none';
        document.getElementById('overviewBtn').style.backgroundColor='rgba(22,37,50,255)'
        document.getElementById('transactionBtn').style.backgroundColor='transparent';
        document.getElementById('statementBtn').style.backgroundColor='transparent';
        $('#shareBtn').hide();
        $('#printBtn').hide();
        $('#pdfBtn').hide();
        $('#editBtn').show();
        $('#exportBtn').hide();
        $('#deleteBtn').show();
        $('#historyBtn').show();
        $('#activeBtn').show();
        $('#inactiveBtn').show();
        $('#commentsBtn').show();
    }
    function transaction() {
        document.getElementById('overview').style.display = 'none';
        document.getElementById('statement').style.display = 'none';
        document.getElementById('transaction').style.display = 'block';
        document.getElementById('overviewBtn').style.backgroundColor='transparent';
        document.getElementById('statementBtn').style.backgroundColor='transparent';
        document.getElementById('transactionBtn').style.backgroundColor='rgba(22,37,50,255)';
        $('#shareBtn').hide();
        $('#printBtn').hide();
        $('#pdfBtn').hide();
        $('#editBtn').hide();
        $('#exportBtn').show();
        $('#deleteBtn').hide();
        $('#historyBtn').hide();
        $('#commentsBtn').hide();
        $('#activeBtn').hide();
        $('#inactiveBtn').hide();
    }
    function statement() {
        document.getElementById('overview').style.display = 'none';
        document.getElementById('transaction').style.display = 'none';
        document.getElementById('statement').style.display = 'block';
        document.getElementById('overviewBtn').style.backgroundColor='transparent';
        document.getElementById('transactionBtn').style.backgroundColor='transparent';
        document.getElementById('statementBtn').style.backgroundColor='rgba(22,37,50,255)';
        $('#printBtn').show();
        $('#pdfBtn').show();
        $('#shareBtn').show();
        $('#deleteBtn').hide();
        $('#editBtn').hide();
        $('#exportBtn').hide();
        $('#historyBtn').hide();
        $('#commentsBtn').hide();
        $('#activeBtn').hide();
        $('#inactiveBtn').hide();
    }
    const Change_vendor_status = async (id,status) =>{
        try{
            const response = await axios.post(`${config.base_url}/change_vendor_status/${id}/${status}/`)
            console.log('Changed');
        } catch (error) {
            console.log('Error');
        }
    }

    


    return (
        <>
        <FinBase />
        <div className="page-content" style={{ backgroundColor: "#213b52" }}>
        <span className="d-flex justify-content-end p-2" style={{cursor:'pointer'}} ><i class="fa fa-times-circle text-white" style={{fontSize:'1.2rem'}}></i></span>
        <div className="card radius-15" style={{ backgroundColor: "#213b52" }}>
        <div className="card-body" style={{width:'100%'}}>
            <div className="card-title">
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-6">
                            {/* <a style="padding: 10px; cursor: pointer; border-radius: 1vh; background-color: rgba(22,37,50,255);" onclick="overview()" id="overviewBtn" >Overview</a> */}
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh',backgroundColor:'rgba(22,37,50,255)'}} onClick={() =>overview()} id="overviewBtn">Overview</a>
                            {/* <a style="padding: 10px; cursor: pointer; border-radius: 1vh;" onclick="transaction()" id="transactionBtn" > Transactions</a> */}
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh'}} onClick={() => transaction()} id="transactionBtn">Transactions</a>
                            {/* <a style="padding: 10px; cursor: pointer; border-radius: 1vh;" onclick="statement()" id="statementBtn" > Statement</a> */}
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh'}} onClick={() => statement()} id="statementBtn">Statement</a>
                        </div> 
                        <div className="col-md-6 d-flex justify-content-end">
                        {vendor.status == 'Active' ? (
                            <a className="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button" style={{height:'30px',width:'100px'}} id="inactiveBtn" onClick={() => Change_vendor_status(vendor.id,'Inactive')}>&nbsp;Active</a> 
                        ): (
                            <a className="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button" style={{height:'30px',width:'100px'}} id="activeBtn" onClick={() => Change_vendor_status(vendor.id,'Active')}>&nbsp;Inactive</a>   
                        )}
                        <a className="ml-2 btn btn-outline-secondary text-grey fa fa-table" role="button" id="exportBtn" style={{display:'none',height:'30px',width:'100px'}} onclick="ExportToExcel('xlsx')">&nbsp;Export</a>
                            <a href="{% url 'Fin_vendorTransactionsPdf' vendor.id %}" className="ml-2 btn btn-outline-secondary text-grey fa fa-file" role="button" id="pdfBtn" style={{display:'none',height:'30px',width:'100px'}}> &nbsp;PDF</a> 
                            <a className="ml-2 btn btn-outline-secondary text-grey fa fa-print" role="button" id="printBtn" style={{display:'none',height:'30px',width:'100px'}} onclick="templatePrint()">&nbsp;Print</a>
                            <div className="dropdown p-0 nav-item"  id="shareBtn" style={{display:'none'}}>
                                <li  className="ml-2 dropdown-toggle btn btn-outline-secondary text-grey fa fa-share-alt" data-toggle="dropdown" style={{height:'30px',width:'100px'}}>&nbsp;Share</li>
                                <ul className="dropdown-menu" style={{backgroundColor:'black'}} id="listdiv">
                                    {/* <li style={{textAlign:'center'}} >{% post_to_whatsapp object_or_url "WhatsApp" %}</li> */}
                                    <li style={{textAlign:'center',color:'#e5e9ec',cursor:'pointer'}} data-toggle="modal" data-target="#shareToEmail">Email</li>
                                </ul>
                            </div>
                        <a href="{% url 'Fin_editVendor' vendor.id %}" class="ml-2 fa fa-pencil btn btn-outline-secondary text-grey" id="editBtn" role="button" style={{height:'30px',width:'100px'}}>&nbsp;Edit</a>
                        <a href="{% url 'Fin_deleteVendor' vendor.id %}" class="ml-2 btn btn-outline-secondary text-grey fa fa-trash" id="deleteBtn" role="button" onclick="return confirm('Are you sure you want to delete Vendor - {{vendor.first_name}}.?')" style={{height:'30px',width:'100px'}}>&nbsp;Delete</a>
                        <a href="#"  class="ml-2 btn btn-outline-secondary text-grey fa fa-comments" id="commentsBtn" role="button" data-toggle="modal" data-target="#commentModal" style={{height:'30px',width:'100px'}}>&nbsp;Comment</a>
                        <a href="{% url 'Fin_vendorHistory' vendor.id %}"  class="ml-2 btn btn-outline-secondary text-grey fa fa-history" id="historyBtn" role="button" style={{height:'30px',width:'100px'}}>&nbsp;History</a>

                            {/* {% if vendor.status == 'Inactive' %} */}
                            {/* <a href="{% url 'Fin_changeVendorStatus' vendor.id 'Active' %}" id="activeBtn" class="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button" >&nbsp;Inactive</a> */}
                            {/* <a className="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button">&nbsp;Inactive</a>  */}
                            {/* {% else %} */}
                            {/* <a href="{% url 'Fin_changeVendorStatus' vendor.id 'Inactive' %}" id="inactiveBtn" class="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button" >&nbsp;Active</a> */}
                            {/* <a className="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button">&nbsp;Active</a>   */}
                            {/* {% endif %} */}
                        
                            
                        </div>
                    </div> 
                </div>
                <center>
                    <h3 className="card-title" >VENDOR OVERVIEW</h3>
                </center>
            </div>
        </div>
    </div>
    <div className="card card-registration card-registration-2" style={{borderRadius:'15px'}}>
        <div className="card-body p-0">

            <div id="overview">
                <div className="row g-0 mx-0">
                    <div className="col-lg-8">
                        <div className="history_highlight pt-3 px-2 d-flex">
                            <div className="col-12 d-flex justify-content-start align-items-center">
                                {/* {% if history %}{% if history.action == 'Created' %}<p class="text-success m-0" style="font-size: 1.07rem; font-weight: 500;">Created by :</p>{% else %}<p class="text-warning m-0" style="font-size: 1.07rem; font-weight: 500;">Last Edited by :</p>{% endif %}{% endif %}
                                <span class="ml-2" style="font-size: 1.15rem; font-weight: 500;">{{history.LoginDetails.First_name}} {{history.LoginDetails.Last_name}}</span>
                                <span class="ml-5">{{history.date}}</span> */}
                            </div>
                        </div>
                        <div className="pb-3 px-2">
                            <div className="card-body">
                                <div className="card-title">
                                    <div className="row">
                                        <div className="col mt-3">
                                            {/* <h2 class="mb-0">{{ vendor.title }}. {{ vendor.first_name }} {{ vendor.last_name }}</h2> */}
                                            <h2 class="mb-0">{vendor.Title}. {vendor.First_name}  {vendor.Last_name}</h2>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div class="row mb-4 d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 mt-3">
                                        <h6 class="mb-0">Company</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Company_Name }</p>
                                    </div>
                                    <div class="col-md-2 mt-3 vl">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Vendor_email }</p>
                                    </div>
                                </div>
                                <div class="row mb-4 d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 mt-3">
                                        <h6 class="mb-0">Mobile</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Mobile }</p>
                                    </div>
                                    <div class="col-md-2 mt-3 vl">
                                        <h6 class="mb-0">Website</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Website }</p>
                                    </div>
                                </div>
                                <div class="row mb-4 d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 mt-3">
                                        <h6 class="mb-0">Location</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Location }</p>
                                    </div>
                                    <div class="col-md-2 mt-3 vl">
                                        <h6 class="mb-0">Place of Supply</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0">{ vendor.Place_of_supply }</p>
                                    </div>
                                </div>
                                <div class="row mb-4 d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 mt-3">
                                        <h6 class="mb-0">Payment Terms</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0"></p>
                                    </div>
                                    <div class="col-md-2 mt-3 vl">
                                        <h6 class="mb-0">Price List</h6>
                                    </div>
                                    <div class="col-md-1 mt-3">
                                        :
                                    </div>
                                    <div class="col-md-3 mt-3">
                                        <p class="mb-0"></p>
                                    </div>
                                </div>
                                <hr />
                                <div class="row ">
                                    <div class="col-md-6" >
                                        <div class="card-content bg-transparent border-0 ml-4" >
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="ml-3" style={{textAlign:'center'}}>Billing Address</h5>
                                                    <hr />
                                                </div>
                                            </div><br />
                                            <div class="row mb-3">
                                                <div class="col-md-3" >
                                                    <h6 class="mb-0">Street</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Billing_street }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">City</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Billing_city }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">State</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Billing_state }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">Pincode</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Billing_pincode }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">Country</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Billing_country }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-content bg-transparent border-0" >
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="ml-3" style={{textAlign:'center'}}>Shipping Address</h5>
                                                    <hr />
                                                </div>
                                            </div><br />
                                            <div class="row mb-3">
                                                <div class="col-md-3" >
                                                    <h6 class="mb-0">Street</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Shipping_street }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">City</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Shipping_city }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">State</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Shipping_state }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">Pincode</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Shipping_pincode }</p>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <h6 class="mb-0">Country</h6>
                                                </div>
                                                <div class="col-md-1">
                                                    :
                                                </div>
                                                <div class="col-md-8">
                                                    <p class="mb-0" style={{textAlign:'right'}}>{ vendor.Shipping_country }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 bg-grey">

                        <div className="px-3">
                            <h3 className="fw-bold mb-2 mt-4 pt-1">Vendor Details</h3>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">Status</h6>
                                {vendor.status == 'Active' ? (
                                    <i className="fa fa-check-circle text-success">&nbsp;ACTIVE</i>
                                ) : (
                                    <i className="fa fa-ban text-danger">&nbsp;INACTIVE</i>
                                )}
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">GST Type</h6>
                                { vendor.GST_Treatment }
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">GSTIN</h6>
                                { vendor.GST_Number}
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">PAN</h6>
                                { vendor.Pan_Number}
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">Opening Bal.</h6>
                                { vendor.Opening_balance}
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">Credit Limit</h6>
                                { vendor.Credit_limit}
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <h6 className="">Balance</h6>
                                { vendor.Opening_balance}
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
            <div id="transaction" style={{display:'none'}} >
                <div className="row mt-3 mb-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="row mt-3">
                            <h3 style={{marginLeft:'15px'}}><strong>{vendor.Title}.{ vendor.First_name } { vendor.Last_name }</strong></h3>
                        </div>
                        <div className="row mt-4 mb-3">
                            <div className="col-md-4">
                                <p>Mobile : <strong>{vendor.Mobile}</strong></p>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <p>GSTIN : <strong>{vendor.GST_Number}</strong></p>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-md-4">
                                <p>Email : <strong>{vendor.Vendor_email}</strong></p>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <span className="font-weight-bold" style={{fontSize:'1.9rem'}}>Balance:<span id="vendorBalance" className="text-info ml-2 font-weight-bold" style={{fontSize:'2.2rem'}}>{vendor.Opening_balance}</span></span>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-md-4">
                                <p>
                                    {/* {% if vendor.credit_limit != 0 %}
                                        Credit Limit: <strong>{{ vendor.credit_limit }}</strong>
                                    {% else %}
                                        No Credit Limit Set
                                    {% endif %} */}
                                    {vendor.Credit_limit !=0 ? (
                                        <strong>{ vendor.Credit_limit }</strong>
                                    ):(
                                        <h3>No Credit Limit Set</h3>
                                    )}
                                </p>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4"></div>
                        </div>
                        <hr />
                        <div className="row mt-4 d-flex justify-content-between">
                            <h5 style={{marginLeft:'15px'}}><strong>Transactions</strong></h5>
                            <input type="text" id="search" className="form-control w-25" placeholder="Search.." autocomplete="off" style={{position:'relative',left:'1200px',bottom:'30px'}}/>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row mt-4 mb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <table id="dataTable" className="table tabledata  table-bordered table-hover" style={{borderWidth:'2px'}}>
                            <thead>
                                <tr id="tH1" style={{visibility:'collapse'}}>
                                    <th>#</th>
                                    <th className="filterTable-column">Type</th>
                                    <th className="filterTable-column">Date</th>
                                    <th className="filterTable-column">Number</th>
                                    <th className="filterTable-column">Total</th>
                                    <th className="filterTable-column">Balance</th>
                                </tr>
                                <tr id="tH2" style={{visibility:'visible'}}>
                                    <th>#</th>
                                    <th className="filterTable-column">Type
                                        <span className="dropdown">
                                            <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-filter" style={{fontSize:'1rem'}}></i>
                                            </button>
                                            <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuType">
                                                <select id="typeFilterCondition" className="form-control form-control-sm">
                                                    <option value="equals_to">Equals To</option>
                                                </select>
                                                <input type="text" id="typeFilter" placeholder="Type" className="form-control form-control-sm mt-1" required />
                                                <div className="d-flex mt-1">
                                                    <input type="button" onclick="clearSearch('typeFilter',this)" className="btn btn-sm btn-info mr-1" style={{width:'49%'}} value="CLEAR" />
                                                    <input type="button" onclick="filterSearchValues(1,'typeFilter',this)" className="btn btn-sm btn-info" style={{width:'49%'}} value="APPLY" />
                                                </div>
                                            </div>
                                        </span>                                            
                                    </th>
                                    <th className="filterTable-column">Number
                                        <span className="dropdown">
                                            <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuNumber" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-filter" style={{fontSize:'1rem'}}></i>
                                            </button>
                                            <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuNumber">
                                                <select id="numberFilterCondition" className="form-control form-control-sm">
                                                    <option value="equals_to">Equals To</option>
                                                </select>
                                                <input type="text" id="numberFilter" placeholder="Number" className="form-control form-control-sm mt-1" required />
                                                <div className="d-flex mt-1">
                                                    <input type="button" onclick="clearSearch('numberFilter',this)" className="btn btn-sm btn-info mr-1" style={{width:'49%'}} value="CLEAR" />
                                                    <input type="button" onclick="filterSearchValues(2,'numberFilter',this)" className="btn btn-sm btn-info" style={{width:'49%'}} value="APPLY" />
                                                </div>
                                            </div>
                                        </span>
                                    </th>

                                    <th className="filterTable-column">Date
                                        <span className="dropdown">
                                            <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuDate" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-filter" style={{fontSize:'1rem'}}></i>
                                            </button>
                                            <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuDate">
                                                <select id="dateFilterCondition" className="form-control form-control-sm">
                                                    <option value="equals_to">Equals To</option>
                                                </select>
                                                <input type="date" id="dateFilter" className="form-control form-control-sm mt-1" required />
                                                <div className="d-flex mt-1">
                                                    <input type="button" onclick="clearSearch('dateFilter',this)" className="btn btn-sm btn-info mr-1" style={{width:'49%'}} value="CLEAR" />
                                                    <input type="button" onclick="filterSearchValues(3,'dateFilter',this)" className="btn btn-sm btn-info" style={{width:'49%'}} value="APPLY" />
                                                </div>
                                            </div>
                                        </span>
                                    </th>
                                    
                                    <th className="filterTable-column">Total
                                        <span className="dropdown">
                                            <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-filter" style={{fontSize:'1rem'}}></i>
                                            </button>
                                            <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuTotal">
                                                <select id="totalFilterCondition" className="form-control form-control-sm">
                                                    <option value="equals_to">Equals To</option>
                                                </select>
                                                <input type="number" id="totalFilter" placeholder="Total" className="form-control form-control-sm mt-1" required />
                                                <div className="d-flex mt-1">
                                                    <input type="button" onclick="clearSearch('totalFilter',this)" className="btn btn-sm btn-info mr-1" style={{width:'49%'}} value="CLEAR" />
                                                    <input type="button" onclick="filterAmount(4,'totalFilter',this)" className="btn btn-sm btn-info" style={{width:'49%'}} value="APPLY" />
                                                </div>
                                            </div>
                                        </span>
                                    </th>

                                    <th className="filterTable-column">Balance
                                        <span className="dropdown">
                                            <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuBalance" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-filter" style={{fontSize:'1rem'}}></i>
                                            </button>
                                            <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuBalance">
                                                <select id="balanceFilterCondition" className="form-control form-control-sm">
                                                    <option value="equals_to">Equals To</option>
                                                </select>
                                                <input type="number" id="balanceFilter" placeholder="Balance" className="form-control form-control-sm mt-1" required />
                                                <div className="d-flex mt-1">
                                                    <input type="button" onclick="clearSearch('balanceFilter',this)" className="btn btn-sm btn-info mr-1" style={{width:'49%'}} value="CLEAR" />
                                                    <input type="button" onclick="filterAmount(5,'balanceFilter',this)" className="btn btn-sm btn-info" style={{width:'49%'}} value="APPLY" />
                                                </div>
                                            </div>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="dataTableBody">
                
                                <tr>
                                    <td>1</td>
                                    <td><strong>Opening Balance</strong></td>
                                    <td></td>
                                    <td></td>
                                    <td>{vendor.Opening_balance}</td>
                                    <td>{vendor.Opening_balance}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
            <div id="statement" style={{display:'none'}} >
                <div className="container-fluid" >
                    <div className="py-5">
                        <div className="row">
                            <div className="col-sm-12 d-flex justify-content-between align-items-center">
                                <div className="date_range d-flex">
                                    <div className="form-group">
                                        <label for="from">From</label>
                                        <input type="date" className="form-control" id="fromDate" />
                                    </div>
                                    <div className="form-group ml-2">
                                        <label for="from">To</label>
                                        <input type="date" className="form-control" id="toDate" />
                                    </div>
                                </div>
                                <div className="run_report">
                                    <button className="btn btn-outline-secondary text-white btn-sm ml-2">Run Report</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-4">
                            <div className="col-md-7" style={{margin:'auto'}}>
                                <div className="card">
                                    <div className="card-block1">
                                        <div id="printContent" className="print-container card-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12 col-sm-offset-1" style={{padding:'20px'}}>
                                                        <div className="widget-box">
                                                            <div className="widget-header widget-header-large py-3 px-4" style={{backgroundColor:'#343a40',padding:'1.1rem 1rem'}}>
                                                                <h5 className="widget-title mb-4 print-visible" style={{color:'white'}}>
                                                                    <strong><span style={{color:'#fff',fontSize:'1.3rem',fontWeight:'bold'}}>Statement of {vendor.Title}. {vendor.First_name} {vendor.Last_name}</span></strong>
                                                                </h5>  
                                                                {/* <span id="df" style="border: none;color: #F7F7F7;background-color: #343a40;">{{vendor.date|date:'Y-m-d'}}</span> <span style="color: white;">to</span>
                                                                <span id="dl" style="border: none; background-color: none;color: #F7F7F7;background-color: #343a40;">{% now 'Y-m-d' %}</span> */}
                                                            </div>
                                            
                                                            <div className="widget-body bg-white" style={{padding:'1rem 0.5rem'}}>
                                                                <div className="widget-main">
                                                                    <div className="row"  style={{padding:'20px'}} >
                                                                        <div className="col-sm-12" style={{display:'flex'}}>
                                                                            <div className="col-6" style={{width:'50%'}}>
                                                                                {/* <div style={{width:'20px'}}>
                                                                                    {% if cmp.Image %}<img src="{{cmp.Image.url}}" style="width: 25px;">{% endif %}
                                                                                </div> */}
                                                                                {/* <p style={{color:'black'}}><strong>{{ cmp.Company_name }}</strong> <br />
                                                                                    {{cmp.City}} <br />
                                                                                    {{cmp.State}},{{cmp.Country}} <br />
                                                                                    {{cmp.Email}}<br />
                                                                                    {{cmp.Pincode}}<br />
                                                                                </p>   */}
                                                                            </div>
                                                                            <div style={{width:'50%',paddingTop:'1rem'}}>
                                                                                {/* <p style="color:black;">To,<br /><strong>{{vendor.first_name}} {{vendor.last_name}}</strong><br />
                                                                                    {{vendor.billing_street}},{{vendor.billing_city}}<br />
                                                                                    {{vendor.billing_state}},{{vendor.billing_country}}<br />
                                                                                    {{vendor.billing_pincode }}<br />
                                                                                    {{vendor.email}}<br />
                                                                                    {{vendor.mobile}}<br />
                                                                                </p> */}
                                                                            </div>
                                                                        
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="row">
                                                                        <div style={{display:'flex',width:'75%',justifyContent:'end'}}>
                                                                            <table style={{color:'black'}}>
                                                                                <tr>
                                                                                    <th className="text-black">Account Summary</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th>Opening balance</th>
                                                                                    <th>:</th>
                                                                                    {/* <th>{{vendor.opening_balance}}</th> */}
                                                                                </tr>
                                                                                <tr>
                                                                                    <th>Balance</th>
                                                                                    <th>:</th>
                                                                                    {/* <th>{{BALANCE}}</th> */}
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-md-12" style={{marginBottom:'1.5rem',marginTop:'1rem'}}>
                                                                    {/* <!-- <table id="logic" class="table table-bordered" width="100%" style=" color:white; background-color: #545455;"> --> */}
                                                                    <table id="logic" className="table table-hover" width={'100%'}>
                                                                        <thead className="" style={{background:'#22b8d1'}}>
                                                                            <tr>
                                                            
                                                                                <th style={{padding:'1.2rem 0.5rem',color:'black'}}>Date</th>
                                                                                <th style={{padding:'1.2rem 0.5rem',color:'black'}}>Type</th>
                                                                                <th style={{padding:'1.2rem 0.5rem',color:'black'}}>Number</th>
                                                                                <th style={{padding:'1.2rem 0.5rem',color:'black'}}>Total</th>
                                                                                <th style={{padding:'1.2rem 0.5rem',color:'black'}}>Balance</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {/* {% for data in combined_data %}
                                                                                <tr style="padding: 1.2rem 0.5rem;">
                                                                                    <td style="padding: 1.2rem 0.5rem; color: black;">{{data.Date|date:'d-m-Y'}}</td>
                                                                                    <td style="font-family: monospace; padding: 1.2rem 0.5rem; color: black;"><strong>{{data.Type}}</strong></td>
                                                                                    <td style="padding: 1.2rem 0.5rem; color: black;">{{data.Number}}</td>
                                                                                    <td style="padding: 1.2rem 0.5rem; color: black;">{{data.Total}}</td>
                                                                                    <td style="padding: 1.2rem 0.5rem; color: black;">{{data.Balance}}</td>
                                                                                </tr>
                                                                            {% endfor %} */}
                                                                             {/* <br />
                                                                            <tr >
                                                                                <th style="padding:1.2rem 0.5rem;" colspan="4">BALANCE</th>
                                                                                <th >{{BALANCE}}</th>
                                                                            </tr>  */}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
                    
                                    
                       
                        
    
        </>
    )
}
export default View_vendor;