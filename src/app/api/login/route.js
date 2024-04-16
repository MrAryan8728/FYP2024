import connect from "@/utils/db";
import bcryptjs from 'bcryptjs'; // Assuming a helper function to connect

export const POST = async(req, res) => {
  if (req.method !='POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email, password } = req.body;

  const client = await connect();
  const db = client.db();
  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}
