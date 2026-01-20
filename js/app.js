// === DATA ===
const videos = [
  {
    id: "2026_01_19_claude_code_iphone",
    folder: "2026-01-19-claude-code-iphone",
    title: "Run Claude Code From Your iPhone",
    duration: "01:37",
    orientation: "vertical",
    status: "synced",
    tags: ["claude code", "tailscale", "blink shell", "mobile development", "iphone coding"],
    social: {
      hook: "Claude Code on your phone",
      seo_title: "How to Run Claude Code on iPhone with Tailscale & Blink",
      seo_description: "Set up Claude Code on your iPhone using Tailscale VPN and Blink SSH to control your terminal agent remotely for DevOps automation and coding on the go",
      hashtags: "#claudecode #tailscale #blink #mobiledev #ai #devops #hoffdigital"
    }
  },
  {
    id: "2026_01_19_automate_video_processing",
    folder: "2026-01-19-automate-video-processing-with-claude-ai",
    title: "Automate Video Processing with Claude AI",
    duration: "01:29",
    orientation: "horizontal",
    status: "ready",
    tags: ["automation", "claude-ai", "video-processing", "content-creation", "workflow"],
    social: {
      hook: "Automate your content workflow",
      seo_title: "Automate Video Processing with Claude AI",
      seo_description: "Demonstration of an automated workflow using Claude to process videos, extracting transcripts, audio, and metadata from iCloud files.",
      hashtags: "#automation #claudeai #contentcreation #workflow #ai #hoffdigital"
    }
  },
  {
    id: "2026_01_19_voice_notes",
    folder: "2026-01-19-i-processed-680-voice-notes-with-ai",
    title: "I Processed 680 Voice Notes with AI",
    duration: "01:10",
    orientation: "horizontal",
    status: "ready",
    tags: ["voice-notes", "ai", "automation", "transcription", "productivity"],
    social: {
      hook: "680 voice notes, one script",
      seo_title: "I Processed 680 Voice Notes with AI",
      seo_description: "How I used Whisper and Claude to automatically transcribe and organize 680 voice notes into searchable content.",
      hashtags: "#voicenotes #whisper #ai #productivity #automation #hoffdigital"
    }
  }
];

// === STATE ===
let currentView = 'all';
let expandedRow = null;

// === SIDEBAR ===
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

function collapseSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('collapsed');
  const toggle = sidebar.querySelector('.sidebar__toggle');
  toggle.textContent = '▶';
  toggle.onclick = expandSidebar;
}

function expandSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('collapsed');
  const toggle = sidebar.querySelector('.sidebar__toggle');
  toggle.textContent = '◀';
  toggle.onclick = collapseSidebar;
}

// === UTILS ===
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1500);
}

function copy(text, e) {
  e.stopPropagation();
  navigator.clipboard.writeText(text).then(() => toast('Copied!'));
}

function copyAll(id, e) {
  e.stopPropagation();
  const v = videos.find(v => v.id === id);
  if (!v) return;
  const text = `${v.social.hook}\n\n${v.social.seo_description}\n\n${v.social.hashtags}`;
  navigator.clipboard.writeText(text).then(() => toast('Copied all for TikTok!'));
}

// === FILTERING ===
function filterVideos() {
  switch (currentView) {
    case 'ready': return videos.filter(v => v.status === 'ready');
    case 'synced': return videos.filter(v => v.status === 'synced');
    case 'vertical': return videos.filter(v => v.orientation === 'vertical');
    case 'horizontal': return videos.filter(v => v.orientation === 'horizontal');
    default: return videos;
  }
}

function getViewTitle() {
  const titles = {
    all: 'All Videos',
    ready: 'Ready to Post',
    synced: 'Synced to Phone',
    vertical: 'Vertical Videos',
    horizontal: 'Horizontal Videos'
  };
  return titles[currentView] || 'All Videos';
}

// === RENDER ===
function renderRow(v, idx) {
  const date = v.folder.slice(0, 10);
  const orientPill = v.orientation === 'vertical'
    ? '<span class="pill pill-purple">Vertical</span>'
    : '<span class="pill pill-blue">Horizontal</span>';
  const statusPill = v.status === 'synced'
    ? '<span class="pill pill-green">Synced</span>'
    : '<span class="pill pill-yellow">Ready</span>';

  return `
    <tr data-id="${v.id}" onclick="toggleRow('${v.id}')">
      <td>${idx + 1}</td>
      <td class="cell-date">${date}</td>
      <td class="cell-text">${v.social.hook}</td>
      <td class="cell-title">${v.title}</td>
      <td class="cell-duration">${v.duration}</td>
      <td>${orientPill}</td>
      <td>${statusPill}</td>
      <td>
        <button class="copy-btn" onclick="copyAll('${v.id}', event)">Copy All</button>
      </td>
    </tr>
    <tr class="row-detail" id="detail-${v.id}">
      <td colspan="8">
        <div class="detail-grid">
          <div class="detail-field">
            <span class="detail-label">Hook / Caption</span>
            <div class="detail-value">${v.social.hook}</div>
          </div>
          <div class="detail-field">
            <span class="detail-label">SEO Title</span>
            <div class="detail-value">${v.social.seo_title}</div>
          </div>
          <div class="detail-field detail-full">
            <span class="detail-label">Description</span>
            <div class="detail-value">${v.social.seo_description}</div>
          </div>
          <div class="detail-field detail-full">
            <span class="detail-label">Hashtags</span>
            <div class="detail-value">${v.social.hashtags}</div>
          </div>
          <div class="detail-field detail-full">
            <span class="detail-label">Tags</span>
            <div class="tags">${v.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
          <div class="detail-actions detail-full">
            <button class="btn" onclick="copy('${escape(v.social.hook)}', event)">Copy Hook</button>
            <button class="btn" onclick="copy('${escape(v.social.seo_title)}', event)">Copy Title</button>
            <button class="btn" onclick="copy('${escape(v.social.seo_description)}', event)">Copy Description</button>
            <button class="btn" onclick="copy('${escape(v.social.hashtags)}', event)">Copy Hashtags</button>
            <button class="btn btn-primary" onclick="copyAll('${v.id}', event)">Copy All for TikTok</button>
          </div>
        </div>
      </td>
    </tr>
  `;
}

function escape(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, "\\n");
}

function render() {
  const filtered = filterVideos();
  document.getElementById('view-title').textContent = getViewTitle();
  document.getElementById('video-count').textContent = `${filtered.length} videos`;
  document.getElementById('video-list').innerHTML = filtered.map(renderRow).join('');
}

// === INTERACTIONS ===
function toggleRow(id) {
  const detail = document.getElementById(`detail-${id}`);
  const row = document.querySelector(`tr[data-id="${id}"]`);

  // Close previous
  if (expandedRow && expandedRow !== id) {
    document.getElementById(`detail-${expandedRow}`)?.classList.remove('open');
    document.querySelector(`tr[data-id="${expandedRow}"]`)?.classList.remove('row-expanded');
  }

  // Toggle current
  if (expandedRow === id) {
    detail.classList.remove('open');
    row.classList.remove('row-expanded');
    expandedRow = null;
  } else {
    detail.classList.add('open');
    row.classList.add('row-expanded');
    expandedRow = id;
  }
}

function setView(view) {
  currentView = view;
  document.body.className = `view-${view}`;
  expandedRow = null;
  render();
  closeSidebar(); // Close on mobile after selecting
}

// === INIT ===
document.addEventListener('DOMContentLoaded', render);
