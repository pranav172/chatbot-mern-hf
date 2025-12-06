# Chatbot MERN HF

A full-stack chatbot application built with the **MERN stack** (MongoDB, Express, React, Node.js) and powered by Hugging Face for conversational AI.

## Features

- Modern chatbot UI with React
- RESTful API with Node.js and Express
- Integration with Hugging Face models for conversational intelligence
- User authentication and session management
- Stores conversations in MongoDB
- Responsive design for desktop and mobile

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **AI/NLP:** Hugging Face API / Transformers
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** dotenv, axios, (add more as appropriate)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database (local or Atlas)
- Hugging Face API key (if using the Hugging Face inference API)

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/pranav172/chatbot-mern-hf.git
cd chatbot-mern-hf
```

**2. Install dependencies for the backend**

```bash
cd backend
npm install
```

**3. Create a `.env` file in `/backend`**

```
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
HF_API_KEY=your_huggingface_api_key
PORT=5000
```

**4. Start the backend server**

```bash
npm start
```
Or, if you want to use nodemon for dev:
```bash
npm run dev
```

**5. Install dependencies and start the frontend**

```bash
cd ../frontend
npm install
npm start
```

**6. Open your browser**

Go to [http://localhost:3000](http://localhost:3000) to view the chatbot frontend.

## API Endpoints

- `POST /api/auth/signup` – User signup
- `POST /api/auth/login` – User login
- `POST /api/chat` – Send message to chatbot (proxies to Hugging Face API)
- `GET /api/messages` – Get message history

## Configuration

- Store environment variables for the backend in `/backend/.env`
- Store front-end configuration (if needed) in `/frontend/.env`

## Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request

## License

MIT

---

*Built with ❤️ using MERN and Hugging Face*
