import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from together import Together

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('message', '')

        api_key = os.getenv("TOGETHER_API_KEY")
        client = Together(api_key=api_key)

        completion = client.chat.completions.create(
            model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            messages=[{"role": "user", "content": user_message}],
        )

        if completion.choices:
            bot_reply = completion.choices[0].message.content
        else:
            bot_reply = "Sorry, I couldn't understand your request."
        return JsonResponse({'response': bot_reply})
