const telegramApi = require("node-telegram-bot-api");
const token = "7474353462:AAEM60QkUrcP42F6JX_cEMsDfUa-aq8UJHg";

const bot = new telegramApi(token, { polling: true });

const { againOptions, startGame } = require("./options");

const chats = {};

bot.setMyCommands([
  { command: "/start", description: "Just hi" },
  { command: "/info", description: "Your name info" },
  { command: "/game", description: "Guess the number!" },
]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await bot.sendSticker(
      chatId,
      "https://data.chpic.su/stickers/k/kisshi_by_fStikBot/kisshi_by_fStikBot_010.webp"
    );
    return bot.sendMessage(chatId, `Hi: ${text}`);
  } else if (text === "/info") {
    return bot.sendMessage(chatId, `Your name is: ${msg.from.first_name}`);
  } else if (text === "/game") {
    return startGame(chatId, bot, chats);
  } else {
    return bot.sendMessage(chatId, `Wrong command, I'm not an AI.`);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatIdInButton = msg.message.chat.id;

  if (data === "/again") {
    return startGame(chatIdInButton, bot, chats);
  }

  if (data == chats[chatIdInButton]) {
    return bot.sendMessage(
      chatIdInButton,
      `You guessed the number: ${chats[chatIdInButton]}!!!`,
      againOptions
    );
  } else {
    return bot.sendMessage(
      chatIdInButton,
      `Not even close. It was: ${chats[chatIdInButton]}`,
      againOptions
    );
  }
});
