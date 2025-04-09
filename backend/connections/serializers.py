from rest_framework import serializers
from .models import BeamToBeamEndPlate

class BeamToBeamEndPlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeamToBeamEndPlate
        fields = '__all__'
