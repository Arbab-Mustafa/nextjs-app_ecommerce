from PIL import Image
import os

# Folder containing .webp images
input_folder = "./public/thumb"
output_folder = "./public/thumb"

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith(".webp"):
        # Open the webp image
        webp_image = Image.open(os.path.join(input_folder, filename))

        # Convert to RGB mode
        rgb_image = webp_image.convert("RGB")

        # Save as .jpeg
        output_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.jpeg")
        rgb_image.save(output_path, "JPEG")

print("Conversion complete!")
