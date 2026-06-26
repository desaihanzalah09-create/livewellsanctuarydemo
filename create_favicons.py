from PIL import Image

# Load the source image
img_path = r"c:\Users\User01\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1782240599811-odk3dynl.png"
img = Image.open(img_path)

# Convert to RGB if necessary (for PNG with transparency)
if img.mode in ('RGBA', 'LA', 'P'):
    # Create white background
    background = Image.new('RGB', img.size, (255, 255, 255))
    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
    img = background

# Create favicon sizes
sizes = {
    r"c:\Users\User01\Documents\cards\favicon-32x32.png": (32, 32),
    r"c:\Users\User01\Documents\cards\favicon-16x16.png": (16, 16),
    r"c:\Users\User01\Documents\cards\apple-touch-icon.png": (180, 180),
}

for path, size in sizes.items():
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(path, 'PNG')
    print(f"Created {path}")

print("Done!")
