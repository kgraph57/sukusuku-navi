#!/usr/bin/env python3
"""
フライヤーPNG → A4横PDF変換スクリプト
Usage: python3 png_to_pdf.py <input.png> <output.pdf>
"""
import sys
from PIL import Image

def convert(input_path: str, output_path: str):
    img = Image.open(input_path).convert("RGB")
    # A4横 @ 150dpi = 1748 x 1240px
    img = img.resize((1748, 1240), Image.LANCZOS)
    img.save(output_path, resolution=150)
    print(f"PDF保存完了: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 png_to_pdf.py <input.png> <output.pdf>")
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
