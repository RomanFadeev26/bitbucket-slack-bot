#!/usr/bin/env node

import Alfred from "./Alfred";

const AlfredBot = new Alfred();

const halfHour: number = 1000 * 60 * 30;

AlfredBot.run();

setInterval(AlfredBot.run, halfHour);
