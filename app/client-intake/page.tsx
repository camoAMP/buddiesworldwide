"use client"

import { FormEvent, ReactNode, useMemo, useState } from "react"

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </label>
  )
}

function Option({ name, value, label, type = "checkbox" }: { name: string; value: string; label: string; type?: "checkbox" | "radio" }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:border-blue-500">
      <input type={type} name={name} value={value} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  )
}

export default function ClientIntakePage() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{
    message: string
    folder: string
    uploadedFiles: number
    storageRoot?: string
  } | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    if (!String(formData.get("signoff_date") || "").trim()) {
      formData.set("signoff_date", today)
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/client-intake", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit intake form")
      }

      setSuccess({
        message: result.message || "Intake submitted.",
        folder: result.folder,
        uploadedFiles: Number(result.uploadedFiles || 0),
        storageRoot: result.storageRoot,
      })
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-slate-950 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <img
                src="/assets/cameron-logo.png"
                alt="Cameron logo"
                className="h-28 w-28 rounded-2xl border border-slate-700 bg-white object-cover"
              />
              <div>
                <h1 className="text-3xl font-black tracking-tight">Client Intake Form</h1>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Cameron Dev Studio
                </p>
                <p className="mt-3 max-w-3xl text-slate-300">
                  Complete this form to start your project. Your submission creates a client folder,
                  generated README, saved uploads, and email notification.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8 p-6 md:p-8" encType="multipart/form-data">
            {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">1. Business & Contact Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Company Name</Label>
                  <input required name="company_name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Industry</Label>
                  <input name="industry" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <input name="registration_number" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Business Address</Label>
                  <input name="business_address" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>

              <h3 className="pt-2 font-semibold text-slate-900">Primary Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <input required name="primary_contact_name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Role / Title</Label>
                  <input name="primary_contact_role" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <input required type="email" name="primary_contact_email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <input name="primary_contact_phone" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>

              <div>
                <Label>What are you requesting? (Check all that apply)</Label>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <Option name="request_types" value="Website" label="Website" />
                  <Option name="request_types" value="Mobile App" label="Mobile App" />
                  <Option name="request_types" value="Software/Web Application" label="Software/Web Application" />
                  <Option name="request_types" value="Branding/Logo Design" label="Branding/Logo Design" />
                  <Option name="request_types" value="E-commerce Solution" label="E-commerce Solution" />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">2. Business Overview</h2>
              <div>
                <Label>Describe your business in 2-3 sentences</Label>
                <textarea name="business_description" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>What problem do you solve for your customers?</Label>
                <textarea name="problem_solved" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>Who are your ideal customers?</Label>
                <textarea name="ideal_customers" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>What makes you unique from competitors?</Label>
                <textarea name="unique_value" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">3. Branding</h2>
              <div>
                <Label>Do you have an established brand identity?</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="brand_identity_status" value="Yes, complete brand kit" label="Yes, complete brand kit" />
                  <Option type="radio" name="brand_identity_status" value="Partially, some elements" label="Partially, some elements" />
                  <Option type="radio" name="brand_identity_status" value="No, need help creating one" label="No, need help creating one" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Upload brand guidelines/kit</Label>
                  <input type="file" name="brand_kit_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Brand color codes</Label>
                  <input name="brand_color_codes" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Font families</Label>
                  <input name="font_families" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Brand notes / links</Label>
                  <input name="brand_kit_notes" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Brand personality (select up to 3)</Label>
                <div className="grid gap-3 md:grid-cols-4">
                  <Option name="brand_personality" value="Professional" label="Professional" />
                  <Option name="brand_personality" value="Playful" label="Playful" />
                  <Option name="brand_personality" value="Bold" label="Bold" />
                  <Option name="brand_personality" value="Minimalist" label="Minimalist" />
                  <Option name="brand_personality" value="Luxury" label="Luxury" />
                  <Option name="brand_personality" value="Friendly" label="Friendly" />
                  <Option name="brand_personality" value="Innovative" label="Innovative" />
                  <Option name="brand_personality" value="Traditional" label="Traditional" />
                </div>
              </div>
              <div>
                <Label>Would you like us to create a brand kit?</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <Option type="radio" name="need_brand_kit" value="yes" label="Yes" />
                  <Option type="radio" name="need_brand_kit" value="no" label="No" />
                </div>
              </div>
              <div>
                <Label>Preferred style</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="preferred_style" value="Modern" label="Modern" />
                  <Option name="preferred_style" value="Classic" label="Classic" />
                  <Option name="preferred_style" value="Minimalist" label="Minimalist" />
                  <Option name="preferred_style" value="Bold" label="Bold" />
                  <Option name="preferred_style" value="Corporate" label="Corporate" />
                  <Option name="preferred_style" value="Creative" label="Creative" />
                </div>
              </div>
              <div>
                <Label>Upload inspiration/examples</Label>
                <input type="file" name="brand_inspiration_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">4. Logo</h2>
              <div>
                <Label>Do you have a logo?</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="logo_status" value="Yes, I have a logo" label="Yes, I have a logo" />
                  <Option type="radio" name="logo_status" value="No, I need a logo designed" label="No, I need a logo designed" />
                  <Option type="radio" name="logo_status" value="I have a logo but want it redesigned" label="I have a logo but want it redesigned" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Upload logo files (vector/high-res)</Label>
                  <input type="file" name="logo_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Logo variations (color, black, white)</Label>
                  <input name="logo_variations" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Preferred logo style</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="preferred_logo_style" value="Wordmark" label="Wordmark" />
                  <Option name="preferred_logo_style" value="Icon/Symbol" label="Icon/Symbol" />
                  <Option name="preferred_logo_style" value="Combination" label="Combination" />
                  <Option name="preferred_logo_style" value="Abstract" label="Abstract" />
                  <Option name="preferred_logo_style" value="Minimalist" label="Minimalist" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Upload logo inspiration/examples</Label>
                  <input type="file" name="logo_inspiration_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Logo notes</Label>
                  <input name="logo_notes" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">5. Google My Business & Marketing</h2>
              <div>
                <Label>Do you have a Google My Business profile?</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <Option type="radio" name="has_gmb" value="yes" label="Yes" />
                  <Option type="radio" name="has_gmb" value="no" label="No" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>GMB Link</Label>
                  <input type="url" name="gmb_link" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="https://" />
                </div>
                <div>
                  <Label>Does it need optimization?</Label>
                  <div className="grid gap-3 grid-cols-2">
                    <Option type="radio" name="gmb_needs_optimization" value="yes" label="Yes" />
                    <Option type="radio" name="gmb_needs_optimization" value="no" label="No" />
                  </div>
                </div>
                <div>
                  <Label>Need setup from scratch?</Label>
                  <div className="grid gap-3 grid-cols-2">
                    <Option type="radio" name="setup_gmb" value="yes" label="Yes" />
                    <Option type="radio" name="setup_gmb" value="no" label="No" />
                  </div>
                </div>
                <div>
                  <Label>Other marketing channel</Label>
                  <input name="marketing_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Current Marketing Channels (Select all that apply)</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="marketing_channels" value="Social Media" label="Social Media" />
                  <Option name="marketing_channels" value="Email Marketing" label="Email Marketing" />
                  <Option name="marketing_channels" value="Paid Advertising" label="Paid Advertising" />
                  <Option name="marketing_channels" value="Content Marketing/Blog" label="Content Marketing/Blog" />
                  <Option name="marketing_channels" value="SEO" label="SEO" />
                  <Option name="marketing_channels" value="Print Marketing" label="Print Marketing" />
                </div>
              </div>
              <div>
                <Label>Upload existing marketing materials</Label>
                <input type="file" name="marketing_material_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">6. Project Goals & Vision</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Goal 1</Label>
                  <input name="project_goal_1" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Goal 2</Label>
                  <input name="project_goal_2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Goal 3</Label>
                  <input name="project_goal_3" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Long-term vision (2-3 years)</Label>
                <textarea name="long_term_vision" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>Primary conversion goal</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="primary_conversion_goal" value="Generate leads/inquiries" label="Generate leads/inquiries" />
                  <Option type="radio" name="primary_conversion_goal" value="Direct sales/e-commerce" label="Direct sales/e-commerce" />
                  <Option type="radio" name="primary_conversion_goal" value="Build brand awareness" label="Build brand awareness" />
                  <Option type="radio" name="primary_conversion_goal" value="Provide information/education" label="Provide information/education" />
                  <Option type="radio" name="primary_conversion_goal" value="User engagement/community building" label="User engagement/community building" />
                  <Option type="radio" name="primary_conversion_goal" value="Other" label="Other" />
                </div>
              </div>
              <div>
                <Label>Primary conversion goal (Other)</Label>
                <input name="primary_conversion_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>Desired tone of voice (Select up to 3)</Label>
                <div className="grid gap-3 md:grid-cols-4">
                  <Option name="tone_of_voice" value="Professional" label="Professional" />
                  <Option name="tone_of_voice" value="Friendly" label="Friendly" />
                  <Option name="tone_of_voice" value="Authoritative" label="Authoritative" />
                  <Option name="tone_of_voice" value="Conversational" label="Conversational" />
                  <Option name="tone_of_voice" value="Formal" label="Formal" />
                  <Option name="tone_of_voice" value="Casual" label="Casual" />
                  <Option name="tone_of_voice" value="Technical" label="Technical" />
                  <Option name="tone_of_voice" value="Creative" label="Creative" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Competitor 1</Label>
                  <input name="competitor_1" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Competitor 2</Label>
                  <input name="competitor_2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Competitor 3</Label>
                  <input name="competitor_3" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Describe your ideal user journey</Label>
                <textarea name="ideal_user_journey" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">7. Features & Requirements</h2>
              <div>
                <Label>Pages/Sections Needed</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="pages_needed" value="Home" label="Home" />
                  <Option name="pages_needed" value="About Us" label="About Us" />
                  <Option name="pages_needed" value="Services/Products" label="Services/Products" />
                  <Option name="pages_needed" value="Portfolio/Case Studies" label="Portfolio/Case Studies" />
                  <Option name="pages_needed" value="Blog/News" label="Blog/News" />
                  <Option name="pages_needed" value="Contact" label="Contact" />
                  <Option name="pages_needed" value="FAQ" label="FAQ" />
                  <Option name="pages_needed" value="Team/Staff" label="Team/Staff" />
                  <Option name="pages_needed" value="Testimonials/Reviews" label="Testimonials/Reviews" />
                  <Option name="pages_needed" value="Pricing" label="Pricing" />
                  <Option name="pages_needed" value="Careers" label="Careers" />
                  <Option name="pages_needed" value="E-commerce/Shop" label="E-commerce/Shop" />
                  <Option name="pages_needed" value="User Dashboard/Portal" label="User Dashboard/Portal" />
                </div>
              </div>
              <div>
                <Label>Other page</Label>
                <input name="pages_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>Must-have features</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="must_have_features" value="Contact forms" label="Contact forms" />
                  <Option name="must_have_features" value="Live chat integration" label="Live chat integration" />
                  <Option name="must_have_features" value="Booking/scheduling system" label="Booking/scheduling system" />
                  <Option name="must_have_features" value="E-commerce functionality" label="E-commerce functionality" />
                  <Option name="must_have_features" value="User authentication/login" label="User authentication/login" />
                  <Option name="must_have_features" value="Payment processing" label="Payment processing" />
                  <Option name="must_have_features" value="Search functionality" label="Search functionality" />
                  <Option name="must_have_features" value="Multi-language support" label="Multi-language support" />
                  <Option name="must_have_features" value="Blog/CMS" label="Blog/CMS" />
                  <Option name="must_have_features" value="Analytics dashboard" label="Analytics dashboard" />
                  <Option name="must_have_features" value="API integrations" label="API integrations" />
                  <Option name="must_have_features" value="Mobile app (iOS/Android)" label="Mobile app (iOS/Android)" />
                  <Option name="must_have_features" value="Progressive Web App (PWA)" label="Progressive Web App (PWA)" />
                  <Option name="must_have_features" value="Custom admin panel" label="Custom admin panel" />
                </div>
              </div>
              <div>
                <Label>Other must-have feature</Label>
                <input name="must_have_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
              <div>
                <Label>Performance priority</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="performance_priority" value="Speed optimization" label="Speed optimization" />
                  <Option name="performance_priority" value="SEO optimization" label="SEO optimization" />
                  <Option name="performance_priority" value="Security" label="Security" />
                  <Option name="performance_priority" value="Scalability" label="Scalability" />
                  <Option name="performance_priority" value="Accessibility" label="Accessibility" />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">8. Content & Media</h2>
              <div>
                <Label>Do you have content ready?</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="content_ready_status" value="Yes, all content is ready" label="Yes, all content is ready" />
                  <Option type="radio" name="content_ready_status" value="Partially, some content ready" label="Partially, some content ready" />
                  <Option type="radio" name="content_ready_status" value="No, we need help creating content" label="No, we need help creating content" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Upload text documents</Label>
                  <input type="file" name="content_text_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Upload images/photos</Label>
                  <input type="file" name="content_image_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Upload videos</Label>
                  <input type="file" name="content_video_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
                <div>
                  <Label>Upload other media</Label>
                  <input type="file" name="content_other_files" multiple className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2" />
                </div>
              </div>
              <div>
                <Label>Additional content notes</Label>
                <textarea name="content_notes" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">9. Technical Requirements</h2>
              <div>
                <Label>Integrations Needed</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option name="integrations_needed" value="Payment gateway" label="Payment gateway" />
                  <Option name="integrations_needed" value="CRM" label="CRM" />
                  <Option name="integrations_needed" value="Email marketing" label="Email marketing" />
                  <Option name="integrations_needed" value="Social media feeds" label="Social media feeds" />
                  <Option name="integrations_needed" value="Google Analytics" label="Google Analytics" />
                  <Option name="integrations_needed" value="Live chat" label="Live chat" />
                  <Option name="integrations_needed" value="Booking/calendar" label="Booking/calendar" />
                  <Option name="integrations_needed" value="Shipping/logistics" label="Shipping/logistics" />
                  <Option name="integrations_needed" value="Accounting software" label="Accounting software" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Other integration</Label>
                  <input name="integrations_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Existing website URL</Label>
                  <input type="url" name="existing_website_url" placeholder="https://" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
              <div>
                <Label>Current CMS</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="current_cms" value="WordPress" label="WordPress" />
                  <Option type="radio" name="current_cms" value="Webflow" label="Webflow" />
                  <Option type="radio" name="current_cms" value="Wix" label="Wix" />
                  <Option type="radio" name="current_cms" value="Squarespace" label="Squarespace" />
                  <Option type="radio" name="current_cms" value="Shopify" label="Shopify" />
                  <Option type="radio" name="current_cms" value="Custom" label="Custom" />
                  <Option type="radio" name="current_cms" value="Other" label="Other" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Current CMS (Other)</Label>
                  <input name="current_cms_other" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Need access to existing analytics/hosting accounts?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Option type="radio" name="need_access_existing_accounts" value="yes" label="Yes" />
                    <Option type="radio" name="need_access_existing_accounts" value="no" label="No" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">10. Budget & Timeline</h2>
              <div>
                <Label>Budget Range</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <Option type="radio" name="budget_range" value="Under $2,000" label="Under $2,000" />
                  <Option type="radio" name="budget_range" value="$2,000 - $5,000" label="$2,000 - $5,000" />
                  <Option type="radio" name="budget_range" value="$5,000 - $10,000" label="$5,000 - $10,000" />
                  <Option type="radio" name="budget_range" value="$10,000 - $25,000" label="$10,000 - $25,000" />
                  <Option type="radio" name="budget_range" value="$25,000 - $50,000" label="$25,000 - $50,000" />
                  <Option type="radio" name="budget_range" value="$50,000+" label="$50,000+" />
                  <Option type="radio" name="budget_range" value="Open to discussion" label="Open to discussion" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Desired Launch Date</Label>
                  <input type="date" name="desired_launch_date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Is deadline flexible?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Option type="radio" name="deadline_flexible" value="yes" label="Yes" />
                    <Option type="radio" name="deadline_flexible" value="no" label="No, hard deadline" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">11. Payment Methods</h2>
              <div>
                <Label>Preferred payment method</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <Option type="radio" name="preferred_payment_method" value="PayPal" label="PayPal" />
                  <Option type="radio" name="preferred_payment_method" value="Wise" label="Wise" />
                  <Option type="radio" name="preferred_payment_method" value="SEPA Transfer" label="SEPA Transfer" />
                  <Option type="radio" name="preferred_payment_method" value="SWIFT/International" label="SWIFT/International" />
                  <Option type="radio" name="preferred_payment_method" value="South Africa (TymeBank)" label="South Africa (TymeBank)" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>PayPal</Label>
                  <input name="paypal_email" defaultValue="devries.cameron20@gmail.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Wise</Label>
                  <input name="wise_link" defaultValue="https://wise.com/pay/me/camerond524" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>SEPA IBAN</Label>
                  <input name="sepa_iban" defaultValue="NL70 YOUR 0246 5749 84" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>SWIFT Bank</Label>
                  <input name="swift_bank" defaultValue="Stichting Custodian Yoursafe" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>SWIFT BIC</Label>
                  <input name="swift_bic" defaultValue="RABONL2U" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>TymeBank Account Number</Label>
                  <input name="tyme_account_number" defaultValue="51011751329" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>TymeBank PayShap</Label>
                  <input name="tyme_payshap" defaultValue="0604649405@tymebank" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">12. Terms & Final Sign-Off</h2>
              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <p className="mb-1 font-semibold">Terms & Conditions (Summary)</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>50% upfront non-refundable deposit required to begin work.</li>
                  <li>50% due before final launch or final files delivery.</li>
                  <li>Two revision rounds included per project phase.</li>
                  <li>Third-party services and licenses billed separately.</li>
                </ul>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-slate-800">
                <input type="checkbox" name="terms_accepted" value="yes" required className="h-5 w-5" />
                I have read and agree to the Terms & Conditions
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Full Name</Label>
                  <input required name="signoff_full_name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <input required type="email" name="signoff_email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Digital Signature</Label>
                  <input required name="digital_signature" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
                <div>
                  <Label>Date</Label>
                  <input required type="date" name="signoff_date" defaultValue={today} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT INTAKE"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {success ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900">Submission Received</h3>
            <p className="mt-3 text-sm text-slate-600">{success.message}</p>
            <p className="mt-2 text-xs text-slate-500">Folder: {success.folder}</p>
            <p className="mt-1 text-xs text-slate-500">Uploaded files: {success.uploadedFiles}</p>
            {success.storageRoot ? <p className="mt-1 text-xs text-slate-500">Storage root: {success.storageRoot}</p> : null}
            <button
              onClick={() => setSuccess(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}
