# WhatsApp Forwarding Bot

A simple WhatsApp bot that listens for incoming messages (text and media) and forwards them to a specified WhatsApp group.

---

## Features

- Session persistence with `LocalAuth` (no need to scan QR every time).
- Automatically forwards incoming text and media messages.
- Forwards messages to a WhatsApp group by its name.
- Supports forwarding media with captions.

---

## Requirements

- Node.js (v16 or higher recommended)
- WhatsApp account on your phone
- WhatsApp group where the bot will forward messages

---

## Installation

1. Clone the repository or copy the bot code into your project folder.

2. Install the required dependencies using npm.

3. Create a WhatsApp group and add the phone number you will use for the bot.

4. Update the group name in the bot code configuration.

---

## Usage

1. Run the bot application.

2. Scan the QR code displayed in your terminal using your WhatsApp mobile app.

3. Once the bot is ready, it will forward any incoming messages or media it receives to the specified WhatsApp group.

---

## License

This project is licensed under the MIT License.
