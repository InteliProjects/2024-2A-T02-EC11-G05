import cv2
import numpy as np
import tkinter as tk
from tkinter import Scale, HORIZONTAL
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt

# Carregar a imagem
image_path = './ojhvh.png'  # Mude para o caminho correto da sua imagem
imagem = cv2.imread(image_path)

# Converter a imagem de BGR para HSV
imagem_hsv = cv2.cvtColor(imagem, cv2.COLOR_BGR2HSV)

# Função para aplicar o filtro
def update_filter():
    lower_hue = hue_slider_lower.get()
    upper_hue = hue_slider_upper.get()
    lower_sat = sat_slider_lower.get()
    upper_sat = sat_slider_upper.get()
    lower_val = val_slider_lower.get()
    upper_val = val_slider_upper.get()
    
    lower_green = np.array([lower_hue, lower_sat, lower_val])
    upper_green = np.array([upper_hue, upper_sat, upper_val])
    
    # Criar a máscara e aplicar
    mask = cv2.inRange(imagem_hsv, lower_green, upper_green)
    resultado = cv2.bitwise_and(imagem, imagem, mask=mask)
    
    # Atualizar o gráfico
    ax1.clear()
    ax2.clear()
    ax1.set_title('Imagem Original', fontsize=16)
    ax1.imshow(cv2.cvtColor(imagem, cv2.COLOR_BGR2RGB))
    ax2.set_title('Árvores Detectadas', fontsize=16)
    ax2.imshow(cv2.cvtColor(resultado, cv2.COLOR_BGR2RGB))
    canvas.draw()

# Criar a janela Tkinter
root = tk.Tk()
root.title("Ajuste de Máscara HSV para Detecção de Árvores")

# Aumentar o tamanho da janela
root.geometry("1500x800")

# Frame para os sliders
slider_frame = tk.Frame(root)
slider_frame.pack()

# Criar e configurar sliders com tamanho ampliado
slider_length = 400  # Aumentar o comprimento dos sliders
font_size = 16  # Aumentar o tamanho das fontes

hue_slider_lower = Scale(slider_frame, from_=0, to=179, orient=HORIZONTAL, label="Lower Hue", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())
hue_slider_upper = Scale(slider_frame, from_=0, to=179, orient=HORIZONTAL, label="Upper Hue", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())
sat_slider_lower = Scale(slider_frame, from_=0, to=255, orient=HORIZONTAL, label="Lower Saturation", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())
sat_slider_upper = Scale(slider_frame, from_=0, to=255, orient=HORIZONTAL, label="Upper Saturation", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())
val_slider_lower = Scale(slider_frame, from_=0, to=255, orient=HORIZONTAL, label="Lower Value", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())
val_slider_upper = Scale(slider_frame, from_=0, to=255, orient=HORIZONTAL, label="Upper Value", length=slider_length, font=("Helvetica", font_size), command=lambda x: update_filter())

# Configurar os valores iniciais dos sliders
hue_slider_lower.set(35)
hue_slider_upper.set(85)
sat_slider_lower.set(40)
sat_slider_upper.set(255)
val_slider_lower.set(40)
val_slider_upper.set(255)

# Adicionar sliders ao frame
hue_slider_lower.pack(side=tk.LEFT, padx=10)
hue_slider_upper.pack(side=tk.LEFT, padx=10)
sat_slider_lower.pack(side=tk.LEFT, padx=10)
sat_slider_upper.pack(side=tk.LEFT, padx=10)
val_slider_lower.pack(side=tk.LEFT, padx=10)
val_slider_upper.pack(side=tk.LEFT, padx=10)

# Criar figuras maiores para exibição das imagens
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 10))  # Tamanho ampliado da figura
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.get_tk_widget().pack()

# Executar o loop principal da interface
update_filter()
root.mainloop()
