import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  Plus, Send, Paperclip, Mic, Settings, Download, SlidersHorizontal,
  ChevronRight, X, MessageSquare, Film, Image, Volume2, Clock,
  Layers, Users, Globe, FileText, Sparkles, Play, Pause, RotateCcw,
  Trash2, Save, HelpCircle, Check, AlertTriangle, Zap, Star,
  CreditCard, User, LogOut, Bell, Monitor, Eye, GripVertical,
  ChevronDown, Search, Upload, ArrowRight, Lock
} from 'lucide-react'
import MobileApp from './MobileApp'

// ===== DATA =====
export const PROJECTS = [
  { id: 1, name: '逆天修仙路', genre: '修仙', episodes: 12, active: true, icon: '⚔️' },
  { id: 2, name: '末世求生记', genre: '末世', episodes: 5, icon: '🧟' },
  { id: 3, name: '都市逆袭王', genre: '都市', episodes: 3, icon: '🏙️' },
  { id: 4, name: '青云志', genre: '仙侠', episodes: 20, icon: '☁️' },
]
export const CONVERSATIONS = [
  { id: 1, name: '优化第8集结尾悬念' },
  { id: 2, name: '新增反派角色设定' },
]
export const TEMPLATES = [
  { icon: '⚔️', name: '修仙逆袭', desc: '废柴逆袭，热血升级，适合短视频连载' },
  { icon: '💕', name: '甜宠恋爱', desc: '霸总/甜宠/误会，高完播率公式' },
  { icon: '🔮', name: '悬疑推理', desc: '层层反转，强悬念钩子，追更率高' },
  { icon: '🏙️', name: '都市逆袭', desc: '系统流/重生/打脸，爽感直给' },
  { icon: '🧟', name: '末世求生', desc: '生存危机，团队合作，情感羁绊' },
  { icon: '📝', name: '自定义', desc: '从零开始，完全自由创作' },
]
export const INITIAL_MESSAGES = [
  {
    id: 1, role: 'user', text: '帮我生成第9集，这集要重点突出主角突破筑基期的逆袭，结尾留一个大悬念', time: '14:32'
  },
  {
    id: 2, role: 'agent', text: '好的，第9集「破境逆袭」已根据你的要求生成。本集重点：\n\n✅ 主角林凡在生死关头突破筑基，反杀白莲宗弟子\n✅ 开头以林凡被逼入绝境、灵根碎裂的危机场景切入\n✅ 结尾悬念：突破后体内出现神秘黑色印记', time: '14:33',
    scores: [
      { label: '开篇钩子', score: 8.5, icon: '🎣' },
      { label: '结尾悬念', score: 9.0, icon: '🪝' },
      { label: '一致性', score: 8.2, icon: '📐' },
      { label: '节奏', score: 8.0, icon: '🎭' },
    ],
    grade: 'A',
    card: {
      type: 'episode',
      title: '第9集 · 破境逆袭 · v1',
      hook: '「灵根……碎了？」白莲宗内门弟子齐远的嘴角勾起一抹残忍的弧度，看着跪倒在血泊中的林凡——\n\n然而下一秒，一道翠绿色的光芒从林凡碎裂的灵根中暴射而出……',
      cliff: '林凡缓缓摊开右手——掌心到指尖，五条漆黑的裂纹正如蛛网般蔓延……\n千里之外的荒古禁地，尘封的石棺上出现了一模一样的裂纹——正在一寸一寸地碎裂。',
      wordCount: 3200,
    },
    suggestions: ['📝 优化开篇钩子的紧张感', '🔍 检查与第8集的衔接', '➡️ 继续生成分镜'],
  },
  {
    id: 3, role: 'agent', text: '', time: '14:34',
    card: {
      type: 'storyboard-progress',
      title: '第9集分镜生成',
      total: 12,
      shots: [
        { id: 'S01_01', cam: '近景', dur: '1.5s', status: 'done', desc: '灵根碎裂', color: '#E8F5EE', char: '齐远·林凡', doneAt: '14:34' },
        { id: 'S01_02', cam: '特写', dur: '1.0s', status: 'done', desc: '齐远冷笑', color: '#FFF3E0', char: '齐远', doneAt: '14:35' },
        { id: 'S02_01', cam: '远景', dur: '2.0s', status: 'done', desc: '绿光暴射', color: '#E3F2FD', char: '林凡', doneAt: '14:35' },
        { id: 'S02_02', cam: '中景', dur: '1.8s', status: 'done', desc: '齐远被轰退', color: '#F3E5F5', char: '齐远', doneAt: '14:36' },
        { id: 'S02_03', cam: '近景', dur: '2.5s', status: 'done', desc: '齐远恐惧', color: '#FCE4EC', char: '齐远', doneAt: '14:36' },
        { id: 'S03_01', cam: '近景', dur: '1.5s', status: 'done', desc: '林凡淡笑', color: '#E8F5EE', char: '林凡', doneAt: '14:37' },
        { id: 'S04_01', cam: '特写', dur: '2.0s', status: 'done', desc: '黑色裂纹', color: '#FCE4EC', char: '林凡', doneAt: '14:37' },
        { id: 'S04_02', cam: '全景', dur: '2.5s', status: 'done', desc: '石棺碎裂', color: '#E0F7FA', char: '—', doneAt: '14:38' },
        { id: 'S05_01', cam: '中景', dur: '1.8s', status: 'generating', desc: '能量风暴', color: '#E3F2FD', char: '—', progress: 72 },
        { id: 'S05_02', cam: '特写', dur: '1.0s', status: 'queued', desc: '林凡觉醒', color: '#FFF3E0', char: '林凡' },
        { id: 'S06_01', cam: '远景', dur: '2.0s', status: 'queued', desc: '众人震惊', color: '#F3E5F5', char: '群像' },
        { id: 'S06_02', cam: '特写', dur: '1.5s', status: 'queued', desc: '伏笔留白', color: '#E0F7FA', char: '林凡' },
      ]
    },
    suggestions: ['🎬 编辑 S04_01 黑色裂纹', '⏸️ 暂停生成', '📊 查看已完成的分镜'],
  },
  { id: 4, role: 'agent', text: '🆕 分镜 S05_01 生成完成！', time: '14:40', isNotification: true,
    card: {
      type: 'shot-detail',
      shot: {
        id: 'S05_01', desc: '能量风暴席卷山谷', cam: '远景', dur: '1.8s', emotion: '震撼恢宏', movement: '推进', status: 'new', isNew: true, color: '#E3F2FD',
        description: '翠绿色能量风暴从林凡体内炸裂而出，席卷整个白莲宗山谷。远处的亭台楼阁在风暴中摇摇欲坠，树木弯折，碎石漫天飞舞。画面从林凡逐渐推远至全景。',
        characters: [
          { name: '林凡', lora: 'v3', emoji: '🧑', color: '#E8F5EE' },
        ],
        props: ['✨ 能量风暴', '🏔️ 白莲宗山谷'],
        audio: [
          { type: '旁白', char: '旁白', text: '翠绿光柱冲天而起，灵力风暴席卷整个山谷' },
          { type: 'BGM', char: null, text: '史诗交响 · 渐强' },
          { type: '音效', char: null, text: '灵力风暴呼啸 + 地面震裂' },
        ],
      }
    },
    suggestions: ['✏️ 调整 S05_01 运镜方式', '🔊 编辑 S05_01 配音', '➡️ 继续等待下一个'],
  },
  { id: '4b', role: 'agent', text: '⏳ 分镜 S05_02 正在生成中…', time: '14:41', isNotification: true,
    card: {
      type: 'shot-detail',
      shot: {
        id: 'S05_02', desc: '林凡觉醒', cam: '特写', dur: '1.0s', emotion: '霸气爆发', movement: '急推', status: 'generating', color: '#FFF3E0',
        description: '林凡双眸猛然睁开，瞳孔中翠绿与漆黑交织——觉醒之力在体内翻涌……',
        characters: [
          { name: '林凡', lora: 'v3', emoji: '🧑', color: '#E8F5EE' },
        ],
        props: ['✨ 觉醒之力', '👁️ 异色双瞳'],
        audio: [
          { type: '音效', char: null, text: '心跳加速 + 能量共鸣' },
          { type: 'BGM', char: null, text: '高潮交响 · 爆发' },
        ],
        progress: 63,
        eta: '约 18 秒',
      }
    },
    suggestions: ['⏸️ 暂停生成', '🔧 调整参数后再生成', '📋 查看生成队列'],
  },
  { id: 5, role: 'user', text: '帮我把 S04_01 的景别从特写改为近景，情绪加强一些，描述中加上「裂纹闪烁着幽暗紫光」', time: '14:42' },
  { id: 6, role: 'agent', text: '已调整 S04_01，景别改为近景，情绪强化，描述已更新 👇', time: '14:42',
    card: {
      type: 'shot-detail',
      shot: {
        id: 'S04_01', desc: '黑色裂纹闪烁紫光', cam: '近景', dur: '2.0s', emotion: '恐惧不安·强化', movement: '缓推', status: 'done', color: '#FCE4EC',
        description: '林凡缓缓摊开右手——掌心到指尖，五条漆黑的裂纹正如蛛网般蔓延，裂纹闪烁着幽暗紫光，像是有某种生命在裂缝深处脉动。每一次闪烁都让林凡的表情微微扭曲。',
        characters: [
          { name: '林凡', lora: 'v3', emoji: '🧑', color: '#E8F5EE' },
        ],
        props: ['🖐️ 黑色裂纹', '🟣 幽暗紫光'],
        audio: [
          { type: '旁白', char: '旁白', text: '林凡缓缓摊开右手——五条漆黑裂纹如蛛网蔓延，闪烁着幽暗紫光' },
          { type: '音效', char: null, text: '诡异低频嗡鸣 + 紫光闪烁电流声' },
        ],
      }
    },
    suggestions: ['🔄 重新生成 S04_01 视频', '🔊 编辑配音提示词', '📋 查看分镜总览'],
  },
  // ===== Worldview card =====
  { id: 7, role: 'agent', text: '🌍 世界观已构建完成，包含 4 个核心维度：', time: '14:43',
    card: {
      type: 'worldview',
      title: '逆天修仙路 · 世界观设定 v2',
      sections: [
        { icon: '⚔️', label: '修炼体系', color: 'var(--accent)', text: '灵根→筑基→金丹→元婴→化神→渡劫→大乘。特殊：逆脉体质（主角）可吸收天地浊气为己用，灵根碎裂后反而打通逆脉。' },
        { icon: '🏰', label: '势力分布', color: '#8B5CF6', text: '白莲宗（正道第一）、魔渊殿（魔修）、荒古禁地（上古遗迹）、天机阁（中立势力/情报组织）。' },
        { icon: '📜', label: '核心规则', color: '#E8973A', text: '①灵力浓度随海拔升高②魔气与灵气互斥③逆脉者每突破一境需承受一次「魔噬」④荒古禁地每百年开启一次。' },
        { icon: '🔮', label: '伏笔体系', color: '#D81B60', text: '黑色裂纹→魔神传承→荒古石棺→逆脉觉醒。林凡右手裂纹与石棺裂纹同步，暗示他是魔神转世。' },
      ]
    },
    suggestions: ['📝 修改修炼体系设定', '🌍 展开编辑世界观', '➡️ 开始生成大纲'],
  },
  // ===== Full outline card (all arcs + episodes) =====
  { id: 8, role: 'agent', text: '📋 全剧大纲已生成，共 3 个大章 12 集：', time: '14:44',
    card: {
      type: 'full-outline',
      title: '逆天修仙路 · 全剧大纲',
      arcs: [
        { name: 'Arc 1: 觉醒篇', episodes: [
          { ep: 1, title: '废柴灵根', hook: '灵根测试，林凡被判废物', cliff: '隐藏传承暗中觉醒', status: 'done', grade: 'A' },
          { ep: 2, title: '隐藏传承', hook: '梦中上古声音召唤', cliff: '修炼禁术被长老发现', status: 'done', grade: 'A' },
          { ep: 3, title: '初露锋芒', hook: '外门比武开始', cliff: '逆脉体质首次暴走', status: 'done', grade: 'B+' },
          { ep: 4, title: '觉醒之战', hook: '内门弟子围攻', cliff: '灵根觉醒击败对手，引来宗门注意', status: 'done', grade: 'A' },
        ]},
        { name: 'Arc 2: 磨砺篇', episodes: [
          { ep: 5, title: '外门试炼', hook: '荒野生存任务', cliff: '发现魔渊殿暗桩', status: 'done', grade: 'A' },
          { ep: 6, title: '暗流涌动', hook: '宗门内鬼现形', cliff: '苏婉儿被绑架', status: 'done', grade: 'A' },
          { ep: 7, title: '生死危机', hook: '深入魔渊殿救人', cliff: '右手出现第一条黑色裂纹', status: 'done', grade: 'A-' },
          { ep: 8, title: '蜕变', hook: '闭关突破筑基', cliff: '齐远约战演武场', status: 'done', grade: 'A' },
        ]},
        { name: 'Arc 3: 逆袭篇', episodes: [
          { ep: 9, title: '破境逆袭', hook: '灵根碎裂，绝境反杀', cliff: '掌心黑色裂纹蔓延', status: 'done', grade: 'A' },
          { ep: 10, title: '魔神之约', hook: '黑纹跳动，脑内声音', cliff: '三天最后通牒', status: 'draft' },
          { ep: 11, title: '荒古禁地', hook: '被迫前往上古遗迹', cliff: '石棺完全碎裂', status: 'draft' },
          { ep: 12, title: '终极逆天', hook: '魔神传承对决', cliff: '新的篇章开启', status: 'draft' },
        ]},
      ]
    },
    suggestions: ['📝 编辑第10集大纲', '✅ 确认大纲并逐集生成', '➡️ 生成第10集文本'],
  },
  // ===== Gate review card =====
  { id: 9, role: 'agent', text: '🚦 Gate 审核完成，第9集文本质量评估：', time: '14:45',
    card: {
      type: 'gate-review',
      stage: '文本生成 → 分镜',
      passed: true,
      totalScore: '8.3 / 10',
      dimensions: [
        { icon: '🎣', label: '开篇钩子', score: 8.5 },
        { icon: '🪝', label: '结尾悬念', score: 9.0 },
        { icon: '🎭', label: '节奏感', score: 8.0 },
        { icon: '👤', label: '人物塑造', score: 8.5 },
        { icon: '💫', label: '情绪张力', score: 8.2 },
        { icon: '📐', label: '一致性', score: 7.8 },
      ],
      issues: [
        { text: '一致性：第8集末尾是白天，第9集开头环境描写缺少时间过渡' },
      ]
    },
    suggestions: ['🤖 自动修复一致性问题', '📊 查看详细评分', '➡️ 确认通过，生成分镜'],
  },
  // ===== Consistency card =====
  { id: 10, role: 'agent', text: '📐 一致性检查完成，发现 1 个需注意的问题：', time: '14:46',
    card: {
      type: 'consistency',
      items: [
        { status: 'pass', text: '人物设定一致（林凡、齐远、苏婉儿）' },
        { status: 'pass', text: '世界观规则一致（修炼体系、势力关系）' },
        { status: 'warn', text: '时间线冲突：第9集结尾是白天，第10集开头变成月夜', fix: '增加过渡描写' },
        { status: 'pass', text: '伏笔追踪（黑色裂纹→魔神传承）衔接正确' },
      ]
    },
    suggestions: ['🔄 自动修复时间线冲突', '📋 查看完整伏笔追踪表', '➡️ 继续生成'],
  },
  // ===== Voice select card =====
  { id: 11, role: 'agent', text: '🔊 为林凡选择配音方案，以下是 AI 生成的 4 种音色：', time: '14:47',
    card: {
      type: 'voice-select',
      title: '角色配音选择 · 林凡',
      character: '林凡 · 主角 · 18岁少年',
      voices: [
        { name: '少年清冽', desc: '清澈、坚韧，带一丝倔强。适合逆境中的成长型主角', emoji: '🎤', color: '#E8F5EE', recommended: true },
        { name: '低沉磁性', desc: '沉稳内敛，声线带磁性。适合沉默寡言的强者型主角', emoji: '🎙️', color: '#E3F2FD' },
        { name: '热血少年', desc: '明亮激昂，充满活力。适合热血战斗型主角', emoji: '🔊', color: '#FFF3E0' },
        { name: '冷酷淡然', desc: '平淡中带锋芒，喜怒不形于色。适合腹黑型主角', emoji: '🎵', color: '#F3E5F5' },
      ]
    },
    suggestions: ['▶ 试听全部方案', '🔄 换一批音色', '➡️ 确认后为其他角色选音'],
  },
  // ===== LoRA update card =====
  { id: 12, role: 'agent', text: '🎭 角色 LoRA 需要更新——林凡第10集右臂黑化：', time: '14:48',
    card: {
      type: 'lora-update',
      from: { version: 'v3', desc: '筑基后·翠绿眼眸', emoji: '🧑' },
      to: { version: 'v4', desc: '右臂黑化·裂纹蔓延', emoji: '🧑‍🦯' },
      cost: 120,
    },
    suggestions: ['🎭 开始训练 LoRA v4', '🔍 查看现有候选', '⏭️ 跳过，使用 v3'],
  },
  // ===== Video gen card (generating) =====
  { id: 13, role: 'agent', text: '🎬 第9集完整视频开始合成，逐镜头生成中：', time: '14:49',
    card: {
      type: 'video-gen',
      title: '第9集 · 视频合成',
      status: 'generating',
      progress: 45,
      currentShot: 'S02_01 绿光暴射',
      eta: '约 3 分钟',
      shots: [
        { id: 'S01_01', done: true }, { id: 'S01_02', done: true },
        { id: 'S02_01', current: true }, { id: 'S02_02' }, { id: 'S02_03' },
        { id: 'S03_01' }, { id: 'S04_01' }, { id: 'S04_02' },
      ]
    },
    suggestions: ['⏸️ 暂停合成', '🔧 调整合成参数', '📋 查看队列'],
  },
  // ===== Video gen card (done) =====
  { id: 14, role: 'agent', text: '✅ 第9集完整视频合成完毕！', time: '14:52',
    card: {
      type: 'video-gen',
      title: '第9集 · 视频合成',
      status: 'done',
      progress: 100,
      currentShot: '',
      eta: '',
      shots: [
        { id: 'S01_01', done: true }, { id: 'S01_02', done: true },
        { id: 'S02_01', done: true }, { id: 'S02_02', done: true }, { id: 'S02_03', done: true },
        { id: 'S03_01', done: true }, { id: 'S04_01', done: true }, { id: 'S04_02', done: true },
      ]
    },
    suggestions: ['▶ 播放完整视频', '📥 下载视频', '➡️ 开始生成第10集'],
  },
  // ===== Gate review (failed) =====
  { id: 15, role: 'agent', text: '🚦 Gate 审核未通过，第10集需要修改：', time: '14:53',
    card: {
      type: 'gate-review',
      stage: '大纲 → 全文生成',
      passed: false,
      totalScore: '6.2 / 10',
      dimensions: [
        { icon: '🎣', label: '开篇钩子', score: 7.0 },
        { icon: '🪝', label: '结尾悬念', score: 6.5 },
        { icon: '🎭', label: '节奏感', score: 5.5 },
        { icon: '👤', label: '人物塑造', score: 6.0 },
        { icon: '💫', label: '情绪张力', score: 5.8 },
        { icon: '📐', label: '一致性', score: 6.5 },
      ],
      issues: [
        { text: '节奏感不足：中段战斗场景拖沓，缺少节奏变化' },
        { text: '情绪张力低：林凡面对魔神的内心挣扎描写过于平淡' },
        { text: '人物塑造：苏婉儿出场过于突兀，缺少铺垫' },
      ]
    },
    suggestions: ['🤖 自动修复全部问题', '📝 手动编辑优化', '🔄 整集重新生成'],
  },
]

export const AGENT_REPLIES = [
  {
    text: '好的，第10集「魔神之约」已生成完毕：',
    card: {
      type: 'episode',
      title: '第10集 · 魔神之约 · v1',
      hook: '林凡右手的黑色裂纹在月光下微微跳动，仿佛有什么东西在皮肤下蠕动——\n「你终于注意到了？」一个低沉的声音在脑海中响起……',
      cliff: '「三天之内……不主动来找我，这只手，就不是你的了。」声音消失的瞬间，林凡的整条右臂变成了漆黑色。',
      wordCount: 2800,
    },
    scores: [
      { label: '开篇钩子', score: 8.8, icon: '🎣' },
      { label: '结尾悬念', score: 9.2, icon: '🪝' },
      { label: '一致性', score: 8.5, icon: '📐' },
    ],
    grade: 'A',
    suggestions: ['✨ 帮我润色魔神的对白', '📊 查看质量评分详情', '➡️ 生成分镜'],
  },
  {
    text: '一致性检查完成，发现 1 个需注意的问题：',
    card: {
      type: 'consistency',
      items: [
        { status: 'pass', text: '人物设定一致（林凡、齐远、苏婉儿）' },
        { status: 'pass', text: '世界观规则一致（修炼体系、势力关系）' },
        { status: 'warn', text: '时间线冲突：第9集结尾是白天，第10集开头变成月夜', fix: '增加过渡描写' },
        { status: 'pass', text: '伏笔追踪（黑色裂纹→魔神传承）衔接正确' },
      ]
    },
    suggestions: ['🔄 自动修复时间线冲突', '📋 查看完整伏笔追踪表', '➡️ 继续生成'],
  },
  {
    text: '角色 LoRA 需要更新——林凡第10集右臂黑化：',
    card: {
      type: 'lora-update',
      from: { version: 'v3', desc: '筑基后·翠绿眼眸', emoji: '🧑' },
      to: { version: 'v4', desc: '右臂黑化·裂纹蔓延', emoji: '🧑‍🦯' },
      cost: 120,
    },
    suggestions: ['🎭 开始训练 LoRA v4', '🔍 查看现有候选', '⏭️ 跳过，使用 v3'],
  },
  {
    text: '第10集大纲已生成，核心结构如下：',
    card: {
      type: 'outline',
      title: '魔神之约',
      arc: 'Arc 3: 逆袭',
      episode: '10/12',
      hook: '黑纹跳动 + 脑内神秘声音',
      mainline: '林凡被迫前往荒古禁地，途中遭遇白莲宗追杀',
      character: '林凡首次面对「力量的代价」，内心挣扎',
      thrill: '黑化右臂觉醒 → 一击秒杀追兵 → 但失控伤及苏婉儿',
      cliff: '魔神下达最后通牒，三天期限开始倒计时',
    },
    suggestions: ['📝 编辑大纲细节', '✅ 确认并生成全文', '💡 增加一个伏笔'],
  },
  {
    text: '',
    card: {
      type: 'storyboard-progress',
      title: '第10集分镜生成',
      total: 10,
      shots: [
        { id: 'S01_01', cam: '特写', dur: '1.5s', status: 'done', desc: '黑纹跳动', color: '#E8F5EE', char: '林凡', doneAt: '15:02' },
        { id: 'S01_02', cam: '近景', dur: '1.2s', status: 'done', desc: '林凡惊恐', color: '#F3E5F5', char: '林凡', doneAt: '15:03' },
        { id: 'S02_01', cam: '中景', dur: '2.0s', status: 'done', desc: '魔神虚影', color: '#E3F2FD', char: '魔神', doneAt: '15:03' },
        { id: 'S02_02', cam: '特写', dur: '1.5s', status: 'done', desc: '黑臂觉醒', color: '#FCE4EC', char: '林凡', doneAt: '15:04' },
        { id: 'S03_01', cam: '远景', dur: '2.0s', status: 'done', desc: '一击秒杀', color: '#FFF3E0', char: '林凡', doneAt: '15:04' },
        { id: 'S03_02', cam: '近景', dur: '1.8s', status: 'generating', desc: '苏婉儿受伤', color: '#F3E5F5', char: '苏婉儿', progress: 45 },
        { id: 'S04_01', cam: '特写', dur: '2.0s', status: 'queued', desc: '右臂黑化', color: '#FCE4EC', char: '林凡' },
        { id: 'S04_02', cam: '中景', dur: '1.5s', status: 'queued', desc: '苏婉儿倒地', color: '#F3E5F5', char: '苏婉儿' },
        { id: 'S05_01', cam: '远景', dur: '2.0s', status: 'queued', desc: '黎明倒计时', color: '#E0F7FA', char: '—' },
        { id: 'S05_02', cam: '特写', dur: '1.5s', status: 'queued', desc: '最后通牒', color: '#FFF3E0', char: '林凡' },
      ]
    },
    suggestions: ['🎬 编辑 S02_02 黑臂觉醒', '📥 导出已完成分镜', '➡️ 开始配音生成'],
  },
  // Worldview card
  {
    text: '世界观已构建完成，包含 4 个核心维度：',
    card: {
      type: 'worldview',
      title: '逆天修仙路 · 世界观设定 v2',
      sections: [
        { icon: '⚔️', label: '修炼体系', color: 'var(--accent)', text: '灵根→筑基→金丹→元婴→化神→渡劫→大乘。特殊：逆脉体质（主角）可吸收天地浊气为己用，灵根碎裂后反而打通逆脉。' },
        { icon: '🏰', label: '势力分布', color: '#8B5CF6', text: '白莲宗（正道第一）、魔渊殿（魔修）、荒古禁地（上古遗迹）、天机阁（中立势力/情报组织）。' },
        { icon: '📜', label: '核心规则', color: '#E8973A', text: '①灵力浓度随海拔升高②魔气与灵气互斥③逆脉者每突破一境需承受一次「魔噬」④荒古禁地每百年开启一次。' },
        { icon: '🔮', label: '伏笔体系', color: '#D81B60', text: '黑色裂纹→魔神传承→荒古石棺→逆脉觉醒。林凡右手裂纹与石棺裂纹同步，暗示他是魔神转世。' },
      ]
    },
    suggestions: ['📝 修改修炼体系设定', '🌍 展开编辑世界观', '➡️ 开始生成大纲'],
  },
  // Voice selection card
  {
    text: '🔊 为林凡选择配音方案，以下是 AI 生成的 4 种音色：',
    card: {
      type: 'voice-select',
      title: '角色配音选择 · 林凡',
      character: '林凡 · 主角 · 18岁少年',
      voices: [
        { name: '少年清冽', desc: '清澈、坚韧，带一丝倔强。适合逆境中的成长型主角', emoji: '🎤', color: '#E8F5EE', recommended: true },
        { name: '低沉磁性', desc: '沉稳内敛，声线带磁性。适合沉默寡言的强者型主角', emoji: '🎙️', color: '#E3F2FD' },
        { name: '热血少年', desc: '明亮激昂，充满活力。适合热血战斗型主角', emoji: '🔊', color: '#FFF3E0' },
        { name: '冷酷淡然', desc: '平淡中带锋芒，喜怒不形于色。适合腹黑型主角', emoji: '🎵', color: '#F3E5F5' },
      ]
    },
    suggestions: ['▶ 试听全部方案', '🔄 换一批音色', '➡️ 确认后为其他角色选音'],
  },
  // Video generation card
  {
    text: '🎬 第9集完整视频开始合成，逐镜头生成中：',
    card: {
      type: 'video-gen',
      title: '第9集 · 视频合成',
      status: 'generating',
      progress: 45,
      currentShot: 'S02_01 绿光暴射',
      eta: '约 3 分钟',
      shots: [
        { id: 'S01_01', done: true }, { id: 'S01_02', done: true },
        { id: 'S02_01', current: true }, { id: 'S02_02' }, { id: 'S02_03' },
        { id: 'S03_01' }, { id: 'S04_01' }, { id: 'S04_02' },
      ]
    },
    suggestions: ['⏸️ 暂停合成', '🔧 调整合成参数', '📋 查看队列'],
  },
  // Gate review card
  {
    text: '🚦 Gate 审核完成，第9集文本质量评估如下：',
    card: {
      type: 'gate-review',
      stage: '文本生成 → 分镜',
      passed: true,
      totalScore: '8.3 / 10',
      dimensions: [
        { icon: '🎣', label: '开篇钩子', score: 8.5 },
        { icon: '🪝', label: '结尾悬念', score: 9.0 },
        { icon: '🎭', label: '节奏感', score: 8.0 },
        { icon: '👤', label: '人物塑造', score: 8.5 },
        { icon: '💫', label: '情绪张力', score: 8.2 },
        { icon: '📐', label: '一致性', score: 7.8 },
      ],
      issues: [
        { text: '一致性：第8集末尾是白天，第9集开头环境描写缺少时间过渡' },
      ]
    },
    suggestions: ['🤖 自动修复一致性问题', '📊 查看详细评分', '➡️ 确认通过，生成分镜'],
  },
]

const TREE_DATA = [
  { id: 'world', icon: '🌍', label: '世界观', badge: 'v2', overlay: 'worldview', children: [
    { id: 'rules', icon: '📜', label: '修仙世界规则', overlay: 'worldview' },
    { id: 'factions', icon: '⚔️', label: '势力与冲突', overlay: 'worldview' },
    { id: 'world-add', icon: '➕', label: '添加新设定', overlay: 'worldview', isAction: true },
  ]},
  { id: 'outline', icon: '📋', label: '大纲', badge: '3章12集', overlay: 'outline', children: [
    { id: 'arc1', icon: '📖', label: 'Arc 1: 觉醒篇', badge: '4/4', overlay: 'outline', children: [
      { id: 'ep1', icon: '📄', label: '第1集 · 废柴灵根', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep1-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
        { id: 'ep1-sb', icon: '🎬', label: '分镜', badge: '8 shots', overlay: 'storyboard' },
        { id: 'ep1-vid', icon: '🎥', label: '完整视频', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
      ]},
      { id: 'ep2', icon: '📄', label: '第2集 · 隐藏传承', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep2-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
        { id: 'ep2-sb', icon: '🎬', label: '分镜', badge: '10 shots', overlay: 'storyboard' },
        { id: 'ep2-vid', icon: '🎥', label: '完整视频', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
      ]},
      { id: 'ep3', icon: '📄', label: '第3集 · 初露锋芒', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep3-text', icon: '📝', label: '文本', badge: 'v2', overlay: 'editor' },
        { id: 'ep3-sb', icon: '🎬', label: '分镜', badge: '9 shots', overlay: 'storyboard' },
        { id: 'ep3-vid', icon: '🎥', label: '完整视频', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
      ]},
      { id: 'ep4', icon: '📄', label: '第4集 · 觉醒之战', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep4-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
        { id: 'ep4-sb', icon: '🎬', label: '分镜', badge: '11 shots', overlay: 'storyboard' },
        { id: 'ep4-vid', icon: '🎥', label: '完整视频', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
      ]},
    ]},
    { id: 'arc2', icon: '📖', label: 'Arc 2: 磨砺篇', badge: '4/4', overlay: 'outline', children: [
      { id: 'ep5', icon: '📄', label: '第5集 · 外门试炼', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep5-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
        { id: 'ep5-sb', icon: '🎬', label: '分镜', badge: '8 shots', overlay: 'storyboard' },
      ]},
      { id: 'ep6', icon: '📄', label: '第6集 · 暗流涌动', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep6-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
      ]},
      { id: 'ep7', icon: '📄', label: '第7集 · 生死危机', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep7-text', icon: '📝', label: '文本', badge: 'v1', overlay: 'editor' },
      ]},
      { id: 'ep8', icon: '📄', label: '第8集 · 蜕变', badgeType: 'done', badgeText: '📝 已生成', accordion: true, hasContent: true, children: [
        { id: 'ep8-text', icon: '📝', label: '文本', badge: 'v2', overlay: 'editor' },
        { id: 'ep8-sb', icon: '🎬', label: '分镜', badge: '10 shots', overlay: 'storyboard' },
        { id: 'ep8-vid', icon: '🎥', label: '完整视频', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
      ]},
    ]},
    { id: 'arc3', icon: '🔥', label: 'Arc 3: 逆袭篇', badge: '1/4', active: true, overlay: 'outline', children: [
      { id: 'ep9', icon: '📄', label: '第9集 · 破境逆袭', badgeType: 'grade-a', badgeText: '📝 A', active: true, accordion: true, hasContent: true, children: [
        { id: 'ep9-text', icon: '📝', label: '文本', badge: 'v2', overlay: 'editor' },
        { id: 'ep9-sb', icon: '🎬', label: '分镜', badge: '12 shots', overlay: 'storyboard', children: [
          { id: 'ep9-s01', icon: '🖼️', label: 'S01_01 灵根碎裂', badgeType: 'done', badgeText: '✅', overlay: 'storyboard' },
          { id: 'ep9-s02', icon: '🖼️', label: 'S02_01 绿光暴射', badgeType: 'generating', badgeText: '⏳', progress: 45, overlay: 'storyboard' },
          { id: 'ep9-s03', icon: '🖼️', label: 'S03_01 黑色裂纹', badgeType: 'draft', badgeText: '📝', overlay: 'storyboard' },
        ]},
        { id: 'ep9-tl', icon: '⏱️', label: '时间轴', overlay: 'timeline' },
        { id: 'ep9-vid', icon: '🎥', label: '完整视频', children: [
          { id: 'ep9-vid-v2', icon: '🎞️', label: 'v2 (最新)', badgeType: 'done', badgeText: '✅', overlay: 'video-preview' },
          { id: 'ep9-vid-v1', icon: '🎞️', label: 'v1', badgeType: 'done', badgeText: '✅', overlay: 'video-preview', dim: true },
          { id: 'ep9-vid-draft', icon: '✏️', label: '从时间轴编辑新版本', overlay: 'timeline' },
        ]},
      ]},
      { id: 'ep10', icon: '📄', label: '第10集 · 魔神之约', badgeType: 'draft', badgeText: '⬚ 大纲', accordion: true, hasContent: false, children: [
        { id: 'ep10-outline', icon: '📋', label: '大纲：黑纹跳动 → 魔神之约 → 三天通牒', dim: true },
        { id: 'ep10-gen', icon: '▶️', label: '生成剧集内容', isAction: true, overlay: 'editor' },
      ]},
      { id: 'ep11', icon: '📄', label: '第11集 · 荒古禁地', badgeType: 'draft', badgeText: '⬚ 大纲', accordion: true, hasContent: false, children: [
        { id: 'ep11-outline', icon: '📋', label: '大纲：被迫前往上古遗迹 → 石棺碎裂', dim: true },
        { id: 'ep11-gen', icon: '▶️', label: '生成剧集内容', isAction: true, overlay: 'editor' },
      ]},
      { id: 'ep12', icon: '📄', label: '第12集 · 终极逆天', badgeType: 'draft', badgeText: '⬚ 大纲', accordion: true, hasContent: false, children: [
        { id: 'ep12-outline', icon: '📋', label: '大纲：魔神传承对决 → 新篇章开启', dim: true },
        { id: 'ep12-gen', icon: '▶️', label: '生成剧集内容', isAction: true, overlay: 'editor' },
      ]},
    ]},
  ]},
  { id: 'chars', icon: '👥', label: '角色 · LoRA', overlay: 'lora-library', children: [
    { id: 'linFan', icon: '🧑', label: '林凡', badgeType: 'done', badgeText: 'v3 ✅', overlay: 'lora' },
    { id: 'suWan', icon: '👩', label: '苏婉儿', badgeType: 'done', badgeText: 'v2 ✅', overlay: 'lora' },
    { id: 'qiYuan', icon: '😈', label: '齐远', badgeType: 'generating', badgeText: '训练中', progress: 65, overlay: 'lora' },
  ]},
]

// ===== HELP TOOLTIPS =====
const TERMS = {
  '开篇钩子': '章节开头 15 秒内的强吸引设计，决定观众是否继续观看。评分 0-10，低于阈值自动触发定向重写。',
  '结尾悬念': '章节结尾的悬念设计，构造「下一集动机」。必须与主线挂钩，评分 0-10。',
  '一致性': '检查当前内容与已确定的世界观、人物设定、前文剧情是否存在矛盾。',
  '等级': 'A=全部闸门通过；B=核心通过但有 minor 问题；C=部分未达标。',
}

// ===== COMPONENTS =====

export function HelpTip({ term }) {
  const [show, setShow] = useState(false)
  const desc = TERMS[term]
  if (!desc) return null
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <HelpCircle size={13} style={{ color: 'var(--text-tertiary)', cursor: 'help', marginLeft: 3 }} />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
              width: 240, padding: '10px 12px', background: 'var(--text-primary)', color: 'white',
              fontSize: 12, lineHeight: 1.6, borderRadius: 6, boxShadow: 'var(--shadow-lg)', zIndex: 200,
              pointerEvents: 'none'
            }}
          >
            <strong>{term}</strong><br />{desc}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

export function ScoreBadge({ icon, label, score }) {
  const pass = score >= 7
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
        background: pass ? 'var(--success-bg)' : 'var(--warning-bg)',
        color: pass ? 'var(--success)' : 'var(--warning)',
      }}
    >
      {icon} {label}<HelpTip term={label} /> {score}
    </motion.span>
  )
}

export function GradeBadge({ grade }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
        background: 'var(--success-bg)', color: 'var(--success)',
      }}
    >
      ✅ 等级 {grade}<HelpTip term="等级" />
    </motion.span>
  )
}

function ShotStatusBadge({ status }) {
  const map = {
    done: { bg: 'var(--success-bg)', color: 'var(--success)', text: '✅' },
    generating: { bg: 'var(--warning-bg)', color: 'var(--warning)', text: '⏳' },
    text: { bg: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', text: '📝' },
  }
  const s = map[status] || map.text
  return (
    <span style={{
      position: 'absolute', top: 4, right: 4, fontSize: 10, padding: '1px 6px',
      borderRadius: 4, fontWeight: 600, background: s.bg, color: s.color
    }}>{s.text}</span>
  )
}

// ===== CONTENT CARDS =====
function EpisodeCard({ card, onOverlay }) {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const bodyText = card.body || '林凡跪倒在血泊之中，丹田内的灵根碎裂声清晰可闻。白莲宗内门弟子齐远居高临下地看着他，嘴角带着残忍的笑意。\n\n「废物就是废物，连灵根都保不住。」齐远的声音在空旷的演武场上回荡。\n\n周围的弟子们面露嘲讽，无人上前帮忙。这个曾经被寄予厚望的天才，如今不过是一个灵根碎裂的废人。\n\n然而就在所有人准备散去的时候——\n\n林凡碎裂的丹田深处，一点翠绿色的光芒悄然亮起。起初微弱如萤火，然后越来越强烈……\n\n「什么？！」齐远的表情从嘲讽变成了震惊。\n\n翠绿色的光芒猛地暴射而出，携带着一股远超筑基期的磅礴灵压——\n\n「不……不可能！废物怎么可能——」齐远的话还没说完，就被那股灵压轰飞出去，口吐鲜血。\n\n林凡缓缓站起来，双眸中翠绿色的光芒流转不定。他低头看着自己的手掌，淡淡道：\n\n「多谢齐师兄……的逼迫。」'
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        marginTop: 12, border: editing ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', background: 'var(--bg-secondary)',
      }}
    >
      <div style={{
        padding: '10px 14px', background: editing ? 'var(--accent-light)' : 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)',
      }}>
        <FileText size={14} /> {card.title}
        {editing && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>✏️ 编辑模式</span>}
        {card.version && <span className="mono" style={{ fontSize: 10, padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: 4, color: 'var(--text-tertiary)' }}>{card.version}</span>}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {!editing && <CardBtn primary onClick={() => setEditing(true)}>✏️ 展开编辑</CardBtn>}
          {!editing && <CardBtn>🤖 AI 重写</CardBtn>}
          {editing && <CardBtn primary onClick={() => { handleSave(); setEditing(false) }}>💾 保存并生成新版本</CardBtn>}
          {editing && <CardBtn onClick={() => setEditing(false)}>✕ 取消</CardBtn>}
        </div>
      </div>

      {/* Collapsed view */}
      {!editing && (
        <div style={{ padding: 14, fontSize: 13.5, lineHeight: 1.7 }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>【开篇钩子】</span>
          <HelpTip term="开篇钩子" />
          {' '}{card.hook}
          <br /><br />
          <span style={{ color: 'var(--text-tertiary)' }}>[ 正文 {card.wordCount.toLocaleString()} 字 · 点击「展开编辑」查看全文 ]</span>
          <br /><br />
          <span style={{ color: 'var(--warning)', fontWeight: 600 }}>【结尾悬念】</span>
          <HelpTip term="结尾悬念" />
          {' '}{card.cliff}
        </div>
      )}

      {/* Expanded edit view */}
      {editing && (
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>🎣 开篇钩子 <HelpTip term="开篇钩子" /></label>
            <textarea defaultValue={card.hook} style={{ width: '100%', padding: '10px 12px', border: '2px solid var(--accent)33', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, lineHeight: 1.7, background: '#F0FFF8' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, display: 'block' }}>📝 正文内容 <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 400 }}>({card.wordCount.toLocaleString()} 字)</span></label>
            <textarea defaultValue={bodyText} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', minHeight: 200, lineHeight: 1.8 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>🪝 结尾悬念 <HelpTip term="结尾悬念" /></label>
            <textarea defaultValue={card.cliff} style={{ width: '100%', padding: '10px 12px', border: '2px solid var(--warning)33', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, lineHeight: 1.7, background: '#FFFDF5' }} />
          </div>
          <div style={{ padding: 10, background: 'var(--bg-tertiary)', borderRadius: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
            💡 编辑后点击「保存并生成新版本」，系统将基于修改内容生成 v2 版本并进入生成队列。也可在会话中输入修改指令让 Agent 帮你编辑。
          </div>
          <AnimatePresence>
            {saved && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ padding: '10px 14px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 6, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
              ✅ 已保存！v2 版本已进入生成队列，预计 30 秒后完成。
            </motion.div>}
          </AnimatePresence>
        </div>
      )}
      {/* Character & Props strip */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, whiteSpace: 'nowrap' }}>出场角色</span>
        <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto' }}>
          {[
            { name: '林凡', version: 'v3', color: '#E8F5EE', emoji: '🧑' },
            { name: '齐远', version: 'v1', color: '#FCE4EC', emoji: '😈' },
            { name: '苏婉儿', version: 'v2', color: '#F3E5F5', emoji: '👩' },
          ].map((char, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 4px', border: '1px solid var(--border-light)', borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, ${char.color}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{char.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{char.name}</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{char.version}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', border: '1px solid var(--border-light)', borderRadius: 12, fontSize: 10, color: 'var(--text-tertiary)' }}>
            🗡️ 翠绿玉佩
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', border: '1px solid var(--border-light)', borderRadius: 12, fontSize: 10, color: 'var(--text-tertiary)' }}>
            ✨ 碎裂灵根
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StoryboardCard({ card, onOverlay }) {
  const [shots, setShots] = useState(card.shots)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', background: 'var(--bg-secondary)',
      }}
    >
      <div style={{
        padding: '10px 14px', background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)',
      }}>
        <Film size={14} /> {card.title}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn onClick={() => onOverlay?.('storyboard')}>全部预览</CardBtn>
          <CardBtn onClick={() => onOverlay?.('timeline')}>时间轴</CardBtn>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {shots.map((shot, i) => (
            <motion.div
              key={shot.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, borderColor: 'var(--accent)' }}
              onClick={() => onOverlay?.('storyboard')}
              style={{
                border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)',
                overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s',
              }}
            >
              <div style={{
                height: 80, background: `linear-gradient(135deg, ${shot.color}, ${shot.color}dd)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, position: 'relative',
              }}>
                🎬
                <ShotStatusBadge status={shot.status} />
              </div>
              <div style={{ padding: '6px 8px' }}>
                <div className="mono" style={{ fontSize: 10.5, fontWeight: 600 }}>{shot.id}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{shot.cam} · {shot.dur}</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{shot.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Character portraits in storyboard */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, whiteSpace: 'nowrap' }}>角色 LoRA</span>
        <div style={{ display: 'flex', gap: 6, flex: 1 }}>
          {[
            { name: '林凡', version: 'v3', color: '#E8F5EE', emoji: '🧑', shots: 8 },
            { name: '齐远', version: 'v1', color: '#FCE4EC', emoji: '😈', shots: 3 },
            { name: '苏婉儿', version: 'v2', color: '#F3E5F5', emoji: '👩', shots: 2 },
          ].map((char, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 4px', border: '1px solid var(--border-light)', borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, ${char.color}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{char.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{char.name}</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{char.version} · {char.shots}镜</span>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--border-light)', borderRadius: 12, color: 'var(--text-tertiary)' }}>🗡️ 翠绿玉佩</span>
        </div>
      </div>
    </motion.div>
  )
}

function StoryboardProgressCard({ card, onOverlay }) {
  const doneCount = card.shots.filter(s => s.status === 'done').length
  const genCount = card.shots.filter(s => s.status === 'generating').length
  const queuedCount = card.shots.filter(s => s.status === 'queued').length
  const pct = Math.round((doneCount / card.total) * 100)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      {/* Header with progress */}
      <div style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Film size={14} />
        <span style={{ fontWeight: 700, fontSize: 13 }}>{card.title}</span>
        <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>{doneCount}/{card.total}</span>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), #06D6A0)', borderRadius: 3 }} />
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{pct}%</span>
        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          <CardBtn onClick={() => onOverlay?.('storyboard')}>全部预览</CardBtn>
          <CardBtn onClick={() => onOverlay?.('timeline')}>时间轴</CardBtn>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', padding: '6px 14px', gap: 12, borderBottom: '1px solid var(--border-light)', fontSize: 11 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />{doneCount} 已完成</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />{genCount} 生成中</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border)' }} />{queuedCount} 排队中</span>
      </div>

      {/* Shot list */}
      <div style={{ padding: 10, maxHeight: 320, overflowY: 'auto' }}>
        {card.shots.map((shot, i) => (
          <motion.div key={shot.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            whileHover={{ background: 'var(--bg-tertiary)' }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 6, cursor: 'pointer', transition: 'background 0.15s' }}
            onClick={() => onOverlay?.('storyboard')}>
            {/* Status indicator */}
            <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0,
              background: shot.status === 'done' ? 'var(--success-bg)' : shot.status === 'generating' ? 'var(--accent-light)' : 'var(--bg-tertiary)',
              color: shot.status === 'done' ? 'var(--success)' : shot.status === 'generating' ? 'var(--accent)' : 'var(--text-tertiary)' }}>
              {shot.status === 'done' ? '✓' : shot.status === 'generating' ? '◉' : '○'}
            </div>
            {/* Shot info */}
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: shot.status === 'queued' ? 'var(--text-tertiary)' : 'var(--text-primary)', minWidth: 52 }}>{shot.id}</span>
            <span style={{ fontSize: 12, color: shot.status === 'queued' ? 'var(--text-tertiary)' : 'var(--text-secondary)', flex: 1 }}>{shot.desc}</span>
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{shot.cam} · {shot.dur}</span>
            {shot.char && shot.char !== '—' && (
              <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 8, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600 }}>🎭 {shot.char}</span>
            )}
            {/* Progress bar for generating */}
            {shot.status === 'generating' && (
              <div style={{ width: 50, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div animate={{ width: `${shot.progress || 50}%` }} style={{ height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
              </div>
            )}
            {/* Done time */}
            {shot.status === 'done' && shot.doneAt && (
              <span className="mono" style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{shot.doneAt}</span>
            )}
            {/* Action buttons for done shots */}
            {shot.status === 'done' && (
              <div style={{ display: 'flex', gap: 3 }}>
                <motion.button whileHover={{ scale: 1.1 }} onClick={e => { e.stopPropagation(); onOverlay?.('storyboard') }}
                  style={{ padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 9, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>👁️</motion.button>
                <motion.button whileHover={{ scale: 1.1 }} onClick={e => { e.stopPropagation(); onOverlay?.('storyboard') }}
                  style={{ padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 9, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>✏️</motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Generating notification */}
      {genCount > 0 && (
        <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border-light)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: 'var(--accent)' }}>●</motion.span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
            正在生成 {card.shots.filter(s => s.status === 'generating').map(s => s.id).join('、')}…
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>新分镜完成后将自动刷新</span>
        </div>
      )}

      {/* Chat hint */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border-light)', fontSize: 11, color: 'var(--text-tertiary)', background: 'var(--bg-secondary)' }}>
        💡 在会话中输入如「编辑 S04_01 的景别改为特写」即可直接编辑分镜
      </div>
    </motion.div>
  )
}

function ShotDetailCard({ card, onOverlay }) {
  const shot = card.shot
  const isGen = shot.status === 'generating'
  const isNew = shot.status === 'new'
  const statusStyle = { done: { bg: 'var(--success-bg)', color: 'var(--success)', text: '✅ 已完成', border: 'var(--success)' }, generating: { bg: '#FEF6ED', color: 'var(--warning)', text: '⏳ 生成中', border: '#E8973A' }, new: { bg: '#EDE9FE', color: '#8B5CF6', text: '🆕 新生成', border: '#8B5CF6' } }
  const st = statusStyle[shot.status] || statusStyle.done

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ marginTop: 12, border: `2px solid ${st.border}33`, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative' }}>

      {/* Generating shimmer overlay */}
      {isGen && (
        <motion.div animate={{ opacity: [0.03, 0.08, 0.03] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, transparent, ${st.border}15, transparent)`, pointerEvents: 'none', zIndex: 1 }} />
      )}

      {/* Header */}
      <div style={{ padding: '10px 14px', background: st.bg, display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-light)' }}>
        <span className="mono" style={{ fontWeight: 800, fontSize: 15, color: st.color }}>{shot.id}</span>
        <span style={{ fontWeight: 600, fontSize: 13 }}>{shot.desc}</span>
        {isGen && <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ fontSize: 10, padding: '2px 10px', borderRadius: 10, fontWeight: 700, background: st.border, color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>⚙️</motion.span> 生成中…
        </motion.span>}
        {!isGen && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 600, background: 'white', color: st.color }}>{st.text}</span>}
        {isNew && <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#8B5CF6', color: 'white', fontWeight: 700 }}>NEW</motion.span>}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn onClick={() => onOverlay?.('storyboard')}>📋 分镜总览</CardBtn>
          {!isGen && <CardBtn onClick={() => onOverlay?.('timeline')}>⏱️ 时间轴</CardBtn>}
        </div>
      </div>

      {/* Progress bar for generating */}
      {isGen && (
        <div style={{ padding: '0 14px', background: st.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
            <div style={{ flex: 1, height: 8, background: 'white', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${shot.progress || 50}%` }} transition={{ duration: 1 }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${st.border}, #F59E0B)`, borderRadius: 4 }} />
            </div>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: st.border }}>{shot.progress || 50}%</span>
            {shot.eta && <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>预计 {shot.eta}</span>}
          </div>
        </div>
      )}

      {/* Two column: preview + params */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0 }}>
        {/* Left: visual preview */}
        <div style={{ borderRight: '1px solid var(--border-light)', padding: 12 }}>
          <div style={{ height: 130, background: `linear-gradient(135deg, ${shot.color || '#E8F5EE'}, #fff)`, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
            {isGen ? (
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ fontSize: 28 }}>⏳</motion.span>
                <span style={{ fontSize: 10, fontWeight: 600, color: st.border }}>渲染中…</span>
              </motion.div>
            ) : '🎬'}
            {isGen && (
              <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 0, bottom: 0, width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
            )}
          </div>
          {/* Characters */}
          {shot.characters && shot.characters.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>出场角色</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {shot.characters.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px 2px 2px', border: '1px solid var(--border-light)', borderRadius: 14, fontSize: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: `linear-gradient(135deg, ${c.color || '#E8F5EE'}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>{c.emoji}</div>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    <span className="mono" style={{ fontSize: 8, color: 'var(--text-tertiary)' }}>{c.lora}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Props */}
          {shot.props && shot.props.length > 0 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>道具</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {shot.props.map((p, i) => (
                  <span key={i} style={{ fontSize: 10, padding: '2px 6px', border: '1px solid var(--border-light)', borderRadius: 8, color: 'var(--text-tertiary)' }}>{p}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: details */}
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Params grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
              ['景别', shot.cam, '📷'],
              ['时长', shot.dur, '⏱️'],
              ['情绪', shot.emotion, '💫'],
              ['运镜', shot.movement || '固定', '🎥'],
            ].map(([label, value, icon]) => (
              <div key={label} style={{ padding: 6, background: 'var(--bg-tertiary)', borderRadius: 6, fontSize: 11 }}>
                <div style={{ fontSize: 9, color: 'var(--text-tertiary)', marginBottom: 2 }}>{icon} {label}</div>
                <div style={{ fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, color: 'var(--text-tertiary)' }}>📝 镜头描述</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-primary)', padding: '6px 10px', background: 'var(--bg-tertiary)', borderRadius: 6 }}>{shot.description}</div>
          </div>

          {/* Audio tracks preview */}
          {shot.audio && shot.audio.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, color: 'var(--text-tertiary)' }}>🔊 音轨 ({shot.audio.length})</div>
              {shot.audio.map((a, ai) => (
                <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', marginBottom: 2, background: '#FDFBFF', borderRadius: 4, fontSize: 10.5 }}>
                  <span style={{ padding: '1px 5px', borderRadius: 3, fontWeight: 600, fontSize: 9,
                    background: a.type === '对白' ? '#FCE4EC' : a.type === 'BGM' ? '#E8F5EE' : a.type === '音效' ? '#FFF3E0' : '#EDE9FE',
                    color: a.type === '对白' ? '#D81B60' : a.type === 'BGM' ? '#0FAA6C' : a.type === '音效' ? '#E8973A' : '#8B5CF6' }}>{a.type}</span>
                  {a.char && <span style={{ fontWeight: 600 }}>{a.char}</span>}
                  <span style={{ flex: 1, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</span>
                  <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '1px 5px', border: '1px solid #D4C4F5', borderRadius: 3, fontSize: 9, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶</motion.button>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {isGen ? (
              <>
                <CardBtn>⏸️ 暂停生成</CardBtn>
                <CardBtn>🔧 调整参数</CardBtn>
                <CardBtn>📋 查看队列</CardBtn>
              </>
            ) : (
              <>
                <CardBtn primary onClick={() => onOverlay?.('storyboard')}>✏️ 编辑此分镜</CardBtn>
                <CardBtn>🔄 重新生成</CardBtn>
                <CardBtn>🎬 在时间轴中定位</CardBtn>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ConsistencyCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 12, border: '1px solid var(--warning)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', background: 'var(--bg-secondary)',
      }}
    >
      <div style={{
        padding: '10px 14px', background: 'var(--warning-bg)',
        borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)',
      }}>
        <AlertTriangle size={14} /> 一致性检查报告
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn primary>自动修复</CardBtn>
          <CardBtn>忽略</CardBtn>
        </div>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {card.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: '8px 12px',
              background: item.status === 'pass' ? 'var(--success-bg)' : 'var(--warning-bg)',
              borderRadius: 'var(--radius-sm)', fontSize: 13,
            }}
          >
            {item.status === 'pass' ? '✅' : '⚠️'} {item.text}
            {item.fix && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
              建议：{item.fix}
            </div>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function LoRAUpdateCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', background: 'var(--bg-secondary)',
      }}
    >
      <div style={{
        padding: '10px 14px', background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)',
      }}>
        🎭 LoRA 更新建议 · 林凡 {card.from.version} → {card.to.version}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn primary>开始训练</CardBtn>
          <CardBtn>查看候选</CardBtn>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1, padding: 16, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 4 }}>{card.from.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{card.from.version} 当前</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{card.from.desc}</div>
          </motion.div>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight size={20} style={{ color: 'var(--accent)' }} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1, padding: 16, background: 'var(--accent-subtle)', border: '1px dashed var(--accent)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 4 }}>{card.to.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{card.to.version} 建议</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{card.to.desc}</div>
          </motion.div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
          预计消耗 <strong style={{ color: 'var(--accent)' }}>{card.cost} Credits ⚡</strong>
        </div>
      </div>
    </motion.div>
  )
}

function OutlineCard({ card, onOverlay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', background: 'var(--bg-secondary)',
      }}
    >
      <div style={{
        padding: '10px 14px', background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)',
      }}>
        <Layers size={14} /> 第10集大纲 · {card.title}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn onClick={() => onOverlay?.('editor')}>编辑大纲</CardBtn>
          <CardBtn primary>确认并生成全文</CardBtn>
        </div>
      </div>
      <div style={{ padding: 14, fontSize: 13, lineHeight: 1.8 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span style={{ padding: '3px 10px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{card.arc}</span>
          <span style={{ padding: '3px 10px', background: 'var(--bg-tertiary)', borderRadius: 12, fontSize: 11, color: 'var(--text-tertiary)' }}>第{card.episode}集</span>
        </div>
        <strong style={{ color: 'var(--accent)' }}>🎣 开篇钩子：</strong>{card.hook}<br />
        <strong>📖 主线：</strong>{card.mainline}<br />
        <strong>🎭 角色弧：</strong>{card.character}<br />
        <strong>⚡ 爽点：</strong>{card.thrill}<br />
        <strong style={{ color: 'var(--warning)' }}>🪝 结尾悬念：</strong>{card.cliff}
      </div>
    </motion.div>
  )
}

// ===== FULL OUTLINE CARD =====
function FullOutlineCard({ card }) {
  const [expandedArc, setExpandedArc] = useState(2) // Arc 3 expanded by default
  const [expandedEp, setExpandedEp] = useState(9) // ep9 expanded
  const arcColors = ['var(--accent)', '#8B5CF6', '#E8973A']

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <div style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600 }}>
        📋 {card.title}
        <span className="mono" style={{ fontSize: 10, padding: '2px 6px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 4, fontWeight: 700 }}>{card.arcs.reduce((s, a) => s + a.episodes.length, 0)} 集</span>
      </div>
      <div style={{ padding: 10 }}>
        {card.arcs.map((arc, ai) => (
          <div key={ai} style={{ marginBottom: ai < card.arcs.length - 1 ? 8 : 0 }}>
            {/* Arc header */}
            <motion.div whileHover={{ backgroundColor: 'var(--bg-hover)' }} onClick={() => setExpandedArc(expandedArc === ai ? -1 : ai)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', borderLeft: `3px solid ${arcColors[ai]}` }}>
              <motion.span animate={{ rotate: expandedArc === ai ? 90 : 0 }} style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>▶</motion.span>
              <span style={{ fontWeight: 700, fontSize: 13, color: arcColors[ai] }}>{arc.name}</span>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{arc.episodes.length} 集</span>
              <span style={{ fontSize: 10, marginLeft: 'auto', color: 'var(--text-tertiary)' }}>
                {arc.episodes.filter(e => e.status === 'done').length}/{arc.episodes.length} 完成
              </span>
            </motion.div>
            {/* Episodes */}
            <AnimatePresence>
              {expandedArc === ai && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', paddingLeft: 16 }}>
                  {arc.episodes.map((ep) => (
                    <div key={ep.ep}>
                      <motion.div whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                        onClick={() => setExpandedEp(expandedEp === ep.ep ? -1 : ep.ep)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginTop: 2 }}>
                        <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{expandedEp === ep.ep ? '▼' : '▶'}</span>
                        <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', minWidth: 24 }}>E{String(ep.ep).padStart(2, '0')}</span>
                        <span style={{ fontWeight: 600 }}>{ep.title}</span>
                        {ep.grade && <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, fontWeight: 700, background: 'var(--success-bg)', color: 'var(--success)' }}>{ep.grade}</span>}
                        <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, fontWeight: 600,
                          background: ep.status === 'done' ? 'var(--success-bg)' : 'var(--bg-tertiary)',
                          color: ep.status === 'done' ? 'var(--success)' : 'var(--text-tertiary)',
                        }}>{ep.status === 'done' ? '✅' : '📝 待生成'}</span>
                        {ep.status === 'draft' && (
                          <motion.button whileHover={{ scale: 1.05 }} onClick={e => e.stopPropagation()}
                            style={{ marginLeft: 'auto', padding: '2px 8px', border: '1px solid var(--accent)', borderRadius: 4, fontSize: 9, cursor: 'pointer', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 700, fontFamily: 'inherit' }}>▶ 生成</motion.button>
                        )}
                      </motion.div>
                      <AnimatePresence>
                        {expandedEp === ep.ep && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', marginLeft: 30, marginTop: 2, marginBottom: 4, padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 6, fontSize: 11, lineHeight: 1.6 }}>
                            <div><span style={{ color: 'var(--accent)', fontWeight: 600 }}>🎣 钩子：</span>{ep.hook}</div>
                            <div><span style={{ color: 'var(--warning)', fontWeight: 600 }}>🪝 悬念：</span>{ep.cliff}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ===== WORLDVIEW CARD =====
function WorldviewCard({ card, onOverlay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <div style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600 }}>
        <span>🌍</span> {card.title}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <CardBtn onClick={() => onOverlay?.('worldview')}>展开编辑</CardBtn>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        {card.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: i < card.sections.length - 1 ? 12 : 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: sec.color || 'var(--accent)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              {sec.icon} {sec.label}
              {sec.isNew && <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: '#8B5CF6', color: 'white', fontWeight: 700 }}>新增</span>}
              {sec.updated && <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>已更新</span>}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-secondary)', padding: '6px 10px', background: 'var(--bg-tertiary)', borderRadius: 6 }}>{sec.text}</div>
          </div>
        ))}
        <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
          <CardBtn onClick={() => onOverlay?.('worldview')}>✏️ 手动编辑</CardBtn>
          <CardBtn>➕ 添加新设定</CardBtn>
          <CardBtn>🤖 AI 扩充世界观</CardBtn>
        </div>
        <div style={{ marginTop: 8, padding: 8, background: '#F5F0FF', borderRadius: 6, fontSize: 10.5, color: 'var(--text-tertiary)' }}>
          💡 可随时对话补充世界观，如「增加一个新势力天机阁」或「修改修炼体系增加散修阶段」
        </div>
      </div>
    </motion.div>
  )
}

// ===== VOICE SELECT CARD =====
function VoiceSelectCard({ card }) {
  const [selected, setSelected] = useState(card.voices.findIndex(v => v.recommended) ?? 0)
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <div style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600 }}>
        <span>🔊</span> {card.title}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{card.character} · 选择配音方案</div>
        {card.voices.map((voice, i) => (
          <motion.div key={i} whileHover={{ borderColor: 'var(--accent)' }} onClick={() => setSelected(i)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: selected === i ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: 8, marginBottom: 6, cursor: 'pointer', background: selected === i ? 'var(--accent-light)' : 'white', transition: 'all 0.2s' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${voice.color || '#E8F5EE'}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{voice.emoji || '🎙️'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{voice.name} {voice.recommended && <span style={{ fontSize: 9, padding: '1px 6px', background: 'var(--accent)', color: 'white', borderRadius: 4, fontWeight: 700, marginLeft: 4 }}>推荐</span>}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{voice.desc}</div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={e => e.stopPropagation()}
              style={{ padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶ 试听</motion.button>
            {selected === i && <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 16 }}>✓</span>}
          </motion.div>
        ))}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <CardBtn primary>✅ 确认选择</CardBtn>
          <CardBtn>🔄 生成更多方案</CardBtn>
        </div>
      </div>
    </motion.div>
  )
}

// ===== VIDEO GEN CARD =====
function VideoGenCard({ card, onOverlay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <div style={{ padding: '10px 14px', background: card.status === 'done' ? 'var(--success-bg)' : '#FEF6ED', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600 }}>
        <span>🎬</span> {card.title}
        {card.status === 'generating' && <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#E8973A', color: 'white', fontWeight: 700 }}>⚙️ 生成中</motion.span>}
        {card.status === 'done' && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'var(--success)', color: 'white', fontWeight: 700 }}>✅ 完成</span>}
      </div>
      <div style={{ padding: 14 }}>
        {card.status === 'generating' && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ flex: 1, height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${card.progress}%` }} transition={{ duration: 1 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #E8973A, #F59E0B)', borderRadius: 4 }} />
              </div>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: '#E8973A' }}>{card.progress}%</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>当前：{card.currentShot} · 预计剩余 {card.eta}</div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {card.shots.map((s, i) => (
            <div key={i} style={{ padding: 6, borderRadius: 6, textAlign: 'center', fontSize: 10,
              background: s.done ? 'var(--success-bg)' : s.current ? '#FEF6ED' : 'var(--bg-tertiary)',
              border: s.current ? '2px solid #E8973A' : '1px solid var(--border-light)' }}>
              <span className="mono" style={{ fontWeight: 700 }}>{s.id}</span>
              <div style={{ color: s.done ? 'var(--success)' : s.current ? '#E8973A' : 'var(--text-tertiary)', marginTop: 2, fontWeight: 600 }}>
                {s.done ? '✅' : s.current ? '⚙️' : '○'}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {card.status === 'done' && <CardBtn primary onClick={() => onOverlay?.('video-preview')}>▶ 播放完整视频</CardBtn>}
          <CardBtn onClick={() => onOverlay?.('timeline')}>⏱️ 时间轴编辑</CardBtn>
        </div>
      </div>
    </motion.div>
  )
}

// ===== GATE REVIEW CARD =====
function GateReviewCard({ card }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <div style={{ padding: '10px 14px', background: card.passed ? 'var(--success-bg)' : '#FEF6ED', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600 }}>
        <span>🚦</span> Gate 质量审核 · {card.stage}
        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: card.passed ? 'var(--success)' : 'var(--warning)', color: 'white' }}>
          {card.passed ? '✅ 通过' : '⚠️ 需修改'}
        </span>
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: card.passed ? 'var(--success)' : 'var(--warning)' }}>
          总分 {card.totalScore}
        </span>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {card.dimensions.map((d, i) => (
            <div key={i} style={{ padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
              background: d.score >= 7 ? 'var(--success-bg)' : d.score >= 5 ? 'var(--warning-bg)' : '#FEE2E2',
              color: d.score >= 7 ? 'var(--success)' : d.score >= 5 ? 'var(--warning)' : '#DC2626' }}>
              {d.icon} {d.label} <span className="mono">{d.score}</span>
            </div>
          ))}
        </div>
        {card.issues && card.issues.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--warning)', marginBottom: 4 }}>⚠️ 需要改进</div>
            {card.issues.map((issue, i) => (
              <div key={i} style={{ padding: '6px 10px', background: 'var(--warning-bg)', borderRadius: 6, fontSize: 12, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚠️</span> <span style={{ flex: 1 }}>{issue.text}</span>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '2px 8px', border: '1px solid var(--warning)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit', color: 'var(--warning)', fontWeight: 600 }}>🤖 自动修复</motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function MessageCard({ card, onOverlay }) {
  if (!card) return null
  switch (card.type) {
    case 'episode': return <EpisodeCard card={card} onOverlay={onOverlay} />
    case 'storyboard': return <StoryboardCard card={card} onOverlay={onOverlay} />
    case 'storyboard-progress': return <StoryboardProgressCard card={card} onOverlay={onOverlay} />
    case 'shot-detail': return <ShotDetailCard card={card} onOverlay={onOverlay} />
    case 'consistency': return <ConsistencyCard card={card} />
    case 'lora-update': return <LoRAUpdateCard card={card} />
    case 'outline': return <OutlineCard card={card} onOverlay={onOverlay} />
    case 'full-outline': return <FullOutlineCard card={card} />
    case 'worldview': return <WorldviewCard card={card} onOverlay={onOverlay} />
    case 'voice-select': return <VoiceSelectCard card={card} />
    case 'video-gen': return <VideoGenCard card={card} onOverlay={onOverlay} />
    case 'gate-review': return <GateReviewCard card={card} />
    default: return null
  }
}

export function CardBtn({ children, primary, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: '3px 8px', fontSize: 11, border: `1px solid ${primary ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'inherit',
        background: primary ? 'var(--accent)' : 'var(--bg-secondary)',
        color: primary ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s',
      }}
    >{children}</motion.button>
  )
}

function SuggestionChip({ text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-subtle)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20,
        fontSize: 12.5, color: 'var(--text-secondary)', cursor: 'pointer',
        background: 'var(--bg-secondary)', fontFamily: 'inherit', transition: 'all 0.15s',
      }}
    >{text}</motion.button>
  )
}

// ===== TYPING INDICATOR =====
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
        />
      ))}
    </div>
  )
}

// ===== TYPEWRITER TEXT =====
function TypewriterText({ text, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.substring(0, i))
        i++
      } else {
        clearInterval(timer)
        onComplete?.()
      }
    }, 18)
    return () => clearInterval(timer)
  }, [text])
  return <span>{displayed.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</span>
}

// ===== MESSAGE COMPONENT =====
function Message({ msg, onOverlay, onSuggestion }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        display: 'flex', gap: 12, maxWidth: 780,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          background: isUser ? 'var(--bg-tertiary)' : 'linear-gradient(135deg, var(--accent), #06D6A0)',
          color: isUser ? 'var(--text-secondary)' : 'white', fontWeight: 700,
        }}
      >{isUser ? '👤' : 'S'}</motion.div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{
          padding: '12px 16px', fontSize: 14, lineHeight: 1.7,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? 'var(--accent)' : 'var(--bg-secondary)',
          color: isUser ? 'white' : 'inherit',
          border: isUser ? 'none' : '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {msg.typing ? <TypingIndicator /> :
           msg.typewriter ? <TypewriterText text={msg.text} /> :
           msg.text.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}

          {msg.scores && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {msg.scores.map((s, i) => <ScoreBadge key={i} {...s} />)}
              {msg.grade && <GradeBadge grade={msg.grade} />}
            </div>
          )}
          <MessageCard card={msg.card} onOverlay={onOverlay} />
        </div>

        {msg.suggestions && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}
          >
            {msg.suggestions.map((s, i) => (
              <SuggestionChip key={i} text={s} onClick={() => onSuggestion?.(s)} />
            ))}
          </motion.div>
        )}

        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, padding: '0 4px' }}>
          {msg.time}
        </div>
      </div>
    </motion.div>
  )
}

// ===== SIDEBAR ITEM =====
function SidebarItem({ icon, text, badge, badgeActive, active, onClick, generating }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'var(--bg-hover)' }}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 16px 8px 20px', cursor: 'pointer',
        position: 'relative', transition: 'all 0.15s',
        background: active ? 'var(--bg-active)' : 'transparent',
        color: active ? 'var(--accent)' : 'inherit',
      }}
    >
      {active && (
        <motion.div layoutId="sidebar-indicator" style={{
          position: 'absolute', left: 0, top: 6, bottom: 6,
          width: 3, background: 'var(--accent)', borderRadius: '0 3px 3px 0',
        }} />
      )}
      <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
      {badge && (
        <span style={{
          fontSize: 11, padding: '2px 7px', borderRadius: 10, fontWeight: 500,
          background: badgeActive ? 'var(--accent-light)' : 'var(--bg-tertiary)',
          color: badgeActive ? 'var(--accent)' : 'var(--text-tertiary)',
        }}>{badge}</span>
      )}
      {generating && (
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ===== TREE NODE =====
function TreeNode({ node, depth = 0, onOverlay, accordionId, onAccordion }) {
  const isAccordionChild = node.accordion
  const isAccordionOpen = isAccordionChild ? accordionId === node.id : undefined
  const [selfOpen, setSelfOpen] = useState(!!node.active)
  const open = isAccordionChild ? isAccordionOpen : selfOpen
  const hasChildren = node.children?.length > 0

  // Track which child is expanded for accordion among children
  const [childAccordion, setChildAccordion] = useState(
    node.children?.find(c => c.active && c.accordion)?.id || null
  )

  return (
    <div style={{ paddingLeft: depth > 0 ? 18 : 0 }}>
      <motion.div
        whileHover={{ backgroundColor: 'var(--bg-hover)' }}
        onClick={() => {
          if (hasChildren && !open) {
            // First click on collapsed node: just expand, don't open overlay
            if (isAccordionChild) {
              onAccordion?.(node.id)
            } else {
              setSelfOpen(true)
            }
          } else if (hasChildren && open) {
            // Already expanded: if has overlay, open it; otherwise collapse
            if (node.overlay) {
              onOverlay?.(node.overlay)
            } else {
              if (isAccordionChild) onAccordion?.(null)
              else setSelfOpen(false)
            }
          } else {
            // Leaf node: always open overlay
            if (node.overlay) onOverlay?.(node.overlay)
          }
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
          borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13,
          background: node.active ? 'var(--bg-active)' : 'transparent',
          opacity: node.dim ? 0.6 : 1,
        }}
      >
        {hasChildren ? (
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={12} style={{ color: 'var(--text-tertiary)' }} />
          </motion.div>
        ) : <div style={{ width: 12 }} />}
        <span style={{ fontSize: 14 }}>{node.icon}</span>
        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: node.isAction ? 'var(--accent)' : 'inherit', fontWeight: node.isAction ? 600 : 'inherit' }}>{node.label}</span>
        {node.hasContent === false && !node.children?.some(c => c.isAction) && (
          <span style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>仅大纲</span>
        )}
        {node.badge && <span className="mono" style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', fontWeight: 600 }}>{node.badge}</span>}
        {node.badgeType && (
          <span style={{
            fontSize: 10, padding: '1px 6px', borderRadius: 4, fontWeight: 600,
            background: node.badgeType === 'done' ? 'var(--success-bg)' : node.badgeType === 'generating' ? 'var(--warning-bg)' : node.badgeType === 'grade-a' ? 'var(--success-bg)' : 'var(--bg-tertiary)',
            color: node.badgeType === 'done' || node.badgeType === 'grade-a' ? 'var(--success)' : node.badgeType === 'generating' ? 'var(--warning)' : 'var(--text-tertiary)',
          }}>{node.badgeText}</span>
        )}
        {node.hasContent === true && !open && (
          <span style={{ fontSize: 9, color: 'var(--success)', fontWeight: 600 }}>●</span>
        )}
      </motion.div>
      {node.progress !== undefined && (
        <div style={{ height: 3, background: 'var(--bg-tertiary)', borderRadius: 2, margin: '2px 10px 4px 30px', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${node.progress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--accent)', borderRadius: 2 }}
          />
        </div>
      )}
      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {node.children.map(child => <TreeNode key={child.id} node={child} depth={depth + 1} onOverlay={onOverlay}
              accordionId={childAccordion} onAccordion={setChildAccordion} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ===== OVERLAY PANEL =====
function Overlay({ type, onClose }) {
  if (!type) return null

  const content = {
    editor: { title: '📝 第9集 · 破境逆袭 · 编辑器', actions: [] },
    storyboard: { title: '🎬 第9集 · 分镜编辑', actions: [] },
    timeline: { title: '⏱️ 第9集 · 时间轴编辑', actions: [{ text: '▶ 预览', primary: true }] },
    'video-preview': { title: '🎥 第9集 · 完整视频预览', actions: ['下载', { text: '✏️ 重新编辑时间轴', primary: true }] },
    outline: { title: '📋 大纲 · 逆天修仙路', actions: [{ text: '批量生成待生成集', primary: true }] },
    'lora-library': { title: '👥 角色 LoRA 资源库', actions: [{ text: '+ 新建角色', primary: true }] },
    lora: { title: '🧑 林凡 · LoRA 角色管理', actions: [] },
    worldview: { title: '🌍 世界观 · 修仙世界设定', actions: [] },
    export: { title: '📥 导出 · 逆天修仙路', actions: [] },
    settings: { title: '⚙️ 项目设置 · 逆天修仙路', actions: [{ text: '保存设置', primary: true }] },
    'project-settings': { title: '⚙️ 项目设置', actions: [{ text: '保存设置', primary: true }] },
    control: { title: '🎛️ 生成控制面板 · 第9集', actions: [{ text: '应用并重新生成', primary: true }] },
    profile: { title: '👤 个人信息', actions: [{ text: '保存', primary: true }] },
    subscription: { title: '⭐ 会员 & Credits', actions: [] },
    billing: { title: '💳 账单明细', actions: ['导出 CSV'] },
    preferences: { title: '⚙️ 偏好设置', actions: [{ text: '保存', primary: true }] },
  }
  const c = content[type] || { title: type, actions: [] }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 100,
        }}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '70%', maxWidth: 960, background: 'var(--bg-secondary)',
          zIndex: 101, display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{
          height: 52, display: 'flex', alignItems: 'center', padding: '0 20px',
          borderBottom: '1px solid var(--border-light)', gap: 12,
        }}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose}
            style={{
              width: 30, height: 30, border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', background: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          ><X size={16} /></motion.button>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            {c.actions.map((a, i) => {
              const isPrimary = typeof a === 'object'
              const text = typeof a === 'object' ? a.text : a
              return <CardBtn key={i} primary={isPrimary}>{text}</CardBtn>
            })}
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          <OverlayContent type={type} />
        </div>
      </motion.div>
    </>
  )
}

// ===== OUTLINE PANEL =====
function OutlinePanel() {
  const [activeArc, setActiveArc] = useState(2)
  const [editingEp, setEditingEp] = useState(null)
  const [branch, setBranch] = useState('main')
  const arcs = [
    { name: 'Arc 1: 觉醒', range: '1-4集', episodes: [
      { ep: 1, title: '灵根碎裂', hook: '灵根当众碎裂 + 齐远嘲讽', cliff: '碎裂灵根中爆出翠绿光芒', beat: '废柴定性 → 意外觉醒 → 魔神传承碎片', status: 'A', locked: true },
      { ep: 2, title: '隐传承', hook: '梦中对话上古魔神', cliff: '魔神提出以寿命为代价的契约', beat: '传承融合 → 代价揭示 → 痛苦抉择', status: 'A', locked: true },
      { ep: 3, title: '初试锋芒', hook: '宗门大比抽到齐远', cliff: '林凡单手接住齐远全力一击', beat: '被逼对战 → 碾压式逆袭 → 隐藏实力', status: 'A', locked: true },
      { ep: 4, title: '暗流涌动', hook: '长老密室发现古卷残页', cliff: '残页上的封印纹路与林凡右手裂纹一致', beat: '线索浮现 → 阴谋伏笔 → 危机预告', status: 'A', locked: true },
    ]},
    { name: 'Arc 2: 磨砺', range: '5-8集', episodes: [
      { ep: 5, title: '禁地试炼', hook: '散修联盟强制入禁地', cliff: '禁地深处传来与魔神相同的气息', beat: '被迫历练 → 能力觉醒 → 新线索', status: 'A', locked: true },
      { ep: 6, title: '生死一线', hook: '毒蛇围攻只剩一人', cliff: '苏婉儿坠崖前被一只神秘手臂接住', beat: '危机升级 → 感情线索 → 神秘势力', status: 'A', locked: true },
      { ep: 7, title: '黑色裂纹', hook: '右手黑纹扩散到手臂', cliff: '魔神说代价开始收取', beat: '代价显现 → 内心挣扎 → 加速修炼', status: 'B', locked: false },
      { ep: 8, title: '宗门暗战', hook: '齐远联合外敌设伏', cliff: '林凡走入圈套——笑了', beat: '反派联合 → 以退为进 → 将计就计', status: 'A', locked: true },
    ]},
    { name: 'Arc 3: 逆袭', range: '9-12集', episodes: [
      { ep: 9, title: '破境逆袭', hook: '灵根碎裂重组为混沌灵根', cliff: '荒古禁地的石棺裂纹与林凡同步', beat: '破境 → 碾压对手 → 更大的谜团', status: 'A', locked: false },
      { ep: 10, title: '真相浮现', hook: '石棺中的存在开口说话', cliff: '它叫出了林凡前世的名字', beat: '身世揭秘 → 前世因果 → 使命降临', status: 'draft' },
      { ep: 11, title: '终极对决', hook: '齐远获得邪神之力', cliff: '林凡以碎裂之力重创齐远，但黑纹覆盖全身', beat: '正邪对决 → 惨胜 → 代价爆发', status: 'draft' },
      { ep: 12, title: '新的起点', hook: '魔神出现要收回传承', cliff: '林凡微笑——"我已经不需要你了"', beat: '最终觉醒 → 超越传承 → 留悬念', status: 'draft' },
    ]},
  ]

  const statusMap = { A: { text: 'A', bg: 'var(--success-bg)', color: 'var(--success)' }, B: { text: 'B', bg: 'var(--warning-bg)', color: 'var(--warning)' }, draft: { text: '待生成', bg: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' } }

  return (
    <div>
      {/* Branch selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['main', 'branch_v2_ep03', 'branch_v3_ep07'].map(b => (
          <motion.button key={b} whileHover={{ scale: 1.03 }} onClick={() => setBranch(b)}
            style={{ padding: '6px 14px', borderRadius: 20, border: branch === b ? '1px solid var(--accent)' : '1px solid var(--border)', background: branch === b ? 'var(--accent-light)' : 'var(--bg-secondary)', color: branch === b ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {b === 'main' ? '🔵 主线' : `🔀 ${b}`}
          </motion.button>
        ))}
        <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '6px 14px', borderRadius: 20, border: '1px dashed var(--border)', background: 'transparent', fontSize: 12, cursor: 'pointer', color: 'var(--text-tertiary)', fontFamily: 'inherit' }}>+ 新建分支</motion.button>
      </div>

      {/* Arc tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
        {arcs.map((arc, i) => (
          <motion.button key={i} whileHover={{ background: 'var(--bg-hover)' }} onClick={() => setActiveArc(i)}
            style={{ padding: '8px 16px', borderRadius: '8px 8px 0 0', border: 'none', background: activeArc === i ? 'var(--accent-light)' : 'transparent', color: activeArc === i ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 13, fontWeight: activeArc === i ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit', borderBottom: activeArc === i ? '2px solid var(--accent)' : '2px solid transparent' }}>
            {arc.name} <span style={{ fontSize: 11, opacity: 0.7 }}>({arc.range})</span>
          </motion.button>
        ))}
      </div>

      {/* Episodes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {arcs[activeArc].episodes.map((ep, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <motion.div whileHover={{ background: 'var(--bg-hover)' }} onClick={() => setEditingEp(editingEp === ep.ep ? null : ep.ep)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer' }}>
              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', minWidth: 36 }}>E{String(ep.ep).padStart(2, '0')}</span>
              <span style={{ fontWeight: 600, flex: 1 }}>{ep.title}</span>
              {ep.locked && <Lock size={12} style={{ color: 'var(--text-tertiary)' }} />}
              <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 4, fontWeight: 600, background: statusMap[ep.status]?.bg, color: statusMap[ep.status]?.color }}>{statusMap[ep.status]?.text}</span>
              <motion.div animate={{ rotate: editingEp === ep.ep ? 90 : 0 }}><ChevronRight size={14} style={{ color: 'var(--text-tertiary)' }} /></motion.div>
            </motion.div>
            <AnimatePresence>
              {editingEp === ep.ep && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>🎣 开篇钩子</label>
                      <textarea defaultValue={ep.hook} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit', minHeight: 60, resize: 'vertical' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>🪝 结尾悬念</label>
                      <textarea defaultValue={ep.cliff} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit', minHeight: 60, resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>📐 节拍线</label>
                      <textarea defaultValue={ep.beat} style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit', minHeight: 40, resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      {ep.status !== 'draft' && <CardBtn>🔀 从此处创建分支</CardBtn>}
                      <CardBtn>🤖 AI 优化</CardBtn>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        style={{ padding: '6px 16px', border: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        💾 保存修改
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ marginTop: 20, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 16 }}>
        <span>📊 总集数: 12</span>
        <span>✅ 已完成: 9集</span>
        <span>📝 待生成: 3集</span>
        <span>🔀 分支: 3个</span>
      </div>
    </div>
  )
}

// ===== LORA CHARACTER MANAGEMENT PANEL =====
function LoRAPanel() {
  const [activeTab, setActiveTab] = useState('detail')
  const [selectedCandidates, setSelectedCandidates] = useState([0])
  const [editMode, setEditMode] = useState(false)
  const [showTrainModal, setShowTrainModal] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [showPromptEditor, setShowPromptEditor] = useState(false)
  const [trainModel, setTrainModel] = useState('FLUX')
  const [variantSeed, setVariantSeed] = useState(null)
  const [feedRound, setFeedRound] = useState(1)
  const [totalFed, setTotalFed] = useState(0)
  const [feedHistory, setFeedHistory] = useState([])
  const [showSubmitAnim, setShowSubmitAnim] = useState(false)
  const [trainingAssets, setTrainingAssets] = useState([
    { id: 't1', color: '#E8F5EE', label: '正面半身', source: '手动上传' },
    { id: 't2', color: '#FFF8E1', label: '侧面45°', source: '手动上传' },
    { id: 't3', color: '#E3F2FD', label: '全身站立', source: '手动上传' },
    { id: 't4', color: '#FCE4EC', label: '特写表情', source: '手动上传' },
    { id: 't5', color: '#F3E5F5', label: '战斗姿态', source: '手动上传' },
  ])
  const [assetsExpanded, setAssetsExpanded] = useState(false)
  const [showRetrainPrompt, setShowRetrainPrompt] = useState(false)
  const [newAssetCount, setNewAssetCount] = useState(0)
  const [hoverAsset, setHoverAsset] = useState(null)
  const MAX_TRAINING_ASSETS = 50 // 行业标准：FLUX/SDXL LoRA 推荐 15-50 张
  const COLLAPSED_SHOW = 10

  const character = {
    name: '林凡', role: '男主角', currentVersion: 3, branch: 'main',
    episodeRange: '1-12集', status: 'selected',
    appearance: '黑发，剑眉星目，身形修长。突破筑基后：眼眸带翠绿微光，右手出现黑色裂纹，气质从少年转为沉稳。',
    personality: '隐忍坚毅，外冷内热。面对欺辱时冷静，保护同伴时果断，独处时偶有迷茫。',
    outfit: '白色散修袍→觉醒后深灰色长衣，右臂露出黑纹。腰间系翠绿玉佩（传承信物）。',
    triggerWord: 'linFan_v3',
    trainingImages: 25,
    baseModel: 'FLUX',
  }

  const models = [
    { id: 'FLUX', name: 'FLUX', desc: '速度快，风格化强，推荐短剧场景', cost: 120, time: '~2min' },
    { id: 'SDXL', name: 'Stable Diffusion XL', desc: '写实细节强，适合特写镜头', cost: 100, time: '~5min' },
    { id: 'SD3', name: 'Stable Diffusion 3', desc: '最新架构，文字理解优秀', cost: 150, time: '~4min' },
    { id: 'CUSTOM', name: '自定义基底模型', desc: '上传自有 checkpoint', cost: 200, time: '~8min' },
  ]

  const versions = [
    { v: 3, branch: 'main', range: '9-12集', changes: '突破筑基，眼眸翠绿微光，右手黑纹', date: '今天 10:15', status: 'selected', credits: 120, model: 'FLUX' },
    { v: 2, branch: 'main', range: '5-8集', changes: '禁地历练后气质变化，增加伤疤', date: '昨天 14:30', status: 'selected', credits: 120, model: 'FLUX' },
    { v: 1, branch: 'main', range: '1-4集', changes: '初始形象：废柴少年', date: '2天前', status: 'selected', credits: 120, model: 'SDXL' },
    { v: 2, branch: 'branch_v2_ep03', range: '3-12集', changes: '分支：第3集提前觉醒', date: '昨天 09:00', status: 'ready', credits: 120, model: 'FLUX' },
  ]

  // Portrait candidates pool — each round generates new ones
  const allCandidatePools = [
    [
      { id: 'gen3_cand1', color: '#E8F5EE', label: '形象 A', desc: '正面半身·沉稳气质·翠绿微光明显·深灰长衣·玉佩清晰', seed: 42, steps: 30, cfg: 7.5 },
      { id: 'gen3_cand2', color: '#FFF8E1', label: '形象 B', desc: '侧身45°·冷峻眼神·微光较弱·右手黑纹特写·风吹发丝', seed: 128, steps: 30, cfg: 7.0 },
      { id: 'gen3_cand3', color: '#E3F2FD', label: '形象 C', desc: '正面特写·坚毅表情·裂纹从手腕延伸至手肘·翠绿光芒', seed: 256, steps: 35, cfg: 8.0 },
      { id: 'gen3_cand4', color: '#FCE4EC', label: '形象 D', desc: '远景·站立山巅·翠绿偏淡·黑纹隐约·整体气场展示', seed: 512, steps: 30, cfg: 7.5 },
    ],
    [
      { id: 'gen3_r2_a', color: '#F3E5F5', label: '形象 E', desc: '半身·微侧·翠绿微光增强·黑纹更锐利·衣袂飘动', seed: 1024, steps: 32, cfg: 7.8 },
      { id: 'gen3_r2_b', color: '#E0F7FA', label: '形象 F', desc: '正面·武器入镜·右手握剑·黑纹延伸至剑身·光影强', seed: 2048, steps: 33, cfg: 7.2 },
      { id: 'gen3_r2_c', color: '#FFF3E0', label: '形象 G', desc: '特写脸部·翠绿瞳孔清晰·黑纹从手蔓延至脸颊·决意', seed: 3072, steps: 35, cfg: 8.5 },
      { id: 'gen3_r2_d', color: '#E8EAF6', label: '形象 H', desc: '全身·背光站立·轮廓翠绿光晕·长衣下摆黑纹点缀', seed: 4096, steps: 30, cfg: 7.0 },
    ],
    [
      { id: 'gen3_r3_a', color: '#E0F2F1', label: '形象 I', desc: '战斗姿态·翠绿灵力爆发·黑纹环绕手臂·气势磅礴', seed: 5120, steps: 35, cfg: 8.2 },
      { id: 'gen3_r3_b', color: '#FBE9E7', label: '形象 J', desc: '静坐冥想·眼眸微闭·翠绿光从体内渗出·内敛', seed: 6144, steps: 30, cfg: 7.5 },
      { id: 'gen3_r3_c', color: '#F1F8E9', label: '形象 K', desc: '回眸·月下·翠绿微光映脸·黑纹若隐若现·神秘', seed: 7168, steps: 32, cfg: 7.8 },
      { id: 'gen3_r3_d', color: '#FFFDE7', label: '形象 L', desc: '受伤·半跪·黑纹扩散·但眼神坚定·翠绿光不灭', seed: 8192, steps: 35, cfg: 8.0 },
    ],
  ]
  const candidates = allCandidatePools[(feedRound - 1) % allCandidatePools.length]

  const handleSubmitToRAG = () => {
    if (selectedCandidates.length === 0) return
    const fed = selectedCandidates.map(i => candidates[i].label)
    const newAssets = selectedCandidates.map(i => ({
      id: `feed_r${feedRound}_${i}`,
      color: candidates[i].color,
      label: candidates[i].label,
      source: `第${feedRound}轮投喂`,
    }))
    setShowSubmitAnim(true)
    setTimeout(() => {
      setTrainingAssets(prev => [...prev, ...newAssets])
      setNewAssetCount(selectedCandidates.length)
      setFeedHistory(prev => [...prev, ...fed])
      setTotalFed(prev => prev + selectedCandidates.length)
      setFeedRound(prev => prev + 1)
      setSelectedCandidates([])
      setShowSubmitAnim(false)
      // Show retrain prompt if enough new assets accumulated
      if (totalFed + selectedCandidates.length >= 3) {
        setShowRetrainPrompt(true)
      }
    }, 800)
  }

  const handleDeleteAsset = (id) => {
    setTrainingAssets(prev => prev.filter(a => a.id !== id))
  }

  const handleUploadAsset = () => {
    if (trainingAssets.length >= MAX_TRAINING_ASSETS) return
    const newId = `upload_${Date.now()}`
    const colors = ['#E8F5EE','#FFF8E1','#E3F2FD','#FCE4EC','#F3E5F5','#E0F7FA','#FBE9E7','#F1F8E9']
    setTrainingAssets(prev => [...prev, {
      id: newId,
      color: colors[prev.length % colors.length],
      label: `上传图 ${prev.length + 1}`,
      source: '手动上传',
    }])
  }

  const queueTasks = [
    { char: '齐远', v: 1, status: 'training', progress: 65, eta: '3分钟', branch: 'main', credits: 120, model: 'FLUX' },
    { char: '苏婉儿', v: 3, status: 'queued', position: 2, eta: '8分钟', branch: 'main', credits: 120, model: 'FLUX' },
    { char: '张三丰', v: 1, status: 'ready', candidates: 4, branch: 'main', credits: 120, model: 'SDXL' },
  ]

  const tabs = [
    { key: 'detail', label: '角色设定', icon: '📋' },
    { key: 'candidates', label: '形象照选择', icon: '🎨' },
    { key: 'versions', label: '版本历史', icon: '📊' },
    { key: 'queue', label: '生成队列', icon: '⏳' },
  ]

  const toggleLike = (i) => {
    setSelectedCandidates(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  return (
    <div>
      {/* Character header card */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: 16, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
        <div style={{ width: 80, height: 80, borderRadius: 12, background: 'linear-gradient(135deg, #E8F5EE, #C4E8D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>🧑</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>{character.name}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 4, fontWeight: 600 }}>{character.role}</span>
            <span className="mono" style={{ fontSize: 11, padding: '2px 8px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 4, fontWeight: 600 }}>v{character.currentVersion} ✅</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>分支: <strong>{character.branch}</strong></span>
            <span>范围: <strong>{character.episodeRange}</strong></span>
            <span>触发词: <code style={{ background: 'var(--bg-secondary)', padding: '0 4px', borderRadius: 3 }}>{character.triggerWord}</code></span>
            <span>训练图: <strong>{trainingAssets.length}张</strong></span>
            <span>模型: <strong>{character.baseModel}</strong></span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => setShowTrainModal(true)}
            style={{ padding: '5px 12px', border: '1px solid var(--accent)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontFamily: 'inherit' }}>🔄 训练新版本</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>📋 复制到分支</motion.button>
        </div>
      </div>

      {/* ===== TRAIN NEW VERSION MODAL ===== */}
      <AnimatePresence>
        {showTrainModal && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ marginBottom: 20, border: '2px solid var(--accent)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>🔄 训练新版本 (v{character.currentVersion + 1})</span>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowTrainModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={16} /></motion.button>
            </div>
            <div style={{ padding: 16 }}>
              {/* Model selection */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 8, display: 'block' }}>选择训练基底模型</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {models.map(m => (
                    <motion.div key={m.id} whileHover={{ borderColor: 'var(--accent)' }} onClick={() => setTrainModel(m.id)}
                      style={{
                        padding: 12, border: trainModel === m.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s',
                        background: trainModel === m.id ? 'var(--accent-light)' : 'var(--bg-secondary)',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</span>
                        {trainModel === m.id && <Check size={14} style={{ color: 'var(--accent)' }} />}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginBottom: 4 }}>{m.desc}</div>
                      <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-tertiary)' }}>
                        <span>{m.cost} ⚡</span><span>{m.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Branch + Mix LoRA */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>所属分支</label>
                  <select style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit' }}>
                    <option>main</option><option>branch_v2_ep03</option><option>branch_v3_ep07</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>使用场景</label>
                  <select style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit' }}>
                    <option>通用（新旧分镜均可使用）</option><option>仅新生成的分镜</option><option>替换已有分镜</option>
                  </select>
                </div>
              </div>
              {/* Mix LoRA */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block' }}>🧬 Mix 训练（可选：混合已有 LoRA 权重）</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { name: '林凡 v2 (main)', project: '逆天修仙路', compat: 92 },
                    { name: '林凡 v1 (main)', project: '逆天修仙路', compat: 78 },
                    { name: '少年剑客 v3', project: '青云志', compat: 65 },
                    { name: '萧枫 v2', project: '末世求生记', compat: 41 },
                  ].map((lora, i) => (
                    <motion.label key={i} whileHover={{ borderColor: 'var(--accent)' }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                      <input type="checkbox" defaultChecked={i === 0} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{lora.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>项目: {lora.project}</div>
                      </div>
                      <div style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600,
                        background: lora.compat >= 80 ? 'var(--success-bg)' : lora.compat >= 60 ? 'var(--warning-bg)' : 'var(--bg-tertiary)',
                        color: lora.compat >= 80 ? 'var(--success)' : lora.compat >= 60 ? 'var(--warning)' : 'var(--text-tertiary)',
                      }}>相似度 {lora.compat}%</div>
                    </motion.label>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
                  💡 Mix 训练将融合选中 LoRA 的特征权重，加速收敛并保持风格连续性
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>变更说明</label>
                <textarea placeholder="描述本版本角色形象的变更点，如：突破后气质变化、新增黑纹..." style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontFamily: 'inherit', minHeight: 60, resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>训练参数</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div><label style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Steps</label><input type="number" defaultValue={1000} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                  <div><label style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Learning Rate</label><input type="text" defaultValue="1e-4" style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                  <div><label style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Rank</label><input type="number" defaultValue={16} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                </div>
              </div>
              {/* Cost summary */}
              <div style={{ padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>训练消耗</span><strong>{models.find(m=>m.id===trainModel)?.cost || 120} ⚡</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>形象照生成 (4张)</span><strong>含在训练中</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 4, color: 'var(--accent)' }}>
                  <span>当前余额</span><strong>1,280 ⚡ → {1280 - (models.find(m=>m.id===trainModel)?.cost || 120)} ⚡</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(15,170,108,0.2)' }} whileTap={{ scale: 0.97 }}
                  style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  🚀 开始训练 ({models.find(m=>m.id===trainModel)?.time})
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => setShowTrainModal(false)}
                  style={{ padding: '10px 20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>取消</motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border-light)' }}>
        {tabs.map(tab => (
          <motion.button key={tab.key} whileHover={{ background: 'var(--bg-hover)' }} onClick={() => setActiveTab(tab.key)}
            style={{ padding: '8px 16px', border: 'none', background: 'transparent', fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 500, color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit', borderBottom: activeTab === tab.key ? '2px solid var(--accent)' : '2px solid transparent' }}>
            {tab.icon} {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab: 角色设定 */}
      {activeTab === 'detail' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setEditMode(!editMode)}
              style={{ padding: '5px 14px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: editMode ? 'var(--accent-light)' : 'white', color: editMode ? 'var(--accent)' : 'inherit', fontWeight: 600, fontFamily: 'inherit' }}>
              {editMode ? '✅ 保存' : '✏️ 编辑'}
            </motion.button>
          </div>
          {[
            { label: '外貌描述', value: character.appearance },
            { label: '性格特点', value: character.personality },
            { label: '服装道具', value: character.outfit },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block' }}>{field.label}</label>
              {editMode ? (
                <textarea defaultValue={field.value} style={{ width: '100%', padding: 12, border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)', fontSize: 13.5, fontFamily: 'inherit', minHeight: 70, resize: 'vertical', lineHeight: 1.7 }} />
              ) : (
                <div style={{ padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{field.value}</div>
              )}
            </div>
          ))}
          {/* Retrain prompt */}
          <AnimatePresence>
            {showRetrainPrompt && newAssetCount > 0 && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ marginBottom: 12, padding: 12, background: 'linear-gradient(135deg, #E8F5EE, #FFF8E1)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>🎯 检测到新增 {newAssetCount} 张投喂素材</span>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowRetrainPrompt(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><X size={14} /></motion.button>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.5 }}>
                  当前训练素材已增至 <strong>{trainingAssets.length} 张</strong>，建议重新训练 LoRA 以提升角色一致性。
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => { setShowTrainModal(true); setShowRetrainPrompt(false) }}
                    style={{ padding: '6px 16px', border: 'none', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    🔄 立即重新训练 (v{character.currentVersion + 1})
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => setShowRetrainPrompt(false)}
                    style={{ padding: '6px 16px', border: '1px solid var(--border)', borderRadius: 6, background: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                    稍后再说
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Training assets / Reference images */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>
                参考图 / 训练素材 ({trainingAssets.length}/{MAX_TRAINING_ASSETS})
              </label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {trainingAssets.length > COLLAPSED_SHOW && (
                  <motion.button whileHover={{ color: 'var(--accent)' }} onClick={() => setAssetsExpanded(!assetsExpanded)}
                    style={{ fontSize: 11, color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {assetsExpanded ? `收起 ▲` : `展开全部 ${trainingAssets.length} 张 ▼`}
                  </motion.button>
                )}
              </div>
            </div>
            {/* Capacity bar */}
            <div style={{ height: 4, background: 'var(--border-light)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${(trainingAssets.length / MAX_TRAINING_ASSETS) * 100}%`, background: trainingAssets.length > 40 ? 'var(--warning)' : 'var(--accent)', borderRadius: 2, transition: 'width 0.3s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {(assetsExpanded ? trainingAssets : trainingAssets.slice(0, COLLAPSED_SHOW)).map((asset, i) => (
                <motion.div key={asset.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  onMouseEnter={() => setHoverAsset(asset.id)} onMouseLeave={() => setHoverAsset(null)}
                  style={{ aspectRatio: '1', background: `linear-gradient(135deg, ${asset.color}, #fff)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: asset.source.includes('投喂') ? '2px solid var(--accent)' : '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
                  🧑
                  {/* Source badge */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2px 4px', background: 'rgba(0,0,0,0.5)', fontSize: 9, color: 'white', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {asset.source.includes('投喂') ? '⚡ ' + asset.source : asset.label}
                  </div>
                  {/* Delete button on hover */}
                  <AnimatePresence>
                    {hoverAsset === asset.id && (
                      <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                        onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id) }}
                        style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: 'rgba(229,83,75,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={10} style={{ color: 'white' }} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {/* Upload button */}
              {trainingAssets.length < MAX_TRAINING_ASSETS && (
                <motion.div whileHover={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}
                  onClick={handleUploadAsset}
                  style={{ aspectRatio: '1', border: '2px dashed var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 2, transition: 'all 0.2s' }}>
                  <Plus size={16} style={{ color: 'var(--text-tertiary)' }} />
                  <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>上传</span>
                </motion.div>
              )}
            </div>
            {/* Format requirements & limits */}
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              📋 格式要求：PNG / JPG / WebP · 分辨率 ≥ 512×512 · 单张 ≤ 10MB · 推荐正方形裁切 · 背景简洁
              <br />
              📊 推荐数量：15-50张（当前 {trainingAssets.length} 张）· 涵盖不同角度、表情、光照 · 上限 {MAX_TRAINING_ASSETS} 张
              {trainingAssets.length >= MAX_TRAINING_ASSETS && <span style={{ color: 'var(--error)', fontWeight: 600 }}> · ⚠️ 已达上限，请删除部分素材后再上传</span>}
            </div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text-tertiary)' }}>使用统计</div>
            <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span>已使用集数: <strong>1-9集</strong></span>
              <span>生成图片: <strong>36张</strong></span>
              <span>生成视频: <strong>12段</strong></span>
              <span>总消耗: <strong>480 ⚡</strong></span>
            </div>
          </div>
          {editMode && (
            <div style={{ marginTop: 12, padding: 10, background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--warning)' }}>
              ⚠️ 修改角色设定将自动触发新 LoRA 版本 (v{character.currentVersion + 1}) 训练，消耗 120 ⚡
            </div>
          )}
        </motion.div>
      )}

      {/* Tab: 形象照选择 */}
      {activeTab === 'candidates' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ padding: 10, background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--info)', marginBottom: 12, lineHeight: 1.6 }}>
            💡 点 ❤️ 标记满意的形象照 → 提交后系统基于你的偏好<strong>生成新一批形象照</strong>替换 → 继续选择满意的 → 循环投喂越多越精准。
          </div>

          {/* Feed progress bar */}
          <div style={{ padding: 10, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12 }}>
              <span style={{ fontWeight: 600 }}>📊 投喂进度 · 第 {feedRound} 轮</span>
              <span style={{ color: 'var(--text-tertiary)' }}>累计投喂: <strong style={{ color: 'var(--accent)' }}>{totalFed} 张</strong> · 精准度: <strong style={{ color: 'var(--accent)' }}>{Math.min(98, 55 + totalFed * 8 + selectedCandidates.length * 5)}%</strong></span>
            </div>
            <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div animate={{ width: `${Math.min(98, 55 + totalFed * 8 + selectedCandidates.length * 5)}%` }} transition={{ duration: 0.5 }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), #06D6A0)', borderRadius: 3 }} />
            </div>
            {feedHistory.length > 0 && (
              <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-tertiary)' }}>
                已投喂: {feedHistory.join(' → ')}
              </div>
            )}
          </div>

          {/* Prompt editor toggle */}
          <AnimatePresence>
            {showPromptEditor && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--accent)' }}>⚙️ 生成提示词 & 参数</span>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowPromptEditor(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}><X size={14} /></motion.button>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>正向提示词 (Positive Prompt)</label>
                      <textarea defaultValue={`${character.triggerWord}, male, black hair, sword-shaped eyebrows, bright eyes, tall and slender, emerald green glow in eyes, black crack patterns on right hand, mature demeanor, dark grey robe, green jade pendant at waist, cinematic lighting, masterpiece, best quality`}
                        style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit', minHeight: 70, resize: 'vertical', lineHeight: 1.6 }} />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'block' }}>负向提示词 (Negative Prompt)</label>
                      <textarea defaultValue="deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, mutated"
                        style={{ width: '100%', padding: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit', minHeight: 50, resize: 'vertical', lineHeight: 1.6 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Steps</label><input type="number" defaultValue={30} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>CFG Scale</label><input type="number" defaultValue={7.5} step={0.5} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>LoRA 权重</label><input type="number" defaultValue={0.8} step={0.05} min={0} max={1} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Seed (-1=随机)</label><input type="number" defaultValue={-1} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>采样器</label>
                        <select style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }}>
                          {['Euler a', 'DPM++ 2M Karras', 'DPM++ SDE Karras', 'DDIM'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>尺寸</label>
                        <select style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }}>
                          {['512×768 (竖版)', '768×768 (方形)', '768×512 (横版)', '1024×1024 (高清)'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>生成数量</label><input type="number" defaultValue={4} min={1} max={8} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.button whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(15,170,108,0.2)' }} whileTap={{ scale: 0.97 }}
                        style={{ flex: 1, padding: '8px 0', border: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        🎨 使用此参数重新生成 (36 ⚡)
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', background: 'white' }}>重置默认</motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variant generation modal */}
          <AnimatePresence>
            {showVariantModal && variantSeed !== null && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--accent)' }}>🔀 基于「{candidates[variantSeed]?.label}」生成变体</span>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => { setShowVariantModal(false); setVariantSeed(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}><X size={14} /></motion.button>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      保持核心特征（脸型、发型、服饰主色），微调以下维度：
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                      {['表情变化', '光影调整', '配饰细节', '姿态微调', '背景切换', '年龄感微调', '情绪强度'].map((t, i) => (
                        <motion.label key={t} whileHover={{ borderColor: 'var(--accent)' }}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 20, fontSize: 12, cursor: 'pointer' }}>
                          <input type="checkbox" defaultChecked={i < 3} /> {t}
                        </motion.label>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>变体强度</label>
                        <input type="range" min="0.1" max="0.9" step="0.1" defaultValue="0.3" style={{ width: '100%' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-tertiary)' }}><span>微调</span><span>大变化</span></div>
                      </div>
                      <div><label style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>生成数量</label><input type="number" defaultValue={4} min={1} max={8} style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit' }} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.button whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(15,170,108,0.2)' }} whileTap={{ scale: 0.97 }}
                        style={{ flex: 1, padding: '8px 0', border: 'none', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        🔀 生成变体 (36 ⚡) · 树深度 V1→V2
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} onClick={() => { setShowVariantModal(false); setVariantSeed(null) }}
                        style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', background: 'white' }}>取消</motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Portrait grid 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {candidates.map((c, i) => (
              <motion.div key={i} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{
                  border: selectedCandidates.includes(i) ? '3px solid var(--accent)' : '2px solid var(--border)',
                  borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  boxShadow: selectedCandidates.includes(i) ? '0 0 0 4px var(--accent-light)' : 'none', transition: 'all 0.2s',
                }}>
                {/* Portrait image area */}
                <div style={{ height: 220, background: `linear-gradient(135deg, ${c.color}, ${c.color}88, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative', cursor: 'pointer' }}
                  onClick={() => toggleLike(i)}>
                  🧑
                  <div className="mono" style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, padding: '2px 6px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: 4 }}>{c.id}</div>
                  {/* Like badge */}
                  <motion.div
                    animate={selectedCandidates.includes(i) ? { scale: [1, 1.3, 1] } : {}}
                    style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      background: selectedCandidates.includes(i) ? '#FF4B6E' : 'rgba(255,255,255,0.8)',
                      border: selectedCandidates.includes(i) ? 'none' : '1px solid var(--border)',
                    }}>
                    <span style={{ fontSize: 14 }}>{selectedCandidates.includes(i) ? '❤️' : '🤍'}</span>
                  </motion.div>
                  {/* Seed info */}
                  <div className="mono" style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 9, padding: '2px 6px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: 4 }}>
                    seed:{c.seed} · steps:{c.steps} · cfg:{c.cfg}
                  </div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 8 }}>{c.desc}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <motion.button whileHover={{ scale: 1.05, background: 'var(--accent-light)' }} whileTap={{ scale: 0.95 }}
                      onClick={() => { setVariantSeed(i); setShowVariantModal(true) }}
                      style={{ flex: 1, padding: '5px 0', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>
                      🔀 生成变体
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05, background: 'var(--accent-light)' }} whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(i)}
                      style={{ padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: selectedCandidates.includes(i) ? '#FFF0F3' : 'white', fontFamily: 'inherit' }}>
                      {selectedCandidates.includes(i) ? '❤️' : '🤍'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Liked summary */}
          {selectedCandidates.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 16, padding: 12, background: '#FFF0F3', border: '1px solid #FFD0D9', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#E5534B', marginBottom: 6 }}>❤️ 本轮已选 {selectedCandidates.length} 张 · 累计投喂 {totalFed} 张</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.5 }}>
                点击「提交」→ 选中的作为正样本 → 系统生成新一批替换 → 继续选择投喂。投喂越多，后续生成的角色越接近你的期望。
              </div>
            </motion.div>
          )}

          {/* Submit animation overlay */}
          <AnimatePresence>
            {showSubmitAnim && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.85)' }}>
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}
                  style={{ textAlign: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ fontSize: 48, marginBottom: 12 }}>⚡</motion.div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>投喂中... 正在生成新一批形象照</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>基于你选中的 {selectedCandidates.length} 张偏好优化 LoRA</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            <motion.button
              whileHover={selectedCandidates.length > 0 ? { scale: 1.02, boxShadow: '0 4px 12px rgba(15,170,108,0.2)' } : {}}
              whileTap={selectedCandidates.length > 0 ? { scale: 0.97 } : {}}
              onClick={handleSubmitToRAG}
              style={{ padding: '10px 0', border: 'none', borderRadius: 'var(--radius-sm)', background: selectedCandidates.length > 0 ? 'var(--accent)' : 'var(--border)', color: 'white', fontSize: 13, fontWeight: 600, cursor: selectedCandidates.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background 0.2s' }}>
              {selectedCandidates.length > 0
                ? `✅ 提交 ${selectedCandidates.length} 张 → 生成新一批`
                : '请先选择满意的形象照'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '10px 0', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              🔄 重新生成全部 (120 ⚡)
            </motion.button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <motion.button whileHover={{ scale: 1.02, background: 'var(--bg-hover)' }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowPromptEditor(!showPromptEditor)}
              style={{ flex: 1, padding: '10px 0', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: showPromptEditor ? 'var(--accent-light)' : 'white', color: showPromptEditor ? 'var(--accent)' : 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              ⚙️ {showPromptEditor ? '收起' : '展开'} 提示词 / 参数编辑器
            </motion.button>
          </div>

          <div style={{ marginTop: 12, padding: 10, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span>积分: <strong style={{ color: 'var(--accent)' }}>{Math.max(0, 1280 - totalFed * 9)} ⚡</strong></span>
            <span>第 {feedRound} 轮 · 累计投喂 {totalFed} 张</span>
            <span>精准度: <strong style={{ color: 'var(--accent)' }}>{Math.min(98, 55 + totalFed * 8)}%</strong></span>
            <span>24h 未确认自动清理</span>
          </div>
        </motion.div>
      )}

      {/* Tab: 版本历史 */}
      {activeTab === 'versions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 2, background: 'var(--border)' }} />
            {versions.map((ver, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ marginBottom: 16, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -20, top: 12, width: 12, height: 12, borderRadius: '50%', background: ver.status === 'selected' ? 'var(--accent)' : 'var(--border)', border: '2px solid white' }} />
                <div style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: i === 0 ? 'var(--accent-light)' : 'var(--bg-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>v{ver.v}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', background: ver.branch === 'main' ? 'var(--accent-light)' : 'var(--warning-bg)', color: ver.branch === 'main' ? 'var(--accent)' : 'var(--warning)', borderRadius: 4, fontWeight: 600 }}>{ver.branch}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>第{ver.range}</span>
                    <span className="mono" style={{ fontSize: 10, padding: '1px 6px', background: 'var(--bg-tertiary)', borderRadius: 3, color: 'var(--text-tertiary)' }}>{ver.model}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-tertiary)' }}>{ver.date}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{ver.changes}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 4, fontWeight: 600, background: ver.status === 'selected' ? 'var(--success-bg)' : 'var(--bg-tertiary)', color: ver.status === 'selected' ? 'var(--success)' : 'var(--text-tertiary)' }}>
                      {ver.status === 'selected' ? '✅ 已使用' : '🕐 待选择'}
                    </span>
                    <span style={{ fontSize: 10.5, color: 'var(--text-tertiary)' }}>{ver.credits} ⚡</span>
                    <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                      <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>👁️ 预览</motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>📋 对比</motion.button>
                      {i > 0 && <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>🔄 回退</motion.button>}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ padding: 12, background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--info)', marginTop: 8 }}>
            💡 <strong>相似度检测:</strong> branch_v2_ep03 的 v2 与 main 的 v2 设定差异度仅 12%，建议复用以节省 120 ⚡
          </div>
        </motion.div>
      )}

      {/* Tab: 生成队列 */}
      {activeTab === 'queue' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {queueTasks.map((task, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 4, fontWeight: 600, background: task.status === 'training' ? 'var(--accent-light)' : task.status === 'queued' ? 'var(--warning-bg)' : 'var(--success-bg)', color: task.status === 'training' ? 'var(--accent)' : task.status === 'queued' ? 'var(--warning)' : 'var(--success)' }}>
                  {task.status === 'training' ? '⚙️ 训练中' : task.status === 'queued' ? '🕐 排队中' : '✅ 已完成'}
                </span>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{task.char}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>v{task.v}</span>
                <span className="mono" style={{ fontSize: 10, padding: '1px 6px', background: 'var(--bg-tertiary)', borderRadius: 3, color: 'var(--text-tertiary)' }}>{task.model}</span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{task.branch}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-tertiary)' }}>{task.credits} ⚡</span>
              </div>
              {task.status === 'training' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    <span>进度: {task.progress}%</span><span>预计剩余: {task.eta}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ duration: 1 }}
                      style={{ height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
                  </div>
                </div>
              )}
              {task.status === 'queued' && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>队列位置: 第{task.position}位 · 预计等待: {task.eta}</div>}
              {task.status === 'ready' && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{task.candidates}张形象照已生成，等待选择</div>}
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {task.status === 'ready' && <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '4px 12px', border: 'none', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>查看形象照</motion.button>}
                {task.status === 'queued' && <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '4px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>⬆️ 提高优先级 (+30 ⚡)</motion.button>}
                {task.status !== 'ready' && <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '4px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', color: 'var(--error)', fontFamily: 'inherit' }}>取消</motion.button>}
              </div>
            </motion.div>
          ))}
          <div style={{ padding: 10, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>并发上限: 3 (已用 1/3)</span><span>失败自动重试: 最多2次</span><span>24h未选择自动清理</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ===== LORA LIBRARY PANEL (cross-project) =====
function LoRALibraryPanel() {
  const [activeProject, setActiveProject] = useState('all')
  const loraAssets = [
    { name: '林凡', role: '男主角', version: 'v3', model: 'FLUX', status: 'selected', projects: [
      { name: '逆天修仙路', episodes: '1-12集', branch: 'main', usedIn: 36 },
    ], totalImages: 36, totalVideos: 12, lastUsed: '今天 14:36' },
    { name: '苏婉儿', role: '女主角', version: 'v2', model: 'FLUX', status: 'selected', projects: [
      { name: '逆天修仙路', episodes: '3-12集', branch: 'main', usedIn: 24 },
    ], totalImages: 24, totalVideos: 8, lastUsed: '昨天 16:20' },
    { name: '齐远', role: '反派', version: 'v1', model: 'FLUX', status: 'training', projects: [
      { name: '逆天修仙路', episodes: '1-12集', branch: 'main', usedIn: 0 },
    ], totalImages: 0, totalVideos: 0, lastUsed: '训练中' },
    { name: '少年剑客', role: '男主角', version: 'v3', model: 'SDXL', status: 'selected', projects: [
      { name: '青云志', episodes: '1-20集', branch: 'main', usedIn: 60 },
      { name: '逆天修仙路', episodes: '—', branch: '—', usedIn: 0 },
    ], totalImages: 60, totalVideos: 20, lastUsed: '3天前' },
    { name: '萧枫', role: '男主角', version: 'v2', model: 'FLUX', status: 'selected', projects: [
      { name: '末世求生记', episodes: '1-8集', branch: 'main', usedIn: 28 },
    ], totalImages: 28, totalVideos: 10, lastUsed: '5天前' },
    { name: '云瑶', role: '女配角', version: 'v1', model: 'SD3', status: 'ready', projects: [
      { name: '青云志', episodes: '5-20集', branch: 'main', usedIn: 15 },
    ], totalImages: 15, totalVideos: 5, lastUsed: '4天前' },
  ]
  const projects = ['all', '逆天修仙路', '青云志', '末世求生记']
  const filtered = activeProject === 'all' ? loraAssets : loraAssets.filter(l => l.projects.some(p => p.name === activeProject))
  const statusMap = { selected: { text: '✅ 就绪', bg: 'var(--success-bg)', color: 'var(--success)' }, training: { text: '⏳ 训练中', bg: 'var(--warning-bg)', color: 'var(--warning)' }, ready: { text: '🕐 待选择', bg: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' } }

  return (
    <div>
      {/* Project filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {projects.map(p => (
          <motion.button key={p} whileHover={{ scale: 1.03 }} onClick={() => setActiveProject(p)}
            style={{ padding: '6px 14px', borderRadius: 20, border: activeProject === p ? '1px solid var(--accent)' : '1px solid var(--border)', background: activeProject === p ? 'var(--accent-light)' : 'var(--bg-secondary)', color: activeProject === p ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {p === 'all' ? '📁 全部项目' : p}
          </motion.button>
        ))}
      </div>

      {/* Stats summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { label: '角色总数', value: filtered.length },
          { label: '已就绪', value: filtered.filter(l => l.status === 'selected').length },
          { label: '训练中', value: filtered.filter(l => l.status === 'training').length },
          { label: '跨项目复用', value: loraAssets.filter(l => l.projects.length > 1).length },
        ].map((s, i) => (
          <div key={i} style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div className="dm" style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Character LoRA list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((lora, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ boxShadow: 'var(--shadow-sm)', borderColor: 'var(--accent)' }}
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}>
            <div style={{ display: 'flex', gap: 14, padding: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(135deg, #E8F5EE, #C4E8D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {lora.role === '男主角' ? '🧑' : lora.role === '女主角' ? '👩' : lora.role === '反派' ? '😈' : '👤'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{lora.name}</span>
                  <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 4, fontWeight: 600 }}>{lora.role}</span>
                  <span className="mono" style={{ fontSize: 10, padding: '1px 6px', background: 'var(--bg-tertiary)', borderRadius: 4, fontWeight: 600 }}>{lora.version}</span>
                  <span className="mono" style={{ fontSize: 10, padding: '1px 6px', background: 'var(--bg-tertiary)', borderRadius: 4 }}>{lora.model}</span>
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, fontWeight: 600, background: statusMap[lora.status]?.bg, color: statusMap[lora.status]?.color }}>{statusMap[lora.status]?.text}</span>
                </div>
                {/* Projects usage */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
                  {lora.projects.map((p, j) => (
                    <div key={j} style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <span>📁 <strong>{p.name}</strong></span>
                      <span>{p.episodes}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>{p.branch}</span>
                      <span>生成 {p.usedIn} 次</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', display: 'flex', gap: 12 }}>
                  <span>🖼️ {lora.totalImages}张</span>
                  <span>🎥 {lora.totalVideos}段</span>
                  <span>⏰ {lora.lastUsed}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 10px', border: '1px solid var(--accent)', borderRadius: 6, fontSize: 10, cursor: 'pointer', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap' }}>在本项目使用</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>基于此训练</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New project LoRA suggestion tip */}
      <div style={{ marginTop: 16, padding: 12, background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--info)', lineHeight: 1.6 }}>
        💡 <strong>智能复用：</strong>创建新项目时，Agent 会自动检测资源库中相似度 ≥ 60% 的角色 LoRA，询问是否直接复用或基于已有 LoRA 进行适配训练。
      </div>
    </div>
  )
}

// ===== EPISODE EDITOR (overlay) =====
function EpisodeEditor() {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState('hook')
  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2500) }

  const sections = [
    { key: 'hook', label: '🎣 开篇钩子', color: 'var(--accent)', bg: '#F0FFF8',
      text: '「灵根……碎了？」白莲宗内门弟子齐远的嘴角勾起一抹残忍的弧度，看着跪倒在血泊中的林凡——\n\n然而下一秒，一道翠绿色的光芒从林凡碎裂的灵根中暴射而出……' },
    { key: 'body', label: '📝 正文', color: 'var(--text-primary)', bg: 'white',
      text: '林凡跪倒在血泊之中，丹田内的灵根碎裂声清晰可闻。白莲宗内门弟子齐远居高临下地看着他，嘴角带着残忍的笑意。\n\n「废物就是废物，连灵根都保不住。」齐远的声音在空旷的演武场上回荡。\n\n周围的弟子们面露嘲讽，无人上前帮忙。\n\n然而就在所有人准备散去的时候——\n\n林凡碎裂的丹田深处，一点翠绿色的光芒悄然亮起。\n\n「什么？！」齐远的表情从嘲讽变成了震惊。\n\n翠绿色的光芒猛地暴射而出，携带着一股远超筑基期的磅礴灵压——\n\n「不……不可能！」齐远被灵压轰飞出去。\n\n林凡缓缓站起来，双眸中翠绿色的光芒流转不定。\n\n「多谢齐师兄……的逼迫。」' },
    { key: 'cliff', label: '🪝 结尾悬念', color: 'var(--warning)', bg: '#FFFDF5',
      text: '林凡缓缓摊开右手——掌心到指尖，五条漆黑的裂纹正如蛛网般蔓延……\n\n千里之外的荒古禁地，尘封的石棺上出现了一模一样的裂纹——正在一寸一寸地碎裂。' },
  ]

  return (
    <div>
      {/* Version bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 6, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
        <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>v2 (current)</span>
        <select style={{ fontSize: 11, border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', fontFamily: 'inherit', marginLeft: 4 }}>
          <option>v2 (当前)</option><option>v1</option>
        </select>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>今天 14:36 · 3,200 字</span>
        {!editing && <motion.button whileHover={{ scale: 1.03 }} onClick={() => setEditing(true)}
          style={{ padding: '4px 12px', border: 'none', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✏️ 编辑</motion.button>}
        {editing && <>
          <motion.button whileHover={{ scale: 1.03 }} onClick={handleSave}
            style={{ padding: '4px 12px', border: 'none', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>💾 保存</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => setEditing(false)}
            style={{ padding: '4px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>取消</motion.button>
        </>}
      </div>
      <AnimatePresence>
        {saved && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ padding: '8px 12px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 6, fontSize: 12, fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>
          ✅ 已保存！v3 版本已进入生成队列。
        </motion.div>}
      </AnimatePresence>
      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {sections.map(s => (
          <motion.button key={s.key} whileHover={{ scale: 1.03 }} onClick={() => setActiveSection(s.key)}
            style={{ padding: '6px 14px', border: activeSection === s.key ? `2px solid ${s.color}` : '1px solid var(--border)', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: activeSection === s.key ? s.bg : 'white', color: activeSection === s.key ? s.color : 'var(--text-secondary)', fontFamily: 'inherit' }}>
            {s.label}
          </motion.button>
        ))}
      </div>
      {/* Content area */}
      {sections.filter(s => s.key === activeSection).map(sec => (
        <div key={sec.key}>
          {editing ? (
            <textarea defaultValue={sec.text} style={{ width: '100%', padding: '14px 16px', border: `2px solid ${sec.color}33`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', minHeight: sec.key === 'body' ? 300 : 120, lineHeight: 1.8, background: sec.bg }} />
          ) : (
            <div style={{ padding: '14px 16px', background: sec.bg, borderRadius: 8, border: `1px solid ${sec.color}22`, fontSize: 14, lineHeight: 1.9 }}>
              {sec.text.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
            </div>
          )}
        </div>
      ))}
      {/* Bottom actions */}
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <CardBtn>🤖 AI 重写本段</CardBtn>
        <CardBtn>📊 Gate 评分</CardBtn>
        <CardBtn>🔍 一致性检查</CardBtn>
        <CardBtn>📋 版本对比</CardBtn>
      </div>
      {/* Characters in this episode */}
      <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6 }}>本集出场角色</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{ name: '林凡', v: 'v3', emoji: '🧑' }, { name: '齐远', v: 'v1', emoji: '😈' }, { name: '苏婉儿', v: 'v2', emoji: '👩' }].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', border: '1px solid var(--border-light)', borderRadius: 16, fontSize: 11 }}>
              <span>{c.emoji}</span><strong>{c.name}</strong><span className="mono" style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{c.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== STORYBOARD EDITOR (overlay) =====
function StoryboardEditor() {
  const [selectedShot, setSelectedShot] = useState(null)
  const [saved, setSaved] = useState(false)
  const shots = [
    { id: 'S01_01', role: '开篇钩子', desc: '近景：林凡跪倒在血泊中，灵根碎裂的光芒从胸口散出。', cam: '近景', dur: '1.5', emotion: '绝望→愤怒', status: 'done', color: '#E8F5EE', char: '林凡·齐远', audio: [{ type: '旁白', text: '齐远嘴角勾起弧度' }, { type: '音效', text: '碎裂声' }] },
    { id: 'S01_02', role: '开篇钩子', desc: '特写：齐远冷笑的表情，嘴角残忍的弧度。', cam: '特写', dur: '1.0', emotion: '残忍', status: 'done', color: '#FFF3E0', char: '齐远', audio: [{ type: '对白', text: '灵根碎了？哈哈' }] },
    { id: 'S02_01', role: '铺垫', desc: '远景：翠绿色光柱暴射，灵力风暴席卷山谷。', cam: '远景', dur: '2.0', emotion: '震撼', status: 'generating', color: '#E3F2FD', char: '林凡', audio: [{ type: '旁白', text: '翠绿光柱冲天而起' }, { type: 'BGM', text: '史诗交响' }] },
    { id: 'S02_02', role: '铺垫', desc: '中景：齐远被灵力冲击波轰退三十丈，吐血。', cam: '中景', dur: '1.8', emotion: '惊恐', status: 'generating', color: '#F3E5F5', char: '齐远', audio: [{ type: '对白', text: '啊——！' }, { type: '音效', text: '爆炸冲击' }] },
    { id: 'S02_03', role: '铺垫', desc: '近景：齐远恐惧颤抖的表情。', cam: '近景', dur: '2.5', emotion: '恐惧颤抖', status: 'text', color: '#FCE4EC', char: '齐远', audio: [{ type: '对白', text: '不可能！' }] },
    { id: 'S03_01', role: '高潮', desc: '近景：林凡嘴角微扬——"多谢齐师兄的逼迫"。', cam: '近景', dur: '1.5', emotion: '淡然→霸气', status: 'text', color: '#E8F5EE', char: '林凡', audio: [{ type: '对白', text: '多谢齐师兄' }] },
    { id: 'S04_01', role: '结尾悬念', desc: '特写：林凡右手掌心出现漆黑裂纹，如蛛网蔓延。', cam: '特写', dur: '2.0', emotion: '不安→恐惧', status: 'text', color: '#FFF8E1', char: '林凡', audio: [{ type: '旁白', text: '五条漆黑裂纹蔓延' }, { type: '音效', text: '诡异嗡鸣' }] },
    { id: 'S04_02', role: '结尾悬念', desc: '全景：荒古禁地石棺同步碎裂。', cam: '全景', dur: '2.5', emotion: '悬疑恐怖', status: 'text', color: '#E0F7FA', char: '—', audio: [{ type: 'BGM', text: '悬念钢琴' }] },
  ]
  const sel = shots.find(s => s.id === selectedShot)
  const statusLabels = { done: '✅ 完成', generating: '⏳ 生成中', text: '📝 文本' }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      {/* Shot grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {shots.map((shot, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03, borderColor: 'var(--accent)' }} onClick={() => setSelectedShot(shot.id)}
            style={{ border: selectedShot === shot.id ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'border 0.2s' }}>
            <div style={{ height: 80, background: `linear-gradient(135deg, ${shot.color}, ${shot.color}dd)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, position: 'relative' }}>
              🎬
              <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 8, padding: '1px 4px', borderRadius: 3, background: 'rgba(0,0,0,0.3)', color: 'white' }}>{statusLabels[shot.status]}</span>
            </div>
            <div style={{ padding: '6px 8px' }}>
              <div className="mono" style={{ fontSize: 10, fontWeight: 700 }}>{shot.id}</div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{shot.cam} · {shot.dur}s</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Detail editor for selected shot */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            style={{ border: '2px solid var(--accent)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-light)' }}>
              <span className="mono" style={{ fontWeight: 800, fontSize: 14, color: 'var(--accent)' }}>{sel.id}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{sel.role}</span>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'white', color: sel.status === 'done' ? 'var(--success)' : sel.status === 'generating' ? 'var(--warning)' : 'var(--text-tertiary)', fontWeight: 600 }}>{statusLabels[sel.status]}</span>
              {sel.char !== '—' && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 600 }}>🎭 {sel.char}</span>}
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div><label style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, display: 'block' }}>镜头描述</label>
                <textarea defaultValue={sel.desc} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', resize: 'vertical', minHeight: 50, lineHeight: 1.5 }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 2, display: 'block' }}>景别</label>
                  <select defaultValue={sel.cam} style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'inherit' }}>
                    {['特写', '近景', '中景', '全景', '远景', '仰角', '俯角', '空镜'].map(c => <option key={c}>{c}</option>)}
                  </select></div>
                <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 2, display: 'block' }}>时长(秒)</label>
                  <input type="number" defaultValue={sel.dur} step="0.1" style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'inherit' }} /></div>
                <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 2, display: 'block' }}>情绪</label>
                  <input defaultValue={sel.emotion} style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'inherit' }} /></div>
                <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 2, display: 'block' }}>运镜</label>
                  <select style={{ width: '100%', padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'inherit' }}>
                    {['固定', '推进', '拉远', '横摇', '缓推', '急推', '环绕', '跟拍'].map(m => <option key={m}>{m}</option>)}
                  </select></div>
              </div>
              {/* Audio tracks */}
              <div><label style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, display: 'block' }}>🔊 音轨 ({sel.audio.length})</label>
                {sel.audio.map((a, ai) => (
                  <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', marginBottom: 2, background: '#FDFBFF', borderRadius: 4, fontSize: 10.5 }}>
                    <span style={{ padding: '1px 5px', borderRadius: 3, fontWeight: 600, fontSize: 9, background: a.type === '对白' ? '#FCE4EC' : a.type === 'BGM' ? '#E8F5EE' : a.type === '音效' ? '#FFF3E0' : '#EDE9FE', color: a.type === '对白' ? '#D81B60' : a.type === 'BGM' ? '#0FAA6C' : a.type === '音效' ? '#E8973A' : '#8B5CF6' }}>{a.type}</span>
                    <input defaultValue={a.text} style={{ flex: 1, padding: '3px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, fontFamily: 'inherit' }} />
                    <motion.button whileHover={{ scale: 1.1 }} style={{ padding: '2px 6px', border: '1px solid #D4C4F5', borderRadius: 3, fontSize: 9, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶</motion.button>
                  </div>
                ))}
                <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '3px 8px', border: '1px dashed var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit', color: 'var(--accent)', marginTop: 4 }}>+ 添加音轨</motion.button>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <CardBtn primary onClick={handleSave}>💾 保存修改</CardBtn>
                <CardBtn>🔄 重新生成</CardBtn>
                <CardBtn>🎬 视频预览</CardBtn>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 10px', border: '1px solid var(--error)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', color: 'var(--error)', fontWeight: 600, fontFamily: 'inherit', marginLeft: 'auto' }}>🗑️ 删除</motion.button>
              </div>
              <AnimatePresence>
                {saved && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ padding: '6px 10px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>✅ 已保存！</motion.div>}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!selectedShot && <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>👆 点击上方分镜卡片查看详情并编辑</div>}
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <CardBtn>➕ 新增分镜</CardBtn>
        <CardBtn>🔄 批量重新生成</CardBtn>
        <CardBtn>📥 导出 JSON</CardBtn>
        <CardBtn>🤖 AI 优化分镜</CardBtn>
      </div>
    </div>
  )
}

// ===== WORLDVIEW EDITOR (overlay) =====
function WorldviewEditor() {
  const [editingIdx, setEditingIdx] = useState(-1)
  const [saved, setSaved] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const handleSave = () => { setSaved(true); setEditingIdx(-1); setTimeout(() => setSaved(false), 2000) }

  const sections = [
    { icon: '⚔️', label: '修炼体系', text: '灵根→筑基→金丹→元婴→化神→渡劫→大乘\n\n特殊：逆脉体质（主角）可吸收天地浊气为己用，灵根碎裂后反而打通逆脉。\n\n突破规则：每次突破需要明确因果链，禁止无代价突破。' },
    { icon: '🏰', label: '势力分布', text: '白莲宗（正道第一宗）— 内门弟子分九层，掌教修为化神中期\n\n魔渊殿（魔修总部）— 殿主修为渡劫初期，实力最强\n\n荒古禁地（上古遗迹）— 每百年开启一次，内有上古传承\n\n天机阁（中立情报组织）— 出售情报、灵材，不参与纷争' },
    { icon: '📜', label: '核心规则', text: '① 灵力浓度随海拔升高\n② 魔气与灵气互斥，不可共存\n③ 逆脉者每突破一境需承受一次「魔噬」\n④ 荒古禁地每百年开启一次\n⑤ 主线时间流速恒定，禁地内可有时间加速' },
    { icon: '🔮', label: '伏笔体系', text: '黑色裂纹 → 魔神传承 → 荒古石棺 → 逆脉觉醒\n\n林凡右手裂纹与石棺裂纹同步 → 暗示魔神转世\n\n苏婉儿的身世 → 天机阁阁主之女（第11集揭露）\n\n齐远的黑化 → 被魔渊殿收买（第10集伏笔）' },
    { icon: '🌍', label: '地理设定', text: '天玄大陆 → 中央为白莲宗山脉\n\n五大禁地环绕大陆边缘\n\n荒古禁地位于北方极寒之地\n\n灵脉网络连接各宗门，传送阵需灵石驱动' },
    { icon: '⏰', label: '时间线', text: '第1-4集：3天内（觉醒到内门比武）\n第5-8集：1个月（外门试炼到筑基突破）\n第9-12集：7天（逆袭到荒古禁地开启）' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 6, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
        <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>v2</span>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>6 个设定模块 · 上次编辑: 今天 10:15</span>
        <motion.button whileHover={{ scale: 1.03 }} onClick={() => setShowAdd(!showAdd)}
          style={{ padding: '4px 12px', border: '1px solid var(--accent)', borderRadius: 6, background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>➕ 添加设定</motion.button>
      </div>
      <AnimatePresence>
        {saved && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ padding: '6px 10px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 6, fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>✅ 已保存！</motion.div>}
        {showAdd && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          style={{ marginBottom: 12, padding: 12, border: '2px dashed var(--accent)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>新增设定模块</div>
          <input placeholder="模块名称，如「灵兽系统」" style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', marginBottom: 6 }} />
          <textarea placeholder="设定内容..." style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', resize: 'vertical', minHeight: 60, lineHeight: 1.5 }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <CardBtn primary onClick={() => { setShowAdd(false); handleSave() }}>💾 添加</CardBtn>
            <CardBtn>🤖 AI 生成</CardBtn>
            <CardBtn onClick={() => setShowAdd(false)}>取消</CardBtn>
          </div>
        </motion.div>}
      </AnimatePresence>
      {sections.map((sec, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
          style={{ border: editingIdx === i ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: 8, marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', background: editingIdx === i ? 'var(--accent-light)' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
            onClick={() => setEditingIdx(editingIdx === i ? -1 : i)}>
            <span style={{ fontSize: 14 }}>{sec.icon}</span>
            <span style={{ fontWeight: 600, fontSize: 12.5, flex: 1 }}>{sec.label}</span>
            {editingIdx !== i && <motion.button whileHover={{ scale: 1.05 }} onClick={e => { e.stopPropagation(); setEditingIdx(i) }}
              style={{ padding: '2px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>✏️</motion.button>}
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{editingIdx === i ? '▼' : '▶'}</span>
          </div>
          <AnimatePresence>
            {editingIdx === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}>
                <div style={{ padding: 12 }}>
                  <textarea defaultValue={sec.text} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', minHeight: 100, lineHeight: 1.7 }} />
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <CardBtn primary onClick={handleSave}>💾 保存</CardBtn>
                    <CardBtn>🤖 AI 扩充</CardBtn>
                    <CardBtn>🔄 AI 改写</CardBtn>
                    <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 10px', border: '1px solid var(--error)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', color: 'var(--error)', fontWeight: 600, fontFamily: 'inherit', marginLeft: 'auto' }}>🗑️ 删除</motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <div style={{ marginTop: 8, padding: 8, background: '#F5F0FF', borderRadius: 6, fontSize: 10.5, color: 'var(--text-tertiary)' }}>
        💡 在会话中对话即可增量更新：如「添加灵兽系统设定」「修改修炼体系加入散修阶段」
      </div>
    </div>
  )
}

function OverlayContent({ type }) {
  if (type === 'editor') return <EpisodeEditor />
  
  if (type === 'lora-library') return <LoRALibraryPanel />
  if (type === 'video-preview') return (
    <div>
      {/* Video player area */}
      <div style={{ height: 340, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative' }}>
        <motion.div whileHover={{ scale: 1.1 }} style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Play size={28} style={{ color: 'white', marginLeft: 4 }} />
        </motion.div>
        <div className="mono" style={{ position: 'absolute', bottom: 12, right: 16, color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>00:00 / 00:19</div>
        <div style={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 4 }}>v2 (最新)</span>
          <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 4 }}>1080p</span>
        </div>
      </div>
      {/* Shot timeline with audio */}
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>分镜时间轴</div>
      <div style={{ display: 'flex', gap: 2, padding: 8, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', overflowX: 'auto', marginBottom: 4 }}>
        {TIMELINE_SHOTS.map(shot => (
          <div key={shot.id} style={{ minWidth: 80, height: 40, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'white', background: clipColors[shot.type], flexShrink: 0, flexDirection: 'column' }}>
            <span>{shot.id}</span><span style={{ fontSize: 9, opacity: 0.7 }}>{shot.dur}s</span>
          </div>
        ))}
      </div>
      {/* Audio quick preview per shot */}
      <div style={{ display: 'flex', gap: 2, padding: 8, background: '#F5F0FF', borderRadius: 'var(--radius-sm)', overflowX: 'auto', marginBottom: 16 }}>
        {TIMELINE_SHOTS.map(shot => {
          const audioTypes = { 'S01_01': '旁白', 'S01_02': '旁白', 'S02_01': '旁白+BGM', 'S02_02': '音效', 'S02_03': '对白', 'S03_01': '对白', 'S04_01': '旁白', 'S04_02': 'BGM' }
          return (
            <motion.div key={shot.id} whileHover={{ scale: 1.05 }}
              style={{ minWidth: 80, height: 36, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, border: '1px solid #E0D4F5', background: '#EDE9FE', flexShrink: 0, flexDirection: 'column', cursor: 'pointer', gap: 1 }}>
              <span style={{ color: '#8B5CF6' }}>🔊 {audioTypes[shot.id] || '—'}</span>
              <span style={{ color: '#8B5CF6', opacity: 0.7 }}>▶ 试听</span>
            </motion.div>
          )
        })}
      </div>
      {/* Version list */}
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>版本历史</div>
      {[
        { v: 'v2', date: '今天 14:40', status: '✅ 当前', duration: '19s', shots: 8 },
        { v: 'v1', date: '昨天 16:30', status: '历史版本', duration: '17s', shots: 7 },
      ].map((ver, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: 8 }}>
          <span className="mono" style={{ fontWeight: 700, color: 'var(--accent)' }}>{ver.v}</span>
          <span style={{ fontSize: 12 }}>{ver.duration} · {ver.shots}个镜头</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{ver.date}</span>
          <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: i === 0 ? 'var(--success-bg)' : 'var(--bg-tertiary)', color: i === 0 ? 'var(--success)' : 'var(--text-tertiary)', fontWeight: 600 }}>{ver.status}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶ 播放</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>📥 下载</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--accent)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600, fontFamily: 'inherit' }}>✏️ 编辑时间轴</motion.button>
          </div>
        </div>
      ))}
    </div>
  )
  if (type === 'outline') return <OutlinePanel />
  if (type === 'timeline') return <TimelineEditor />
  
  if (type === 'storyboard') return <StoryboardEditor />
  

  if (type === 'worldview') return <WorldviewEditor />

  if (type === 'lora') return <LoRAPanel />


  if (type === 'export') return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>选择导出内容</div>
      {[
        { label: '章节文本', desc: 'Markdown / TXT 格式', checked: true },
        { label: '分镜 JSON', desc: '结构化镜头表', checked: true },
        { label: '字幕文件', desc: 'SRT / ASS 格式' },
        { label: '素材包', desc: '按 shot_id 打包图片' },
        { label: '成片视频', desc: 'MP4 / MOV' },
      ].map((item, i) => (
        <motion.label key={i} whileHover={{ borderColor: 'var(--accent)' }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', marginBottom: 8, transition: 'border-color 0.2s' }}>
          <input type="checkbox" defaultChecked={item.checked} />
          <span><strong>{item.label}</strong><br /><span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.desc}</span></span>
        </motion.label>
      ))}
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <span style={{ padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 20, fontSize: 13, cursor: 'pointer', background: 'var(--bg-secondary)' }}>全部 (1-9集)</span>
        <span style={{ padding: '6px 14px', border: '1px solid var(--accent)', borderRadius: 20, fontSize: 13, cursor: 'pointer', background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600 }}>当前集 (第9集)</span>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        style={{ width: '100%', marginTop: 20, padding: 12, background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
        📥 开始导出
      </motion.button>
    </div>
  )

  if (type === 'settings' || type === 'project-settings') return (
    <div style={{ maxWidth: 560 }}>
      {[
        { label: '项目名称', type: 'input', value: '逆天修仙路' },
        { label: '题材', type: 'tags', options: ['修仙', '末世', '都市', '恋爱', '悬疑'], selected: ['修仙'] },
        { label: '总集数', type: 'number', value: 12 },
        { label: '文风', type: 'tags', options: ['爽文直给', '影视化', '文学化', '口语化'], selected: ['爽文直给'] },
        { label: '自定义文风', type: 'textarea', placeholder: '补充描述...' },
      ].map((field, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{field.label}</label>
          {field.type === 'input' && <input defaultValue={field.value} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit' }} />}
          {field.type === 'number' && <input type="number" defaultValue={field.value} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit' }} />}
          {field.type === 'textarea' && <textarea placeholder={field.placeholder} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit', minHeight: 60, resize: 'vertical' }} />}
          {field.type === 'tags' && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {field.options.map(o => (
              <span key={o} style={{ padding: '8px 16px', border: `1px solid ${field.selected?.includes(o) ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, cursor: 'pointer', background: field.selected?.includes(o) ? 'var(--accent-light)' : 'var(--bg-secondary)', color: field.selected?.includes(o) ? 'var(--accent)' : 'inherit', fontWeight: field.selected?.includes(o) ? 600 : 400 }}>{o}</span>
            ))}
          </div>}
        </div>
      ))}
      <div style={{ padding: 12, background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--warning)' }}>
        ⚠️ 修改项目级设定可能影响后续集的一致性，系统将自动生成新的设定版本。
      </div>
    </div>
  )

  if (type === 'control') return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ padding: 12, background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--info)', marginBottom: 20 }}>
        💡 修改参数将生成新版本。以下为第9集覆盖参数。
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>爽点类型</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['逆袭', '反转', '打脸', '系统奖励', '情绪爆发'].map((t, i) => (
            <span key={t} style={{ padding: '8px 16px', border: `1px solid ${i < 2 ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, cursor: 'pointer', background: i < 2 ? 'var(--accent-light)' : 'var(--bg-secondary)', color: i < 2 ? 'var(--accent)' : 'inherit', fontWeight: i < 2 ? 600 : 400 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>开篇钩子类型<HelpTip term="开篇钩子" /></label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['冲突开场', '信息差爆点', '高压倒计时', '爽点直给'].map((t, i) => (
            <span key={t} style={{ padding: '8px 16px', border: `1px solid ${i % 2 === 0 ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, cursor: 'pointer', background: i % 2 === 0 ? 'var(--accent-light)' : 'var(--bg-secondary)', color: i % 2 === 0 ? 'var(--accent)' : 'inherit', fontWeight: i % 2 === 0 ? 600 : 400 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>重点人物</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['林凡', '齐远', '苏婉儿', '张三丰'].map((t, i) => (
            <span key={t} style={{ padding: '8px 16px', border: `1px solid ${i < 2 ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, cursor: 'pointer', background: i < 2 ? 'var(--accent-light)' : 'var(--bg-secondary)', color: i < 2 ? 'var(--accent)' : 'inherit', fontWeight: i < 2 ? 600 : 400 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: 12, background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--warning)' }}>
        ⚠️ 修改爽点和冲突强度将触发重跑。预计消耗 45 Credits ⚡
      </div>
    </div>
  )

  if (type === 'profile') return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #E8F5EE, #C4E8D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👤</div>
        <div><div style={{ fontSize: 18, fontWeight: 700 }}>创作者</div><div style={{ fontSize: 13, color: 'var(--accent)' }}>专业版会员</div></div>
      </div>
      {[['用户名', '创作者'], ['邮箱', 'creator@example.com']].map(([label, val]) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{label}</label>
          <input defaultValue={val} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit' }} />
        </div>
      ))}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>密码</label>
        <input type="password" defaultValue="12345678" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit' }} />
      </div>
    </div>
  )

  if (type === 'subscription') return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, padding: 20, background: 'var(--accent-subtle)', border: '2px solid var(--accent)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>当前方案</div>
          <div style={{ fontSize: 20, fontWeight: 700, margin: '4px 0' }}>专业版</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>≤5000字/集 · 优先队列</div>
        </div>
        <div style={{ flex: 1, padding: 20, background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>剩余 Credits</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', margin: '4px 0' }}>1,280 ⚡</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>本月已用 2,720</div>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} style={{ width: '100%', padding: 10, background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
        🛒 购买额外 Credits
      </motion.button>
    </div>
  )

  if (type === 'billing') return (
    <div style={{ maxWidth: 640 }}>
      {[
        ['第9集文本生成（规划器+开篇钩子+写手+裁判）', '-85 ⚡', '14:33'],
        ['第9集结尾重写（结尾悬念重写 × 1）', '-15 ⚡', '14:36'],
        ['第9集分镜生成（12 shots）', '-40 ⚡', '14:34'],
        ['林凡 LoRA v3 训练（4 候选）', '-120 ⚡', '13:20'],
        ['分镜视频 S01_01, S01_02（1080p）', '-60 ⚡', '14:35'],
      ].map(([desc, cost, time], i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          style={{ display: 'flex', alignItems: 'center', padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: 13, marginBottom: 8 }}>
          <span style={{ flex: 1 }}>{desc}</span>
          <span style={{ fontWeight: 600 }}>{cost}</span>
          <span style={{ marginLeft: 12, fontSize: 11, color: 'var(--text-tertiary)' }}>{time}</span>
        </motion.div>
      ))}
    </div>
  )

  if (type === 'preferences') return (
    <div style={{ maxWidth: 480 }}>
      {[
        { title: '界面', items: [{ label: '语言', value: '简体中文' }, { label: '主题', value: '浅色' }] },
        { title: '通知', items: [{ label: '生成完成通知', toggle: true, checked: true }, { label: '一致性警告', toggle: true, checked: true }, { label: '邮件通知', toggle: true }] },
        { title: '默认生成参数', items: [{ label: '默认 Tier', value: 'Standard' }, { label: '默认分辨率', value: '1080p' }] },
      ].map((group, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{group.title}</div>
          {group.items.map((item, j) => (
            <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              {item.toggle ? (
                <label style={{ position: 'relative', width: 36, height: 20, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={item.checked} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', inset: 0, background: item.checked ? 'var(--accent)' : 'var(--border)', borderRadius: 10, transition: 'background 0.2s' }} />
                </label>
              ) : <span style={{ fontWeight: 600, fontSize: 12 }}>{item.value}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', paddingTop: 60, fontSize: 15 }}>面板内容加载中...</div>
}

// ===== TIMELINE EDITOR =====
const TIMELINE_SHOTS = [
  { id: 'S01_01', role: '开篇钩子', type: 'hook', dur: 1.5, cam: '近景', desc: '林凡跪倒在血泊中，灵根碎裂的光芒从胸口散出', emotion: '绝望→愤怒', char: '林凡', status: 'done' },
  { id: 'S01_02', role: '开篇钩子', type: 'hook', dur: 1.0, cam: '特写', desc: '齐远冷笑的表情，嘴角残忍的弧度', emotion: '残忍', char: '齐远', status: 'done' },
  { id: 'S02_01', role: '铺垫', type: 'body', dur: 2.0, cam: '远景', desc: '翠绿色光柱暴射而出，灵力风暴席卷山谷', emotion: '震撼', char: '林凡', status: 'generating' },
  { id: 'S02_02', role: '铺垫', type: 'body', dur: 1.8, cam: '中景', desc: '齐远被灵力冲击波轰退三十丈，吐血', emotion: '惊恐', char: '齐远', status: 'generating' },
  { id: 'S02_03', role: '高潮', type: 'body', dur: 2.5, cam: '仰角', desc: '林凡缓缓站起，双眼翠绿微光，金丹悬于丹田', emotion: '霸气', char: '林凡', status: 'text' },
  { id: 'S03_01', role: '铺垫', type: 'body', dur: 1.5, cam: '近景', desc: '林凡嘴角微扬——"多谢齐师兄的逼迫"', emotion: '淡然→霸气', char: '林凡', status: 'text' },
  { id: 'S04_01', role: '结尾悬念', type: 'cliff', dur: 2.0, cam: '特写', desc: '林凡右手掌心出现漆黑裂纹，如蛛网蔓延', emotion: '不安→恐惧', char: '林凡', status: 'text' },
  { id: 'S04_02', role: '结尾悬念', type: 'cliff', dur: 2.5, cam: '远景', desc: '荒古禁地石棺出现相同裂纹，万年封印碎裂', emotion: '恐惧→悬念', char: '-', status: 'text' },
]

const clipColors = {
  hook: 'linear-gradient(135deg, #0FAA6C, #06D6A0)',
  body: 'linear-gradient(135deg, #4A90D9, #64B5F6)',
  cliff: 'linear-gradient(135deg, #E8973A, #FFB74D)',
}
const roleColors = {
  '开篇钩子': { bg: '#E8F9F0', color: '#0FAA6C' },
  '铺垫': { bg: '#EBF3FC', color: '#4A90D9' },
  '高潮': { bg: '#FEF1F0', color: '#E5534B' },
  '结尾悬念': { bg: '#FEF6ED', color: '#E8973A' },
}
const statusLabels = {
  done: { text: '✅ 已完成', bg: '#E8F9F0', color: '#0FAA6C' },
  generating: { text: '⏳ 生成中', bg: '#FEF6ED', color: '#E8973A' },
  text: { text: '📝 文本阶段', bg: '#F4F5F7', color: '#5A6070' },
}

function TimelineEditor() {
  const [selected, setSelected] = useState(null)
  const [shots, setShots] = useState(TIMELINE_SHOTS)
  const [saved, setSaved] = useState(false)
  const [showAudioTab, setShowAudioTab] = useState('video') // video | audio

  const selectedShot = shots.find(s => s.id === selected)

  const [expandedAudioIdx, setExpandedAudioIdx] = useState(0)
  // Multi-track audio per shot
  const shotAudio = {
    'S01_01': [
      { type: '旁白', char: '旁白', text: '齐远的嘴角勾起一抹残忍的弧度，看着跪倒在地的林凡', voice: '磁性旁白', emotion: '冷酷叙述', speed: 1.0, status: '✅', start: '0.0s', end: '1.2s' },
      { type: '对白', char: '齐远', text: '「灵根……碎了？哈哈哈——废物就是废物！」', voice: '冷酷嘲讽男声', emotion: '嘲讽得意', speed: 1.0, status: '✅', start: '0.3s', end: '1.5s' },
      { type: '音效', char: '—', text: '灵根碎裂声 + 风声呼啸', voice: '音效合成', emotion: '—', speed: 1.0, status: '✅', start: '0.0s', end: '1.5s' },
    ],
    'S01_02': [
      { type: '旁白', char: '旁白', text: '然而下一秒，一道翠绿色的光芒暴射而出——', voice: '旁白叙述', emotion: '震撼悬疑', speed: 0.9, status: '✅', start: '0.0s', end: '1.0s' },
      { type: '音效', char: '—', text: '光芒爆发 + 能量涌动', voice: '音效合成', emotion: '震撼', speed: 1.0, status: '✅', start: '0.5s', end: '1.0s' },
    ],
    'S02_01': [
      { type: '旁白', char: '旁白', text: '翠绿光柱冲天而起，灵力风暴席卷整个山谷', voice: '磁性旁白', emotion: '震撼史诗', speed: 0.85, status: '⏳', start: '0.0s', end: '1.8s' },
      { type: 'BGM', char: '—', text: '史诗交响 · 渐强', voice: '配乐', emotion: '震撼恢宏', speed: 1.0, status: '✅', start: '0.0s', end: '1.8s' },
      { type: '音效', char: '—', text: '灵力风暴呼啸 + 地面震裂', voice: '音效合成', emotion: '剧烈', speed: 1.0, status: '⏳', start: '0.2s', end: '1.8s' },
    ],
    'S02_02': [
      { type: '音效', char: '—', text: '爆炸冲击波 + 齐远吐血', voice: '音效合成', emotion: '剧烈', speed: 1.0, status: '✅', start: '0.0s', end: '1.8s' },
      { type: '对白', char: '齐远', text: '「啊——！」（痛苦惨叫）', voice: '惊恐男声', emotion: '剧痛', speed: 1.0, status: '✅', start: '0.5s', end: '1.5s' },
    ],
    'S02_03': [
      { type: '对白', char: '齐远', text: '「不……不可能！废物怎么可能——」', voice: '惊恐男声', emotion: '恐惧颤抖', speed: 1.1, status: '📝', start: '0.0s', end: '2.5s' },
      { type: '音效', char: '—', text: '心跳加速 + 颤抖气息', voice: '音效合成', emotion: '紧张', speed: 1.0, status: '📝', start: '0.0s', end: '2.5s' },
    ],
    'S03_01': [
      { type: '对白', char: '林凡', text: '「多谢齐师兄……的逼迫。」', voice: '平静低沉', emotion: '淡然→霸气', speed: 0.8, status: '📝', start: '0.0s', end: '1.5s' },
      { type: '旁白', char: '旁白', text: '林凡缓缓站起，眼中绿芒流转', voice: '沉稳旁白', emotion: '霸气觉醒', speed: 0.9, status: '📝', start: '0.8s', end: '1.5s' },
    ],
    'S04_01': [
      { type: '旁白', char: '旁白', text: '林凡缓缓摊开右手——五条漆黑裂纹如蛛网蔓延', voice: '悬疑旁白', emotion: '不安恐惧', speed: 0.75, status: '📝', start: '0.0s', end: '2.0s' },
      { type: '音效', char: '—', text: '诡异低频嗡鸣 + 裂纹蔓延声', voice: '音效合成', emotion: '恐怖悬疑', speed: 1.0, status: '📝', start: '0.5s', end: '2.0s' },
    ],
    'S04_02': [
      { type: 'BGM', char: '—', text: '悬念钢琴 + 心跳低频', voice: '配乐', emotion: '紧张悬疑', speed: 1.0, status: '✅', start: '0.0s', end: '2.5s' },
      { type: '旁白', char: '旁白', text: '这，究竟意味着什么……', voice: '低语旁白', emotion: '悬疑留白', speed: 0.7, status: '📝', start: '1.0s', end: '2.5s' },
    ],
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>点击选中镜头查看详情，拖拽调整顺序。编辑后提交将进入生成队列。</p>

      {/* Video track */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>🎬 视频轨</div>
        <div style={{ display: 'flex', gap: 3, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', overflowX: 'auto' }}>
          {shots.map((shot) => (
            <motion.div key={shot.id} whileHover={{ scaleY: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelected(shot.id); setShowAudioTab('video') }}
              style={{ minWidth: shot.type === 'body' ? 80 : 100, height: 50, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'white', cursor: 'pointer', background: clipColors[shot.type], flexShrink: 0, flexDirection: 'column', outline: selected === shot.id ? '3px solid var(--text-primary)' : 'none', outlineOffset: 2 }}>
              <span>{shot.id}</span>
              <span style={{ fontSize: 10, opacity: 0.8 }}>{shot.dur}s</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audio track */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>🔊 音频轨（配音 + 音效 + BGM）</div>
        <div style={{ display: 'flex', gap: 3, padding: 12, background: '#F5F0FF', borderRadius: '0 0 var(--radius-md) var(--radius-md)', overflowX: 'auto' }}>
          {shots.map((shot) => {
            const tracks = shotAudio[shot.id] || []
            const types = [...new Set(tracks.map(t => t.type))].join('+')
            const allDone = tracks.every(t => t.status === '✅')
            const anyPending = tracks.some(t => t.status === '📝')
            return (
              <motion.div key={shot.id} whileHover={{ scaleY: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelected(shot.id); setShowAudioTab('audio'); setExpandedAudioIdx(0) }}
                style={{ minWidth: shot.type === 'body' ? 80 : 100, height: 42, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, cursor: 'pointer', flexShrink: 0, flexDirection: 'column', border: selected === shot.id && showAudioTab === 'audio' ? '2px solid #8B5CF6' : '1px solid #E0D4F5', background: allDone ? '#EDE9FE' : anyPending ? '#F8F8FA' : '#FEF3E2' }}>
                <span style={{ color: '#8B5CF6', fontSize: 9 }}>{types || '—'}</span>
                <span style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{tracks.length}轨</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Timeline ruler */}
      <div className="mono" style={{ display: 'flex', padding: '0 12px', marginTop: 2 }}>
        {['0s', '5s', '10s', '15s', '19s'].map(t => (
          <span key={t} style={{ flex: 1, fontSize: 10, color: 'var(--text-tertiary)' }}>{t}</span>
        ))}
      </div>

      {/* Shot detail panel */}
      <AnimatePresence>
        {selectedShot && (
          <motion.div initial={{ opacity: 0, y: 16, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: 16, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ marginTop: 20, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {/* Shot header */}
            <div style={{ padding: '10px 16px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 13 }}>{selectedShot.id}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600, background: roleColors[selectedShot.role]?.bg, color: roleColors[selectedShot.role]?.color }}>{selectedShot.role}</span>
              {/* Tab switch */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                {[{ key: 'video', icon: '🎬', label: '视频' }, { key: 'audio', icon: '🔊', label: '配音' }].map(tab => (
                  <motion.button key={tab.key} whileHover={{ scale: 1.03 }} onClick={() => setShowAudioTab(tab.key)}
                    style={{ padding: '3px 10px', border: showAudioTab === tab.key ? '1px solid var(--accent)' : '1px solid var(--border)', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: showAudioTab === tab.key ? 'var(--accent-light)' : 'white', color: showAudioTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'inherit' }}>
                    {tab.icon} {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Video tab */}
            {showAudioTab === 'video' && (
              <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 0 }}>
                <div style={{ borderRight: '1px solid var(--border-light)', padding: 14 }}>
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${roleColors[selectedShot.role]?.bg || '#F4F5F7'}, #fff)`, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 10 }}>🎬</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11 }}>
                    {[['景别', selectedShot.cam], ['时长', selectedShot.dur + 's'], ['情绪', selectedShot.emotion], ['角色', selectedShot.char]].map(([l, v]) => (
                      <div key={l} style={{ padding: 6, background: 'var(--bg-tertiary)', borderRadius: 4 }}><span style={{ color: 'var(--text-tertiary)', display: 'block', fontSize: 10 }}>{l}</span><strong>{v}</strong></div>
                    ))}
                  </div>
                  {/* Quick audio preview under video - multi track */}
                  {(shotAudio[selectedShot.id] || []).length > 0 && (
                    <div style={{ marginTop: 10, padding: 8, background: '#F5F0FF', borderRadius: 6, fontSize: 11 }}>
                      <div style={{ fontWeight: 600, color: '#8B5CF6', marginBottom: 6 }}>🔊 音轨 ({shotAudio[selectedShot.id].length})</div>
                      {shotAudio[selectedShot.id].map((track, ti) => (
                        <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3, fontSize: 10 }}>
                          <span style={{ padding: '1px 5px', borderRadius: 3, background: track.type === '对白' ? '#FCE4EC' : track.type === 'BGM' ? '#E8F5EE' : track.type === '音效' ? '#FFF3E0' : '#EDE9FE', fontSize: 9, fontWeight: 600 }}>{track.type}</span>
                          {track.char !== '—' && <span style={{ fontWeight: 600 }}>{track.char}</span>}
                          <span style={{ color: 'var(--text-tertiary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.text}</span>
                          <span style={{ fontSize: 9, color: track.status === '✅' ? 'var(--success)' : 'var(--text-tertiary)' }}>{track.status}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '2px 8px', border: '1px solid #D4C4F5', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶ 混合试听</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowAudioTab('audio')} style={{ padding: '2px 8px', border: '1px solid #D4C4F5', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>✏️ 编辑音轨</motion.button>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>镜头描述</label>
                    <textarea defaultValue={selectedShot.desc} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit', resize: 'vertical', minHeight: 50 }} /></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>景别</label>
                      <select defaultValue={selectedShot.cam} style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit' }}>
                        {['特写', '近景', '中景', '全景', '远景', '仰角', '俯角', '空镜'].map(c => <option key={c}>{c}</option>)}
                      </select></div>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>时长 (秒)</label>
                      <input type="number" defaultValue={selectedShot.dur} step="0.1" min="0.5" max="10" style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit' }} /></div>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>情绪</label>
                      <input defaultValue={selectedShot.emotion} style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, fontFamily: 'inherit' }} /></div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <CardBtn primary onClick={handleSave}>💾 保存修改</CardBtn>
                    <CardBtn>🔄 重新生成视频</CardBtn>
                    <CardBtn>🗑️ 删除镜头</CardBtn>
                  </div>
                </div>
              </div>
            )}

            {/* Audio tab - multi track */}
            {showAudioTab === 'audio' && (shotAudio[selectedShot.id] || []).length > 0 && (() => {
              const tracks = shotAudio[selectedShot.id]
              const typeColors = { '对白': { bg: '#FCE4EC', color: '#D81B60' }, '旁白': { bg: '#EDE9FE', color: '#8B5CF6' }, 'BGM': { bg: '#E8F5EE', color: '#0FAA6C' }, '音效': { bg: '#FFF3E0', color: '#E8973A' } }
              return (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Track header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>🔊 音轨列表</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>共 {tracks.length} 条音轨</span>
                    <motion.button whileHover={{ scale: 1.05 }} style={{ marginLeft: 'auto', padding: '4px 14px', border: '1px solid #8B5CF6', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: '#EDE9FE', color: '#8B5CF6', fontWeight: 600, fontFamily: 'inherit' }}>▶ 混合试听</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 14px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', fontWeight: 600, fontFamily: 'inherit' }}>＋ 添加音轨</motion.button>
                  </div>

                  {/* Track list */}
                  {tracks.map((track, ti) => {
                    const tc = typeColors[track.type] || typeColors['旁白']
                    const isExpanded = expandedAudioIdx === ti
                    return (
                      <motion.div key={ti} initial={false} style={{ border: isExpanded ? '2px solid #8B5CF6' : '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {/* Track row header */}
                        <div onClick={() => setExpandedAudioIdx(isExpanded ? -1 : ti)}
                          style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: isExpanded ? '#FDFBFF' : 'white' }}>
                          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: tc.bg, color: tc.color }}>{track.type}</span>
                          {track.char !== '—' && <span style={{ fontSize: 12, fontWeight: 600 }}>🎭 {track.char}</span>}
                          <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>「{track.text}」</span>
                          <span className="mono" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{track.start}-{track.end}</span>
                          <span style={{ fontSize: 10, fontWeight: 600, color: track.status === '✅' ? 'var(--success)' : track.status === '⏳' ? 'var(--warning)' : 'var(--text-tertiary)' }}>{track.status}</span>
                          <motion.button whileHover={{ scale: 1.1 }} onClick={e => { e.stopPropagation() }} style={{ padding: '2px 8px', border: '1px solid #D4C4F5', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶</motion.button>
                          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                        </div>
                        {/* Expanded edit */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              style={{ borderTop: '1px solid var(--border-light)', overflow: 'hidden' }}>
                              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div><label style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, display: 'block' }}>{track.type === '对白' || track.type === '旁白' ? '台词/旁白文本' : track.type === 'BGM' ? '配乐描述' : '音效描述'}</label>
                                  <textarea defaultValue={track.text} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, fontFamily: 'inherit', resize: 'vertical', minHeight: 45, lineHeight: 1.5 }} /></div>
                                {(track.type === '对白' || track.type === '旁白') && (
                                  <>
                                    <div><label style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, display: 'block' }}>配音提示词</label>
                                      <textarea defaultValue={`角色: ${track.char}\n情绪: ${track.emotion}\n语气: ${track.voice}\n场景: ${selectedShot.desc}`}
                                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #D4C4F5', borderRadius: 4, fontSize: 11, fontFamily: 'inherit', resize: 'vertical', minHeight: 45, lineHeight: 1.4, background: '#FDFBFF' }} /></div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
                                      <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>音色</label>
                                        <select defaultValue={track.voice} style={{ width: '100%', padding: '5px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, fontFamily: 'inherit' }}>
                                          {['低沉磁性男声', '温柔女声', '冷酷嘲讽男声', '平静低沉', '惊恐男声', '悬疑旁白', '磁性旁白', '沉稳旁白', '低语旁白'].map(v => <option key={v}>{v}</option>)}
                                        </select></div>
                                      <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>情绪语气</label>
                                        <select defaultValue={track.emotion} style={{ width: '100%', padding: '5px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, fontFamily: 'inherit' }}>
                                          {['冷酷嘲讽', '冷酷叙述', '嘲讽得意', '震撼悬疑', '震撼史诗', '恐惧颤抖', '淡然→霸气', '不安恐惧', '紧张悬疑', '剧痛', '霸气觉醒', '悬疑留白'].map(e => <option key={e}>{e}</option>)}
                                        </select></div>
                                      <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>语速</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                          <input type="range" min="0.5" max="2.0" step="0.05" defaultValue={track.speed} style={{ flex: 1 }} />
                                          <span className="mono" style={{ fontSize: 10, minWidth: 26 }}>{track.speed}x</span>
                                        </div></div>
                                      <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>音量</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                          <input type="range" min="0" max="1" step="0.05" defaultValue="0.85" style={{ flex: 1 }} />
                                          <span className="mono" style={{ fontSize: 10, minWidth: 26 }}>85%</span>
                                        </div></div>
                                    </div>
                                  </>
                                )}
                                {track.type === 'BGM' && (
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                    <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>风格</label>
                                      <select defaultValue={track.emotion} style={{ width: '100%', padding: '5px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, fontFamily: 'inherit' }}>
                                        {['震撼恢宏', '紧张悬疑', '温柔抒情', '史诗交响', '电子氛围', '古风笛箫'].map(e => <option key={e}>{e}</option>)}
                                      </select></div>
                                    <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>音量</label>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <input type="range" min="0" max="1" step="0.05" defaultValue="0.5" style={{ flex: 1 }} />
                                        <span className="mono" style={{ fontSize: 10, minWidth: 26 }}>50%</span>
                                      </div></div>
                                  </div>
                                )}
                                {track.type === '音效' && (
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                    <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>音效类型</label>
                                      <select style={{ width: '100%', padding: '5px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, fontFamily: 'inherit' }}>
                                        {['爆炸冲击', '风声呼啸', '能量涌动', '心跳加速', '裂纹蔓延', '剑鸣', '脚步声', '自定义'].map(e => <option key={e}>{e}</option>)}
                                      </select></div>
                                    <div><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>音量</label>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <input type="range" min="0" max="1" step="0.05" defaultValue="0.7" style={{ flex: 1 }} />
                                        <span className="mono" style={{ fontSize: 10, minWidth: 26 }}>70%</span>
                                      </div></div>
                                  </div>
                                )}
                                {/* Time range */}
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                  <div style={{ flex: 1 }}><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>起始时间</label>
                                    <input defaultValue={track.start} style={{ width: '100%', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }} /></div>
                                  <div style={{ flex: 1 }}><label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 3, display: 'block' }}>结束时间</label>
                                    <input defaultValue={track.end} style={{ width: '100%', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }} /></div>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <CardBtn primary onClick={handleSave}>💾 保存</CardBtn>
                                  <CardBtn>🔄 重新生成</CardBtn>
                                  <CardBtn>▶ 试听</CardBtn>
                                  <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '4px 10px', border: '1px solid var(--error)', borderRadius: 6, fontSize: 11, cursor: 'pointer', background: 'white', color: 'var(--error)', fontWeight: 600, fontFamily: 'inherit', marginLeft: 'auto' }}>🗑️ 删除此轨</motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              )
            })()}

            <AnimatePresence>
              {saved && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ padding: '8px 12px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 0, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
                  ✅ 已保存！修改提交后将进入生成队列。
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ===== CREATE CHAT VIEW =====
function CreateChatView({ onSwitch, onSend }) {
  const createMessages = [
    { id: 1, role: 'agent', text: '嗨！欢迎来到 STORYA 🎬\n\n我来帮你创建一个新的短剧项目。只需要跟我聊聊你的想法就行，不用填表格！\n\n先告诉我：你想做什么类型的短剧？', time: '现在' },
    { id: 2, role: 'user', text: '我想做一个修仙题材的短剧，主角是废柴灵根被所有人嘲笑，但是体内藏着上古魔神的传承，走逆袭路线', time: '现在' },
    { id: 3, role: 'agent', text: '很棒的设定！废柴逆袭 + 隐藏传承是短视频连载最吸金的公式之一 🔥', time: '现在',
      card: { type: 'outline', title: '项目配置', arc: '修仙逆袭', episode: '12', hook: '灵根碎裂 + 隐藏传承觉醒', mainline: '废柴灵根被嘲笑 → 上古魔神传承', character: '废柴→天才的逆袭弧', thrill: '打脸、逆袭、反转', cliff: '更大的危机与诱惑' },
      suggestions: ['✅ 确认创建', '📋 我想手动调参数', '换个名字：逆天修仙路'],
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        height: 'var(--header-height)', display: 'flex', alignItems: 'center',
        padding: '0 24px', borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-secondary)', gap: 12,
      }}>
        <span style={{ fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} style={{ color: 'var(--accent)' }} /> 创建新项目
        </span>
        <motion.button
          whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          onClick={onSwitch}
          style={{
            marginLeft: 12, padding: '6px 14px', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--text-secondary)', transition: 'all 0.15s',
          }}
        >
          <Layers size={14} /> 切换到表单模式
        </motion.button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
        {createMessages.map(msg => (
          <Message key={msg.id} msg={msg} onSuggestion={(s) => { if (s.includes('确认')) onSend?.() }} />
        ))}
      </div>
      <ChatInput placeholder="描述你的想法，或直接说「确认创建」..." />
    </div>
  )
}

// ===== WELCOME VIEW =====
function WelcomeView({ onCreate, onChat }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{
          width: 72, height: 72, borderRadius: 20,
          background: 'linear-gradient(135deg, var(--accent), #06D6A0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, color: 'white', fontWeight: 800, marginBottom: 20,
          boxShadow: '0 8px 24px rgba(15,170,108,0.2)',
        }}
      >S</motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>欢迎来到 STORYA</div>
        <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 480, lineHeight: 1.6 }}>
          AI 驱动的短剧创作工厂。从灵感到成片，通过对话完成全流程。
        </div>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        <motion.button whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-md)' }} whileTap={{ scale: 0.97 }}
          onClick={onCreate}
          style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'var(--accent)', color: 'white' }}
        >✨ 创建新项目</motion.button>
        <motion.button whileHover={{ scale: 1.03, borderColor: 'var(--accent)', color: 'var(--accent)' }} whileTap={{ scale: 0.97 }}
          onClick={onChat}
          style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
        >💬 自由对话</motion.button>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16 }}>— 或从模板快速开始 —</motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 640, width: '100%' }}>
        {TEMPLATES.map((t, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03, borderColor: 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}
            onClick={onCreate}
            style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', background: 'var(--bg-secondary)', transition: 'all 0.2s' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{t.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ===== CHAT INPUT =====
function ChatInput({ onSend, placeholder = '描述你想做的事情...' }) {
  const [text, setText] = useState('')
  const ref = useRef(null)

  const handleSend = () => {
    if (!text.trim()) return
    onSend?.(text.trim())
    setText('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  return (
    <div style={{ padding: '12px 24px 20px' }}>
      <motion.div
        style={{
          display: 'flex', alignItems: 'flex-end',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 6, boxShadow: 'var(--shadow-sm)',
        }}
      >
        <textarea
          ref={ref}
          value={text}
          onChange={e => { setText(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder={placeholder}
          rows={1}
          style={{
            flex: 1, border: 'none', outline: 'none', padding: '8px 12px',
            fontSize: 14, lineHeight: 1.5, resize: 'none', minHeight: 20, maxHeight: 120,
            fontFamily: 'inherit', background: 'transparent',
          }}
        />
        <div style={{ display: 'flex', gap: 4, padding: 2 }}>
          <IconBtn><Paperclip size={16} /></IconBtn>
          <IconBtn><Mic size={16} /></IconBtn>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            style={{
              width: 34, height: 34, border: 'none', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'white',
            }}
          ><Send size={16} /></motion.button>
        </div>
      </motion.div>
    </div>
  )
}

function IconBtn({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: 'var(--bg-hover)' }}
      onClick={onClick}
      style={{
        width: 34, height: 34, border: 'none', borderRadius: 'var(--radius-sm)',
        background: 'transparent', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)',
      }}
    >{children}</motion.button>
  )
}

function HeaderBtn({ children, title, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, backgroundColor: 'var(--bg-hover)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={title}
      style={{
        width: 34, height: 34, border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-secondary)', fontSize: 16,
      }}
    >{children}</motion.button>
  )
}

// ===== ANIMATED COUNTER =====
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let current = 0
    const step = Math.ceil(value / 25)
    const timer = setInterval(() => {
      current = Math.min(current + step, value)
      setDisplay(current)
      if (current >= value) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [value])
  return <>{display.toLocaleString()}</>
}

// ===== LANDING PAGE =====
function LandingPage({ onEnter }) {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  
  const features = [
    { icon: '💬', title: '对话式创作', desc: '用自然语言描述你的想法，AI 自动生成完整剧本、角色、分镜', color: '#0FAA6C' },
    { icon: '🎬', title: '全流程覆盖', desc: '从世界观→大纲→逐集生成→分镜→配音→视频，一站式交付', color: '#4A90D9' },
    { icon: '🎯', title: '质量闸门', desc: '6维评分体系（开篇钩子/结尾悬念/节奏/一致性/角色/情绪），低于阈值自动重写', color: '#E8973A' },
    { icon: '🎭', title: 'LoRA 角色一致性', desc: 'Midjourney 式 2×2 候选选择，角色跨集一致，支持版本分支', color: '#E5534B' },
    { icon: '⚡', title: '多 Agent 协作', desc: '规划器→钩子专家→写手→编辑→风格师→一致性检查→裁判，自动串行', color: '#8B5CF6' },
    { icon: '📊', title: '数据驱动', desc: '完播率预测、追更率优化、爽点密度分析，让每一集都是爆款', color: '#06B6D4' },
  ]

  const stats = [
    { value: '10x', label: '创作效率提升' },
    { value: '85%', label: '平均完播率' },
    { value: '6维', label: '质量评分体系' },
    { value: '<3min', label: '单集生成时间' },
  ]

  const workflows = [
    { step: 1, title: '描述灵感', desc: '告诉 AI 你的故事创意', icon: '💡' },
    { step: 2, title: '自动生成', desc: '世界观 + 角色 + 大纲一键生成', icon: '⚙️' },
    { step: 3, title: '逐集创作', desc: '对话式调整每集内容', icon: '📝' },
    { step: 4, title: '分镜视频', desc: '文字分镜→图像→视频→配音', icon: '🎬' },
  ]

  return (
    <div style={{ height: '100vh', overflow: 'auto', background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', padding: '0 48px',
          height: 64, background: 'rgba(250,251,252,0.85)',
          backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: 'linear-gradient(135deg, var(--accent), #06D6A0)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 16,
          }}>S</div>
          <span className="dm" style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>STORYA</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['产品', '定价', '案例', '文档'].map(item => (
            <motion.a key={item} whileHover={{ color: 'var(--accent)' }}
              style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'none', fontWeight: 500 }}>
              {item}
            </motion.a>
          ))}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ padding: '6px 16px', border: '1px solid var(--border)', borderRadius: 8, background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-primary)' }}>
            登录
          </motion.button>
          <motion.button whileHover={{ scale: 1.03, boxShadow: '0 4px 16px rgba(15,170,108,0.3)' }} whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            style={{ padding: '6px 20px', border: 'none', borderRadius: 8, background: 'var(--accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: 'white' }}>
            免费试用
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section style={{ padding: '80px 48px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #F0FBF6 0%, var(--bg-primary) 50%)' }}>
        {/* Background decoration */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: -200, right: -200, width: 500, height: 500,
            borderRadius: '50%', border: '1px solid var(--border-light)', opacity: 0.3,
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: -100, left: -150, width: 400, height: 400,
            borderRadius: '50%', border: '1px solid var(--accent-light)', opacity: 0.2,
          }}
        />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', background: 'var(--accent-light)', borderRadius: 20,
              fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 24,
            }}
          >
            <Sparkles size={14} /> 全球首个 AI 短剧全流程生产平台
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.3, marginBottom: 20, letterSpacing: -1 }}
        >
          从一句话灵感
          <br />
          <span style={{ background: 'linear-gradient(135deg, var(--accent), #06D6A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            到完整短剧成片
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}
        >
          STORYA 用多 Agent 协作架构，将你的故事创意自动转化为高质量短剧脚本、
          AI 分镜和视频内容。对话即创作，质量闸门把关每一集。
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 60 }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(15,170,108,0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            style={{
              padding: '14px 32px', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', color: 'white',
              background: 'linear-gradient(135deg, var(--accent), #06D6A0)',
              boxShadow: '0 4px 16px rgba(15,170,108,0.2)',
            }}
          >
            ✨ 开始创作
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, borderColor: 'var(--accent)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 32px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 16, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-primary)', background: 'white',
            }}
          >
            <Play size={16} style={{ display: 'inline', verticalAlign: -3, marginRight: 8 }} />
            观看演示
          </motion.button>
        </motion.div>

        {/* App preview */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            maxWidth: 780, margin: '0 auto', borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            background: 'var(--bg-secondary)',
          }}
        >
          {/* Mock window bar */}
          <div style={{ height: 36, background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)' }}>STORYA — AI 短剧工厂</div>
          </div>
          {/* Mock 3-column layout */}
          <div style={{ display: 'flex', height: 340 }}>
            <div style={{ width: 180, borderRight: '1px solid var(--border-light)', padding: 10 }}>
              <div style={{ padding: '8px 10px', background: 'var(--accent)', color: 'white', borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>+ 新建会话</div>
              {['逆天修仙路', '末世求生记', '都市逆袭王'].map((p, i) => (
                <div key={i} style={{ padding: '7px 10px', fontSize: 12, borderRadius: 6, background: i === 0 ? 'var(--bg-active)' : '', color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)', marginBottom: 2, borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent' }}>{p}</div>
              ))}
            </div>
            <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <div style={{ padding: '7px 12px', background: 'var(--accent)', color: 'white', borderRadius: '10px 10px 4px 10px', fontSize: 11.5, maxWidth: 240 }}>帮我生成第9集，突出主角逆袭</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),#06D6A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>S</div>
                <div style={{ padding: '8px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '10px 10px 10px 4px', fontSize: 11.5, flex: 1 }}>
                  第9集「破境逆袭」已生成 ✅
                  <div style={{ display: 'flex', gap: 3, marginTop: 5, flexWrap: 'wrap' }}>
                    {['🎣 开篇 8.5', '🪝 悬念 9.0', '📐 一致性 8.2', '✅ A'].map(s => (
                      <span key={s} style={{ fontSize: 9, padding: '1px 5px', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 8, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 6, padding: '6px 8px', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: 10.5, background: 'var(--bg-tertiary)' }}>
                    <div style={{ fontWeight: 600, fontSize: 10, color: 'var(--text-secondary)', marginBottom: 3 }}>📝 第9集 · 破境逆袭 · v1</div>
                    <div style={{ color: 'var(--accent)', fontWeight: 600 }}>【开篇钩子】</div>
                    <span style={{ color: 'var(--text-secondary)' }}>「灵根……碎了？」齐远嘴角残忍弧度…</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),#06D6A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>S</div>
                <div style={{ padding: '8px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '10px 10px 10px 4px', fontSize: 11.5, flex: 1 }}>
                  分镜已生成，共 12 个镜头：
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginTop: 5 }}>
                    {[['#E8F5EE','✅'],['#FFF3E0','✅'],['#E3F2FD','⏳']].map(([bg,st],i) => (
                      <div key={i} style={{ height: 32, background: bg, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>{st}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                {['生成第10集', '导出分镜', '优化钩子'].map(s => (
                  <span key={s} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 9.5, color: 'var(--text-tertiary)' }}>{s}</span>
                ))}
              </div>
              <div style={{ marginTop: 'auto', padding: '5px 8px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, color: 'var(--text-tertiary)' }}>描述你想做的事情...</div>
            </div>
            <div style={{ width: 170, borderLeft: '1px solid var(--border-light)', padding: 10, fontSize: 11 }}>
              {[
                { t: '🌍 世界观', sub: null, badge: 'v2' },
                { t: '📋 大纲', sub: null, badge: 'main' },
                { t: '👥 角色·LoRA', sub: ['🧑 林凡 v3 ✅', '👩 苏婉儿 v2', '😈 齐远 训练中'] },
                { t: '📺 剧集', sub: ['📄 1-8集 全A', '📄 第9集·破境逆袭'] },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ padding: '5px 8px', marginBottom: 1, display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
                    <ChevronDown size={9} style={{ color: 'var(--text-tertiary)' }} /> {item.t}
                    {item.badge && <span style={{ fontSize: 8, padding: '1px 4px', background: 'var(--bg-tertiary)', borderRadius: 3, color: 'var(--text-tertiary)', fontWeight: 500 }}>{item.badge}</span>}
                  </div>
                  {item.sub && item.sub.map((s, j) => (
                    <div key={j} style={{ padding: '3px 8px 3px 22px', fontSize: 10, color: 'var(--text-secondary)' }}>{s}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px 48px 32px', display: 'flex', justifyContent: 'center', gap: 56 }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="dm" style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '60px 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>为短剧创作者打造的 AI 工厂</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
            不是简单的 AI 写作工具，而是覆盖从创意到成片的完整生产线
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-md)', borderColor: f.color + '60' }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                padding: 24, border: '1px solid var(--border)', borderRadius: 16,
                background: 'var(--bg-secondary)', cursor: 'default', transition: 'border-color 0.3s',
              }}
            >
              <motion.div
                animate={hoveredFeature === i ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 32, marginBottom: 12 }}
              >{f.icon}</motion.div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section style={{ padding: '60px 48px 80px', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>4 步完成短剧创作</h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>从灵感到成片，全程 AI 辅助</p>
          </motion.div>

          <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 40, left: '12.5%', right: '12.5%', height: 2, background: 'var(--border)', zIndex: 0 }}>
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--accent)' }}
              />
            </div>
            {workflows.map((w, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: '0 6px 20px rgba(15,170,108,0.2)' }}
                  style={{
                    width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
                    background: 'white', border: '3px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, boxShadow: 'var(--shadow-sm)',
                  }}
                >{w.icon}</motion.div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>STEP {w.step}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{w.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{w.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '60px 48px 80px', maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>选择你的创作方案</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>按需付费，Credits 永不过期</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { name: '标准版', price: '¥99', unit: '/月', credits: '2,000', limit: '3,000字/集', features: ['基础质量闸门', '3个项目', '标准生成队列'] },
            { name: '专业版', price: '¥299', unit: '/月', credits: '5,000', limit: '5,000字/集', features: ['完整6维闸门', '无限项目', '优先生成队列', 'LoRA 角色训练'], popular: true },
            { name: '旗舰版', price: '¥699', unit: '/月', credits: '12,000', limit: '10,000字/集', features: ['完整6维闸门', '无限项目', '最高优先级', 'LoRA 训练 + 视频生成', '专属技术支持'] },
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
              style={{
                padding: 28, borderRadius: 16, background: 'var(--bg-secondary)',
                border: plan.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
                position: 'relative',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  padding: '4px 16px', background: 'var(--accent)', color: 'white', borderRadius: 20,
                  fontSize: 11, fontWeight: 700,
                }}>最受欢迎</div>
              )}
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ marginBottom: 16 }}>
                <span className="dm" style={{ fontSize: 36, fontWeight: 800 }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>{plan.unit}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>{plan.credits} Credits ⚡</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>每集上限 {plan.limit}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <Check size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnter}
                style={{
                  width: '100%', padding: '10px 0', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', border: 'none',
                  background: plan.popular ? 'var(--accent)' : 'var(--bg-tertiary)',
                  color: plan.popular ? 'white' : 'var(--text-primary)',
                }}
              >开始使用</motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 48px 80px', textAlign: 'center' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: 700, margin: '0 auto', padding: '48px 40px', borderRadius: 24,
            background: 'linear-gradient(135deg, var(--accent), #06D6A0)',
            boxShadow: '0 16px 48px rgba(15,170,108,0.2)',
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 12 }}>准备好开始你的短剧创作了吗？</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            免费注册即送 500 Credits，足够创作一部 5 集短剧
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            style={{
              padding: '14px 40px', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', color: 'var(--accent)', background: 'white',
            }}
          >免费开始创作 →</motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 48px', borderTop: '1px solid var(--border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 13, color: 'var(--text-tertiary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: 'linear-gradient(135deg,var(--accent),#06D6A0)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 800 }}>S</div>
          <span>© 2026 STORYA. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['隐私政策', '服务条款', '联系我们'].map(t => (
            <motion.a key={t} whileHover={{ color: 'var(--accent)' }} style={{ color: 'var(--text-tertiary)', cursor: 'pointer', textDecoration: 'none' }}>{t}</motion.a>
          ))}
        </div>
      </footer>
    </div>
  )
}

// ===== LIBRARY VIEW (center panel) =====
function LibraryView({ type, onOverlay }) {
  if (type === 'lib-lora') return <LoRALibraryPanel />

  if (type === 'lib-queue') return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        {[{ label: '进行中', value: 2, color: 'var(--accent)' }, { label: '排队中', value: 1, color: 'var(--warning)' }, { label: '今日完成', value: 5, color: 'var(--success)' }].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: 16, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div className="dm" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.label}</div>
          </div>
        ))}
      </div>
      {[
        { name: '第9集文本生成', status: 'running', progress: 78, elapsed: '4m32s', eta: '1m15s', type: '多Agent串行', credits: 85 },
        { name: '齐远 LoRA v1 训练', status: 'running', progress: 65, elapsed: '2m15s', eta: '3m00s', type: 'LoRA训练', credits: 120 },
        { name: '苏婉儿 LoRA v3', status: 'queued', position: 1, elapsed: '0m00s', eta: '~6m', type: 'LoRA训练', credits: 120 },
        { name: '第9集分镜视频 S01_01', status: 'done', elapsed: '3m22s', finishedAgo: '5分钟前', type: '视频生成', credits: 30 },
        { name: '第9集分镜视频 S01_02', status: 'done', elapsed: '2m48s', finishedAgo: '8分钟前', type: '视频生成', credits: 30 },
        { name: '林凡 LoRA v3 训练', status: 'done', elapsed: '1m55s', finishedAgo: '15分钟前', type: 'LoRA训练', credits: 120 },
      ].map((task, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 4, fontWeight: 600,
              background: task.status === 'running' ? 'var(--accent-light)' : task.status === 'queued' ? 'var(--warning-bg)' : 'var(--success-bg)',
              color: task.status === 'running' ? 'var(--accent)' : task.status === 'queued' ? 'var(--warning)' : 'var(--success)',
            }}>{task.status === 'running' ? '⚙️ 进行中' : task.status === 'queued' ? '🕐 排队中' : '✅ 完成'}</span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{task.name}</span>
            <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--bg-tertiary)', borderRadius: 4, color: 'var(--text-tertiary)' }}>{task.type}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>{task.credits} ⚡</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span>⏱️ 已进行: <strong>{task.elapsed}</strong></span>
            {task.status === 'running' && <span>预计剩余: <strong>{task.eta}</strong></span>}
            {task.status === 'queued' && <span>队列位置: 第{task.position}位 · 预计: {task.eta}</span>}
            {task.status === 'done' && <span>✅ 完成于 {task.finishedAgo}</span>}
          </div>
          {task.status === 'running' && (
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ duration: 1 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), #06D6A0)', borderRadius: 3 }} />
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2, textAlign: 'right' }}>{task.progress}%</div>
            </div>
          )}
          {task.status === 'done' && (
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <motion.button whileHover={{ scale: 1.03 }} style={{ padding: '4px 12px', border: 'none', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>查看结果</motion.button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )

  // Images / Videos / Audio library
  const isImages = type === 'lib-images'
  const isVideos = type === 'lib-videos'
  const isAudio = type === 'lib-audio'
  const items = isImages ? [
    { name: 'S01_01 灵根碎裂', ep: '第9集', shot: 'S01_01', status: '✅', color: '#E8F5EE', lora: '林凡 v3', size: '1024×1024' },
    { name: 'S01_02 齐远冷笑', ep: '第9集', shot: 'S01_02', status: '✅', color: '#FFF3E0', lora: '齐远 v1', size: '1024×1024' },
    { name: 'S02_01 翠绿光柱', ep: '第9集', shot: 'S02_01', status: '⏳', color: '#E3F2FD', lora: '林凡 v3', size: '1024×1024' },
    { name: 'S03_01 林凡微笑', ep: '第9集', shot: 'S03_01', status: '📝', color: '#FCE4EC', lora: '林凡 v3', size: '—' },
    { name: '林凡形象照 A', ep: 'LoRA', shot: '—', status: '✅', color: '#E8F5EE', lora: '林凡 v3', size: '512×768' },
    { name: '苏婉儿形象照', ep: 'LoRA', shot: '—', status: '✅', color: '#F3E5F5', lora: '苏婉儿 v2', size: '512×768' },
  ] : isVideos ? [
    { name: 'S01_01 灵根碎裂', ep: '第9集', duration: '1.5s', status: '✅', color: '#E8F5EE', resolution: '1080p' },
    { name: 'S01_02 齐远冷笑', ep: '第9集', duration: '1.0s', status: '✅', color: '#FFF3E0', resolution: '1080p' },
    { name: 'S02_01 翠绿光柱', ep: '第9集', duration: '2.0s', status: '⏳ 生成中', color: '#E3F2FD', resolution: '1080p' },
  ] : [
    { name: '林凡 · 旁白', voice: '低沉磁性男声', duration: '45s', status: '✅', ep: '第9集' },
    { name: '齐远 · 对白', voice: '冷酷嘲讽', duration: '12s', status: '✅', ep: '第9集' },
    { name: '苏婉儿 · 对白', voice: '温柔坚定', duration: '8s', status: '📝 待生成', ep: '第9集' },
    { name: '背景音乐 · 战斗', voice: '激昂交响', duration: '60s', status: '✅', ep: '通用' },
  ]

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: isAudio ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ boxShadow: 'var(--shadow-sm)', borderColor: 'var(--accent)' }}
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}>
            {!isAudio && (
              <div style={{ height: isImages ? 140 : 100, background: `linear-gradient(135deg, ${item.color || '#F4F5F7'}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isImages ? 36 : 28 }}>
                {isImages ? '🖼️' : '🎬'}
              </div>
            )}
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span>{item.ep}</span>
                <span>{item.status}</span>
                {item.lora && <span style={{ color: 'var(--accent)' }}>🎭 {item.lora}</span>}
                {item.size && <span>{item.size}</span>}
                {item.duration && <span>⏱️ {item.duration}</span>}
                {item.resolution && <span>📐 {item.resolution}</span>}
                {item.voice && <span>🎙️ {item.voice}</span>}
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>👁️ 预览</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>📥 下载</motion.button>
                {isAudio && <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>▶ 播放</motion.button>}
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: 'white', fontFamily: 'inherit', color: 'var(--error)' }}>🗑️</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ===== MAIN APP =====
export default function App() {
  // 响应式检测 - 移动端适配
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (isMobile) return <MobileApp />

  const [view, setView] = useState('landing') // landing | welcome | create-chat | chat | library-*
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [overlay, setOverlay] = useState(null)
  const [rightTab, setRightTab] = useState('content')
  const [profileOpen, setProfileOpen] = useState(false)
  const [replyIdx, setReplyIdx] = useState(0)
  const messagesRef = useRef(null)
  const showRight = !['welcome', 'create-chat', 'landing'].includes(view) && !view.startsWith('lib-')
  const showLeft = view !== 'landing'

  const scrollToBottom = useCallback(() => {
    setTimeout(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' }) }, 100)
  }, [])

  const sendMessage = useCallback((text) => {
    const userMsg = { id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }
    const typingMsg = { id: Date.now() + 1, role: 'agent', typing: true, time: '' }
    setMessages(prev => [...prev, userMsg, typingMsg])
    scrollToBottom()

    const reply = AGENT_REPLIES[replyIdx % AGENT_REPLIES.length]
    setReplyIdx(prev => prev + 1)

    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.typing).concat({
        id: Date.now() + 2,
        role: 'agent',
        text: reply.text,
        typewriter: true,
        card: reply.card,
        scores: reply.scores,
        grade: reply.grade,
        suggestions: reply.suggestions,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }))
      scrollToBottom()
    }, 1500 + Math.random() * 1000)
  }, [replyIdx, scrollToBottom])

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('chat')} />
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* LEFT SIDEBAR */}
      <aside style={{
        width: 'var(--left-width)', minWidth: 'var(--left-width)',
        background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', zIndex: 10,
      }}>
        <div style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid var(--border-light)', gap: 10 }}>
          <motion.div whileHover={{ rotate: 10 }} style={{
            width: 28, height: 28, background: 'linear-gradient(135deg, var(--accent), #06D6A0)',
            borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 14,
          }}>S</motion.div>
          <span className="dm" style={{ fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>STORYA</span>
        </div>

        <div style={{ padding: '12px 12px 8px' }}>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-hover)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setView('create-chat')}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--accent)', color: 'white',
              border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13.5, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit',
            }}
          ><Plus size={16} /> 新建会话</motion.button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <LayoutGroup>
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '8px 20px 6px', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.6 }}>我的项目</div>
              {PROJECTS.map(p => (
                <SidebarItem key={p.id} icon={p.icon} text={p.name} badge={`${p.episodes}集`}
                  badgeActive={p.active} active={p.active && view === 'chat'}
                  onClick={() => setView('chat')} />
              ))}
            </div>
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '8px 20px 6px', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.6 }}>最近会话</div>
              {CONVERSATIONS.map(c => (
                <SidebarItem key={c.id} icon="💬" text={c.name} onClick={() => setView('chat')} />
              ))}
            </div>
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '8px 20px 6px', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.6 }}>资源库</div>
              <SidebarItem icon="🖼️" text="图片资源" badge="247" active={view === 'lib-images'} onClick={() => setView('lib-images')} />
              <SidebarItem icon="🎬" text="视频资源" badge="58" active={view === 'lib-videos'} onClick={() => setView('lib-videos')} />
              <SidebarItem icon="🎭" text="角色 LoRA" badge="6" active={view === 'lib-lora'} onClick={() => setView('lib-lora')} />
              <SidebarItem icon="🔊" text="配音资源" badge="32" active={view === 'lib-audio'} onClick={() => setView('lib-audio')} />
            </div>
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '8px 20px 6px', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.6 }}>生成队列</div>
              <SidebarItem icon="⏳" text="第9集 · 已进行 4分钟" generating onClick={() => setView('lib-queue')} />
              <SidebarItem icon="⏳" text="齐远 LoRA · 已进行 2分钟" generating onClick={() => setView('lib-queue')} />
              <SidebarItem icon="⏳" text="分镜S02_01 · 已进行 38秒" generating onClick={() => setView('lib-queue')} />
            </div>
          </LayoutGroup>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', padding: '12px 16px', position: 'relative' }}>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                style={{
                  position: 'absolute', bottom: '100%', left: 12, right: 12,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
                  padding: 8, marginBottom: 8, zIndex: 20,
                }}
              >
                {[
                  { icon: <User size={16} />, text: '个人信息', overlay: 'profile' },
                  { icon: <Star size={16} />, text: '会员 & Credits', overlay: 'subscription' },
                  { icon: <CreditCard size={16} />, text: '账单明细', overlay: 'billing' },
                  null,
                  { icon: <Settings size={16} />, text: '偏好设置', overlay: 'preferences' },
                  { icon: <LogOut size={16} />, text: '退出登录', overlay: null },
                ].map((item, i) => item === null ? (
                  <div key={i} style={{ height: 1, background: 'var(--border-light)', margin: '4px 0' }} />
                ) : (
                  <motion.div key={i} whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                    onClick={() => { if (item.overlay) { setOverlay(item.overlay); setProfileOpen(false) } }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13 }}>
                    {item.icon} {item.text}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{ backgroundColor: 'var(--bg-hover)' }}
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #E8F5EE, #C4E8D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>创作者</div>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>专业版</div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, background: 'var(--bg-tertiary)', padding: '3px 8px', borderRadius: 8 }}>
              <AnimatedNumber value={1280} /> ⚡
            </span>
          </motion.div>
        </div>
      </aside>

      {/* CENTER */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--bg-primary)', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex' }}>
              <WelcomeView onCreate={() => setView('create-chat')} onChat={() => setView('chat')} />
            </motion.div>
          )}
          {view === 'create-chat' && (
            <motion.div key="create" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <CreateChatView onSwitch={() => setView('welcome')} onSend={() => setView('chat')} />
            </motion.div>
          )}
          {view === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{
                height: 'var(--header-height)', display: 'flex', alignItems: 'center',
                padding: '0 24px', borderBottom: '1px solid var(--border-light)',
                background: 'var(--bg-secondary)', gap: 12,
              }}>
                <div style={{ fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                  逆天修仙路 — 第9集生成
                  <span style={{ fontSize: 11, padding: '2px 8px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 6, fontWeight: 500 }}>修仙 · 短视频</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <HeaderBtn title="项目设置" onClick={() => setOverlay('settings')}><Settings size={16} /></HeaderBtn>
                  <HeaderBtn title="导出" onClick={() => setOverlay('export')}><Download size={16} /></HeaderBtn>
                  <HeaderBtn title="生成控制" onClick={() => setOverlay('control')}><SlidersHorizontal size={16} /></HeaderBtn>
                </div>
              </div>

              <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
                {messages.map(msg => (
                  <Message key={msg.id} msg={msg} onOverlay={setOverlay} onSuggestion={sendMessage} />
                ))}
              </div>

              <ChatInput onSend={sendMessage} />
              <div style={{ padding: '0 24px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['生成第10集', '导出第9集分镜', '查看一致性报告', '优化开篇钩子'].map(s => (
                  <SuggestionChip key={s} text={s} onClick={() => sendMessage(s)} />
                ))}
              </div>
            </motion.div>
          )}
          {view.startsWith('lib-') && (
            <motion.div key="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-secondary)', gap: 12 }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setView('chat')}
                  style={{ padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, cursor: 'pointer', background: 'white', fontFamily: 'inherit' }}>← 返回会话</motion.button>
                <div style={{ fontWeight: 600, fontSize: 15 }}>
                  {view === 'lib-images' && '🖼️ 图片资源库'}
                  {view === 'lib-videos' && '🎬 视频资源库'}
                  {view === 'lib-lora' && '🎭 角色 LoRA 资源库'}
                  {view === 'lib-audio' && '🔊 配音资源库'}
                  {view === 'lib-queue' && '⏳ 生成队列'}
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                <LibraryView type={view} onOverlay={setOverlay} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RIGHT SIDEBAR */}
      <AnimatePresence>
        {showRight && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'var(--right-width)', minWidth: 'var(--right-width)', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            <div style={{
              height: 'var(--header-height)', display: 'flex', alignItems: 'center',
              padding: '0 16px', borderBottom: '1px solid var(--border-light)', gap: 4,
            }}>
              {['content', 'settings', 'queue'].map(tab => (
                <motion.div
                  key={tab}
                  whileHover={{ backgroundColor: tab === rightTab ? 'var(--accent-light)' : 'var(--bg-hover)' }}
                  onClick={() => setRightTab(tab)}
                  style={{
                    padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13,
                    cursor: 'pointer', fontWeight: tab === rightTab ? 600 : 500,
                    color: tab === rightTab ? 'var(--accent)' : 'var(--text-secondary)',
                    background: tab === rightTab ? 'var(--accent-light)' : 'transparent',
                  }}
                >{{ content: '内容', settings: '设置', queue: '队列' }[tab]}</motion.div>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              {rightTab === 'content' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 4px', marginBottom: 8 }}>
                    <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>已生成</div>
                      <div className="dm" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)', marginTop: 2 }}>
                        <AnimatedNumber value={9} /> / 12 集
                      </div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>消耗</div>
                      <div className="dm" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
                        <AnimatedNumber value={2840} /> ⚡
                      </div>
                    </div>
                  </div>
                  {TREE_DATA.map(node => <TreeNode key={node.id} node={node} onOverlay={setOverlay} />)}
                </>
              )}
              {rightTab === 'settings' && (
                <div style={{ fontSize: 13 }}>
                  {[
                    { title: '项目设定', items: [['题材', '修仙'], ['平台', '短视频连载'], ['套餐', '专业版'], ['每集上限', '5,000 字']] },
                    { title: '风格控制', items: [['文风', '爽文直给'], ['视角', '第三人称'], ['节奏', '快'], ['分级', 'PG']] },
                    { title: '质量闸门', items: [['开篇钩子阈值', '7.0'], ['结尾悬念阈值', '7.0']] },
                  ].map(group => (
                    <div key={group.title} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, padding: '0 4px' }}>{group.title}</div>
                      {group.items.map(([label, value]) => (
                        <motion.div key={label} whileHover={{ backgroundColor: 'var(--bg-hover)' }}
                          style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                          <span style={{ fontWeight: 600, fontSize: 12 }}>{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {rightTab === 'queue' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { name: '分镜 S02_01', progress: 45, status: 'running' },
                    { name: '齐远 LoRA', progress: 65, status: 'running' },
                    { name: 'TTS 配音', progress: 0, status: 'queued' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <motion.div animate={item.status === 'running' ? { opacity: [0.3, 1, 0.3] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ width: 8, height: 8, borderRadius: '50%', background: item.status === 'running' ? 'var(--accent)' : 'var(--warning)' }} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>{item.progress}%</span>
                      </div>
                      <div style={{ height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                          style={{ height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* OVERLAY */}
      <AnimatePresence>
        {overlay && <Overlay type={overlay} onClose={() => setOverlay(null)} />}
      </AnimatePresence>
    </div>
  )
}
