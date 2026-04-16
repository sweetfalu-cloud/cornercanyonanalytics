import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Send, 
  ChevronRight, 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
const contactSchema = z.object({
  // Section 1: Contact
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().min(2, 'Organization name is required'),
  role: z.string().min(2, 'Role/Title is required'),
  phone: z.string().optional(),
  website: z.string().optional(),
  // Section 2: About Org
  orgType: z.enum(['Small business', 'Nonprofit', 'Both/Hybrid', 'Not sure']),
  orgSize: z.enum(['1-5', '6-20', '21-50', '50+']),
  mission: z.string().min(2, 'Please describe your industry or mission'),
  // Section 3: Needs
  needs: z.array(z.string()).min(1, 'Please select at least one area of help'),
  // Section 4: Current Data
  dataStack: z.array(z.string()).min(1, 'Please select at least one source'),
  // Section 5: Challenge
  challenge: z.string().min(10, 'Please provide a bit more detail (min 10 chars)'),
  // Section 6: Context
  timing: z.enum(['Just exploring', '1-3 months', 'Upcoming deadline']),
  users: z.array(z.string()).min(1, 'Please select who will use the insights'),
  // Section 7: Scheduling
  preferredDate: z.date({ required_error: "Please select a date" }),
  preferredTime: z.string().min(1, 'Please select a time'),
  timezone: z.string().min(1, 'Please select a timezone'),
  // Section 8: Final Note
  finalNote: z.string().optional(),
});
type ContactFormValues = z.infer<typeof contactSchema>;
const STEPS = [
  { id: 'intro', title: 'Start' },
  { id: 'contact', title: 'Contact' },
  { id: 'about', title: 'Organization' },
  { id: 'needs', title: 'Needs' },
  { id: 'data', title: 'Data' },
  { id: 'challenge', title: 'Challenge' },
  { id: 'context', title: 'Context' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'final', title: 'Finish' },
];
export function Contact() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      role: '',
      phone: '',
      website: '',
      orgType: 'Not sure',
      orgSize: '1-5',
      mission: '',
      needs: [],
      dataStack: [],
      challenge: '',
      timing: 'Just exploring',
      users: [],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      preferredTime: '',
      finalNote: '',
    },
    mode: 'onChange',
  });
  const nextStep = async () => {
    // Validate current section before moving
    const fieldsByStep: (keyof ContactFormValues)[][] = [
      [], // Intro
      ['name', 'email', 'organization', 'role'], // Contact
      ['orgType', 'orgSize', 'mission'], // About
      ['needs'], // Needs
      ['dataStack'], // Data
      ['challenge'], // Challenge
      ['timing', 'users'], // Context
      ['preferredDate', 'preferredTime', 'timezone'], // Schedule
      ['finalNote'], // Final
    ];
    const currentFields = fieldsByStep[step];
    if (currentFields.length > 0) {
      const isValid = await form.trigger(currentFields);
      if (!isValid) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Submission failed');
      toast.success('Consultation Request Received!', {
        description: "Thank you for the detailed information. I'll review your responses and come prepared for our call.",
      });
      form.reset();
      setStep(0);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Submission Failed', {
        description: 'Please try again or email us directly at info@cornercanyon.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const progress = (step / (STEPS.length - 1)) * 100;
  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Step {step} of {STEPS.length - 1}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-canyon-600" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <div className="bg-background rounded-3xl p-6 md:p-12 shadow-xl border relative overflow-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {/* STEP 0: INTRO */}
                {step === 0 && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-foreground">Free Consultation Request Form</h2>
                      <p className="text-lg text-muted-foreground">
                        Corner Canyon Analytics is dedicated to empowering purpose-driven teams. This complimentary consultation helps us understand your needs and see if we’re a good fit.
                      </p>
                      <div className="bg-canyon-50 dark:bg-canyon-950/30 border border-canyon-100 dark:border-canyon-900 p-4 rounded-xl flex gap-3 items-start">
                        <Info className="h-5 w-5 text-canyon-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-canyon-800 dark:text-canyon-300">
                          <strong>No preparation required.</strong> We'll walk through your current setup together. This form takes about 3-5 minutes.
                        </p>
                      </div>
                    </div>
                    <Button type="button" onClick={nextStep} className="w-full h-12 text-lg bg-canyon-600 hover:bg-canyon-700">
                      Begin Request <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
                {/* STEP 1: CONTACT */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input placeholder="jane@org.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem><FormLabel>Organization Name *</FormLabel><FormControl><Input placeholder="Acme Inc." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem><FormLabel>Role / Title *</FormLabel><FormControl><Input placeholder="Executive Director" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="+1 (555) 000-0000" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem><FormLabel>Website (Optional)</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {/* STEP 2: ABOUT ORG */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">About Your Organization</h3>
                    <div className="space-y-6">
                      <FormField control={form.control} name="orgType" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Organization Type</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                              {['Small business', 'Nonprofit', 'Both/Hybrid', 'Not sure'].map(t => (
                                <FormItem key={t} className="flex items-center space-x-3 space-y-0 border p-3 rounded-lg cursor-pointer hover:bg-accent">
                                  <FormControl><RadioGroupItem value={t} /></FormControl>
                                  <FormLabel className="font-normal cursor-pointer w-full">{t}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="orgSize" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Team Size (Employees/Staff)</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4">
                              {['1-5', '6-20', '21-50', '50+'].map(s => (
                                <FormItem key={s} className="flex items-center space-x-3 space-y-0 border p-3 rounded-lg px-6">
                                  <FormControl><RadioGroupItem value={s} /></FormControl>
                                  <FormLabel className="font-normal">{s}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="mission" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Industry or Mission</FormLabel>
                          <FormControl><Input placeholder="e.g., Environmental conservation, Local retail..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {/* STEP 3: NEEDS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">What Would You Like Help With?</h3>
                    <p className="text-muted-foreground">Select all that apply.</p>
                    <FormField control={form.control} name="needs" render={() => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Creating/improving dashboards',
                          'Understanding financial performance',
                          'Measuring program/business impact',
                          'Grant/funder reporting',
                          'Organizing messy data',
                          'Marketing/growth insights',
                          'Ongoing support',
                          'Not sure'
                        ].map((item) => (
                          <FormField key={item} control={form.control} name="needs" render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent transition-colors">
                              <FormControl>
                                <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                  return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item))
                                }} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer leading-tight">{item}</FormLabel>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                    )} />
                    <FormMessage>{form.formState.errors.needs?.message}</FormMessage>
                  </motion.div>
                )}
                {/* STEP 4: DATA STACK */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Your Current Data</h3>
                    <p className="text-muted-foreground">Where does your organization's information live?</p>
                    <FormField control={form.control} name="dataStack" render={() => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Spreadsheets (Excel/Google Sheets)',
                          'Accounting software (e.g. QuickBooks)',
                          'Donor/customer system (CRM)',
                          'POS / e-commerce platform',
                          'Website/marketing analytics',
                          'Mix of different systems',
                          'Not sure'
                        ].map((item) => (
                          <FormField key={item} control={form.control} name="dataStack" render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent">
                              <FormControl>
                                <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                  return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item))
                                }} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer leading-tight">{item}</FormLabel>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                    )} />
                    <FormMessage>{form.formState.errors.dataStack?.message}</FormMessage>
                  </motion.div>
                )}
                {/* STEP 5: CHALLENGE */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Biggest Challenge Right Now?</h3>
                    <FormField control={form.control} name="challenge" render={({ field }) => (
                      <FormItem>
                        <FormDescription className="text-base mb-4">
                          What is the one thing about your data or reporting that keeps you up at night? (1-3 sentences)
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., It takes our team 10 hours every month to manually combine 5 spreadsheets just to see our basic revenue..." 
                            className="min-h-[180px] text-lg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {/* STEP 6: CONTEXT */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Timeline & Context</h3>
                    <div className="space-y-8">
                      <FormField control={form.control} name="timing" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>When are you looking to start?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {['Just exploring', '1-3 months', 'Upcoming deadline'].map(t => (
                                <FormItem key={t} className="flex items-center space-x-3 space-y-0 border p-4 rounded-xl cursor-pointer hover:bg-accent">
                                  <FormControl><RadioGroupItem value={t} /></FormControl>
                                  <FormLabel className="font-normal cursor-pointer">{t}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="users" render={() => (
                        <FormItem className="space-y-3">
                          <FormLabel>Who will be using these insights?</FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            {['Owner/Exec Dir', 'Leadership', 'Board', 'Program staff'].map(u => (
                              <FormField key={u} control={form.control} name="users" render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent">
                                  <FormControl>
                                    <Checkbox checked={field.value?.includes(u)} onCheckedChange={(checked) => {
                                      return checked ? field.onChange([...field.value, u]) : field.onChange(field.value?.filter((v) => v !== u))
                                    }} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">{u}</FormLabel>
                                </FormItem>
                              )} />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {/* STEP 7: SCHEDULING */}
                {step === 7 && (
                  <motion.div
                    key="step7"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Consultation Scheduling</h3>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-canyon-600" />
                      <span className="text-sm font-medium">Meeting length: 20-30 minutes</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="preferredDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal h-12", !field.value && "text-muted-foreground")}>
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar 
                                mode="single" 
                                selected={field.value} 
                                onSelect={field.onChange} 
                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6} 
                                initialFocus 
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="preferredTime" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time Window</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['Morning (9am - 12pm)', 'Afternoon (12pm - 3pm)', 'Late Afternoon (3pm - 5pm)'].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="timezone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Time Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="UTC">UTC / Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {/* STEP 8: FINAL NOTE */}
                {step === 8 && (
                  <motion.div
                    key="step8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold">Optional Final Note</h3>
                    <FormField control={form.control} name="finalNote" render={({ field }) => (
                      <FormItem>
                        <FormDescription className="text-base mb-4">
                          Anything else we should know before we meet?
                        </FormDescription>
                        <FormControl>
                          <Textarea placeholder="Specific questions, team members joining, etc..." className="min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="bg-canyon-50 dark:bg-canyon-950/30 p-6 rounded-2xl border border-canyon-100 dark:border-canyon-900">
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-canyon-600" />
                        Ready to submit?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        By submitting, you're requesting a 20-30 minute strategy call. I will review your responses manually to ensure we make the most of our time together.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Navigation Controls */}
              {step > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12" disabled={isSubmitting}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="flex-1 h-12 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900">
                      Next Step <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1 h-12 bg-canyon-600 hover:bg-canyon-700 text-white" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-5 w-5" /> Submit Request</>}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}