import React, { useEffect, useState } from 'react';
import '../Styles/Branch.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export default function Branch() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [branches, setBranches] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    };


    useEffect(() => {
        axios.get("http://localhost:2024/allBranches")
            .then(res => {
                setBranches(res.data);
            })
    }, []);

    const downloadExcel = () => {
        const data = branches.map((branch, index) => ({
            "#": index + 1,
            "Branch Code": branch.branchCode,
            "Branch Name": branch.branchName,
            "Branch Short Name": branch.branchShortName,
            "Door No": branch.doorNo,
            "Street": branch.street,
            "Pincode": branch.pincode,
            "Locality": branch.locality,
            "City": branch.city,
            "State": branch.state,
            "PAN No": branch.panno,
            "GSTIN": branch.gstin,
            "Branch Type": branch.branchType,
            "Vehicle Type": branch.vehicleType.join(", "),
            "Branch Contact No": branch.branchContactNo,
            "Branch Alternater Contact No": branch.branchAlternaterContactNo,
            "Branch Whatsapp No": branch.branchWhatsappNo,
            "Branch Email ID": branch.branchEmailID,
            "Incharger Name": branch.inchargerName,
            "Incharger Contact No": branch.inchargerContactNo,
            "Incharger Alternate Contact No": branch.inchargerAlternateContactNo,
            "Incharger Whatsapp No": branch.inchargerWhatsappNo,
            "Incharger Email ID": branch.inchargerEmailID,
            "Contact Person Name": branch.contactPersonName,
            "Contact Person Phone No": branch.contactPersonNameNo,
            "Contact Person Alternate No": branch.contactPersonNameAlternateNo,
            "Contact Person Whatsapp No": branch.contactPersonNameWhatsappNo,
            "Contact Person Email ID": branch.contactPersonNameEMailID,
            "Opening Balance": branch.openingBalance,
            "Opening Date": branch.openingDate,
            "Minimum Amount": branch.minimumAmount,
            "Maximum Amount": branch.maximumAmount,
            "Monthly Maximum Amount": branch.monthlyMaximumAmount,
            "Maximum Unsettled Amount": branch.maximumUnsettledAmount,
            "Effective Date": branch.effectiveDate,
            "Bank Details": branch.bankDetails.map(bank => `Account No: ${bank.accountNumber},Account Holder Name: ${bank.accountHolderName}, IFSC: ${bank.ifscCode}, Bank Name: ${bank.bankName},Branch Name: ${bank.branchName}`).join(" | ")
        }));


        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Branches.xlsx");
    };

    const changeScreen = () => {
        setIsFullScreen(prevState => !prevState);
    };


    return (
        <>
            <div className={`main-section ${isFullScreen ? 'fullscreen' : 'medium-screen'}`}>
                <h2>Branch</h2>
                <div className='menu-items'>
                    <div className='menu-left'>
                        <div className='create-icon'>
                            <Link to="/newBranch"><ion-icon name="add-circle-outline"></ion-icon></Link>
                        </div>

                        <div className='search-box'>
                            <ion-icon name="search"></ion-icon>
                            <input type="text" id='search' placeholder='Search' name='search' value={search} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='menu-right'>
                        <div className='import-icon'>
                            <ion-icon name="arrow-up-circle-outline"></ion-icon>
                        </div>

                        {/* for excel download */}
                        <div className='excel-icon' onClick={downloadExcel}>
                            <ion-icon name="document-text-outline"></ion-icon>
                        </div>

                        {/* not work */}
                        <div className='grid-icon'>
                            <ion-icon name="grid-outline" ></ion-icon>
                        </div>

                        {/* for screen change */}
                        <div className='screen-icon' onClick={changeScreen}>
                            <ion-icon name="expand-outline"></ion-icon>
                        </div>
                    </div>
                </div>

                <div className='branch-table-wrapper'>
                    <table className='branch-table'>
                        <thead>
                            <tr className='tr'>
                                <th className='fixed-column'>#</th>
                                <th className='fixed-column'>Branch Name</th>
                                <th>Branch Code</th>
                                <th>Branch Short Name</th>
                                <th>Locality</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Contact Person</th>
                                <th>Contact Person Phone</th>
                                <th>PAN No</th>
                                <th>GSTIN</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches
                                .filter(branch => {
                                    return branch.branchName.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.panno.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.gstin.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.branchCode.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.city.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.state.toLowerCase().includes(search.toLowerCase())||
                                        branch.contactPersonName.toLowerCase().includes(search.toLowerCase()) ||
                                        branch.locality.toLowerCase().includes(search.toLowerCase());
                                        
                                })
                                .map((branch, index) => (
                                    <tr key={branch.id}>
                                        <td className='fixed-column'>{index + 1}</td>
                                        <td className='fixed-column'>{branch.branchName}</td>
                                        <td>{branch.branchCode}</td>
                                        <td>{branch.branchShortName}</td>
                                        <td>{branch.locality}</td>
                                        <td>{branch.city}</td>
                                        <td>{branch.state}</td>
                                        <td>{branch.contactPersonName}</td>
                                        <td>{branch.contactPersonNameNo}</td>
                                        <td>{branch.panno}</td>
                                        <td>{branch.gstin}</td>
                                        <td>
                                            <div className='status-active'>Active</div>
                                        </td>

                                        <td className='action'>
                                            <Link to={`/editBranch/${branch.branchCode}`}><ion-icon name="create-outline"></ion-icon></Link>
                                            <Link to={`/viewBranch/${branch.branchCode}`}><ion-icon name="eye-outline"></ion-icon></Link>
                                            <Link to={`/history/${branch.branchCode}`}><ion-icon name="timer-outline"></ion-icon></Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
