from django import forms
from .models import Listing
from django.contrib.gis.geos import Point


class ListingsForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ['title', 'description', 'area', 'borough', 'listing_type', 'property_status', 'price', 'rental_frequency', 'rooms', 'furnished', 'pool', 'elevator', 'cctv', 'parking', 'date_posted', 'location', 'latitude', 'longtitude', 'picture1', 'picture2', 'picture3', 'picture4', 'picture5']
    latitude = forms.FloatField()
    longtitude = forms.FloatField()

    def clean(self):
        data = super().clean()
        latitude = data.pop('latitude')
        longtitude = data.pop('longtitude')
        data['location'] = Point(latitude, longtitude, srid=4326)
        return data
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')
        
        if isinstance(location, Point):
            self.initial['latitude'] = location.tuple[0]
            self.initial['longtitude'] = location.tuple[1]