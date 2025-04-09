from django.db import models

class BeamToBeamEndPlate(models.Model):
    beamSection = models.CharField(max_length=100)
    material = models.CharField(max_length=100)  # ✅ Make sure this exists
    bendingMoment = models.FloatField()
    shearForce = models.FloatField()
    axialForce = models.FloatField()
    boltDiameter = models.FloatField()
    boltClass = models.CharField(max_length=10)
    webThickness = models.FloatField()


    def __str__(self):
        return f"{self.beam_section} - {self.material}"
