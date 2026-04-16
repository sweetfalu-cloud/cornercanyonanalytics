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
  Clock,
  Globe,
  Database,
  Users as UsersIcon,
  Target
} from 'lucide-react';
import { toast } from 'sonner';
import { format, startOfDay } from 'date-fns';
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
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().min(2, 'Organization name is required'),
  role: z.string().min(2, 'Role/Title is required'),
  phone: z.string().optional(),
  website: z.string().optional(),
  orgType: z.enum(['Small business', 'Nonprofit', 'Both/Hybrid', 'Not sure']),
  orgSize: z.enum(['1-5', '6-20', '21-50', '50+']),
  mission: z.string().min(2, 'Please describe your industry or mission'),
  needs: z.array(z.string()).min(1, 'Please select at least one area of help'),
  dataStack: z.array(z.string()).min(1, 'Please select at least one source'),
  challenge: z.string().min(10, 'Please provide a bit more detail (min 10 chars)'),
  timing: z.enum(['Just exploring', '1-3 months', 'Upcoming deadline']),
  users: z.array(z.string()).min(1, 'Please select who will use the insights'),
  preferredDate: z.date().refine((date): date is Date => !!date && !isNaN(date.getTime()), {
    message: "Please select a preferred date for our call"
  }),
  preferredTime: z.string().min(1, 'Please select a preferred time window'),
  timezone: z.string().min(1, 'Please select your timezone'),
  finalNote: z.string().optional(),
});
type ContactFormValues = z.infer<typeof contactSchema>;
const STEPS = [
  { id: 'intro', title: 'Start' },
  { id: 'contact', title: 'Contact' },
  { id: 'about', title: 'Organization' },
  { id: 'needs', title: 'Services' },
  { id: 'data', title: 'Data Sources' },
  { id: 'challenge', title: 'The Challenge' },
  { id: 'context', title: 'Context' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'final', title: 'Finish' },
];
const SERVICE_OPTIONS = [
  { id: 'dashboards', label: 'Dashboards & Visualization' },
  { id: 'financial', label: 'Financial Performance Analysis' },
  { id: 'impact', label: 'Impact & Grant Reporting' },
  { id: 'growth', label: 'Growth & Donor Analytics' },
  { id: 'fractional', label: 'Fractional Analytics Support' },
  { id: 'training', label: 'Team Data Literacy Training' },
];
const DATA_SOURCES = [
  { id: 'excel', label: 'Excel / Google Sheets' },
  { id: 'quickbooks', label: 'QuickBooks / Accounting' },
  { id: 'salesforce', label: 'Salesforce / CRM' },
  { id: 'sql', label: 'SQL / Database' },
  { id: 'stripe', label: 'Stripe / Payments' },
  { id: 'other', label: 'Other Cloud Apps' },
];
const USER_GROUPS = [
  { id: 'executives', label: 'Executive Leadership' },
  { id: 'operations', label: 'Operations Teams' },
  { id: 'fundraising', label: 'Fundraising / Sales' },
  { id: 'board', label: 'Board of Directors' },
  { id: 'public', label: 'Public / Donors' },
];
const TIMEZONES = [
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'London (GMT/BST)', value: 'Europe/London' },
  { label: 'Central Europe (CET)', value: 'Europe/Paris' },
  { label: 'India (IST)', value: 'Asia/Kolkata' },
  { label: 'Singapore/HK (SGT)', value: 'Asia/Singapore' },
  { label: 'Australia (AEST)', value: 'Australia/Sydney' },
  { label: 'UTC', value: 'UTC' },
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
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      preferredTime: '',
      preferredDate: undefined as unknown as Date,
      finalNote: '',
    },
    mode: 'onChange',
  });
  const nextStep = async () => {
    const fieldsByStep: (keyof ContactFormValues)[][] = [
      [],
      ['name', 'email', 'organization', 'role'],
      ['orgType', 'orgSize', 'mission'],
      ['needs'],
      ['dataStack'],
      ['challenge'],
      ['timing', 'users'],
      ['preferredDate', 'preferredTime', 'timezone'],
      ['finalNote'],
    ];
    const currentFields = fieldsByStep[step];
    if (currentFields?.length > 0) {
      const isValid = await form.trigger(currentFields);
      if (!isValid) {
        toast.error("Please fill required fields", { 
          description: "One or more required fields need your attention before moving forward.",
          duration: 3000
        });
        return;
      }
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: document.getElementById('contact')?.offsetTop ?? 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: document.getElementById('contact')?.offsetTop ?? 0, behavior: 'smooth' });
  };
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Submission failed');
      toast.success('Consultation Request Received!', {
        description: "Thank you for the detailed information. We'll reach out shortly to confirm our call.",
      });
      form.reset();
      setStep(0);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Submission Failed', {
        description: error instanceof Error ? error.message : 'Please try again or email us directly at info@cornercanyon.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const progress = (step / (STEPS.length - 1)) * 100;
  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Consultation Request</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to unlock the power of your data? Tell us about your organization and let's find the best path forward.
          </p>
        </div>
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Section {step} of {STEPS.length - 1}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-canyon-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "circOut" }}
            />
          </div>
        </div>
        <div className="bg-background rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">Strategy Consultation</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Corner Canyon Analytics provides personalized data strategy for teams with a mission. This form helps us prepare so our conversation is as valuable as possible.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {[
                          { icon: Clock, title: "Quick & Efficient", desc: "Takes ~4 minutes to complete." },
                          { icon: CheckCircle2, title: "Zero Obligation", desc: "Complimentary initial strategy call." }
                        ].map((box, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                            <box.icon className="h-6 w-6 text-canyon-600 shrink-0" />
                            <div>
                              <h4 className="font-bold text-sm">{box.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{box.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button type="button" onClick={nextStep} className="w-full h-14 text-lg bg-canyon-600 hover:bg-canyon-700 shadow-lg shadow-canyon-500/20">
                      Begin My Request <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input className="h-12" placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input className="h-12" placeholder="jane@organization.org" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem><FormLabel>Organization Name *</FormLabel><FormControl><Input className="h-12" placeholder="Canyon Relief Fund" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem><FormLabel>Your Role / Title *</FormLabel><FormControl><Input className="h-12" placeholder="Executive Director" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold">About Your Organization</h3>
                    <div className="space-y-6">
                      <FormField control={form.control} name="orgType" render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Organization Type</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {['Small business', 'Nonprofit', 'Both/Hybrid', 'Not sure'].map(t => (
                                <FormItem key={t} className="flex items-center space-x-3 space-y-0 border p-4 rounded-xl cursor-pointer hover:bg-accent hover:border-canyon-500/50 transition-all">
                                  <FormControl><RadioGroupItem value={t} /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer w-full">{t}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="orgSize" render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Team Size (Full-time Equivalents)</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {['1-5', '6-20', '21-50', '50+'].map(s => (
                                <FormItem key={s} className="flex items-center space-x-3 space-y-0 border p-4 rounded-xl cursor-pointer hover:bg-accent transition-all">
                                  <FormControl><RadioGroupItem value={s} /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">{s}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="mission" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Industry or Mission</FormLabel>
                          <FormControl><Input className="h-12" placeholder="e.g., Youth mentorship, Artisan retail..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Target className="h-6 w-6 text-canyon-600" /> Services Needed
                    </h3>
                    <FormField control={form.control} name="needs" render={() => (
                      <FormItem>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {SERVICE_OPTIONS.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="needs"
                              render={({ field }) => (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent transition-all">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id) ?? false}
                                      onCheckedChange={(checked) => {
                                        const values = Array.isArray(field.value) ? field.value : [];
                                        if (checked) {
                                          field.onChange([...values, item.id]);
                                        } else {
                                          field.onChange(values.filter((v) => v !== item.id));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium cursor-pointer">{item.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Database className="h-6 w-6 text-canyon-600" /> Data Sources
                    </h3>
                    <p className="text-muted-foreground">Which tools are you currently using to store your organization's data?</p>
                    <FormField control={form.control} name="dataStack" render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 gap-4">
                          {DATA_SOURCES.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="dataStack"
                              render={({ field }) => (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent transition-all">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id) ?? false}
                                      onCheckedChange={(checked) => {
                                        const values = Array.isArray(field.value) ? field.value : [];
                                        if (checked) {
                                          field.onChange([...values, item.id]);
                                        } else {
                                          field.onChange(values.filter((v) => v !== item.id));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium cursor-pointer">{item.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold">The Biggest Challenge</h3>
                    <FormField control={form.control} name="challenge" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your primary data frustration or goal</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., We spend 10 hours a month manually merging spreadsheets for our board reports..."
                            className="min-h-[200px] text-lg border-slate-200 dark:border-slate-800"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Be as detailed as you like. This helps us come prepared with ideas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">Strategic Context</h3>
                      <FormField control={form.control} name="timing" render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>What is your timeline for this project?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {['Just exploring', '1-3 months', 'Upcoming deadline'].map(t => (
                                <FormItem key={t} className="flex items-center space-x-3 space-y-0 border p-4 rounded-xl cursor-pointer hover:bg-accent transition-all">
                                  <FormControl><RadioGroupItem value={t} /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">{t}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-canyon-600" /> Who will use these insights?
                      </h4>
                      <FormField control={form.control} name="users" render={() => (
                        <FormItem>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {USER_GROUPS.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="users"
                                render={({ field }) => (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-xl hover:bg-accent transition-all">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id) ?? false}
                                        onCheckedChange={(checked) => {
                                          const values = Array.isArray(field.value) ? field.value : [];
                                          if (checked) {
                                            field.onChange([...values, item.id]);
                                          } else {
                                            field.onChange(values.filter((v) => v !== item.id));
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-medium cursor-pointer">{item.label}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {step === 7 && (
                  <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold">Schedule Your Call</h3>
                    <div className="bg-canyon-50 dark:bg-canyon-950/20 p-5 rounded-2xl flex items-center gap-4 border border-canyon-100 dark:border-canyon-900">
                      <div className="h-10 w-10 rounded-full bg-canyon-100 dark:bg-canyon-900 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-canyon-600" />
                      </div>
                      <span className="text-sm font-semibold text-canyon-900 dark:text-canyon-100">Meeting: 25-minute strategy deep-dive</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="preferredDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button 
                                  variant={"outline"} 
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12 border-slate-200 dark:border-slate-800 transition-colors",
                                    !field.value && "text-muted-foreground",
                                    form.formState.errors.preferredDate && "border-destructive ring-destructive/20"
                                  )}
                                >
                                  {field.value && !isNaN(field.value.getTime()) ? format(field.value, "PPP") : <span>Select a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[60]" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < startOfDay(new Date()) || date.getDay() === 0 || date.getDay() === 6}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="preferredTime" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time Window *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Select time" />
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
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4" /> Your Time Zone
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 dark:border-slate-800">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            {TIMEZONES.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 8 && (
                  <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-bold">Final Notes</h3>
                    <FormField control={form.control} name="finalNote" render={({ field }) => (
                      <FormItem>
                        <FormDescription className="text-base mb-4">
                          Any specific questions or additional team members who might join?
                        </FormDescription>
                        <FormControl>
                          <Textarea placeholder="Type any final thoughts here..." className="min-h-[150px] text-lg border-slate-200 dark:border-slate-800" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="bg-slate-900 dark:bg-slate-100 p-8 rounded-2xl text-white dark:text-slate-900 shadow-inner">
                      <h4 className="font-bold flex items-center gap-3 mb-3 text-lg">
                        <CheckCircle2 className="h-6 w-6 text-canyon-400 dark:text-canyon-600" />
                        Ready to launch?
                      </h4>
                      <p className="text-sm opacity-80 leading-relaxed">
                        By clicking submit, your request will be securely sent to our team. We'll review your mission and prepare a tailored strategy for our call. Expect a confirmation email shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {step > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <Button type="button" variant="ghost" onClick={prevStep} className="flex-1 h-14 text-lg" disabled={isSubmitting}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="flex-1 h-14 text-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 shadow-xl">
                      Next Step <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1 h-14 text-lg bg-canyon-600 hover:bg-canyon-700 text-white shadow-xl shadow-canyon-500/30" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Finalizing...</> : <><Send className="mr-2 h-5 w-5" /> Submit Request</>}
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