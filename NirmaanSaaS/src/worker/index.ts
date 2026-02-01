import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// ===== Budget APIs =====
app.get("/api/budget", async (c) => {
  const db = c.env.DB;
  
  const budgetResult = await db.prepare("SELECT * FROM project_budget ORDER BY id DESC LIMIT 1").first();
  const expensesResult = await db.prepare("SELECT SUM(amount) as total FROM expenses").first();
  
  const totalBudget = Number(budgetResult?.total_budget) || 0;
  const totalExpenses = Number(expensesResult?.total) || 0;
  
  return c.json({
    totalBudget,
    totalExpenses,
    remainingBudget: totalBudget - totalExpenses
  });
});

app.put("/api/budget", zValidator("json", z.object({
  totalBudget: z.number().positive()
})), async (c) => {
  const db = c.env.DB;
  const { totalBudget } = c.req.valid("json");
  
  await db.prepare("UPDATE project_budget SET total_budget = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1")
    .bind(totalBudget)
    .run();
  
  return c.json({ success: true });
});

// ===== Labour APIs =====
app.get("/api/labour", async (c) => {
  const db = c.env.DB;
  const result = await db.prepare("SELECT * FROM labour ORDER BY name").all();
  
  return c.json(result.results);
});

app.post("/api/labour", zValidator("json", z.object({
  name: z.string().min(1),
  dailyWage: z.number().positive()
})), async (c) => {
  const db = c.env.DB;
  const { name, dailyWage } = c.req.valid("json");
  
  const result = await db.prepare(
    "INSERT INTO labour (name, daily_wage, is_present, total_pay) VALUES (?, ?, 1, 0)"
  )
    .bind(name, dailyWage)
    .run();
  
  return c.json({ id: result.meta.last_row_id, success: true });
});

app.put("/api/labour/:id/attendance", zValidator("json", z.object({
  isPresent: z.boolean()
})), async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const { isPresent } = c.req.valid("json");
  
  await db.prepare("UPDATE labour SET is_present = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(isPresent ? 1 : 0, id)
    .run();
  
  return c.json({ success: true });
});

app.put("/api/labour/:id/total-pay", zValidator("json", z.object({
  totalPay: z.number().nonnegative()
})), async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const { totalPay } = c.req.valid("json");
  
  await db.prepare("UPDATE labour SET total_pay = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(totalPay, id)
    .run();
  
  return c.json({ success: true });
});

app.delete("/api/labour/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  
  await db.prepare("DELETE FROM labour WHERE id = ?").bind(id).run();
  
  return c.json({ success: true });
});

// ===== Expense APIs =====
app.get("/api/expenses", async (c) => {
  const db = c.env.DB;
  const result = await db.prepare("SELECT * FROM expenses ORDER BY expense_date DESC").all();
  
  return c.json(result.results);
});

app.post("/api/expenses", zValidator("json", z.object({
  category: z.string().min(1),
  amount: z.number().positive(),
  date: z.string()
})), async (c) => {
  const db = c.env.DB;
  const { category, amount, date } = c.req.valid("json");
  
  const result = await db.prepare(
    "INSERT INTO expenses (category, amount, expense_date) VALUES (?, ?, ?)"
  )
    .bind(category, amount, date)
    .run();
  
  return c.json({ id: result.meta.last_row_id, success: true });
});

app.delete("/api/expenses/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  
  await db.prepare("DELETE FROM expenses WHERE id = ?").bind(id).run();
  
  return c.json({ success: true });
});

export default app;