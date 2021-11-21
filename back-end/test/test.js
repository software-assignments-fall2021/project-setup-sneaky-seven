const chai = require("chai");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const expect = chai.expect;
const path = require("path");
require("mocha-sinon");
const constructAccountsArr = require("../functions/constructAccountsArray");
const constructTransactionArr = require("../functions/constructTransactionArray");
const UserModel = require("../model/user");
Object.assign(global, require(path.join(__dirname, "../app.js")));

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
        expect(constructTransactionArr([], [])).to.deep.equal([]);
      });
    });
    describe("testing constructTransactions with one bank", () => {
      it("properly reduces transaction function and returns the correct fields", () => {
        expect(constructTransactionArr([{}], [{}])[0]).to.have.property(
          "account_id"
        );
      });
    });
  });
  describe("testing post route on /api/register", () => {
    // test on empty strings in req body 
    it("fails to register user due to empty input, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: '',
          password: ''
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    // test on invalid password 
    it("fails to register user due to invalid password length, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: 'jennifer-unit-test@gmail',
          password: 'hh'
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    // test on successful registration  
    it("successfully register user and returns a 201 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: 'jennifer-unit-test@gmail',
          password: 'jennifer'
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          cb();
        });
    });
    // test on the scenario user already registered   
    it("fails to register user due to user already exists, returns a 409 status", function (cb) {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: 'jennifer-unit-test@gmail',
          password: 'jennifer'
        })
        .end(function (err, res) {
          expect(res).to.have.status(409);
          cb();
        });
    });
    // remove mock user from the database 
    after(async () => {
      await UserModel.deleteOne({ email: 'jennifer-unit-test@gmail' });
    })
  });
  describe("testing post route on /api/login", () => {
    // test on empty strings in req body 
    it("fails to log in user due to empty input, returns a 400 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: '',
          password: ''
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          cb();
        });
    });
    // test on user nonexistence
    it("fails to log in user due to user nonexistence, returns a 404 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: 'jennifer-unit-test@gmail.com',
          password: 'jennifer'
        })
        .end(function (err, res) {
          expect(res).to.have.status(404);
          cb();
        });
    });
    // test on invalid credentials 
    it("fails to log in user due to invalid credentials, returns a 401 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: 'alan@gmail.com',
          password: 'jennifer'
        })
        .end(function (err, res) {
          expect(res).to.have.status(401);
          cb();
        });
    });
    // test on invalid credentials 
    it("successfully log in user, returns a 200 status", function (cb) {
      chai
        .request(app)
        .post("/api/login")
        .send({
          email: 'alan@gmail.com',
          password: 'test123'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          cb();
        });
    });
  });
});
