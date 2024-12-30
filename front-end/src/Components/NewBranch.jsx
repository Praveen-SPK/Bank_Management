import React, { useState } from 'react';
import '../Styles/NewBranch.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewBranch() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        branchCode: '',
        branchName: '',
        branchShortName: '',
        doorNo: '',
        street:'',
        pincode:'',
        locality:'',
        city:'',
        state:'',
        panno:'',
        gstin:'',
        branchType: '',
        vehicleType: '',
        branchContactNo: '',
        branchAlternaterContactNo: '',
        branchWhatsappNo: '',
        branchEmailID: '',
        inchargerName: '',
        inchargerContactNo: '',
        inchargerAlternateContactNo: '',
        inchargerWhatsappNo: '',
        inchargerEmailID: '',
        contactPersonName: '',
        contactPersonNameNo: '',
        contactPersonNameAlternateNo: '',
        contactPersonNameWhatsappNo: '',
        contactPersonNameEMailID: '',
        openingBalance: '',
        openingDate: '',
        minimumAmount: '',
        maximumAmount: '',
        monthlyMaximumAmount: '',
        maximumUnsettledAmount: '',
        effectiveDate: '',
         
    });

    const changeHandle=(e)=>{
        const {name,value}=e.target;
        setData({...data,[name]:value});
    }

    const [vehicleType, setVehicleType] = useState({
        selectAll: false,
        car: false,
        truck: false,
        bike: false,
    });

    const handleVehicleChange=(e)=>{
        const {name,checked}=e.target;

        if(name==='selectAll'){
            setVehicleType({
                selectAll:checked,
                car:checked,
                truck:checked,
                bike:checked,
            });
            const allVehicles=checked?['car', 'truck', 'bike']:[];
            setData((prevData)=>({
                ...prevData,
                vehicleType:allVehicles,
            }));
        }else{
            setVehicleType((prev)=>({
                ...prev,
                [name]:checked,
                selectAll:false,
            }));
            setData((prevData) => {
                const updatedVehicles=checked?[...prevData.vehicleType,name]:prevData.vehicleType.filter((vehicle)=>vehicle!==name);
                return {
                    ...prevData,
                    vehicleType: updatedVehicles,
                };
            });
        }};

    const [bankDetails,setBankDetails]=useState([
        {
            branchCode:'',
            accountNumber: '',
            accountHolderName: '',
            ifscCode: '',
            bankName: '',
            branchName: '',
        },
    ]);

    
    const handleBankDetailChange=(index,e)=>{
        const {name,value}=e.target;
        const updatedBankDetails=[...bankDetails];
        updatedBankDetails[index][name]=value;
        setBankDetails(updatedBankDetails);
    };

    const addBankDetailRow=()=>{
        setBankDetails([
            ...bankDetails,
            {
                branchCode:'',
                accountNumber: '',
                accountHolderName: '',
                ifscCode: '',
                bankName: '',
                branchName: '',
            },
        ]);
    };

    const removeBankDetailRow=(index)=>{
        const updatedBankDetails=bankDetails.filter((_,i)=>i!==index);
        setBankDetails(updatedBankDetails);
    };

   
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const resultSet= {
            ...data,
            'bankDetails':bankDetails,
        };
        axios.post("http://localhost:2024/addBranch",resultSet)
        .then(res=>{
          if(res.data=="success"){
            alert(
                "Your Account has been Registered Successfully!!! "
            )
            navigate("/");
        }})};

   

    return (
        <section id="Register">
            <form onSubmit={handleSubmit} method="post" className="register-form">
                <h3>Manage Branch</h3>
                <div className="form-container">
                    <h3>1.Branch Details:</h3>
                    <div className="form-group">
                        <label htmlFor="branchCode">Branch Code:</label>
                        <input type="text" id="branchCode" name="branchCode" value={data.branchCode} onChange={changeHandle} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="branchName">Branch Name:</label>
                        <input type="text" id="branchName" name="branchName" value={data.branchName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchShortName">Branch ShortName:</label>
                        <input type="text" id="branchShortName" name="branchShortName" value={data.branchShortName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="doorNo">Door/Flat No:</label>
                        <input type="text" id="doorNo" name="doorNo" value={data.doorNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" name="street" value={data.street} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">PinCode:</label>
                        <input type="tel" id="pincode" name="pincode" min="6" max="6" value={data.pincode} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locality">Locality:</label>
                        <input type="text" id="locality" name="locality" value={data.locality} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={data.city} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" value={data.state} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="panno">PAN No:</label>
                        <input type="text" id="panno" name="panno" value={data.panno} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gstin">GSTIN:</label>
                        <input type="text" id="gstin" name="gstin" value={data.gstin} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchType">Branch Type:</label>
                        <input type="text" id="branchType" name="branchType" value={data.branchType} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='vehicleType'>Vehicle Type</label>
                        <label><input type="checkbox" id='vehicleType' name="selectAll" checked={vehicleType.selectAll} onChange={handleVehicleChange} />Select All</label>
                        <label><input type="checkbox" id='vehicleType' name="car" checked={vehicleType.car} onChange={handleVehicleChange} />Car</label>
                        <label><input type="checkbox" id='vehicleType' name="truck" checked={vehicleType.truck} onChange={handleVehicleChange} />Truck</label>
                        <label><input type="checkbox" id='vehicleType' name="bike" checked={vehicleType.bike} onChange={handleVehicleChange} />Bike</label>
                    </div>

                    <h3>2.Branch Contact Details:</h3>
                    <div className="form-group">
                        <label htmlFor="branchContactNo">Contact No :</label>
                        <input type="tel" id="branchContactNo" name="branchContactNo" value={data.branchContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchAlternaterContactNo">Alternate Contact No:</label>
                        <input type="tel" id="branchAlternaterContactNo" name="branchAlternaterContactNo" value={data.branchAlternaterContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchWhatsappNo">Whatsapp Number:</label>
                        <input type="tel" id="branchWhatsappNo" name="branchWhatsappNo" value={data.branchWhatsappNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchEmailID">Email Id:</label>
                        <input type="email" id="branchEmailID" name="branchEmailID" value={data.branchEmailID} onChange={changeHandle} required />
                    </div>

                    <h3>3.Branch Incharge Details:</h3>
                    <div className="form-group">
                        <label htmlFor="inchargerName">Branch Incharger Name:</label>
                        <input type="text" id="inchargerName" name="inchargerName" value={data.inchargerName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inchargerContactNo">Contact Number:</label>
                        <input type="tel" id="inchargerContactNo" name="inchargerContactNo" value={data.inchargerContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inchargerAlternateContactNo">Alternate Contact Number:</label>
                        <input type="tel" id="inchargerAlternateContactNo" name="inchargerAlternateContactNo" value={data.inchargerAlternateContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inchargerWhatsappNo">Whatsapp Number:</label>
                        <input type="tel" id="inchargerWhatsappNo" name="inchargerWhatsappNo" value={data.inchargerWhatsappNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inchargerEmailID">Email Id:</label>
                        <input type="email" id="inchargerEmailID" name="inchargerEmailID" value={data.inchargerEmailID} onChange={changeHandle} required />
                    </div>


                    <h3>4.Contact Person Details:</h3>
                    <div className="form-group">
                        <label htmlFor="contactPersonName">Contact Person Name:</label>
                        <input type="text" id="contactPersonName" name="contactPersonName" value={data.contactPersonName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactPersonNameNo">Contact Number:</label>
                        <input type="tel" id="contactPersonNameNo" name="contactPersonNameNo" value={data.contactPersonNameNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactPersonNameAlternateNo">Alternate Number:</label>
                        <input type="tel" id="contactPersonNameAlternateNo" name="contactPersonNameAlternateNo" value={data.contactPersonNameAlternateNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactPersonNameWhatsappNo">Whatsapp Number:</label>
                        <input type="tel" id="contactPersonNameWhatsappNo" name="contactPersonNameWhatsappNo" value={data.contactPersonNameWhatsappNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactPersonNameEMailID">Email Id:</label>
                        <input type="email" id="contactPersonNameEMailID" name="contactPersonNameEMailID" value={data.contactPersonNameEMailID} onChange={changeHandle} required />
                    </div>

                    <h3>5.Opening Details:</h3>
                    <div className="form-group">
                        <label htmlFor="openingBalance">Opening Balance:</label>
                        <input type="number" id="openingBalance" name="openingBalance" value={data.openingBalance} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="openingDate">Opening Date:</label>
                        <input type="date" id="openingDate" name="openingDate" value={data.openingDate} onChange={changeHandle} required />
                    </div>

                    <h3>6.Advance Request Details:</h3>
                    <div className="form-group">
                        <label htmlFor="minimumAmount">Minimum Amount:</label>
                        <input type="number" id="minimumAmount" name="minimumAmount" value={data.minimumAmount} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maximumAmount">Maximum Amount:</label>
                        <input type="number" id="maximumAmount" name="maximumAmount" value={data.maximumAmount} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="monthlyMaximumAmount">Monthly Maximum Amount:</label>
                        <input type="number" id="monthlyMaximumAmount" name="monthlyMaximumAmount" value={data.monthlyMaximumAmount} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maximumUnsettledAmount">Maximum Unsettled Amount:</label>
                        <input type="number" id="maximumUnsettledAmount" name="maximumUnsettledAmount" value={data.maximumUnsettledAmount} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="effectiveDate">Effective Date:</label>
                        <input type="date" id="effectiveDate" name="effectiveDate" value={data.effectiveDate} onChange={changeHandle} required />
                    </div>
                </div>

                <h3>7.Bank Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Account Holder Name</th>
                            <th>IFSC Code</th>
                            <th>Bank Name</th>
                            <th>Branch Name</th>
                            <th ><button className='add-bank' type="button" onClick={addBankDetailRow}>
                                        <ion-icon name="add-circle-outline"></ion-icon>
                                    </button></th>
                        </tr>
                    </thead>
                    {/* With out add bank button */}
                    {/* <tbody> 
                        <tr>
                            <td><input type="text" id="accountNumber" name="accountNumber" placeholder='Account Number' value={data.accountNumber} onChange={changeHandle} required /></td>
                            <td><input type="text" id="accountHolderName" name="accountHolderName" placeholder='Account Holder Name' value={data.accountHolderName} onChange={changeHandle} required /></td>
                            <td><input type="text" id="IFSCCode" name="IFSCCode" placeholder='IFSC Code' value={data.IFSCCode} onChange={changeHandle} required /></td>
                            <td><input type="text" id="bankName" name="bankName" placeholder='Bank Name' value={data.bankName} onChange={changeHandle} required /></td>
                            <td><input type="text" id="BranchName" name="BranchName" placeholder='Branch Name' value={data.BranchName} onChange={changeHandle} required /></td>
                        </tr>
                    </tbody> */}

                    {/* with add bank btn... just to understand the logic i mention this */}
                    <tbody>
                        {bankDetails.map((bank,index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="text" name="accountNumber" placeholder="Account Number" value={bank.accountNumber} onChange={(e)=>handleBankDetailChange(index,e)} required/>
                                    </td>
                                    <td>
                                        <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={bank.accountHolderName} onChange={(e)=>handleBankDetailChange(index,e)} required/>
                                    </td>
                                    <td>
                                        <input type="text" name="ifscCode" placeholder="IFSC Code" value={bank.ifscCode} onChange={(e)=>handleBankDetailChange(index,e)} required/>
                                    </td>
                                    <td>
                                        <input type="text" name="bankName" placeholder="Bank Name" value={bank.bankName} onChange={(e)=>handleBankDetailChange(index,e)} required/>
                                    </td>
                                    <td>
                                        <input type="text" name="branchName" placeholder="Branch Name" value={bank.branchName} onChange={(e)=>handleBankDetailChange(index,e)} required/>
                                    </td>
                                    <td>
                                        <button type="button" onClick={()=>removeBankDetailRow(index)} className="delete-row">
                                            <ion-icon name="trash"></ion-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                <div className='conclusion'>
                    <div className='btn-section'>
                        <Link to="/"><button className='discard'>Discard</button></Link>
                        <button className='submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
