import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    app.post('/api/contact', async (c) => {
        try {
            const body = await c.req.json();
            // Required Lead Qualification Fields Validation
            const required = ['name', 'email', 'organization', 'role', 'orgType', 'mission', 'needs', 'challenge', 'preferredDate'];
            const missing = required.filter(field => !body[field]);
            if (missing.length > 0) {
                console.warn('[API WARNING] Missing lead fields:', missing);
                return c.json({
                    success: false,
                    error: `Missing required consultation data: ${missing.join(', ')}`
                }, 400);
            }
            // Simulate processing delay for lead scoring/logging
            await new Promise(resolve => setTimeout(resolve, 1200));
            // Log the structured lead for the analytics team
            console.log('--- NEW CONSULTATION REQUEST ---');
            console.log(`Contact: ${body.name} (${body.role}) at ${body.organization}`);
            console.log(`Email: ${body.email} | Website: ${body.website || 'N/A'}`);
            console.log(`Org: ${body.orgType} | Size: ${body.orgSize} | Mission: ${body.mission}`);
            console.log(`Needs: ${Array.isArray(body.needs) ? body.needs.join(', ') : body.needs}`);
            console.log(`Data Stack: ${Array.isArray(body.dataStack) ? body.dataStack.join(', ') : body.dataStack}`);
            console.log(`Biggest Challenge: ${body.challenge}`);
            console.log(`Timeline: ${body.timing} | Users: ${Array.isArray(body.users) ? body.users.join(', ') : body.users}`);
            console.log(`Scheduling: ${body.preferredDate} at ${body.preferredTime} (${body.timezone})`);
            console.log(`Notes: ${body.finalNote || 'None'}`);
            console.log('---------------------------------');
            return c.json({
                success: true,
                message: 'Consultation request received and logged for review.'
            }, 200);
        } catch (error) {
            console.error('[API ERROR] Consultation form failed:', error);
            return c.json({
                success: false,
                error: 'Internal server error processing the request.'
            }, 500);
        }
    });
}