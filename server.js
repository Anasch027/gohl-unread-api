import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/unread-count", async (req, res) => {
  const { locationId } = req.query;
  if (!locationId) return res.status(400).json({ error: "Missing locationId" });

  try {
    const r = await fetch(`https://services.leadconnectorhq.com/conversations/unread/count?locationId=${locationId}`, {
      headers: {
        Authorization: `Bearer ${process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X2lkIjoiM1VSR3E0cWdqZm4xRzRaM1kyeDIiLCJ2ZXJzaW9uIjoxLCJpYXQiOjE3NjEyNTg3NTQyNDYsInN1YiI6IkVGTjBmOW5OalVkT0ttRTBHamszIn0.PRvyzUIQ-eMFuIuvA2cmIuBfYln_q9afVR2cE7JH1Yo}`,
        Accept: "application/json",
        Version: "2021-07-28"
      }
    });
    const data = await r.json();
    res.json({ count: data.count || 0, raw: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(process.env.PORT || 3000);
