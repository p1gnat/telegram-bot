const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: 1, callback_data: "1" },
        { text: 2, callback_data: "2" },
        { text: 3, callback_data: "3" },
      ],
      [
        { text: 4, callback_data: "4" },
        { text: 5, callback_data: "5" },
        { text: 6, callback_data: "6" },
      ],
      [
        { text: 7, callback_data: "7" },
        { text: 8, callback_data: "8" },
        { text: 9, callback_data: "9" },
      ],

      [{ text: 0, callback_data: "0" }],
    ],
  }),
};

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Play again", callback_data: "/again" }]],
  }),
};

const startGame = async (chatId, bot, chats) => {
  await bot.sendMessage(
    chatId,
    `Now you have to guess what number am I thinking of from 0 to 9`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  return await bot.sendMessage(chatId, "Guess the number!", gameOptions);
};
module.exports = { againOptions, startGame };
