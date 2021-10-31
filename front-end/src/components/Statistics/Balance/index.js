import PieChart from '../Charts/PieChart'
import BarChart from '../Charts/BarChart'
import api from '../../../api/index'
import '../css/balanceByAccount.css'

const BalanceByAccount = ({account, balance}) => {
    return (
        <div>
            <h2>Balance by Account</h2>
            <article className="balanceByAccount">
                <div className="left">
                    <p className="bold">{account}</p>
                </div>
                <div className="right">
                    <p>Balance: ${balance.toFixed(2)}</p>
                </div>
            </article>
        </div>
    )
}

// accountToBalance is an object which maps: account => balance
const BalanceByAccountList = ({accountToBalance}) => {
    return (
        <div>
            {Object.getOwnPropertyNames(accountToBalance).map(account => (
                <BalanceByAccount
                    account={account}
                    balance={accountToBalance[account]}
                />
            ))}
        </div>
    )
}


const Balance = ({data}) => {
    // Gather data
    const accountToBalance = {}
    const dateToBalance = {}

    data.forEach(transaction => {
        const account = transaction.account
        const date = transaction.date
        const amount = transaction.amount

        if (accountToBalance[account]) {
            accountToBalance[account] += amount
        } else {
            accountToBalance[account] = amount
        }

        if (dateToBalance[date]) {
            dateToBalance[date] += amount
        } else {
            dateToBalance[date] = amount
        }
    })

    // Reformat data
    const balanceTrend = [["Date", "Balance"]]

    for (const date in dateToBalance) {
        balanceTrend.push([date, dateToBalance[date]])
    }

    return (
        <div>
            <h1>Balance</h1>
            <BarChart
                name="Balance Trend"
                data={balanceTrend}
            />
            <BalanceByAccountList
                accountToBalance={accountToBalance}
            />
        </div>
    )
};

export default Balance