import cv2
import os
from ultralytics import YOLO 

# Carrega o modelo
model = YOLO('best.pt')

# Caminho do arquivo (pode ser vídeo ou foto)
file_path = "./img/view/imaa.jpeg"

# Cria a pasta 'result' se não existir
output_dir = "./img/result/vid"
os.makedirs(output_dir, exist_ok=True)

# Verifica se é um vídeo ou uma foto
if file_path.lower().endswith(('.mp4', '.mov', '.avi', '.mkv', '.flv', '.wmv')):
    # É um vídeo
    cap = cv2.VideoCapture(file_path)
    
    # Obtém informações sobre o vídeo
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Configura o VideoWriter para salvar o vídeo
    output_video_path = os.path.join(output_dir, "annotated_video.mp4")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

    while cap.isOpened():
        success, frame = cap.read()

        if success:
            # Realiza a predição
            results = model(frame)

            # Anota o frame
            annotated_frame = results[0].plot()

            # Escreve o frame anotado no vídeo de saída
            out.write(annotated_frame)
            
            # Mostra o frame anotado na tela
            cv2.imshow("Annotated Frame", annotated_frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            break

    # Libera os recursos
    cap.release()
    out.release()
    cv2.destroyAllWindows()

elif file_path.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
    # É uma foto
    image = cv2.imread(file_path)

    # Realiza a predição
    results = model(image)

    # Anota a imagem
    annotated_image = results[0].plot()

    # Salva a imagem anotada na pasta 'result'
    output_path = os.path.join(output_dir, "annotated_image.jpg")
    cv2.imwrite(output_path, annotated_image)

    # Mostra a imagem anotada na tela
    cv2.imshow("Annotated Image", annotated_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

else:
    print("Formato de arquivo não suportado. Por favor, forneça um vídeo ou uma imagem.")