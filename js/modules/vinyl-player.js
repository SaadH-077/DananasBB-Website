// Vinyl Player Module with Embedded Spotify Player
export function initVinylPlayer() {
    const vinylRecord = document.querySelector('.vinyl-record');
    const vinylCenter = document.querySelector('.vinyl-center');
    const musicNotes = document.querySelector('.music-notes');
    let isPlaying = false;
    let spotifyPlayer = null;

    // YOUR SPOTIFY PLAYLIST CONFIGURATION
    // To get your playlist ID: Open Spotify → Your Playlist → Share → Copy Link
    // Example: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
    // Use only the ID part: 37i9dQZF1DXcBWIGoYBM5M
    const SPOTIFY_PLAYLIST_ID = '37i9dQZF1DXcBWIGoYBM5M'; // Replace with your playlist ID

    // Create Spotify Player Modal
    createSpotifyModal();

    if (vinylRecord && vinylCenter) {
        vinylRecord.addEventListener('click', function() {
            if (isPlaying) {
                stopPlaying();
            } else {
                startPlaying();
            }
            isPlaying = !isPlaying;
        });

        // Add hover effect
        vinylRecord.addEventListener('mouseenter', function() {
            if (!isPlaying) {
                vinylRecord.style.transform = 'scale(1.05)';
            }
        });

        vinylRecord.addEventListener('mouseleave', function() {
            if (!isPlaying) {
                vinylRecord.style.transform = 'scale(1)';
            }
        });
    }

    function createSpotifyModal() {
        // Check if modal already exists
        if (document.getElementById('spotifyPlayerModal')) return;

        const modal = document.createElement('div');
        modal.id = 'spotifyPlayerModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            z-index: 99999;
            display: none;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0d3b2f 0%, #1a5043 100%);
                border-radius: 24px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border: 3px solid #d4af37;
                position: relative;
                max-width: 500px;
                width: 90%;
                animation: slideUp 0.4s ease;
            ">
                <button id="minimizeSpotifyPlayer" style="
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: transparent;
                    border: 2px solid #d4af37;
                    color: #d4af37;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                " onmouseover="this.style.background='#d4af37'; this.style.color='#0d3b2f';" 
                   onmouseout="this.style.background='transparent'; this.style.color='#d4af37';"
                   title="Minimize to corner">
                    ─
                </button>
                
                <button id="closeSpotifyPlayer" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: transparent;
                    border: 2px solid #d4af37;
                    color: #d4af37;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    line-height: 1;
                " onmouseover="this.style.background='#d4af37'; this.style.color='#0d3b2f';" 
                   onmouseout="this.style.background='transparent'; this.style.color='#d4af37';"
                   title="Stop music and close">
                    ×
                </button>
                
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="
                        font-family: 'Playfair Display', serif;
                        font-size: 32px;
                        font-weight: bold;
                        color: #d4af37;
                        margin-bottom: 8px;
                        letter-spacing: 0.1em;
                    ">DANANA'S</div>
                    <div style="
                        font-family: 'Dancing Script', cursive;
                        font-size: 20px;
                        color: #f5ebe0;
                        margin-bottom: 15px;
                    ">Curated Vibes</div>
                    <div style="
                        width: 60px;
                        height: 2px;
                        background: #d4af37;
                        margin: 0 auto;
                    "></div>
                </div>

                <div id="spotifyPlayerContainer" style="
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                ">
                    <!-- Spotify iframe will be inserted here -->
                </div>

                <div style="
                    margin-top: 20px;
                    text-align: center;
                    font-family: 'Playfair Display', serif;
                    color: #f5ebe0;
                    font-size: 12px;
                    opacity: 0.8;
                ">
                    ♫ Enjoy the ambiance ♫
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Create floating mini player
        createFloatingPlayer();

        // Minimize button handler
        document.getElementById('minimizeSpotifyPlayer').addEventListener('click', function() {
            minimizePlayer();
        });

        // Close button handler
        document.getElementById('closeSpotifyPlayer').addEventListener('click', function() {
            stopPlaying();
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                minimizePlayer();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                minimizePlayer();
            }
        });
    }

    function createFloatingPlayer() {
        if (document.getElementById('floatingMusicPlayer')) return;

        const floatingPlayer = document.createElement('div');
        floatingPlayer.id = 'floatingMusicPlayer';
        floatingPlayer.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: linear-gradient(135deg, #0d3b2f 0%, #1a5043 100%);
            border: 2px solid #d4af37;
            border-radius: 16px;
            padding: 15px 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 9998;
            display: none;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: slideInLeft 0.5s ease;
            min-width: 250px;
        `;

        floatingPlayer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px;">
                <div style="flex: 1;">
                    <div style="
                        font-family: 'Playfair Display', serif;
                        font-size: 16px;
                        font-weight: bold;
                        color: #d4af37;
                        margin-bottom: 4px;
                    ">♫ Now Playing</div>
                    <div style="
                        font-family: 'Playfair Display', serif;
                        font-size: 12px;
                        color: #f5ebe0;
                        opacity: 0.9;
                    ">Danana's Vibes</div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button id="expandFloatingPlayer" style="
                        background: transparent;
                        border: 1px solid #d4af37;
                        color: #d4af37;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                    " onmouseover="this.style.background='#d4af37'; this.style.color='#0d3b2f';" 
                       onmouseout="this.style.background='transparent'; this.style.color='#d4af37';"
                       title="Expand player">
                        ▢
                    </button>
                    <button id="closeFloatingPlayer" style="
                        background: transparent;
                        border: 1px solid #d4af37;
                        color: #d4af37;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        line-height: 1;
                    " onmouseover="this.style.background='#d4af37'; this.style.color='#0d3b2f';" 
                       onmouseout="this.style.background='transparent'; this.style.color='#d4af37';"
                       title="Stop music">
                        ×
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(floatingPlayer);

        // Expand button handler
        document.getElementById('expandFloatingPlayer').addEventListener('click', function(e) {
            e.stopPropagation();
            expandPlayer();
        });

        // Close button handler
        document.getElementById('closeFloatingPlayer').addEventListener('click', function(e) {
            e.stopPropagation();
            stopPlaying();
        });

        // Click on floating player to expand
        floatingPlayer.addEventListener('click', function() {
            expandPlayer();
        });
    }

    function minimizePlayer() {
        const modal = document.getElementById('spotifyPlayerModal');
        const floatingPlayer = document.getElementById('floatingMusicPlayer');
        
        if (modal) modal.style.display = 'none';
        if (floatingPlayer) floatingPlayer.style.display = 'flex';
    }

    function expandPlayer() {
        const modal = document.getElementById('spotifyPlayerModal');
        const floatingPlayer = document.getElementById('floatingMusicPlayer');
        
        if (floatingPlayer) floatingPlayer.style.display = 'none';
        if (modal) modal.style.display = 'flex';
    }

    function startPlaying() {
        console.log('Starting vinyl animation and Spotify player...');
        
        // Add playing classes
        if (vinylRecord) {
            vinylRecord.classList.add('playing');
            vinylRecord.classList.add('spinning');
        }
        
        // Show music notes
        if (musicNotes) {
            musicNotes.classList.add('playing');
        }

        // Show Spotify player
        openSpotifyPlayer();
    }

    function stopPlaying() {
        console.log('Stopping vinyl animation and Spotify player...');
        
        // Remove playing classes
        if (vinylRecord) {
            vinylRecord.classList.remove('playing');
            vinylRecord.classList.remove('spinning');
        }
        
        // Hide music notes
        if (musicNotes) {
            musicNotes.classList.remove('playing');
        }

        // Hide Spotify player
        closeSpotifyPlayer();

        isPlaying = false;
    }

    function openSpotifyPlayer() {
        const modal = document.getElementById('spotifyPlayerModal');
        const floatingPlayer = document.getElementById('floatingMusicPlayer');
        const container = document.getElementById('spotifyPlayerContainer');
        
        if (modal && container) {
            // Create iframe if it doesn't exist
            if (!container.querySelector('iframe')) {
                const iframe = document.createElement('iframe');
                iframe.style.cssText = 'border-radius: 12px;';
                iframe.src = `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`;
                iframe.width = '100%';
                iframe.height = '352';
                iframe.frameBorder = '0';
                iframe.allowFullscreen = '';
                iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
                iframe.loading = 'lazy';
                
                container.appendChild(iframe);
            }
            
            modal.style.display = 'flex';
            if (floatingPlayer) floatingPlayer.style.display = 'none';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeSpotifyPlayer() {
        const modal = document.getElementById('spotifyPlayerModal');
        const floatingPlayer = document.getElementById('floatingMusicPlayer');
        const container = document.getElementById('spotifyPlayerContainer');
        
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        if (floatingPlayer) {
            floatingPlayer.style.display = 'none';
        }
        
        // Remove iframe to stop music
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Add CSS animations for modal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    #floatingMusicPlayer:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    }
`;
document.head.appendChild(style);

