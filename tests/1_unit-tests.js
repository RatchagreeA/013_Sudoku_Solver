const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
import { puzzlesAndSolutions } from "../controllers/puzzle-strings";
let solver = new Solver();

suite("Unit Tests", () => {
  test("1: Logic handles a valid puzzle string of 81 characters", function (done) {
    let input = puzzlesAndSolutions[0][0];
    let expect = puzzlesAndSolutions[0][1];
    assert.equal(solver.solve(input), expect);
    done();
  });
  test("2: Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
    let input =
      "ab5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let expect = false;
    assert.equal(solver.solve(input), expect);
    done();
  });
  test("3: Logic handles a puzzle string that is not 81 characters in length", function (done) {
    let input = "9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let expect = false;
    assert.equal(solver.solve(input), expect);
    done();
  });
  test("4: Logic handles a valid row placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "A";
    let column = "2";
    let value = "3";
    let expect = true;
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("5: Logic handles an invalid row placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "A";
    let column = "1";
    let value = "3";
    let expect = false;
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("6: Logic handles a valid column placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "9";
    let expect = true;
    assert.equal(
      solver.checkColPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("7: Logic handles an invalid column placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "4";
    let expect = false;
    assert.equal(
      solver.checkColPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("8: Logic handles a valid region (3x3 grid) placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "4";
    let expect = true;
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("9: Logic handles an invalid region (3x3 grid) placement", function (done) {
    let puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = "B";
    let column = "1";
    let value = "1";
    let expect = false;
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      expect
    );
    done();
  });
  test("10: Valid puzzle strings pass the solver", function (done) {
    let input = puzzlesAndSolutions[1][0];
    let expect = puzzlesAndSolutions[1][1];
    assert.equal(solver.solve(input), expect);
    done();
  });
  test("11: Invalid puzzle strings fail the solver", function (done) {
    let input = "1234abcd";
    let expect = false;
    assert.equal(solver.solve(input), expect);
    done();
  });
  test("12: Solver returns the expected solution for an incomplete puzzle", function (done) {
    let input = puzzlesAndSolutions[2][0];
    let expect = puzzlesAndSolutions[2][1];
    assert.equal(solver.solve(input), expect);
    done();
  });
});
