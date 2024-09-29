import torch
from diffusers import StableDiffusionPipeline

# print(torch.cuda.is_available())
model = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")

# pipe = pipe.to("cuda")
device = torch.device("cpu")
model = model.to(device)

default_style = "in a simple, cartoon style"
user_prompt = input("What did you do today?: ")
full_prompt = f"{user_prompt} {default_style}"
image = model(full_prompt).images[0]
image.save(f"movie.png")