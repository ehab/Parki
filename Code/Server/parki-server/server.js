const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 10000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Parki API is running 🚗');
});

// Get all parking events
app.get('/parking', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "parkingLotEventsNV1" ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database fetch failed' });
  }
});

// Insert parking event (Arduino will POST here)
app.post('/parking-event', async (req, res) => {
  const {
    lotId,
    sensorId,
    status,
    statusWeight,
    statusS01,
    statusS01Weight,
    statusS02,
    statusS02Weight,
    statusS03,
    statusS03Weight,
    snapshot1Url,
    snapshot2Url,
    snapshot3Url,
    snapshotAiUrl,
    statusAccuracyPercent,
    statusS01AccuracyPercent,
    statusS02AccuracyPercent,
    statusS03AccuracyPercent
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO "parkingLotEventsNV1"
      ("lotId", "sensorId", status, "statusWeight", "statusS01", "statusS01Weight",
       "statusS02", "statusS02Weight", "statusS03", "statusS03Weight",
       "snapshot1Url", "snapshot2Url", "snapshot3Url", "snapshotAiUrl",
       "statusAccuracyPercent", "statusS01AccuracyPercent", "statusS02AccuracyPercent", "statusS03AccuracyPercent")
       VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       RETURNING *`,
      [
        lotId,
        sensorId,
        status,
        statusWeight,
        statusS01,
        statusS01Weight,
        statusS02,
        statusS02Weight,
        statusS03,
        statusS03Weight,
        snapshot1Url,
        snapshot2Url,
        snapshot3Url,
        snapshotAiUrl,
        statusAccuracyPercent,
        statusS01AccuracyPercent,
        statusS02AccuracyPercent,
        statusS03AccuracyPercent
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error saving data:', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});