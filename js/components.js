// BexleyMesh Reusable UI Components
// Shared Navigation, Resources, and Footer sections

/**
 * Render the navigation bar into the specified container element.
 */
function renderNavigation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <nav class="fixed w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <!-- Logo and Text -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 flex items-center justify-center text-white">
                        <img src="BexleyMesh.svg" alt="BexleyMesh" class="w-8 h-8">
                    </div>
                    <span class="font-bold text-white tracking-tight hidden xl2:block text-xl"><a href="index.html">BexleyMesh Community Network</a><span class="text-mesh-500"></span></span>
                    <span class="font-bold text-white tracking-tight xl2:hidden text-xl"><a href="index.html">BexleyMesh</a><span class="text-mesh-500"></span></span>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden lg:flex space-x-4 mx-6">
                    <a href="blog.html" class="text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">Project Updates</a>
                    <a href="page.html?page=getting-started" class="text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">Getting Started</a>
                    <a href="https://cmh.meshmapper.net/embed.php?lat=39.9638200178056&lon=-82.92957200523269&zoom=15&geofence=0&utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" class="text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium" target="_blank" rel="noopener noreferrer">Coverage Map</a>
                    <a href="page.html?page=about" class="text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">About Us</a>                  
                </div>
                
                <!-- Right Side: Discord Button and Mobile Menu Button -->
                <div class="flex items-center space-x-4">
                    <a href="https://discord.com/channels/1280671076644425749/1280693593002082436" class="hidden lg:inline-flex bg-mesh-600 hover:bg-mesh-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-mesh-900/50" target="_blank" rel="noopener noreferrer">
                        Join Discord
                    </a>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="flex lg:hidden items-center justify-center w-10 h-10 text-mesh-300 hover:text-mesh-100 transition-colors">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden border-t border-slate-700 bg-mesh-900/90 backdrop-blur">
            <div class="px-4 py-4 space-y-2">
                <a href="blog.html" class="block text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">Project Updates</a>
                <a href="page.html?page=getting-started" class="block text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">Getting Started</a>
                <a href="https://cmh.meshmapper.net/embed.php?lat=39.9638200178056&lon=-82.92957200523269&zoom=15&geofence=0&utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" class="block text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium" target="_blank" rel="noopener noreferrer">Coverage Map</a>
                <a href="page.html?page=about" class="block text-gray-300 hover:text-mesh-300 transition-colors px-3 py-2 text-sm font-medium">About Us</a>
                <a href="https://discord.com/channels/1280671076644425749/1280693593002082436" class="block text-mesh-300 hover:text-mesh-100 transition-colors px-3 py-2 text-sm font-semibold" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-discord mr-2"></i>Join Discord</a>
            </div>
        </div>
    </nav>
    `;

    // Set up mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Render the resources sidebar widget into the specified container element.
 */
function renderResources(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="bg-mesh-card rounded-xl p-6 border border-slate-800">
        <h3 class="font-bold text-white mb-4">Resources</h3>
        <ul class="space-y-3">
            <li>
                <a href="https://meshcolumb.us?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" class="flex items-center text-slate-400 hover:text-mesh-300 transition-colors" target="_blank" rel="noopener noreferrer">
                    <div class="w-8 flex justify-center shrink-0 mr-2">
                        <i class="fa-solid fa-tower-broadcast"></i>
                    </div>
                    <span>Central Ohio Mesh</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>
                </a>
            </li>
            <li>
                <a href="https://discord.com/channels/1280671076644425749/1280693593002082436" class="flex items-center text-slate-400 hover:text-mesh-300 transition-colors" target="_blank" rel="noopener noreferrer">
                    <div class="w-8 flex justify-center shrink-0 mr-2">
                        <i class="fa-brands fa-discord"></i>
                    </div>
                    <span>Join Discord</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>
                </a>
            </li>
            <li>
                <a href="https://meshcore.co.uk?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" class="flex items-center text-slate-400 hover:text-mesh-300 transition-colors" target="_blank" rel="noopener noreferrer">
                    <div class="w-8 flex justify-center shrink-0 mr-2">
                        <i class="fa-solid fa-microchip"></i>
                    </div>
                    <span>MeshCore</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>
                </a>
            </li>
            <li>
                <a href="https://flasher.meshcore.co.uk?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" class="flex items-center text-slate-400 hover:text-mesh-300 transition-colors" target="_blank" rel="noopener noreferrer">
                    <div class="w-8 flex justify-center shrink-0 mr-2">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <span>Firmware Flasher</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>
                </a>
            </li>
            <li>
                <a href="https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md" class="flex items-center text-slate-400 hover:text-mesh-300 transition-colors" target="_blank" rel="noopener noreferrer">
                    <div class="w-8 flex justify-center shrink-0 mr-2">
                        <i class="fa-solid fa-book"></i>
                    </div>
                    <span>Documentation</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>
                </a>
            </li>
        </ul>
    </div>
    `;
}

/**
 * Render the network status sidebar widget into the specified container element.
 */
function renderNetworkStatus(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="bg-gradient-to-br from-mesh-800 to-mesh-900 rounded-xl p-6 border border-mesh-700 shadow-lg">
        <h3 class="font-bold text-white mb-4 text-lg">Network Status</h3>
        <div id="network-status-container" class="space-y-2">
            <div class="text-slate-300 text-sm">Loading network status...</div>
        </div>
        <a href="blog.html" class="text-mesh-300 hover:text-mesh-100 text-sm font-semibold mt-4 inline-block transition-colors">View Details \u2192</a>
    </div>
    `;

    // Start loading live data
    loadNetworkStatusData();
}

/**
 * Render the coverage map sidebar widget into the specified container element.
 */
function renderCoverageMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <div class="bg-mesh-card rounded-xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 class="font-bold text-white">Coverage Map</h3>
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        <div class="h-64 bg-slate-800 relative">
            <iframe 
                src="https://cmh.meshmapper.net/embed.php?lat=39.9638200178056&lon=-82.92957200523269&zoom=12&geofence=0" 
                width="100%" 
                height="100%" 
                frameborder="0" 
                style="border:0; border-radius: 0;" 
                allowfullscreen="" 
                aria-hidden="false" 
                tabindex="0">
            </iframe>
            <a 
                href="https://cmh.meshmapper.net?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink" 
                target="_blank" 
                rel="noopener noreferrer"
                class="absolute bottom-4 right-4 bg-mesh-600 hover:bg-mesh-500 text-white p-2 rounded-lg shadow-lg transition-all hover:scale-110 z-10"
                title="Open Full Map">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        </div>
    </div>
    `;
}

// --- Network Status Helpers ---

/**
 * Determine network status label and color from health percentage.
 */
function getNetworkStatus(healthPercentage, onlineNodes, totalNodes) {
    if (totalNodes === 0 || onlineNodes === 0) {
        return { label: 'OFFLINE', color: [255, 0, 0], tooltip: 'All repeaters are currently offline. The mesh network is unavailable.' };
    }
    const pct = (onlineNodes / totalNodes) * 100;
    if (pct > 75) return { label: 'ONLINE', color: [34, 197, 94], tooltip: `All repeaters are active. The mesh network is fully operational with ${onlineNodes} of ${totalNodes} repeaters online.` };
    if (pct >= 25) return { label: 'REDUCED COVERAGE', color: [248, 255, 43], tooltip: `Between 25% and 75% of repeaters are active (${onlineNodes} of ${totalNodes}). Some areas may have limited connectivity.` };
    return { label: 'LIMITED COVERAGE', color: [255, 152, 43], tooltip: `Fewer than 25% of repeaters are active (${onlineNodes} of ${totalNodes}). Most areas will have little or no connectivity.` };
}

/**
 * Update the node-pulse animation with a dynamic color.
 */
function updatePulseColor(element, r, g, b) {
    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    let styleEl = document.getElementById('dynamic-pulse-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'dynamic-pulse-style';
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
        @keyframes pulse-dynamic {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(${r}, ${g}, ${b}, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, 0); }
        }
    `;
    element.style.animation = 'pulse-dynamic 2s infinite';
}

/**
 * Load and display network status data into the sidebar widget and hero badge.
 */
async function loadNetworkStatusData() {
    try {
        const response = await fetch('data/repeater-status.json');
        const data = await response.json();
        const container = document.getElementById('network-status-container');
        const statusText = document.getElementById('network-status-text');
        const nodePulse = document.getElementById('node-pulse');
        const statusBadge = document.getElementById('network-status-badge');

        // Update network status badge if present (hero section on index page)
        const status = getNetworkStatus(data.healthPercentage, data.onlineNodes, data.totalNodes);
        if (statusText) statusText.textContent = `Network Status: ${status.label}`;
        if (statusBadge) {
            const badgeTooltip = statusBadge.querySelector('.tooltip-text');
            if (badgeTooltip) badgeTooltip.textContent = status.tooltip;
            const [r, g, b] = status.color;
            if (nodePulse) updatePulseColor(nodePulse, r, g, b);
            statusBadge.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        }

        // Update Live Stats if present (index page)
        const statTotalNodes = document.getElementById('stat-total-nodes');
        if (statTotalNodes) statTotalNodes.textContent = `${data.onlineNodes || 0}/${data.totalNodes || 0}`;
        const statAvgSignal = document.getElementById('stat-avg-signal');
        if (statAvgSignal) statAvgSignal.textContent = data.averageSignal !== null ? `${data.averageSignal} dBm` : 'N/A';
        const statCompanionCount = document.getElementById('stat-companion-count');
        if (statCompanionCount) statCompanionCount.textContent = data.companionCount !== undefined ? data.companionCount : '--';
        const statMessageCount = document.getElementById('stat-message-count');
        if (statMessageCount) statMessageCount.textContent = data.messageCount !== undefined ? data.messageCount : '--';

        // Update sidebar network status widget
        if (!container) return;
        if (!data.nodes || data.nodes.length === 0) {
            container.innerHTML = '<div class="text-slate-300 text-sm">No repeaters online</div>';
            return;
        }

        const statusHtml = data.nodes.map(node => {
            const statusColor = node.status === 'online' ? 'text-mesh-300' : 'text-red-400';
            const statusDot = node.status === 'online' ? 'bg-mesh-500' : 'bg-red-500';
            const borderColor = node.status === 'online' ? 'border-l-mesh-500' : 'border-l-red-500';
            const lastSeen = node.lastSeen ? new Date(node.lastSeen).toLocaleString() : 'Unknown';
            return `
                <div class="text-sm p-3 rounded bg-slate-800 border-l-4 ${borderColor}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full ${statusDot}"></span>
                            <span class="text-slate-100 font-medium">${node.name}</span>
                        </div>
                        <span class="text-xs font-semibold ${statusColor} uppercase">${node.status}</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-2 ml-4">Last heard: ${lastSeen}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="text-sm text-slate-300 mb-3 pb-2 border-b border-slate-700">
                <span class="font-bold text-white text-base">${data.onlineNodes}/${data.totalNodes}</span> repeaters online
            </div>
            ${statusHtml}
        `;
    } catch (error) {
        console.error('Failed to load network status:', error);
        const container = document.getElementById('network-status-container');
        if (container) {
            container.innerHTML = '<div class="text-slate-300 text-sm">Unable to load status</div>';
        }
    }
}

/**
 * Render the footer into the specified container element.
 */
function renderFooter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
    <footer class="border-t border-slate-800 bg-mesh-dark pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div class="col-span-1 md:col-span-2">
                    <span class="font-bold text-xl text-white tracking-tight"><span class="text-mesh-500">BexleyMesh</span> Community Network</span>
                    <p class="mt-4 text-slate-500 text-sm max-w-xs">
                        A community project dedicated to building off-grid communication infrastructure for emergency response and hobbyist exploration.
                    </p>
                </div>
                <div class="md:col-start-4 md:text-right">
                    <h4 class="text-white font-bold mb-4">Sitemap</h4>
                    <ul class="space-y-2 text-sm text-slate-500">
                        <li><a href="blog.html" class="hover:text-white transition-colors">Project Updates</a></li>
                        <li><a href="page.html?page=getting-started" class="hover:text-white transition-colors">Getting Started</a></li>
                        <li><a href="page.html?page=about" class="hover:text-white transition-colors">About Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-slate-600 text-xs">&copy; 2026 Bexley Mesh Community Deployment. Open Source.</p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://github.com/DavidJayMartin/BexleyMesh" class="text-slate-600 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" title="Visit our GitHub"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
    </footer>
    `;
}

// Auto-initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderNavigation('nav-component');
    renderNetworkStatus('network-status-component');
    renderCoverageMap('coverage-map-component');
    renderResources('resources-component');
    renderFooter('footer-component');
});
