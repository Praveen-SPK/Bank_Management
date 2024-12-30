import React, { useEffect, useState } from 'react';
import '../Styles/NewBranch.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditBranch() {
    const navigate = useNavigate();
    const { branchCode } = useParams();
    const [branchData, setBranchData] = useState({});
    const [bankDetails, setBankDetails] = useState([]);

    useEffect(() => {
        if (branchCode) {
            axios.get(`http://localhost:2024/editbranch/${branchCode}`)
                .then((response) => {
                    setBranchData(response.data);
                    setBankDetails(response.data.bankDetails || []);
                })
                .catch((error) => {
                    console.error('Error fetching branch data:', error);
                });
        }
    }, [branchCode]);

    const changeHandle = (e) => {
        const { name, value } = e.target;
        setBranchData({ ...branchData, [name]: value });
    };

    const handleBankDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedBankDetails = [...bankDetails];
        updatedBankDetails[index][name] = value;
        setBankDetails(updatedBankDetails);
    };

    const addBankDetailRow = () => {
        setBankDetails([
            ...bankDetails,
            {
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
        const values={
            ...branchData,
            bankDetails:bankDetails,
        };
        axios.post("http://localhost:2024/addBranch",values)
            .then(res => {
                if (res.data==="success") {
                    alert("Your Account has been Registered Successfully!!!");
                    navigate("/");
                }
            });
    };

    const [vehicleType,setVehicleType]=useState({selectAll: false,car: false,truck: false,bike: false,});

    const handleVehicleChange=(e)=>{
        const {name,checked}=e.target;

        if (name==='selectAll') {
            setVehicleType({
                selectAll:checked,
                car:checked,
                truck:checked,
                bike:checked,
            });
            const allVehicles=checked?['car', 'truck', 'bike']:[];
            setBranchData((prevData)=>({
                ...prevData,
                vehicleType: allVehicles,
            }));
        }else{
            setVehicleType((prev)=>({
                ...prev,
                [name]: checked,
                selectAll: false,
            }));

            setBranchData((prevData) => {
                const updatedVehicles=checked?[...prevData.vehicleType,name]:prevData.vehicleType.filter((vehicle)=>vehicle!==name);
                return {
                    ...prevData,
                    vehicleType: updatedVehicles,
                };
            });
        }
    };

   
    return (
        <section id="Register">
            <form onSubmit={handleSubmit} method="post" className="register-form">
                <h3>Manage Branch</h3>

                <div className="form-container">
                    <h3>1.Branch Details:</h3>
                    <div className="form-group">
                        <label htmlFor="branchCode">Branch Code:</label>
                        <input type="text" id="branchCode" name="branchCode" value={branchData?.branchCode} onChange={changeHandle} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="branchName">Branch Name:</label>
                        <input type="text" id="branchName" name="branchName" value={branchData?.branchName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchShortName">Branch ShortName:</label>
                        <input type="text" id="branchShortName" name="branchShortName" value={branchData?.branchShortName} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="doorNo">Door/Flat No:</label>
                        <input type="text" id="doorNo" name="doorNo" value={branchData?.doorNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" name="street" value={branchData?.street} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">PinCode:</label>
                        <input type="tel" id="pincode" name="pincode" min="6" max="6" value={branchData?.pincode} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locality">Locality:</label>
                        <input type="text" id="locality" name="locality" value={branchData?.locality} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={branchData?.city} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" value={branchData?.state} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="panno">PAN No:</label>
                        <input type="text" id="panno" name="panno" value={branchData?.panno} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gstin">GSTIN:</label>
                        <input type="text" id="gstin" name="gstin" value={branchData?.gstin} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchType">Branch Type:</label>
                        <input type="text" id="branchType" name="branchType" value={branchData?.branchType} onChange={changeHandle} required />
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
                        <input type="tel" id="branchContactNo" name="branchContactNo" value={branchData?.branchContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchAlternaterContactNo">Alternate Contact No:</label>
                        <input type="tel" id="branchAlternaterContactNo" name="branchAlternaterContactNo" value={branchData?.branchAlternaterContactNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchWhatsappNo">Whatsapp Number:</label>
                        <input type="tel" id="branchWhatsappNo" name="branchWhatsappNo" value={branchData?.branchWhatsappNo} onChange={changeHandle} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchEmailID">Email Id:</label>
                        <input type="email" id="branchEmailID" name="branchEmailID" value={branchData?.branchEmailID} onChange={changeHandle} required />
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
                        <tbody>
                            {bankDetails.map((bank, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="text" name="accountNumber" value={bank.accountNumber} onChange={(e)=>handleBankDetailChange(index,e)} />
                                    </td>
                                    <td>
                                        <input type="text" name="accountHolderName" value={bank.accountHolderName} onChange={(e)=>handleBankDetailChange(index,e)} />
                                    </td>
                                    <td>
                                        <input type="text" name="ifscCode" value={bank.ifscCode} onChange={(e)=>handleBankDetailChange(index,e)} />
                                    </td>
                                    <td>
                                        <input type="text" name="bankName" value={bank.bankName} onChange={(e)=>handleBankDetailChange(index,e)} />
                                    </td>
                                    <td>
                                        <input type="text" name="branchName" value={bank.branchName} onChange={(e)=>handleBankDetailChange(index,e)} />
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
                </div>
            </form>
        </section>
    );
}



