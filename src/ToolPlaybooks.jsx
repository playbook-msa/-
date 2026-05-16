import { useState } from "react";

const NEON = {
  pink: "#FF2D8A",
  pinkGlow: "#FF2D8A",
  cyan: "#00E5FF",
  cyanGlow: "#00E5FF",
  dark: "#050508",
  card: "#0A0A12",
  cardBorder: "#1a1a2e",
  text: "#E8E8F0",
  muted: "#8888AA",
  dimmed: "#555570",
};

const LINK_MAP = [
  { text: "claude.ai", url: "https://claude.ai" },
  { text: "canva.com", url: "https://www.canva.com" },
  { text: "capcut.com", url: "https://www.capcut.com" },
  { text: "slack.com", url: "https://slack.com" },
  { text: "drive.google.com", url: "https://drive.google.com" },
  { text: "sheets.google.com", url: "https://sheets.google.com" },
  { text: "forms.google.com", url: "https://forms.google.com" },
  { text: "discord.com", url: "https://discord.com" },
  { text: "hootsuite.com", url: "https://www.hootsuite.com" },
];

function renderLinkedText(text, accentColor) {
  const parts = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    let earliest = null;
    let earliestIndex = remaining.length;
    for (const link of LINK_MAP) {
      const idx = remaining.indexOf(link.text);
      if (idx !== -1 && idx < earliestIndex) {
        earliest = link;
        earliestIndex = idx;
      }
    }
    if (!earliest) {
      parts.push(remaining);
      break;
    }
    if (earliestIndex > 0) {
      parts.push(remaining.slice(0, earliestIndex));
    }
    parts.push(
      <a
        key={key++}
        href={earliest.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          color: accentColor,
          textDecoration: "none",
          fontWeight: 600,
          borderBottom: `1px solid ${accentColor}50`,
          paddingBottom: 1,
          transition: "all 0.2s",
          textShadow: `0 0 8px ${accentColor}30`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = accentColor;
          e.currentTarget.style.textShadow = `0 0 12px ${accentColor}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = `${accentColor}50`;
          e.currentTarget.style.textShadow = `0 0 8px ${accentColor}30`;
        }}
      >
        {earliest.text} ↗
      </a>
    );
    remaining = remaining.slice(earliestIndex + earliest.text.length);
  }
  return parts;
}

const TOOLS = [
  {
    id: "claude",
    name: "Claude Pro",
    icon: "🧠",
    accent: NEON.pink,
    tagline: "Your AI thinking partner",
    description:
      "Claude is an AI assistant that helps you research, write, brainstorm, analyse data, and build workflows. Think of it as a creative co-pilot that never sleeps.",
    gettingStarted: [
      { step: "Create your account", detail: "Go to claude.ai in your browser. Click 'Sign up' and enter your email address. You'll receive a verification code — enter it to confirm your account. You can also sign up with your Google account for quicker access." },
      { step: "Log in and land on the home screen", detail: "Once signed in, you'll see the main chat interface — a clean text box in the centre of the screen. This is where all your conversations with Claude happen. The left sidebar shows your conversation history." },
      { step: "Understand the sidebar", detail: "On the left you'll see: your recent chats (click any to continue a conversation), a '+ New Chat' button at the top, and a 'Projects' section where you can organise work by client, campaign, or workstream." },
      { step: "Start your first conversation", detail: "Click into the text box and type your first message. Be specific about what you need. Example: 'I'm a content creator in Johannesburg. Help me write 3 Instagram captions for a streetwear brand launch.' Hit Enter or click the send arrow." },
      { step: "Upload files", detail: "Click the paperclip icon next to the text box to upload documents, images, PDFs, or spreadsheets. Claude can read and analyse these — great for reviewing briefs, extracting data, or getting feedback on your work." },
      { step: "Create a Project", detail: "Click 'Projects' in the sidebar then 'New Project'. Name it (e.g., 'Brand Campaign'). Add a description and upload reference files. Every conversation inside a Project shares context, so Claude remembers your brief, brand voice, and past decisions." },
      { step: "Explore key features", detail: "Look for the model selector at the top of the chat — you can switch between different Claude models. Use the star icon to save important conversations. Use the search bar in the sidebar to find past chats by keyword." },
      { step: "Set your preferences", detail: "Click your profile icon (bottom-left) then Settings. Here you can set your display name, manage your subscription, adjust memory preferences (Claude can remember things about you across chats), and set your default response style." },
    ],
    proTips: [
      "Start prompts with the role you want Claude to play: 'You are a senior copywriter at a top Cape Town agency...'",
      "Use Claude to critique your own work — paste your draft and ask 'What's weak about this?'",
      "Chain tasks: research → outline → draft → edit → final — all in one conversation thread.",
      "Upload images, PDFs, spreadsheets — Claude can read and analyse them all.",
      "Use Memory: tell Claude to remember your preferences and project details across sessions.",
      "Never accept the first output. Push back: 'Make it punchier,' 'Cut this in half,' 'Now write it for a Gen Z audience.'",
    ],
    videos: [
      { title: "Getting Started with Claude.ai — Official Tutorial", channel: "Anthropic", duration: "~8 min", url: "https://www.youtube.com/watch?v=0vZ_UVLhSQQ", description: "Anthropic's own walkthrough covering the chat interface, prompting basics, and key features." },
      { title: "Claude AI Tutorial for Beginners (Step-by-Step)", channel: "YouTube Creator", duration: "~15 min", url: "https://www.youtube.com/watch?v=r2vYObllqJU", description: "Hands-on beginner tutorial covering writing emails, summarising documents, and getting real work done." },
      { title: "Full Claude Tutorial: Beginner to Advanced in 19 Minutes", channel: "HubSpot", duration: "19 min", url: "https://www.youtube.com/watch?v=WSPChlfxJyA", description: "Complete guide covering prompting fundamentals through to advanced features like Projects and file uploads." },
      { title: "First Steps to Using Claude AI — Full Beginners Masterclass", channel: "Eliot Arntz", duration: "~25 min", url: "https://www.youtube.com/watch?v=wLt5COnGpe0", description: "Deep-dive masterclass with step-by-step prompts and practical use cases you can follow along with." },
    ],
  },
  {
    id: "canva",
    name: "Canva Pro",
    icon: "🎨",
    accent: NEON.cyan,
    tagline: "Design anything, no design degree needed",
    description:
      "Canva Pro gives you access to premium templates, brand kits, background remover, Magic Design AI, and collaboration features to produce professional visual content fast.",
    gettingStarted: [
      { step: "Create your account", detail: "Go to canva.com and click 'Sign up'. Use your Google account, email, or Facebook to register. If you've been given a Pro team invite, click the invite link in your email — it will automatically add you to the team workspace." },
      { step: "Tour the home screen", detail: "After logging in, you'll see the Canva home page. At the top: a search bar for templates. Below that: 'Recent designs', 'Templates for you', and categories like Social Media, Presentations, Videos. The left sidebar has: Home, Projects, Templates, Brand Kit, Apps, and Trash." },
      { step: "Start your first design", detail: "Click the purple 'Create a design' button (top-right). Choose a preset size (Instagram Post, Presentation, A4 Document, etc.) or enter custom dimensions. This opens the Canva editor." },
      { step: "Navigate the editor", detail: "The editor has: a left panel (Elements, Text, Uploads, Templates, Photos, Videos), your canvas in the centre, and a top toolbar for alignment, transparency, and positioning. Drag elements from the left panel onto your canvas to build your design." },
      { step: "Use templates as starting points", detail: "Click 'Templates' in the left panel and search for your content type (e.g., 'Instagram carousel'). Click a template to apply it, then customise every element — text, colours, images, fonts. Never use a template unchanged." },
      { step: "Set up your Brand Kit", detail: "Click 'Brand Kit' in the left sidebar. Upload your logo, set your brand colours (hex codes), and choose your brand fonts. Now every design can pull from your brand assets with one click — this keeps everything consistent." },
      { step: "Upload your own assets", detail: "Click 'Uploads' in the left panel and drag and drop your photos, logos, or video clips. These stay in your upload library for reuse across all designs. Organise them into folders for easy access." },
      { step: "Export and share", detail: "Click the 'Share' button (top-right) to download (PNG, JPG, PDF, MP4, SVG), share a view/edit link, or present directly. Use 'Magic Resize' (Pro feature) to instantly convert your design to other platform sizes." },
    ],
    proTips: [
      "Use 'Styles' to instantly apply different colour/font combos to any design — great for A/B testing visuals.",
      "Background Remover on product photos = instant professional look.",
      "Create folders per project: pitch decks, social posts, brand assets. Stay organised from day one.",
      "Use Canva Docs for proposals and presentations — they're more dynamic than Google Slides.",
      "Export as SVG for logos and icons to keep them crisp at any size.",
      "Learn keyboard shortcuts: T = text, R = rectangle, L = line, / = search elements. These save hours.",
    ],
    videos: [
      { title: "Full Canva Tutorial 2026 — How to Use Canva for Beginners", channel: "Ronny Deanin", duration: "~30 min", url: "https://www.youtube.com/watch?v=Ryv4Q1qmxHs", description: "Comprehensive updated walkthrough of every Canva feature, effect, and tip for complete beginners." },
      { title: "Canva for Beginners 2026 — Full Step-by-Step Tutorial", channel: "RonDi", duration: "~20 min", url: "https://www.youtube.com/watch?v=hDkYOi2PFEY", description: "Step-by-step tutorial that takes you from overwhelmed to confident — covers the full editor and design workflow." },
      { title: "Canva Full Tutorial for Beginners 2026", channel: "Mikey Ranks", duration: "~25 min", url: "https://www.youtube.com/watch?v=ePAsBUcDLl4", description: "Complete breakdown of Canva's interface, templates, brand kit, and export options for new users." },
      { title: "Canva Tutorial for Beginners — Step by Step", channel: "Natalia Kalinska", duration: "~35 min", url: "https://www.youtube.com/watch?v=BLhoWAALKt0", description: "In-depth walkthrough covering Canva Free and Pro features with practical examples." },
    ],
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    icon: "🎬",
    accent: NEON.pink,
    tagline: "Edit video like a pro, ship content daily",
    description:
      "CapCut Pro is a powerful video editor with AI-powered features: auto-captions, background removal, voice effects, templates, and a massive library of effects, transitions, and music.",
    gettingStarted: [
      { step: "Choose your platform", detail: "Go to capcut.com. You can use CapCut in three ways: Desktop app (download for Windows or Mac — best for longer edits), Browser editor (click 'Edit online' — no download needed), or Mobile app (download from App Store or Google Play for on-the-go editing)." },
      { step: "Create your account", detail: "Click 'Sign up' and register with your email, Google account, or TikTok account. Once signed in, you'll land on the CapCut home screen showing your recent projects, templates, and a 'Create project' button." },
      { step: "Start a new project", detail: "Click 'Create project' (desktop/web) or 'New project' (mobile). This opens the editor. You'll see: a media panel (top-left), a preview window (top-right), and the timeline (bottom). The timeline is where all your editing happens." },
      { step: "Import your media", detail: "Click 'Import' or drag and drop video clips, photos, and audio files into the media panel. Then drag them down onto the timeline to start editing. You can also browse CapCut's free stock video and music library." },
      { step: "Learn the timeline basics", detail: "Your timeline shows your video as horizontal bars. Move the playhead (white vertical line) to navigate. Click 'Split' (scissors icon) to cut clips. Drag clip edges to trim. Drag clips left/right to reorder. Layer clips vertically to overlay." },
      { step: "Add text and captions", detail: "Click 'Text' in the left panel. Choose 'Add text' for manual text, or 'Auto captions' to automatically generate subtitles from speech. Choose a caption style, adjust the timing, and customise the font, size, and colour." },
      { step: "Apply effects and transitions", detail: "Click 'Effects' to browse visual filters. Click 'Transitions' and drag one between two clips on the timeline for smooth scene changes. Click 'Filters' to apply colour grades. Start subtle — less is more." },
      { step: "Export your video", detail: "Click 'Export' (top-right). Choose resolution (1080p recommended), frame rate (30fps for most content), and format. Select the correct aspect ratio: 9:16 for Reels/TikTok, 1:1 for feed posts, 16:9 for YouTube. Click 'Export' and save." },
    ],
    proTips: [
      "Use 'Speed Ramping' for dramatic slow-mo/fast-forward transitions — it's the easiest way to look cinematic.",
      "Layer text animations: headline drops in first, subtext follows 0.5s later. Simple but effective.",
      "Remove video backgrounds with AI — great for product demos and talking-head content.",
      "Save custom presets for your caption style, colour grade, and transitions. Reuse across every video.",
      "Use the beat-sync feature to auto-cut footage to music — perfect for montages and showcase reels.",
      "Always use Auto Captions — 80% of social video is watched on mute.",
    ],
    videos: [
      { title: "CapCut Tutorial for Beginners 2026 — Full Video Editing Guide", channel: "Creator Tutorial", duration: "15 min", url: "https://www.youtube.com/watch?v=j5_471mO14c", description: "Covers the full editor layout, trimming, transitions, captions, filters, audio, and export settings." },
      { title: "CapCut Beginner Tutorial 2026 — Beginner to Pro", channel: "Video Editor", duration: "~20 min", url: "https://www.youtube.com/watch?v=Zv9u0aLkfK0", description: "Takes you from your first project to professional-level edits with effects, keyframes, and animations." },
      { title: "CapCut Video Editing Full Course for Beginners 2026", channel: "Full Course", duration: "~45 min", url: "https://www.youtube.com/watch?v=68KNzsmBarM", description: "Complete course covering everything from basic cuts to advanced motion graphics and AI tools." },
      { title: "CapCut Tutorial for Beginners 2026 — Transitions and AI Tools", channel: "Editor Pro", duration: "~18 min", url: "https://www.youtube.com/watch?v=EMDrgqepVhM", description: "Focused walkthrough of transitions, captions, animations, AI tools, and keyframes for new editors." },
    ],
  },
  {
    id: "slack",
    name: "Slack Pro",
    icon: "💬",
    accent: NEON.cyan,
    tagline: "Your team's central nervous system",
    description:
      "Slack is where async communication happens. Channels keep conversations organised by topic. Threads keep discussions focused. Integrations connect your other tools.",
    gettingStarted: [
      { step: "Accept your workspace invite", detail: "You'll receive an email invitation to join the team Slack workspace. Click 'Join Now' in the email. If you don't have a Slack account yet, you'll be prompted to create one — enter your name, email, and a password." },
      { step: "Download the app", detail: "While Slack works in the browser at slack.com, download the desktop app (Windows/Mac) and mobile app (iOS/Android) for the best experience. The app gives you better notifications, keyboard shortcuts, and faster performance." },
      { step: "Set up your profile", detail: "Click your profile picture (bottom-left on desktop) then 'Edit profile'. Add: a professional photo, your full name, display name, role/title, timezone, and pronouns. A complete profile builds trust with your team." },
      { step: "Understand the sidebar layout", detail: "The left sidebar shows: Direct Messages (private 1-on-1 or group chats), Channels (team conversations organised by topic — each starts with #), Threads (all your active thread replies in one place), and 'More' (saved items, files, people directory)." },
      { step: "Join and browse channels", detail: "Click 'Channels' in the sidebar then 'Browse channels' to see all available channels. Join the ones relevant to your work. Read pinned messages in each channel first — they contain key context, links, and decisions." },
      { step: "Send your first message", detail: "Click into a channel, type in the message box at the bottom, and press Enter to send. To reply to a specific message without cluttering the channel, hover over it and click 'Reply in thread'. Use @name to mention someone directly." },
      { step: "Learn message formatting", detail: "Use *bold* for emphasis, _italic_ for titles, and `code` for technical terms. Click the Aa button for a rich text editor with bullet points, numbered lists, and code blocks. Well-formatted messages get read — walls of text get skipped." },
      { step: "Configure your notifications", detail: "Click your workspace name (top-left) then 'Notification preferences'. Set Do Not Disturb hours (e.g., 8pm to 8am). Choose which channels send you mobile alerts. Mute low-priority channels. Set notification keywords for topics you want to track." },
    ],
    proTips: [
      "Use /remind to set personal reminders: '/remind me to submit draft at 3pm Friday'.",
      "Format messages with bold, code blocks, and bullet points — wall-of-text messages get ignored.",
      "Use Slack's search with filters: 'from:@name in:#channel during:March' finds anything instantly.",
      "Set your status to show what you're working on — it prevents unnecessary interruptions.",
      "Pin important messages, briefs, and resource links in each channel so nothing gets lost.",
      "Star channels you check most — they move to the top of your sidebar for quick access.",
    ],
    videos: [
      { title: "Slack Tutorial for Beginners: The Ultimate Guide 2026", channel: "Tutorial Channel", duration: "~15 min", url: "https://www.youtube.com/watch?v=yejXNXuxYpE", description: "Everything you need to know: channels, direct messages, integrations, and workspace navigation." },
      { title: "How to Use Slack in 2025 — Beginner's Tutorial", channel: "Beginner Guide", duration: "~12 min", url: "https://www.youtube.com/watch?v=yycwB-eZh4A", description: "Step-by-step guide to improving team communication and productivity with Slack." },
      { title: "How To Use Slack For Beginners In 2026 — Full Tutorial", channel: "Full Course", duration: "~20 min", url: "https://www.youtube.com/watch?v=0OisLgd3aaw", description: "Complete beginner walkthrough covering every major feature from sign-up to advanced workflows." },
      { title: "How to Get Slack for Windows — Step-by-Step Setup", channel: "Setup Guide", duration: "~8 min", url: "https://www.youtube.com/watch?v=XDVYWAhI1lM", description: "Quick setup tutorial showing how to download, install, and configure Slack on your desktop." },
    ],
  },
  {
    id: "google",
    name: "Google Workspace",
    icon: "📊",
    accent: NEON.pink,
    tagline: "Collaborate in real time, organise everything",
    description:
      "Google Workspace (Drive, Sheets, Forms) is your backbone for file management, data tracking, and information collection. Shared Drives keep team files accessible, Sheets powers dashboards, Forms captures data.",
    gettingStarted: [
      { step: "Sign in to your Google account", detail: "Go to drive.google.com and sign in with your Google account (or the programme credentials provided to you). If you've been added to a Shared Drive, you'll see it in the left sidebar under 'Shared drives'." },
      { step: "Navigate Google Drive", detail: "The Drive home screen shows: 'My Drive' (your personal files), 'Shared drives' (team spaces), 'Shared with me' (files others sent you), 'Recent' (last-opened files), and 'Starred' (files you've bookmarked). Use the search bar at the top to find anything fast." },
      { step: "Understand Shared Drives", detail: "Shared Drives belong to the team, not individuals. When you upload or create files here, everyone with access can see them. Create folders with clear names: 'Brand_Assets', 'Weekly_Reports', 'Meeting_Notes'. Use a README doc in each folder explaining what goes where." },
      { step: "Create your first Google Sheet", detail: "In Drive, click '+ New' then 'Google Sheets' then 'Blank spreadsheet'. Or go directly to sheets.google.com. You'll see a grid of cells. The toolbar at the top has formatting, formulas, and data tools. Sheets auto-save — you'll never lose work." },
      { step: "Learn Sheets essentials", detail: "Click a cell to select it, type to enter data. Use the formula bar to enter calculations (start with =). Essential formulas: =SUM(A1:A10), =COUNTIF(range, criteria), =IF(condition, true, false). Use the tabs at the bottom to add multiple sheets within one file." },
      { step: "Create your first Google Form", detail: "Go to forms.google.com and click '+ Blank' or choose a template. Add your form title and description. Click '+' to add questions. Choose question types: short answer, multiple choice, dropdown, checkbox, linear scale. Click the purple 'Send' button to share via link or email." },
      { step: "Link Forms to Sheets", detail: "In your Form, click the 'Responses' tab then click the green Sheets icon then 'Create a new spreadsheet'. Now every form submission automatically appears as a new row in your Sheet — this is how you build live dashboards from form data." },
      { step: "Share and collaborate", detail: "Right-click any file then 'Share'. Add people by email and set permissions: Viewer (read-only), Commenter (can comment), or Editor (can change). For documents, use 'Suggesting' mode when editing others' work — it shows tracked changes rather than overwriting." },
    ],
    proTips: [
      "Use Google Sheets as a lightweight database — track content calendars, contact lists, budgets, and project status all in one place.",
      "Conditional formatting in Sheets: colour-code cells by status (green = done, yellow = in progress, red = blocked) for instant visual dashboards.",
      "Forms to Sheets to Charts: collect data via a form, auto-populate a sheet, build charts that update in real time.",
      "Use IMPORTRANGE to pull data between different spreadsheets — great for consolidating team metrics.",
      "Star frequently accessed files and use 'Quick Access' on Drive home to stop wasting time searching.",
      "Use Data Validation in Sheets to create dropdown menus — keeps data consistent across your team.",
    ],
    videos: [
      { title: "Google Workspace Basics — Full Course Tutorial (4 Hours)", channel: "Learnit Training", duration: "~4 hrs", url: "https://www.youtube.com/watch?v=kX8deC_eWgs", description: "Comprehensive course covering Drive, Docs, Sheets, Slides, Forms, and Meet — everything in one video." },
      { title: "Google Sheets Beginner Tutorial — Full Course", channel: "Learnit Training", duration: "~2 hrs", url: "https://www.youtube.com/watch?v=ELi5Am2n_TY", description: "Deep-dive into Sheets: formulas, functions, formatting, charts, pivot tables, and publishing." },
      { title: "How to Connect Google Forms to Google Sheets (Step-by-Step)", channel: "Tutorial Guide", duration: "~10 min", url: "https://www.youtube.com/watch?v=q0-QHrAERME", description: "Quick focused tutorial showing how to link form responses to spreadsheets for live data tracking." },
    ],
  },
  {
    id: "discord",
    name: "Discord Community",
    icon: "🎮",
    accent: NEON.cyan,
    tagline: "Your always-on creative community",
    description:
      "Discord is your community hub for peer connection, real-time voice/video, screen sharing, and async discussion beyond the formal programme channels.",
    gettingStarted: [
      { step: "Create your Discord account", detail: "Go to discord.com and click 'Register'. Enter your email, display name, username, password, and date of birth. Verify your email by clicking the link sent to your inbox. You can use Discord in the browser, but the desktop and mobile apps are recommended." },
      { step: "Download the app", detail: "Click 'Download' at discord.com to get the desktop app (Windows, Mac, or Linux). Also get the mobile app from the App Store or Google Play. The app provides better notifications, voice chat quality, and overall performance." },
      { step: "Join the community server", detail: "You'll receive an invite link (looks like discord.gg/xxxxx). Click it, and you'll be added to the programme's server. The server is the shared space — think of it as a building with many rooms (channels)." },
      { step: "Set up your profile", detail: "Click the gear icon at the bottom-left then 'My Account' then 'Edit User Profile'. Add a recognisable profile picture (your face, not a random meme), a short bio about your creative discipline, and optionally link your other socials." },
      { step: "Navigate the server", detail: "The left panel shows: categories (groups of related channels) and channels within them. Text channels start with # (e.g., #general, #introductions). Voice channels show a speaker icon — click one to join a live audio room. Read #rules and #welcome first." },
      { step: "Send messages and use threads", detail: "Click any text channel, type in the message bar, and press Enter. To start a focused discussion without cluttering the channel, right-click a message then 'Create Thread'. Use @username to mention someone, @here to notify everyone online." },
      { step: "Join voice channels", detail: "Click a voice channel to join instantly. You'll see and hear other people in the channel. Click the screen share icon to show your work. Click the camera icon for video. Click the 'Disconnect' button (phone icon with an X) when you're done." },
      { step: "Set your notifications", detail: "Right-click the server icon then 'Notification Settings'. Set to 'Only @mentions' to reduce noise. For individual channels, right-click then 'Mute Channel' for ones you only check occasionally. Set a custom status to show what you're working on." },
    ],
    proTips: [
      "Set up notification preferences per channel — you don't need alerts for everything.",
      "Use Discord's built-in screen share for quick design reviews and pair editing sessions.",
      "Create temporary voice channels for sprint sessions — accountability through co-presence.",
      "Use the search function with filters: from:, in:, before:, after: to find past discussions.",
      "React to messages with relevant emoji — it builds community energy and shows engagement.",
      "Use Markdown formatting: **bold**, *italic*, ~~strikethrough~~, `code`, and > quotes.",
    ],
    videos: [
      { title: "How to Use Discord in 2026 (Updated)", channel: "Tech Guide", duration: "~15 min", url: "https://www.youtube.com/watch?v=WE3GdR1ULOE", description: "Step-by-step tutorial for chatting, joining servers, and connecting with friends and communities." },
      { title: "How to Use Discord — Complete Beginners Guide", channel: "H2TechVideos", duration: "~12 min", url: "https://www.youtube.com/watch?v=BBBgErz8d54", description: "Full walkthrough of Discord's interface, DMs, servers, voice channels, and settings for new users." },
      { title: "How to Create a Discord Account — Beginner's Guide 2026", channel: "Account Setup", duration: "~8 min", url: "https://www.youtube.com/watch?v=GLElhTFQHzM", description: "Focused guide on account creation, profile setup, and first steps for students and creative teams." },
      { title: "Discord Beginner's Setup Guide 2025", channel: "Setup Guide", duration: "~10 min", url: "https://www.youtube.com/watch?v=Z_WxrUqs8fk", description: "Step-by-step setup tutorial for study groups, remote teams, and creative communities." },
    ],
  },
  {
    id: "hootsuite",
    name: "Hootsuite",
    icon: "🦉",
    accent: NEON.pink,
    tagline: "Schedule, manage, and measure social media",
    description:
      "Hootsuite lets you manage multiple social media accounts from one dashboard. Schedule posts in advance, monitor engagement, track analytics, and collaborate on content calendars.",
    gettingStarted: [
      { step: "Create your account", detail: "Go to hootsuite.com and click 'Start your free trial' or use the team invite link provided to you. Sign up with your email address. Hootsuite offers a 30-day free trial with access to scheduling, monitoring, and analytics — no credit card needed upfront." },
      { step: "Connect your social accounts", detail: "After signing in, Hootsuite will prompt you to connect social networks. Click 'Add a social network' and connect your Instagram, LinkedIn, X/Twitter, Facebook, and/or YouTube accounts one by one. Authorise each platform to grant Hootsuite posting permissions." },
      { step: "Navigate the dashboard", detail: "The main navigation is on the left sidebar: Home (overview), Streams (live feeds), Composer (create posts), Planner (content calendar), Inbox (messages from followers), and Analytics (performance reports). Start by exploring each section to understand what lives where." },
      { step: "Set up Streams", detail: "Click 'Streams' then 'Add Board'. Create columns for different feeds: your own posts, mentions of your brand, hashtags you're tracking, competitor accounts. Streams give you a real-time social listening command centre — everything happening across platforms in one view." },
      { step: "Create your first post", detail: "Click 'Create' (pencil icon) or go to 'Composer'. Select which accounts to post to. Write your caption — customise the text per platform (what works on LinkedIn doesn't work on Instagram). Add media (images or video). Set a date and time, then click 'Schedule'." },
      { step: "Use the Content Calendar", detail: "Click 'Planner' to see your scheduled posts on a visual calendar. Drag and drop posts to reschedule them. Look for gaps — if Tuesday and Thursday are empty, you know where to add content. Colour-coding shows which platforms each post is targeting." },
      { step: "Check your analytics", detail: "Click 'Analytics' to see performance across all connected platforms. Key metrics to watch: impressions, engagement rate, clicks, and follower growth. Compare post performance to identify what content types work best. Export reports as PDF to share with your team." },
      { step: "Explore automation features", detail: "Use 'Best Time to Post' recommendations — Hootsuite analyses when your audience is most active on each platform. Create saved hashtag groups for different content themes so you can paste them in with one click. Set up content approval workflows if working with a team." },
    ],
    proTips: [
      "Batch-schedule a full week of content in one sitting — don't post manually every day.",
      "Use Best Time to Post recommendations — Hootsuite analyses when your audience is most active.",
      "Set up saved hashtag groups for different content themes — paste them in with one click.",
      "Use the Content Calendar view to spot gaps in your posting schedule before they happen.",
      "Create approval workflows if working in a team — nothing goes live without a second pair of eyes.",
      "Focus on engagement rate, not follower count — it tells you if your content actually resonates.",
    ],
    videos: [
      { title: "How to Use Hootsuite in 5 Minutes — Beginner's Guide", channel: "Hootsuite", duration: "5 min", url: "https://www.youtube.com/watch?v=iNtqeh2oVkE", description: "Official quick-start walkthrough of the dashboard, scheduling, and analytics — the perfect first watch." },
      { title: "Hootsuite Tutorial for Beginners 2026 — Step-by-Step", channel: "Tutorial Channel", duration: "~15 min", url: "https://www.youtube.com/watch?v=Q1CvRR-Nmaw", description: "Step-by-step beginner tutorial covering account setup, social connections, and content scheduling." },
      { title: "How to Use Hootsuite in 8 Minutes — Best Social Media Tool", channel: "Quick Guide", duration: "8 min", url: "https://www.youtube.com/watch?v=8CykOEPTow0", description: "Compact overview of Hootsuite's core features for beginners who want to get started immediately." },
      { title: "Hootsuite Tutorial 2025 — Social Media Management", channel: "Social Guide", duration: "~20 min", url: "https://www.youtube.com/watch?v=LnOf3iffePA", description: "Complete walkthrough from connecting accounts to reading analytics and optimising your strategy." },
    ],
  },
];

function NeonBorder({ color, children, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        padding: 1,
        background: `linear-gradient(135deg, ${color}50, transparent 50%, ${color}30)`,
        ...style,
      }}
    >
      <div style={{ borderRadius: 13, background: NEON.card, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

function VideoCard({ video, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: "16px 18px",
        background: hovered ? `${color}10` : NEON.card,
        borderRadius: 12,
        border: `1px solid ${hovered ? color + "40" : NEON.cardBorder}`,
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.25s",
        cursor: "pointer",
        boxShadow: hovered ? `0 0 20px ${color}15` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${NEON.pink}, ${NEON.pink}AA)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
            color: "#fff",
            boxShadow: `0 0 12px ${NEON.pink}40`,
          }}
        >
          ▶
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, color: NEON.text, lineHeight: 1.3 }}>
            {video.title}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color, fontWeight: 600 }}>{video.channel}</span>
            <span style={{ fontSize: 11, color: NEON.dimmed }}>•</span>
            <span style={{ fontSize: 11, color: NEON.muted }}>{video.duration}</span>
          </div>
          <div style={{ color: NEON.muted, fontSize: 12, lineHeight: 1.5 }}>{video.description}</div>
        </div>
      </div>
    </a>
  );
}

export default function ToolPlaybooks() {
  const [activeTool, setActiveTool] = useState("claude");
  const [activeTab, setActiveTab] = useState("gettingstarted");
  const [expandedSteps, setExpandedSteps] = useState({});

  const tool = TOOLS.find((t) => t.id === activeTool);
  const accent = tool.accent;

  const toggleStep = (index) => {
    const key = `${activeTool}-${index}`;
    setExpandedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const isStepExpanded = (index) => expandedSteps[`${activeTool}-${index}`] !== false;

  return (
    <div style={{ fontFamily: "'Rajdhani', 'DM Sans', sans-serif", background: NEON.dark, color: NEON.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;500;700;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* === HEADER === */}
      <div style={{ position: "relative", padding: "36px 24px 28px", borderBottom: `1px solid ${NEON.pink}25`, overflow: "hidden" }}>
        {/* Glow backdrop */}
        <div style={{ position: "absolute", top: -60, left: "30%", width: 300, height: 200, background: `radial-gradient(ellipse, ${NEON.pink}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -40, right: "20%", width: 250, height: 180, background: `radial-gradient(ellipse, ${NEON.cyan}10 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, letterSpacing: 4, color: NEON.cyan, textTransform: "uppercase", marginBottom: 10, textShadow: `0 0 10px ${NEON.cyan}60` }}>
            Mutiny SA Programme
          </div>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 32, fontWeight: 900, margin: "0 0 6px", color: NEON.pink, textShadow: `0 0 30px ${NEON.pink}50, 0 0 60px ${NEON.pink}20`, letterSpacing: 2 }}>
            TOOL PLAYBOOKS
          </h1>
          <p style={{ color: NEON.muted, margin: 0, fontSize: 15, fontWeight: 500, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1 }}>
            Your guide to every platform · 7 tools · Built for creators
          </p>

          {/* Neon line */}
          <div style={{ marginTop: 20, height: 2, background: `linear-gradient(90deg, ${NEON.cyan}, ${NEON.pink}, transparent)`, borderRadius: 1, boxShadow: `0 0 8px ${NEON.cyan}40` }} />
        </div>
      </div>

      {/* === TOOL NAV === */}
      <div style={{ padding: "14px 24px", borderBottom: `1px solid ${NEON.cardBorder}`, overflowX: "auto" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 6, minWidth: "max-content" }}>
          {TOOLS.map((t) => {
            const isActive = t.id === activeTool;
            return (
              <button
                key={t.id}
                onClick={() => { setActiveTool(t.id); setActiveTab("gettingstarted"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8,
                  border: isActive ? `1px solid ${t.accent}60` : `1px solid ${NEON.cardBorder}`,
                  background: isActive ? `${t.accent}15` : NEON.card,
                  color: isActive ? t.accent : NEON.muted,
                  cursor: "pointer", fontSize: 13, fontWeight: isActive ? 700 : 500,
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.5,
                  transition: "all 0.25s", whiteSpace: "nowrap",
                  boxShadow: isActive ? `0 0 15px ${t.accent}20, inset 0 0 15px ${t.accent}08` : "none",
                  textShadow: isActive ? `0 0 8px ${t.accent}50` : "none",
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* === TOOL HEADER === */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: `${accent}15`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0,
            border: `1px solid ${accent}40`, boxShadow: `0 0 20px ${accent}20`,
          }}>
            {tool.icon}
          </div>
          <div>
            <h2 style={{ margin: "0 0 3px", fontSize: 24, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: NEON.text, letterSpacing: 1 }}>
              {tool.name}
            </h2>
            <p style={{ margin: 0, color: accent, fontSize: 14, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: 0.5, textShadow: `0 0 8px ${accent}40` }}>
              {tool.tagline}
            </p>
          </div>
        </div>
        <p style={{ color: NEON.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 20px", fontFamily: "'DM Sans', sans-serif" }}>
          {tool.description}
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${NEON.cardBorder}` }}>
          {[
            { key: "gettingstarted", label: "🚀 GETTING STARTED" },
            { key: "protips", label: "💡 PRO TIPS" },
            { key: "videos", label: "🎥 VIDEOS" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "11px 20px", background: "none", border: "none",
                  borderBottom: isActive ? `2px solid ${accent}` : "2px solid transparent",
                  color: isActive ? accent : NEON.dimmed,
                  cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
                  fontFamily: "'Rajdhani', sans-serif", transition: "all 0.25s",
                  textShadow: isActive ? `0 0 10px ${accent}40` : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* === TAB CONTENT === */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 40px" }}>

        {activeTab === "gettingstarted" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "13px 18px", background: `${accent}08`, borderRadius: 10, border: `1px solid ${accent}25`, marginBottom: 8 }}>
              <p style={{ margin: 0, color: accent, fontSize: 13, fontWeight: 600, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.5 }}>
                📋 Follow these {tool.gettingStarted.length} steps in order — from creating your account to navigating the platform like a pro. Tap any step to expand.
              </p>
            </div>
            {tool.gettingStarted.map((item, i) => {
              const expanded = isStepExpanded(i);
              return (
                <div
                  key={`${activeTool}-${i}`}
                  onClick={() => toggleStep(i)}
                  style={{
                    padding: "15px 18px", background: NEON.card, borderRadius: 12,
                    border: `1px solid ${expanded ? accent + "30" : NEON.cardBorder}`,
                    cursor: "pointer", transition: "all 0.25s",
                    boxShadow: expanded ? `0 0 15px ${accent}08` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: `${accent}18`,
                      color: accent, display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Orbitron', monospace", fontSize: 13, fontWeight: 700, flexShrink: 0,
                      border: `1px solid ${accent}30`, textShadow: `0 0 6px ${accent}50`,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: NEON.text, flex: 1, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.3 }}>
                      {item.step}
                    </div>
                    <span style={{ color: NEON.dimmed, fontSize: 11, transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                      ▼
                    </span>
                  </div>
                  {expanded && (
                    <div style={{ marginTop: 12, marginLeft: 44, color: NEON.muted, fontSize: 13, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                      {renderLinkedText(item.detail, accent)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "protips" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {tool.proTips.map((tip, i) => (
              <div
                key={i}
                style={{
                  padding: "15px 18px", background: NEON.card, borderRadius: 12,
                  border: `1px solid ${NEON.cardBorder}`, borderLeft: `3px solid ${accent}70`,
                  color: `${NEON.text}CC`, fontSize: 13, lineHeight: 1.7,
                  display: "flex", gap: 12, alignItems: "flex-start",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `inset 3px 0 12px ${accent}08`,
                }}
              >
                <span style={{ color: accent, fontSize: 16, flexShrink: 0, marginTop: -1, textShadow: `0 0 8px ${accent}50` }}>⚡</span>
                {tip}
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: "13px 18px", background: `${accent}08`, borderRadius: 10, border: `1px solid ${accent}25`, marginBottom: 4 }}>
              <p style={{ margin: 0, color: accent, fontSize: 13, fontWeight: 600, fontFamily: "'Rajdhani', sans-serif", letterSpacing: 0.5 }}>
                🎥 Watch these tutorials to see {tool.name} in action. Start with the first video. Click any card to open on YouTube.
              </p>
            </div>
            {tool.videos.map((video, i) => (
              <VideoCard key={i} video={video} color={accent} />
            ))}
          </div>
        )}
      </div>

      {/* === FOOTER === */}
      <div style={{ padding: "24px", borderTop: `1px solid ${NEON.cardBorder}`, textAlign: "center", position: "relative" }}>
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${NEON.cyan}40, ${NEON.pink}40, transparent)`, position: "absolute", top: 0, left: "10%", right: "10%", borderRadius: 1 }} />
        <p style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, color: NEON.dimmed, margin: 0, letterSpacing: 3, textTransform: "uppercase" }}>
          Mutiny SA · ALX Creative Economy · 2026
        </p>
      </div>
    </div>
  );
}
