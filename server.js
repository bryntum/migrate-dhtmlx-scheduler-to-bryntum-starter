import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
import path from "path";

dotenv.config();
global.__dirname = path.resolve();

const port = process.env.PORT || 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function serverConfig() {
  app.get("/data", async (req, res) => {
    try {
      const results = await Promise.all([
        db.query("SELECT * FROM dhtmlx_scheduler_events"),
        db.query("SELECT * FROM dhtmlx_scheduler_resources"),
      ]);
      const events = results[0][0],
        resources = results[1][0];

      res.send({
        data: events,
        collections: { sections: resources },
      });
    } catch (error) {
      sendResponse(res, "error", null, error);
    }
  });

  // add a new event
  app.post("/data", async (req, res) => {
    const event = getEvent(req.body);
    try {
      const newEvent = await db.query(
        "INSERT INTO dhtmlx_scheduler_events(text, start_date, end_date, resource_id) VALUES (? , ?, ?, ?)",
        [event.text, event.start_date, event.end_date, event.resource_id]
      );
      sendResponse(res, "inserted", newEvent[0].insertId);
    } catch (error) {
      sendResponse(res, "error", null, error);
    }
  });

  // update a event
  app.put("/data/:id", async (req, res) => {
    const eventId = req.params.id;
    const event = getEvent(req.body);
    try {
      await db.query(
        "UPDATE dhtmlx_scheduler_events SET text = ?, start_date = ?, end_date = ?, resource_id = ? WHERE id = ?",
        [
          event.text,
          event.start_date,
          event.end_date,
          event.resource_id,
          eventId,
        ]
      );
      sendResponse(res, "updated");
    } catch (error) {
      sendResponse(res, "error", null, error);
    }
  });

  // delete an event
  app.delete("/data/:id", async (req, res) => {
    const eventId = req.params.id;
    try {
      await db.query("DELETE FROM dhtmlx_scheduler_events WHERE id = ?", [
        eventId,
      ]);
      sendResponse(res, "deleted");
    } catch (error) {
      sendResponse(res, "error", null, error);
    }
  });

  function getEvent(data) {
    return {
      text: data.text,
      start_date: data.start_date,
      end_date: data.end_date,
      resource_id: data.resource_id,
    };
  }

  function sendResponse(res, action, requestId, error) {
    if (action == "error") console.log(error);

    const result = {
      success: action === "error" ? false : true,
    };
    if (requestId) result.requestId = requestId;

    res.send(result);
    return;
  }
}

serverConfig();
