import { Router } from 'express'
import { signup, login, checkAuth, logout } from '../controllers/authController.js';
import passport from 'passport';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user.token;

    if (!token) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=token-missing`);
    }

    // ✅ Option 1: Set as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  }
);




router.get('/login-failure', (req, res) => {
  res.send('Login failed');
});
router.post('/logout', logout);
router.get('/check', isAuthenticated, checkAuth)

export default router;