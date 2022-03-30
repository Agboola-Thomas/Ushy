from django.db import models

class Waitlist(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length = 254, unique=True)
    phone_number =  models.CharField(max_length = 14, null=True, blank=True)

    def __str__(self):
        return self.email
