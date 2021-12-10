import {
  toBlockString,
  shuffleSegmentChars,
  setColors,
  setKubrickStyle
} from "./src/block-renderer.js";
import { clock } from "./src/clock.js";
import chalk from "chalk";
import ansiEscapes from "ansi-escapes";
import { Command } from "commander";

const INTERRUPT = "SIGINT";

// Footer
const TAG = "ᵃᵒᶜ ᶜˡᵒᶜᵏ.²⁰²¹.ᵃ ʷᵉᵇˢᵗᵉʳ";
const FOOTER_SECONDS = "\n\n             ";
const FOOTER_MINUTES = "\n\n    ";

const program = new Command();
program
  .option("-f, --format <type>", `Display ${chalk.yellow('24')} or ${chalk.yellow('12')} hour format`, "24")   
  .option("-p, --precision <type>", `Display ${chalk.yellow('seconds')} or ${chalk.yellow('minutes')} precision`, "minutes")
  .option("-c, --color <type>", `Specify two Chalk.js colors for ${chalk.yellow('dots,digits')}`, "grey,red")
  .option("-k, --kubrick", `Display clock in ${chalk.yellow('kubrick')} style (reduced performance when -p 'seconds')`)
  .option("-r, --rand", "Randomizes the ascii chars assigned to each segment periodically", false);
program.parse(process.argv);

const options = program.opts();

// Set styling

const [dotColor, segmentColor] = options.color.split(",");
setColors({dot: dotColor, segment: segmentColor});

if (options.kubrick) {
  setKubrickStyle();
}

const FOOTER = options.precision == "minutes" ? chalk.grey(FOOTER_MINUTES + TAG) : chalk.grey(FOOTER_SECONDS + TAG);

// Handle ctrl+c interrupts
process.on(INTERRUPT, () => {
  process.stdout.write(ansiEscapes.eraseLines(9));
  process.stdout.write(ansiEscapes.cursorShow);
  process.exit();
});

// Render first frame
process.stdout.write(ansiEscapes.cursorHide);
process.stdout.write(ansiEscapes.eraseLines(4));

const time = clock({hourFormat: options.format, precision: options.precision});
process.stdout.write(toBlockString(time));
process.stdout.write(FOOTER);
let previousTime = time;

// Randomization set up for segment chars
let counter = options.rand ? 0 : Number.NEGATIVE_INFINITY;
let randInterval = 9;
const getRandInt = (min, max) => {
  min = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min); 
}

// Render continuously
setInterval(() => {
  const time = clock({hourFormat: options.format, precision: options.precision});

  if (time !== previousTime) {
    process.stdout.write(ansiEscapes.eraseLines(9));

    if(!options.kubrick) {
        if (counter > randInterval) {
          shuffleSegmentChars();
          counter = 0;
          randInterval = getRandInt(9, 20);
        } 

        process.stdout.write(toBlockString(time));
        ++counter;
    } else {
      process.stdout.write(toBlockString(time));
    }

    process.stdout.write(FOOTER);
  }
    
    previousTime = time;
}, 1000);
