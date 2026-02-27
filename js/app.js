// BexleyMesh Blog Application
// Handles markdown parsing, blog post loading, and dynamic content rendering

// Configuration
const config = {
    postsDir: 'posts/',
    dataDir: 'data/',
    postsPerPage: 10,
    // Detect if running on GitHub Pages and set base path accordingly
    basePath: window.location.hostname === 'davidjaymartin.github.io' ? '/bexleymesh/' : '/'
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
            const response = await fetch(config.basePath + 'data/posts-manifest.json');
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
            const response = await fetch(config.basePath + 'posts/' + filename);
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

// Export for use in HTML pages
window.BlogManager = BlogManager;
window.BlogPost = BlogPost;
window.FrontMatterParser = FrontMatterParser;
window.MarkdownParser = MarkdownParser;
window.blogManager = blogManager;
window.formatDate = formatDate;
window.renderBlogListing = renderBlogListing;
window.renderPostDetail = renderPostDetail;
window.getQueryParam = getQueryParam;
