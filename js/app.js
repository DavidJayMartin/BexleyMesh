// BexleyMesh Blog Application
// Handles markdown parsing, blog post loading, and dynamic content rendering

// Configuration
const config = {
    postsDir: 'posts/',
    dataDir: 'data/',
    postsPerPage: 10
};

// YAML Front Matter Parser (kept for backwards compatibility)
class FrontMatterParser {
    static parse(content) {
        const fmRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(fmRegex);
        
        if (!match) {
            return { frontMatter: {}, content: content };
        }

        const [, fmString, body] = match;
        const frontMatter = this.parseFrontMatter(fmString);
        
        return { frontMatter, content: body };
    }

    static parseFrontMatter(fmString) {
        const fm = {};
        const lines = fmString.split('\n');
        
        for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                fm[key.trim()] = value.replace(/^["']|["']$/g, '');
            }
        }
        
        return fm;
    }
}

// Markdown Parser
class MarkdownParser {
    static parse(markdown) {
        let html = markdown;

        // Code blocks (must be before inline code)
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            const escaped = code.replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;');
            return `<pre class="prose"><code class="language-${lang}">${escaped}</code></pre>`;
        });

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Bold
        html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Headings (must be before paragraph conversion)
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Lists
        html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Numbered lists
        html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

        // Paragraphs
        html = html.split('\n\n').map(para => {
            para = para.trim();
            // Don't wrap headings, lists, code blocks
            if (para.match(/^<(h[1-6]|ul|ol|li|pre|code)/)) {
                return para;
            }
            if (para.length > 0) {
                return `<p>${para}</p>`;
            }
            return '';
        }).join('\n');

        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr />');

        return html;
    }
}

// Blog Post Model
class BlogPost {
    constructor(filename, metadata, content) {
        this.filename = filename;
        this.slug = filename.replace(/\.md$/, '');
        this.title = metadata.title || 'Untitled';
        this.date = metadata.date || '';
        this.author = metadata.author || 'Admin';
        this.tags = Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags || '').split(',').map(t => t.trim()).filter(t => t);
        this.excerpt = metadata.excerpt || this.generateExcerpt(content);
        this.content = content;
        this.htmlContent = MarkdownParser.parse(content);
    }

    generateExcerpt(content) {
        // Get first 150 characters
        const text = content.replace(/[#*_`\[\]()]/g, '').trim();
        return text.substring(0, 150) + (text.length > 150 ? '...' : '');
    }

    toJSON() {
        return {
            slug: this.slug,
            title: this.title,
            date: this.date,
            author: this.author,
            tags: this.tags,
            excerpt: this.excerpt
        };
    }
}

// Blog Manager
class BlogManager {
    constructor() {
        this.posts = [];
        this.loaded = false;
    }

    async loadPosts() {
        try {
            const response = await fetch('data/posts-manifest.json');
            const manifest = await response.json();
            
            // Check if manifest is array of objects (new format) or array of strings (old format)
            const isNewFormat = manifest.length > 0 && typeof manifest[0] === 'object';
            
            for (const item of manifest) {
                const filename = isNewFormat ? item.filename : item;
                const metadata = isNewFormat ? item : {};
                await this.loadPost(filename, metadata);
            }
            
            // Sort by date (newest first)
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.loaded = true;
        } catch (error) {
            console.error('Failed to load posts manifest:', error);
        }
    }

    async loadPost(filename, metadata = {}) {
        try {
            const response = await fetch('posts/' + filename);
            const content = await response.text();
            
            // Use provided metadata, or parse from YAML front-matter as fallback
            let finalMetadata = metadata;
            if (Object.keys(metadata).length === 0) {
                const { frontMatter } = FrontMatterParser.parse(content);
                finalMetadata = frontMatter;
            }
            
            const post = new BlogPost(filename, finalMetadata, content);
            this.posts.push(post);
        } catch (error) {
            console.error(`Failed to load post ${filename}:`, error);
        }
    }

    getPosts(page = 1) {
        const pageSize = config.postsPerPage;
        const startIndex = (page - 1) * pageSize;
        return this.posts.slice(startIndex, startIndex + pageSize);
    }

    getPostBySlug(slug) {
        return this.posts.find(post => post.slug === slug);
    }

    getPostsByTag(tag) {
        return this.posts.filter(post => post.tags.includes(tag));
    }

    getAllTags() {
        const tagSet = new Set();
        this.posts.forEach(post => {
            post.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }

    getTotalPages() {
        return Math.ceil(this.posts.length / config.postsPerPage);
    }
}

// Global blog manager instance
const blogManager = new BlogManager();

// Utility Functions
function formatDate(dateString) {
    try {
        const date = new Date(dateString + 'T00:00:00Z');
        if (isNaN(date.getTime())) {
            return dateString; // Return original if parsing fails
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (e) {
        return dateString;
    }
}

function slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

// DOM Rendering Functions
function renderBlogListing(posts, container) {
    if (!container) return;
    
    const html = posts.map(post => `
        <article class="bg-mesh-card rounded-xl p-6 border border-slate-800 hover:border-mesh-500/50 transition-colors mb-6 group">
            <div class="flex items-center text-xs text-mesh-400 mb-2 font-mono">
                <span>${formatDate(post.date)}</span>
                <span class="mx-2">•</span>
                <span>${post.author}</span>
                ${post.tags.length > 0 ? `<span class="mx-2">•</span><span>${post.tags.join(', ')}</span>` : ''}
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-mesh-300 transition-colors mb-2">
                <a href="post.html?post=${post.slug}">${post.title}</a>
            </h3>
            <p class="text-slate-400 text-sm mb-4">
                ${post.excerpt}
            </p>
            <a href="post.html?post=${post.slug}" class="text-sm font-semibold text-mesh-500 hover:text-mesh-300">Read More &rarr;</a>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

function renderPostDetail(post, container) {
    if (!container || !post) return;
    
    const tagsHtml = post.tags.map(tag => 
        `<a href="blog.html?tag=${encodeURIComponent(tag)}" class="inline-block px-3 py-1 bg-mesh-900/50 text-mesh-300 rounded-full text-sm hover:bg-mesh-900">${tag}</a>`
    ).join(' ');
    
    const html = `
        <article class="max-w-4xl">
            <header class="mb-8 pb-8 border-b border-slate-800">
                <h1 class="text-4xl font-bold text-white mb-4">${post.title}</h1>
                <div class="flex items-center text-slate-400 text-sm space-x-4 flex-wrap gap-2">
                    <span>${formatDate(post.date)}</span>
                    <span>•</span>
                    <span>By ${post.author}</span>
                    ${post.tags.length > 0 ? `<span>•</span><div class="flex gap-2">${tagsHtml}</div>` : ''}
                </div>
            </header>
            <div class="prose prose-invert text-slate-300 leading-relaxed">
                ${post.htmlContent}
            </div>
        </article>
    `;
    
    container.innerHTML = html;
}

// URL Parameter Parsing
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// ============================================================================
// Repeater Data Manager
// Fetches real-time repeater data from letsmesh.net API
// ============================================================================

class RepeaterDataManager {
    constructor(config = {}) {
        this.apiUrl = config.apiUrl || 'https://api.letsmesh.net/api/packets/filtered';
        this.observerKey = config.observerKey || '2B63BF3DF73DA29F30DF1308ACA6480E9F09ABB43A8993533465A5FED60CCAD7';
        this.region = config.region || 'CMH';
        this.packetLimit = config.packetLimit || 500;
        this.onlineTimeoutMs = (config.onlineTimeoutMinutes || 60) * 60 * 1000;
        
        // Known repeater metadata
        this.repeaterMetadata = {
            "0D99036FDF510A790C2FC9257CA41ED132AB5FF35288927F61CD8EF45D2F0EC7": {
                name: "BexleyMesh☀️♻️",
                address: "Ohio State Fair Park, Columbus, OH",
                hardware: "Meshtastic T-Beam V1.1",
                firmware: "Meshtastic"
            },
            "CC540240BAF29FF141A5F70D87622C3716B6E810AF1097E80D4D2A442E1414E4": {
                name: "TJ00",
                address: "Downtown Columbus, OH",
                hardware: "Unknown",
                firmware: "Meshtastic"
            }
        };
        
        this.data = null;
        this.lastFetch = null;
    }
    
    /**
     * Fetch packet data from letsmesh.net API
     * @returns {Promise<Array|null>} Array of packets or null on error
     */
    async fetchApiData() {
        try {
            const params = new URLSearchParams({
                observer: this.observerKey,
                region: this.region,
                limit: this.packetLimit
            });
            
            const url = `${this.apiUrl}?${params.toString()}`;
            console.log(`Fetching repeater data from API: ${url}`);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                console.error(`API error: ${response.status} ${response.statusText}`);
                return null;
            }
            
            const packets = await response.json();
            console.log(`Successfully retrieved ${packets.length} packets from API`);
            return packets;
            
        } catch (error) {
            console.error('Error fetching API data:', error);
            return null;
        }
    }
    
    /**
     * Extract repeater data from API packets
     * Groups packets by repeater and extracts most recent advertisement
     * @param {Array} packets - Array of packet objects from API
     * @returns {Object} Dictionary mapping public_key to repeater data
     */
    extractRepeaterData(packets) {
        const repeaters = {};
        
        for (const packet of packets) {
            try {
                // Only interested in advertisement packets
                if (packet.payload_type !== 'Advert') continue;
                
                const decoded = packet.decoded_payload;
                if (!decoded) continue;
                
                // Only interested in Repeater type nodes
                if (decoded.mode !== 'Repeater') continue;
                
                const publicKey = packet.public_key;
                if (!publicKey) continue;
                
                const heardAt = packet.heard_at;
                const rssi = packet.rssi || 0;
                const nodeName = packet.node_name || decoded.name || 'Unknown';
                
                // Update or create repeater entry (keep most recent heard_at)
                if (!repeaters[publicKey] || heardAt > repeaters[publicKey].heard_at) {
                    repeaters[publicKey] = {
                        publicKey,
                        heardAt,
                        rssi,
                        nodeName,
                        lat: decoded.lat,
                        lon: decoded.lon,
                        decoded
                    };
                }
            } catch (error) {
                console.warn('Error processing packet:', error);
                continue;
            }
        }
        
        console.log(`Extracted data for ${Object.keys(repeaters).length} unique repeaters`);
        return repeaters;
    }
    
    /**
     * Determine if repeater is online based on last heard time
     * @param {string} heardAt - ISO format timestamp
     * @returns {string} "online" or "offline"
     */
    determineStatus(heardAt) {
        try {
            const heardTime = new Date(heardAt);
            const now = new Date();
            const timeSinceHeard = now - heardTime;
            
            return timeSinceHeard < this.onlineTimeoutMs ? 'online' : 'offline';
        } catch (error) {
            console.warn(`Error parsing timestamp ${heardAt}:`, error);
            return 'offline';
        }
    }
    
    /**
     * Calculate signal strength percentage from RSSI value
     * RSSI typical range: -120 to 0 dBm
     * @param {number} rssi - RSSI value in dBm
     * @returns {number} Signal strength as percentage (0-100)
     */
    calculateSignalStrength(rssi) {
        if (rssi === 0) return 0;
        
        // Clamp between -120 and 0
        const clamped = Math.max(-120, Math.min(0, rssi));
        // Convert: -120 dBm = 0%, 0 dBm = 100%
        const percentage = Math.round(((clamped + 120) / 120) * 100);
        return Math.max(0, Math.min(100, percentage));
    }
    
    /**
     * Parse ISO timestamp to local time format
     * Converts UTC timestamp to local timezone display format
     * @param {string} isoTimestamp - ISO format timestamp (UTC)
     * @returns {string} Local time formatted string
     */
    parseTimestamp(isoTimestamp) {
        try {
            const dt = new Date(isoTimestamp);
            // Format as local time: "Feb 27, 2026 4:56 PM" style
            return dt.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        } catch {
            return isoTimestamp;
        }
    }
    
    /**
     * Transform extracted repeater data into target schema
     * @param {Object} repeatersData - Dictionary of extracted repeater data
     * @returns {Object} Data matching repeater-status.json schema
     */
    transformToSchema(repeatersData) {
        const repeatersList = [];
        let onlineCount = 0;
        let totalSignalStrength = 0;
        
        for (const [publicKey, data] of Object.entries(repeatersData)) {
            try {
                const status = this.determineStatus(data.heardAt);
                const signal = this.calculateSignalStrength(data.rssi);
                
                // Get metadata for this repeater if available
                const metadata = this.repeaterMetadata[publicKey] || {};
                
                const repeater = {
                    id: publicKey,
                    name: data.nodeName,
                    status: status,
                    location: {
                        latitude: data.lat,
                        longitude: data.lon,
                        address: metadata.address || 'Location TBD'
                    },
                    lastSeen: this.parseTimestamp(data.heardAt),
                    signalStrength: signal,
                    batteryLevel: null,
                    uptime: null,
                    hardware: {
                        model: metadata.hardware || 'Unknown',
                        firmware: metadata.firmware || 'Unknown'
                    },
                    networkStats: {
                        averageSignal: signal,
                        messageCount24h: null,
                        meshHealth: null
                    }
                };
                
                repeatersList.push(repeater);
                
                if (status === 'online') onlineCount++;
                totalSignalStrength += signal;
                
            } catch (error) {
                console.error(`Error transforming repeater ${publicKey}:`, error);
                continue;
            }
        }
        
        // Calculate aggregate statistics
        const avgSignal = repeatersList.length > 0 
            ? Math.round(totalSignalStrength / repeatersList.length)
            : 0;
        
        const output = {
            timestamp: new Date().toISOString(),
            region: this.region,
            summary: {
                totalRepeaters: repeatersList.length,
                onlineRepeaters: onlineCount,
                offlineRepeaters: repeatersList.length - onlineCount,
                averageSignalStrength: avgSignal,
                networkHealth: repeatersList.length > 0 
                    ? Math.round((onlineCount / repeatersList.length) * 100)
                    : 0
            },
            repeaters: repeatersList
        };
        
        return output;
    }
    
    /**
     * Fetch and transform repeater data
     * @returns {Promise<Object|null>} Transformed data or null on error
     */
    async fetchAndTransform() {
        // Fetch data from API
        const packets = await this.fetchApiData();
        if (!packets) return null;
        
        // Extract repeater data
        const repeatersData = this.extractRepeaterData(packets);
        if (Object.keys(repeatersData).length === 0) {
            console.warn('No repeater data extracted from packets');
        }
        
        // Transform to schema
        const output = this.transformToSchema(repeatersData);
        
        // Store and return
        this.data = output;
        this.lastFetch = new Date();
        
        console.log('Repeater data fetch and transform completed successfully');
        return output;
    }
    
    /**
     * Get current repeater data (fetch if needed)
     * @returns {Promise<Object|null>} Current repeater data or null on error
     */
    async getData() {
        if (!this.data) {
            return await this.fetchAndTransform();
        }
        return this.data;
    }
    
    /**
     * Get repeater by ID
     * @param {string} id - Repeater public key
     * @returns {Object|null} Repeater object or null if not found
     */
    async getRepeater(id) {
        const data = await this.getData();
        if (!data) return null;
        
        return data.repeaters.find(r => r.id === id) || null;
    }
    
    /**
     * Get all online repeaters
     * @returns {Promise<Array>} Array of online repeater objects
     */
    async getOnlineRepeaters() {
        const data = await this.getData();
        if (!data) return [];
        
        return data.repeaters.filter(r => r.status === 'online');
    }
}

// Create global instance
const repeaterManager = new RepeaterDataManager();

// Export for use in HTML pages
window.RepeaterDataManager = RepeaterDataManager;
window.repeaterManager = repeaterManager;
