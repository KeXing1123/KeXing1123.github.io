// ====== 全局变量 ======
let isCopyCooling = false;
let copyCoolingTimer = null;
let lastRefreshTime = 0;
const refreshCooldown = 5000;
const activeNotifications = [];
const MAX_NOTIFICATIONS = 4;
let isSideNavOpen = false;

// ====== 音效相关全局变量 ======
let meowSounds = [];
let isSoundEnabled = true;
let lastSoundPlayTime = 0;
const SOUND_COOLDOWN = 300; // 防止过于频繁播放的冷却时间（毫秒）

// ====== 语言翻译数据 ======
const translations = {
    'zh-CN': {
        // 导航
        'nav.home': '首页',
        'nav.features': '服务器特色',
        'nav.voice': '语音频道',
        'nav.rules': '服务器规则',
        'nav.connect': '连接指南',
        'theme.toggle': '切换主题',
        'lang.toggle': '切换语言',
        
        // 英雄区域
        'hero.title': '欢迎来到<span class="highlight"> KeX1ng Server</span>',
        'hero.subtitle': '一个 Minecraft 1.21.10 的生存服务器 致力于自由 友好的游戏环境 加入我们 与服主进行深入的探讨',
        
        // 服务器状态
        'status.title': '服务器状态',
        'status.loading': '正在查询',
        'status.refresh': '刷新',
        'status.players': '在线玩家',
        'status.version': '服务器版本',
        'status.onlinePlayers': '在线玩家',
        'status.online': '在线',
        'status.offline': '离线',
        'status.failed': '查询失败',
        'status.refreshMessage': '服务器状态已更新',
        
        // 错误信息
        'error.title': 'API错误',
        'error.message': '无法获取服务器状态信息 请稍后再试',
        
        // 服务器地址
        'server.address': '服务器地址',
        'server.copyHint': '点击复制地址',
        'server.copyButton': '复制服务器地址',
        'copySuccess': '服务器地址已复制',
        
        // 功能特色
        'features.title': '服务器特色',
        'features.card1.title': 'Paper核心',
        'features.card1.desc': '采用高性能 Paper 核心 优化服务器性能 提供流畅的游戏体验 支持常用插件 同时保持原版生存的乐趣',
        'features.card2.title': '自由与规则',
        'features.card2.desc': '在管理不发现的情况下你开的开心 发现后一律ban 最后 服主可月不可空降',
        
        // 语音频道
        'voice.title': '加入语音频道',
        'voice.discord.title': 'Discord频道',
        'voice.discord.desc': '我猜这个b玩意应该是没人用的 我加上他单纯是因为格式好看点了 而且我也有个菲律宾的朋友QWQ',
        'voice.joinDiscord': '加入Discord',
        'voice.kook.title': 'KOOK频道',
        'voice.kook.desc': '这玩意我没用过几次 听说是高仿discord 我用的时候音质好差 我不知道为什么 :C',
        'voice.joinKook': '加入KOOK',
        'voice.oopz.title': 'OOPZ频道',
        'voice.oopz.desc': '我经常用的 简单方便 虽然不知道为什么方便 嗯对...',
        'voice.joinOopz': '加入OOPZ',
        
        // 规则
        'rules.title': '服务器规则',
        'rules.rule1': '尊重其他玩家 禁止任何形式的侮辱 歧视或骚扰行为',
        'rules.rule2': '禁止使用任何作弊客户端 外挂或利用游戏漏洞获取不公平优势',
        'rules.rule3': '不得破坏其他玩家的建筑或物品 除非获得对方明确许可',
        'rules.rule4': '禁止在聊天频道中发送垃圾信息 广告或无关内容',
        'rules.rule5': '保持游戏环境友好 积极帮助新玩家 共同建设和谐社区',
        
        // 连接指南
        'connect.title': '如何连接服务器',
        'connect.step1.title': '启动游戏',
        'connect.step1.desc': '确保您的 Minecraft 客户端是 <strong>1.21.10</strong> 版本',
        'connect.step2.title': '添加服务器',
        'connect.step2.desc': '在多人游戏界面点击 添加服务器 输入IP <strong>mc.kex1ng.cn</strong>',
        'connect.step3.title': '加白绑定',
        'connect.step3.desc': '前往Q群添加<strong>白名单</strong>并且进入服务器根据提示<strong>绑定</strong>账号',
        'connect.step4.title': '开始游戏',
        'connect.step4.desc': '进入服务器后 然后你就想干啥就干啥了',
        
        // QQ群帮助
        'qq.title': '遇到问题 点击加入QQ群',
        'qq.desc': '如果您在连接服务器或游戏中遇到任何问题 欢迎加入我们的QQ群寻求帮助<br>服主只要在的情况下会为您提供及时的帮助和支持',
        'qq.hint': '点击将跳转到QQ群邀请链接',
        'qq.join': '点击加群',
        
        // 页脚
        'footer.copyright': '服主非常听劝 你能看到这条消息那么恭喜你 你会发现新的大陆<br>服务器地址 <strong>mc.kex1ng.cn</strong><br>服务器版本 Minecraft 1.21.10<br>有问题 加入QQ群 <a href="https://qm.qq.com/q/8cUO5nRjeU" target="_blank" style="color: var(--primary-color); text-decoration: none;">点击加群</a>',
        
        // 页面标题
        'pageTitle.online': 'KeX1ng Minecraft Server ({{online}}/{{max}}) Minecraft 1.21.10 服务器',
        'pageTitle.offline': 'KeX1ng Minecraft Server (离线) Minecraft 1.21.10 服务器',
        'pageTitle.error': 'KeX1ng Minecraft Server (查询失败) Minecraft 1.21.10 服务器'
    },
    'en': {
        // 导航
        'nav.home': 'Home',
        'nav.features': 'Server Features',
        'nav.voice': 'Voice Channels',
        'nav.rules': 'Server Rules',
        'nav.connect': 'Connect Guide',
        'theme.toggle': 'Toggle Theme',
        'lang.toggle': 'Toggle Language',
        
        // 英雄区域
        'hero.title': 'Welcome to<span class="highlight"> KeX1ng Server</span>',
        'hero.subtitle': 'A Minecraft 1.21.10 survival server dedicated to freedom and a friendly gaming environment. Join us and have in-depth discussions with the server owner.',
        
        // 服务器状态
        'status.title': 'Server Status',
        'status.loading': 'Querying',
        'status.refresh': 'Refresh',
        'status.players': 'Online Players',
        'status.version': 'Server Version',
        'status.onlinePlayers': 'Online Players',
        'status.online': 'Online',
        'status.offline': 'Offline',
        'status.failed': 'Query Failed',
        'status.refreshMessage': 'Server status updated',
        
        // 错误信息
        'error.title': 'API Error',
        'error.message': 'Unable to retrieve server status information. Please try again later.',
        
        // 服务器地址
        'server.address': 'Server Address',
        'server.copyHint': 'Click to copy address',
        'server.copyButton': 'Copy Server Address',
        'copySuccess': 'Server address copied',
        
        // 功能特色
        'features.title': 'Server Features',
        'features.card1.title': 'Paper Core',
        'features.card1.desc': 'Using high-performance Paper core to optimize server performance and provide smooth gameplay. Supports common plugins while maintaining vanilla survival fun.',
        'features.card2.title': 'Freedom & Rules',
        'features.card2.desc': 'Have fun as long as admins don\'t notice. If caught, instant ban. Finally, server owner can be away but not disappear.',
        
        // 语音频道
        'voice.title': 'Join Voice Channels',
        'voice.discord.title': 'Discord Channel',
        'voice.discord.desc': 'I guess nobody uses this thing. I added it just to make the format look better, and I have a Filipino friend QWQ',
        'voice.joinDiscord': 'Join Discord',
        'voice.kook.title': 'KOOK Channel',
        'voice.kook.desc': 'I haven\'t used this much. It\'s said to be a high imitation of Discord. The sound quality was poor when I used it, I don\'t know why :C',
        'voice.joinKook': 'Join KOOK',
        'voice.oopz.title': 'OOPZ Channel',
        'voice.oopz.desc': 'I use this frequently. Simple and convenient, though I don\'t know why it\'s convenient... yeah...',
        'voice.joinOopz': 'Join OOPZ',
        
        // 规则
        'rules.title': 'Server Rules',
        'rules.rule1': 'Respect other players. No insults, discrimination, or harassment of any kind.',
        'rules.rule2': 'No cheating clients, hacks, or exploiting game bugs for unfair advantages.',
        'rules.rule3': 'Do not destroy other players\' builds or items without explicit permission.',
        'rules.rule4': 'No spam, advertisements, or irrelevant content in chat channels.',
        'rules.rule5': 'Maintain a friendly game environment. Help new players and build a harmonious community together.',
        
        // 连接指南
        'connect.title': 'How to Connect to the Server',
        'connect.step1.title': 'Launch Game',
        'connect.step1.desc': 'Ensure your Minecraft client is version <strong>1.21.10</strong>',
        'connect.step2.title': 'Add Server',
        'connect.step2.desc': 'In the multiplayer menu click "Add Server" and enter IP <strong>mc.kex1ng.cn</strong>',
        'connect.step3.title': 'Whitelist & Bind',
        'connect.step3.desc': 'Go to QQ group to add <strong>whitelist</strong> and enter the server to <strong>bind</strong> your account according to the instructions',
        'connect.step4.title': 'Start Playing',
        'connect.step4.desc': 'After entering the server, then you can do whatever you want',
        
        // QQ群帮助
        'qq.title': 'Having Problems? Click to Join QQ Group',
        'qq.desc': 'If you encounter any issues connecting to the server or during gameplay, welcome to join our QQ group for help.<br>The server owner will provide timely assistance when available.',
        'qq.hint': 'Click will redirect to QQ group invitation link',
        'qq.join': 'Click to Join',
        
        // 页脚
        'footer.copyright': 'The server owner is very open to suggestions. If you can see this message, congratulations! You will discover a new world.<br>Server Address: <strong>mc.kex1ng.cn</strong><br>Server Version: Minecraft 1.21.10<br>Have questions? Join QQ Group: <a href="https://qm.qq.com/q/8cUO5nRjeU" target="_blank" style="color: var(--primary-color); text-decoration: none;">Click to Join</a>',
        
        // 页面标题
        'pageTitle.online': 'KeX1ng Minecraft Server ({{online}}/{{max}}) Minecraft 1.21.10 Server',
        'pageTitle.offline': 'KeX1ng Minecraft Server (Offline) Minecraft 1.21.10 Server',
        'pageTitle.error': 'KeX1ng Minecraft Server (Query Failed) Minecraft 1.21.10 Server'
    }
};

// ====== DOM 元素缓存 ======
const elements = {
    sideNav: document.getElementById('sideNav'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    sideNavClose: document.getElementById('sideNavClose'),
    logoLink: document.getElementById('logoLink'),
    langToggle: document.getElementById('langToggle'),
    langText: document.querySelector('.lang-text'),
    themeToggle: document.getElementById('themeToggle'),
    copyBtn: document.getElementById('copyBtn'),
    serverAddress: document.getElementById('serverAddress'),
    serverStatus: {
        statusText: document.getElementById('statusText'),
        statusDot: document.getElementById('statusDot'),
        onlinePlayers: document.getElementById('onlinePlayers'),
        playersContainer: document.getElementById('playersContainer'),
        playersList: document.getElementById('playersList'),
        playersCount: document.getElementById('playersCount'),
        errorMessage: document.getElementById('errorMessage'),
        errorDetail: document.getElementById('errorDetail')
    },
    meowSound: document.getElementById('meowSound')
};

// ====== 初始化函数 ======
function init() {
    // 检测设备类型
    detectDeviceType();
    
    // 加载保存的设置
    const savedLang = localStorage.getItem('lang') || 'zh-CN';
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // 加载音效设置
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        isSoundEnabled = savedSound === 'true';
    }
    
    // 应用设置
    document.documentElement.setAttribute('data-lang', savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // 初始化语言显示
    elements.langText.textContent = savedLang === 'zh-CN' ? 'CN' : 'EN';
    updateTranslations(savedLang);
    
    // 绑定事件监听器
    bindEvents();
    
    // 页面加载动画
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // 获取初始服务器状态
        fetchServerStatus(false);
        
        // 每60秒自动更新状态
        setInterval(() => fetchServerStatus(false), 60000);
        
        // 添加卡片动画
        initCardAnimations();
        
        // 预加载音效
        preloadMeowSounds();
    });
}

// ====== 设备检测 ======
function detectDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-touch', isTouch);
    
    // 为触摸设备添加特殊类
    if (isTouch) {
        document.body.classList.add('touch-device');
    }
}

// ====== 音效功能 ======
function preloadMeowSounds() {
    // 预加载4个猫叫声音
    for (let i = 1; i <= 4; i++) {
        const audio = new Audio();
        audio.src = `sounds/meow${i}.ogg`;
        audio.preload = 'auto';
        audio.load();
        meowSounds.push(audio);
        
        // 添加错误处理
        audio.addEventListener('error', (e) => {
            console.warn(`无法加载声音文件 meow${i}.ogg:`, e);
        });
    }
    console.log(`预加载了 ${meowSounds.length} 个猫叫音效`);
}

function playRandomMeow(event) {
    // 检查是否启用音效
    if (!isSoundEnabled) return;
    
    // 防止过于频繁播放
    const now = Date.now();
    if (now - lastSoundPlayTime < SOUND_COOLDOWN) return;
    
    // 检查是否是有效的鼠标点击（排除键盘导航等）
    if (event && event.type === 'click' && event.detail === 0) return;
    
    // 随机选择一个声音
    if (meowSounds.length > 0) {
        const randomIndex = Math.floor(Math.random() * meowSounds.length);
        const meowSound = meowSounds[randomIndex];
        
        try {
            // 克隆音频对象以便同时播放多次
            const playSound = meowSound.cloneNode();
            playSound.volume = 0.3; // 设置适中的音量
            playSound.play().catch(e => {
                // 静默处理播放错误，不显示在控制台
            });
            
            lastSoundPlayTime = now;
            
            // 播放完成后移除事件监听器
            playSound.onended = () => {
                playSound.remove();
            };
        } catch (e) {
            // 静默处理错误
        }
    }
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('soundEnabled', isSoundEnabled);
    
    // 不显示任何提示，完全静默
}

// ====== 事件绑定 ======
function bindEvents() {
    // 汉堡菜单
    elements.hamburgerBtn.addEventListener('click', toggleSideNav);
    elements.sideNavClose.addEventListener('click', toggleSideNav);
    
    // 语言切换
    elements.langToggle.addEventListener('click', handleLanguageToggle);
    
    // 主题切换
    elements.themeToggle.addEventListener('click', handleThemeToggle);
    
    // 复制功能
    elements.copyBtn.addEventListener('click', handleCopy);
    elements.serverAddress.addEventListener('click', handleCopy);
    elements.serverAddress.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopy(e);
        }
    });
    
    // Logo链接
    elements.logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSideNav();
        smoothScroll('#home');
    });
    
    // 侧边导航链接
    document.querySelectorAll('.side-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            toggleSideNav();
            smoothScroll(target);
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            smoothScroll(targetId);
        });
    });
    
    // 3D倾斜效果 - 为桌面设备保留
    if (!('ontouchstart' in window)) {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', handleTiltMove);
            card.addEventListener('mouseleave', handleTiltLeave);
        });
    }
    
    // QQ帮助区域点击效果
    document.getElementById('qqHelpSection').addEventListener('click', (e) => {
        createParticles(e, 15, 5);
    });
    
    // 语音频道按钮点击效果
    document.querySelectorAll('.join-channel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            createParticles(e, 12, 4);
        });
    });
    
    // 点击侧边导航外部关闭菜单
    document.addEventListener('click', (e) => {
        if (isSideNavOpen && !e.target.closest('.side-nav') && !e.target.closest('.hamburger-btn')) {
            toggleSideNav();
        }
    });
    
    // 触摸滑动关闭菜单
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        
        // 如果从右向左滑动超过100px且菜单是打开的，则关闭菜单
        if (isSideNavOpen && diffX > 100) {
            toggleSideNav();
        }
    });
    
    // ====== 全局点击事件 - 播放猫叫声 ======
    document.addEventListener('click', (e) => {
        // 排除已经有粒子效果的元素（避免重复播放）
        if (e.target.closest('.lang-toggle') || 
            e.target.closest('.theme-toggle') || 
            e.target.closest('.hamburger-btn') ||
            e.target.closest('.copy-btn') ||
            e.target.closest('#serverAddress') ||
            e.target.closest('.join-channel-btn') ||
            e.target.closest('#qqHelpSection') ||
            e.target.closest('.notification-close') ||
            e.target.closest('a[href^="#"]') ||
            e.target.closest('.side-nav')) {
            // 这些元素已经有其他效果，我们依然播放声音
            playRandomMeow(e);
            return;
        }
        
        // 在移动端减少粒子数量以提升性能
        if ('ontouchstart' in window) {
            playRandomMeow(e);
            return;
        }
        
        // 播放猫叫声
        playRandomMeow(e);
        
        // 创建简单的粒子效果
        createParticles(e, 8, 3);
    });
}

// ====== 侧边导航菜单 ======
function toggleSideNav() {
    elements.sideNav.classList.toggle('active');
    isSideNavOpen = elements.sideNav.classList.contains('active');
    
    if (isSideNavOpen) {
        elements.hamburgerBtn.style.display = 'none';
        // 防止背景滚动
        document.body.style.overflow = 'hidden';
    } else {
        elements.hamburgerBtn.style.display = 'flex';
        // 恢复滚动
        document.body.style.overflow = '';
    }
    
    // 为汉堡按钮添加动画
    if (isSideNavOpen) {
        elements.hamburgerBtn.style.transform = 'scale(0.8) rotate(90deg)';
        setTimeout(() => {
            elements.hamburgerBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }
}

// ====== 语言功能 ======
function handleLanguageToggle(e) {
    const currentLang = document.documentElement.getAttribute('data-lang');
    const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    
    createParticles(e, 15, 5);
    elements.langToggle.style.transform = 'scale(0.85)';
    
    setTimeout(() => {
        document.documentElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        elements.langText.textContent = newLang === 'zh-CN' ? 'CN' : 'EN';
        updateTranslations(newLang);
        elements.langToggle.style.transform = 'scale(1)';
    }, 150);
}

function updateTranslations(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
}

// ====== 主题切换功能 ======
function handleThemeToggle(e) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    createParticles(e, 15, 5);
    elements.themeToggle.style.transform = 'scale(0.85)';
    
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        elements.themeToggle.style.transform = 'scale(1)';
        
        // 更新meta theme-color
        const themeColor = newTheme === 'dark' ? '#0F172A' : '#5D9C59';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
    }, 150);
}

// ====== 通用粒子效果函数 ======
function createParticles(e, count = 12, size = 4) {
    // 如果是触摸设备，减少粒子数量以提升性能
    if ('ontouchstart' in window) {
        count = Math.floor(count / 2);
        size = Math.floor(size / 1.5);
    }
    
    const color = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'rgba(255, 179, 71, 0.7)' 
        : 'rgba(93, 156, 89, 0.7)';
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        const particleSize = size + Math.random() * size;
        particle.style.width = particle.style.height = particleSize + 'px';
        
        // 获取点击位置
        let x, y;
        if (e.touches && e.touches[0]) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        
        const offset = 15 + Math.random() * 25;
        const angle = Math.random() * Math.PI * 2;
        const finalX = x + Math.cos(angle) * offset;
        const finalY = y + Math.sin(angle) * offset;
        
        particle.style.left = (finalX - particleSize / 2) + 'px';
        particle.style.top = (finalY - particleSize / 2) + 'px';
        
        const colorVariant = color.replace('0.7', (0.5 + Math.random() * 0.3).toFixed(2));
        particle.style.backgroundColor = colorVariant;
        particle.style.boxShadow = `0 0 8px ${colorVariant}`;
        particle.style.borderRadius = '50%';
        
        document.body.appendChild(particle);
        
        const distance = 20 + Math.random() * 40;
        const endX = finalX + Math.cos(angle) * distance;
        const endY = finalY + Math.sin(angle) * distance;
        
        const animationDuration = 600 + Math.random() * 400;
        
        const animation = particle.animate([
            { 
                transform: 'scale(0.8) translate(0, 0)', 
                opacity: 0.9
            },
            { 
                transform: `scale(0.1) translate(${endX - finalX}px, ${endY - finalY}px)`, 
                opacity: 0
            }
        ], {
            duration: animationDuration,
            easing: 'cubic-bezier(0.34, 0.1, 0.64, 1)'
        });
        
        animation.onfinish = () => {
            if (particle.parentNode) {
                particle.remove();
            }
        };
    }
}

// ====== 复制功能 ======
function handleCopy(e) {
    if (isCopyCooling) {
        showNotification({
            type: 'copy',
            message: document.documentElement.getAttribute('data-lang') === 'zh-CN' ? 
                '请稍后再试' : 'Please try again later',
            duration: 1500
        });
        return;
    }
    
    copyToClipboard('mc.kex1ng.cn');
    createParticles(e, 12, 4);
    setCopyCooling();
}

function copyToClipboard(text) {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopySuccess();
            })
            .catch(err => {
                console.error('复制失败:', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('回退复制失败:', err);
        showNotification({
            type: 'copy',
            message: document.documentElement.getAttribute('data-lang') === 'zh-CN' ? 
                '复制失败，请手动复制' : 'Copy failed, please copy manually',
            duration: 2000
        });
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const currentLang = document.documentElement.getAttribute('data-lang');
    showNotification({
        type: 'copy',
        message: translations[currentLang]['copySuccess'],
        duration: 2000
    });
}

function setCopyCooling() {
    if (isCopyCooling) return;
    
    isCopyCooling = true;
    const currentLang = document.documentElement.getAttribute('data-lang');
    const originalText = elements.copyBtn.innerHTML;
    
    elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> ' + 
        (currentLang === 'zh-CN' ? '已复制' : 'Copied');
    elements.copyBtn.disabled = true;
    elements.copyBtn.classList.add('cooling');
    
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'cooling-progress';
    progressBar.style.transform = 'scaleX(1)';
    elements.copyBtn.appendChild(progressBar);
    
    requestAnimationFrame(() => {
        progressBar.style.transform = 'scaleX(0)';
        progressBar.style.transition = 'transform 2s linear';
    });
    
    // 清除之前的计时器
    if (copyCoolingTimer) clearTimeout(copyCoolingTimer);
    
    copyCoolingTimer = setTimeout(() => {
        elements.copyBtn.innerHTML = originalText;
        elements.copyBtn.disabled = false;
        elements.copyBtn.classList.remove('cooling');
        if (progressBar.parentNode) progressBar.remove();
        isCopyCooling = false;
        copyCoolingTimer = null;
    }, 2000);
}

// ====== 服务器状态查询 ======
async function fetchServerStatus(manual = false) {
    if (manual) {
        const now = Date.now();
        if (now - lastRefreshTime < refreshCooldown) {
            showRefreshCoolingFeedback();
            return;
        }
        lastRefreshTime = now;
    }
    
    const currentLang = document.documentElement.getAttribute('data-lang');
    const s = elements.serverStatus;
    
    // 隐藏错误信息
    s.errorMessage.classList.remove('show');
    
    // 显示加载状态
    s.statusText.innerHTML = '<span class="loader"></span> ' + translations[currentLang]['status.loading'];
    s.statusDot.classList.remove('online');
    s.onlinePlayers.textContent = '--';
    
    try {
        // 使用代理API以避免CORS问题
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/kex1ng.cn:25565`);
        
        if (!response.ok) throw new Error(`API请求失败: ${response.status}`);
        
        const data = await response.json();
        
        if (data.online) {
            // 服务器在线
            s.statusText.textContent = translations[currentLang]['status.online'];
            s.statusDot.classList.add('online');
            s.onlinePlayers.textContent = `${data.players.online}/${data.players.max}`;
            
            // 显示玩家列表
            if (data.players?.list?.length > 0) {
                s.playersContainer.style.display = 'block';
                s.playersCount.textContent = data.players.list.length;
                s.playersList.innerHTML = '';
                
                // 限制显示玩家数量
                const maxPlayersToShow = window.innerWidth < 480 ? 8 : 12;
                const playersToShow = data.players.list.slice(0, maxPlayersToShow);
                
                playersToShow.forEach(player => {
                    const playerItem = document.createElement('div');
                    playerItem.className = 'player-item';
                    playerItem.textContent = player;
                    s.playersList.appendChild(playerItem);
                });
                
                // 如果还有更多玩家，显示提示
                if (data.players.list.length > maxPlayersToShow) {
                    const morePlayers = document.createElement('div');
                    morePlayers.className = 'player-item more-players';
                    morePlayers.textContent = `+${data.players.list.length - maxPlayersToShow} more`;
                    morePlayers.style.opacity = '0.8';
                    morePlayers.style.fontStyle = 'italic';
                    s.playersList.appendChild(morePlayers);
                }
            } else {
                s.playersContainer.style.display = 'none';
            }
            
            // 更新页面标题
            document.title = translations[currentLang]['pageTitle.online']
                .replace('{{online}}', data.players.online)
                .replace('{{max}}', data.players.max);
                
            // 显示成功通知
            if (manual) showNotification({
                type: 'refresh',
                message: translations[currentLang]['status.refreshMessage'],
                duration: 2000
            });
        } else {
            // 服务器离线
            s.statusText.textContent = translations[currentLang]['status.offline'];
            s.statusDot.classList.remove('online');
            s.onlinePlayers.textContent = '0/--';
            s.playersContainer.style.display = 'none';
            document.title = translations[currentLang]['pageTitle.offline'];
        }
    } catch (error) {
        console.error('获取服务器状态时出错:', error);
        s.errorDetail.textContent = translations[currentLang]['error.message'];
        s.errorMessage.classList.add('show');
        s.statusText.textContent = translations[currentLang]['status.failed'];
        s.statusDot.classList.remove('online');
        s.onlinePlayers.textContent = '--';
        s.playersContainer.style.display = 'none';
        document.title = translations[currentLang]['pageTitle.error'];
    }
}

function showRefreshCoolingFeedback() {
    const currentLang = document.documentElement.getAttribute('data-lang');
    showNotification({
        type: 'refresh',
        message: currentLang === 'zh-CN' ? 
            '刷新过于频繁，请稍后再试' : 'Refresh too frequent, please try again later',
        duration: 1500
    });
}

// ====== 通知系统 ======
function showNotification(options) {
    const { type = 'info', message, duration = 2000, showCloseButton = true } = options;
    
    // 检查是否超过最大数量
    if (activeNotifications.length >= MAX_NOTIFICATIONS) {
        removeOldestNotification();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    const id = 'notification-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    notification.id = id;
    
    // 确定图标
    let icon = '<i class="fas fa-check-circle"></i>';
    let iconClass = 'copy-icon';
    if (type === 'refresh') {
        icon = '<i class="fas fa-sync-alt"></i>';
        iconClass = 'refresh-icon';
    }
    
    // 构建内容
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon ${iconClass}">${icon}</div>
            <div class="notification-text"><p>${message}</p></div>
            ${showCloseButton ? '<button class="notification-close" aria-label="关闭"><i class="fas fa-times"></i></button>' : ''}
        </div>
    `;
    
    // 添加到容器
    document.getElementById('notificationContainer').appendChild(notification);
    
    // 添加到活动列表
    activeNotifications.unshift({
        id,
        element: notification,
        createdAt: Date.now()
    });
    
    // 初始状态
    notification.style.transform = 'translateX(120%)';
    notification.style.opacity = '0';
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // 更新位置
    updateNotificationPositions();
    
    // 自动关闭
    if (duration > 0) {
        const timer = setTimeout(() => removeNotification(id), duration);
        notification.dataset.timer = timer;
    }
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeNotification(id);
        });
    }
    
    // 点击关闭
    notification.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-close')) {
            removeNotification(id);
        }
    });
    
    return id;
}

function removeNotification(id) {
    const index = activeNotifications.findIndex(n => n.id === id);
    if (index === -1) return;
    
    const notification = activeNotifications[index].element;
    
    // 清除定时器
    if (notification.dataset.timer) {
        clearTimeout(parseInt(notification.dataset.timer));
    }
    
    // 隐藏动画
    notification.style.transform = 'translateX(120%)';
    notification.style.opacity = '0';
    
    // 从列表移除
    activeNotifications.splice(index, 1);
    
    // 移除元素
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
        updateNotificationPositions();
    }, 300);
}

function removeOldestNotification() {
    if (activeNotifications.length === 0) return;
    let oldestIndex = 0;
    let oldestTime = activeNotifications[0].createdAt;
    
    for (let i = 1; i < activeNotifications.length; i++) {
        if (activeNotifications[i].createdAt < oldestTime) {
            oldestTime = activeNotifications[i].createdAt;
            oldestIndex = i;
        }
    }
    
    removeNotification(activeNotifications[oldestIndex].id);
}

function updateNotificationPositions() {
    const scaleStep = 0.05;
    const offsetStep = 10;
    const maxScale = 1.0;
    const minScale = 0.85;
    
    activeNotifications.sort((a, b) => b.createdAt - a.createdAt);
    
    activeNotifications.forEach((notification, index) => {
        const element = notification.element;
        const scale = Math.max(minScale, maxScale - (index * scaleStep));
        const offset = index * offsetStep;
        
        requestAnimationFrame(() => {
            element.style.top = `${20 + offset}px`;
            element.style.transform = `translateX(0) scale(${scale})`;
            element.style.zIndex = 10000 + (activeNotifications.length - index);
        });
    });
}

// ====== 工具函数 ======
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        // 计算偏移量，考虑固定导航栏
        const offset = 80;
        const targetPosition = targetElement.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function handleTiltMove(e) {
    const cardRect = this.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    this.style.transition = 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.05)`;
}

function handleTiltLeave() {
    this.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
}

// ====== 卡片动画初始化 ======
function initCardAnimations() {
    // 添加卡片逐个出现动画
    const cards = document.querySelectorAll('.feature-card, .rule-item, .guide-step, .server-status-card, .qq-help-section, .voice-channel-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

// ====== 滚动时头部效果 ======
window.addEventListener('scroll', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (window.scrollY > 50) {
        hamburgerBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        hamburgerBtn.style.backdropFilter = 'blur(10px)';
        hamburgerBtn.style.background = 'rgba(93, 156, 89, 0.9)';
    } else {
        hamburgerBtn.style.boxShadow = '0 5px 15px rgba(93, 156, 89, 0.3)';
        hamburgerBtn.style.backdropFilter = 'none';
        hamburgerBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
});

// ====== 窗口大小变化时重置导航 ======
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // 在桌面端确保导航菜单关闭
        if (isSideNavOpen) {
            toggleSideNav();
        }
    }
    
    // 更新玩家列表显示数量
    const playersList = document.getElementById('playersList');
    if (playersList) {
        const playerItems = playersList.querySelectorAll('.player-item');
        const maxPlayersToShow = window.innerWidth < 480 ? 8 : 12;
        
        playerItems.forEach((item, index) => {
            if (index >= maxPlayersToShow) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    }
});

// ====== 移动端触摸事件优化 ======
document.addEventListener('touchstart', function() {}, {passive: true});

// 防止双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ====== 页面可见性API - 当页面重新可见时刷新服务器状态 ======
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面从隐藏变为可见，刷新服务器状态
        fetchServerStatus(false);
    }
});

// ====== 初始化应用 ======
init();