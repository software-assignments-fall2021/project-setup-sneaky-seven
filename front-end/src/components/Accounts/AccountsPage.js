import React, { useEffect, useState } from 'react'
import AccountPanel from './AccountPanel'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import './css/AccountsPage.css'
import axios from "axios"
import { usePlaidLink } from 'react-plaid-link'

// TODO: replace all console.log with logger
const PlaidLink = props => {

    const onSuccess = (public_token, metadata) => {
        // send public_token to server to exchange for access_token
        console.log('enter onSuccess')
        console.log(public_token)
        axios.post('/api/set_access_token', {
            "public_token": public_token
        }).then(resp => {
            console.log(resp.data)
            localStorage.setItem("access_token_object", JSON.stringify(resp.data))
        })
    }

    const config = {
        token: props.token,
        onSuccess,
        // onExit
        // onEvent
        env: 'development'
    }

    const { open, ready, error } = usePlaidLink(config)

    return (
        <Button id="new-account-btn" onClick={() => open()} disabled={!ready} variant="contained" startIcon ={<AddIcon />} >
        Connect a bank account
        </Button>
    )
}
/**
 * This component renders the full body of the webpage that shows each of the user's
 * accounts. It is comprised of 1 AccountPanel per account.
 * @param {*} props 
 * @returns AccountsPage representing the full accounts page.
 * 
 * props: 
    1. banks (list of banks)
    2. setShowDetail (function to pass as prop to AccountPanel)
    3. setBankDetailName (function to pass as prop to AccountPanel)
 */
function AccountsPage(props) {
    const data = props.banks
    const [token, setToken] = useState(null)

    // generate a link_token (public token)
    useEffect(() => {
        axios
        .post('/api/create_link_token', {})
        .then((resp) => {
            setToken(resp.data.link_token)
        })
    }, [])

    return (
        <>
        <h1>Accounts</h1>

        {data.map(bank => (
            <AccountPanel 
                bankName={bank.bankName} 
                type={bank.type}
                showAccountDetail={props.setShowDetail}
                setBankDetailHeader={props.setBankDetailName}
            />))}

        {token === null ? (
            // insert your loading animation here
            <div></div>
        ) : (
            <PlaidLink token={token} />
        )}
        </>
    )
}

export default AccountsPage;