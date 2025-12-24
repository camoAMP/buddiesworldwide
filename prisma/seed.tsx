import { PrismaClient } from "@prisma/client"
import { subDays } from "date-fns"
import crypto from "crypto"

const prisma = new PrismaClient()

function hashIP(i: number) {
  return crypto.createHash("sha256").update(`127.0.0.${i}`).digest("hex").slice(0, 32)
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function main() {
  console.log("🌱 Starting seed...")

  const owner = await prisma.user.upsert({
    where: { email: "demo-owner@connectsync.dev" },
    create: {
      email: "demo-owner@connectsync.dev",
      name: "Jason (Demo Owner)",
      role: "ADMIN",
      subscriptionStatus: "pro_active",
      stripeCustomerId: "cus_demo_owner",
    },
    update: {},
  })

  const freeUser = await prisma.user.upsert({
    where: { email: "demo-free@connectsync.dev" },
    create: {
      email: "demo-free@connectsync.dev",
      name: "Ava Free",
      role: "USER",
      subscriptionStatus: "free",
    },
    update: {},
  })

  const editor = await prisma.user.upsert({
    where: { email: "demo-editor@connectsync.dev" },
    create: {
      email: "demo-editor@connectsync.dev",
      name: "Sam Editor",
      role: "EDITOR",
      subscriptionStatus: "pro_active",
    },
    update: {},
  })

  const jasonPage = await prisma.bioPage.create({
    data: {
      userId: owner.id,
      slug: "jason",
      title: "Jason — ConnectSync",
      publishedAt: new Date(),
      theme: {
        primary: "#4F46E5",
        bg: "#0B1020",
        text: "#E5E7EB",
        radius: 16,
        font: "Inter",
      } as any,
      settings: {
        showAvatar: true,
        showFooterBrand: true,
        abTesting: true,
        ogStyle: "dark",
      } as any,
    },
  })

  const avaPage = await prisma.bioPage.create({
    data: {
      userId: freeUser.id,
      slug: "ava",
      title: "Ava — Links",
      publishedAt: new Date(),
      theme: {
        primary: "#16A34A",
        bg: "#0f172a",
        text: "#f8fafc",
        radius: 12,
        font: "Inter",
      } as any,
      settings: { abTesting: false } as any,
    },
  })

  const studioPage = await prisma.bioPage.create({
    data: {
      userId: owner.id,
      slug: "studio",
      title: "ConnectSync Studio",
      domain: "studio.demo.connectsync.dev",
      publishedAt: new Date(),
      theme: {
        primary: "#F59E0B",
        bg: "#111827",
        text: "#F3F4F6",
        radius: 20,
        font: "DM Sans",
      } as any,
    },
  })

  await prisma.block.createMany({
    data: [
      // Jason's page - Pro features with A/B testing
      {
        pageId: jasonPage.id,
        type: "PROFILE",
        order: 1,
        config: {
          A: {
            avatarUrl: "/demo/jason.jpg",
            title: "Jason",
            subtitle: "Integrations & Events",
            bio: "Building ConnectSync & IRL Events",
          },
          B: {
            avatarUrl: "/demo/jason-2.jpg",
            title: "Jason",
            subtitle: "Automation Architect",
            bio: "Syncing data, saving time.",
          },
          split: 50,
        } as any,
        variant: null,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "LINK",
        order: 2,
        config: {
          A: { label: "Book a Demo", url: "https://cal.com/demo" },
          B: { label: "See It Live", url: "https://cal.com/demo" },
          utm: { source: "bio", campaign: "seed" },
          track: true,
        } as any,
        variant: null,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "GROUP",
        order: 3,
        config: {
          title: "Featured",
          links: [
            { label: "Whitepaper", url: "/whitepaper" },
            { label: "Pricing", url: "/pricing" },
            { label: "Dashboard (Demo)", url: "/dashboard" },
          ],
        } as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "YOUTUBE",
        order: 4,
        config: {
          videoId: "dQw4w9WgXcQ",
          title: "ConnectSync Overview",
        } as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "SOCIAL",
        order: 5,
        config: {
          twitter: "https://x.com/connectsync",
          linkedin: "https://linkedin.com",
          github: "https://github.com",
        } as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "CONTACT",
        order: 6,
        config: {
          fields: ["name", "email", "message"],
          notifyChannel: "EMAIL",
          notifyTo: "demo-owner@connectsync.dev",
        } as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "ACTION",
        order: 7,
        config: { actionRef: "trelloCreateLead" } as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "DIVIDER",
        order: 8,
        config: {} as any,
        enabled: true,
      },
      {
        pageId: jasonPage.id,
        type: "RICHTEXT",
        order: 9,
        config: {
          html: "<small>Privacy · Terms · Contact</small>",
        } as any,
        enabled: true,
      },

      // Ava's page - Free tier limitations
      {
        pageId: avaPage.id,
        type: "PROFILE",
        order: 1,
        config: {
          avatarUrl: "/demo/ava.jpg",
          title: "Ava",
          subtitle: "Creator",
          bio: "Finding cool things on the internet.",
        } as any,
        enabled: true,
      },
      {
        pageId: avaPage.id,
        type: "LINK",
        order: 2,
        config: {
          label: "My Store",
          url: "#",
          track: true,
        } as any,
        enabled: true,
      },
      {
        pageId: avaPage.id,
        type: "LINK",
        order: 3,
        config: {
          label: "Latest Video",
          url: "#",
          track: true,
        } as any,
        enabled: true,
      },
      {
        pageId: avaPage.id,
        type: "NEWSLETTER",
        order: 4,
        config: {
          provider: "webhook",
          url: "https://example.com/subscribe",
        } as any,
        enabled: true,
      },
      {
        pageId: avaPage.id,
        type: "SOCIAL",
        order: 5,
        config: {
          instagram: "#",
          tiktok: "#",
        } as any,
        enabled: true,
      },
    ],
  })

  await prisma.integrationAccount.createMany({
    data: [
      {
        userId: owner.id,
        provider: "google",
        authType: "oauth",
        status: "connected",
        access: {
          access_token: "demo_google_token",
          refresh_token: "demo_google_refresh",
          scope: "sheets calendar",
          expiry_date: 1893456000000,
        } as any,
      },
      {
        userId: owner.id,
        provider: "notion",
        authType: "oauth",
        status: "connected",
        access: {
          access_token: "demo_notion_token",
          workspace_id: "ws_demo",
        } as any,
      },
      {
        userId: owner.id,
        provider: "trello",
        authType: "oauth",
        status: "connected",
        access: {
          access_token: "demo_trello_token",
          member_id: "me_demo",
          boards: [
            { id: "b1", name: "Marketing" },
            { id: "b2", name: "Product" },
          ],
        } as any,
      },
      {
        userId: owner.id,
        provider: "zapier",
        authType: "apikey",
        status: "connected",
        access: {
          webhook_url: "https://hooks.zapier.com/hooks/catch/123/demo",
          secret: "whsec_demo",
        } as any,
      },
      {
        userId: owner.id,
        provider: "openai",
        authType: "apikey",
        status: process.env.OPENAI_API_KEY ? "connected" : "disconnected",
        access: {
          api_key: process.env.OPENAI_API_KEY ? "***" : null,
        } as any,
      },
    ],
    skipDuplicates: true,
  })

  const [googleAddRow, googleEvent, notionAppend, trelloCreate, zapierPost, openaiSum] = await Promise.all([
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "google",
        actionKey: "sheets.addRow",
        name: "Add lead to Google Sheet",
        config: {
          spreadsheetId: "sheet_demo",
          range: "Leads!A:F",
          mapping: {
            name: "{{contact.name}}",
            email: "{{contact.email}}",
            source: "{{utm.source}}",
            message: "{{contact.message}}",
            ts: "{{event.ts}}",
          },
        } as any,
      },
    }),
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "google",
        actionKey: "calendar.createEvent",
        name: "Create intro call",
        config: {
          calendarId: "primary",
          title: "Intro — {{contact.name}}",
          startOffsetMin: 60,
          durationMin: 30,
          attendees: ["{{contact.email}}"],
        } as any,
      },
    }),
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "notion",
        actionKey: "db.appendRow",
        name: "Save contact to Notion CRM",
        config: {
          databaseId: "db_demo_crm",
          mapping: {
            Name: "{{contact.name}}",
            Email: "{{contact.email}}",
            Source: "{{utm.campaign}}",
            Notes: "{{contact.message}}",
          },
        } as any,
      },
    }),
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "trello",
        actionKey: "card.create",
        name: "Create card in Marketing",
        config: {
          boardId: "b1",
          listId: "l1_demo",
          title: "Lead — {{contact.name}}",
          desc: "From bio page {{page.slug}}",
          labels: ["Lead"],
        } as any,
      },
    }),
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "zapier",
        actionKey: "webhook.post",
        name: "Send to Zapier",
        config: {
          url: "https://hooks.zapier.com/hooks/catch/123/demo",
          headers: { "X-Seed": "1" },
          body: {
            type: "contact",
            payload: "{{event.json}}",
          },
        } as any,
      },
    }),
    prisma.action.create({
      data: {
        userId: owner.id,
        provider: "openai",
        actionKey: "ai.summarizeContacts",
        name: "Summarize last 10 contacts",
        config: {
          maxItems: 10,
          tone: "concise",
        } as any,
      },
    }),
  ])

  await prisma.block.updateMany({
    where: { pageId: jasonPage.id, type: "ACTION" },
    data: { config: { actionRef: trelloCreate.id } as any },
  })

  await Promise.all([
    prisma.trigger.create({
      data: {
        userId: owner.id,
        pageId: jasonPage.id,
        type: "CONTACT_SUBMIT",
        enabled: true,
        targets: [googleAddRow.id, notionAppend.id, trelloCreate.id, zapierPost.id] as any,
      },
    }),
    prisma.trigger.create({
      data: {
        userId: owner.id,
        pageId: jasonPage.id,
        type: "LINK_CLICK",
        blockId: (await prisma.block.findFirst({
          where: { pageId: jasonPage.id, type: "LINK", order: 2 },
        }))!.id,
        enabled: true,
        targets: [googleEvent.id] as any,
      },
    }),
    prisma.trigger.create({
      data: {
        userId: owner.id,
        pageId: jasonPage.id,
        type: "INCOMING_WEBHOOK",
        enabled: true,
        secret: "whsec_demo",
        route: "zapier/contact",
        targets: [notionAppend.id] as any,
      },
    }),
    prisma.trigger.create({
      data: {
        userId: owner.id,
        pageId: jasonPage.id,
        type: "CRON",
        enabled: true,
        scheduleCron: "*/30 * * * *",
        targets: [openaiSum.id] as any,
      },
    }),
  ])

  const countries = ["ZA", "US", "GB", "DE"]
  const devices = ["mobile", "desktop"]
  const refs = ["https://twitter.com", "https://instagram.com", ""]
  const pages = [jasonPage.id, avaPage.id]
  const now = new Date()

  const hits = Array.from({ length: 400 }).map((_, i) => ({
    pageId: pick(pages),
    type: Math.random() < 0.7 ? "view" : "click",
    ts: subDays(now, Math.floor(Math.random() * 7)),
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    ipHash: hashIP(i % 50),
    referrer: pick(refs),
    device: pick(devices),
    country: pick(countries),
    utm: { source: "bio", campaign: "seed" } as any,
  }))

  await prisma.analyticsHit.createMany({ data: hits })

  await prisma.eventLog.createMany({
    data: [
      {
        userId: owner.id,
        type: "ACTION_SUCCESS",
        payload: { action: "sheets.addRow", rowId: "r1" } as any,
      },
      {
        userId: owner.id,
        type: "ACTION_SUCCESS",
        payload: { action: "trello.card.create", cardId: "c1" } as any,
      },
      {
        userId: owner.id,
        type: "ACTION_FAILED",
        payload: { action: "notion.db.appendRow", error: "database not found" } as any,
      },
      {
        userId: owner.id,
        type: "WEBHOOK_INCOMING",
        payload: { provider: "zapier", route: "contact", status: 200 } as any,
      },
      {
        userId: owner.id,
        type: "WEBHOOK_INCOMING",
        payload: { provider: "zapier", route: "contact", status: 401 } as any,
      },
    ],
  })

  console.log("✅ Seed complete.")
  console.log("📊 Created:")
  console.log(`  - 3 users (Jason: Pro Admin, Ava: Free User, Sam: Editor)`)
  console.log(`  - 3 bio pages (@jason, @ava, @studio)`)
  console.log(`  - 14 blocks with A/B testing`)
  console.log(`  - 5 integrations (Google, Notion, Trello, Zapier, OpenAI)`)
  console.log(`  - 6 automation actions`)
  console.log(`  - 4 triggers`)
  console.log(`  - 400 analytics hits`)
  console.log(`  - 5 event logs`)
  console.log("")
  console.log("🔗 Demo pages:")
  console.log("  - http://localhost:3000/jason")
  console.log("  - http://localhost:3000/ava")
  console.log("  - http://localhost:3000/studio")
  console.log("")
  console.log("👤 Demo accounts:")
  console.log("  - demo-owner@connectsync.dev (Admin/Pro)")
  console.log("  - demo-free@connectsync.dev (Free User)")
  console.log("  - demo-editor@connectsync.dev (Editor/Pro)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
