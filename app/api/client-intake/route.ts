import { NextResponse } from "next/server"
import * as fs from "fs/promises"
import * as path from "path"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const INTAKE_NOTIFICATION_EMAIL = process.env.INTAKE_NOTIFICATION_EMAIL || "cameron@chicagoamp.com"
const GMAIL_USER = (process.env.GMAIL_USER || "").trim()
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "")
const MAIL_FROM = process.env.MAIL_FROM || GMAIL_USER || "no-reply@localhost"

type UploadedFileMeta = {
  field: string
  originalName: string
  mimeType: string
  size: number
  savedAs: string
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function sanitizeFileName(input: string) {
  return input
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function readField(formData: FormData, key: string) {
  const value = formData.get(key)
  if (!value || value instanceof File) return ""
  return String(value).trim()
}

function readArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
}

function yesNo(value: string) {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return "Not provided"
  if (["yes", "true", "1", "on"].includes(normalized)) return "Yes"
  if (["no", "false", "0", "off"].includes(normalized)) return "No"
  return value
}

function bool(value: string) {
  return ["yes", "true", "1", "on"].includes(value.trim().toLowerCase())
}

function fallback(value: string) {
  return value.trim() || "Not provided"
}

function bulletList(values: string[]) {
  if (!values.length) return "- None provided"
  return values.map((value) => `- ${value}`).join("\n")
}

function fileList(values: UploadedFileMeta[]) {
  if (!values.length) return "- No files uploaded"
  return values
    .map((file) => `- ${file.field}: ${file.savedAs} (${file.originalName}, ${file.mimeType}, ${file.size} bytes)`)
    .join("\n")
}

function buildTransport() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })
}

const mailTransport = buildTransport()

async function saveUploadedFiles(files: { field: string; file: File }[], folderPath: string) {
  const uploaded: UploadedFileMeta[] = []
  if (!files.length) return uploaded

  const uploadsRoot = path.join(folderPath, "uploads")
  await fs.mkdir(uploadsRoot, { recursive: true })

  for (const item of files) {
    const fieldDir = slugify(item.field) || "misc"
    const fieldPath = path.join(uploadsRoot, fieldDir)
    await fs.mkdir(fieldPath, { recursive: true })

    const cleanName = sanitizeFileName(path.basename(item.file.name || "upload.bin"))
    const stampedName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanName}`
    const diskPath = path.join(fieldPath, stampedName)

    const buffer = Buffer.from(await item.file.arrayBuffer())
    await fs.writeFile(diskPath, buffer)

    uploaded.push({
      field: item.field,
      originalName: item.file.name,
      mimeType: item.file.type || "application/octet-stream",
      size: item.file.size,
      savedAs: path.posix.join("uploads", fieldDir, stampedName),
    })
  }

  return uploaded
}

function buildReadme(data: Record<string, string | string[] | boolean | UploadedFileMeta[]>) {
  return `# ${fallback(String(data.company_name || ""))}

## Submission Meta

- Created: ${fallback(String(data.created_at || ""))}

## Business & Contact Information

- Company Name: ${fallback(String(data.company_name || ""))}
- Industry: ${fallback(String(data.industry || ""))}
- Registration Number: ${fallback(String(data.registration_number || ""))}
- Business Address: ${fallback(String(data.business_address || ""))}

### Primary Contact

- Name: ${fallback(String(data.primary_contact_name || ""))}
- Role/Title: ${fallback(String(data.primary_contact_role || ""))}
- Email: ${fallback(String(data.primary_contact_email || ""))}
- Phone: ${fallback(String(data.primary_contact_phone || ""))}

### Requested Services

${bulletList((data.request_types as string[]) || [])}

## Business Overview

### Business Description

${fallback(String(data.business_description || ""))}

### Problem Solved

${fallback(String(data.problem_solved || ""))}

### Ideal Customers

${fallback(String(data.ideal_customers || ""))}

### Competitive Advantage

${fallback(String(data.unique_value || ""))}

## Branding

- Brand Identity Status: ${fallback(String(data.brand_identity_status || ""))}
- Brand Kit Notes: ${fallback(String(data.brand_kit_notes || ""))}
- Brand Color Codes: ${fallback(String(data.brand_color_codes || ""))}
- Font Families: ${fallback(String(data.font_families || ""))}
- Need Brand Kit Creation: ${fallback(String(data.need_brand_kit || ""))}

### Brand Personality

${bulletList((data.brand_personality as string[]) || [])}

### Preferred Style

${bulletList((data.preferred_style as string[]) || [])}

## Logo

- Logo Status: ${fallback(String(data.logo_status || ""))}
- Logo Notes: ${fallback(String(data.logo_notes || ""))}
- Logo Variations: ${fallback(String(data.logo_variations || ""))}

### Preferred Logo Style

${bulletList((data.preferred_logo_style as string[]) || [])}

## Google My Business & Marketing

- Has GMB Profile: ${fallback(String(data.has_gmb || ""))}
- GMB Link: ${fallback(String(data.gmb_link || ""))}
- Needs GMB Optimization: ${fallback(String(data.gmb_needs_optimization || ""))}
- Wants GMB Setup: ${fallback(String(data.setup_gmb || ""))}
- Other Marketing Channel: ${fallback(String(data.marketing_other || ""))}

### Current Marketing Channels

${bulletList((data.marketing_channels as string[]) || [])}

## Project Goals & Vision

### Top 3 Goals

- ${fallback(String(data.project_goal_1 || ""))}
- ${fallback(String(data.project_goal_2 || ""))}
- ${fallback(String(data.project_goal_3 || ""))}

### Long-term Vision

${fallback(String(data.long_term_vision || ""))}

- Primary Conversion Goal: ${fallback(String(data.primary_conversion_goal || ""))}
- Primary Conversion Goal (Other): ${fallback(String(data.primary_conversion_other || ""))}

### Desired Tone of Voice

${bulletList((data.tone_of_voice as string[]) || [])}

### Competitors / Inspirations

- ${fallback(String(data.competitor_1 || ""))}
- ${fallback(String(data.competitor_2 || ""))}
- ${fallback(String(data.competitor_3 || ""))}

### Ideal User Journey

${fallback(String(data.ideal_user_journey || ""))}

## Features & Requirements

### Pages / Sections Needed

${bulletList((data.pages_needed as string[]) || [])}

- Pages Other: ${fallback(String(data.pages_other || ""))}

### Must-have Features

${bulletList((data.must_have_features as string[]) || [])}

- Must-have Other: ${fallback(String(data.must_have_other || ""))}

### Performance Priorities

${bulletList((data.performance_priority as string[]) || [])}

## Content & Media

- Content Readiness: ${fallback(String(data.content_ready_status || ""))}
- Additional Content Notes: ${fallback(String(data.content_notes || ""))}

## Technical Requirements

### Integrations Needed

${bulletList((data.integrations_needed as string[]) || [])}

- Integrations Other: ${fallback(String(data.integrations_other || ""))}
- Existing Website URL: ${fallback(String(data.existing_website_url || ""))}
- Current CMS: ${fallback(String(data.current_cms || ""))}
- Current CMS Other: ${fallback(String(data.current_cms_other || ""))}
- Need Access to Existing Accounts: ${fallback(String(data.need_access_existing_accounts || ""))}

## Budget & Timeline

- Budget Range: ${fallback(String(data.budget_range || ""))}
- Desired Launch Date: ${fallback(String(data.desired_launch_date || ""))}
- Deadline Flexible: ${fallback(String(data.deadline_flexible || ""))}

## Payment Preferences

- Preferred Payment Method: ${fallback(String(data.preferred_payment_method || ""))}
- PayPal Email: ${fallback(String(data.paypal_email || ""))}
- Wise Link: ${fallback(String(data.wise_link || ""))}
- SEPA IBAN: ${fallback(String(data.sepa_iban || ""))}
- SWIFT Bank: ${fallback(String(data.swift_bank || ""))}
- SWIFT BIC: ${fallback(String(data.swift_bic || ""))}
- TymeBank Account: ${fallback(String(data.tyme_account_number || ""))}
- TymeBank PayShap: ${fallback(String(data.tyme_payshap || ""))}

## Terms & Final Sign-Off

- Terms Accepted: ${data.terms_accepted ? "Yes" : "No"}
- Full Name: ${fallback(String(data.signoff_full_name || ""))}
- Email Address: ${fallback(String(data.signoff_email || ""))}
- Digital Signature: ${fallback(String(data.digital_signature || ""))}
- Date: ${fallback(String(data.signoff_date || ""))}

## Uploaded Files

${fileList((data.uploaded_files as UploadedFileMeta[]) || [])}
`
}

async function sendEmail(subject: string, body: string, replyTo?: string) {
  if (!mailTransport) {
    return {
      sent: false,
      status: "Email notification skipped: Gmail is not configured.",
    }
  }

  try {
    await mailTransport.sendMail({
      from: MAIL_FROM,
      to: INTAKE_NOTIFICATION_EMAIL,
      replyTo,
      subject,
      text: body,
    })

    return {
      sent: true,
      status: `Email sent to ${INTAKE_NOTIFICATION_EMAIL}.`,
    }
  } catch (error) {
    console.error("Email delivery failed:", error)
    return {
      sent: false,
      status: "Folder created, but email failed to send. Check Gmail app password settings.",
    }
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const companyName = readField(formData, "company_name")
    const primaryContactEmail = readField(formData, "primary_contact_email")
    const signoffName = readField(formData, "signoff_full_name")
    const signoffEmail = readField(formData, "signoff_email")
    const signature = readField(formData, "digital_signature")
    const termsAccepted = bool(readField(formData, "terms_accepted"))

    if (!companyName || !primaryContactEmail || !signoffName || !signoffEmail || !signature) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: company name, primary contact email, sign-off name/email, and digital signature are required.",
        },
        { status: 400 }
      )
    }

    if (!termsAccepted) {
      return NextResponse.json({ error: "You must agree to the Terms & Conditions before submitting." }, { status: 400 })
    }

    const now = new Date()
    const nowIso = now.toISOString()
    const folderName = `${slugify(companyName) || "client"}-${nowIso.replace(/[:.]/g, "-")}`

    const preferredRoot = path.join(process.cwd(), "clients")
    let storageRoot = preferredRoot
    let folderPath = path.join(storageRoot, folderName)

    try {
      await fs.mkdir(folderPath, { recursive: true })
    } catch {
      storageRoot = path.join("/tmp", "clients")
      folderPath = path.join(storageRoot, folderName)
      await fs.mkdir(folderPath, { recursive: true })
    }

    const files: { field: string; file: File }[] = []
    formData.forEach((value, key) => {
      if (value instanceof File && value.size > 0 && value.name) {
        files.push({ field: key, file: value })
      }
    })

    const uploadedFiles = await saveUploadedFiles(files, folderPath)

    const intake: Record<string, string | string[] | boolean | UploadedFileMeta[]> = {
      company_name: companyName,
      industry: readField(formData, "industry"),
      registration_number: readField(formData, "registration_number"),
      business_address: readField(formData, "business_address"),

      primary_contact_name: readField(formData, "primary_contact_name"),
      primary_contact_role: readField(formData, "primary_contact_role"),
      primary_contact_email: primaryContactEmail,
      primary_contact_phone: readField(formData, "primary_contact_phone"),

      request_types: readArray(formData, "request_types"),

      business_description: readField(formData, "business_description"),
      problem_solved: readField(formData, "problem_solved"),
      ideal_customers: readField(formData, "ideal_customers"),
      unique_value: readField(formData, "unique_value"),

      brand_identity_status: readField(formData, "brand_identity_status"),
      brand_kit_notes: readField(formData, "brand_kit_notes"),
      brand_color_codes: readField(formData, "brand_color_codes"),
      font_families: readField(formData, "font_families"),
      brand_personality: readArray(formData, "brand_personality"),
      need_brand_kit: yesNo(readField(formData, "need_brand_kit")),
      preferred_style: readArray(formData, "preferred_style"),

      logo_status: readField(formData, "logo_status"),
      logo_notes: readField(formData, "logo_notes"),
      logo_variations: readField(formData, "logo_variations"),
      preferred_logo_style: readArray(formData, "preferred_logo_style"),

      has_gmb: yesNo(readField(formData, "has_gmb")),
      gmb_link: readField(formData, "gmb_link"),
      gmb_needs_optimization: yesNo(readField(formData, "gmb_needs_optimization")),
      setup_gmb: yesNo(readField(formData, "setup_gmb")),
      marketing_channels: readArray(formData, "marketing_channels"),
      marketing_other: readField(formData, "marketing_other"),

      project_goal_1: readField(formData, "project_goal_1"),
      project_goal_2: readField(formData, "project_goal_2"),
      project_goal_3: readField(formData, "project_goal_3"),
      long_term_vision: readField(formData, "long_term_vision"),
      primary_conversion_goal: readField(formData, "primary_conversion_goal"),
      primary_conversion_other: readField(formData, "primary_conversion_other"),
      tone_of_voice: readArray(formData, "tone_of_voice"),
      competitor_1: readField(formData, "competitor_1"),
      competitor_2: readField(formData, "competitor_2"),
      competitor_3: readField(formData, "competitor_3"),
      ideal_user_journey: readField(formData, "ideal_user_journey"),

      pages_needed: readArray(formData, "pages_needed"),
      pages_other: readField(formData, "pages_other"),
      must_have_features: readArray(formData, "must_have_features"),
      must_have_other: readField(formData, "must_have_other"),
      performance_priority: readArray(formData, "performance_priority"),

      content_ready_status: readField(formData, "content_ready_status"),
      content_notes: readField(formData, "content_notes"),

      integrations_needed: readArray(formData, "integrations_needed"),
      integrations_other: readField(formData, "integrations_other"),
      existing_website_url: readField(formData, "existing_website_url"),
      current_cms: readField(formData, "current_cms"),
      current_cms_other: readField(formData, "current_cms_other"),
      need_access_existing_accounts: yesNo(readField(formData, "need_access_existing_accounts")),

      budget_range: readField(formData, "budget_range"),
      desired_launch_date: readField(formData, "desired_launch_date"),
      deadline_flexible: yesNo(readField(formData, "deadline_flexible")),

      preferred_payment_method: readField(formData, "preferred_payment_method"),
      paypal_email: readField(formData, "paypal_email"),
      wise_link: readField(formData, "wise_link"),
      sepa_iban: readField(formData, "sepa_iban"),
      swift_bank: readField(formData, "swift_bank"),
      swift_bic: readField(formData, "swift_bic"),
      tyme_account_number: readField(formData, "tyme_account_number"),
      tyme_payshap: readField(formData, "tyme_payshap"),

      terms_accepted: termsAccepted,
      signoff_full_name: signoffName,
      signoff_email: signoffEmail,
      digital_signature: signature,
      signoff_date: readField(formData, "signoff_date"),

      uploaded_files: uploadedFiles,
      created_at: nowIso,
    }

    const readmeContent = buildReadme(intake)
    await fs.writeFile(path.join(folderPath, "README.md"), readmeContent, "utf8")
    await fs.writeFile(path.join(folderPath, "submission.json"), JSON.stringify(intake, null, 2), "utf8")

    const folderRelPath = `clients/${folderName}`
    const emailResult = await sendEmail(
      `New Intake: ${companyName}`,
      `A new intake form was submitted.\n\nFolder: ${folderRelPath}\n\n${readmeContent}`,
      primaryContactEmail || signoffEmail || undefined
    )

    return NextResponse.json({
      message: `Client folder created. ${emailResult.status}`,
      folder: folderRelPath,
      emailSent: emailResult.sent,
      uploadedFiles: uploadedFiles.length,
      storageRoot,
    })
  } catch (error) {
    console.error("Failed to process intake submission:", error)
    return NextResponse.json({ error: "Failed to process intake submission" }, { status: 500 })
  }
}
