"""
Khushi's Premium Friendship Website
A beautiful, animated Flask application created with love.
"""

from flask import Flask, render_template
import os
from pathlib import Path

# Initialize Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Configure Flask
app.config['ENV'] = 'production'
app.config['DEBUG'] = False


# ========== AUTO-CREATE FOLDERS ==========
def create_required_folders():
    """
    Automatically create all required folders if they don't exist.
    """
    base_path = os.path.dirname(os.path.abspath(__file__))
    
    # Required folders
    required_folders = [
        os.path.join(base_path, 'templates'),
        os.path.join(base_path, 'static'),
        os.path.join(base_path, 'static', 'images'),
        os.path.join(base_path, 'static', 'images', 'countries'),
        os.path.join(base_path, 'static', 'music'),
    ]
    
    for folder in required_folders:
        Path(folder).mkdir(parents=True, exist_ok=True)
        print(f"✓ Folder ready: {folder}")


# ========== CREATE DUMMY IMAGES (FOR TESTING) ==========
def create_placeholder_images():
    """
    Create placeholder images if they don't exist.
    In production, you should replace with actual images.
    """
    import io
    from PIL import Image, ImageDraw
    
    try:
        base_path = os.path.dirname(os.path.abspath(__file__))
        
        # Create Aditya images
        aditya_images = ['aditya1.jpg', 'aditya2.jpg', 'aditya3.jpg', 'aditya4.jpg']
        for img_name in aditya_images:
            img_path = os.path.join(base_path, 'static', 'images', img_name)
            if not os.path.exists(img_path):
                create_gradient_image(img_path, 800, 600, "Aditya Roy Kapur")
        
        # Create country images
        countries_list = [
            'switzerland', 'japan', 'italy', 'france', 'norway',
            'newzealand', 'canada', 'iceland', 'greece', 'australia',
            'maldives', 'finland', 'austria', 'scotland', 'southkorea',
            'indonesia', 'thailand', 'turkey', 'spain', 'brazil'
        ]
        
        for country in countries_list:
            img_path = os.path.join(base_path, 'static', 'images', 'countries', f'{country}.jpg')
            if not os.path.exists(img_path):
                create_gradient_image(img_path, 600, 400, country.title())
        
        print("✓ Placeholder images created successfully")
    except ImportError:
        print("⚠ PIL not installed. Please add actual images manually.")
    except Exception as e:
        print(f"⚠ Could not create placeholder images: {e}")


def create_gradient_image(path, width, height, text):
    """
    Create a gradient placeholder image.
    """
    try:
        from PIL import Image, ImageDraw
        
        # Create gradient background
        image = Image.new('RGB', (width, height))
        draw = ImageDraw.Draw(image)
        
        # Create gradient
        for y in range(height):
            r = int(99 + (139 - 99) * (y / height))
            g = int(102 + (92 - 102) * (y / height))
            b = int(241 + (246 - 241) * (y / height))
            draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))
        
        # Add text
        try:
            draw.text((width//2 - 50, height//2 - 20), text, fill=(255, 255, 255))
        except:
            pass
        
        image.save(path, 'JPEG')
    except:
        pass


# ========== ROUTES ==========
@app.route('/')
@app.route('/index')
def index():
    """Welcome/Friend page"""
    return render_template('index.html')


@app.route('/hero')
def hero():
    """Favourite hero page - Aditya Roy Kapur"""
    return render_template('hero.html')


@app.route('/countries')
def countries():
    """Explore the world page - 20 countries"""
    return render_template('countries.html')


@app.route('/health')
def health():
    """Health check endpoint for Render"""
    return {'status': 'ok'}, 200


# ========== ERROR HANDLERS ==========
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return render_template('index.html'), 200


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return render_template('index.html'), 200


# ========== BEFORE REQUEST ==========
@app.before_request
def before_request():
    """Create folders before each request"""
    create_required_folders()


# ========== MAIN ==========
if __name__ == '__main__':
    # Create all necessary folders
    create_required_folders()
    
    # Create placeholder images
    create_placeholder_images()
    
    # Print startup info
    print("\n" + "="*60)
    print("🎀 Khushi's Premium Friendship Website 🎀")
    print("="*60)
    print("✨ Starting the application...")
    port = int(os.environ.get('PORT', 5000))
    print(f"📍 Visit: http://0.0.0.0:{port}")
    print("💝 Press CTRL+C to stop the server")
    print("="*60 + "\n")
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False
    )
