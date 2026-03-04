import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Send, Paperclip, Mic, Settings, Home, MessageSquare, FolderOpen,
  Film, User, ChevronRight, X, Image, Volume2, ChevronDown, Search,
  CreditCard, Bell, LogOut, Star, Play, Eye, RotateCcw, Download,
  FileText, Layers, Users, Globe, Sparkles, Menu, Grid3x3, List,
  Lock, HelpCircle, Check, AlertTriangle
} from 'lucide-react'
import './mobile.css'

// ===== SHARED DATA (从 App.jsx 导入) =====
import {
  PROJECTS, TEMPLATES, INITIAL_MESSAGES, AGENT_REPLIES,
  ScoreBadge, GradeBadge, CardBtn, HelpTip
} from './App'

// ===== MOBILE COMPONENTS =====

// Bottom Tab 导航
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'chat', icon: MessageSquare, label: '会话' },
    { id: 'tree', icon: FolderOpen, label: '项目' },
    { id: 'assets', icon: Film, label: '资源' },
    { id: 'profile', icon: User, label: '我的' },
  ]

  return (
    <div className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <motion.div
            key={tab.id}
            className={`tab-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span>{tab.label}</span>
            {tab.id === 'chat' && <div className="tab-badge">3</div>}
          </motion.div>
        )
      })}
    </div>
  )
}

// 顶部导航栏
function TopBar({ title, onMenu, onBack, showBack }) {
  return (
    <div className="top-bar">
      {showBack && (
        <button className="top-bar-btn" onClick={onBack}>
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
      )}
      <h1 className="top-bar-title">{title}</h1>
      <button className="top-bar-btn" onClick={onMenu}>
        <Menu size={20} />
      </button>
    </div>
  )
}

// Bottom Sheet 抽屉
function BottomSheet({ isOpen, onClose, title, children, maxHeight = '70vh' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="bottom-sheet"
            style={{ maxHeight }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-handle" />
              <h2>{title}</h2>
              <button onClick={onClose}><X size={20} /></button>
            </div>
            <div className="bottom-sheet-content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// 首页 - 项目列表
function HomePage({ onCreateProject, onOpenProject }) {
  return (
    <div className="mobile-page">
      {/* 快速创建入口 */}
      <motion.div
        className="create-project-card"
        whileTap={{ scale: 0.98 }}
        onClick={onCreateProject}
      >
        <div className="create-icon">
          <Plus size={28} />
        </div>
        <div>
          <h3>创建新项目</h3>
          <p>从模板开始或自定义创作</p>
        </div>
        <ChevronRight size={20} />
      </motion.div>

      {/* 项目列表 */}
      <div className="section-header">
        <h2>我的项目</h2>
        <span className="count">{PROJECTS.length}</span>
      </div>
      
      <div className="project-grid">
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={proj.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenProject(proj)}
          >
            <div className="project-icon">{proj.icon}</div>
            <div className="project-info">
              <h3>{proj.name}</h3>
              <div className="project-meta">
                <span className="genre">{proj.genre}</span>
                <span className="episodes">{proj.episodes}集</span>
              </div>
            </div>
            {proj.active && <div className="active-badge">进行中</div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 会话页 - 聊天界面
function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = {
      id: Date.now(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMsg])
    setInput('')
  }

  return (
    <div className="mobile-page chat-page">
      <div className="chat-messages">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-bar">
        <button className="icon-btn"><Paperclip size={20} /></button>
        <input
          type="text"
          placeholder="输入消息..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
        />
        <button className="icon-btn"><Mic size={20} /></button>
        <button className="send-btn" onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}

// 聊天消息组件（适配移动端）
function ChatMessage({ message }) {
  if (message.role === 'user') {
    return (
      <div className="msg msg-user">
        <div className="msg-bubble">{message.text}</div>
        <span className="msg-time">{message.time}</span>
      </div>
    )
  }

  return (
    <div className="msg msg-agent">
      <div className="msg-avatar">🤖</div>
      <div className="msg-content">
        {message.text && <div className="msg-bubble">{message.text}</div>}
        
        {/* 评分 */}
        {message.scores && (
          <div className="score-strip-mobile">
            {message.scores.map((s, i) => (
              <div key={i} className="score-item">
                <span className="score-icon">{s.icon}</span>
                <span className="score-label">{s.label}</span>
                <span className="score-value">{s.score}</span>
              </div>
            ))}
          </div>
        )}

        {/* 等级 */}
        {message.grade && <div className="grade-badge-mobile">{message.grade}</div>}

        {/* 卡片 */}
        {message.card && <MobileCard card={message.card} />}

        {/* 建议按钮 */}
        {message.suggestions && (
          <div className="suggestions-mobile">
            {message.suggestions.map((s, i) => (
              <button key={i} className="suggestion-btn">{s}</button>
            ))}
          </div>
        )}

        <span className="msg-time">{message.time}</span>
      </div>
    </div>
  )
}

// 移动端卡片组件（适配2列布局）
function MobileCard({ card }) {
  switch (card.type) {
    case 'episode':
      return <EpisodeCardMobile card={card} />
    case 'storyboard-progress':
      return <StoryboardProgressMobile card={card} />
    case 'shot-detail':
      return <ShotDetailMobile card={card} />
    case 'gate-review':
      return <GateReviewMobile card={card} />
    case 'worldview':
      return <WorldviewMobile card={card} />
    case 'full-outline':
      return <FullOutlineMobile card={card} />
    default:
      return null
  }
}

// 剧集卡片（移动端）
function EpisodeCardMobile({ card }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mobile-card">
      <div className="card-header">
        <FileText size={14} />
        <span>{card.title}</span>
      </div>
      <div className="card-body">
        <div className="card-section">
          <strong className="hook-label">开篇钩子</strong>
          <p className="hook-text">{card.hook}</p>
        </div>
        {expanded && (
          <div className="card-section">
            <strong>正文</strong>
            <p className="body-preview">[ {card.wordCount.toLocaleString()} 字 ]</p>
          </div>
        )}
        <div className="card-section">
          <strong className="cliff-label">结尾悬念</strong>
          <p className="cliff-text">{card.cliff}</p>
        </div>
        <button 
          className="expand-btn" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起' : '展开全文'}
        </button>
      </div>
    </div>
  )
}

// 分镜进度卡片（移动端 - 2列网格）
function StoryboardProgressMobile({ card }) {
  return (
    <div className="mobile-card">
      <div className="card-header">
        <Film size={14} />
        <span>{card.title}</span>
        <span className="card-badge">{card.shots.filter(s => s.status === 'done').length}/{card.total}</span>
      </div>
      <div className="storyboard-grid-mobile">
        {card.shots.map((shot, i) => (
          <motion.div
            key={shot.id}
            className={`shot-card-mobile ${shot.status}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div 
              className="shot-preview" 
              style={{ background: `linear-gradient(135deg, ${shot.color}, ${shot.color}dd)` }}
            >
              🎬
              <ShotStatusBadge status={shot.status} />
            </div>
            <div className="shot-info">
              <div className="shot-id">{shot.id}</div>
              <div className="shot-meta">{shot.cam} · {shot.dur}</div>
              <div className="shot-desc">{shot.desc}</div>
              {shot.progress && (
                <div className="shot-progress">
                  <div className="progress-bar" style={{ width: `${shot.progress}%` }} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 分镜详情卡片（移动端）
function ShotDetailMobile({ card }) {
  const { shot } = card

  return (
    <div className="mobile-card">
      <div className="card-header">
        <Film size={14} />
        <span>{shot.id} · {shot.desc}</span>
        {shot.isNew && <span className="new-badge">NEW</span>}
      </div>
      <div className="card-body">
        <div className="shot-detail-preview" style={{ background: shot.color }}>
          🎬
        </div>
        <div className="shot-detail-info">
          <div className="info-row">
            <span className="label">景别</span>
            <span className="value">{shot.cam}</span>
          </div>
          <div className="info-row">
            <span className="label">时长</span>
            <span className="value">{shot.dur}</span>
          </div>
          <div className="info-row">
            <span className="label">情绪</span>
            <span className="value">{shot.emotion}</span>
          </div>
          {shot.movement && (
            <div className="info-row">
              <span className="label">运镜</span>
              <span className="value">{shot.movement}</span>
            </div>
          )}
        </div>
        <p className="shot-description">{shot.description}</p>

        {/* 角色 */}
        {shot.characters && (
          <div className="char-list-mobile">
            {shot.characters.map((char, i) => (
              <div key={i} className="char-chip">
                <span className="char-emoji">{char.emoji}</span>
                <span className="char-name">{char.name}</span>
                <span className="char-lora">{char.lora}</span>
              </div>
            ))}
          </div>
        )}

        {/* 配音（可横向滚动） */}
        {shot.audio && (
          <div className="audio-list-mobile">
            {shot.audio.map((a, i) => (
              <div key={i} className="audio-item">
                <span className="audio-type">{a.type}</span>
                {a.char && <span className="audio-char">{a.char}</span>}
                <p className="audio-text">{a.text}</p>
              </div>
            ))}
          </div>
        )}

        {shot.progress && (
          <div className="generating-mobile">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${shot.progress}%` }} />
            </div>
            <span className="eta">⏳ {shot.eta}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Gate审核卡片（移动端）
function GateReviewMobile({ card }) {
  return (
    <div className={`mobile-card gate-card ${card.passed ? 'passed' : 'failed'}`}>
      <div className="card-header">
        <div className="gate-icon">{card.passed ? '✅' : '❌'}</div>
        <div>
          <div className="gate-stage">{card.stage}</div>
          <div className="gate-score">总分 {card.totalScore}</div>
        </div>
      </div>
      <div className="card-body">
        <div className="dimensions-mobile">
          {card.dimensions.map((d, i) => (
            <div key={i} className="dimension-item">
              <span className="dim-icon">{d.icon}</span>
              <span className="dim-label">{d.label}</span>
              <span className="dim-score">{d.score}</span>
            </div>
          ))}
        </div>
        {card.issues && card.issues.length > 0 && (
          <div className="issues-mobile">
            <strong>需要改进：</strong>
            {card.issues.map((issue, i) => (
              <div key={i} className="issue-item">
                <AlertTriangle size={12} />
                <span>{issue.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 世界观卡片（移动端）
function WorldviewMobile({ card }) {
  return (
    <div className="mobile-card">
      <div className="card-header">
        <Globe size={14} />
        <span>{card.title}</span>
      </div>
      <div className="card-body">
        {card.sections.map((section, i) => (
          <div key={i} className="worldview-section">
            <div className="section-title" style={{ color: section.color }}>
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </div>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 大纲卡片（移动端 - 可滚动）
function FullOutlineMobile({ card }) {
  const [expandedArc, setExpandedArc] = useState(0)

  return (
    <div className="mobile-card">
      <div className="card-header">
        <FileText size={14} />
        <span>{card.title}</span>
      </div>
      <div className="card-body">
        {card.arcs.map((arc, arcIdx) => (
          <div key={arcIdx} className="arc-section">
            <div 
              className="arc-header"
              onClick={() => setExpandedArc(expandedArc === arcIdx ? -1 : arcIdx)}
            >
              <strong>{arc.name}</strong>
              <ChevronDown 
                size={16} 
                style={{ 
                  transform: expandedArc === arcIdx ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            <AnimatePresence>
              {expandedArc === arcIdx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="episodes-list"
                >
                  {arc.episodes.map(ep => (
                    <div key={ep.ep} className="episode-item">
                      <div className="ep-number">第{ep.ep}集</div>
                      <div className="ep-title">{ep.title}</div>
                      <div className="ep-meta">
                        <span className="ep-hook">🎣 {ep.hook}</span>
                        <span className="ep-cliff">🪝 {ep.cliff}</span>
                      </div>
                      {ep.grade && <GradeBadge grade={ep.grade} />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

// 状态Badge（用于分镜）
function ShotStatusBadge({ status }) {
  const map = {
    done: { bg: 'var(--success-bg)', color: 'var(--success)', text: '✅' },
    generating: { bg: 'var(--warning-bg)', color: 'var(--warning)', text: '⏳' },
    queued: { bg: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', text: '📝' },
  }
  const s = map[status] || map.queued
  return (
    <span className="shot-status-badge" style={{ background: s.bg, color: s.color }}>
      {s.text}
    </span>
  )
}

// 项目树页面
function TreePage() {
  const [expanded, setExpanded] = useState(['world', 'outline', 'arc3', 'ep9'])

  const toggleNode = (id) => {
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const treeData = [
    { id: 'world', icon: '🌍', label: '世界观', badge: 'v2', children: [
      { id: 'rules', icon: '📜', label: '修仙世界规则' },
      { id: 'factions', icon: '⚔️', label: '势力与冲突' },
    ]},
    { id: 'outline', icon: '📋', label: '大纲', badge: '3章12集', children: [
      { id: 'arc1', icon: '📖', label: 'Arc 1: 觉醒篇', badge: '4/4' },
      { id: 'arc2', icon: '📖', label: 'Arc 2: 磨砺篇', badge: '4/4' },
      { id: 'arc3', icon: '🔥', label: 'Arc 3: 逆袭篇', badge: '1/4', children: [
        { id: 'ep9', icon: '📄', label: '第9集 · 破境逆袭', badge: 'A', children: [
          { id: 'ep9-text', icon: '📝', label: '文本 v2' },
          { id: 'ep9-sb', icon: '🎬', label: '分镜 12 shots' },
          { id: 'ep9-vid', icon: '🎥', label: '完整视频' },
        ]},
        { id: 'ep10', icon: '📄', label: '第10集 · 魔神之约' },
        { id: 'ep11', icon: '📄', label: '第11集 · 荒古禁地' },
        { id: 'ep12', icon: '📄', label: '第12集 · 终极逆天' },
      ]},
    ]},
    { id: 'characters', icon: '👥', label: '角色', badge: '8', children: [
      { id: 'char1', icon: '🧑', label: '林凡 v3' },
      { id: 'char2', icon: '😈', label: '齐远 v1' },
      { id: 'char3', icon: '👩', label: '苏婉儿 v2' },
    ]},
  ]

  const renderTree = (nodes, depth = 0) => {
    return nodes.map(node => {
      const isExpanded = expanded.includes(node.id)
      const hasChildren = node.children && node.children.length > 0

      return (
        <div key={node.id} className="tree-node" style={{ paddingLeft: depth * 16 }}>
          <div className="tree-node-header" onClick={() => hasChildren && toggleNode(node.id)}>
            {hasChildren && (
              <ChevronRight 
                size={14} 
                style={{ 
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s'
                }}
              />
            )}
            <span className="tree-icon">{node.icon}</span>
            <span className="tree-label">{node.label}</span>
            {node.badge && <span className="tree-badge">{node.badge}</span>}
          </div>
          <AnimatePresence>
            {isExpanded && hasChildren && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {renderTree(node.children, depth + 1)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    })
  }

  return (
    <div className="mobile-page tree-page">
      <div className="tree-container">
        {renderTree(treeData)}
      </div>
    </div>
  )
}

// 资源库页面
function AssetsPage() {
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [category, setCategory] = useState('all') // 'all' | 'image' | 'video' | 'lora' | 'audio'

  const assets = [
    { id: 1, type: 'image', name: '林凡-筑基期.png', thumb: '🖼️', size: '2.4 MB' },
    { id: 2, type: 'video', name: 'S01_01.mp4', thumb: '🎬', size: '15 MB' },
    { id: 3, type: 'lora', name: '林凡-v3.safetensors', thumb: '🎭', size: '144 MB' },
    { id: 4, type: 'audio', name: '林凡-配音-少年清冽.mp3', thumb: '🔊', size: '3.2 MB' },
    { id: 5, type: 'image', name: '齐远-内门弟子.png', thumb: '🖼️', size: '2.1 MB' },
    { id: 6, type: 'video', name: 'S02_01.mp4', thumb: '🎬', size: '18 MB' },
  ]

  const filteredAssets = category === 'all' 
    ? assets 
    : assets.filter(a => a.type === category)

  return (
    <div className="mobile-page assets-page">
      {/* 分类筛选 */}
      <div className="category-tabs">
        {[
          { id: 'all', label: '全部', icon: '📁' },
          { id: 'image', label: '图片', icon: '🖼️' },
          { id: 'video', label: '视频', icon: '🎬' },
          { id: 'lora', label: 'LoRA', icon: '🎭' },
          { id: 'audio', label: '音频', icon: '🔊' },
        ].map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 视图切换 */}
      <div className="view-toggle">
        <button 
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          <Grid3x3 size={16} />
        </button>
        <button 
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
        >
          <List size={16} />
        </button>
      </div>

      {/* 资源列表 */}
      {viewMode === 'grid' ? (
        <div className="assets-grid">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="asset-card">
              <div className="asset-thumb">{asset.thumb}</div>
              <div className="asset-info">
                <div className="asset-name">{asset.name}</div>
                <div className="asset-size">{asset.size}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="assets-list">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="asset-list-item">
              <div className="asset-thumb-small">{asset.thumb}</div>
              <div className="asset-info-list">
                <div className="asset-name">{asset.name}</div>
                <div className="asset-size">{asset.size}</div>
              </div>
              <button className="asset-action-btn">⋯</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 个人中心页面
function ProfilePage() {
  return (
    <div className="mobile-page profile-page">
      {/* 用户信息 */}
      <div className="profile-header">
        <div className="avatar">👤</div>
        <div className="user-info">
          <h2>STORYA用户</h2>
          <div className="vip-badge">💎 专业版</div>
        </div>
      </div>

      {/* Credits */}
      <div className="credits-card">
        <div className="credits-item">
          <div className="credits-label">文本生成</div>
          <div className="credits-value">12,500 <span className="unit">credits</span></div>
        </div>
        <div className="credits-item">
          <div className="credits-label">视频合成</div>
          <div className="credits-value">3,200 <span className="unit">credits</span></div>
        </div>
        <button className="recharge-btn">
          <CreditCard size={16} />
          <span>充值</span>
        </button>
      </div>

      {/* 菜单列表 */}
      <div className="menu-list">
        <MenuItem icon={<Star size={20} />} label="我的收藏" badge="8" />
        <MenuItem icon={<Bell size={20} />} label="通知设置" />
        <MenuItem icon={<Settings size={20} />} label="偏好设置" />
        <MenuItem icon={<HelpCircle size={20} />} label="帮助中心" />
        <MenuItem icon={<Lock size={20} />} label="隐私政策" />
        <MenuItem icon={<LogOut size={20} />} label="退出登录" danger />
      </div>
    </div>
  )
}

function MenuItem({ icon, label, badge, danger }) {
  return (
    <div className={`menu-item ${danger ? 'danger' : ''}`}>
      <div className="menu-icon">{icon}</div>
      <div className="menu-label">{label}</div>
      {badge && <div className="menu-badge">{badge}</div>}
      <ChevronRight size={16} className="menu-arrow" />
    </div>
  )
}

// ===== MAIN APP =====
export default function MobileApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState(null)

  const openSheet = (content) => {
    setSheetContent(content)
    setSheetOpen(true)
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage 
          onCreateProject={() => openSheet('create-project')}
          onOpenProject={(proj) => console.log('打开项目:', proj)}
        />
      case 'chat':
        return <ChatPage />
      case 'tree':
        return <TreePage />
      case 'assets':
        return <AssetsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="mobile-app">
      <TopBar 
        title={
          activeTab === 'home' ? 'STORYA' :
          activeTab === 'chat' ? '会话' :
          activeTab === 'tree' ? '项目树' :
          activeTab === 'assets' ? '资源库' :
          activeTab === 'profile' ? '我的' :
          'STORYA'
        }
        onMenu={() => openSheet('menu')}
      />

      <div className="mobile-content">
        {renderPage()}
      </div>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      <BottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={
          sheetContent === 'create-project' ? '创建新项目' :
          sheetContent === 'menu' ? '菜单' :
          '选项'
        }
      >
        {sheetContent === 'create-project' && (
          <div className="templates-sheet">
            {TEMPLATES.map((tpl, i) => (
              <motion.div
                key={i}
                className="template-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="template-icon">{tpl.icon}</div>
                <div className="template-info">
                  <h3>{tpl.name}</h3>
                  <p>{tpl.desc}</p>
                </div>
                <ChevronRight size={18} />
              </motion.div>
            ))}
          </div>
        )}
        {sheetContent === 'menu' && (
          <div className="menu-sheet">
            <MenuItem icon={<Settings size={20} />} label="设置" />
            <MenuItem icon={<HelpCircle size={20} />} label="帮助" />
            <MenuItem icon={<Bell size={20} />} label="通知" badge="3" />
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
