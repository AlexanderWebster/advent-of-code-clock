import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { clone, defaults } from "lodash-es";

const EMPTY_BLOCK = [[], [], [], [], [], [], []];

/* 
Each 2d-array is a seven segment display "panel" made to match the clock 
as described by 2021's Advent of Code Day 08 problem. 
*/ 
const buildPanels = (SPC, DEG, DOT, ZER, ONE, TWO, THR, FOU, FIV, SIX) => {
  return {
    ":": [
      [SPC, SPC, SPC],
      [SPC, SPC, SPC],
      [SPC, DEG, SPC],
      [SPC, SPC, SPC],
      [SPC, DEG, SPC],
      [SPC, SPC, SPC],
      [SPC, SPC, SPC],
    ],
    0: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [SPC, DOT, DOT, DOT, DOT, SPC],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    1: [
      [SPC, DOT, DOT, DOT, DOT, SPC],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [SPC, DOT, DOT, DOT, DOT, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, DOT, DOT, DOT, DOT, SPC],
    ],
    2: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [SPC, THR, THR, THR, THR, SPC],
      [FOU, SPC, SPC, SPC, SPC, DOT],
      [FOU, SPC, SPC, SPC, SPC, DOT],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    3: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [SPC, THR, THR, THR, THR, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    4: [
      [SPC, DOT, DOT, DOT, DOT, SPC],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [SPC, THR, THR, THR, THR, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, DOT, DOT, DOT, DOT, SPC],
    ],
    5: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [ONE, SPC, SPC, SPC, SPC, DOT],
      [ONE, SPC, SPC, SPC, SPC, DOT],
      [SPC, THR, THR, THR, THR, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    6: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [ONE, SPC, SPC, SPC, SPC, DOT],
      [ONE, SPC, SPC, SPC, SPC, DOT],
      [SPC, THR, THR, THR, THR, SPC],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    7: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [DOT, SPC, SPC, SPC, SPC, TWO],
      [SPC, DOT, DOT, DOT, DOT, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, DOT, DOT, DOT, DOT, SPC],
    ],
    8: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [SPC, THR, THR, THR, THR, SPC],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [FOU, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
    9: [
      [SPC, ZER, ZER, ZER, ZER, SPC],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [ONE, SPC, SPC, SPC, SPC, TWO],
      [SPC, THR, THR, THR, THR, SPC],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [DOT, SPC, SPC, SPC, SPC, FIV],
      [SPC, SIX, SIX, SIX, SIX, SPC],
    ],
  };
};

const KUB = "█";

let DEG = "°";
let SPC = " ";
let DOT = ".";
let ZER = "a";
let ONE = "b";
let TWO = "c";
let THR = "d";
let FOU = "e";
let FIV = "f";
let SIX = "g";

let panels = buildPanels(SPC, DEG, DOT, ZER, ONE, TWO, THR, FOU, FIV, SIX);

const getPanels = () => {
  return panels;
};

const getPanel = (char) => {
  return getPanels()[char.toUpperCase()];
};

// Styling

const COLOR_DEFAULTS = {
  dot: "grey",
  segment: "red",
};

let dotColor = COLOR_DEFAULTS.dot;
let segmentColor = COLOR_DEFAULTS.segment;

const setDefaults = (options, defaultz) =>
  defaults({}, clone(options), defaultz);

const setColors = (options) => {
  options = setDefaults(options, COLOR_DEFAULTS);

  dotColor = options.dot;
  segmentColor = options.segment;

  SPC = SPC;
  DEG = chalk[dotColor](DEG);
  DOT = chalk[dotColor](DOT);
  ZER = chalk[segmentColor](ZER);
  ONE = chalk[segmentColor](ONE);
  TWO = chalk[segmentColor](TWO);
  THR = chalk[segmentColor](THR);
  FOU = chalk[segmentColor](FOU);
  FIV = chalk[segmentColor](FIV);
  SIX = chalk[segmentColor](SIX);

  panels = buildPanels(SPC, DEG, DOT, ZER, ONE, TWO, THR, FOU, FIV, SIX);
};

const setKubrickStyle = () => {
  SPC = SPC;
  DEG = chalk[dotColor](DEG);
  DOT = chalk[dotColor](DOT);
  ZER = chalk[segmentColor](KUB);
  ONE = chalk[segmentColor](KUB);
  TWO = chalk[segmentColor](KUB);
  THR = chalk[segmentColor](KUB);
  FOU = chalk[segmentColor](KUB);
  FIV = chalk[segmentColor](KUB);
  SIX = chalk[segmentColor](KUB);

  panels = buildPanels(SPC, DEG, DOT, ZER, ONE, TWO, THR, FOU, FIV, SIX);
};

// Panel -> Block -> String converters

const concatBlock = (block1, block2) => {
  let result = [...block1];

  for (let i = 0; i < block2.length; ++i) {
    result[i] = result[i].concat([SPC]).concat(block2[i]);
  }

  return result;
};

const toBlock = (str) => {
  let result = getPanel(str.charAt(0));

  for (let i = 1; i < str.length; ++i) {
    result = concatBlock(result, getPanel(str.charAt(i)));
  }

  return result;
};

const toString = (block) =>
  block.reduce((acc, line) => acc.concat([line.join("")]), []).join("\n");

const toBlockString = (str) => toString(toBlock(str));

// Segment character randomization

// https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
const shuffleArray = (arr) => {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const shuffleSegmentChars = () => {
  const shuffled = shuffleArray(getCurrentDigits());

  ZER = chalk[segmentColor](shuffled[0]);
  ONE = chalk[segmentColor](shuffled[1]);
  TWO = chalk[segmentColor](shuffled[2]);
  THR = chalk[segmentColor](shuffled[3]);
  FOU = chalk[segmentColor](shuffled[4]);
  FIV = chalk[segmentColor](shuffled[5]);
  SIX = chalk[segmentColor](shuffled[6]);

  panels = buildPanels(SPC, DEG, DOT, ZER, ONE, TWO, THR, FOU, FIV, SIX);
}

const getCurrentDigits = () => {
  return [
    stripAnsi(ZER),
    stripAnsi(ONE),
    stripAnsi(TWO),
    stripAnsi(THR),
    stripAnsi(FOU),
    stripAnsi(FIV),
    stripAnsi(SIX),
  ];
};

export { toBlockString, shuffleSegmentChars, setColors, setKubrickStyle };
