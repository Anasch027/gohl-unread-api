import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ GHL Unread Count API is live!");
});

app.get("/unread-count", async (req, res) => {
  const { locationId } = req.query;
  if (!locationId) return res.status(400).json({ error: "Missing locationId" });

  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/conversations/unread/count?locationId=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_AGENCY_API_KEY}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();
    return res.json({ count: data.count || 0 });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return res.status(500).json({ error: "Failed to fetch unread count" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
