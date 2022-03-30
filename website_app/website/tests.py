from django.test import TestCase
from django.urls import reverse

from .models import  Waitlist

class WaitlistModelTests(TestCase):

    def setUp(self):
        self.data = {
            'email': 'stacey@gmail.com'
        }

    def test_submit_waitlist(self):
        url = reverse('website:waitlist')
        response = self.client.post(url, self.data)
        self.assertEqual(response.status_code, 302)
        self.assertIs(Waitlist.objects.filter(email=self.data['email']).exists(), True)

    def test_single_entry_waitlist(self):
        url = reverse('website:waitlist')
        first_response = self.client.post(url, self.data)
        second_response = self.client.post(url, self.data)
        self.assertEqual(first_response.status_code, 302)
        self.assertEqual(second_response.status_code, 400)
        self.assertIs(Waitlist.objects.filter(email=self.data['email']).count(), 1)


    