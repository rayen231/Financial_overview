from groq import Groq
import base64

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')
  
def PictureAnalyser(image_path):
    # Path to your image
    #image_path = r"C:\Users\Rayen\Downloads\images.jpg"

    # Getting the base64 string
    base64_image = encode_image(image_path)


    client = Groq(api_key="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")
    completion = client.chat.completions.create(
        model="llama-3.2-11b-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe that picture in details and focus in any financial content in it."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url":f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None, 
    )

    return str(completion.choices[0].message)
#print(test(image_path=r"C:\Users\Rayen\Downloads\try.jpg"))