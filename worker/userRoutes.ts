import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Corner Canyon API Operational' }}));
    app.post('/api/contact', async (c) => {
        try {
            const body = await c.req.json();
            const timestamp = new Date().toISOString();
            const leadId = Math.random().toString(36).substring(2, 10).toUpperCase();
            // Required Lead Qualification Fields Validation
            const required = [
                'name', 
                'email', 
                'organization', 
                'role', 
                'orgType', 
                'mission', 
                'needs', 
                'challenge', 
                'preferredDate', 
                'orgSize', 
                'dataStack', 
                'timing', 
                'users', 
                'preferredTime', 
                'timezone'
            ];
            const missing = required.filter(field => {
                const val = body[field];
                if (Array.isArray(val)) {
                    return val.length === 0;
                }
                // Handle date string validation fallback
                if (field === 'preferredDate') {
                    return !val || isNaN(Date.parse(val));
                }
                return !val;
            });
            if (missing.length > 0) {
                console.warn(`[API WARNING] Lead ID ${leadId}: Missing or invalid fields:`, missing);
                return c.json({
                    success: false,
                    error: `Missing or invalid required fields: ${missing.join(', ')}`,
                    requestId: leadId
                }, 400);
            }
            // Simulate processing delay for lead scoring/logging (simulating async DB write)
            await new Promise(resolve => setTimeout(resolve, 800));
            // Log the structured lead for the analytics team
            console.log(`--- NEW CONSULTATION REQUEST [ID: ${leadId}] [TS: ${timestamp}] ---`);
            console.log(`Contact: ${body.name} (${body.role}) at ${body.organization}`);
            console.log(`Email: ${body.email} | Website: ${body.website || 'N/A'}`);
            console.log(`Org: ${body.orgType} | Size: ${body.orgSize} | Mission: ${body.mission}`);
            console.log(`Needs: ${Array.isArray(body.needs) ? body.needs.join(', ') : body.needs}`);
            console.log(`Data Stack: ${Array.isArray(body.dataStack) ? body.dataStack.join(', ') : body.dataStack}`);
            console.log(`Biggest Challenge: ${body.challenge}`);
            console.log(`Timeline: ${body.timing} | Users: ${Array.isArray(body.users) ? body.users.join(', ') : body.users}`);
            console.log(`Scheduling: ${body.preferredDate} at ${body.preferredTime} (${body.timezone})`);
            console.log(`Notes: ${body.finalNote || 'None'}`);
            console.log('------------------------------------------------------------');
            return c.json({
                success: true,
                message: 'Consultation request received and logged for review.',
                leadId: leadId
            }, 200);
        } catch (error) {
            console.error('[API ERROR] Consultation form processing failed:', error);
            return c.json({
                success: false,
                error: 'An unexpected server error occurred while processing your request. Please email info@cornercanyon.com if the issue persists.'
            }, 500);
        }
    });
}