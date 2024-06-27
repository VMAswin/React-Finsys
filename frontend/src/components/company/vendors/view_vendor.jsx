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
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh',backgroundColor:'rgba(22,37,50,255)'}} >Overview</a>
                            {/* <a style="padding: 10px; cursor: pointer; border-radius: 1vh;" onclick="transaction()" id="transactionBtn" > Transactions</a> */}
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh'}}>Transactions</a>
                            {/* <a style="padding: 10px; cursor: pointer; border-radius: 1vh;" onclick="statement()" id="statementBtn" > Statement</a> */}
                            <a style={{padding:'10px',cursor:'pointer',borderRadius:'1vh'}}>Statement</a>
                        </div> 
                        <div className="col-md-6 d-flex justify-content-end">
                        {vendor.status == 'Active' ? (
                            <a className="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button" style={{height:'30px',width:'100px'}}>&nbsp;Active</a> 
                        ): (
                            <a className="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button" style={{height:'30px',width:'100px'}}>&nbsp;Inactive</a>   
                        )}
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
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                                    
                       
                        
    
        </>
    )
}
export default View_vendor;