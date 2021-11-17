const prettyPrintResponse = (response) => {
    if (response.data) console.log(response.data);
    else console.log(JSON.stringify(response));
};

module.exports = prettyPrintResponse;