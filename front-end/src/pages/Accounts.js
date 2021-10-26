import './css/Accounts.css'
import React, { useEffect, useState } from 'react';
import AccountDetail from '../components/AccountDetail/AccountDetail';
import AccountsPage from '../components/Accounts/AccountsPage';
import { backupData } from '../components/Accounts/AccountBackupData';
import axios from 'axios';


// To-do: identify a better color scheme
// To-do 2: use the bankId in props when saving to DB 
/**
 * This function handles the rendering of the list of accounts
 * When the user clicks on an account, it will render the details for that
 * particular account which is in the AccountDetail panel
 * 
 * @returns Account page component
 */
function Accounts() {

    const [data, setData] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [bankDetailName, setBankDetailName] = useState("")

    useEffect(() => {
        console.log("fetching accounts data for user");
        axios('https://my.api.mockaroo.com/budget_app_accounts.json?key=9a5445a0')
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log("Something went wrong. We're probably out of requests for the day!")
                console.error(err);
                setData(backupData)
            })
    })

    const renderPage = showDetail ? 
    <AccountDetail 
        showAccountDetail={setShowDetail}
        setBankDetailHeader={setBankDetailName} 
        bankName={bankDetailName}
        /> : <AccountsPage banks={data} setShowDetail={setShowDetail} setBankDetailName={setBankDetailName} />

    return <div className="container">
                {renderPage}
            </div>
}

export default Accounts;