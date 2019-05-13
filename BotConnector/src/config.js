require('dotenv').config();
const Telegraf = require('telegraf');
const log = require('./logger')(__filename);

const secret = process.env.SECRET;
if (!secret) {
  log.fatal('NO SECRET PROVIDED');
  process.exit(1);
}

module.exports = new Telegraf(process.env.SECRET);
