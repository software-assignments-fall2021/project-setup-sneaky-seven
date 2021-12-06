import React, { useState } from "react";
import StatsNavbarWrapper from "../components/Statistics/StatsNavbar/StatsNavbarWrapper";
import prepareStats from "../components/Statistics/utils/prepare_stats.js";
import BalanceByAccountList from "../components/Statistics/Balance/BalanceByAccountList";
import "../components/css/TransparentContainer.css";
import Button from "@mui/material/Button";

// Indirect check for if stats doesn't have any meaningful data
const statsIsEmpty = (stats) => {
  return Object.keys(stats.accountToBalance).length === 0;
}


// only render money as spent if it's not a transfer to one of the other registered accounts!!!
const Statistics = () => {
  // Allows us to set the trend lengths
  const [numsOfDaysIndex, setNumsOfDaysIndex] = useState(2)

  const [stats, setStats] = useState({
    accountToBalance: {},
    accountIdToName: {},
    balanceTrend: [],
    spendingByCategories: [],
    spendingTrend: []
  });

  const [callbacks, setCallbacks] = useState({});
  const [selectedAccounts, setSelectedAccounts] = useState({});

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

  const numsOfDays = [7, 15, 30, 90, 365];
  const trendLengthsToIndex = {'week': 0, '15 days': 1, 'month': 2, '3 months': 3, 'year': 4};

  return (
    <>
      <h1>Statistics</h1>
      {/** This part gives the user the option to choose different trend lengths */}
      <br />
      <div className="transparentContainer">
        <h4>The following charts represent data starting from the last {Object.keys(trendLengthsToIndex)[numsOfDaysIndex]}.</h4>
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
      <br/>
      <div>
        <StatsNavbarWrapper stats={stats} />
      <br />
      </div>
      <div className="transparentContainer">
        <h2>Highlight and click the accounts you wish to see data for</h2>
        <BalanceByAccountList 
          accountToBalance={stats.accountToBalance}
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
      <br/>
    </>
  );
};

export default Statistics;
