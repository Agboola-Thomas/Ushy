from django.shortcuts import render
from .models import Waitlist
from django.http.response import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.db.utils import IntegrityError
from django.http import HttpResponseBadRequest
from django.db import transaction
import json

def index(request):
    return render(request, 'website/index.html')
    
def waitlist(request):
    data = json.loads(request.body)
    try:
        with transaction.atomic():
            details = Waitlist()
            details.email = data['email'] if 'email' in data else None
            details.name = data['name'] if 'name' in data else None
            details.phone_number = data['phone_number'] if 'phone_number' in data else None

            details.save()
    except (IntegrityError):
        return HttpResponseBadRequest("Error updating db")

    return HttpResponse('Success')
    #return HttpResponseRedirect(reverse('website:index'))

def result(request):
    return render(request, 'website/success.html')