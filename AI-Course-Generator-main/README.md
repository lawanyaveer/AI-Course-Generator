# AI Course Generator 🚀

An intelligent platform that leverages AI to generate comprehensive programming course content, including chapters, quizzes, and interactive learning materials.

## 🌟 Features

- **AI-Powered Content Generation**: Automatically creates structured course content
- **Interactive Course Builder**: Visual interface for course creation and management
- **Multiple Programming Languages**: Supports various tech stacks including:
  - Python
  - JavaScript
  - HTML/CSS
  - React
  - Angular
  - Vue.js
  - Node.js
  - Java
  - PHP
  - And more...
- **Quiz Generation**: Automated quiz creation for each chapter
- **Responsive Design**: Works seamlessly across all devices
- **Professional UI**: Clean and modern interface with tech-specific styling

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Hero Icons
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Google Gemini AI API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Manaslohe/ai-course-generator.git
cd ai-course-generator
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables

Frontend (.env):
```properties
VITE_API_URL=http://localhost:4000/api/v1
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Backend (.env):
```properties
PORT=4000
MONGODB_URI=your_mongodb_uri
```

4. Start the application
```bash
# Start backend server
cd server
npm start

# Start frontend development server
cd client
npm run dev
```

## 📸 Screenshots

[Add screenshots of your application here]

## 🌐 API Endpoints

### Courses
- `POST /api/v1/create-course` - Create a new course
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:courseId` - Get course by ID
- `PUT /api/v1/courses/:courseId` - Update course
- `DELETE /api/v1/courses/:courseId` - Delete course

### Chapters
- `POST /api/v1/course/:courseId/create-chapter` - Create chapter
- `GET /api/v1/chapter/:chapterId` - Get chapter
- `PUT /api/v1/chapter/:chapterId` - Update chapter
- `DELETE /api/v1/chapter/:chapterId` - Delete chapter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Google Gemini AI for content generation
- MongoDB for database
- React and Node.js communities
- All contributors who help improve this project

## 📧 Contact

Your Name - [@manas-lohe](https://www.linkedin.com/in/manas-lohe-974348220/)

Project Link: [https://github.com/Manaslohe/AI-Course-Generator](https://github.com/Manaslohe/AI-Course-Generator)