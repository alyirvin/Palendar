import torch
from diffusers import StableDiffusionPipeline
# from transformers import pipeline

model = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")

device = torch.device("cpu")
model = model.to(device)


# default_style = "in a simple, cartoon style"
default_style = "doodle style, flat color illustration, simple chibi, simple setting, thick line style"
user_prompt = input("What did you do today?: ")
# expanded_prompt = specific_prompt(user_prompt)
full_prompt = f"{user_prompt} {default_style}"
image = model(full_prompt, num_inference_steps=20).images[0]
image.save(f"concert_test.png")