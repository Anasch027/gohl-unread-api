import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/unread-count", async (req, res) => {
  const { locationId } = req.query;
  if (!locationId)
    return res.status(400).json({ error: "Missing locationId" });

  try {
    const r = await fetch(
      `https://services.leadconnectorhq.com/conversations/unread/count?locationId=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_AGENCY_API_KEY}`,
          Accept: "application/json",
          Version: "2021-07-28"
        }
      }
    );

    const data = await r.json();
    res.json({ count: data.count || 0, raw: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
