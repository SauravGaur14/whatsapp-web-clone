WhatsApp Web Clone
WhatsApp Web Clone is a full-stack web application developed to mimic the core functionality of WhatsApp web. It utilizes the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Socket.IO for real-time communication and WebRTC for video and voice calling.

Features
Real-time Chat: Users can send and receive text messages in real-time, similar to WhatsApp.

Online/Offline Status: Users can see the online and offline status of other users.

Voice Call: Allows users to make voice calls with other users.

Video Call: Enables users to make video calls using WebRTC technology with support from Socket.IO.

Media Messages: Supports sending media files such as images and videos alongside text messages.

Technology Stack
Front-end: React.js, Tailwind CSS
Back-end: Node.js, Express.js
Database: MongoDB
Real-time Communication: Socket.IO
WebRTC: Used for real-time audio and video communication, facilitated by Socket.IO for signaling.
Architecture
The project follows a client-server architecture:

Client Side (whatsapp-client):

Developed using React.js for a responsive user interface.
Tailwind CSS is used for styling to ensure a modern and sleek design.
Integrates Socket.IO client-side for real-time chat and WebRTC for video and voice calling.

Server Side (whatsapp-server):

Built on Node.js and Express.js to handle backend logic and API requests.
MongoDB is used as the database to store user information, chat messages, and media files.
Utilizes Socket.IO server-side to manage real-time communication between clients.
Implements WebRTC with Socket.IO to facilitate peer-to-peer audio and video calls.

Contributions to the project are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.
