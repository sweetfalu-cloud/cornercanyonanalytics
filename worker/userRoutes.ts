import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    app.post('/api/contact', async (c) => {
        try {
            const body = await c.req.json();
            // Basic validation
            if (!body.name || !body.email || !body.message) {
                return c.json({ 
                    success: false, 
                    error: 'Missing required fields' 
                }, 400);
            }
            // Simulate processing delay (e.g., sending email or storing in DB)
            await new Promise(resolve => setTimeout(resolve, 800));
            console.log('[LEAD RECEIVED]', body);
            return c.json({ 
                success: true, 
                message: 'Contact request received successfully' 
            }, 200);
        } catch (error) {
            console.error('[API ERROR] Contact form failed:', error);
            return c.json({ 
                success: false, 
                error: 'Internal server error' 
            }, 500);
        }
    });
}