import React, { useEffect, useState } from "react";
import FinBase from "../FinBase";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import config from "../../../functions/config";


function View_vendor () {
    const ID = Cookies.get("Login_id");

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
                            {/* {% if vendor.status == 'Inactive' %} */}
                            {/* <a href="{% url 'Fin_changeVendorStatus' vendor.id 'Active' %}" id="activeBtn" class="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button" >&nbsp;Inactive</a> */}
                            <a className="ml-2 fa fa-ban btn btn-outline-secondary text-grey" role="button">&nbsp;Inactive</a> 
                            {/* {% else %} */}
                            {/* <a href="{% url 'Fin_changeVendorStatus' vendor.id 'Inactive' %}" id="inactiveBtn" class="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button" >&nbsp;Active</a> */}
                            <a className="ml-2 fa fa-check-circle btn btn-outline-secondary text-grey" role="button">&nbsp;Active</a>  
                            {/* {% endif %} */}
                            {/* <a href="{% url 'Fin_editVendor' vendor.id %}" class="ml-2 fa fa-pencil btn btn-outline-secondary text-grey" id="editBtn" role="button">&nbsp;Edit</a>
                            <a href="{% url 'Fin_deleteVendor' vendor.id %}" class="ml-2 btn btn-outline-secondary text-grey fa fa-trash" id="deleteBtn" role="button" onclick="return confirm('Are you sure you want to delete Vendor - {{vendor.first_name}}.?')">&nbsp;Delete</a>
                            <a href="#"  class="ml-2 btn btn-outline-secondary text-grey fa fa-comments" id="commentsBtn" role="button" data-toggle="modal" data-target="#commentModal">&nbsp;Comment</a>
                            <a href="{% url 'Fin_vendorHistory' vendor.id %}"  class="ml-2 btn btn-outline-secondary text-grey fa fa-history" id="historyBtn" role="button" >&nbsp;History</a> */}
                        </div>
                    </div> 
                </div>
                <center>
                    <h3 className="card-title" >VENDOR OVERVIEW</h3>
                </center>
            </div>
        </div>
    </div>
   
    </div>
        </>
    )
}
export default View_vendor;