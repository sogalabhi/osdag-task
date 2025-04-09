from rest_framework import generics, status
from rest_framework.response import Response
from .models import BeamToBeamEndPlate
from .serializers import BeamToBeamEndPlateSerializer

class BeamToBeamEndPlateCreateView(generics.CreateAPIView):
    serializer_class = BeamToBeamEndPlateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        input_data = serializer.validated_data

        # Generate dummy results
        result = generate_dummy_results(input_data)

        return Response(result, status=status.HTTP_200_OK)

class BeamToBeamEndPlateListView(generics.ListAPIView):
    queryset = BeamToBeamEndPlate.objects.all()
    serializer_class = BeamToBeamEndPlateSerializer

def generate_dummy_results(input_values):
    beam_section = input_values["beamSection"]
    bolt_diameter = input_values["boltDiameter"]
    bending_moment = input_values["bendingMoment"]
    shear_force = input_values["shearForce"]
    web_thickness = input_values["webThickness"]

    if beam_section == "ISMB100":
        beam_height = 100
        flange_width = 75
        flange_thickness = 5
    elif beam_section == "ISMB150":
        beam_height = 150
        flange_width = 80
        flange_thickness = 7
    else:
        beam_height = 200
        flange_width = 100
        flange_thickness = 10

    bending_capacity = round(beam_height * flange_width * 0.1)
    shear_capacity = round(beam_height * 5)

    flange_cap = round(bolt_diameter * 20)
    web_cap = round(bolt_diameter * 15)

    return {
        "memberCapacity": {
            "bending": bending_capacity,
            "shear": shear_capacity
        },
        "demand": {
            "bending": bending_moment,
            "shear": shear_force
        },
        "boltDetails": {
            "diameter": bolt_diameter,
            "spacing": 70,
            "edgeDistance": 40,
            "flangeCapacity": {
                "value": flange_cap,
                "utilization": min(1, bending_moment / flange_cap)
            },
            "webCapacity": {
                "value": web_cap,
                "utilization": min(1, shear_force / web_cap)
            }
        },
        "webPlate": {
            "height": beam_height - 20,
            "width": 100,
            "thickness": web_thickness,
            "spacing": 70
        },
        "flangePlate": {
            "width": flange_width,
            "length": flange_width + 40,
            "thickness": flange_thickness
        },
        "designStatus": {
            "bending": "OK" if bending_moment < bending_capacity else "FAIL",
            "shear": "OK" if shear_force < shear_capacity else "FAIL"
        }
    }
