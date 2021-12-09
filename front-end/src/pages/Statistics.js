import React, { useState } from "react";
// import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import prepareStats from "../components/Statistics/utils/prepare_stats.js";
import BalanceByAccountList from "../components/Statistics/Balance/BalanceByAccountList";
import "../components/css/TransparentContainer.css";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StatsNavbar from "../components/Statistics/StatsNavbar";
import Balance from "../components/Statistics/Balance";
import Spending from "../components/Statistics/Spending";

// Indirect check for if stats doesn't have any meaningful data
const statsIsEmpty = (stats) => {
  return Object.keys(stats.accountToBalance).length === 0;
}

const TimeSettings = ({ stats, setStats, numsOfDaysIndex, setNumsOfDaysIndex }) => {
    const numsOfDays = [7, 15, 30, 90, 365];
    const trendLengthsToIndex = {'week': 0, '15 days': 1, 'month': 2, '3 months': 3, 'year': 4};
  
    return (
      <>
        <br/>
        <div className="transparentContainer">
          <div className="timebar">
            {Object.keys(trendLengthsToIndex).map(trendLength => 
              <button 
                className={trendLengthsToIndex[trendLength] === numsOfDaysIndex ? "timeOptionActive" : "timeOption"} 
                onClick={async () => {
                  setStats(await prepareStats(numsOfDays[trendLengthsToIndex[trendLength]]));
                  setNumsOfDaysIndex(trendLengthsToIndex[trendLength]);
                }}
              > Last {trendLength}
              </button>
            )}         
          </div>
        </div>
        <br/>
        <h2>The chart(s) below represent data starting from the last {Object.keys(trendLengthsToIndex)[numsOfDaysIndex]}.</h2>
      </>
    );
};

const AccountSettings = ({ stats, setStats, numsOfDaysIndex, setNumsOfDaysIndex, selectedAccounts, setSelectedAccounts, callbacks, setCallbacks, balanceByAccountList }) => {
  const numsOfDays = [7, 15, 30, 90, 365];
  const trendLengthsToIndex = {'week': 0, '15 days': 1, 'month': 2, '3 months': 3, 'year': 4};

  if (statsIsEmpty(stats)) {
    prepareStats(30, null)
    .then(stats => {
      setStats(stats);

      // Each callback will update selectedAccounts by adding a new account
      const tempSetCallbacks = {};
      const tempSelectedAccounts = {};

      for (const account in stats.accountToBalance) {
        tempSelectedAccounts[account] = true;
        
        tempSetCallbacks[account] = () => {
          setSelectedAccounts(selectedAccounts => ({
            ...selectedAccounts,
            [account]: !selectedAccounts[account]
          }));
        };
      }

      setCallbacks(tempSetCallbacks);
      setSelectedAccounts(tempSelectedAccounts);
    });
  }

  return (
    <div className="transparentContainer">
      <h2>Highlight and click the accounts you wish to see data for</h2>
      <BalanceByAccountList 
        accountToBalance={stats.accountToBalance}
        selectedAccounts={selectedAccounts}
        callbacks={callbacks ?? {}}
      />
      <Button
        variant="contained"
        id="new-account-btn"
        onClick={async () => {
          const selectionWasMade = Object.keys(selectedAccounts)
            .reduce((prev, curr) => prev || selectedAccounts[curr], false)
          
          if (!selectionWasMade) {
            alert("Please select the accounts by clicking on them");
            return;
          }

          setStats(await prepareStats(numsOfDays[numsOfDaysIndex], selectedAccounts, stats.accountIdToName));
        }}
      >
        Confirm Selection
      </Button>

    </div>
  );
};


// only render money as spent if it's not a transfer to one of the other registered accounts!!!
const Statistics = () => {
  const [stats, setStats] = useState({
    accountToBalance: {},
    accountIdToName: {},
    balanceTrend: [],
    spendingByCategories: [],
    spendingTrend: []
  });

  const [numsOfDaysIndex, setNumsOfDaysIndex] = useState(2)
  const [callbacks, setCallbacks] = useState({});
  const [selectedAccounts, setSelectedAccounts] = useState({});

  const CustomTimeSettings = () => <TimeSettings
    stats={stats}
    setStats={setStats} 
    numsOfDaysIndex={numsOfDaysIndex}
    setNumsOfDaysIndex={setNumsOfDaysIndex}
  />;

  const CustomAccountSettings = () => <AccountSettings
    stats={stats} 
    setStats={setStats}
    numsOfDaysIndex={numsOfDaysIndex}
    setNumsOfDaysIndex={setNumsOfDaysIndex}
    selectedAccounts={selectedAccounts}
    setSelectedAccounts={setSelectedAccounts}
    callbacks={callbacks}
    setCallbacks={setCallbacks}
  />

  return (
    <>
      <h1>Statistics</h1>
      {/** This part gives the user the option to choose different trend lengths */}
      <div>
        <Router>
          <StatsNavbar />
            <Switch>
              <Route
                path="/statistics/spending"
                exact
                component={() => {
                  return (
                    <>
                      <CustomTimeSettings/>
                      <Spending stats={stats}/>
                      <CustomAccountSettings/>
                    </>
                  );
                }}
              />
              <Route
                path="/statistics/balance"
                exact
                component={() => {
                  return (
                    <>
                      <CustomTimeSettings/>
                      <Balance stats={stats}/>
                      <CustomAccountSettings/>
                    </>
                  );
                }}
              />
              <Route
                path="/statistics"
                exact
                component={() => {
                  return (
                    <>
                      <CustomTimeSettings/>
                      <Balance stats={stats}/>
                      <CustomAccountSettings/>
                    </>
                  );
                }}
              />
            </Switch>
        </Router>
      <br />
      </div>
      </>
  );
};

export default Statistics;
