-- Top customers by revenue in the last quarter
SELECT
    c.id,
    c.name,
    COUNT(o.id) AS order_count,
    SUM(o.total_cents) / 100.0 AS revenue
FROM customers AS c
INNER JOIN orders AS o ON o.customer_id = c.id
WHERE o.created_at >= '2026-07-01'
    AND o.status <> 'cancelled'
GROUP BY c.id, c.name
HAVING COUNT(o.id) > 3
ORDER BY revenue DESC
LIMIT 25;

UPDATE customers SET loyalty_tier = 'gold' WHERE id IN (1, 2, 3);
