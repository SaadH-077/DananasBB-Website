// Menu Download Modal Module
export function initMenuDownload() {
    const downloadMenuBtn = document.getElementById('downloadMenuBtn');
    const menuModal = document.getElementById('menuModal');
    const closeMenuModal = document.getElementById('closeMenuModal');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const menuContent = document.getElementById('menuContent');

    if (!downloadMenuBtn || !menuModal) return;

    // Menu data
    const menuData = {
        burgers: [
            { name: "Danana's Classic Bala", price: "$13", description: "Handcrafted beef patty topped with rich aioli sauce, fresh lettuce, red beefsteak tomatoes & onions" },
            { name: "Danana's Golden Deluxe", price: "$16", description: "Butcher's cut Beef or Chicken Patty topped with Danana's Special Sauce, American Cheddar, Hickory smoked Mushrooms, Caramelized Onions, Potato Bun" },
            { name: "Danana's Veggie Bala", price: "$14", description: "A wholesome plant-based delight featuring a grilled veggie patty topped with Danana's Special Vegan Sauce, hickory smoked mushrooms, caramelized onions, fresh lettuce, and house-cut tomatoes on a soft potato bun" },
            { name: "Laal Qila", price: "$15", description: "A fiery fortress of flavor! Spicy Cheeto-coated chicken marinated with fresh herbs and secret spices, topped with hickory-smoked onions, mushrooms, and house-cut tomatoes for an unforgettable kick" },
            { name: "Danana's 'Niagara Crunch' Bala", price: "$14", description: "A crispy indulgence inspired by the falls! Buttermilk-marinated chicken topped with caramelized onions, hickory-smoked mushrooms, Danana's Special Sauce, butter-head lettuce, and house-cut tomatoes for the perfect crunch in every bite" },
            { name: "Suzy", price: "$18", description: "A bold creation bursting with attitude! Swiss and Kraft American Cheese stuffed inside a succulent beef patty, topped with our special spicy Cuban Jam, all wrapped in a soft Brioche Bun" }
        ],
        appetizers: [
            { name: "Bubu Bombs", price: "$9", description: "Swiss-jalapeño cream cheese wrapped in a layer of chicken breast covered in golden fried bread crumbs" },
            { name: "BUFF-AELO BITES", price: "$9", description: "Buffalo chicken bites dipped in special spices topped with Frank's Red Hot Sauce" }
        ],
        desserts: [
            { name: "Tiramisu", price: "$7 (S) / $12 (L)", description: "Creamy. Coffee-soaked. Cocoa-crowned. A timeless Italian dessert" }
        ]
    };

    // Open modal
    downloadMenuBtn.addEventListener('click', async () => {
        // Create the menu card HTML
        menuContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #0d3b2f 0%, #1a5944 100%); padding: 60px 50px; min-height: 100%; font-family: 'Playfair Display', serif; color: white;">
                <!-- Logo -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <img src="assets/images/Dananas New Logo.jpeg" alt="Danana's Logo" style="width: 120px; height: auto; margin: 0 auto 20px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                    <div style="width: 80px; height: 3px; background: #D4AF37; margin: 20px auto;"></div>
                </div>

                <!-- Signature Balas Section -->
                <div style="margin-bottom: 40px;">
                    <h2 style="font-size: 28px; font-weight: bold; color: #D4AF37; text-align: center; margin-bottom: 25px; letter-spacing: 2px;">SIGNATURE BALAS</h2>
                    ${menuData.burgers.map(item => `
                        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                                <h3 style="font-size: 18px; font-weight: bold; color: white; margin: 0; flex: 1;">${item.name}</h3>
                                <span style="font-size: 20px; font-weight: bold; color: #D4AF37; margin-left: 20px; white-space: nowrap;">${item.price}</span>
                            </div>
                            <p style="font-size: 13px; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0; font-family: 'Inter', sans-serif; font-style: italic;">${item.description}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Appetizers Section -->
                <div style="margin-bottom: 40px;">
                    <h2 style="font-size: 28px; font-weight: bold; color: #D4AF37; text-align: center; margin-bottom: 25px; letter-spacing: 2px;">APPETIZERS</h2>
                    ${menuData.appetizers.map(item => `
                        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                                <h3 style="font-size: 18px; font-weight: bold; color: white; margin: 0; flex: 1;">${item.name}</h3>
                                <span style="font-size: 20px; font-weight: bold; color: #D4AF37; margin-left: 20px; white-space: nowrap;">${item.price}</span>
                            </div>
                            <p style="font-size: 13px; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0; font-family: 'Inter', sans-serif; font-style: italic;">${item.description}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Desserts Section -->
                <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 28px; font-weight: bold; color: #D4AF37; text-align: center; margin-bottom: 25px; letter-spacing: 2px;">DESSERTS</h2>
                    ${menuData.desserts.map(item => `
                        <div style="margin-bottom: 20px; padding-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                                <h3 style="font-size: 18px; font-weight: bold; color: white; margin: 0; flex: 1;">${item.name}</h3>
                                <span style="font-size: 20px; font-weight: bold; color: #D4AF37; margin-left: 20px; white-space: nowrap;">${item.price}</span>
                            </div>
                            <p style="font-size: 13px; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0; font-family: 'Inter', sans-serif; font-style: italic;">${item.description}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid rgba(212, 175, 55, 0.4);">
                    <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 0; font-family: 'Inter', sans-serif;">Premium Burgers • Fresh Ingredients • Unforgettable Flavors</p>
                </div>
            </div>
        `;

        menuModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        menuModal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    if (closeMenuModal) {
        closeMenuModal.addEventListener('click', closeModal);
    }

    menuModal.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menuModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Download PDF functionality
    if (downloadPdfBtn && menuContent) {
        downloadPdfBtn.addEventListener('click', async () => {
            try {
                const html2canvas = window.html2canvas;
                const { jsPDF } = window.jspdf;

                if (!html2canvas || !jsPDF) {
                    alert('PDF library not loaded. Please refresh the page and try again.');
                    return;
                }

                // Show loading state
                const originalHTML = downloadPdfBtn.innerHTML;
                downloadPdfBtn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Generating...</span>';
                downloadPdfBtn.disabled = true;

                // Wait for images to load
                const images = menuContent.querySelectorAll('img');
                await Promise.all(Array.from(images).map(img => {
                    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                        setTimeout(resolve, 3000);
                    });
                }));

                await new Promise(resolve => setTimeout(resolve, 300));

                // Capture as canvas
                const canvas = await html2canvas(menuContent, {
                    scale: 2.5,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#0d3b2f',
                    logging: false,
                    windowHeight: menuContent.scrollHeight,
                    height: menuContent.scrollHeight
                });

                // Create PDF (A4 size)
                const imgWidth = 210;
                const pageHeight = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                const pdf = new jsPDF('p', 'mm', 'a4');
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('Dananas-Menu.pdf');

                downloadPdfBtn.innerHTML = originalHTML;
                downloadPdfBtn.disabled = false;

            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Failed to generate PDF. Please try again.');
                downloadPdfBtn.innerHTML = originalHTML;
                downloadPdfBtn.disabled = false;
            }
        });
    }
}
