from PIL import Image, ImageDraw, ImageFont
import os

# Definir dimensões da logo
width, height = 400, 400
background_color = (255, 255, 255, 0)  # Transparente

# Criar uma nova imagem com fundo transparente
img = Image.new('RGBA', (width, height), background_color)
draw = ImageDraw.Draw(img)

# Definir cores
verde_escuro = (34, 87, 26)
dourado = (212, 175, 55)

# Desenhar um círculo verde como base
circle_radius = 150
circle_center = (width // 2, height // 2)
draw.ellipse(
    (
        circle_center[0] - circle_radius,
        circle_center[1] - circle_radius,
        circle_center[0] + circle_radius,
        circle_center[1] + circle_radius
    ),
    outline=verde_escuro,
    width=5
)

# Desenhar as iniciais P&S estilizadas
try:
    # Tentar carregar uma fonte
    font = ImageFont.truetype("DejaVuSerif-Bold.ttf", 120)
except IOError:
    # Se não encontrar, usar a fonte padrão
    font = ImageFont.load_default()

# Desenhar as iniciais P&S
draw.text((width // 2 - 80, height // 2 - 80), "P", fill=verde_escuro, font=font)
draw.text((width // 2, height // 2 - 80), "&", fill=dourado, font=font)
draw.text((width // 2 + 40, height // 2 - 80), "S", fill=verde_escuro, font=font)

# Desenhar balança da justiça estilizada
# Base da balança
draw.line([(width // 2, height // 2 + 40), (width // 2, height // 2 + 100)], fill=dourado, width=5)
# Braço horizontal
draw.line([(width // 2 - 80, height // 2 + 40), (width // 2 + 80, height // 2 + 40)], fill=dourado, width=5)
# Pratos da balança
draw.arc([(width // 2 - 100, height // 2 + 60), (width // 2 - 60, height // 2 + 80)], 0, 180, fill=dourado, width=3)
draw.arc([(width // 2 + 60, height // 2 + 60), (width // 2 + 100, height // 2 + 80)], 0, 180, fill=dourado, width=3)

# Salvar a imagem
img.save('/home/ubuntu/pontes_silva_site/images/logo.png')

# Criar uma versão com fundo verde para uso alternativo
img_green_bg = Image.new('RGBA', (width, height), verde_escuro)
img_green_bg.paste(img, (0, 0), img)
img_green_bg.save('/home/ubuntu/pontes_silva_site/images/logo_green_bg.png')

print("Logos criadas com sucesso em /home/ubuntu/pontes_silva_site/images/")
