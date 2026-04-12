import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Hard-coded credentials
const USERS = [
  { username: 'student_free', password: 'free123', role: 'student', tier: 'free', name: 'Student (Free)' },
  { username: 'student_paid', password: 'paid123', role: 'student', tier: 'paid', name: 'Student (Paid)' },
  { username: 'teacher_ace', password: 'teacher123', role: 'teacher', tier: 'premium', name: 'Prof. Ace' },
  { username: 'recruiter_hr', password: 'hr123', role: 'company', tier: 'premium', name: 'HR Recruiter' },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    // In a real app, we'd sign a JWT here. For a prototype, we'll return the user object + dummy token.
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      token: `dummy-token-${user.role}-${Date.now()}`
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
