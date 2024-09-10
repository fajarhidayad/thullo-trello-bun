import env from './env';
import app from './server';

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
