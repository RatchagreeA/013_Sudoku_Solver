const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
import { puzzlesAndSolutions } from "../controllers/puzzle-strings";

suite("Functional Tests", () => {
  suite("POST request to /api/solve", () => {
    test("1: Solve a puzzle with valid puzzle string", function (done) {
      let input = puzzlesAndSolutions[1][0];
      let expect = puzzlesAndSolutions[1][1];
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: input })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, expect);
        });
      done();
    });
    test("2: Solve a puzzle with missing puzzle string", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");
        });
      done();
    });
    test("3: Solve a puzzle with invalid characters", function (done) {
      let input =
        "ab5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: input })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
      done();
    });
    test("4: Solve a puzzle with incorrect length", function (done) {
      let input = "8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: input })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
      done();
    });
    test("5: Solve a puzzle that cannot be solved", function (done) {
      let input =
        "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: input })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
        });
      done();
    });
  });
  suite("POST request to /api/check", () => {
    test("6: Check a puzzle placement with all fields", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "3";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
        });
      done();
    });
    test("7: Check a puzzle placement with single placement conflict", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "8";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 1);
        });
      done();
    });
    test("8: Check a puzzle placement with multiple placement conflicts", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "6";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 2);
        });
      done();
    });
    test("9: Check a puzzle placement with all placement conflicts", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "2";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 3);
        });
      done();
    });
    test("10: Check a puzzle placement with missing required fields", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
        });
      done();
    });
    test("11: Check a puzzle placement with invalid characters", function (done) {
      let puzzle =
        "aa5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "6";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
      done();
    });
    test("12: Check a puzzle placement with incorrect length", function (done) {
      let puzzle = ".47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "6";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
      done();
    });
    test("13: Check a puzzle placement with invalid placement coordinate", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "Z2";
      let value = "3";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid coordinate");
        });
      done();
    });
    test("14: Check a puzzle placement with invalid placement value", function (done) {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let coordinate = "A2";
      let value = "A";
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value");
        });
      done();
    });
  });
});
