from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler

# 更新Token
TOKEN = "7247154710:AAEQjhntONlAgx1-tU5e7Gz_OiOC0C5nzB4"

def start(update: Update, context):
    keyboard = [
        [InlineKeyboardButton("打开小程序", web_app={"url": "https://t.me/pigtgbot/Pigtg"})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('点击按钮打开小程序:', reply_markup=reply_markup)

def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
