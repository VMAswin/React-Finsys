import React, { useEffect, useState } from "react";
import FinBase from "../FinBase";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../../functions/config";
import Swal from "sweetalert2";

function Edit_vendor () {
    const {id} = useParams();
    console.log('user id',id)
    const ID = Cookies.get("Login_id");
    const get_vendor_details = () =>{
        axios.get(`${config.base_url}/get_vendor_details/${id}/${ID}/`).then((res)=>{
            if(res.data.status){
                console.log(res.data);
              
              }
        }).catch((err) =>{
            console.log('Error',err)
        })
    }
    useEffect(()=>{
        get_vendor_details();
      },[])
    return (
        <>
        <FinBase />
        </>
    )
}
export default Edit_vendor;