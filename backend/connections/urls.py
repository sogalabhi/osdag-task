from django.urls import path
from .views import BeamToBeamEndPlateCreateView, BeamToBeamEndPlateListView

urlpatterns = [
    path('beam-to-beam/create/', BeamToBeamEndPlateCreateView.as_view(), name='create_beam_to_beam'),
    path('beam-to-beam/all/', BeamToBeamEndPlateListView.as_view(), name='list_beam_to_beam'),
]
