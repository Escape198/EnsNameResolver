import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const provider = new ethers.InfuraProvider('mainnet', 'YOUR_INFURA_PROJECT_ID');

// Resolve ENS name -> Address
app.get('/resolve/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const address = await provider.resolveName(name);
    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: 'Unable to resolve name' });
  }
});

// Lookup Address -> ENS name
app.get('/lookup/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const name = await provider.lookupAddress(address);
    res.json({ name });
  } catch (error) {
    res.status(500).json({ error: 'Unable to lookup address' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
