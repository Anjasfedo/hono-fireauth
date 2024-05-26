import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { auth } from './configs/firebase'

const app = new Hono()


app.use('/api/*', bearerAuth({
    verifyToken: async (token, c) => {
    try {
      await auth.verifyIdToken(token);
      
      return true;
    } catch (error) {
      return false;
    }
    },
  }))

app.get('/api/page', (c) => {
  return c.json({ message: 'You are authorized' })
})

export default app
