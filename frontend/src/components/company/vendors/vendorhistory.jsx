import React, { useEffect, useState } from "react";
import FinBase from "../FinBase";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../../functions/config";
import Swal from "sweetalert2";

function Vendorhistory () {
    return(
        <>
        <FinBase />
        </>
    )
}
export default Vendorhistory;