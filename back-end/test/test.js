const chai = require("chai");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const expect = chai.expect;
const path = require("path");
require("mocha-sinon");
const constructAccountsArr = require("../functions/constructAccountsArray");
const constructTransactionArr = require("../functions/constructTransactionArray");
const setTransactionNotesInDatabase = require("../functions/setTransactionNotesInDatabase");
const setTransactionCategoryInDatabase = require("../functions/setTransactionCategoryInDatabase");

const UserModel = require("../model/user");
Object.assign(global, require(path.join(__dirname, "../app.js")));

transactionsTest = [
  {
    account_id: "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
    amount: 2307.21,
    iso_currency_code: "USD",
    unofficial_currency_code: null,
    category: ["Shops", "Computers and Electronics"],
    category_id: "19013000",
    check_number: null,
    date: "2017-01-29",
    datetime: null,
    authorized_date: "2017-01-27",
    authorized_datetime: null,
    location: {
      address: "300 Post St",
      city: "San Francisco",
      region: "CA",
      postal_code: "94108",
      country: "US",
      lat: 40.740352,
      lon: -74.001761,
      store_number: "1235",
    },
    name: "Apple Store",
    merchant_name: "Apple",
    payment_meta: {
      by_order_of: null,
      payee: null,
      payer: null,
      payment_method: null,
      payment_processor: null,
      ppd_id: null,
      reason: null,
      reference_number: null,
    },
    payment_channel: "in store",
    pending: false,
    pending_transaction_id: null,
    account_owner: null,
    transaction_id: "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
    transaction_code: null,
    transaction_type: "place",
  },
];
describe("testing routes", () => {
  describe("testing post route on /api/get_bank_accounts with no req body", () => {
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/get_bank_accounts")
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });

  describe("testing post route on /api/setTransactionNotes with no req body", () => {
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/setTransactionNotes")
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });

  describe("testing post route on /api/setTransactionCategory with no req body", () => {
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/setTransactionCategory")
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });

  describe("testing post route on /api/get_bank_accounts with req body", () => {
    beforeEach(function () {
      this.sinon.stub(JSON, "parse").returns({
        access_token: "test_access_token",
      });
    });
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/get_bank_accounts")
        .send({
          access_token_object: {
            access_token: "test_access_token",
          },
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });
  describe("testing get route on /api/get_transactions with no req body", () => {
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .get("/api/get_transactions")
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });

  describe("testing get route on /api/get_transactions with bad req body", () => {
    beforeEach(function () {
      this.sinon.stub(JSON, "parse").returns({
        access_token: "test_access_token",
      });
    });
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .get("/api/get_transactions")
        .send({
          _id: "6197040bc16e9e0522901b1a",
          time: 30,
          ofst: 0,
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });
  describe("testing post route on /api/setTransactionCategory with bad req body", () => {
    beforeEach(function () {
      this.sinon.stub(JSON, "parse").returns({
        access_token: "test_access_token",
      });
    });
    it("returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/setTransactionCategory")
        .send({
          transaction_id: "rM6pZKV4wDcX950w5Q3QcdkPbEvXREtBA4Exd",
          newCategory: "Automotive",
          user_id: "6197040bc16e9e0522901b1f",
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
  });
  describe("testing get route /api/categories", () => {
    it("returns a 200 status", function (cb) {
      chai
        .request(app)
        .get("/api/categories")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
    it("contains pre-defined plaid categories", function (cb) {
      chai
        .request(app)
        .get("/api/categories")
        .end(function (err, res) {
          expect(res.body.map((c) => c.name)).to.include.members(["Bank Fees"]);
          cb();
        });
    });
  });
  describe("testing post route /api/create_link_token", () => {
    it("returns a 200 status", function (cb) {
      chai
        .request(app)
        .post("/api/create_link_token")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
  });
  describe("testing post route /api/set_access_token", () => {
    it("returns a 200 status", function (cb) {
      chai
        .request(app)
        .post("/api/set_access_token")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
  });
  describe("testing get route /faq", () => {
    it("returns a 200 status", function (cb) {
      chai
        .request(app)
        .get("/faq")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
    describe("testing get route /faq", () => {
      it("returns a 200 status", function (cb) {
        chai
          .request(app)
          .get("/faq")
          .end(function (err, res) {
            expect(res).to.have.status(200);
            cb();
          });
      });
      it("returns correct faq data", function (cb) {
        chai
          .request(app)
          .get("/faq")
          .end(function (err, res) {
            expect(res.body.rows).to.have.lengthOf(3);
          });
        cb();
      });
    });
    describe("testing get and post route of /contactInfo", () => {
      it("get route of /contactInfo returns a 200 status", function (cb) {
        chai
          .request(app)
          .get("/contactInfo")
          .end(function (err, res) {
            expect(res).to.have.status(200);
            cb();
          });
      });
      it("post route of /contactInfo returns a 200 status", function (cb) {
        chai
          .request(app)
          .post("/contactInfo")
          .end(function (err, res) {
            expect(res).to.have.status(200);
            cb();
          });
      });
      it("get returns an empty array if there was no previous post request", function (cb) {
        chai
          .request(app)
          .get("/contactInfo")
          .end(function (err, res) {
            expect(res.body).to.empty;
            cb();
          });
      });
      it("returns expected content of contact information", function (cb) {
        chai
          .request(app)
          .post("/contactInfo")
          .send({
            name: "Test1",
            email: "TestEmail",
            message: "TestMsg",
          })
          .end(function (err, res) {
            chai
              .request(app)
              .get("/contactInfo")
              .end(function (err, res2) {
                expect(res2.body).to.include({
                  name: "Test1",
                  email: "TestEmail",
                  message: "TestMsg",
                });
                cb();
              });
          });
      });
    });
  });
  describe("testing printing/debugging functions", () => {
    beforeEach(function () {
      this.sinon.stub(console, "log");
    });

    describe("testing prettyPrintResponse function", () => {
      it("reads api response and prints out relevant data information", () => {
        const fakeData = {
          data: "important data",
          status: 200,
          language: "en",
        };
        prettyPrintResponse(fakeData);
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith("important data")).to.be.true;
      });
    });

    describe("testing formatError function", () => {
      it("reads api response and prints out relevant error information", () => {
        const fakeData = {
          data: "important data",
          status: 500,
          language: "en",
        };
        expect(formatError(fakeData)).to.have.property("error");
        expect(formatError(fakeData).error).to.have.property("status_code");
      });
    });
  });
  describe("testing constructing accounts array function", () => {
    describe("testing constructAccountsArray function with no banks", () => {
      it("reads function response and returns empty array", () => {
        const fakeData = [];
        expect(constructAccountsArr(fakeData)).to.deep.equal([]);
      });
    });
  });
  describe("testing constructing accounts array function", () => {
    describe("testing constructAccountsArray function with bank info", () => {
      it("reads function response and returns constructed array", () => {
        const fakeData = [
          {
            account_id: "reAXq01pJmFqvNK3yrR4SPYe7wDQg9FBw595w",
            balances: {
              available: 3.5,
              current: 3.5,
              iso_currency_code: "USD",
              limit: null,
              unofficial_currency_code: null,
            },
            mask: "8638",
            name: "CHASE COLLEGE",
            official_name: null,
            subtype: "checking",
            type: "depository",
          },
        ];

        const ret = [
          {
            account_id: "reAXq01pJmFqvNK3yrR4SPYe7wDQg9FBw595w",
            balances: { available: 3.5, current: 3.5, currency: "USD" },
            name: "CHASE COLLEGE",
            type: "depository",
          },
        ];
        expect(constructAccountsArr(fakeData)).to.deep.equal(ret);
      });
    });
  });
  describe("testing constructing transactions array function", () => {
    describe("testing constructAccountsArray function with no banks", () => {
      it("reads function response and returns empty array", () => {
        expect(constructTransactionArr([], [], [{}])).to.deep.equal([]);
      });
    });

    describe("testing constructTransactions with one bank", () => {
      it("properly reduces transaction function and returns the correct fields", () => {
        expect(constructTransactionArr(transactionsTest, [{}])[0], [
          {
            transaction_id: "xMRXVBvwqycvaKwJKxgACBBaqExPk5FMAPVLX",
            category: "Travel",
            _id: "6199f907c3f0e5d878a38fe8",
            notes: "Yay notes work!",
          },
        ]).to.have.property("account_id");
      });
    });
  });
  describe("testing set transaction category function", () => {
    describe("testing set transaction category function with no banks", () => {
      it("reads function response and returns nothing", () => {
        expect(
          setTransactionCategoryInDatabase("aa", "ss", "dd") === undefined
        );
      });
    });
  });

  describe("testing set transaction notes function", () => {
    describe("testing set transaction notes function with no banks", () => {
      it("reads function response and returns nothing", () => {
        expect(setTransactionNotesInDatabase("aa", "ss", "dd") === undefined);
      });
    });
  });
  describe("testing post route on /api/register", () => {
    it("fails to register user due to empty input, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "",
          password: "",
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    it("fails to register user due to invalid password length, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "jennifer-unit-test@gmail",
          password: "hh",
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    it("successfully register user and returns a 201 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "jennifer-unit-test@gmail",
          password: "jennifer",
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          cb();
        });
    });
    it("fails to register user due to user already exists, returns a 409 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "jennifer-unit-test@gmail",
          password: "jennifer",
        })
        .end(function (err, res) {
          expect(res).to.have.status(409);
          cb();
        });
    });
    // remove mock user from the database
    after(async () => {
      await UserModel.deleteOne({ email: "jennifer-unit-test@gmail" });
    });
  });
  describe("testing post route on /api/login", () => {
    it("fails to log in user due to empty input, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: "",
          password: "",
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    it("fails to log in user due to user nonexistence, returns a 404 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: "jennifer-unit-test@gmail.com",
          password: "jennifer",
        })
        .end(function (err, res) {
          expect(res).to.have.status(404);
          cb();
        });
    });
    it("fails to log in user due to invalid credentials, returns a 401 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: "alan@gmail.com",
          password: "jennifer",
        })
        .end(function (err, res) {
          expect(res).to.have.status(401);
          cb();
        });
    });
    it("successfully log in user, returns a 200 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: "alan@gmail.com",
          password: "test123",
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
  });
});
