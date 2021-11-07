const chai = require("chai");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const expect = chai.expect;
const path = require("path");
require("mocha-sinon");
Object.assign(global, require(path.join(__dirname, "../app.js")));

describe("testing routes", () => {
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
          expect(res.body.map(c => c.name)).to.include.members(["Bank Fees"]);
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
});

describe("testing printing/debugging functions", () => {
  beforeEach(function () {
    this.sinon.stub(console, "log");
  });

  describe("testing prettyPrintResponse function", () => {
    it("reads api response and prints out relevant data information", () => {
      const fakeData = { data: "important data", status: 200, language: "en" };
      prettyPrintResponse(fakeData);
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith("important data")).to.be.true;
    });
  });

  describe("testing formatError function", () => {
    it("reads api response and prints out relevant error information", () => {
      const fakeData = { data: "important data", status: 500, language: "en" };
      expect(formatError(fakeData)).to.have.property("error");
      expect(formatError(fakeData).error).to.have.property("status_code");
    });
  });
});
