// ============================================
// ICON MAPPER
// Maps friendly icon names to Lucide icon names
// Like CSS classes but for icons!
// ============================================

const ICON_MAP = {
    // Social Media
    'LikeFacebook': 'ThumbsUp',
    'SubscribeYoutube': 'Youtube',
    'FollowTwitter': 'Twitter',
    'FollowInstagram': 'Instagram',
    'ConnectLinkedin': 'Linkedin',
    'StarGithub': 'Github',
    'ShareSocial': 'Share2',
    
    // Actions
    'DownloadFile': 'Download',
    'UploadFile': 'Upload',
    'SendMessage': 'Send',
    'ReplyMessage': 'Reply',
    'LikePost': 'Heart',
    'BookmarkPost': 'Bookmark',
    'SharePost': 'Share2',
    'CommentPost': 'MessageCircle',
    'EditPost': 'Edit2',
    'DeletePost': 'Trash2',
    'SavePost': 'Save',
    'CopyLink': 'Copy',
    'PasteLink': 'Clipboard',
    
    // Navigation
    'GoHome': 'Home',
    'GoBack': 'ArrowLeft',
    'GoForward': 'ArrowRight',
    'GoUp': 'ChevronUp',
    'GoDown': 'ChevronDown',
    'OpenMenu': 'Menu',
    'CloseMenu': 'X',
    'SearchContent': 'Search',
    'FilterContent': 'Filter',
    
    // Media
    'PlayVideo': 'Play',
    'PauseVideo': 'Pause',
    'StopVideo': 'Square',
    'NextVideo': 'SkipForward',
    'PrevVideo': 'SkipBack',
    'VolumeUp': 'Volume2',
    'VolumeDown': 'Volume1',
    'VolumeMute': 'VolumeX',
    'Fullscreen': 'Maximize',
    'ExitFullscreen': 'Minimize',
    'CameraPhoto': 'Camera',
    'VideoRecord': 'Video',
    'ImageGallery': 'Image',
    'MusicPlay': 'Music',
    
    // Communication
    'EmailContact': 'Mail',
    'PhoneCall': 'Phone',
    'ChatMessage': 'MessageSquare',
    'VideoCall': 'Video',
    'VoiceCall': 'PhoneCall',
    'NotificationBell': 'Bell',
    'NotificationAlert': 'AlertCircle',
    
    // Business & Money
    'BuyProduct': 'ShoppingCart',
    'PayMoney': 'CreditCard',
    'DonateMoney': 'Heart',
    'SupportCreator': 'Coffee',
    'PricingPlan': 'DollarSign',
    'InvoiceBill': 'FileText',
    'ReceiptBill': 'Receipt',
    
    // Files & Documents
    'DocumentFile': 'File',
    'PDFFile': 'FileText',
    'ImageFile': 'Image',
    'VideoFile': 'Video',
    'AudioFile': 'Music',
    'ZipFile': 'FileArchive',
    'FolderFile': 'Folder',
    'NewFile': 'FilePlus',
    'OpenFile': 'FolderOpen',
    
    // Settings & Tools
    'SettingsGear': 'Settings',
    'EditSettings': 'Edit',
    'SaveSettings': 'Save',
    'ResetSettings': 'RotateCcw',
    'HelpInfo': 'HelpCircle',
    'InfoDetails': 'Info',
    'WarningAlert': 'AlertTriangle',
    'ErrorAlert': 'AlertOctagon',
    'SuccessCheck': 'CheckCircle',
    
    // Location & Maps
    'LocationPin': 'MapPin',
    'MapLocation': 'Map',
    'CompassDirection': 'Compass',
    'NavigationRoute': 'Navigation',
    
    // Time & Calendar
    'CalendarDate': 'Calendar',
    'ClockTime': 'Clock',
    'TimerCountdown': 'Timer',
    'ScheduleEvent': 'CalendarDays',
    'ReminderBell': 'Bell',
    
    // User & Profile
    'UserProfile': 'User',
    'UserAccount': 'UserCircle',
    'UserSettings': 'UserCog',
    'UserLogout': 'LogOut',
    'UserLogin': 'LogIn',
    'UserSignup': 'UserPlus',
    'VerifiedBadge': 'Check',
    'AvatarUser': 'User',
    
    // Content & Text
    'TextContent': 'Type',
    'BoldText': 'Bold',
    'ItalicText': 'Italic',
    'UnderlineText': 'Underline',
    'ListBullet': 'List',
    'ListNumbered': 'ListOrdered',
    'QuoteText': 'Quote',
    'CodeBlock': 'Code',
    'LinkText': 'Link',
    
    // Layout & Design
    'GridLayout': 'Grid',
    'ListLayout': 'List',
    'CardLayout': 'Layout',
    'SidebarLayout': 'Sidebar',
    'ColumnsLayout': 'Columns',
    
    // Status & States
    'LoadingSpinner': 'Loader2',
    'SuccessCheck': 'Check',
    'ErrorX': 'X',
    'WarningTriangle': 'AlertTriangle',
    'InfoCircle': 'Info',
    'QuestionMark': 'HelpCircle',
    
    // Arrows & Directions
    'ArrowUp': 'ArrowUp',
    'ArrowDown': 'ArrowDown',
    'ArrowLeft': 'ArrowLeft',
    'ArrowRight': 'ArrowRight',
    'ArrowUpRight': 'ArrowUpRight',
    'ArrowDownRight': 'ArrowDownRight',
    'ArrowUpLeft': 'ArrowUpLeft',
    'ArrowDownLeft': 'ArrowDownLeft',
    
    // Common Actions
    'AddPlus': 'Plus',
    'RemoveMinus': 'Minus',
    'EditPencil': 'Pencil',
    'DeleteTrash': 'Trash2',
    'SaveDisk': 'Save',
    'CancelX': 'X',
    'ConfirmCheck': 'Check',
    'RefreshReload': 'RefreshCw',
    'SyncUpdate': 'Sync',
    
    // Web & Internet
    'WebsiteGlobe': 'Globe',
    'LinkUrl': 'Link',
    'ExternalLink': 'ExternalLink',
    'ShareLink': 'Share2',
    'CopyLink': 'Copy',
    'QRCode': 'QrCode',
    'WifiConnection': 'Wifi',
    'BluetoothConnection': 'Bluetooth',
    
    // Development & Code
    'CodeEditor': 'Code',
    'TerminalConsole': 'Terminal',
    'BugError': 'Bug',
    'GitBranch': 'GitBranch',
    'GitCommit': 'GitCommit',
    'GitMerge': 'GitMerge',
    'GitPull': 'GitPullRequest',
    
    // Data & Analytics
    'ChartBar': 'BarChart',
    'ChartLine': 'LineChart',
    'ChartPie': 'PieChart',
    'TrendingUp': 'TrendingUp',
    'TrendingDown': 'TrendingDown',
    'AnalyticsData': 'Activity',
    'StatsMetrics': 'BarChart3',
    
    // Security & Privacy
    'LockSecure': 'Lock',
    'UnlockOpen': 'Unlock',
    'ShieldProtect': 'Shield',
    'KeyAccess': 'Key',
    'EyeView': 'Eye',
    'EyeHide': 'EyeOff',
    
    // Weather & Nature
    'SunWeather': 'Sun',
    'MoonNight': 'Moon',
    'CloudWeather': 'Cloud',
    'RainWeather': 'CloudRain',
    'SnowWeather': 'Snowflake',
    'WindWeather': 'Wind',
    
    // Health & Fitness
    'HeartHealth': 'Heart',
    'ActivityFitness': 'Activity',
    'TargetGoal': 'Target',
    'AwardAchievement': 'Award',
    'TrophyWin': 'Trophy',
    
    // Shopping & E-commerce
    'ShoppingCart': 'ShoppingCart',
    'ShoppingBag': 'ShoppingBag',
    'StoreShop': 'Store',
    'PackageBox': 'Package',
    'TruckDelivery': 'Truck',
    
    // Education & Learning
    'BookRead': 'Book',
    'GraduationCap': 'GraduationCap',
    'SchoolLearn': 'School',
    'LightbulbIdea': 'Lightbulb',
    'StarFavorite': 'Star',
    
    // Entertainment & Fun
    'GameController': 'Gamepad2',
    'MovieFilm': 'Film',
    'MusicNote': 'Music',
    'PartyCelebrate': 'PartyPopper',
    'GiftPresent': 'Gift',
    
    // Default fallbacks for common patterns
    'Like': 'Heart',
    'Subscribe': 'Bell',
    'Follow': 'UserPlus',
    'Share': 'Share2',
    'Comment': 'MessageCircle',
    'Save': 'Save',
    'Edit': 'Edit2',
    'Delete': 'Trash2',
    'Add': 'Plus',
    'Remove': 'Minus',
    'Close': 'X',
    'Open': 'ChevronRight',
    'Search': 'Search',
    'Filter': 'Filter',
    'Settings': 'Settings',
    'Help': 'HelpCircle',
    'Info': 'Info',
    'Warning': 'AlertTriangle',
    'Error': 'AlertCircle',
    'Success': 'CheckCircle',
    'Loading': 'Loader2',
};

/**
 * Maps a friendly icon name to a Lucide icon name
 * @param {string} friendlyName - Friendly name like "LikeFacebook" or "SubscribeYoutube"
 * @returns {string} - Lucide icon name like "ThumbsUp" or "Youtube"
 */
export function mapIconName(friendlyName) {
    if (!friendlyName) return null;
    
    // If it's already a valid Lucide name (starts with capital, no spaces), return as-is
    if (/^[A-Z][a-zA-Z0-9]*$/.test(friendlyName) && !ICON_MAP[friendlyName]) {
        return friendlyName;
    }
    
    // Check if it's in our mapping
    if (ICON_MAP[friendlyName]) {
        return ICON_MAP[friendlyName];
    }
    
    // Try to find a match by converting patterns
    // "LikeFacebook" -> try "LikeFacebook", "Like", "Facebook"
    const parts = friendlyName.split(/(?=[A-Z])/);
    if (parts.length > 1) {
        // Try the full name first
        if (ICON_MAP[friendlyName]) {
            return ICON_MAP[friendlyName];
        }
        // Try the last part (e.g., "Facebook" from "LikeFacebook")
        const lastPart = parts[parts.length - 1];
        if (ICON_MAP[lastPart]) {
            return ICON_MAP[lastPart];
        }
        // Try the first part (e.g., "Like" from "LikeFacebook")
        const firstPart = parts[0];
        if (ICON_MAP[firstPart]) {
            return ICON_MAP[firstPart];
        }
    }
    
    // Fallback: capitalize first letter and return as-is
    console.warn(`Icon "${friendlyName}" not found in mapping, using as-is`);
    return friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1);
}

/**
 * Get all available friendly icon names
 * @returns {string[]} - Array of friendly icon names
 */
export function getAvailableIconNames() {
    return Object.keys(ICON_MAP);
}

export default ICON_MAP;

