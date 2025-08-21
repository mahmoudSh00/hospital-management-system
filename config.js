// Configuration file for مستشفى الوحدة درنة System

const CONFIG = {
    // Application Settings
    APP_NAME: 'مستشفى الوحدة درنة',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'نظام إدارة المرضى والمعلومات الطبية',
    
    // Hospital Information
    HOSPITAL: {
        name: 'مستشفى الوحدة درنة',
        address: 'درنة، ليبيا',
        phone: '+218-XX-XXXXXXX',
        email: 'info@hospital-derna.ly',
        website: 'www.hospital-derna.ly'
    },
    
    // System Settings
    SYSTEM: {
        defaultLanguage: 'ar',
        direction: 'rtl',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        currency: 'LYD',
        timezone: 'Africa/Tripoli'
    },
    
    // User Settings
    USER: {
        sessionTimeout: 30, // minutes
        passwordMinLength: 6,
        maxLoginAttempts: 3,
        lockoutDuration: 15 // minutes
    },
    
    // Pagination Settings
    PAGINATION: {
        defaultPageSize: 10,
        maxPageSize: 100,
        pageSizeOptions: [5, 10, 25, 50, 100]
    },
    
    // Validation Rules
    VALIDATION: {
        nationalId: {
            length: 12,
            pattern: /^\d{12}$/
        },
        phone: {
            pattern: /^(091|092|093|094|095)\d{7}$/,
            message: 'رقم الهاتف يجب أن يبدأ بـ 091, 092, 093, 094, أو 095 ويتكون من 10 أرقام'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'يرجى إدخال بريد إلكتروني صحيح'
        }
    },
    
    // File Upload Settings
    UPLOAD: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        uploadPath: '/uploads/'
    },
    
    // Print Settings
    PRINT: {
        prescriptionSize: 'A6',
        margins: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
        },
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif'
    },
    
    // Chart Settings
    CHARTS: {
        defaultColors: [
            '#0d6efd', '#198754', '#dc3545', '#ffc107', 
            '#0dcaf0', '#6f42c1', '#fd7e14', '#20c997'
        ],
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    },
    
    // Storage Settings
    STORAGE: {
        prefix: 'hospital_',
        keys: {
            currentUser: 'hospital_current_user',
            patients: 'hospital_patients',
            users: 'hospital_users',
            settings: 'hospital_settings',
            rememberUser: 'hospital_remember_user'
        }
    },
    
    // API Settings (for future use)
    API: {
        baseUrl: 'https://api.hospital-derna.ly',
        timeout: 30000, // 30 seconds
        retryAttempts: 3,
        endpoints: {
            auth: '/auth',
            patients: '/patients',
            users: '/users',
            statistics: '/statistics'
        }
    },
    
    // SMS Settings (for future use)
    SMS: {
        provider: 'local', // 'twilio', 'aws-sns', 'local'
        templates: {
            newUser: 'مرحباً {name}, كلمة المرور الخاصة بك: {password}',
            resetPassword: 'كلمة المرور الجديدة: {password}',
            appointment: 'تذكير: لديك موعد في {date} الساعة {time}'
        }
    },
    
    // Feature Flags
    FEATURES: {
        enableSMS: false,
        enableEmailNotifications: false,
        enableFileUpload: false,
        enableAdvancedReports: true,
        enableAuditLog: false,
        enableBackup: false
    },
    
    // UI Settings
    UI: {
        theme: 'light', // 'light', 'dark', 'auto'
        primaryColor: '#0d6efd',
        secondaryColor: '#6c757d',
        animationSpeed: 300,
        showLoadingSpinner: true,
        autoSaveInterval: 30000 // 30 seconds
    },
    
    // Security Settings
    SECURITY: {
        enableCSRF: false,
        enableXSS: true,
        enableSQLInjection: true,
        sessionSecure: false, // set to true in production with HTTPS
        cookieSameSite: 'Lax'
    },
    
    // Development Settings
    DEV: {
        enableDebugMode: true,
        enableConsoleLogging: true,
        enablePerformanceMonitoring: false,
        mockDataEnabled: true
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Utility functions for configuration
const ConfigUtils = {
    // Get configuration value by path
    get: function(path, defaultValue = null) {
        const keys = path.split('.');
        let value = CONFIG;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    },
    
    // Check if feature is enabled
    isFeatureEnabled: function(featureName) {
        return this.get(`FEATURES.${featureName}`, false);
    },
    
    // Get storage key with prefix
    getStorageKey: function(key) {
        return this.get(`STORAGE.keys.${key}`) || `${this.get('STORAGE.prefix')}${key}`;
    },
    
    // Get validation rule
    getValidationRule: function(field) {
        return this.get(`VALIDATION.${field}`);
    },
    
    // Get API endpoint
    getApiEndpoint: function(endpoint) {
        const baseUrl = this.get('API.baseUrl');
        const path = this.get(`API.endpoints.${endpoint}`);
        return baseUrl && path ? `${baseUrl}${path}` : null;
    }
};

// Make ConfigUtils available globally
if (typeof window !== 'undefined') {
    window.ConfigUtils = ConfigUtils;
}