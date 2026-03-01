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
                    <div class="w-8 h-8 rounded-full bg-mesh-500 flex items-center justify-center text-white">
                        <i class="fa-solid fa-tower-broadcast"></i>
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
    renderResources('resources-component');
    renderFooter('footer-component');
});
